import db from "../config/db.config";
import { Callback } from "../types/todo.type";

interface Datas {
  user_id: number;
  tablename: string;
}

export const tablecolumnname = (udata: Datas, callback: Callback): void => {
  const query = `
    SELECT utc.column_name
    FROM user_table_columns utc
    JOIN user_tables ut ON utc.user_table_id = ut.user_table_id
    WHERE ut.user_id = ? AND ut.table_name = ?
  `;

  // Execute the query with parameters to prevent SQL injection
  db.query(query, [udata.user_id, udata.tablename], (err, results) => {
    if (err) {
      console.log("Error fetching columns:", err);  // Log error with details
      return callback(err);  // Pass error to callback
    }

    console.log(results);  // Log results for debugging (remove in production)

    // Call the callback with null error and the results
    callback(null, results);
  });
};
