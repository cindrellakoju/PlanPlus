import { addScheduleByDay, extractDayData } from "../models/schedule.model"

export const extractDayDataServices = (userId:number, days:string):Promise<void> => {
    return new Promise((resolve,rejects) => {
        extractDayData(userId,days,(err,results) => {
            if(err) rejects(err);
            resolve(results)
        })
    })
}

export const addScheduleByDayServices = () :Promise<void> => {
    return new Promise((resolve,rejects) => {
        addScheduleByDay((err, results) => {
            if(err) rejects(err);
            resolve(results)
        })
    })
}