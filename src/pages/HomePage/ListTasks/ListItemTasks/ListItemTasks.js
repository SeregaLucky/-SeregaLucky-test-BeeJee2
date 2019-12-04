/* import - node_module */
import React, { Component } from 'react';
import { connect } from 'react-redux';
/* import - CSS */
/* import - selectors */
import selectors from '../../../../redux/tasks/tasksSelectors';
import selectorsLogin from '../../../../redux/login/loginSelectors';
/* import - THUNK */
import thunk from '../../../../redux/tasks/tasksOperations';

/*
 * COMPONENT
 */
class ListItemTasks extends Component {
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

    const { text, status, token, changeTaskThunk } = this.props;
    const { idNowEdit, textNow, statusNow } = this.state;

    changeTaskThunk(idNowEdit, textNow, statusNow, token);

    if (textNow !== text || statusNow !== status) {
    }
  };

  render() {
    console.log('ListItemTasks');

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
    // console.log(image_path, username, email, text, status);

    const isChangeTextItem = IdsItemsChangeText.some(itemId => itemId === id);
    console.log(isChangeTextItem);

    return (
      <li className={'styles.item'}>
        <div className={'styles.photo'}>
          {/* <img src={image_path} alt="avatar" /> */}
        </div>

        <div className={'styles.rigthContent'}>
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
          {isChangeTextItem && <p>Отредактированная</p>}

          {token && (
            <button
              type="button"
              // onClick={() => this.handleClick(id, text, status)}
              onClick={this.handleClick}
            >
              {idNowEdit ? 'Отмена' : 'Редактировать'}
            </button>
          )}

          {/* FORM CHANGE */}
          {token && idNowEdit === id && (
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="textNow"
                // value={text}
                value={textNow}
                onChange={this.handleChange}
              />

              <input
                type="checkbox"
                name="statusNow"
                // checked={status}
                checked={statusNow}
                onChange={this.handleChange}
              />

              <button type="submit" disabled={loading}>
                Отправить
              </button>
            </form>
          )}
        </div>
        <hr />
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
