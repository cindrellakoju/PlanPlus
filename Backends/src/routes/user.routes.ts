import { Router } from "express";
import { deleteToDoController, editToDoListController, getAllUsers, getToDoListController, insertToDoController } from "..//../test/todolist.controllers";
import createAllTable from "../scripts/dbtable.scripts";
import insertAllDatas from "../scripts/dbinsert.scripts";
import { login, signup } from "../controllers/signup.controller";
import { fetchtablename } from "../controllers/extractusertable.controller";
import { fetchtablecolumn } from "../controllers/extractusertablecolumn.controller";
import { fetchcolumndata } from "../controllers/extractcolumndata.controller";
import { DeleteDataController, insertTabelData, UpdateDataOfTable } from "../controllers/crudondata.controller";
import CreateTableByUserController from "../../test/db.createtable.controller";
import { getComponentsController, updateComponentsController } from "../../test/componentsposition.controller";
import { fetchtableinfo } from "../controllers/tableinfo.controllers";
import { insertTableNameController } from "../controllers/inserttablename.controller";
import { updateTableInfoController } from "../controllers/crudontable.controller";

const router = Router()

router.get("/",getAllUsers);
router.post("/login",login);
router.get("/createtables",createAllTable);
router.get("/insert",insertAllDatas);
// router.get("/todo",getToDoListController);
// router.put("/todo/edit/:id",editToDoListController)
// router.delete("/todo/delete/:id",deleteToDoController)
// router.post("/todo/insert",insertToDoController);
router.post("/signup",signup);
router.get("/componentsposition",getComponentsController);
router.put("/componentsposition/edit/:id",updateComponentsController);

router.post("/usercreatetable", CreateTableByUserController);

router.get("/tableinfo",fetchtableinfo);
router.get("/tablecolumn/:user_id",fetchtablecolumn);
router.post("/columndata/:user_id",fetchcolumndata);
router.get("/tablename/:user_id", fetchtablename); // Using a GET request with a URL parameter

router.post("/insertintotable/:user_id",insertTabelData)
router.put("/updateintotable/:user_id",UpdateDataOfTable)
router.post("/deletedataoftable/:user_id",DeleteDataController)

router.post("/inserttablename/:user_id",insertTableNameController)

router.put("/updatetable/:user_id",updateTableInfoController)
export default router