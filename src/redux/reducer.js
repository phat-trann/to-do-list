const initState = JSON.parse(localStorage.getItem('tasks')) ?? [];

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'addTodo':
      let newTasks = [...state, action.payload]
      localStorage.setItem('tasks', JSON.stringify(newTasks));

      return newTasks;

    case 'updateTodo':
      let newState = state.map((todo) => {
        if (todo.id === action.payload.id)
          return { ...todo, isCompleted: action.payload.isCompleted, title: action.payload.title }
        return todo;
      });
      localStorage.setItem('tasks', JSON.stringify(newState));

      return newState;
    default:
      return state;
  }
};

export default reducer;
