import { Request, Response } from "express";
import { insertTableNameServices } from "../services/insertablename.services";

export const insertTableNameController = async(req:Request, res:Response) => {
    const user_id = Number(req.params.user_id)
    const { table_name, theme_id, width, height } = req.body 

    const inserttablename = {
        user_id : user_id,
        table_name : table_name,
        theme_id : theme_id, 
        width : width,
        height : height
    }
    // console.log(inserttablename)
    try{
        const result = await insertTableNameServices(inserttablename)
        res.status(200).json(result)
    }catch(err){
        res.status(500).json(err)
    }
}