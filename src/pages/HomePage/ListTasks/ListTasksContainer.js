/* import - node_module */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import T from 'prop-types';
/* import - CSS */
import 'react-toastify/dist/ReactToastify.css';
/* import - selectors */
import selectors from '../../../redux/tasks/tasksSelectors';
import selectorsLogin from '../../../redux/login/loginSelectors';
/* import - COMPONENT */
import ListTasks from './ListTasks';

/*
 * COMPONENT
 */
class ListTasksContainer extends Component {
  static defaultProps = {
    tokenIsEnd: null,
    errorNow: null,
  };

  static propTypes = {
    listTasks: T.arrayOf(T.shape).isRequired,
    tokenIsEnd: T.shape(),
    errorNow: T.shape(),
  };

  componentDidUpdate(prevProps) {
    const { tokenIsEnd, errorNow } = this.props;

    if (tokenIsEnd && prevProps.tokenIsEnd !== tokenIsEnd)
      this.tokenIsEnd(tokenIsEnd);

    if (errorNow && prevProps.errorNow !== errorNow) this.errorShow();
  }

  tokenIsEnd = tokenIsEnd => {
    toast.warn(`${tokenIsEnd}`, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  errorShow = () => {
    toast.error('Произошла ошибка... Попробуйте позде', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  render() {
    const { listTasks } = this.props;

    return listTasks.length > 0 && <ListTasks listTasks={listTasks} />;
  }
}

/*
 * CONNECT
 */
const mapStateToProps = state => ({
  listTasks: selectors.getTasks(state),
  tokenIsEnd: selectorsLogin.getTokenIsEnd(state),
  errorNow: selectors.getError(state),
});

export default connect(mapStateToProps, null)(ListTasksContainer);
