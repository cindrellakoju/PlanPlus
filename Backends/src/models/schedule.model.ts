import db from "../config/db.config"; // Assuming this exports a database client
import { Callback } from "../types/todo.type";
import { OkPacket, RowDataPacket } from 'mysql2';

export const extractDayData = (userId: number, days: string, callback: Callback) => {
    const query = `
        SELECT utd.column_data, utd.data_id
        FROM user_table_data utd
        JOIN user_tables ut ON utd.user_table_id = ut.user_table_id
        WHERE ut.user_id = ? AND ut.table_name = 'schedule_table';
    `;

    db.query(query, [userId], (err: Error | null, results: any) => {
        if (err) {
            console.log("Error Extracting Schedule", err);
            return callback(err, null);
        }

        // Ensure results contains data before accessing the first item
        if (results && results.length > 0) {
            const columnData = results[0].column_data;
            const dataId = results[0].data_id; // Extract data_id

            try {
                const parsedData = JSON.parse(columnData);
                if (parsedData[days]) {
                    const daydata = parsedData[days];
                    console.log("Keys:", Object.keys(daydata));

                    // Send both daydata and data_id in the callback
                    callback(null, { column_data:daydata, data_id: dataId });
                    console.log("Daydata:", daydata);
                } else {
                    console.log("Day data not found");
                    callback(null, { daydata: [], data_id: dataId }); // Return empty array for daydata
                }
            } catch (err) {
                console.log("Error fetching data", err);
                callback(err, null);
            }
        } else {
            console.log("No result found");
            callback(null, { daydata: [], data_id: null }); // Return null for data_id when no results
        }
    });
};

export const addScheduleByDay = (
    day: string,
    time: string,
    task: string,
    user_table_id: number,
    data_id: number,
    callback: Callback
) => {
    const maxdataidquery = `
        SELECT 
            JSON_UNQUOTE(JSON_EXTRACT(column_data, '$.${day}[*].data_id')) AS ${day}_data_ids
        FROM 
            user_table_data
        WHERE 
            user_table_id = ${user_table_id}
            AND data_id = ${data_id};
    `;

    db.query(maxdataidquery, (err, results: RowDataPacket[]) => {
        if (err) {
            console.error(`Error querying ${day} data:`, err);
            return callback(err);
        }

        if (Array.isArray(results) && results.length > 0) {
            const result = results[0][`${day}_data_ids`] as string;
            console.log("Raw result:", result);

            try {
                const DataArray = JSON.parse(result);

                if (!Array.isArray(DataArray)) {
                    throw new Error(`Parsed ${day}_data_ids is not an array`);
                }

                const maxDataId = Math.max(...DataArray);
                console.log("MAX Id::", maxDataId);

                const query = `
                    UPDATE user_table_data
                    SET column_data = JSON_SET(
                        column_data,
                        '$.${day}',
                        JSON_ARRAY_APPEND(
                            JSON_EXTRACT(column_data, '$.${day}'),
                            '$',
                            JSON_OBJECT(
                                'time', '${time}',
                                'task', '${task}',
                                'data_id', ${maxDataId + 1}
                            )
                        )
                    )
                    WHERE user_table_id = ${user_table_id} AND data_id = ${data_id};
                `;

                db.query(query, (err, results) => {
                    if (err) {
                        console.error(`Error updating ${day}`, err);
                        return callback(err);
                    }
                    console.log("Update Results:", results);
                    callback(null, results);
                });

            } catch (parseError) {
                console.error(`Error parsing ${day}_data_ids:`, parseError);
                return callback(parseError);
            }
        } else {
            const error = new Error(`No results or invalid result format for ${day}`);
            console.error(error.message);
            return callback(error);
        }
    });
};

export interface UpdateSchedule {
    time: string;
    task: string;
    data_id: number;
}

export const updateScheduleByDay = (day: string, time: string, task: string, specific_day_col_data_id: number, data_id: number, callback: Callback) => {
    const getDayArrayQuery = `
        SELECT JSON_UNQUOTE(JSON_EXTRACT(column_data, '$.${day}')) AS ${day}_data
        FROM user_table_data
        WHERE data_id = ${data_id};
    `;

    // Fetch the schedule data for the specific day (e.g., Monday, Tuesday, etc.)
    db.query(getDayArrayQuery, (err, results: RowDataPacket[]) => {
        if (err) {
            console.error(`Error fetching ${day} data`, err);
            return callback(err);
        }

        if (Array.isArray(results) && results.length > 0) {
            // Parse the JSON data for the day
            const dayArray: UpdateSchedule[] = JSON.parse(results[0][`${day}_data`]);

            // Find the index of the item with the matching data_id
            const index = dayArray.findIndex((item: UpdateSchedule) => item.data_id === specific_day_col_data_id);

            if (index === -1) {
                return callback(new Error(`No entry found with data_id: ${specific_day_col_data_id}`));
            }

            console.log(`Index of data_id = ${specific_day_col_data_id}:`, index);

            // Now that you have the index, you can build the query to update the specific entry
            const updateQuery = `
                UPDATE user_table_data
                SET column_data = JSON_SET(
                    column_data,
                    '$.${day}[${index}].time', '${time}',   
                    '$.${day}[${index}].task', '${task}'  
                )
                WHERE data_id = ${data_id};
            `;

            // Execute the update query to modify the schedule for the matching data_id
            db.query(updateQuery, (err, result) => {
                if (err) {
                    console.log("Error updating data", err);
                    return callback(err);
                }
                callback(null, result);  // Return the result to the callback
            });
        } else {
            // Handle the case where no data is found for the given day
            return callback(new Error(`No data found for ${day} and data_id: ${data_id}`));
        }
    });
};
