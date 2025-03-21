import db from "../src/config/db.config";
import { userinputfortable, Callback } from "../src/types/todo.type";

export const CreateTableByUserModel = (userinputfortable: userinputfortable, callback: Callback) => {
    const tablename: string = userinputfortable.name;

    // Generates the SQL query for creating the table
    const generateQuery = () => {
        // Create the column definitions string by iterating through the arrays
        const columnInfo = userinputfortable.colname
            .map((colname, index) => {
                const coltype = userinputfortable.coltype[index];
                const unique = userinputfortable.unique[index] ? "UNIQUE" : ""; // Check uniqueness for each column
                return `${colname} ${coltype} NOT NULL ${unique}`.trim();
            })
            .join(", "); // Join all column definitions with commas

        // SQL query template with PRIMARY KEY as the first column (auto-incremented id)
        const query = `
            CREATE TABLE IF NOT EXISTS ${tablename} (
                ${tablename}_id INT PRIMARY KEY AUTO_INCREMENT,  -- Primary key auto-increment
                ${columnInfo},                                 -- Dynamic columns
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Auto timestamp fields
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `;
        return query;
    };

    // Generate the query string
    const query = generateQuery();

    // Execute the SQL query using db.query
    db.query(query, (err, results) => {
        if (err) {
            console.log(`Error creating table ${tablename}:`, err);
            // Invoke the callback with the error
            callback(err, null);
            return;
        }
        console.log(`Successfully created table ${tablename}`, results);
        // Invoke the callback with the results
        callback(null, results);
    });
};
