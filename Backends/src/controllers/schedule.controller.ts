import { Request, Response } from "express";
import { extractDaysServices } from "../services/schedule.services";

export const extractDaysController = async(req:Request, res : Response) => {
    try{
        const result = await extractDaysServices();
        res.status(200).json(result)
    }catch(err){
        res.status(500).json({ message : "Error fetching days from schedule ", error : err });
    }

}