/* import - node_module */
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
/* import - CSS */
import './App.css';
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
      <Route exact path="/" component={HomePage} />
      <Route path="/form" component={FormPage} />
      <Route path="/login" component={LoginPage} />
    </Switch>
  </BrowserRouter>
);

export default App;
