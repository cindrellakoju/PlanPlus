import { InsertData } from "../models/crudondata.model";
import { insertinfo } from "../types/todo.type";
import { convertTable } from "../utils/converttable.utils";

export const insertintotable = (insertdata : insertinfo):Promise<any> => {
    return new Promise((resolve,rejects) => {
        const table_name = convertTable(insertdata.tablename)
        const update_tablename = {
            ...insertdata,
            tablename: table_name
        }
        console.log("Updated table:",update_tablename)
        InsertData(update_tablename,(err,results) => {
            if(err) rejects(err);
            resolve(results)
        })
    })
} 
