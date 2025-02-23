import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();

const db = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASENAME,
});

db.connect((err)=>{
    if(err){
        console.log("Database connection failed: ",err);   
    }
    console.log("Successfully connected to MYSQL Database")
});

export default db;