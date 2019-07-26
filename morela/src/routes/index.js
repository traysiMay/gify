import React, { Fragment, useContext } from "react";
import { Route } from "react-router-dom";
import { Home } from "../components/Home";
import DrizzleContext from "../state/Context";
import User from "../components/User";
import DUser from "../components/DUser";
import Nav from "./Nav";
import ThreeProvider from "../state/ThreeProvider";

const Routes = () => {
  const { initialized, drizzleState } = useContext(DrizzleContext.Context);
  return (
    <div>
      {!initialized || !drizzleState ? (
        <div>loading</div>
      ) : (
        <Fragment>
          <Nav />
          <Route exact path="/duser" component={DUser} />
          <Route exact path="/" component={Home} />
          <Route exact path="/user" component={User} />
        </Fragment>
      )}
      }
    </div>
  );
};
export default Routes;
