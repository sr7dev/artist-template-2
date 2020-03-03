const builderId = process.env.REACT_APP_BUILDER_ID;
const pubKey = process.env.REACT_APP_ARTIST_PUB_KEY;
let baseUrl;
let payUrl;

switch (process.env.REACT_APP_ENV) {
  case "production":
    baseUrl = "https://api.jamfeed.com";
    payUrl = "https://pay.jamfeed.com";
    break;
  case "test":
    baseUrl = "https://api-test.jamfeed.com";
    payUrl = "https://pay-test.jamfeed.com";
    break;
  default:
    baseUrl = "http://localhost:3002";
    payUrl = "https://pay-test.jamfeed.com";
}

export default {
  builderId,
  pubKey,
  baseUrl,
  payUrl,
};
