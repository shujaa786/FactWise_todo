import { lazy, Suspense } from "react";
import styles from "./index.module.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Paper } from "@material-ui/core";
import Fallback from "components/Fallback";
import React from "react";

const Home = lazy(() => import("components/Home/index"));

const Layout = () => {
 
  return (
    <Router>
      <Paper square className={styles.root}>
        <Suspense fallback={<Fallback />}>
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
          </Switch>
        </Suspense>
      </Paper>
    </Router>
  );
};

export default Layout;
