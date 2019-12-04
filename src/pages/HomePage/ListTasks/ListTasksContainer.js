/* import - node_module */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
/* import - CSS */
import 'react-toastify/dist/ReactToastify.css';
/* import - THUNK */
import thunk from '../../../redux/tasks/tasksOperations';
/* import - selectors */
import selectors from '../../../redux/tasks/tasksSelectors';
import selectorsLogin from '../../../redux/login/loginSelectors';
/* import - COMPONENT */
import ListTasks from './ListTasks';

/*
 * COMPONENT
 */
class ListTasksContainer extends Component {
  componentDidMount() {
    const { getTasksThunk } = this.props;

    // getTasksThunk();
  }

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

// const mapDispatchToProps = dispatch => ({
//   getTasksThunk: () => dispatch(thunk.getTasksThunk()),
// });

export default connect(mapStateToProps, null)(ListTasksContainer);
