import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import Home from "./components/Home";
import { Provider } from "react-redux";
import { store } from "./redux";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer, toast, Zoom } from "react-toastify";

const App = () => {
  const [signIn, setSignIn] = React.useState(false);

  const init = () => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    document.body.appendChild(script);
    script.onload = function () {
      window.gapi.load("client:auth2", initClient);
    };
  };

  const initClient = () => {
    window.gapi.client
      .init({
        clientId:import.meta.env.VITE_CLIENT_ID,
        apiKey: import.meta.env.VITE_API_KEY,
        scope: "https://www.googleapis.com/auth/calendar",
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
        ],
      })
      .then(function () {
        window["gapi"].auth2
          .getAuthInstance()
          .isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(
          window["gapi"].auth2.getAuthInstance().isSignedIn.get()
        );
      })
      .catch(function (e) {
        console.log(e);
      });
  };
  const updateSigninStatus = (isSignedIn) => {
    setSignIn(isSignedIn);
  };
  useEffect(() => {
    init();
  });

  return (
    <Provider store={store}>
      <ToastContainer
        autoClose={4000}
        draggable={false}
        position={toast.POSITION.TOP_LEFT}
        hideProgressBar={true}
        transition={Zoom}
      />
      <Router>
        <Routes>
          <Route path="/login" exact element={<Login/>} />
          <Route path="/" element={<Home/>} />
          <Route path="*" render={() => <Navigate to="/login" />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
