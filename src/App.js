import React, { useEffect, useRef, useState } from "react";
import Todos from "./components/Todo/Todos";
import Api from "./api/Api";

const App = () => {
  let [todo, setTodo] = useState([]);
  const name = useRef("");

  useEffect(() => {
    let dbTodo = async () => {
      try {
        let response = await Api.get("/todos");
        setTodo(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    (async () => await dbTodo())();
  });
  function newTodo(name) {
    return {
      id: Date.now(),
      name: name,
      complete: false,
    };
  }

  async function handleAdd(e) {
    e.preventDefault();
    let addTodo = newTodo(name.current.value);
    try {
      await Api.post("/todos", addTodo);
      let newTodoList = [...todo, addTodo];
      setTodo(newTodoList);
    } catch (error) {
      console.error(console.error());
    }
    name.current.value = "";
    name.current.focus();
  }

  async function handleStatus(id) {
    let updatedTodo = todo.map((e) => {
      if (e["_id"] === id) {
        return { ...e, complete: !e.complete };
      } else {
        return e;
      }
    });
    try {
      let filteredUpdatedTodo = updatedTodo.find((e) => e["_id"] === id);
      await Api.patch(`/todos/${id}`, filteredUpdatedTodo);
    } catch (error) {
      console.error(console.error());
    }
    setTodo(updatedTodo);
  }

  async function handleDelete(id) {
    try {
      let filteredTodo = todo.filter((e) => e["_id"] !== id);
      await Api.delete(`/todos/${id}`);
      setTodo(filteredTodo);
    } catch (error) {
      console.error(console.error());
    }
  }

  return (
    <div className="container my-3">
      <h1 className="text-center text-light display-4">TODO APP</h1>
      <form onSubmit={handleAdd} className="p-3 d-flex gap-2">
        <input
          ref={name}
          type="text"
          required
          placeholder="add todo.."
          className="form-control"
        />
        <button className="btn btn-outline-primary" type="submit">
          Add
        </button>
      </form>
      <Todos
        todo={todo}
        handleDelete={handleDelete}
        handleStatus={handleStatus}
      />
    </div>
  );
};

export default App;
