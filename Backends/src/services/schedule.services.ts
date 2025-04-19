import { extractDays } from "../models/schedule.model"

export const extractDaysServices = ():Promise<void> => {
    return new Promise((resolve,rejects) => {
        extractDays((err,results) => {
            if(err) rejects(err);
            resolve(results)
        })
    })
}