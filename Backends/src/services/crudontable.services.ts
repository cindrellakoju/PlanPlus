import { updateTableInfo } from "../models/crudontable.model";
import { idinfo, tableinfowithorderindex } from "../types/todo.type";
import { convertTable } from "../utils/converttable.utils";

export const updateTableInfoServices = (updateid : idinfo, updatetabledata: tableinfowithorderindex ):Promise<any> => {
    return new Promise((resolve,rejects) => {
        if(updatetabledata.table_name){
            const table_name = convertTable(updatetabledata.table_name)
            updatetabledata.table_name = table_name;
        }
        updateTableInfo(updateid,updatetabledata,(err,results) => {
            if(err)rejects(err);
            resolve(results)
        })
    })
}