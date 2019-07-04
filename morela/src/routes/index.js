import React, { Fragment, useContext } from "react";
import { Route, Link } from "react-router-dom";
import { Home } from "../components/Home";
import DrizzleContext from "../state/Context";
const Routes = () => {
  const { initialized, drizzleState } = useContext(DrizzleContext.Context);
  return (
    <div>
      {!initialized || !drizzleState ? (
        <div>loading</div>
      ) : (
        <Fragment>
          <Link to="/driz">driz</Link>
          <Link to="/">hOAM</Link>
          <Route exact path="/" component={Home} />
        </Fragment>
      )}
      }
    </div>
  );
};
export default Routes;
