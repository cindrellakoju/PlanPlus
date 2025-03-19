import { Request, Response } from "express";
import { insertintotable } from "../services/crudondata.services";

export const insertTabelData = async(req:Request, res: Response) => {
    const user_id = Number(req.params.user_id);
    const {tablename , value} = req.body;

    const insertdata = {
        user_id : user_id,
        tablename : tablename,
        value : value
    }

    console.log(insertdata)
    try{
        const result = await insertintotable(insertdata);
        res.status(200).json(result);
    }catch(err){
        res.status(500).json({ message : "Error inserting "})
    }
}