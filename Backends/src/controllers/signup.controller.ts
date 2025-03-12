import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/usertable.services";


export const signup = async(req:Request, res:Response):Promise<void> => {
    try{
        const { first_name, last_name, email, password} = req.body;

        console.log("Request",req.body)
        const insertdata = {
            first_name,
            last_name,
            email,
            password
        }

        const result = await  registerUser(insertdata);
        console.log("Result:",result)
        res.status(200).json(result);
    } catch(err){
        res.status(500).json({ message: "Error inserting users", error: err})
    }
    
}

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await loginUser(req.body);
        res.status(200).json({ message: "Login successful" });
    } catch (err) {
        res.status(500).json({ message: "Error fetching login info", error: err });
    }
}
