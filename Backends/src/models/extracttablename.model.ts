import db from "../config/db.config";
import { Callback } from "../types/todo.type";

export const extracttablename = (user_id : number,callback : Callback) => {
    const query = `
    SELECT table_name
    FROM user_tables ut
    WHERE ut.user_id = ?;
`;
    db.query(query,[user_id],(err,results) => {
        if(err){
            console.log("Error extracting tables")
            return
        }
        callback(null,results)
    })
}