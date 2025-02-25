import { Request,Response } from "express"
import { editTodos, fetchTodos } from "../services/user.services";

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

export const editToDoListController = async (req: Request, res: Response) => {
    try {        
        const updatedtodo = {
            id: parseInt(req.params.id),
            task: req.body.task,
            status: req.body.status,
            priority: req.body.priority
        };
        console.log("Updated Todo:", updatedtodo);

        const result = await editTodos(updatedtodo);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating table", error: err });
    }
};
