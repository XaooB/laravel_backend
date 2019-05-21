import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from '../Reusable/loader';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, userCheck } = rest.user

  return (
    userCheck
    ? user.length
    ? (
      <Route
        {...rest}
        render={ props =>
          user[0].tier > 1
          ? (
            <Component {...props} />
          ) : (
          <Redirect
            to={{
              pathname: '/app/unauthorized',
              state: { from: props.location }
            }}
          />
          )
        }
      />
      ) : (
      <Redirect
        to={{
        pathname: '/app/unauthorized',
        }}
      />
    ) : <Loader />
  )
}

const mapStateToProps = ({ user }) => ({ user });
export default connect(mapStateToProps)(PrivateRoute);
