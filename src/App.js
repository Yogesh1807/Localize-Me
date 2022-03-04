import React, { useState } from "react";
import { Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import history from "./utils/constants";
import { theme } from "./utils/themeconfig";
import store from "./store/store";
import AppEntry from "./pages/appEntry";
import Dashboard from "./pages/dashboard";
import Contact from "./pages/contact";
import PrivateRoute from "./routeModule/private";
import PublicRoute from "./routeModule/public";
import Page from "./pages/page";
// const theme = {
//   main: "mediumseagreen",
// };
function App(props) {
  const themeData = {
    default: theme,
    selected: theme[1],
  };
  const [themeState, setThemeState] = useState(themeData);

  return (
    <Provider store={store}>
      <ThemeProvider theme={themeState}>
        <Router history={history}>
          <Switch>
            <PublicRoute
              theme={themeState}
              restricted={true}
              component={AppEntry}
              path="/login"
              exact
            />
            <PrivateRoute
              setThemeState={setThemeState}
              theme={themeState}
              component={Dashboard}
              path="/"
              exact
            />

            <PrivateRoute
              setThemeState={setThemeState}
              theme={themeState}
              component={Dashboard}
              path="/dashboard"
              exact
            />
            <PrivateRoute
              setThemeState={setThemeState}
              theme={themeState}
              component={Contact}
              path="/contact"
              exact
            />
            <PrivateRoute
              setThemeState={setThemeState}
              theme={themeState}
              component={Page}
              path="/page"
              exact
            />
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
