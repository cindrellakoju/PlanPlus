import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routes/user.routes";
import cors from "cors"

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
// Use CORS with options
app.use(cors({
  // origin: 'http://localhost:5173', // Allow only your frontend to access
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use("/user",router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});