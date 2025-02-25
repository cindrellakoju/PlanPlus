import { Router } from "express";
import { deleteToDoController, editToDoListController, getAllUsers, getToDoListController, insertToDoController } from "../controllers/user.controllers";
import createToDoListTable from "../scripts/dbtable.scripts";
import inserttodolist from "../scripts/dbinsert.scripts";

const router = Router()

router.get("/",getAllUsers);
router.get("/createtables",createToDoListTable);
router.get("/insert",inserttodolist);
router.get("/todo",getToDoListController);
router.put("/todo/edit/:id",editToDoListController)
router.delete("/todo/delete/:id",deleteToDoController)
router.post("/todo/insert",insertToDoController);

export default router