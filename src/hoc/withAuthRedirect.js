/* eslint-disable */
import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
/* import - selectors */
import selectorsLogin from '../redux/login/loginSelectors';

/*
 * HOC
 */
const withAuthRedirect = Component => {
  const WithAuthRedirect = ({ token, ...restProps }) => {
    return token ? <Redirect to="/" /> : <Component {...restProps} />;
  };

  /* CONNECT */
  const mapStateToProps = state => ({
    token: selectorsLogin.getToken(state),
  });

  return connect(mapStateToProps)(WithAuthRedirect);
};

export default withAuthRedirect;
