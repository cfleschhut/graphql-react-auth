import React from 'react';
import { Route } from 'react-router-dom';
import auth from '../Auth';

const GuardedRoute = ({ component: Component, path }) => (
  <Route
    exact
    path={path}
    render={props => {
      if (!auth.isAuthenticated()) return auth.login();
      return <Component {...props} />;
    }}
  />
);

export default GuardedRoute;
