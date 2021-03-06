/* import - node_modules */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { toast } from 'react-toastify';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import T from 'prop-types';
/* import - CSS */
import 'react-toastify/dist/ReactToastify.css';
import styles from './LoginPage.module.css';
/* import - selectors */
import selectorsLogin from '../../redux/login/loginSelectors';
/* import - THUNK */
import thunk from '../../redux/login/loginOperations';
import withAuthRedirect from '../../hoc/withAuthRedirect';

toast.configure();

const validationSchema = yup.object({
  login: yup
    .string()
    .max(50, 'Максимальное 50 символа')
    .required('Поле обезательное к заполнению'),

  password: yup
    .string()
    .max(50, 'Максимальное 50 символа')
    .required('Поле обезательное к заполнению'),
});

/*
 * COMPONENT
 */
class LoginPage extends Component {
  static defaultProps = {
    nowError: null,
    loginingMistakeInInput: null,
  };

  static propTypes = {
    loading: T.bool.isRequired,
    nowError: T.shape(),
    loginingMistakeInInput: T.shape(),
    loginingThunk: T.func.isRequired,
  };

  inputIds = {
    loginInputId: shortid.generate(),
    passwordInputId: shortid.generate(),
  };

  componentDidUpdate(prevProps) {
    const { loginingMistakeInInput, nowError } = this.props;

    if (
      loginingMistakeInInput &&
      prevProps.loginingMistakeInInput !== loginingMistakeInInput
    ) {
      this.makedMistake(loginingMistakeInInput.message);
    }

    if (nowError && prevProps.nowError !== nowError) this.errorShow();
  }

  makedMistake = loginingMistakeInInput => {
    toast.warn(`${loginingMistakeInInput}`, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  errorShow = () => {
    toast.error('Произошла ошибка... Попробуйте позде', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  render() {
    const { loginingThunk, loading } = this.props;
    const { loginInputId, passwordInputId } = this.inputIds;

    return (
      <section className={styles.section}>
        <div className={styles.contForm}>
          <Formik
            initialValues={{ login: '', password: '' }}
            onSubmit={(data, { resetForm }) => {
              const { login, password } = data;

              loginingThunk(login, password);

              resetForm();
            }}
            validationSchema={validationSchema}
          >
            {({ errors, touched }) => (
              <Form className={styles.form}>
                <label htmlFor={loginInputId}>
                  <span>Login:</span>
                  <Field
                    type="text"
                    placeholder="Login..."
                    name="login"
                    id={loginInputId}
                  />
                  {errors.login && touched.login && (
                    <span className={styles.error}>{errors.login}</span>
                  )}
                </label>

                <label htmlFor={passwordInputId}>
                  <span>Password</span>
                  <Field
                    type="password"
                    placeholder="Password..."
                    name="password"
                    id={passwordInputId}
                  />
                  {errors.password && touched.password && (
                    <span className={styles.error}>{errors.password}</span>
                  )}
                </label>

                <button
                  type="submit"
                  className={styles.button}
                  disabled={loading}
                >
                  Log in
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    );
  }
}

/*
 * CONNECT
 */
const mapStateToProps = state => ({
  loginingMistakeInInput: selectorsLogin.getLoginingMistakeInInput(state),
  loading: selectorsLogin.getLoading(state),
  nowError: selectorsLogin.getError(state),
});

const mapDispatchToProps = {
  loginingThunk: thunk.loginingThunk,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect,
)(LoginPage);
