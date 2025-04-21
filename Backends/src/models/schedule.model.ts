import db from "../config/db.config"; // Assuming this exports a database client
import { Callback } from "../types/todo.type";
import { OkPacket, RowDataPacket } from 'mysql2';

export const extractDayData = (userId:number,days:string,callback: Callback) => {
    const query = `
        SELECT utd.column_data
        FROM user_table_data utd
        JOIN user_tables ut ON utd.user_table_id = ut.user_table_id
        WHERE ut.user_id = 2 AND ut.table_name = 'schedule_table';
    `;

    db.query(query, (err: Error | null, results: any) => {
        if (err) {
            console.log("Error Extracting Schedule", err);
            return callback(err, null);
        }

        // Ensure results contains data before accessing the first item
        if(results && results.length>0){
            const columnData = results[0].column_data
            try{
                const parsedData = JSON.parse(columnData)
                // console.log("Data of Monday:",parsedData.Monday)
                // const days = Object.keys(parsedData)
                if(parsedData[days]){
                    const daydata = parsedData[days]
                    console.log("Keys:",Object.keys(daydata))
                    callback(null,daydata)
                    console.log("Daydata:",daydata)
                }else{
                    console.log("Day data not found")
                    callback(null,[])
                }
            }catch(err){
                console.log("Error fetching data",err)
                callback(err,null)
            }
        }else{
            console.log("No result found")
            callback(null,[])
        }
    });
};

export const addScheduleByDay = ( callback:Callback) => {
    const maxdataidquery = `
    SELECT 
        JSON_UNQUOTE(JSON_EXTRACT(column_data, '$.Monday[*].data_id')) AS monday_data_ids
    FROM 
        user_table_data
    WHERE 
        user_table_id = 8 
        AND data_id = 26;
`;


  db.query(maxdataidquery, (err, results: RowDataPacket[]) => {
    if (err) {
        console.error("Error querying Monday data:", err);
        return;
    }

    if (Array.isArray(results) && results.length > 0) {
        const result = results[0].monday_data_ids as string;
        console.log("Raw result:", result);

        try {
            const mondayDataArray = JSON.parse(result);

            if (!Array.isArray(mondayDataArray)) {
                throw new Error("Parsed monday_data_ids is not an array");
            }

            const maxDataId = Math.max(...mondayDataArray);
            console.log("MAX Id::", maxDataId);
            const query = `
            UPDATE user_table_data
            SET column_data = JSON_SET(
              column_data,
              '$.Monday',
              JSON_ARRAY_APPEND(
                JSON_EXTRACT(column_data, '$.Monday'),
                '$',
                JSON_OBJECT(
                  'time', '3:45 PM',
                  'task', 'Play uno',
                  'data_id', ${maxDataId+1}
                )
              )
            )
            WHERE user_table_id = 8 AND data_id = 26;
          `;

          db.query(query,(err,results) => {
            if(err){
                console.log("Error updating Monday", err)
                return callback(err)
            }
            console.log("Results:",results)
            callback(null, results)
        })  

        } catch (parseError) {
            console.error("Error parsing monday_data_ids:", parseError);
        }
    } else {
        console.error("No results or invalid result format");
    }
});
  const maxid = maxdataid()
  console.log("MAxId:",maxid)
  
}


const maxdataid = () => {
    const query = `
        SELECT 
            JSON_UNQUOTE(JSON_EXTRACT(column_data, '$.Monday[*].data_id')) AS monday_data_ids
        FROM 
            user_table_data
        WHERE 
            user_table_id = 8 
            AND data_id = 26;
    `;

    db.query(query, (err, results: RowDataPacket[]) => {
        if (err) {
            console.error("Error querying Monday data:", err);
            return;
        }

        if (Array.isArray(results) && results.length > 0) {
            const result = results[0].monday_data_ids as string;
            console.log("Raw result:", result);

            try {
                const mondayDataArray = JSON.parse(result);

                if (!Array.isArray(mondayDataArray)) {
                    throw new Error("Parsed monday_data_ids is not an array");
                }

                const maxDataId = Math.max(...mondayDataArray);
                console.log("MAX Id::", maxDataId);
                // You can do something with maxDataId here
            } catch (parseError) {
                console.error("Error parsing monday_data_ids:", parseError);
            }
        } else {
            console.error("No results or invalid result format");
        }
    });
};
