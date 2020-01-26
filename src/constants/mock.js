import merch from "../assets/img/photos/merch.png";

import bandsintown from "../assets/img/icons/bandsintown.svg";
import facebook from "../assets/img/icons/facebook.svg";
import instagram from "../assets/img/icons/instagram.svg";
import music from "../assets/img/icons/music.svg";
import songkick from "../assets/img/icons/songkick.svg";

import spotify from "../assets/img/icons/spotify.svg";
import twitter from "../assets/img/icons/twitter.svg";
import youtube from "../assets/img/icons/youtube.svg";

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

export const generateSocialItems = socialLinks => {
  const items = [];
  if (socialLinks["open.spotify.com"]) {
    items.push({
      img_url: spotify,
      url: socialLinks["open.spotify.com"],
    });
  }

  if (socialLinks["itunes.apple.com"]) {
    items.push({
      img_url: music,
      url: socialLinks["itunes.apple.com"],
    });
  }

  if (socialLinks["youtube.com"]) {
    items.push({
      img_url: youtube,
      url: socialLinks["youtube.com"],
    });
  }

  if (socialLinks["facebook.com"]) {
    items.push({
      img_url: facebook,
      url: socialLinks["facebook.com"],
    });
  }

  if (socialLinks["twitter.com"]) {
    items.push({
      img_url: twitter,
      url: socialLinks["twitter.com"],
    });
  }

  if (socialLinks["instagram.com"]) {
    items.push({
      img_url: instagram,
      url: socialLinks["instagram.com"],
    });
  }

  if (socialLinks["songkick.com"]) {
    items.push({
      img_url: songkick,
      url: socialLinks["songkick.com"],
    });
  }

  if (socialLinks["bandsintown.com"]) {
    items.push({
      img_url: bandsintown,
      url: socialLinks["bandsintown.com"],
    });
  }
  console.log(items);
  return items;
};
