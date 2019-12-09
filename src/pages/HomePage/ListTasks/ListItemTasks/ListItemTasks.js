/* eslint-disable */
/* import - node_module */
import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import T from 'prop-types';
/* import - CSS */
import styles from './ListItemTasks.module.css';
/* import - selectors */
import selectorsTasks from '../../../../redux/tasks/tasksSelectors';
import selectorsLogin from '../../../../redux/login/loginSelectors';
/* import - THUNK */
import thunkTasks from '../../../../redux/tasks/tasksOperations';

/*
 * COMPONENT
 */
class ListItemTasks extends Component {
  static defaultProps = {
    token: null,
    image_path: null,
  };

  static propTypes = {
    token: T.string,
    id: T.number.isRequired,
    text: T.string.isRequired,
    status: T.number.isRequired,
    image_path: T.string,
    username: T.string.isRequired,
    email: T.string.isRequired,
    loading: T.bool.isRequired,
    IdsItemsChangeText: T.arrayOf(T.number).isRequired,
    changeTaskThunk: T.func.isRequired,
  };

  state = {
    idNowEdit: null,
    textNow: '',
    statusNow: null,
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.clickKeyboard);
  }

  handleClick = () => {
    const { id, text, status } = this.props;
    const { idNowEdit } = this.state;

    if (!idNowEdit) {
      this.setState({
        idNowEdit: id,

        textNow: text,
        statusNow: status === 10,
      });

      window.addEventListener('keydown', this.clickKeyboard);

      return;
    }

    this.setState({ idNowEdit: null });
    window.removeEventListener('keydown', this.clickKeyboard);
  };

  /* Выходить с редктирование по нажатию на Escape */
  clickKeyboard = e => {
    if (e.code !== 'Escape') return;

    this.setState({ idNowEdit: null });
    window.removeEventListener('keydown', this.clickKeyboard);
  };

  /* Клик по айтему - выйти с редактирования */
  handleItemClick = e => {
    console.log(e.target);
    const nodeName = e.target.nodeName;

    if (!this.state.idNowEdit) return;
    if (nodeName === 'INPUT' || nodeName === 'BUTTON' || nodeName === 'FORM') {
      return;
    }

    this.setState({ idNowEdit: null });
  };

  handleChange = ({ target }) => {
    const { name, value, type, checked } = target;

    this.setState({ [name]: type === 'checkbox' ? checked : value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { token, changeTaskThunk } = this.props;
    const { idNowEdit, textNow, statusNow } = this.state;

    changeTaskThunk(idNowEdit, textNow, statusNow, token);
  };

  render() {
    const {
      id,
      image_path,
      username,
      email,
      text,
      status,
      token,
      loading,
      IdsItemsChangeText,
    } = this.props;
    const { idNowEdit, textNow, statusNow } = this.state;

    const isChangeTextItem = IdsItemsChangeText.some(itemId => itemId === id);

    return (
      <li className={styles.item} onClick={this.handleItemClick}>
        <div className={styles.photo}>
          <img src={image_path} alt="avatar" />
        </div>

        <div>
          <ul className={styles.listInfo}>
            <li>
              <p>
                <b>Имя:</b> {username}
              </p>
            </li>
            <li>
              <p>
                <b>E-mail:</b> {email}
              </p>
            </li>
            <li>
              <p>
                <b>Задача:</b> {text}
              </p>
            </li>
            <li>
              <p>
                <b>Статус задачи:</b>{' '}
                {status === 10 ? 'Выполнен' : 'В процессе'}
              </p>
            </li>
            <li>
              {isChangeTextItem && (
                <p>
                  <b>Отредактировано администратором</b>
                </p>
              )}
            </li>
          </ul>

          {token && (
            <button
              className={
                idNowEdit ? styles.buttonEditTrue : styles.buttonEditFalse
              }
              type="button"
              onClick={this.handleClick}
            >
              {idNowEdit ? 'Выйти с Редактирования' : 'Редактировать'}
            </button>
          )}

          {/* FORM CHANGE */}
          {token && idNowEdit === id && (
            <form className={styles.formChange} onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="textNow"
                value={textNow}
                onChange={this.handleChange}
              />

              <input
                type="checkbox"
                name="statusNow"
                checked={statusNow}
                onChange={this.handleChange}
              />

              <button
                className={styles.buttonSend}
                type="submit"
                disabled={loading}
              >
                Отправить
              </button>
            </form>
          )}
        </div>
      </li>
    );
  }
}

/*
 * CONNECT
 */
const mapStateToProps = (state, { id }) => {
  const item = selectorsTasks.getFindItemById(state, id);
  const token = selectorsLogin.getToken(state);
  const loading = selectorsTasks.getIsLoading(state);
  const IdsItemsChangeText = selectorsTasks.getIdsItemsChangeText(state);

  return {
    ...item,
    token,
    loading,
    IdsItemsChangeText,
  };
};

const mapDispatchToProps = {
  changeTaskThunk: thunkTasks.changeTaskThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListItemTasks);
