import React from 'react';
import { useSelector } from 'react-redux';
import { Route,Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuth = useSelector(login => login.login.isAuth);
  return (
    <Route
      {...rest}
      render={props =>
        isAuth === true ? <Component {...props} /> : <Navigate to="/login" />
      }
    />
  );
};
export default PrivateRoute;
