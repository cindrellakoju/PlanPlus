import db from "../config/db.config";
import { Callback } from "../types/todo.type";

type ColumnData = Record<string, any>;

interface QueryResult {
    column_data: string; // Assuming column_data is a JSON string
}
const tableinfo = (callback:Callback) => {
    const tablename = "to_do_list_table"
    const query = `
        SELECT utd.column_data
        FROM user_table_data utd
        JOIN user_tables ut ON utd.user_table_id = ut.user_table_id
        WHERE ut.user_id = 1;
    `;

    db.query(query,(err:Error,results:QueryResult[]) => {
        if(err){
            console.log("Error fetching data",err);
            return callback(err)
        }

        if(results.length === 0){
            console.log("No data found for user ");
            return callback(null,[])
        }

        try {
            // Assuming column_data is stored as a JSON string in the database
            const columnData: string = results[0].column_data;
      
            // Parse column_data from JSON string to an object
            const parsedData: ColumnData = JSON.parse(columnData);
      
            // Return the parsed data to the callback
            return callback(null, parsedData);
          } catch (parseError) {
            // If JSON parsing fails, log and return the error
            console.error("Error parsing JSON data:", parseError);
            return callback(parseError, null);
          }
    })
}


export default tableinfo