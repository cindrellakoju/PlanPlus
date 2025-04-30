import db from "../config/db.config";
import { Callback, insertinfo, updateinfo } from "../types/todo.type";

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
    WHERE ut.user_id = ? 
    AND ut.table_name = ?  
    LIMIT 1;
  `;

  console.log("Quey:",query)
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

export const UpdateData = (updatedata: updateinfo, callback: Callback) => {
  let keyval = '';
  let queryValues = [];
  let updateCompletedAt = false;

  try {
    const valueObj: { [key: string]: string } =
      typeof updatedata.value === 'string' ? JSON.parse(updatedata.value) : {};

    for (const [key, val] of Object.entries(valueObj)) {
      keyval += `'$."${key}"', ?, `;
      queryValues.push(val);

      if (key === 'status' && val.toLowerCase() === 'completed') {
        updateCompletedAt = true;
      }
    }

    // ✅ Slice before building setClause
    keyval = keyval.slice(0, -2);

    // ✅ Now build the SET clause safely
    let setClause = `column_data = JSON_SET(column_data, ${keyval})`;
    if (updateCompletedAt) {
      setClause += `, completed_at = CURDATE()`;
    }

    const query = `
      UPDATE user_table_data
      SET ${setClause}
      WHERE user_table_id = (
        SELECT ut.user_table_id
        FROM user_tables ut
        JOIN user_table_columns utc ON ut.user_table_id = utc.user_table_id
        WHERE ut.user_id = ?   
          AND ut.table_name = ? 
        LIMIT 1
      )
      AND data_id = ?;
    `;

    queryValues.push(updatedata.user_id, updatedata.tablename, updatedata.data_id);

    console.log("Query:", query);
    console.log("Values:", queryValues);

    db.query(query, queryValues, (err, results) => {
      if (err) {
        console.log("Error updating Data:", err);
        return callback(err);
      }
      callback(null, results);
    });

  } catch (error) {
    console.error("Error parsing updatedata.value:", error);
    return callback(error);
  }
};


export const DeleteData = (user_id:number,data_id:number,callback:Callback) => {
  const query = `
    DELETE utd 
    FROM user_table_data utd
    JOIN user_tables ut ON utd.user_table_id = ut.user_table_id
    WHERE utd.data_id = ? AND ut.user_id = ?
  `
  db.query(query,[data_id,user_id],(err,results) => {
    if(err){
      console.log("Error deleting data of id :",data_id)
      callback(err,null)
    }
    console.log("Successfully deleted data :",data_id)
    callback(null,results)
  })
}