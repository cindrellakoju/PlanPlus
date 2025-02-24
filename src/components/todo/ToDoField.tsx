import React, { useEffect, useState } from "react";
import "../../styles/ToDo.css";
import InputField from "../allrequire/InputField";
import { fetchToDoList } from "../../services/todolist.services";  
import { Todo } from "../../types";

const ToDoField: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]); 

  // Fetch to-do list when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const todoList = await fetchToDoList();  // Call the imported fetch function
      setTodos(todoList);  // Update the state with the fetched data
    };

    fetchData();  // Trigger the fetch operation
  }, []);  // Empty dependency array, so this runs only once when the component mounts

  return (
    <div className="todofield">
      <div className="todolist">
        <ul>
          {todos.map((todo) => (
            <li key={todo.todolist_id}>{todo.task}</li>
          ))}
        </ul>
      </div>
      <InputField />
    </div>
  );
};

export default ToDoField;
