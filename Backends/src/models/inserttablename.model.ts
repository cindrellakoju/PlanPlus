import db from "../config/db.config";
import { Callback, tableinfo } from "../types/todo.type";
import { RowDataPacket } from 'mysql2';  // Import RowDataPacket type if using mysql2

const insertTableName = (tableinfo: tableinfo, callback: Callback) => {
    // Step 1: Fetch the current maximum orderindex for the given user_id
    const query = `
        SELECT MAX(orderindex) AS maxorderindex
        FROM user_tables
        WHERE user_id = ?;
    `;

    // Explicitly type the results as RowDataPacket[]
    db.query(query, [tableinfo.user_id], (err, results: RowDataPacket[]) => {
        if (err) {
            console.log("Error fetching order index:", err);
            return callback(err, null);
        }

        // Step 2: Access the first row's maxorderindex properly
        console.log(results);  // Log to inspect the result structure

        // Ensure the result is an array and that it contains the expected row
        if (Array.isArray(results) && results.length > 0 && results[0].maxorderindex !== null) {
            // Access maxorderindex from the first row and convert to number
            const maxorderindex = Number(results[0].maxorderindex);
            console.log("Current max order index:", maxorderindex);

            // Step 3: Calculate the next orderindex
            const newOrderindex = maxorderindex + 1;  // Increment the max order index by 1
            console.log("New order index", newOrderindex);

            // Step 4: Insert the new record into the database with the calculated orderindex
            const insertQuery = `
                INSERT INTO user_tables (user_id, table_name, theme_id, orderindex, width, height)
                VALUES (?, ?, ?, ?, ?, ?);
            `;

            db.query(insertQuery, [tableinfo.user_id, tableinfo.table_name, tableinfo.theme_id, newOrderindex, tableinfo.width, tableinfo.height], (err, insertResults) => {
                if (err) {
                    console.log("Error inserting data:", err);
                    return callback(err, null);
                }

                // Step 5: Return success via callback
                console.log("Data inserted successfully:", insertResults);
                callback(null, insertResults);
            });
        } else {
            // If no previous record exists, start from orderindex 1
            const newOrderindex = 1;  // If no previous record exists, start from 1
            console.log("No previous records, starting with order index 1");

            const insertQuery = `
                INSERT INTO user_tables (user_id, table_name, theme_id, orderindex, width, height)
                VALUES (?, ?, ?, ?, ?, ?);
            `;

            db.query(insertQuery, [tableinfo.user_id, tableinfo.table_name, tableinfo.theme_id, newOrderindex, tableinfo.width, tableinfo.height], (err, insertResults) => {
                if (err) {
                    console.log("Error inserting data:", err);
                    return callback(err, null);
                }

                // Step 6: Return success via callback
                console.log("Data inserted successfully:", insertResults);
                callback(null, insertResults);
            });
        }
    });
};

export default insertTableName;
