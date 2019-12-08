/* import - node_module */
import React from 'react';
import T from 'prop-types';
/* import - CSS */
import styles from './ListTasks.module.css';
/* import - COMPONENT */
import ListItemTasks from './ListItemTasks/ListItemTasks';

/*
 * COMPONENT
 */
const ListTasks = ({ listTasks }) => (
  <ul className={styles.list}>
    {listTasks.map(({ id }) => (
      <ListItemTasks key={id} id={id} />
    ))}
  </ul>
);

ListTasks.propTypes = {
  listTasks: T.arrayOf(T.shape).isRequired,
};

export default ListTasks;
