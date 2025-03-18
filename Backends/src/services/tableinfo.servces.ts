import tableinfo from "../models/extracttableinfo.model"

export const gettableinfo = ():Promise<void> => {
    return new Promise((resolve,rejects) => {
        tableinfo((err,results) => {
            if(err) rejects(err);
            resolve(results)
        })
    })
}