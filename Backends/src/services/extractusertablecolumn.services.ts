import { tablecolumnname } from "../models/extractusertablecolumn.model"
import { Datas } from "../types/todo.type";
import { convertTable } from "../utils/converttable.utils";

export const getColumnName = (data: Datas): Promise<any> => {
    return new Promise((resolve, reject) => {  // Changed rejects to reject
        const tablename = convertTable(data.tablename)
        const udata = {
            user_id: data.user_id,
            tablename: tablename
        };
        // Assuming tablecolumnname is a function that queries the database
        tablecolumnname(udata, (err, results) => {
            if (err) {
                console.log("Error in services:", err);  // More specific log message
                reject(err);  // Rejecting the promise on error
            } else {
                resolve(results);  // Resolving the promise with results
            }
        })
    });
}
