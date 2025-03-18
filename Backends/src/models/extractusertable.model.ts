import db from "../config/db.config";

// Define Callback type
type Callback = (err: Error | null, results?: string[]) => void;

// Define types for the results (this may not directly match `mysql2`'s QueryResult)
interface TableResult {
    table_name: string;
}

export const tablename = (user_id: number, callback: Callback): void => {
    const query = `
        SELECT ut.table_name
        FROM user_tables ut
        WHERE ut.user_id = ?;
    `;

    // db.query now expects a callback with a specific signature
    db.query(query, [user_id], (err: Error | null, results: any, fields: any) => {
        if (err) {
            console.log("Error Fetching table names:", err);
            return callback(err);
        }

        if (results && Array.isArray(results) && results.length > 0) {
            // Map through the results to modify each table_name
            const modifiedTableNames = results.map((row: { table_name: string }) => modifystring(row.table_name));
            callback(null, modifiedTableNames); // Return the modified table names
        } else {
            callback(null, []); // No results found, return an empty array
        }
    });
};

const modifystring = (input: string): string => {
    if (typeof input !== 'string') {
        return ''; // Return an empty string if input is not a valid string
    }

    // Clean up the string
    const cleanedInput = input.replace(/_?table_?/i, '').trim();
    return cleanedInput.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
};
