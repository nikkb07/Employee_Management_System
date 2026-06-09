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
import { authenticateToken } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { getMyProfile } from "../controllers/employee.controller.js";
import { getDepartmentEmployees } from "../controllers/employee.controller.js";

const router = express.Router();

router.get("/", 
    authenticateToken,
    authorize("ADMIN"),
    getEmployees);

router.get("/active", getActiveEmployees);

router.get("/search", searchEmployees);

router.get("/department", getEmployeesByDepartment);

router.get("/salary", getEmployeesBySalary);

router.get("/date", getEmployeesByDate);

router.get(
    "/me",
    authenticateToken,
    authorize("EMPLOYEE"),
    getMyProfile
);

router.get(
    "/department-members",
    authenticateToken,
    authorize("MANAGER"),
    getDepartmentEmployees
);

router.get("/:id", getEmployeeById);

router.post("/",
    authenticateToken,
    authorize("ADMIN"),
     createEmployee);

router.put("/:id",
    authenticateToken,
    authorize("ADMIN"),
    updateEmployee);

router.delete("/:id",
    authenticateToken,
    authorize("ADMIN"),
    deleteEmployee);

export default router;