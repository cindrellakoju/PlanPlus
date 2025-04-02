import React, { useEffect, useState } from "react";
import "../../styles/ToDo.css";
import { fetchToDoList } from "../../services/todolist.services";  
import { Todo } from "../../types";
import ComponentWidthHeight from "../../utils/ComponentWidthHeight";
import { ChooseField } from "../allrequire/ChooseField";
import { Button } from "../allrequire/Button";
import axios from "axios";

interface ToDoFieldProps {
  urlname?: string; // Make urlname optional
}

const ToDoField: React.FC<ToDoFieldProps> = ({ urlname }) => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const data = {
    tablename: urlname,
  };
  const { inside_temp_height } = ComponentWidthHeight("ToDo");
  const [obtaineddata, setObtainedData] = useState<any[]>([]); // Set as any[] to store the raw data

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

  useEffect(() => {
    axios
      .post(`${backend_url}/user/columndata/2`, data)
      .then((response) => {
        // console.log('Response', response.data);
        setObtainedData(response.data); // Store the raw data
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }, [data]);

  return (
    <div className="todofield">
      <ChooseField/>
      <div className="todolist" style={{ height: inside_temp_height}}>
      {obtaineddata.map((item, index) => {
          const taskData = JSON.parse(item.column_data); // Parse the JSON string to get task data
          
          return (
            <div key={index} className="todo-item">
              <input 
                type="checkbox" 
                id={String(taskData.todolist_id)} 
                name={String(taskData.todolist_id)} 
              />
              <label htmlFor={String(taskData.todolist_id)}>{taskData.task}</label>
            </div>
          );
        })}

      </div>
      <Button/>
    </div>
  );
};

export default ToDoField;
