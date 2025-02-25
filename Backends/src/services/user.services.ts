import { getTodolist, editToDoList, deleteToDoList } from "../models/user.model";
import { todo } from "../types/todo.type";

export const fetchTodos = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        getTodolist((err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
}

export const editTodos = (updatedtodos:todo): Promise<any> =>{
    return new Promise((resolve,reject)=>{
        editToDoList(updatedtodos,(err,results)=>{
            if(err) reject(err);
            resolve(results)
        })
    })
}

export const deleteTodos = (id:number):Promise<any> =>{
    return new Promise((resolve,reject)=>{
        deleteToDoList(id,(err,results)=>{
            if(err) reject(err);
            resolve(results)
        })
    })
}