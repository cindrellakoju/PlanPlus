import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users",userRoutes)

const PORT = process.env.DB_PORT;
app.listen(PORT,()=>
    console.log(`Server running at port ${PORT}`)
)