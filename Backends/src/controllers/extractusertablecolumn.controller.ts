import { Request, Response } from "express";
import { getColumnName } from "../services/extractusertablecolumn.services";

export const fetchtablecolumn = async(req:Request, res:Response) => {
    const user_id = Number(req.params.user_id)
    const tablename = "To Do List"

    const data={
        user_id,
        tablename
    }
    console.log(data)
    try{
        const result = await getColumnName(data);
        res.status(200).json(result);
    }catch(err){
        res.status(500).json({ message: "Error fetching column name"})
    }
}