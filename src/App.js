import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Home from './components/Home';
import { Provider } from 'react-redux';
import { store } from './redux';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const [signIn, setSignIn] = React.useState(false);

  const init = () => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    document.body.appendChild(script);
    script.onload = function() {
      window['gapi'].load('client:auth2', initClient);
    };
  };

  const initClient = () => {
    window['gapi'].client
      .init({
        clientId:
          '1061875113480-6s6qvsk4lcle51db7a80962kcn0esa22.apps.googleusercontent.com',
        apiKey: 'AIzaSyBeswvEzLt_L5CSqFRNAMr52AuHNmRZIh0',
        scope: 'https://www.googleapis.com/auth/calendar',
        discoveryDocs: [
          'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
        ]
      })
      .then(function() {
        window['gapi'].auth2
          .getAuthInstance()
          .isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(
          window['gapi'].auth2.getAuthInstance().isSignedIn.get()
        );
      })
      .catch(function(e) {
        console.log(e);
      });
  };
  const updateSigninStatus = isSignedIn => {
    setSignIn(isSignedIn);
  };
  useEffect(() => {
    init();
  });

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <PrivateRoute path="/" component={Home} />
          <Route path="*" render={() => <Redirect to="/login" />} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
