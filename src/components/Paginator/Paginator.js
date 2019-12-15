/* import - node_modules */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import T from 'prop-types';
/* import - CSS */
import styles from './Paginator.module.css';
/* import - selectors */
import selectorsTasks from '../../redux/tasks/tasksSelectors';
/* import - thunk */
import thunkTasks from '../../redux/tasks/tasksOperations';

/*
 * COMPONENT
 */
class Paginator extends Component {
  static defaultProps = {
    totalCountTasks: null,
  };

  static propTypes = {
    location: T.shape().isRequired,
    history: T.shape().isRequired,
    totalCountTasks: T.string,
    getTasks: T.func.isRequired,
  };

  handlePageClick = data => {
    const { getTasks, history, location } = this.props;
    const clickPage = data.selected + 1;

    const page = new URLSearchParams(location.search).get('page');
    const sortField = new URLSearchParams(location.search).get('sort_field');
    const sortDirection = new URLSearchParams(location.search).get(
      'sort_direction',
    );

    /* Если есть номер страницы, поле поиска и как фильтровать */
    if (page && sortField && sortDirection) {
      getTasks(clickPage, sortField, sortDirection);

      history.push({
        ...location,
        search: `page=${clickPage}&sort_field=${sortField}&sort_direction=${sortDirection}`,
      });

      return;
    }

    /* Если не чего не подошло делаем это - запрос по умолчанию */
    getTasks(clickPage);

    history.push({
      ...location,
      search: `page=${clickPage}&sort_field=id&sort_direction=asc`,
    });
  };

  render() {
    const { totalCountTasks, location } = this.props;
    const pageCount = Math.ceil(Number(totalCountTasks) / 3);

    let nowPage = new URLSearchParams(location.search).get('page');
    if (!nowPage) {
      nowPage = 0;
    } else {
      nowPage = Number(nowPage) - 1;
    }

    return (
      <div className={styles.contPag}>
        <ReactPaginate
          previousLabel={pageCount > 1 && 'prev'}
          nextLabel={pageCount > 1 && 'next'}
          breakLabel="..."
          breakClassName="break-me"
          pageCount={pageCount} // Общее количество страниц.
          marginPagesDisplayed={2} // Количество страниц для отображения полей.
          pageRangeDisplayed={4} // диапазон отображаймых страниц
          initialPage={nowPage} // Начальная страница
          onPageChange={this.handlePageClick}
          containerClassName={styles.pagination}
          subContainerClassName="pages pagination"
          activeClassName={styles.linkActive}
        />
      </div>
    );
  }
}

/*
 * CONNECT
 */
const mapStateToProps = state => ({
  totalCountTasks: selectorsTasks.getTotalCountTasks(state),
});

const mapDispatchToProps = {
  getTasks: thunkTasks.getTasksThunk,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(Paginator);
