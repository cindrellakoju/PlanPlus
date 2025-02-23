import { Request,Response } from "express"
import db from "../config/db.config"

export const getAllUsers = (req:Request,res:Response) =>{
    res.send("Express js ");
}