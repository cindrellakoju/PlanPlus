import insertTableName from "../models/inserttablename.model";
import { tableinfo } from "../types/todo.type";
import { convertTable } from "../utils/converttable.utils";

export const insertTableNameServices = (tableinfo:tableinfo):Promise<any> => {
    return new Promise((resolve,rejects) => {
        const table_name = convertTable(tableinfo.table_name)
        // console.log("Table NAme:",table_name)
        const update_info = {
            ...tableinfo,
            table_name : table_name
        }
        insertTableName(update_info,(err,results) => {
            if(err) rejects(err);
            resolve(results)
        })
    })
}