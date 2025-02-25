import db from "../config/db.config";
import { Callback,todo } from "../types/todo.type";

export const getTodolist = (callback: Callback) => {
    const query = "SELECT * FROM todolist";

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching todolist:", err);  // You can add logging for debugging
            return callback(err);
        }
        callback(null, results);
    });
};

export const editToDoList=(obtainedtodo:todo,callback:Callback)=>{
    const { id, task , status, priority} = obtainedtodo;
    const query = "UPDATE todolist SET task = ?, status = ?, priority = ? WHERE todolist_id = ? "
    db.query(query,[task,status,priority,id],(error,results)=>{
        if(error){
            console.log("Error Updating the data: ",error)
            return callback(error);
        }
        callback(null,{ message : "Succcessfully updated "})
    })
}

export const deleteToDoList = (id:number,callback:Callback)=>{
    const deleteid = id;
    const query = "DELETE FROM todolist WHERE todolist_id = ? "
    db.query(query,[id],(error,results)=>{
        if(error){
            console.log("Error deleting todolst item",error)
            return callback(error);
        }
        callback(null,{ message : "Successfully deleted"})
    })
}