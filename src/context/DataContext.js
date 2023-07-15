import { createContext, useEffect, useRef, useState } from "react";
import Api from "../api/Api";
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  let [todo, setTodo] = useState([]);
  const todoName = useRef("");

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
  }, []);

  function newTodo(name) {
    return {
      id: Date.now(),
      name: name,
      complete: false,
    };
  }

  async function handleAdd() {
    let addTodo = newTodo(todoName);
    console.log(addTodo);
    let newTodoList = todo.concat(addTodo);
    setTodo(newTodoList);
    try {
      await Api.post("/todos", addTodo);
    } catch (error) {
      console.error(console.error());
    }
    todoName.current.value = "";
    todoName.current.focus();
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
    <DataContext.Provider
      value={{
        todo,
        setTodo,
        handleDelete,
        handleStatus,
        handleAdd,
        todoName,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
