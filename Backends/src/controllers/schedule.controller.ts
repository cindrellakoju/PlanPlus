import { Request, Response } from "express";
import { extractDayDataServices } from "../services/schedule.services";

export const extractDayDataController = async(req:Request, res : Response) => {
    const userId = Number(req.params.user_id)
    const days = "Monday"
    try{
        const result = await extractDayDataServices(userId, days);
        res.status(200).json(result)
    }catch(err){
        res.status(500).json({ message : "Error fetching days from schedule ", error : err });
    }

}