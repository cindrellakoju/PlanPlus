import { Request, Response } from "express";
import { addScheduleByDayServices, extractDayDataServices, updateScheduleByDayServices } from "../services/schedule.services";

export const extractDayDataController = async(req:Request, res : Response) => {
    const userId = Number(req.params.user_id)
    const days = req.body.days
    try{
        const result = await extractDayDataServices(userId, days);
        res.status(200).json(result)
    }catch(err){
        res.status(500).json({ message : "Error fetching days from schedule ", error : err });
    }

}

export const addScheduleByDayController = async(req:Request, res:Response) => {
    console.log("Reqbody:",req.body)
    const {day,value , data_id} =  req.body
    console.log("Value:",value.time)
    const time = value.time
    const task = value.task

    try{
        const results=  await addScheduleByDayServices(day,time,task, data_id)
        res.status(200).json(results)
    }catch(err){
        res.status(500).json({ message : "Error adding data ", error : err });
    }
}

export const updateScheduleByDayController = async(req:Request, res:Response) => {
    const { day, time, task, data_id,specific_day_col_data_id} = req.body

    console.log("Request:",req.body)
    try{
        const results=  await updateScheduleByDayServices(day,time,task, specific_day_col_data_id, data_id)
        res.status(200).json(results)
    }catch(err){
        res.status(500).json({ message : "Error adding data ", error : err });
    }
}