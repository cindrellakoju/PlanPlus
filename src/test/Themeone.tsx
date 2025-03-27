import axios from 'axios';
import React, { useState, ChangeEvent, useEffect } from 'react';

// Define the types for state
interface TodoAppProps {
  themename: string;
  urlname: string;
}

interface TaskData {
  task: string;
  priority: string;
  status: string;
}

const TodoApp: React.FC<TodoAppProps> = ({ themename, urlname }) => {
  const data = {
    tablename: urlname,
  };

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  // State to store the todo items
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');
  const [obtaineddata, setObtainedData] = useState<any[]>([]); // Set as any[] to store the raw data

  useEffect(() => {
    axios
      .post(`${backend_url}/user/columndata/2`, data)
      .then((response) => {
        console.log('Response', response.data);
        setObtainedData(response.data); // Store the raw data
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }, [data]);

  console.log('Obtained Data:', obtaineddata);

  // // Handle input change (event type is ChangeEvent<HTMLInputElement>)
  // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setInput(e.target.value);
  // };

  // // Add todo to the list
  // const handleAddTodo = () => {
  //   if (input.trim() !== '') {
  //     setTodos([...todos, input]);
  //     setInput(''); // Clear input field after adding
  //   }
  // };

  // // Handle deleting a todo
  // const handleDeleteTodo = (index: number) => {
  //   const updatedTodos = todos.filter((_, i) => i !== index);
  //   setTodos(updatedTodos);
  // };

  console.log('Url Name:', urlname);

  return (
    <div style={{ height: '500px', width: '500px', backgroundColor: 'pink' }}>
      <h1>{themename}</h1>

      {/* Display obtained data if available */}
      {obtaineddata && (
        <div>
          <h2>Obtained Tasks</h2>
          <ul>
            {obtaineddata.map((item, index) => {
              const taskData = JSON.parse(item.column_data); // Parse the JSON string to get task data
              return (
                <li key={index}>
                  <div><strong>Task:</strong> {taskData.task}</div>
                  <div><strong>Priority:</strong> {taskData.priority}</div>
                  <div><strong>Status:</strong> {taskData.status}</div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Todo list input */}
      <div>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Add a new todo"
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>

      {/* Todo list */}
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => handleDeleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
