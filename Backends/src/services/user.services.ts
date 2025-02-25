import { getTodolist, editToDoList, deleteToDoList, insertIntoToDoList } from "../models/user.model";
import { inserttodo, todo } from "../types/todo.type";

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

export const insertTodos = (insertodos : inserttodo):Promise<any> => {
    return new Promise((resolve,reject)=>{
        insertIntoToDoList(insertodos,(err,results)=>{
            if(err) reject(err);
            resolve(results)
        })
    })
}