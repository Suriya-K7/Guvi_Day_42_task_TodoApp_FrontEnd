import React from "react";

const Todo = ({ todo, handleDelete, handleStatus }) => {
  return (
    <div className="d-flex container-fluid todo p-2 align-items-center justify-content-between">
      <span
        className={`d-block w-25 text-light ${
          todo.complete ? "text-decoration-line-through text-muted " : ""
        }`}
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
