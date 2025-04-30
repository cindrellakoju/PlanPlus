import db from "../config/db.config";
import { Callback } from "../types/todo.type";

export const completedtask = (user_id:number,completed_at:Date| String,callback:Callback) => {

    const query=`
        SELECT utd.column_data, ut.table_name
        FROM user_table_data utd
        JOIN user_tables ut ON utd.user_table_id = ut.user_table_id
        WHERE ut.user_id = ? AND utd.completed_at = ?
    `
    
    db.query(query, [user_id, completed_at], (err, results) => {
        if (err) {
            console.log("Error fetching completed task");
            return callback(err);
        }
        callback(null, results);
    });
}