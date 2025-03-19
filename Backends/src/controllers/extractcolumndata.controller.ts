import { Request, Response } from "express";
import { getColumnData } from "../services/extractcolumndata.sevices";

export const fetchcolumndata = async(req:Request, res:Response) => {
    const user_id = Number(req.params.user_id)
    const tablename = "To Do List"

    const data={
        user_id,
        tablename
    }
    console.log(data)
    try{
        console.log("heheheheh")
        const result = await getColumnData(data);
        res.status(200).json(result);
    }catch(err){
        res.status(500).json({ message: "Error fetching column data"})
    }
}