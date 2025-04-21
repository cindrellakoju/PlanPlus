import { addScheduleByDay, extractDayData, updateScheduleByDay } from "../models/schedule.model"

export const extractDayDataServices = (userId:number, days:string):Promise<void> => {
    return new Promise((resolve,rejects) => {
        extractDayData(userId,days,(err,results) => {
            if(err) rejects(err);
            resolve(results)
        })
    })
}

export const addScheduleByDayServices = (day:string, time:string, task: string,user_table_id : number,data_id:number) :Promise<void> => {
    return new Promise((resolve,rejects) => {
        addScheduleByDay(day,time, task,user_table_id, data_id,(err, results) => {
            if(err) rejects(err);
            resolve(results)
        })
    })
}

export const updateScheduleByDayServices = (day:string, time:string, task: string,specific_day_col_data_id:number,user_table_id : number,data_id:number) :Promise<void> => {
    return new Promise((resolve,rejects) => {
        updateScheduleByDay(day,time, task,specific_day_col_data_id,user_table_id, data_id,(err, results) => {
            if(err) rejects(err);
            resolve(results)
        })
    })
}