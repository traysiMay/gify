import React, { Fragment } from "react";
import { Route, Link } from "react-router-dom";
import { Home } from "../components/Home";
import MyDrizzleApp from "../components/MyDrizzleApp";
const Routes = () => {
  return (
    <Fragment>
      <Link to="/driz">driz</Link>
      <Link to="/">hOAM</Link>
      <Route exact path="/" component={Home} />
      <Route path="/driz" component={MyDrizzleApp} />
    </Fragment>
  );
};
export default Routes;
