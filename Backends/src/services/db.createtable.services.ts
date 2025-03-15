import db from "../config/db.config";
import { CreateTableByUserModel } from "../models/db.createtable.models";
import { userinputfortable } from "../types/todo.type";


export const CreateTableByUserServices = (userinputfortable: userinputfortable): Promise<any> => {
    return new Promise((resolve,reject) => {
        CreateTableByUserModel(userinputfortable, (err,results) => {
            if(err) reject(err);
            resolve(results)
        })
    })
}
