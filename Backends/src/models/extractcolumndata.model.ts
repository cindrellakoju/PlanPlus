import db from "../config/db.config";
import { Callback, Datas } from "../types/todo.type";

export const columndata = (data:Datas ,callback:Callback) => {
    const query = `
        SELECT utd.column_data
        FROM user_table_data utd
        JOIN user_tables ut ON utd.user_table_id = ut.user_table_id
        WHERE ut.user_id = ? AND ut.table_name = ?;
    `;

    db.query(query,[data.user_id, data.tablename],(err,results) => {
        if(err){
            console.log("Error fetching data of column ",data.tablename,":",err)
            return callback(err)
        }
        callback(null,results)
    });
};