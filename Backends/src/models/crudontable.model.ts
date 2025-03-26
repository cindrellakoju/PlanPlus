import db from "../config/db.config";
import { Callback, idinfo, tableinfo, tableinfowithorderindex } from "../types/todo.type"

export const updateTableInfo = (id: idinfo, updatetableinfo: tableinfowithorderindex, callback: Callback) => {
    let queryValues: any[] = [];

    // Initialize an array to hold the set clauses for the query
    const setClauses: string[] = [];

    // Add the dynamic SET clauses
    for (const [key, value] of Object.entries(updatetableinfo)) {
        setClauses.push(`${key} = ?`); // Add each clause to the setClauses array
        queryValues.push(value);       // Add the corresponding value to queryValues
    }

    // Add the user_id and user_table_id to the queryValues
    queryValues.push(id.user_id, id.user_table_id);

    // Join all set clauses with a comma and build the query
    const setQuery = setClauses.join(', ');

    // Construct the final query with the WHERE clause
    const query = `
        UPDATE user_tables
        SET ${setQuery}
        WHERE user_id = ? AND user_table_id = ?
    `;

    // Assuming you're using a database client to execute the query
    db.query(query, queryValues, (error, result) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, result);
    });
};
