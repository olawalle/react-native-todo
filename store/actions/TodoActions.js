export const addTodo = todoItem => ({
  type: 'create_todo',
  payload: todoItem,
});

export const editTodo = data => ({
  type: 'edit_todo',
  payload: data,
});
