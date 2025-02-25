import { Request,Response } from "express"
import { deleteTodos, editTodos, fetchTodos } from "../services/user.services";

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
        const id =  parseInt(req.params.id);
        const { task,status, priority, due_date} = req.body;

        console.log(req.body)

        if(isNaN(id)){
            res.status(400).json({ message : "ID must be number"})
        }

        if( typeof task !== "string" || !task.trim()){
            res.status(400).json({ message: "Task must be a non-empty string "})
        }
        if( typeof status !== "string" || !status.trim()){
            res.status(400).json({ message: "Status must be a non-empty string "})
        }
        if( typeof priority !== "string" || !priority.trim()){
            res.status(400).json({ message: "Priority must be a non-empty string "})
        }
        const updatedtodo = {
            id,
            task: task.trim(),
            status: status.trim(),
            priority: priority.trim(),
            due_date
        };

        const result = await editTodos(updatedtodo);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating todoList", error: err });
    }
};

export const deleteToDoController = async (req:Request,res:Response) =>{
    try{
        const id = parseInt(req.params.id);
        const result = await deleteTodos(id);
        res.status(200).json(result);
    } catch(err){
        res.status(500).json({ message: "Error deleting Todolist ", error: err });
    }
}