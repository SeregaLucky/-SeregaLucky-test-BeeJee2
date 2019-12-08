/* import - node_modules */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import T from 'prop-types';
/* import - CSS */
import styles from './Filter.module.css';
/* import - thunk */
import thunkTasks from '../../redux/tasks/tasksOperations';

const OPTIONS = [
  { text: 'ID по убыванию', value: '&sort_field=id&sort_direction=asc' },
  { text: 'ID по возростанию', value: '&sort_field=id&sort_direction=desc' },
  { text: 'Имена по убыванию', value: '&sort_field=name&sort_direction=asc' },
  {
    text: 'Имена по возростанию',
    value: '&sort_field=name&sort_direction=desc',
  },
  { text: 'E-mail по убыванию', value: '&sort_field=email&sort_direction=asc' },
  {
    text: 'E-mail по возростанию',
    value: '&sort_field=email&sort_direction=desc',
  },
  {
    text: 'Статусы в процессе',
    value: '&sort_field=status&sort_direction=asc',
  },
  {
    text: 'Статусы выполненые',
    value: '&sort_field=status&sort_direction=desc',
  },
];

/*
 * COMPONENT
 */
class Filter extends Component {
  static propTypes = {
    location: T.shape().isRequired,
    history: T.shape().isRequired,
    getTasksThunk: T.func.isRequired,
  };

  state = {
    fieldSort: '',
  };

  componentDidMount() {
    const { location } = this.props;

    /* Находим параметры запроса */
    const { sortField } = this.findParams(location.search);
    const { sortDirection } = this.findParams(location.search);

    if (sortField && sortDirection) {
      const fieldSort = `&sort_field=${sortField}&sort_direction=${sortDirection}`;

      this.setState({ fieldSort });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { history, location, getTasksThunk } = this.props;
    const { fieldSort } = this.state;

    /* Находим старые параметры запроса */
    const sortFieldPrev = this.findParams(prevState.fieldSort).sortField;
    const sortDirectionPrev = this.findParams(prevState.fieldSort)
      .sortDirection;

    /* Находим параметры запроса */
    const { page } = this.findParams(location.search);
    const { sortField } = this.findParams(fieldSort);
    const { sortDirection } = this.findParams(fieldSort);

    if (sortFieldPrev === sortField && sortDirectionPrev === sortDirection) {
      return;
    }

    if (!page) {
      getTasksThunk(null, sortField, sortDirection);

      history.push({
        ...location,
        search: `sort_field=${sortField}&sort_direction=${sortDirection}`,
      });

      return;
    }

    if (page) {
      getTasksThunk(page, sortField, sortDirection);

      history.push({
        ...location,
        search: `page=${page}&sort_field=${sortField}&sort_direction=${sortDirection}`,
      });
    }
  }

  findParams = params => {
    const page = new URLSearchParams(params).get('page');
    const sortField = new URLSearchParams(params).get('sort_field');
    const sortDirection = new URLSearchParams(params).get('sort_direction');

    return { page, sortField, sortDirection };
  };

  handleChangeSelect = ({ target }) => {
    const { value } = target;

    this.setState({ fieldSort: value });
  };

  render() {
    const { fieldSort } = this.state;

    return (
      <form className={styles.form}>
        <select
          neme="fieldSort"
          value={fieldSort}
          onChange={this.handleChangeSelect}
        >
          {OPTIONS.map(({ text, value }) => (
            <option key={value} value={value}>
              {text}
            </option>
          ))}
        </select>
      </form>
    );
  }
}

/*
 * CONNECT
 */
const mapDispatchToProps = {
  getTasksThunk: thunkTasks.getTasksThunk,
};

export default compose(connect(null, mapDispatchToProps), withRouter)(Filter);
