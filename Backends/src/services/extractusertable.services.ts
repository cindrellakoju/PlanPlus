import { tablename } from "../models/extractusertable.model";

export const gettablename = ():Promise<void> => {
    return new Promise((resolve,rejects) => {
        tablename((err,results) => {
            if(err) rejects(err);
            resolve(results)
        })
    })
}