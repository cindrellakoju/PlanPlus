import { resolve } from "path";
import { InsertData, UpdateData } from "../models/crudondata.model";
import { insertinfo, updateinfo } from "../types/todo.type";
import { convertTable } from "../utils/converttable.utils";
import { rejects } from "assert";

export const insertintotable = (insertdata : insertinfo):Promise<any> => {
    return new Promise((resolve,rejects) => {
        const table_name = convertTable(insertdata.tablename)
        const update_tablename = {
            ...insertdata,
            tablename: table_name
        }
        InsertData(update_tablename,(err,results) => {
            if(err) rejects(err);
            resolve(results)
        })
    })
} 
