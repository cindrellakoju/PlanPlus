import { Request, Response } from "express";
import { addScheduleByDayServices, extractDayDataServices } from "../services/schedule.services";

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
    const day= "Sunday"
    const time = "5.30 PM"
    const task = "To sleep peacefully"
    const user_table_id = 8
    const data_id = 26
    try{
        const results=  await addScheduleByDayServices(day,time,task, user_table_id, data_id)
        res.status(200).json(results)
    }catch(err){
        res.status(500).json({ message : "Error adding data ", error : err });
    }
}