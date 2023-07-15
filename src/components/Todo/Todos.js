import React from "react";
import Todo from "./Todo.js";

const Todos = ({ todo, handleDelete, handleStatus }) => {
  return (
    <div className="d-flex flex-column gap-3 ">
      {todo &&
        todo.map((item) => (
          <Todo
            key={item.id}
            todo={item}
            handleDelete={handleDelete}
            handleStatus={handleStatus}
          />
        ))}
    </div>
  );
};

export default Todos;
