import React, { useContext, useEffect, useState } from "react";
import "../../styles/ToDo.css";
import { fetchToDoList } from "../../services/todolist.services";  
import { Todo } from "../../types";
import { MyContext } from "../../context/Component.context";

const ToDoField: React.FC = () => {
  const context = useContext(MyContext);

  if(!context){
    console.log("Wrap ToDoField inside MyProvider")
  }

  const componentName = context?.components.find(component => component.name === "ToDo");
  const max_height = componentName?.position_y !== undefined ? `${componentName.position_y - 200}px` : "320px";

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
      <div className="todolist" style={{ height: max_height}}>
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
