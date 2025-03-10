import db from "../config/db.config";
import { Callback, user } from "../types/todo.type";

export const insertUser = (obtaineduser: user,callback : Callback) => {
    const { first_name, last_name, email , password} = obtaineduser
    const query = "INSERT INTO  user ( user_id, first_name, last_name, email, password) VALUES( ?, ?, ?, ?, ?)";

    db.query(query,[first_name , last_name, email, password],(error,results) => {
        if(error){
            console.log("Error inserting table in USER Table");
            return callback(error);
        }
        callback(null,{ message : "Successfully updated USer Table"})
    })
}