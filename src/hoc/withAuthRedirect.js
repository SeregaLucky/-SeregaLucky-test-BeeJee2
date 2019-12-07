/* eslint-disable */
import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
/* import - selectors */
import loginSelectors from '../redux/login/loginSelectors';

const withAuthRedirect = Component => {
  const WithAuthRedirect = ({ token, ...restProps }) => {
    return token ? <Redirect to="/" /> : <Component {...restProps} />;
  };

  const mapStateToProps = state => ({
    token: loginSelectors.getToken(state),
  });

  return connect(mapStateToProps)(WithAuthRedirect);
};

export default withAuthRedirect;
