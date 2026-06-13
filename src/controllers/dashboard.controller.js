import pool from "../config/db.js";

//Dashboard Analytics
export const getDashboard = async(req,res) =>{
    try{
        //Employee Overview
        const employeeOverviewQuery=
            `
            SELECT 
                COUNT(*) AS total_employees,

                COUNT(*) FILTER (
                WHERE is_active=true
                ) AS active_employees,

                COUNT(*) FILTER(
                WHERE is_active = false
                ) AS inactive_employees

                FROM employees;
            `
        
        //Department Aalytics
        const departmentAnalyticQuery =
            `
            SELECT 
                d.id,
                d.name,

                COUNT(e.id) AS employee_count,

                COUNT(e.id) FILTER(
                WHERE e.is_active = true
                ) AS active_employees

            FROM departments d

            LEFT JOIN employees e
            ON d.id = e.department_id

            GROUP BY d.id , d.name

            ORDER BY employee_count DESC;
            `
        
        //Salary Analytics
        const salaryAnalyticsQuery =
            `
            SELECT 
                COALESCE(SUM(salary),0) AS total_salary,

                COALESCE(ROUND(AVG(salary),2),0) AS average_salary,

                COALESCE(MAX(salary),0) AS highest_salary,

                COALESCE(MIN(salary),0) AS lowest_salary

            FROM employees;
            `
        
        //Joining trends
        const joiningTrendQuery=
            `
            SELECT 
                TO_CHAR(created_at, 'YYYY-MM') AS month,
                COUNT(*) AS employee_joined

            FROM employees

            GROUP By month

            ORDER By month;
            `
        
        const[
            employeeOverview,
            departmentAnalytics,
            salaryAnalytics,
            joiningTrends
        ]= await Promise.all([
            pool.query(employeeOverviewQuery),
            pool.query(departmentAnalyticQuery),
            pool.query(salaryAnalyticsQuery),
            pool.query(joiningTrendQuery),
        ]);
        // This reduces dashboard load time significantly.

        return res.status(200).json({
            success: true,
            data :{
                employeeOverview: employeeOverview.rows[0],
                departmentAnalytics : departmentAnalytics.rows,
                salaryAnalytics : salaryAnalytics.rows[0],
                joiningTrends : joiningTrends.rows
            }
        });
    }
       catch(error){
        console.log("Dashboard Error: " , error);
        res.status(500).json({
            message: error.message
        });
    }
};