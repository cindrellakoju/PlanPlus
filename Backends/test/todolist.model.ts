
import db from "../src/config/db.config";
import { Callback,todo,inserttodo } from "../src/types/todo.type";

export const getTodolist = (callback: Callback) => {
    const query = "SELECT * FROM todolist";

//     const queryupdate = `
//     SELECT utd.data_id, utd.column_data, ut.table_name, ut.user_id
//     FROM user_table_data AS utd
//     JOIN user_tables AS ut ON utd.user_table_id = ut.user_table_id
//     WHERE ut.table_name = 'to_do_list_table' AND ut.user_id = 1;
//   `;
    // const queryupdate = "SELECT user_table_data.column_data FROM "
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching todolist:", err);  // You can add logging for debugging
            return callback(err);
        }
        console.log(results);
        callback(null, results);
    });
};

export const editToDoList=(obtainedtodo:todo,callback:Callback)=>{
    const { id, task ,due_date, status, priority} = obtainedtodo;
    const query = "UPDATE todolist SET task = ?, due_date = ?,status = ?, priority = ? WHERE todolist_id = ? "
    db.query(query,[task,due_date,status,priority,id],(error,results)=>{
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

export const insertIntoToDoList = (insertitem:inserttodo,callback:Callback) => {
    const { task, due_date, status, priority} = insertitem;
    const query = "INSERT INTO todolist(task, due_date, status, priority) VALUES( ? , ? , ? , ? )";
    db.query(query,[task,due_date,status,priority],(error,results) => {
        if(error){
            return callback(error)
        }
        return callback(null,{ message : "Successfully added Todolist "})
    })
}