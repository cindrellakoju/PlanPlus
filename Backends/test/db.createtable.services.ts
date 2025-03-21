import db from "../src/config/db.config";
import { CreateTableByUserModel } from "./db.createtable.models";
import { userinputfortable } from "../src/types/todo.type";


export const CreateTableByUserServices = (userinputfortable: userinputfortable): Promise<any> => {
    return new Promise((resolve,reject) => {
        CreateTableByUserModel(userinputfortable, (err,results) => {
            if(err) reject(err);
            resolve(results)
        })
    })
}
