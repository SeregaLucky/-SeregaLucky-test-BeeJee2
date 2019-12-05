/* import - node_module */
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
/* import - CSS */
import './App.css';
/* import - routes */
import routes from '../../routes';
/* import - COMPONENT */
import Navigation from '../Navigation/Navigation';
import HomePage from '../../pages/HomePage/HomePage';
import FormPage from '../../pages/FormPage/FormPage';
import LoginPage from '../../pages/LoginPage/LoginPage';

/*
 * COMPONENT
 */
const App = () => (
  <BrowserRouter>
    <Navigation />

    <Switch>
      <Route exact path={routes.HOME_PAGE} component={HomePage} />
      <Route path={routes.FORM_PAGE} component={FormPage} />
      <Route path={routes.LOGIN_PAGE} component={LoginPage} />

      <Redirect to={routes.HOME_PAGE} />
    </Switch>
  </BrowserRouter>
);

export default App;
