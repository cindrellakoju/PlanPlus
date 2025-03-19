import db from "../config/db.config";
import { Callback, insertinfo } from "../types/todo.type";

export const InsertData = (insertdata: insertinfo, callback: Callback) => {
  // Destructuring `value` from `insertdata`
  const { value } = insertdata;

  // Constructing JSON object dynamically from the `value` (which is a `task`)
  const json_obj = Object.entries(value)  // Accessing the task inside `value`
    .map(([key, value]) => {
        console.log(`"${key}": "${value}"`)
      return `"${key}", "${value}"`;  // Mapping key-value pairs to JSON-like strings
    })
    .join(", ");  // Joining the key-value pairs with commas

  // SQL query to insert data
  const query = `
    INSERT INTO user_table_data (user_table_id, column_data)
    SELECT ut.user_table_id, 
      JSON_OBJECT(${json_obj})
    FROM user_tables ut
    JOIN user_table_columns utc ON ut.user_table_id = utc.user_table_id
    WHERE ut.user_id = ? 
    AND ut.table_name = ?  
    LIMIT 1;
  `;

  // Execute the query with parameters
  db.query(query, [insertdata.user_id, insertdata.tablename], (err, results) => {
    if (err) {
      console.log(`Error while inserting data into ${insertdata.tablename}:`, err);
      callback(err);  // Pass the error to the callback
    } else {
      callback(null, { message: `Successfully added to ${insertdata.tablename}` });  // Success message
    }
  });
};
