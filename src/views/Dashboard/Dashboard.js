import React, {Component} from "react";
import {connect} from "react-redux";
import {socialItems} from "../../constants/mock";
import navigation from "../../_nav";
import {AppSidebarToggler} from "@coreui/react";
import {Nav, NavItem} from "reactstrap";
import {
  Label,
  Input,
  Button,
  Col,
  Row,
  Container,
  Carousel,
  CarouselItem,
  CarouselControl,
} from "reactstrap";
import ReactPlayer from "react-player";
import {dataSelector} from "../../modules/app";
import about from "../../assets/img/photos/hero.png";

const mapStateToProps = state => ({
  data: dataSelector(state),
});

const enhance = connect(mapStateToProps);

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.changeTheme = this.changeTheme.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);

    this.next1 = this.next1.bind(this);
    this.previous1 = this.previous1.bind(this);
    this.goToIndex1 = this.goToIndex1.bind(this);
    this.onExiting1 = this.onExiting1.bind(this);
    this.onExited1 = this.onExited1.bind(this);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      activeIndex: 0,
      activeIndex1: 0,
      dropdownOpen: false,
      radioSelected: 2,
      first_name: "",
      last_name: "Name",
      email: "email@example.com",
      message: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const pos = document.getElementById("about").offsetTop;
    if (winScroll + 100 >= pos) {
      document.getElementById("desktop-nav").classList.add("top-to-fix");
    } else {
      document.getElementById("desktop-nav").classList.remove("top-to-fix");
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    const templateId = "template_U9xnORwc";

    this.sendFeedback(
      templateId,
      this.state.email,
      "info@jamfeed.com",
      this.state.message
    );

    this.setState({
      formSubmitted: true,
    });
  }
  sendFeedback(templateId, senderEmail, receiverEmail, message) {
    console.log(senderEmail, receiverEmail, message);
    window.emailjs
      .send("mailgun", templateId, {
        from_name: this.state.first_name + " " + this.state.last_name,
        senderEmail,
        receiverEmail,
        message_html: message,
      })
      .then(res => {
        this.setState({formEmailSent: true});
      })
      // Handle errors here however you like, or use a React error boundary
      .catch(err => console.error("Failed to send feedback. Error: ", err));
  }
  changeTheme() {
    document.querySelector("body").classList.toggle("white-theme");
    // $("body").toggleClass("white-theme");
    document
      .querySelectorAll(".app-header")
      .forEach(el => el.classList.toggle("white-theme"));
    document
      .querySelectorAll(".app-footer")
      .forEach(el => el.classList.toggle("white-theme"));
    document
      .querySelectorAll(".nav-link")
      .forEach(el => el.classList.toggle("white-theme"));
    document.querySelectorAll(".nav").forEach(el => el.classList.toggle("white-theme"));
    document.querySelectorAll(".btn").forEach(el => el.classList.toggle("white-theme"));
    document
      .querySelectorAll(".carousel-control-prev-icon")
      .forEach(el => el.classList.toggle("carousel-white-theme"));
    document
      .querySelectorAll(".carousel-control-next-icon")
      .forEach(el => el.classList.toggle("carousel-white-theme"));
  }

  toggleMenu(id) {
    document.querySelector("body").classList.toggle("sidebar-show");
    document.querySelectorAll("li.nav-item").forEach(el => el.classList.remove("active"));
    document.querySelector('.nav-item[data-id="' + id + '"]').classList.add("active");
    id = id.replace("#", "");
    window.scrollTo({
      top: document.getElementById(id).offsetTop,
      left: 0,
      behavior: "smooth",
    });
  }
  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({activeIndex: newIndex});
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === this.props.data.videoItems.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({activeIndex: nextIndex});
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? this.props.data.videoItems.length - 1
        : this.state.activeIndex - 1;
    this.setState({activeIndex: nextIndex});
  }

  onExiting1() {
    this.animating1 = true;
  }

  onExited1() {
    this.animating1 = false;
  }

  goToIndex1(newIndex) {
    if (this.animating1) return;
    this.setState({activeIndex1: newIndex});
  }

  next1() {
    if (this.animating1) return;
    const nextIndex =
      this.state.activeIndex1 === this.props.data.musicItems.length - 1
        ? 0
        : this.state.activeIndex1 + 1;
    this.setState({activeIndex1: nextIndex});
  }

  previous1() {
    if (this.animating1) return;
    const nextIndex =
      this.state.activeIndex1 === 0
        ? this.props.data.musicItems.length - 1
        : this.state.activeIndex1 - 1;
    this.setState({activeIndex1: nextIndex});
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  render() {
    const {data} = this.props;
    const {activeIndex, activeIndex1} = this.state;

    const slides1 = data.musicItems.map((items, index) => {
      return (
        <CarouselItem onExiting={this.onExiting1} onExited={this.onExited1} key={index}>
          <Row className="music-items">
            {items.map((item, index1) => {
              return (
                <Col md="4" key={index1}>
                  <a href={item.url}>
                    <div className="music-item">
                      <img src={item.img} alt="" />
                      <div className="title">{item.title}</div>
                    </div>
                  </a>
                </Col>
              );
            })}
          </Row>
        </CarouselItem>
      );
    });
    const slides2 = data.videoItems.map((items, index) => {
      return (
        <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={index}>
          <Row className="video-items">
            {items.map((item, index1) => {
              return (
                <Col md="6" key={index1}>
                  <div className="video-item">
                    <div className="player-wrapper">
                      <ReactPlayer
                        url={item.url}
                        width="100%"
                        height="100%"
                        className="react-player"
                      ></ReactPlayer>
                    </div>
                    <div className="title">{item.title}</div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </CarouselItem>
      );
    });

    return (
      <div className="animated fadeIn">
        <section id="home">
          {/* <img src={main_video} alt="" /> */}
          <div className="hero">
            <img src={about} alt="" />
          </div>
          <div className="navigation" id="desktop-nav">
            <div className="mx-auto nav-bar">
              <Nav className="mx-auto header-nav" navbar>
                {navigation.items.map((item, index) => {
                  return (
                    <NavItem
                      data-id={item.url}
                      key={index}
                      className={index === 0 ? "active" : ""}
                      onClick={() => this.toggleMenu(item.url)}
                    >
                      <span className="nav-link-span">{item.name}</span>
                    </NavItem>
                  );
                })}
                <NavItem onClick={this.changeTheme}>
                  <i className="fa fa-exchange nav-link-span"></i>
                </NavItem>
              </Nav>
              <AppSidebarToggler className="ml-auto menu-toggler" mobile />
            </div>
            <div className="social-icons">
              {socialItems.map((item, index) => {
                return (
                  <a href={item.url} key={index}>
                    <img className="social-icon" src={item.img_url} alt="" />
                  </a>
                );
              })}
            </div>
          </div>
        </section>
        <section id="about">
          <Container>
            <h2>Bio</h2>
            <Row>
              <Col md="7" sm="12">
                <div>
                  Beginning in Austin, TX, in the heart of their middle school days, David
                  Kapsner (lead vocals/guitar/piano), Michael Jekot (lead guitar/vocals),
                  and Tyler Rush (bass/vocals) came together to transcend the barrier of
                  blues-rock into funky psych-soul through their various music ventures.
                  Bringing the audacious and wonderfully talented Tim Durand
                  (drums/vocals) into the picture has
                </div>
                <div className="text-center">
                  <Button color="dark" outline className="btn-pill read-more">
                    Read More
                  </Button>
                </div>
              </Col>

              <Col md="5" sm="12">
                <img src={about} alt="" />
              </Col>
            </Row>
          </Container>
        </section>

        <section id="tour">
          <Container>
            <h2>Tour</h2>
            {data.tourItems.map((item, index) => {
              return (
                <Row className="tour-item" key={index}>
                  <Col xs="3" md="3" className="date">
                    <div className="day">{item.day}</div>
                    <div className="month">{item.month}</div>
                  </Col>
                  <Col xs="6" md="6" className="get-ticket">
                    <div>
                      <div className="title">{item.title}</div>
                      <div className="content">{item.address}</div>
                    </div>
                  </Col>
                  <Col xs="3" md="3" className="get-ticket">
                    <Button color="dark" outline className="btn-pill read-more">
                      Get Tickets
                    </Button>
                  </Col>
                </Row>
              );
            })}
          </Container>
        </section>
        <section id="music">
          <Container>
            <h2>music</h2>
            <Carousel
              activeIndex={activeIndex1}
              next={this.next1}
              previous={this.previous1}
            >
              {slides1}
              <CarouselControl
                direction="prev"
                directionText="Previous"
                onClickHandler={this.previous1}
              />
              <CarouselControl
                direction="next"
                directionText="Next"
                onClickHandler={this.next1}
              />
            </Carousel>
          </Container>
        </section>
        <section id="videos">
          <Container>
            <h2>Videos</h2>
            <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
              {slides2}
              <CarouselControl
                direction="prev"
                directionText="Previous"
                onClickHandler={this.previous}
              />
              <CarouselControl
                direction="next"
                directionText="Next"
                onClickHandler={this.next}
              />
            </Carousel>
          </Container>
        </section>
        <section id="merch">
          <Container>
            <h2>MERCH</h2>
            <Row className="merch-items">
              {data.merchItems.map((item, index) => {
                return (
                  <Col md="6" key={index}>
                    <a href={item.url}>
                      <div className="merch-item">
                        <img src={item.img} alt="" />
                        <div className="title">{item.title}</div>
                        <div className="price">${item.price}</div>
                      </div>
                    </a>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </section>
        <section id="news">
          <Container>
            <h2>News</h2>
            <Row>
              {data.newsItems.map((item, index) => {
                return (
                  <Col md="6" sm="12" className="news-item" key={index}>
                    <img src={item.img} alt="" />
                    <div className="title">{item.title}</div>
                    <div className="content">{item.content}</div>
                    <div className="read-more">
                      <Button color="dark" outline className="btn-pill read-more">
                        Read More
                      </Button>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </section>
        <section id="contact">
          <Container>
            <h2>CONTACT</h2>
            <Row>
              <Col className="contact">Booking: matt@atlas-touring.com</Col>
            </Row>
            <Row>
              <Col className="contact">Band: themammothsmusic@gmail.com</Col>
            </Row>
            <Row>
              <Col xs="6" className="pr-2 pr-sm-3">
                <Input type="text" id="first_name" className="email-addr" required />
                <Label htmlFor="first_name">First Name *</Label>
              </Col>
              <Col xs="6" className="pl-2 pl-sm-3">
                <Input type="text" id="last_name" className="email-addr" required />
                <Label htmlFor="last_name">Last Name *</Label>
              </Col>
            </Row>
            <Row>
              <Col>
                <Input type="text" id="email" className="email-addr" required />
                <Label htmlFor="email">Email *</Label>
              </Col>
            </Row>
            <Row>
              <Col>
                <Input type="textarea" id="message" className="email-addr" required />
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
      </div>
    );
  }
}

export default enhance(Dashboard);
