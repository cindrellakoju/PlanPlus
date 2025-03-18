import { Request, Response } from "express";
import { gettableinfo } from "../services/tableinfo.servces";

export const fetchtableinfo = async(req:Request, res:Response) => {
        try{
            const components = await gettableinfo();
            res.status(200).json(components)
        }catch(err){
            res.status(500).json({ message : "Error fetching data from componentspositiontable ", error : err });
        }
}