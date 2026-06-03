import express from "express";
import {getEmployees} from "../controllers/employee.controller.js";
import {getEmployeeById} from "../controllers/employee.controller.js";
import {searchEmployees} from "../controllers/employee.controller.js";
import {getActiveEmployees} from "../controllers/employee.controller.js";
import {getEmployeesByDepartment} from "../controllers/employee.controller.js";
import {getEmployeesBySalary} from "../controllers/employee.controller.js";
import {getEmployeesByDate} from "../controllers/employee.controller.js";
import {createEmployee} from "../controllers/employee.controller.js";
import {updateEmployee} from "../controllers/employee.controller.js";
import {deleteEmployee} from "../controllers/employee.controller.js";

const router = express.Router();

router.get("/", getEmployees);

router.get("/active", getActiveEmployees);

router.get("/search", searchEmployees);

router.get("/department", getEmployeesByDepartment);

router.get("/salary", getEmployeesBySalary);

router.get("/date", getEmployeesByDate);

router.get("/:id", getEmployeeById);

router.post("/", createEmployee);

router.put("/:id", updateEmployee);

router.delete("/:id", deleteEmployee);

export default router;