import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import VerifyPage from "../src/fallBackPage";
import rootReducer from '../src/redux/rootReducer';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import VerifyModule from "./Components/Modules/VerifyModule";
import ScrollToTop from "./functions/ScrollToTop";

const HomePage = lazy(() => import("../src/routes/index"));
let store = createStore(rootReducer,applyMiddleware(thunk))


ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
  <ScrollToTop>
  <Route path="/verify" component={VerifyModule} />

    <Route
      path="/"
      render={() => (
        <div className="startoftheinnersec">
          <Suspense fallback={<VerifyPage />}>
            <HomePage />
          </Suspense>
        </div>
      )}
    />
     </ScrollToTop>
  </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
