import { Router } from "express";
import { deleteToDoController, editToDoListController, getAllUsers, getToDoListController, insertToDoController } from "../controllers/todolist.controllers";
import createAllTable from "../scripts/dbtable.scripts";
import insertAllDatas from "../scripts/dbinsert.scripts";

const router = Router()

router.get("/",getAllUsers);
router.get("/createtables",createAllTable);
router.get("/insert",insertAllDatas);
router.get("/todo",getToDoListController);
router.put("/todo/edit/:id",editToDoListController)
router.delete("/todo/delete/:id",deleteToDoController)
router.post("/todo/insert",insertToDoController);

export default router