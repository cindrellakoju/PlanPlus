import dotenv from "dotenv";
import axios from "axios";

// Load environment variables from the .env file
dotenv.config();

// URL is hardcoded here, but you could load it from the .env file
const API_URL = "http://localhost:5000/todo";  // Assuming the API returns a list of todos

// Define an interface for the Todo data (adjusted to match your table structure)
interface Todo {
  todolist_id: number;  // The unique ID for each task
  task: string;         // The task description
  due_date: string;     // The due date for the task, represented as a string (DATETIME format)
  priority: 'low' | 'medium' | 'high';  // Task priority (low, medium, high)
  status: 'pending' | 'completed' | 'overdue';  // Task status
  created_at: string;   // Timestamp for when the task was created
  updated_at: string;   // Timestamp for when the task was last updated
}

// Fetch the to-do list from the API
export const fetchToDoList = async () => {
  try {
    // Make an HTTP GET request to the API_URL
    const response = await axios.get<Todo[]>(API_URL);  // Define response type

    // Log the data fetched from the API
    console.log("Fetched To-Do List: ", response.data);
  } catch (err) {
    // Handle errors and log the error message
    if (axios.isAxiosError(err)) {
      console.log("Axios Error: ", err.message);
    } else {
      console.log("Error: ", err);
    }
  }
};

fetchToDoList()
