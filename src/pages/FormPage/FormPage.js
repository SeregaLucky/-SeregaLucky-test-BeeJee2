/* import - node_modules */
import React, { Component } from 'react';
import shortid from 'shortid';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import T from 'prop-types';
import { toast } from 'react-toastify';
/* import - CSS */
import 'react-toastify/dist/ReactToastify.css';
import styles from './FormPage.module.css';
/* import - selectors */
import selectorsTasks from '../../redux/tasks/tasksSelectors';
/* import - THUNK */
import thunkTasks from '../../redux/tasks/tasksOperations';

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
  static defaultProps = {
    newTask: null,
    formError: null,
  };

  static propTypes = {
    newTask: T.shape(),
    loading: T.bool.isRequired,
    formError: T.shape(),
    addTaskThunk: T.func.isRequired,
  };

  state = {
    deg: 0,
  };

  inputIds = {
    usernameInputId: shortid.generate(),
    emailInputId: shortid.generate(),
    textInputId: shortid.generate(),
  };

  timerId = null;

  componentDidMount() {
    const timerId = setInterval(this.changeBackgroundColor, 100);

    this.timerId = timerId;
  }

  componentDidUpdate(prevProps) {
    const { newTask, formError } = this.props;

    if (newTask && newTask !== prevProps.newTask) this.addNewTask();

    if (formError) this.errorShow();
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  changeBackgroundColor = () => {
    this.setState(state => ({ deg: state.deg + 1 }));
  };

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
    const { loading, addTaskThunk } = this.props;
    const { deg } = this.state;
    const { usernameInputId, emailInputId, textInputId } = this.inputIds;

    return (
      <section
        className={styles.section}
        style={{
          background: `linear-gradient(${deg}deg, #a5215e 3%, #ee5586 98%)`,
        }}
      >
        <Formik
          initialValues={{ username: '', email: '', text: '' }}
          onSubmit={(data, { resetForm }) => {
            const { username, email, text } = data;
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
                disabled={loading}
                className={styles.button}
              >
                Add task
              </button>
            </form>
          )}
        </Formik>
      </section>
    );
  }
}

/*
 * CONNECT
 */
const mapStateToProps = state => ({
  newTask: selectorsTasks.getNewTask(state),
  loading: selectorsTasks.getIsLoading(state),
});

const mapDispatchToProps = {
  addTaskThunk: thunkTasks.addTaskThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormPage);
