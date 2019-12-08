/* import - node_modules */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import T from 'prop-types';
/* import - CSS */
import styles from './Navigation.module.css';
/* import - routes */
import routes from '../../routes';
/* import - selectors */
import selectorsLogin from '../../redux/login/loginSelectors';
/* import - AC */
import * as ACLogin from '../../redux/login/loginActions';

/*
 * COMPONET
 */
const Navigation = ({ token, deleteToken }) => (
  <nav className={styles.navigation}>
    <ul className={styles.list}>
      <li className={styles.item}>
        <NavLink
          exact
          to={routes.HOME_PAGE}
          className={styles.link}
          activeClassName={styles.linkActive}
        >
          Список задач
        </NavLink>
      </li>
      <li className={styles.item}>
        <NavLink
          to={routes.FORM_PAGE}
          className={styles.link}
          activeClassName={styles.linkActive}
        >
          Добавить новую задачу
        </NavLink>
      </li>
      {!token && (
        <li className={styles.item}>
          <NavLink
            to={routes.LOGIN_PAGE}
            className={styles.link}
            activeClassName={styles.linkActive}
          >
            Войти
          </NavLink>
        </li>
      )}
    </ul>

    {token && (
      <button className={styles.buttonOut} type="button" onClick={deleteToken}>
        Выйти
      </button>
    )}
  </nav>
);

Navigation.defaultProps = {
  token: null,
};

Navigation.propTypes = {
  token: T.string,
  deleteToken: T.func.isRequired,
};

/*
 * CONNECT
 */
const mapStateToProps = state => ({
  token: selectorsLogin.getToken(state),
});

const mapDispatchToProps = {
  deleteToken: ACLogin.deleteTokenAC,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
