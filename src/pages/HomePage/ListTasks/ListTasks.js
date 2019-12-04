/* import - node_module */
import React from 'react';
/* import - CSS */

/* import - COMPONENT */
import ListItemTasks from './ListItemTasks/ListItemTasks';

/*
 * COMPONENT
 */
const ListTasks = ({ listTasks }) => {
  return (
    <ul>
      {console.log('ListTasks')}
      {listTasks.map(({ id }) => (
        <ListItemTasks key={id} id={id} />
      ))}
    </ul>
  );
};

export default ListTasks;
