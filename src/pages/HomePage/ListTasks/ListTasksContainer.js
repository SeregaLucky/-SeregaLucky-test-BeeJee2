/* import - node_module */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import T from 'prop-types';
/* import - CSS */
import 'react-toastify/dist/ReactToastify.css';
/* import - selectors */
import selectorsTasks from '../../../redux/tasks/tasksSelectors';
import selectorsLogin from '../../../redux/login/loginSelectors';
/* import - COMPONENT */
import ListTasks from './ListTasks';
import Spinner from '../../../components/Spinner/Spinner';

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
    loading: T.bool.isRequired,
    tokenIsEnd: T.string,
    errorNow: T.shape(),
  };

  componentDidUpdate(prevProps) {
    const { tokenIsEnd, errorNow } = this.props;

    if (prevProps.tokenIsEnd !== tokenIsEnd) {
      this.tokenIsEnd(tokenIsEnd);
    }

    if (errorNow && prevProps.errorNow !== errorNow) {
      this.errorShow();
    }
  }

  tokenIsEnd = tokenIsEnd => {
    toast.warn(`${tokenIsEnd}. Или токен отсутствует. Перезайдите заново!`, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  errorShow = () => {
    toast.error('Произошла ошибка... Попробуйте позде', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  render() {
    const { listTasks, loading } = this.props;

    return (
      <>
        {listTasks.length > 0 && <ListTasks listTasks={listTasks} />}
        {loading && <Spinner />}
      </>
    );
  }
}

/*
 * CONNECT
 */
const mapStateToProps = state => ({
  listTasks: selectorsTasks.getTasks(state),
  tokenIsEnd: selectorsLogin.getTokenIsEnd(state),
  loading: selectorsTasks.getIsLoading(state),
  errorNow: selectorsTasks.getError(state),
});

export default connect(mapStateToProps, null)(ListTasksContainer);
