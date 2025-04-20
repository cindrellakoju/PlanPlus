import db from "../config/db.config"; // Assuming this exports a database client
import { Callback } from "../types/todo.type";

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
                    callback(null,daydata)
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
