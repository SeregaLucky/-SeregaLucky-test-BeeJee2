/* import - node_modules */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
/* import - CSS */
import styles from './Navigation.module.css';
/* import - routes */
import routes from '../../routes';
/* import - selectors */
import selectorsLogin from '../../redux/login/loginSelectors';
import * as AC from '../../redux/login/loginActions';
// import thunk from '../../redux/tasks/tasksOperations';

const Navigation = ({ token, deleteToken }) => (
  <nav className={styles.navigation}>
    {console.log('Navigation')}
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
      <li className={styles.item}>
        <NavLink
          to={routes.LOGIN_PAGE}
          className={styles.link}
          activeClassName={styles.linkActive}
        >
          Войти
        </NavLink>
      </li>
    </ul>

    {token && (
      <button type="button" onClick={deleteToken}>
        Выйти
      </button>
    )}
  </nav>
);

// export default Navigation;
const mapStateToProps = state => ({
  token: selectorsLogin.getToken(state),
});

const mapDispatchToProps = dispatch => ({
  deleteToken: () => dispatch(AC.deleteTokenAC()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
