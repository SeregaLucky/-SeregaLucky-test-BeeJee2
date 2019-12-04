/* import - node_modules */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import T from 'prop-types';
/* import - CSS */
import styles from './Filter.module.css';
/* import - thunk */
import thunk from '../../redux/tasks/tasksOperations';

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

class Filter extends Component {
  // static propTypes = {
  //   location: T.shape().isRequired,
  //   history: T.shape().isRequired,
  //   getTasksThunk: T.func.isRequired,
  // };

  state = {
    fieldSort: '',
  };

  componentDidMount() {
    const { location, getTasksThunk } = this.props;

    /* Находим параметры запроса */
    const { page } = this.findParams(location.search);
    const { sortField } = this.findParams(location.search);
    const { sortDirection } = this.findParams(location.search);
    // console.log('filter PAGE ', page);
    // console.log('filter sortField ', sortField);
    // console.log('filter sortDirection ', sortDirection);

    if (sortField && sortDirection) {
      const fieldSort = `&sort_field=${sortField}&sort_direction=${sortDirection}`;

      this.setState({ fieldSort });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { history, location, getTasksThunk } = this.props;
    const { fieldSort } = this.state;

    /* Находим старые параметры запроса */
    const pagePrev = this.findParams(prevState.fieldSort).page;
    const sortFieldPrev = this.findParams(prevState.fieldSort).sortField;
    const sortDirectionPrev = this.findParams(prevState.fieldSort)
      .sortDirection;

    /* Находим параметры запроса */
    const { page } = this.findParams(location.search);
    const { sortField } = this.findParams(fieldSort);
    const { sortDirection } = this.findParams(fieldSort);

    // console.log('componentDidUpdate PAGE', page);

    if (sortFieldPrev === sortField && sortDirectionPrev === sortDirection)
      return;
    // console.log(555);

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
    console.log('Filter');
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

// export default Filter;

const mapDispatchToProps = dispatch => ({
  getTasksThunk: (clickPage, sortField, sortDirection) =>
    dispatch(thunk.getTasksThunk(clickPage, sortField, sortDirection)),
});

// export default compose(connect(null, mapDispatchToProps))(Filter);
export default compose(connect(null, mapDispatchToProps), withRouter)(Filter);

// {/* ID */}
// <option value="&sort_field=id&sort_direction=asc">
//   ID по убыванию
// </option>
// <option value="&sort_field=id&sort_direction=desc">
//   ID по возростанию
// </option>

// {/* NAME */}
// <option value="&sort_field=name&sort_direction=asc">
//   Имена по убыванию
// </option>
// <option value="&sort_field=name&sort_direction=desc">
//   Имена по возростанию
// </option>

// {/* E-MAIL */}
// <option value="&sort_field=email&sort_direction=asc">
//   E-mail по убыванию
// </option>
// <option value="&sort_field=email&sort_direction=desc">
//   E-mail по возростанию
// </option>

// {/* STATUS */}
// <option value="&sort_field=status&sort_direction=asc">
//   Статусы в процессе
// </option>
// <option value="&sort_field=status&sort_direction=desc">
//   Статусы выполненые
// </option>
