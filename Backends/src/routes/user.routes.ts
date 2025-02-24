import { Router } from "express";
import { getAllUsers, getToDoListController } from "../controllers/user.controllers";
import createToDoListTable from "../scripts/dbtable.scripts";
import inserttodolist from "../scripts/dbinsert.scripts";

const router = Router()

router.get("/",getAllUsers);
router.get("/createtables",createToDoListTable);
router.get("/insert",inserttodolist);
router.get("/todo",getToDoListController)

export default router