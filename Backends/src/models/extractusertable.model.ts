import db from "../config/db.config";
import { Callback } from "../types/todo.type";

// Define types for the results
interface TableResult {
    table_name: string;
}

// Define the query function
export const tablename = (callback: Callback) => {
    const query = `
        SELECT ut.table_name
        FROM user_tables ut
        WHERE ut.user_id = 1;
    `;

    db.query(query, (err: Error | null, results: TableResult[]) => {
        if (err) {
            console.log("Error Fetching table names");
            return callback(err);
        }

        if (results && results.length > 0) {
            // Map through the results to modify each table_name
            const modifiedTableNames = results.map((row) => modifystring(row.table_name));
            callback(null, modifiedTableNames); // Return the modified table names
        } else {
            callback(null, []); // No results found, return an empty array
        }
    });
};

const modifystring = (input: string): string => {
    const cleanedInput = input.replace(/_?table_?/i, '').trim();
    return cleanedInput.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
};
