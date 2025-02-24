import axios from "axios";
import { Todo } from "../types";

const API_URL = "http://localhost:5000/user/todo";  

// Fetch the to-do list from the API
export const fetchToDoList = async (): Promise<Todo[]> => {
    try {
      const response = await axios.get<Todo[]>(API_URL);
      return response.data; 
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log("Axios Error: ", err.message);
      } else {
        console.log("Error: ", err);
      }
      return []; 
    }
  };