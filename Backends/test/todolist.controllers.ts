import { Request,Response } from "express"
import { deleteTodos, editTodos, fetchTodos, insertTodos } from "./todolist.services";
import { validation } from "../src/types/todo.type";

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
        const updatedtodo = {
            id,
            task: task.trim(),
            status: status.trim(),
            priority: priority.trim(),
            due_date
        };

        const validationResult = Validations(updatedtodo, res);
        if (validationResult) return; // Early return if validation fails

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

export const insertToDoController = async (req:Request ,res:Response) => {
    try{
        const { task , due_date, status, priority} = req.body;

        console.log(req.body)
        const insertdata = {
            task: task.trim(),
            due_date,
            status:status.trim(),
            priority: priority.trim()
        }

        const validationResult = Validations(insertdata,res);
        if(validationResult) return;

        const result = await insertTodos(insertdata)
        res.status(200).json(result);
    }catch(err){
        res.status(500).json({ message: "Error inserting new Todolist ", error: err });
    }
}

const Validations = (validationdata: validation, res: Response) => {
    const { id, task, status, priority, due_date } = validationdata;

    // If id is present, validate it as a number (needed only for update and delete)
    if (id && isNaN(id)) {
        res.status(400).json({ message: "ID must be a number" });
        return true; // Return early to stop further execution
    }

    // Validate other fields
    if (typeof task !== "string" || !task.trim()) {
        res.status(400).json({ message: "Task must be a non-empty string" });
        return true;
    }
    if (typeof status !== "string" || !status.trim()) {
        res.status(400).json({ message: "Status must be a non-empty string" });
        return true;
    }
    if (typeof priority !== "string" || !priority.trim()) {
        res.status(400).json({ message: "Priority must be a non-empty string" });
        return true;
    }
    if (!due_date) {
        res.status(400).json({ message: "Due date must be provided" });
        return true;
    }

    return false; // Return false if validation passed
};
