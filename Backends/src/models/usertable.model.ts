import db from "../config/db.config";
import { Callback, user } from "../types/todo.type";
import { RowDataPacket } from "mysql2"; 

export const insertUser = (obtaineduser: user,callback : Callback) => {
    const { first_name, last_name, email , password} = obtaineduser
    const query = "INSERT INTO  users ( first_name, last_name, email, password) VALUES( ?, ?, ?, ?)";

    db.query(query,[first_name , last_name, email, password],(error,results) => {
        if(error){
            console.log("Error inserting table in USER Table");
            return callback(error);
        }
        callback(null,{ message : "Successfully updated USer Table"})
    })
}

export const findByEmail = (email: string, callback: Callback) => {
    const query = "SELECT * FROM users WHERE email = ?";

    db.query(query, [email], (error, results: RowDataPacket[]) => {  
        if (error) {
            console.log("Error fetching user by email");
            return callback(error, null);
        }

        console.log("Result:",results)
        
        // Determine if email was found
        const foundEmail: boolean = results.length > 0;

        // Return the result through the callback
        callback(null, { foundEmail });
    });
}

export const fetchLoginInfo = (email: string, callback: Callback) => {
    const query = "SELECT * FROM user WHERE email = ?";
    // console.log(query)

    db.query(query, [email], (error, results) => {
        if (error) {
            console.log("Error fetching user info:", error);
            return callback(error);
        }
        // console.log(results)
        callback(null, results);
    });
}
