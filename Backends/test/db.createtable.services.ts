import db from "../src/config/db.config";
import { CreateTableByUserModel } from "./db.createtable.models";
import { userinputfortable } from "../src/types/todo.type";
import { tablename } from "../src/models/extractusertable.model";
import { convertTable } from "../src/utils/converttable.utils";
import { extracttablename } from "../src/models/extracttablename.model";


export const CreateTableByUserServices = (userId:number,userinputfortable: userinputfortable): Promise<any> => {
    return new Promise((resolve,reject) => {
        userinputfortable.tablename= convertTable(userinputfortable.tablename)
        const coltype = userinputfortable.coltype
        coltype.forEach((col, index) => {
            if (col === "string") {
                coltype[index] = "VARCHAR(255)";
            }
            if( col === "date"){
                coltype[index] = "Date"
            }
            if(col === 'number-float'){
                coltype[index] = "FLOAT"
            }
            if(col === 'number-int'){
                coltype[index] = "INT"
            }
        });
        extracttablename(userId,(err,results) => {
            if(err) reject(err);
            const existingtable = results.some((table: { table_name: string }) => {
                console.log(table.table_name);
                return table.table_name === userinputfortable.tablename;
            });
            if(existingtable){
                resolve({ success: false, message: "Table name already exists." });
            }
            else{
                CreateTableByUserModel(userId,userinputfortable, (err,results) => {
                    if(err) reject(err);
                    resolve({ success: true, message: "Table created successfully.", data: results });
                })
            }         
        })
    })
}
