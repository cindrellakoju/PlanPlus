import { columndata } from "../models/extractcolumndata.model";
import { Datas } from "../types/todo.type";

export const getColumnData = (data:Datas): Promise<any> => {
    return new Promise((resolve, reject) => {  // Changed rejects to reject
        const tablename = convertToSnakeCase(data.tablename)
        const udata = {
            user_id: data.user_id,
            tablename: tablename
        };
        
        console.log(udata)
        // Assuming tablecolumnname is a function that queries the database
        columndata(udata, (err, results) => {
            if (err) {
                console.log("Error in services:", err);  // More specific log message
                reject(err);  // Rejecting the promise on error
            } else {
                resolve(results);  // Resolving the promise with results
            }
        })
    });
}

// Converts string to snake_case format and appends '_table' at the end
function convertToSnakeCase(input: string): string {
    return input
        .toLowerCase()                    // Convert to lowercase
        .replace(/\s+/g, '_')              // Replace spaces with underscores
        .replace(/[^\w_]+/g, '')           // Remove non-alphanumeric characters (optional)
        + '_table';                        // Append '_table' at the end
}