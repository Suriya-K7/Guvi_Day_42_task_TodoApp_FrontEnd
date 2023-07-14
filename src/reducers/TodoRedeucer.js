const todoReducer = (todos = [], action) => {
  switch (action.type) {
    case "ADDTODO":
      return [...todos, action.payload];
    case "COM":
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        } else {
          return todo;
        }
      });
    case "DEL":
      return todos.filter((todo) => todo.id !== action.payload.id);
    default:
      return todos;
  }
};

export default todoReducer;
