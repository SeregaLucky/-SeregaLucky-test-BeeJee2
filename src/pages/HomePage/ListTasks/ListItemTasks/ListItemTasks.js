/* eslint-disable */
/* import - node_module */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import T from 'prop-types';
/* import - CSS */
import styles from './ListItemTasks.module.css';
/* import - selectors */
import selectors from '../../../../redux/tasks/tasksSelectors';
import selectorsLogin from '../../../../redux/login/loginSelectors';
/* import - THUNK */
import thunk from '../../../../redux/tasks/tasksOperations';

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

  handleClick = () => {
    const { id, text, status } = this.props;
    const { idNowEdit } = this.state;

    if (!idNowEdit) {
      this.setState({
        idNowEdit: id,

        textNow: text,
        statusNow: status === 10,
      });

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
      <li className={styles.item}>
        <div className={styles.photo}>
          <img src={image_path} alt="avatar" />
        </div>

        <div>
          <p>
            <b>Имя:</b> {username}
          </p>
          <p>
            <b>E-mail:</b> {email}
          </p>
          <p>
            <b>Задача:</b> {text}
          </p>
          <p>
            <b>Статус задачи:</b> {status === 10 ? 'Выполнен' : 'В процессе'}
          </p>
          {isChangeTextItem && (
            <p>
              <b>Отредактированная пдминистратором</b>
            </p>
          )}

          {token && (
            <button type="button" onClick={this.handleClick}>
              {idNowEdit ? 'Отмена' : 'Редактировать'}
            </button>
          )}

          {/* FORM CHANGE */}
          {token && idNowEdit === id && (
            <form onSubmit={this.handleSubmit}>
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

              <button type="submit" disabled={loading}>
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
  const item = selectors.getFindItemById(state, id);
  const token = selectorsLogin.getToken(state);
  const loading = selectors.getIsLoading(state);
  const IdsItemsChangeText = selectors.getIdsItemsChangeText(state);

  return {
    ...item,
    token,
    loading,
    IdsItemsChangeText,
  };
};

const mapDispatchToProps = dispatch => ({
  changeTaskThunk: (id, text, status, token) =>
    dispatch(thunk.changeTaskThunk(id, text, status, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListItemTasks);
