import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Helmet} from "react-helmet";
import {setAppData, setMusic, setVideo, appDataSelector} from "./modules/app";

import "./App.scss";

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import("./containers/DefaultLayout"));

function App({setAppData, setMusic, setVideo, appData = {}}) {
  const [youtubeApiLoaded, setYoutubeApiLoaded] = useState(false);
  const [artistYoutubeChannel, setArtistYoutubeChannel] = useState(null);

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
    if (artistYoutubeChannel && youtubeApiLoaded) {
      const channelId = artistYoutubeChannel.replace(
        "https://www.youtube.com/channel/",
        ""
      );
      window.gapi.client.youtube.search
        .list({
          part: "snippet",
          type: "video",
          channelId,
          order: "date",
          maxResults: 50,
        })
        .then(res => {
          const videos = res.result.items.map(item => ({
            url: `https://youtube.com/watch?v=${item.id.videoId}`,
            title: item.snippet.title,
            thumbnails: item.snippet.thumbnails,
          }));

          setVideo(videos);
        });
    }
  }, [artistYoutubeChannel, youtubeApiLoaded, setVideo]);

  useEffect(() => {
    const builderId = process.env.REACT_APP_BUILDER_ID;
    const pubKey = process.env.REACT_APP_ARTIST_PUB_KEY;

    async function asyncFUnc() {
      let response = await fetch(
        `https://api-test.jamfeed.com/rest/webbuilder/website?builderId=${builderId}&pubKey=${pubKey}`
      );
      const websiteContent = await response.json();
      setAppData(websiteContent);

      const youtubeUrl = websiteContent.socialURLs["youtube.com"];
      setArtistYoutubeChannel(youtubeUrl);

      response = await fetch(
        `https://api-test.jamfeed.com/rest/webbuilder/artistMusic?builderId=${builderId}&pubKey=${pubKey}`
      );
      const parsedRes = await response.json();
      const musicItems = parsedRes.items.map(item => ({
        url: item.external_urls.spotify,
        images: item.images,
        title: item.name,
      }));
      setMusic(musicItems);
    }

    asyncFUnc();
  }, [setAppData, setMusic, setVideo]);

  const artist = appData.artist || {};

  return (
    <>
      <Helmet>
        <title>{artist.name}</title>
      </Helmet>
      <Router>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route path="/" name="Home" render={props => <DefaultLayout {...props} />} />
          </Switch>
        </React.Suspense>
      </Router>
    </>
  );
}

const mapState = state => ({
  appData: appDataSelector(state),
});

const mapDispatch = {
  setAppData,
  setMusic,
  setVideo,
};

export default connect(mapState, mapDispatch)(App);
