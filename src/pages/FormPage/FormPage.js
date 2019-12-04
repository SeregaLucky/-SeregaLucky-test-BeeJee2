/* import - node_modules */
import React, { Component } from 'react';
import shortid from 'shortid';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import T from 'prop-types';
import { toast } from 'react-toastify';
/* import - CSS */
import 'react-toastify/dist/ReactToastify.css';
import styles from './FormPage.module.css';
/* import - selectors */
import selectors from '../../redux/tasks/tasksSelectors';
/* import - THUNK */
import thunk from '../../redux/tasks/tasksOperations';

toast.configure();

const validationSchema = yup.object({
  username: yup
    .string()
    .min(2, 'минимум 2 символа')
    .max(35, 'Максимальное 35 символа')
    .required('Поле обезательное к заполнению'),

  email: yup
    .string()
    .email('Email не валиден')
    .min(2, 'минимум 2 символа')
    .max(35, 'Максимальное 35 символа')
    .required('Поле обезательное к заполнению'),

  text: yup
    .string()
    .max(5000, 'Максимальное 5000 символа')
    .required('Поле обезательное к заполнению'),
});

/*
 * COMPONENT
 */
class FormPage extends Component {
  inputIds = {
    usernameInputId: shortid.generate(),
    emailInputId: shortid.generate(),
    textInputId: shortid.generate(),
  };

  componentDidUpdate(prevProps) {
    const { newTask, formError } = this.props;

    if (newTask && newTask !== prevProps.newTask) this.addNewTask();

    if (formError) this.errorShow();
  }

  addNewTask = () => {
    toast.info('Новая задача добавлена!)', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  errorShow = () => {
    toast.error('Произошла ошибка... Попробуйте позде', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  render() {
    console.log('Form');
    const { newTask, loading, happenedError, addTaskThunk } = this.props;
    const { usernameInputId, emailInputId, textInputId } = this.inputIds;

    return (
      <Formik
        initialValues={{ username: '', email: '', text: '' }}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          console.log(data);
          const { username, email, text } = data;
          // setSubmitting(true);
          // setSubmitting(false);
          // setSubmitting(loading);
          addTaskThunk(username, email, text);
          resetForm();
        }}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor={usernameInputId} className={styles.label}>
              <span>Имя:</span>
              <input
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                id={usernameInputId}
              />

              {errors.username && touched.username && (
                <span className={styles.error}>{errors.username}</span>
              )}
            </label>

            <label htmlFor={emailInputId} className={styles.label}>
              <span>E-mail:</span>
              <input
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                id={emailInputId}
              />

              {errors.email && touched.email && (
                <span className={styles.error}>{errors.email}</span>
              )}
            </label>

            <label htmlFor={textInputId} className={styles.label}>
              <span>Задача:</span>
              <textarea
                type="text"
                name="text"
                value={values.text}
                onChange={handleChange}
                onBlur={handleBlur}
                id={textInputId}
                className={styles.textarea}
              />

              {errors.text && touched.text && (
                <span className={styles.error}>{errors.text}</span>
              )}
            </label>

            <button
              type="submit"
              // disabled={isSubmitting}
              disabled={loading}
              className={styles.button}
            >
              Add task
            </button>
          </form>
        )}
      </Formik>
    );
  }
}
// export default FormPage;

/*
 * CONNECT
 */
const mapStateToProps = state => ({
  newTask: selectors.getNewTask(state),
  loading: selectors.getIsLoading(state),
  formError: selectors.getError(state),
});

const mapDispatchToProps = dispatch => ({
  addTaskThunk: (username, email, text) =>
    dispatch(thunk.addTaskThunk(username, email, text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormPage);

{
  /* <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
            <pre>{JSON.stringify(touched, null, 2)}</pre> */
}
