import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Helmet} from "react-helmet";

import config from "./config";
import {loadFont} from "./helpers/font";
import {setDefaultColors, applyTheme} from "./helpers/theme";
import {
  setAppData,
  setMusic,
  setVideo,
  appDataSelector,
  themeModeSelector,
} from "./modules/app";
import "./App.scss";

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import("./containers/DefaultLayout"));

const mapState = state => ({
  appData: appDataSelector(state),
  darkMode: themeModeSelector(state),
});

const mapDispatch = {
  setAppData,
  setMusic,
  setVideo,
};

function App({setAppData, setMusic, setVideo, appData, darkMode}) {
  const [youtubeApiLoaded, setYoutubeApiLoaded] = useState(false);
  const [artistYoutubeChannel, setArtistYoutubeChannel] = useState(null);

  useEffect(() => {
    const theme = appData.websiteCover || {};
    applyTheme(theme, darkMode);
  });

  useEffect(() => {
    function onGapiLoaded() {
      window.gapi.client.setApiKey("AIzaSyBo9BkFJfO9UOHOoFXsMu0-2EoUInRS6Ko");
      window.gapi.client.load("youtube", "v3", function() {
        setYoutubeApiLoaded(true);
      });
    }

    window.gapi.load("client", onGapiLoaded);
  }, [setYoutubeApiLoaded]);

  useEffect(() => {
    async function asyncFunc() {
      const channelId = artistYoutubeChannel.replace(
        "https://www.youtube.com/channel/",
        ""
      );
      try {
        const res = await window.gapi.client.youtube.search.list({
          part: "snippet",
          type: "video",
          channelId,
          order: "date",
          maxResults: 50,
        });
        const videos = res.result.items.map(item => {
          const thumbnails = item.snippet.thumbnails;
          let imagePath = "assets/img/spotify_placeholder.png";
          if (thumbnails.high && thumbnails.high.url) {
            imagePath = thumbnails.high.url;
          }
          return {
            url: `https://youtube.com/watch?v=${item.id.videoId}`,
            title: item.snippet.title,
            thumbnail: imagePath,
          };
        });

        setVideo(videos);
      } catch (error) {
        console.error("fetching video", error);
        setVideo([]);
      }
    }
    if (artistYoutubeChannel && youtubeApiLoaded) {
      asyncFunc();
    }
  }, [artistYoutubeChannel, youtubeApiLoaded, setVideo]);

  useEffect(() => {
    const builderId = config.builderId;
    const pubKey = config.pubKey;
    const baseUrl = config.baseUrl;

    async function asyncFunc() {
      let response = await fetch(
        `${baseUrl}/rest/webbuilder/website?builderId=${builderId}&pubKey=${pubKey}`
      );
      const websiteContent = await response.json();
      const {font_family, font_type} = websiteContent.websiteCover;
      setDefaultColors(websiteContent.websiteCover);
      setAppData(websiteContent);

      loadFont(font_family, font_type);

      const youtubeUrl = websiteContent.socialURLs["youtube.com"];
      setArtistYoutubeChannel(youtubeUrl);

      response = await fetch(
        `${baseUrl}/rest/webbuilder/artistMusic?builderId=${builderId}&pubKey=${pubKey}`
      );
      const parsedRes = await response.json();
      const musicItems = parsedRes.items.map(item => {
        let imagePath = "assets/img/spotify_placeholder.png";
        if (item.images.length !== 0) {
          imagePath = item.images[1].url;
        }
        return {
          url: item.external_urls.spotify,
          image: imagePath,
          title: item.name,
        };
      });
      setMusic(musicItems);
    }

    asyncFunc();
  }, [setAppData, setMusic, setVideo]);

  useEffect(() => {
    const handler = e => {
      var sumoCloseBtn = e.target.closest(".sumome-react-wysiwyg-close-button");
      if (sumoCloseBtn) {
        document.getElementsByTagName("body")[0].style.overflowY = "auto";
      }
    };

    document.addEventListener("click", handler, false);

    return function cleanup() {
      document.removeEventListener("click", handler);
    };
  }, []);

  const artist = appData.artist || {};

  return (
    <>
      <Helmet>
        <title>{artist.name}</title>
      </Helmet>
      <Router>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route path="/" name="Home" component={DefaultLayout} />
          </Switch>
        </React.Suspense>
      </Router>
    </>
  );
}

export default connect(mapState, mapDispatch)(App);
