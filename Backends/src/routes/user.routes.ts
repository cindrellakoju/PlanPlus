import { Router } from "express";
import { deleteToDoController, editToDoListController, getAllUsers, getToDoListController, insertToDoController } from "../controllers/todolist.controllers";
import inserttodolist from "../scripts/dbinsert.scripts";
import createAllTable from "../scripts/dbtable.scripts";

const router = Router()

router.get("/",getAllUsers);
router.get("/createtables",createAllTable);
router.get("/insert",inserttodolist);
router.get("/todo",getToDoListController);
router.put("/todo/edit/:id",editToDoListController)
router.delete("/todo/delete/:id",deleteToDoController)
router.post("/todo/insert",insertToDoController);

export default router