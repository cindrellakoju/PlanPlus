import db from "../config/db.config";

// Define Callback type
type Callback = (err: Error | null, results?: string[]) => void;

// Define types for the results (this may not directly match `mysql2`'s QueryResult)
interface TableResult {
    table_name: string;
}

export const tablename = (user_id: number, callback: Callback): void => {
    const query = `
        SELECT *
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
            // console.log(results);
        
            // Map through the results and modify table_name and exclude created_at, deleted_at
            const modifiedResults = results.map((row: any) => {
                // Modify the table_name
                const modifiedTableName = modifystring(row.table_name);
        
                // Create a new object without created_at and deleted_at
                const { created_at, updated_at, ...modifiedRow } = row;
        
                // Add the modified table_name to the row
                modifiedRow.table_name = modifiedTableName;
        
                return modifiedRow;
            });
        
            console.log(modifiedResults); // Log the modified results
            callback(null, modifiedResults); // Return the modified results
        }
         else {
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
