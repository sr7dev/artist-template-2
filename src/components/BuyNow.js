import React from "react";
import {connect} from "react-redux";
import {Button} from "reactstrap";

import {isSubscriptionActiveSelector} from "../modules/app";
import config from "../config";

const mapState = state => ({
  isSubscriptionActive: isSubscriptionActiveSelector(state),
});

function BuyNow({isSubscriptionActive}) {
  async function handleClick() {
    const builderId = config.builderId;
    const pubKey = config.pubKey;

    window.location.href = `${config.payUrl}?builderId=${builderId}&pubKey=${pubKey}&redirectUrl=${window.location.href}`;
  }

  return (
    !isSubscriptionActive && (
      <Button color="danger" className="btn-pill buy-now" onClick={handleClick}>
        BUY NOW
      </Button>
    )
  );
}

export default connect(mapState)(BuyNow);
