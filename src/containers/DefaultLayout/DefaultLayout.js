import React, {Suspense} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import $ from "jquery";

import {Nav, NavItem} from "reactstrap";
import {AppSidebar} from "@coreui/react";

import {AppFooter, AppHeader} from "@coreui/react";
// routes config
import routes from "../../routes";

import navigation from "../../_nav";

const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));

function DefaultLayout({history}) {
  const loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  function signOut(e) {
    e.preventDefault();
    history.push("/login");
  }

  function changeTheme() {
    $("body").toggleClass("white-theme");
    $(".app-header").toggleClass("white-theme");
    $(".app-footer").toggleClass("white-theme");
    $(".nav-link").toggleClass("white-theme");
    $(".nav").toggleClass("white-theme");
    $(".btn").toggleClass("white-theme");
  }

  function toggleMenu(id) {
    $("body").toggleClass("sidebar-show");
    $("body, html").animate({scrollTop: $(id).offset().top}, 800);
    $("li.nav-item").removeClass("active");
    $('.nav-item[data-id="' + id + '"]').addClass("active");
  }

  return (
    <div className="app">
      <AppHeader fixed className="mobile-menu">
        <Suspense fallback={loading()}>
          <DefaultHeader onLogout={e => signOut(e)} />
        </Suspense>
      </AppHeader>
      <div className="app-body">
        <AppSidebar className="d-lg-none">
          <Nav>
            {navigation.items.map((item, index) => {
              return (
                <NavItem
                  data-id={item.url}
                  key={index}
                  className={index === 0 ? "active" : ""}
                  onClick={() => toggleMenu(item.url)}
                >
                  <span className="nav-link">{item.name}</span>
                </NavItem>
              );
            })}
            <NavItem onClick={changeTheme}>
              <i className="fa fa-exchange nav-link"></i>
            </NavItem>
          </Nav>
        </AppSidebar>
        <main className="main">
          <Suspense fallback={loading()}>
            <Switch>
              {routes.map((route, idx) => {
                return route.component ? (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={props => <route.component {...props} />}
                  />
                ) : null;
              })}
              <Redirect from="/" to="/dashboard" />
            </Switch>
          </Suspense>
        </main>
      </div>
      <AppFooter>
        <Suspense fallback={loading()}>
          <DefaultFooter />
        </Suspense>
      </AppFooter>
    </div>
  );
}

export default DefaultLayout;
