import { Request,Response } from "express"
import { fetchTodos } from "../services/user.services";

export const getAllUsers = (req:Request,res:Response) =>{
    res.send("Express js ");
}

export const getToDoListController = async(req:Request,res:Response) =>{
    try{
        const todo = await fetchTodos()
        res.status(200).json(todo)
    }catch(err){
        res.status(500).json({ message : "Error fetching data", error : err })
    }
}