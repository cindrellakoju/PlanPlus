import { Request, Response } from "express";
import { CreateTableByUserServices } from "../services/db.createtable.services";

const CreateTableByUserController = async (req: Request, res: Response): Promise<any> => {
    try {
        const input = req.body;

        if (!input.name || !input.colname || !input.coltype) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const result = await CreateTableByUserServices(input);
        res.status(200).json({ message: "Table created successfully", data: result });
    } catch (err) {
        res.status(500).json({ message: "Error creating new Table", error: err });
    }
};

export default CreateTableByUserController;
