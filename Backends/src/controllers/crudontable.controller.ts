import { Request, Response } from "express"
import { updateTableInfoServices } from "../services/crudontable.services";

export const updateTableInfoController = async(req:Request , res:Response) => {
    const userid = Number(req.params.user_id);
    const {user_table_id, user_id, ...restBody} = req.body

    const id = {
        user_id : userid,
        user_table_id : user_table_id
    }

    console.log("Id :",id)
    console.log("other data:",restBody)
    try{
        const result = await updateTableInfoServices(id,restBody);
        res.status(200).json(result);
    }catch(err){
        res.status(500).json({ message : "Error updating "})
    }
}