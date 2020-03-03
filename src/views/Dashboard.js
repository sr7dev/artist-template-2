import React, {Component} from "react";
import {connect} from "react-redux";
import {AppSidebarToggler, AppSidebar} from "@coreui/react";
import {SizeMe} from "react-sizeme";
import {
  Nav,
  NavItem,
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

import {ConfirmationPopup, BuyNow, BandsinTownWidget} from "../components";
import {appDataSelector, switchTheme, themeModeSelector} from "../modules/app";
import navigation from "../_nav";
import config from "../config";
import {generateSocialItems} from "../constants/mock";

const mapStateToProps = state => ({
  appData: appDataSelector(state),
  darkMode: themeModeSelector(state),
});

const mapDispatch = {
  switchTheme,
};

class Dashboard extends Component {
  state = {
    mountLightbox: false,
    videoToPreview: null,
    videoSlidesActiveIndex: 0,
    musicSlidesActiveIndex: 0,
    dropdownOpen: false,
    radioSelected: 2,
    email: "",
    openConfirmationPopup: false,
    confirmationMessage: "",
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const tourEl = document.getElementById("tour");
    if (!tourEl) return;
    const desktopNavEl = document.getElementById("desktop-nav");
    if (!desktopNavEl) return;
    const pos = tourEl.offsetTop;
    if (winScroll + 100 >= pos) {
      document.getElementById("desktop-nav").classList.add("top-to-fix");
    } else {
      document.getElementById("desktop-nav").classList.remove("top-to-fix");
    }
  }

  toggleMenu = id => {
    document.querySelector("body").classList.toggle("sidebar-show");
    document.querySelectorAll("li.nav-item").forEach(el => el.classList.remove("active"));
    document.querySelector('.nav-item[data-id="' + id + '"]').classList.add("active");
    id = id.replace("#", "");
    window.scrollTo({
      top: document.getElementById(id).offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  onExiting = () => {
    this.isAnimatingVideoSlide = true;
  };

  onExited = () => {
    this.isAnimatingVideoSlide = false;
  };

  next = () => {
    if (this.isAnimatingVideoSlide) return;

    const {videoSlidesActiveIndex} = this.state;
    const {
      appData: {videoItems},
    } = this.props;

    if (videoItems.length <= 2) return;

    let nextIndex = 0;
    if (Math.ceil(videoItems.length / 2) - 1 === videoSlidesActiveIndex) {
      nextIndex = 0;
    } else {
      nextIndex = videoSlidesActiveIndex + 1;
    }

    this.setState({videoSlidesActiveIndex: nextIndex});
  };

  previous = () => {
    if (this.isAnimatingVideoSlide) return;

    const {videoSlidesActiveIndex} = this.state;
    const {
      appData: {videoItems},
    } = this.props;

    if (videoItems.length <= 2) return;

    const nextIndex =
      videoSlidesActiveIndex === 0
        ? Math.ceil(videoItems.length / 2) - 1
        : videoSlidesActiveIndex - 1;

    this.setState({videoSlidesActiveIndex: nextIndex});
  };

  onMusicExisting = () => {
    this.isAnimatingMusicSlide = true;
  };

  onMusicExisted = () => {
    this.isAnimatingMusicSlide = false;
  };

  nextMusic = () => {
    if (this.isAnimatingMusicSlide) return;

    const {musicSlidesActiveIndex} = this.state;
    const {
      appData: {musicItems},
    } = this.props;

    if (musicItems.length <= 3) return;

    let nextIndex = 0;
    if (Math.ceil(musicItems.length / 3) - 1 === musicSlidesActiveIndex) {
      nextIndex = 0;
    } else {
      nextIndex = musicSlidesActiveIndex + 1;
    }

    this.setState({musicSlidesActiveIndex: nextIndex});
  };

  previousMusic = () => {
    if (this.isAnimatingMusicSlide) return;

    const {musicSlidesActiveIndex} = this.state;
    const {
      appData: {musicItems},
    } = this.props;

    if (musicItems.length <= 3) return;

    const nextIndex =
      musicSlidesActiveIndex === 0
        ? Math.ceil(musicItems.length / 3) - 1
        : musicSlidesActiveIndex - 1;
    this.setState({musicSlidesActiveIndex: nextIndex});
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };

  onRadioBtnClick = radioSelected => {
    this.setState({
      radioSelected: radioSelected,
    });
  };

  showVideo = videoUrl => () => {
    this.setState({mountLightbox: true}, () => {
      this.setState({videoToPreview: videoUrl});
    });
  };

  handleJoinEList = async () => {
    const builderId = config.builderId;
    const pubKey = config.pubKey;
    const baseUrl = config.baseUrl;

    try {
      await fetch(
        `${baseUrl}/rest/webbuilder/joinEmailList?builderId=${builderId}&pubKey=${pubKey}&email=${this.state.email}`
      );
      this.setState({
        confirmationMessage: "You've successfully subscribed to the mailing list.",
        openConfirmationPopup: true,
      });
    } catch (error) {
      console.log("join e-list error", error);
    }
  };

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  render() {
    const {videoSlidesActiveIndex, musicSlidesActiveIndex} = this.state;
    const {appData, darkMode} = this.props;

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
                      <div
                        className="music-image"
                        style={{
                          backgroundImage: `url(${item.image})`,
                          backgroundSize: "cover",
                        }}
                      />
                      <div
                        className="title"
                        dangerouslySetInnerHTML={{__html: item.title}}
                      ></div>
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
                      <img src={item.thumbnail} alt="" />
                      <div
                        className="play-button"
                        onClick={this.showVideo(item.url)}
                      ></div>
                    </div>
                    <div
                      className="title"
                      dangerouslySetInnerHTML={{__html: item.title}}
                    ></div>
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
        <AppSidebar className="d-lg-none">
          <Nav>
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
                      <span className="nav-link">{item.name}</span>
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
                    <span className="nav-link">{item.name}</span>
                  </NavItem>
                );
              }
            })}
            <NavItem onClick={this.props.switchTheme}>
              <i className="fa fa-exchange nav-link"></i>
            </NavItem>
          </Nav>
        </AppSidebar>
        <SizeMe>
          {({size}) => (
            <section
              id="home"
              style={{
                backgroundImage: `url(${
                  size.width > 480
                    ? websiteCover.desktop_photo_url
                    : websiteCover.mobile_photo_url
                })`,
              }}
            >
              <div className="navigation" id="desktop-nav">
                <div className="mx-auto nav-bar">
                  <BuyNow />
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
                    <NavItem onClick={this.props.switchTheme}>
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

        <section id="tour">
          <Container>
            <h2>Tour</h2>
            {artist.name && darkMode && (
              <BandsinTownWidget
                key="dark"
                artistName={artist.name}
                darkMode={true}
                theme={websiteCover}
              />
            )}
            {artist.name && !darkMode && (
              <BandsinTownWidget
                key="light"
                artistName={artist.name}
                darkMode={false}
                theme={websiteCover}
              />
            )}
          </Container>
        </section>

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
                          <div
                            className="title"
                            dangerouslySetInnerHTML={{__html: item.title}}
                          ></div>
                          <div className="content">{item.content}</div>
                          <div className="read-more">
                            <Button color="dark" outline className="btn-pill read-more">
                              Read More
                            </Button>
                          </div>
                        </a>
                      </Col>
                    ))}
                    {newsItems.length !== current.length && (
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
                    )}
                  </>
                )}
              </ShowMore>
            </Row>
          </Container>
        </section>

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

        {/* Contact Section */}
        <section id="contact">
          <Container>
            <h2>CONTACT</h2>
            <div className="band-info">
              {websiteCover.booking_agent && (
                <div className="text-center">
                  <span>Booking Agent:&nbsp;</span>
                  {websiteCover.booking_agent}
                </div>
              )}
              {websiteCover.general_manager && (
                <div className="text-center">
                  <span>Management:&nbsp;</span>
                  {websiteCover.general_manager}
                </div>
              )}
              {websiteCover.press && (
                <div className="text-center">
                  <span>Press:&nbsp;</span>
                  {websiteCover.press}
                </div>
              )}
            </div>
            {appData.captureLead && (
              <>
                <div className="text-center mb-60px">Join Our Email Newsletter!</div>
                <div className="text-center mb-60px">
                  <Input
                    type="text"
                    id="name"
                    className="email-addr"
                    placeholder="Enter your email address"
                    required
                    value={this.state.email}
                    onChange={e => {
                      this.setState({email: e.target.value});
                    }}
                  />
                </div>
                <div className="text-center mb-60px">
                  <Button
                    color="success"
                    className="btn-pill join-btn"
                    onClick={this.handleJoinEList}
                  >
                    Join E-List
                  </Button>
                </div>
              </>
            )}
            <div className="app-info">© 2020 {artist.name}</div>
          </Container>
        </section>
        <ConfirmationPopup
          open={this.state.openConfirmationPopup}
          message={this.state.confirmationMessage}
          onRequestClose={() => {
            this.setState({openConfirmationPopup: false});
          }}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatch)(Dashboard);
