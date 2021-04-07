import {combineReducers} from 'redux';

const INITIAL_STATE = {
  tags: ['Important', 'Planned'],
  todos: [
    {
      id: '1232hgh',
      title: 'Meet with clients',
      date: '12th Jun, 21. 2pm',
      desc:
        'A short meeting to discuss with potential clients for my new products',
      completed: false,
      tags: ['Important'],
    },
    {
      id: '4386v87v',
      title: 'Interview new hires',
      date: '15th Jan, 21. 12pm',
      desc: 'Interview sessions for 3 potential hires',
      completed: true,
      tags: ['Important'],
    },
    {
      id: '8f5d57',
      title: 'Short nap',
      date: '2nd Mar, 21. 3pm',
      desc: '',
      completed: false,
      tags: ['Planned'],
    },
    {
      id: '09b875f',
      title: 'Watch the game',
      date: '22nd Mar, 21. 4:30pm',
      desc: '',
      completed: false,
      tags: ['Planned'],
    },
  ],
};

const todosReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'create_todo':
      const {todos} = state;
      return {...state, todos: [action.payload, ...todos]};

    case 'edit_todo':
      const todoID = action.payload;
      return {
        ...state,
        todos: [...state.todos].map(todo => {
          return {
            ...todo,
            completed: todo.id === todoID ? true : todo.completed,
          };
        }),
      };

    default:
      return state;
  }
};

export default combineReducers({
  todos: todosReducer,
});
