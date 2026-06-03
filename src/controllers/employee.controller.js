import pool from "../config/db.js";

//Get All Employees with Pagination
export const getEmployees = async(req,res) =>{
    try{
        //Pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const offset= (page -1) * limit;
    const result = await pool.query(
        "SELECT * FROM employees LIMIT $1 OFFSET $2",
        [limit, offset]
    );
    res.json(result.rows);
}
catch(error){
    res.status(500).json({
        message : error.message
    });
}
};


//Active Employees
export const getActiveEmployees = async(req,res) => {
    try{
        const result = await pool.query(
            "SELECT * FROM employees WHERE is_active = true"
        );
        res.json(result.rows);
    }
    catch(error){
        res.status(500).json({
            message :error.message
        });
    }
};

//Search Employees
export const searchEmployees = async(req,res) =>{
    try{
        const search = req.query.search;

        const result = await pool.query(
            `
            SELECT * FROM employees
            WHERE first_name ILIKE $1
            OR
            last_name ILIKE $1
            or
            email ILIKE $1
            `,
            [`%${search}%`]
        );
        res.json(result.rows);
    }
    catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

//Filter Employees by Department
export const getEmployeesByDepartment = async(req,res) =>{
    try{
        const department = req.query.department;

        const result = await pool.query(
            `
            SELECT * FROM  employees
            WHERE department ILIKE $1
            `,
            [department]
        );
        res.json(result.rows);
    }
    catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

//Sort Employees by Salary
export const getEmployeesBySalary = async(req,res) =>{
    try{
        const result = await pool.query(
            `
             SELECT * FROM employees
             ORDER BY salary ASC
            `
        );
        res.json(result.rows);
    }
    catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};


//Get Employee by ID
export const getEmployeeById = async(req,res) =>{
    try{const id= req.params.id;

    const result = await pool.query(
        "SELECT * FROM employees WHERE id = $1",
        [id]
    );

    if(result.rows.length === 0){
        return res.status(404).json({
            message: "Employee not found"
        });
    }

    res.json(result.rows[0]);
    }
catch(error){
    res.status(500).json({
        message : error.message
    });
}
};

//Sort Employees by Date
export const getEmployeesByDate = async(req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM  employees
            ORDER BY created_at ASC 
            `
        );
        res.json(result.rows);
    } 
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

};

//Create Employee
export const createEmployee = async(req, res) => {
    console.log(req.body);
    try{
  const {
    first_name,
    last_name,
    email,
    department,
    salary
  } = req.body;

  if (!first_name || !last_name || !email || !department || !salary) {
    return res.status(400).json({
        message: "All fields are required"
    });
  }
  if (salary <= 0) {
    return res.status(400).json({
        message: "Salary must be positive"
    });
  }
  if(!email.includes("@")){
    return res.status(400).json({
        message: "Invalid email"
    });
  }

  //Insert query
  const result = await pool.query(
    `
    INSERT INTO employees
    (
      first_name,
      last_name,
      email,
      department,
      salary
    )
    VALUES
    ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [
      first_name,
      last_name,
      email,
      department,
      salary
    ]
  );

  res.status(201).json(result.rows[0]);
}
catch(error){
    if (error.code === '23505') { 
        return res.status(400).json({
            message: "Email already exists"
        });
    }

    res.status(500).json({
        message : error.message
    });
}
};

//Update Employee
export const updateEmployee = async(req, res) => {
    try{
    const id =req.params.id;
    const {
    first_name,
    last_name,
    email,
    department,
    salary
} = req.body;
    const result = await pool.query(
        
    `
    UPDATE employees
    SET
      first_name = $1,
      last_name = $2,
      email = $3,
      department = $4,
      salary = $5,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $6
    RETURNING *
    `,
    [
        first_name,
        last_name,
        email,
        department,
        salary,
        id
    ]
)
    if(result.rows.length == 0){
        return res.status(404).json({
            message: "Employee not found"
        });
    }
    res.json(result.rows[0]);
}
catch(error){
    res.status(500).json({
        message : error.message
    });
}
    
};

//Soft Delete Employee
export const deleteEmployee = async(req , res) =>{
    try{
    const id= req.params.id;
    await pool.query(
        `UPDATE employees
        SET is_active = false
        WHERE id = $1
        `,
        [id]
    );
    res.json({
        message : "Employee soft deleted"
    });
}
catch(error){
    res.status(500).json({
        message: error.message
    });
}
};
