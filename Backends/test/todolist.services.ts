import { getTodolist, editToDoList, deleteToDoList, insertIntoToDoList } from "./todolist.model";
import { inserttodo, todo } from "../src/types/todo.type";

// Define more specific return types instead of 'any'
export const fetchTodos = (): Promise<todo[]> => {
    return new Promise((resolve, reject) => {
        getTodolist((err: Error, results: todo[]) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// Add proper parameter typing and return type
export const editTodos = (updatedTodos: todo): Promise<boolean | todo> => {
    return new Promise((resolve, reject) => {
        editToDoList(updatedTodos, (err: Error, results: boolean | todo) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// Specify return type for delete operation
export const deleteTodos = (id: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        deleteToDoList(id, (err: Error, results: boolean) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// Specify return type for insert operation
export const insertTodos = (insertTodos: inserttodo): Promise<todo> => {
    return new Promise((resolve, reject) => {
        insertIntoToDoList(insertTodos, (err: Error, results: todo) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// Optional: Add error handling middleware
export const handleTodoError = (fn: Function) => {
    return async (...args: any[]) => {
        try {
            return await fn(...args);
        } catch (error) {
            throw new Error(`Todo operation failed: ${error}`);
        }
    };
};

// Usage example with error handling:
// export const safeFetchTodos = handleTodoError(fetchTodos);