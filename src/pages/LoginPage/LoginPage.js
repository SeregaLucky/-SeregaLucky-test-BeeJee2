/* import - node_modules */
import React, { Component } from 'react';
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
import loginSelectors from '../../redux/login/loginSelectors';
/* import - THUNK */
import thunk from '../../redux/login/loginOperations';

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

    if (nowError && prevProps.happenedError !== nowError) this.errorShow();
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
    const { token, loginingThunk, loading } = this.props;
    // const { login, password } = this.state;
    const { loginInputId, passwordInputId } = this.inputIds;

    console.log('Login');

    return (
      <section className={styles.section}>
        {token && <h2 className={token && styles.titleInside}>'Вошли=)'</h2>}

        {!token && (
          <Formik
            initialValues={{ login: '', password: '' }}
            onSubmit={(data, { resetForm }) => {
              console.log(data);
              const { login, password } = data;

              loginingThunk(login, password);

              resetForm();
            }}
            validationSchema={validationSchema}
          >
            {({ values, errors, touched }) => (
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
        )}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  token: loginSelectors.getToken(state),
  loginingMistakeInInput: loginSelectors.getLoginingMistakeInInput(state),
  loading: loginSelectors.getLoading(state),
  nowError: loginSelectors.getError(state),
});

const mapDispatchToProps = dispatch => ({
  loginingThunk: (username, password) =>
    dispatch(thunk.loginingThunk(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

{
  /* <pre>{JSON.stringify(values, null, 2)}</pre>
   <pre>{JSON.stringify(errors, null, 2)}</pre> */
}
