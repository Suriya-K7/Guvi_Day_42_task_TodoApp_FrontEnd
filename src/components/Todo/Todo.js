import React from "react";

const Todo = ({ todo, handleDelete, handleStatus }) => {
  return (
    <div className="d-flex container-fluid align-items-center justify-content-between">
      <span
        className={`d-block w-25 ${
          todo.complete ? "text-decoration-line-through" : ""
        }`}
        style={{ color: todo.complete ? "#AAA" : "#000" }}
      >
        {todo.name}
      </span>
      <div className="d-flex gap-3">
        <button
          className="btn btn-outline-secondary"
          disabled={todo.complete ? true : false}
          onClick={() => handleStatus(todo["_id"])}
        >
          {todo.complete ? "Done" : "Pending"}
        </button>
        <button
          className="btn btn-outline-danger"
          onClick={() => handleDelete(todo["_id"])}
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
