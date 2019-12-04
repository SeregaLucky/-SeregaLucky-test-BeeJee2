const getTasks = state => state.tasks.items;
const getTotalCountTasks = state => state.tasks.itemsCount;
const getIsLoading = state => state.tasks.loading;
const getNewTask = state => state.tasks.newItem;
const getError = state => state.tasks.error;
const getIdsItemsChangeText = state => state.tasks.idsItemsChangeText;

const getFindItemById = (state, id) => {
  const listItems = getTasks(state);
  return listItems.find(item => item.id === id);
};

export default {
  getTasks,
  getTotalCountTasks,
  getIsLoading,
  getNewTask,
  getError,
  getIdsItemsChangeText,
  getFindItemById,
};
