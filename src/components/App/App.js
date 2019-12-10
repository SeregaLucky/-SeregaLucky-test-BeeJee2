/* import - node_module */
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
/* import - CSS */
import './App.css';
/* import - routes */
import routes from '../../routes';
/* import - COMPONENT */
import Navigation from '../Navigation/Navigation';
import Spinner from '../Spinner/Spinner';

const HomePage = lazy(() =>
  import('../../pages/HomePage/HomePage' /* webpackChunkName: "HomePage" */),
);
const FormPage = lazy(() =>
  import('../../pages/FormPage/FormPage' /* webpackChunkName: "FormPage" */),
);
const LoginPage = lazy(() =>
  import('../../pages/LoginPage/LoginPage' /* webpackChunkName: "LoginPage" */),
);

/*
 * COMPONENT
 */
const App = () => (
  <BrowserRouter>
    <Navigation />

    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route exact path={routes.HOME_PAGE} component={HomePage} />
        <Route path={routes.FORM_PAGE} component={FormPage} />
        <Route path={routes.LOGIN_PAGE} component={LoginPage} />

        <Redirect to={routes.HOME_PAGE} />
      </Switch>
    </Suspense>
  </BrowserRouter>
);

export default App;
