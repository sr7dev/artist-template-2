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
  },
  {
    img: news_2,
    title: "Live Series: The Mammoths at Mean Eyed Cat",
    content:
      '"The Mammoths are known for their “fiery unapologetic live shows” (a quote from AMF’s Alex Vallejo) so it’s no surprise that they delivered the liveliest performance we’ve seen on the Mean Eyed Cat stage."',
  },
];

export const tourItems = [
  {
    day: "22",
    month: "AUG",
    title: "The Mammoths, Visit Austin",
    address: "Merchant Exchange - San Francisco, CA",
  },
  {
    day: "25",
    month: "AUG",
    title: "The Mammoths",
    address: "The Basement - Nashville, TN",
  },
  {
    day: "29",
    month: "AUG",
    title: "The Mammoths",
    address: "The Mohawk - Austin, TX",
  },
];

export const musicItems = [
  [
    {
      img: music_1,
      title: "Truffle Trap",
    },
    {
      img: music_2,
      title: "Woes",
    },
    {
      img: music_3,
      title: "Hi Beamin",
    },
  ],
  [
    {
      img: music_1,
      title: "Green Eyes",
    },
    {
      img: music_2,
      title: "Golden Spell",
    },
    {
      img: music_3,
      title: "Above my Halo",
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
  [
    {
      title: "Blood Ring - Official  Video",
      url: "https://www.youtube.com/watch?v=g2zaLbuBIEE",
    },
    {
      title: "Woes - Official Video",
      url: "https://www.youtube.com/watch?v=_uIy-VKfTSs",
    },
  ],
];

export const merchItems = [
  {
    img: merch,
    title: "The Mammoths T Shirt",
    price: "20",
  },
  {
    img: merch,
    title: "The Mammoths T Shirt",
    price: "20",
  },
];

export const socialItems = [
  {
    img_url: spotify,
    url: "https://open.spotify.com/artist/2deuprRz9fqMiBfTV6CAo5",
  },
  {
    img_url: music,
    url: "https://music.apple.com/ca/artist/the-bishops/1086826479",
  },
  {
    img_url: youtube,
    url: "https://www.youtube.com/channel/UCd1yaBcDXiBEpDBwnjvVebw",
  },
  {
    img_url: sound_cloud,
    url: "https://soundcloud.com/the_bishops",
  },
  {
    img_url: facebook,
    url: "https://www.facebook.com/thebishopsmusic/",
  },
  {
    img_url: twitter,
    url: "https://twitter.com/thebishopsatx?lang=en",
  },
  {
    img_url: instagram,
    url: "https://www.instagram.com/thebishopsmusic/",
  },
  {
    img_url: songkick,
    url: "https://www.songkick.com/artists/9835239-bishops-music",
  },
  {
    img_url: bandsintown,
    url: "https://www.bandsintown.com/en/a/13269757-the-bishops",
  },
];
