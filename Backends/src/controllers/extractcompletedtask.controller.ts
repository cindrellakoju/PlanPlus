import { Request, Response } from "express";
import { completedTaskServices } from "../services/extractcompleteddata.services";

export const completedTaskController = async(req:Request, res:Response) => {
    const user_id = Number(req.params.user_id)
    const {completed_at} = req.body
    try{
        const result = await completedTaskServices(user_id,completed_at);
        res.status(200).json(result);
    }catch(err){
        res.status(500).json({ message: "Error fetching column data"})
    }
}