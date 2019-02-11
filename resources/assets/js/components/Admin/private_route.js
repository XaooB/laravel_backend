import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = rest.user

  return (
    user.length
    ? (
      <Route
        {...rest}
        render={props =>
          user.length
          ? true
          ? ( <Component {...props} />
          ) : (
          <Redirect
            to={{
              pathname: '/not_allowed',
              state: { from: props.location }
            }}
          />
          )
          : (
            <Redirect
              to={{
                pathname: '/api/auth/google',
                state: { from: props.location }
              }}
            />
          )
        }
      />
    ) : (
      ''
    )
  )
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(PrivateRoute);
