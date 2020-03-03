import React from "react";
const Dashboard = React.lazy(() => import("./views/Dashboard"));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [{path: "/", name: "Dashboard", component: Dashboard}];

export default routes;
