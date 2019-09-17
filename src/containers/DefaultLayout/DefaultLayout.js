import React, {Suspense} from "react";
import {Redirect, Route, Switch} from "react-router-dom";

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

  function toggleMenu(id) {
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
