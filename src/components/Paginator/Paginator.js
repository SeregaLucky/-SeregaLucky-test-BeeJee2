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
import selectors from '../../redux/tasks/tasksSelectors';
/* import - thunk */
import thunk from '../../redux/tasks/tasksOperations';

/*
 * COMPONENT
 */
class Paginator extends Component {
  state = {
    nowPageState: 0,
  };

  componentDidMount() {
    // const { location } = this.props;
    // let nowPageState = new URLSearchParams(location.search).get('page');
    // if (!nowPageState) {
    //   nowPageState = 0;
    // } else {
    //   nowPageState = Number(nowPageState) - 1;
    // }
    // this.setState({ nowPageState });
  }

  handlePageClick = data => {
    console.log('handlePageClick', data.selected);

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
    console.log('Paginator');

    const { totalCountTasks, location } = this.props;
    const { nowPageState } = this.state;
    const pageCount = Math.ceil(Number(totalCountTasks) / 3);

    let nowPage = new URLSearchParams(location.search).get('page');
    if (!nowPage) {
      nowPage = 0;
    } else {
      nowPage = Number(nowPage) - 1;
    }

    return (
      // totalCountTasks && (
      <div className={styles.contPag}>
        <ReactPaginate
          previousLabel="previous"
          nextLabel="next"
          breakLabel="..."
          breakClassName="break-me"
          pageCount={pageCount} // Общее количество страниц.
          marginPagesDisplayed={2} // Количество страниц для отображения полей.
          pageRangeDisplayed={5} // диапазон отображаймых страниц
          initialPage={nowPage} // Начальная страница
          // initialPage={nowPageState} // Начальная страница
          onPageChange={this.handlePageClick}
          containerClassName={styles.pagination}
          subContainerClassName="pages pagination"
          activeClassName={styles.linkActive}
        />
      </div>
      // )
    );
  }
}

/*
 * CONNECT
 */
const mapStateToProps = state => ({
  totalCountTasks: selectors.getTotalCountTasks(state),
});

const mapDispatchToProps = dispatch => ({
  getTasks: (clickPage, sortField, sortDirection) =>
    dispatch(thunk.getTasksThunk(clickPage, sortField, sortDirection)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(Paginator);

//
//
//

// /* Если номер страницы, поле поиска и как фильтровать */
// if (sortField && sortDirection) {
//   getTasks(null, sortField, sortDirection);

//   history.push({
//     ...location,
//     search: `sort_field=${sortField}&sort_direction=${sortDirection}`,
//   });

//   return;
// }
