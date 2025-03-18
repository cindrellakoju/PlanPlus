import { Router } from "express";
import { deleteToDoController, editToDoListController, getAllUsers, getToDoListController, insertToDoController } from "../controllers/todolist.controllers";
import createAllTable from "../scripts/dbtable.scripts";
import insertAllDatas from "../scripts/dbinsert.scripts";
import { getComponentsController, updateComponentsController } from "../controllers/componentsposition.controller";
import { login, signup } from "../controllers/signup.controller";
import CreateTableByUserController from "../controllers/db.createtable.controller";
import { fetchtableinfo } from "../controllers/tableinfo.controllers";

const router = Router()

router.get("/",getAllUsers);
router.post("/login",login);
router.get("/createtables",createAllTable);
router.get("/insert",insertAllDatas);
router.get("/todo",getToDoListController);
router.put("/todo/edit/:id",editToDoListController)
router.delete("/todo/delete/:id",deleteToDoController)
router.post("/todo/insert",insertToDoController);
router.post("/signup",signup);
router.get("/componentsposition",getComponentsController);
router.put("/componentsposition/edit/:id",updateComponentsController);

router.post("/usercreatetable", CreateTableByUserController);

router.get("/tableinfo",fetchtableinfo);

export default router