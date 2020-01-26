import React, {Component} from "react";
import {connect} from "react-redux";
import {AppSidebarToggler} from "@coreui/react";
import {SizeMe} from "react-sizeme";
import {
  Nav,
  NavItem,
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
import FsLightbox from "fslightbox-react";
import ShowMore from "@tedconf/react-show-more";
import chunk from "lodash/chunk";
import ShowMoreText from "react-show-more-text";

import {generateSocialItems} from "../constants/mock";
import navigation from "../_nav";
import {appDataSelector} from "../modules/app";

const mapStateToProps = state => ({
  appData: appDataSelector(state),
});

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.changeTheme = this.changeTheme.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);

    this.nextMusic = this.nextMusic.bind(this);
    this.previousMusic = this.previousMusic.bind(this);
    this.goToIndex1 = this.goToIndex1.bind(this);
    this.onMusicExisting = this.onMusicExisting.bind(this);
    this.onMusicExisted = this.onMusicExisted.bind(this);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      mountLightbox: false,
      videoToPreview: null,
      videoSlidesActiveIndex: 0,
      musicSlidesActiveIndex: 0,
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

  componentDidUpdate(prevProps) {
    if (this.props.appData && !prevProps.appData) {
      const wf = document.createElement("script");
      wf.src = "https://widget.bandsintown.com/main.min.js";
      wf.charset = "utf-8";
      wf.async = "true";
      const s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(wf, s);
    }
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

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.videoSlidesActiveIndex === this.props.appData.videoItems.length - 1
        ? 0
        : this.state.videoSlidesActiveIndex + 1;
    this.setState({videoSlidesActiveIndex: nextIndex});
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.videoSlidesActiveIndex === 0
        ? this.props.appData.videoItems.length - 1
        : this.state.videoSlidesActiveIndex - 1;
    this.setState({videoSlidesActiveIndex: nextIndex});
  }

  onMusicExisting() {
    this.animating1 = true;
  }

  onMusicExisted() {
    this.animating1 = false;
  }

  goToIndex1(newIndex) {
    if (this.animating1) return;
    this.setState({musicSlidesActiveIndex: newIndex});
  }

  nextMusic() {
    if (this.animating1) return;
    const nextIndex =
      this.state.musicSlidesActiveIndex === this.props.appData.musicItems.length - 1
        ? 0
        : this.state.musicSlidesActiveIndex + 1;
    this.setState({musicSlidesActiveIndex: nextIndex});
  }

  previousMusic() {
    if (this.animating1) return;
    const nextIndex =
      this.state.musicSlidesActiveIndex === 0
        ? this.props.appData.musicItems.length - 1
        : this.state.musicSlidesActiveIndex - 1;
    this.setState({musicSlidesActiveIndex: nextIndex});
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

  showVideo = videoUrl => () => {
    this.setState({mountLightbox: true}, () => {
      this.setState({videoToPreview: videoUrl});
    });
  };

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  render() {
    const {appData = {}} = this.props;
    const {videoSlidesActiveIndex, musicSlidesActiveIndex} = this.state;

    const artist = appData.artist || {};
    const socialLinks = appData.socialURLs || {};
    const newsItems = appData.news || [];
    const websiteCover = appData.websiteCover || {};
    const musicItems = appData.musicItems;
    const videoItems = appData.videoItems;

    const musicSlides = chunk(musicItems, 3).map((items, index) => {
      return (
        <CarouselItem
          onExiting={this.onMusicExisting}
          onExited={this.onMusicExisted}
          key={index}
        >
          <Row className="music-items">
            {items.map((item, index1) => {
              return (
                <Col md="4" key={index1}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <div className="music-item">
                      <img src={item.images[1].url} alt="" />
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

    const videoSlides = chunk(videoItems, 2).map((items, index) => {
      return (
        <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={index}>
          <Row className="video-items">
            {items.map((item, index1) => {
              return (
                <Col md="6" key={index1}>
                  <div className="video-item">
                    <div className="player-wrapper">
                      <img src={item.thumbnails.high.url} alt="" />
                      <div
                        className="play-button"
                        onClick={this.showVideo(item.url)}
                      ></div>
                      {/* <ReactPlayer
                        url={item.url}
                        width="100%"
                        height="100%"
                        className="react-player"
                      ></ReactPlayer> */}
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
        <SizeMe>
          {({size}) => (
            <section id="home">
              <div
                className="hero"
                style={{
                  background: `url(${websiteCover.desktop_photo_url}) no-repeat`,
                  height: (size.width * 1024) / 1440,
                }}
              />

              <div className="navigation" id="desktop-nav">
                <div className="mx-auto nav-bar">
                  <Nav className="mx-auto header-nav" navbar>
                    {navigation.items.map((item, index) => {
                      if (item.url === "#merch") {
                        return socialLinks.merch ? (
                          <a
                            key={index}
                            href={socialLinks.merch}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <NavItem>
                              <span className="nav-link-span">{item.name}</span>
                            </NavItem>
                          </a>
                        ) : null;
                      } else {
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
                      }
                    })}
                    <NavItem onClick={this.changeTheme}>
                      <i className="fa fa-exchange nav-link-span"></i>
                    </NavItem>
                  </Nav>
                  <AppSidebarToggler className="ml-auto menu-toggler" mobile />
                </div>
                <div className="social-icons">
                  {generateSocialItems(socialLinks).map((item, index) => {
                    return (
                      <a
                        href={item.url}
                        key={index}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img className="social-icon" src={item.img_url} alt="" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </section>
          )}
        </SizeMe>

        {/* About Section */}
        <section id="about">
          {websiteCover.bio && (
            <Container>
              <h2>Bio</h2>
              <SizeMe>
                {({size}) => (
                  <Row>
                    <Col md="7" sm="12">
                      <ShowMoreText
                        lines={size.width > 752 ? 10 : 5}
                        more="Show more"
                        less="Show less"
                        expanded={false}
                        width={size.width > 752 ? (size.width * 7) / 24 : 0}
                        anchorClass="bio-read-more"
                      >
                        {websiteCover.bio}
                      </ShowMoreText>
                    </Col>
                    <Col md="5" sm="12" style={{textAlign: "center"}}>
                      <img src={websiteCover.desktop_photo_url} alt="" />
                    </Col>
                  </Row>
                )}
              </SizeMe>
            </Container>
          )}
        </section>

        {artist.name && (
          <section id="tour">
            <Container>
              <h2>Tour</h2>
              <a
                className="bit-widget-initializer"
                data-artist-name={artist.name}
                data-display-local-dates="false"
                data-display-past-dates="false"
                data-auto-style="false"
                data-text-color="#000000"
                data-link-color="#00b4b3"
                data-background-color="rgba(0,0,0,0)"
                data-display-limit="15"
                data-display-start-time="false"
                data-link-text-color="#FFFFFF"
                data-display-lineup="false"
                data-display-play-my-city="true"
                data-separator-color="rgba(124,124,124,0.25)"
                href="https://bandsintown.com"
              >
                No Concerts
              </a>
              {/* {data.tourItems.map((item, index) => {
                return (
                  <Row className="tour-item" key={index}>
                    <Col xs="3" md="3" className="date">
                      <div className="day">{item.day}</div>
                      <div className="month">{item.month}</div>
                    </Col>
                    <Col xs="6" md="6" className="get-ticket">
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        <div>
                          <div className="title">{item.title}</div>
                          <div className="content">{item.address}</div>
                        </div>
                      </a>
                    </Col>
                    <Col xs="3" md="3" className="get-ticket">
                      <Button
                        color="dark"
                        outline
                        className="btn-pill read-more"
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get Tickets
                      </Button>
                    </Col>
                  </Row>
                );
              })} */}
            </Container>
          </section>
        )}

        <section id="music">
          <Container>
            <h2>music</h2>
            <Carousel
              activeIndex={musicSlidesActiveIndex}
              next={this.nextMusic}
              previous={this.previousMusic}
              interval={false}
            >
              {musicSlides}
              <CarouselControl
                direction="prev"
                directionText="Previous"
                onClickHandler={this.previousMusic}
              />
              <CarouselControl
                direction="next"
                directionText="Next"
                onClickHandler={this.nextMusic}
              />
            </Carousel>
          </Container>
        </section>

        {/* Videos Section */}
        <section id="videos">
          <Container>
            <h2>Videos</h2>
            <Carousel
              activeIndex={videoSlidesActiveIndex}
              next={this.next}
              previous={this.previous}
              interval={false}
            >
              {videoSlides}
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
          {this.state.mountLightbox && (
            <FsLightbox
              toggler={Boolean(this.state.videoToPreview)}
              sources={[this.state.videoToPreview]}
              type="youtube"
              onClose={() => {
                this.setState({
                  mountLightbox: false,
                  videoToPreview: null,
                });
              }}
            />
          )}
        </section>

        {/* News Section */}
        <section id="news">
          <Container>
            <h2>News</h2>
            <Row>
              <ShowMore items={newsItems} by={4}>
                {({current, onMore}) => (
                  <>
                    {current.map(item => (
                      <Col md="6" sm="12" className="news-item" key={item.id}>
                        <a href={item.linkurl} target="_blank" rel="noopener noreferrer">
                          <div
                            className="news-image"
                            style={{
                              backgroundImage: `url(${item.pictureurl})`,
                              backgroundSize: "cover",
                            }}
                          />
                          {/* <img src={item.pictureurl} alt="" /> */}
                          <div className="title">{item.title}</div>
                          <div className="content">{item.content}</div>
                          <div className="read-more">
                            <Button color="dark" outline className="btn-pill read-more">
                              Read More
                            </Button>
                          </div>
                        </a>
                      </Col>
                    ))}
                    <div className="load-more">
                      <Button
                        color="dark"
                        outline
                        className="btn-pill read-more"
                        disabled={!onMore}
                        onClick={() => {
                          if (!!onMore) onMore();
                        }}
                      >
                        Load more
                      </Button>
                    </div>
                  </>
                )}
              </ShowMore>
              {/* {newsItems.map((item, index) => {
                return (
                  <Col md="6" sm="12" className="news-item" key={index}>
                    <a href={item.linkurl} target="_blank" rel="noopener noreferrer">
                      <img src={item.pictureurl} alt="" />
                      <div className="title">{item.title}</div>
                      <div className="content">{item.content}</div>
                      <div className="read-more">
                        <Button color="dark" outline className="btn-pill read-more">
                          Read More
                        </Button>
                      </div>
                    </a>
                  </Col>
                );
              })} */}
            </Row>
          </Container>
        </section>

        {/* Contact Section */}
        <section id="contact">
          <Container>
            <h2>CONTACT</h2>
            <Row>
              <Col className="contact">Booking Agent: {websiteCover.booking_agent}</Col>
            </Row>
            <Row>
              <Col className="contact">Management: {websiteCover.general_manager}</Col>
            </Row>
            <form onSubmit={this.handleSubmit}>
              <Row>
                <Col xs="6" className="pr-2 pr-sm-3">
                  <Input
                    type="text"
                    id="first_name"
                    name="first_name"
                    className="email-addr"
                    onChange={this.handleChange}
                    required
                  />
                  <Label htmlFor="first_name">First Name *</Label>
                </Col>
                <Col xs="6" className="pl-2 pl-sm-3">
                  <Input
                    type="text"
                    id="last_name"
                    name="last_name"
                    className="email-addr"
                    onChange={this.handleChange}
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
                    name="email"
                    className="email-addr"
                    onChange={this.handleChange}
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
                    name="message"
                    className="email-addr"
                    onChange={this.handleChange}
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
            </form>
            <div className="app-info">© 2020 {artist.name}</div>
          </Container>
        </section>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Dashboard);
