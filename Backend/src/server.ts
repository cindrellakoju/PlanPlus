import express from 'express';
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

const PORT = process.env.DB_PORT;
app.listen(PORT,()=>
    console.log(`Server running at port ${PORT}`)
)