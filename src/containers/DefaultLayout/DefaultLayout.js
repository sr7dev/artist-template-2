import React, {Suspense} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {AppHeader} from "@coreui/react";

import routes from "../../routes";

const DefaultHeader = React.lazy(() => import("./DefaultHeader"));

function DefaultLayout() {
  const loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  return (
    <div className="app">
      <AppHeader fixed className="mobile-menu">
        <Suspense fallback={loading()}>
          <DefaultHeader />
        </Suspense>
      </AppHeader>
      <div className="app-body">
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
    </div>
  );
}

export default DefaultLayout;
