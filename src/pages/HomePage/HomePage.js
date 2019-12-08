/* import - node_module */
import React from 'react';
/* import - COMPONENT */
import Filter from '../../components/Filter/Filter';
import ListTasksContainer from './ListTasks/ListTasksContainer';
import Paginator from '../../components/Paginator/Paginator';

/*
 * COMPONENT
 */
const HomePage = () => (
  <>
    <Filter />
    <ListTasksContainer />
    <Paginator />
  </>
);

export default HomePage;
