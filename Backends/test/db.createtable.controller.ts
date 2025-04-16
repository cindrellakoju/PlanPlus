import { Request, Response } from "express";
import { CreateTableByUserServices } from "./db.createtable.services";

const CreateTableByUserController = async (req: Request, res: Response): Promise<any> => {
    try {
        const userId = Number(req.params.user_id)
        console.log("Userd Id:",userId)
        const input = req.body;
        if (!input.tablename || !input.colname || !input.coltype || !input.isUnique || !input.themeid) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const result = await CreateTableByUserServices(userId,input);
        res.status(200).json({ message: "Table created successfully", data: result });
    } catch (err) {
        res.status(500).json({ message: "Error creating new Table", error: err });
    }
};

export default CreateTableByUserController;
