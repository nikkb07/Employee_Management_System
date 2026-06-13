import express from 'express';
import employeeRoutes from "./routes/employee.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { authenticateToken } from './middleware/auth.middleware.js';
import dashboardRoutes from './routes/dashboard.routes.js';
const app = express();

app.use(express.json());
app.use("/auth", authRoutes);

app.use("/employees", employeeRoutes);

app.use("/api/dashboard" , dashboardRoutes);

app.get(
    "/profile",
    authenticateToken,
    (req,res)=>{
        res.status(200).json(req.user);
    }
);

export default app;