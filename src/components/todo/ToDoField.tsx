import React, { useEffect, useState } from "react";
import "../../styles/ToDo.css";
import { fetchToDoList } from "../../services/todolist.services";  
import { Todo } from "../../types";
import ComponentWidthHeight from "../../utils/ComponentWidthHeight";

const ToDoField: React.FC = () => {
  const { inside_temp_height } = ComponentWidthHeight("ToDo");

  const [todos, setTodos] = useState<Todo[]>([]); 
  const   [selectfield,setSelectField] = useState<string>("") 

  const handlefieldchange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectField(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const todoList = await fetchToDoList(); 
      setTodos(todoList);
    };

    fetchData();
  }, []); 

  return (
    <div className="todofield">
      <div className="chooseoption">
        <label htmlFor="field">Choose Field:  </label>
        <select id="field" onChange={handlefieldchange}>
            <option value="add">Add</option>
            <option value="edit">Edit</option>
            <option value="delete">Delete</option>
            <option value="completed">Mark as Completed</option>
        </select>
      </div>
      <div className="todolist" style={{ height: inside_temp_height}}>
        {todos.map((todo) => (
          <div key={todo.todolist_id} className="todo-item">
            <input type="checkbox" id={String(todo.todolist_id)} name={String(todo.todolist_id)} />
            <label htmlFor={String(todo.todolist_id)}>{todo.task}</label>
          </div>
        ))}
      </div>
      <button>Send</button>
    </div>
  );
};

export default ToDoField;
