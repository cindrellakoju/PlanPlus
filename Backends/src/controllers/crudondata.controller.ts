import { Request, Response } from "express";
import { DeleteDataService, insertintotable, updatedataoftable } from "../services/crudondata.services";

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

export const UpdateDataOfTable = async(req:Request, res:Response) => {
    const user_id = Number(req.params.user_id);
    const {tablename, data_id, value} = req.body;

    // console.log(req.body)
    const updatedata = {
        user_id : user_id,
        tablename : tablename,
        data_id : Number(data_id),
        value : value
    }
    // console.log(updatedata)
    try{
        const result = await updatedataoftable(updatedata);
        res.status(200).json(result);
    }catch(err) {
        res.status(500).json({ message : "Error updating "})
    }
}

export const DeleteDataController = async(req :Request, res:Response) => {
    const user_id = Number(req.params.user_id)
    const { data_id } = req.body

    try{
        const result = DeleteDataService(user_id,data_id)
        res.status(200).json(result)
    }catch(err){
        res.status(500).json(err)
    }
}