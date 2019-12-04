/* import - node_module */
import React from 'react';
/* import - CSS */

/* import - COMPONENT */
import Filter from '../../components/Filter/Filter';
import ListTasksContainer from './ListTasks/ListTasksContainer';
import Paginator from '../../components/Paginator/Paginator';

/*
 * COMPONENT
 */
const HomePage = () => {
  return (
    <>
      <Filter />
      <ListTasksContainer />
      <Paginator />
    </>
  );
};

export default HomePage;
