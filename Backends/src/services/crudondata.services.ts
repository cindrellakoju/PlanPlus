import { InsertData, UpdateData } from "../models/crudondata.model";
import { insertinfo, updateinfo } from "../types/todo.type";
import { convertTable } from "../utils/converttable.utils";

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

export const updatedataoftable = (updatedate : updateinfo):Promise<any> => {
    return new Promise((resolve,rejects) => {
        const table_name  = convertTable(updatedate.tablename)
        const updated_datainfo = {
            ...updatedate,
            tablename : table_name
        }
        UpdateData(updated_datainfo,(err,results) => {
            if(err) rejects(err);
            resolve(results)
        })
    })
}