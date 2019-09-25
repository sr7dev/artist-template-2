import news_1 from "../assets/img/photos/news_1.png";
import news_2 from "../assets/img/photos/news_2.png";
import merch from "../assets/img/photos/merch.png";
import music_1 from "../assets/img/photos/music_1.png";
import music_2 from "../assets/img/photos/music_2.png";
import music_3 from "../assets/img/photos/music_3.png";

import bandsintown from "../assets/img/icons/bandsintown.svg";
import facebook from "../assets/img/icons/facebook.svg";
import instagram from "../assets/img/icons/instagram.svg";
import music from "../assets/img/icons/music.svg";
import songkick from "../assets/img/icons/songkick.svg";
import sound_cloud from "../assets/img/icons/sound_cloud.svg";
import spotify from "../assets/img/icons/spotify.svg";
import twitter from "../assets/img/icons/twitter.svg";
import youtube from "../assets/img/icons/youtube.svg";

export const newsItems = [
  {
    img: news_1,
    title: "The Mammoths - Austin Music Foundation Artist of the Month",
    content:
      '"The Mammoths prove that rock ‘n’ roll is far from dead - in fact, it’s thriving within each member of this impassioned rock band. Their fusion of psychedelia and blues into a nod-worthy set of ',
    url: "https://austinmusicfoundation.org/the-mammoths/",
  },
  {
    img: news_2,
    title: "Live Series: The Mammoths at Mean Eyed Cat",
    content:
      '"The Mammoths are known for their “fiery unapologetic live shows” (a quote from AMF’s Alex Vallejo) so it’s no surprise that they delivered the liveliest performance we’ve seen on the Mean Eyed Cat stage."',
    url: "https://blog.moodmedia.com/live-series-the-mammoths-at-mean-eyed-cat/",
  },
];

export const tourItems = [
  {
    day: "22",
    month: "AUG",
    title: "The Mammoths, Visit Austin",
    address: "Merchant Exchange - San Francisco, CA",
    url: "https://themammothsmusic.com/tour-1",
  },
  {
    day: "25",
    month: "AUG",
    title: "The Mammoths",
    address: "The Basement - Nashville, TN",
    url: "https://themammothsmusic.com/tour-1",
  },
  {
    day: "29",
    month: "AUG",
    title: "The Mammoths",
    address: "The Mohawk - Austin, TX",
    url: "https://themammothsmusic.com/tour-1",
  },
];

export const musicItems = [
  [
    {
      img: music_1,
      title: "Green Eyes",
      url: "https://open.spotify.com/album/3VD4NZy6jbvHfkcZqy57fK",
    },
    {
      img: music_2,
      title: "Golden Spell",
      url: "https://open.spotify.com/album/6ZSdm8WkEnJjYcNazHyQWj",
    },
    {
      img: music_3,
      title: "Above my Halo",
      url: "https://open.spotify.com/album/3UBaoUsJWcKwaCpf6alxQq",
    },
  ],
];

export const videoItems = [
  [
    {
      title: "Green Eyes - Sofar Sounds",
      url: "https://youtu.be/6btXo_s1tHI",
    },
    {
      title: "Cold Sweats - Sofar Sounds",
      url: "https://youtu.be/AKtqB2pMMjY",
    },
  ],
];

export const merchItems = [
  {
    img: merch,
    title: "The Mammoths T Shirt",
    price: "20",
    url: "https://themammothsmusic.com/merch/t-shirt",
  },
  {
    img: merch,
    title: "The Mammoths T Shirt",
    price: "20",
    url: "https://themammothsmusic.com/merch/t-shirt",
  },
];

export const socialItems = [
  {
    img_url: spotify,
    url:
      "https://open.spotify.com/artist/33Cjnij54yY7dwWv0o5HHZ?si=lbBI67D9Sz2cAO4hFUdMkg",
  },
  {
    img_url: music,
    url: "https://itunes.apple.com/us/artist/the-mammoths/1181502038",
  },
  {
    img_url: youtube,
    url: "https://www.youtube.com/channel/UCZO16V9ddR4bJVhPZVEEqDw",
  },
  {
    img_url: sound_cloud,
    url: "https://soundcloud.com/the-mammoths",
  },
  {
    img_url: facebook,
    url: "https://www.facebook.com/TheMammothsMusic",
  },
  {
    img_url: twitter,
    url: "https://twitter.com/The_Mammoths_TX",
  },
  {
    img_url: instagram,
    url: "https://www.instagram.com/mamafestamusic/?hl=en",
  },
  {
    img_url: songkick,
    url: "https://www.songkick.com/artists/4341501-mammoths",
  },
  {
    img_url: bandsintown,
    url: "http://bandsintown.com/TheMammoths",
  },
];
