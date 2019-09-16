import React from "react";
import PropTypes from "prop-types";
import { Label, Button, Container, Col, Row, Input} from "reactstrap";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

function DefaultFooter() {
  return (
    <React.Fragment>
      <section id="contact">
        <Container>
          <h2>CONTACT</h2>
          <Row>
            <Col className="contact">
              Booking:  matt@atlas-touring.com 
            </Col>
          </Row>
          <Row>
            <Col className="contact">
              Band:  themammothsmusic@gmail.com
            </Col>
          </Row>
          <Row>
            <Col xs="6" className="pr-2 pr-sm-3">
              <Input
                type="text"
                id="first_name"
                className="email-addr"
                required
              />
              <Label htmlFor="first_name">First Name *</Label>
            </Col>
            <Col xs="6" className="pl-2 pl-sm-3">              
              <Input
                type="text"
                id="last_name"
                className="email-addr"
                required
              />
              <Label htmlFor="last_name">Last Name *</Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                type="text"
                id="email"
                className="email-addr"
                required
              />
              <Label htmlFor="email">Email *</Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                type="textarea"
                id="message"
                className="email-addr"
                required
              />
              <Label htmlFor="message">Message *</Label>
            </Col>
          </Row>
          <div className="text-center mb-60px">
            <Button color="dark" outline className="btn-pill join-btn">
              Submit
            </Button>
          </div>
          <div className="app-info">© 2019 The Mammoths Music</div>
        </Container>
      </section>
    </React.Fragment>
  );
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
