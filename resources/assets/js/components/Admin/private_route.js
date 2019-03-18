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
    )
  )
}

const mapStateToProps = ({ user }) => ({ user });
export default connect(mapStateToProps)(PrivateRoute);
