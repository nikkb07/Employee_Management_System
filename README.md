# Employee Management System

## Overview

Employee Management System built using Node.js, Express.js and PostgreSQL.

The project provides Employee Management APIs with Authentication and Role-Based Access Control (RBAC).

---

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* bcrypt Password Hashing

### Role-Based Access Control (RBAC)

Roles:

* ADMIN
* MANAGER
* EMPLOYEE

Permissions:

#### Admin

* Create Employee
* Update Employee
* Delete Employee
* View All Employees

#### Manager

* View Employees Within Their Department

#### Employee

* View Own Profile

---

## Employee Features

* Create Employee
* Get Employee By ID
* Get All Employees
* Soft Delete Employee
* Active Employees
* Search Employees
* Filter Employees By Department
* Sort Employees By Salary
* Sort Employees By Date
* Pagination

---

## Tech Stack

* Node.js
* Express.js
* PostgreSQL
* pg
* JWT
* bcrypt
* dotenv

---

## Database Design

### Departments

* id
* name

### Employees

* id
* first_name
* last_name
* email
* department_id
* salary
* is_active

### Users

* id
* email
* password
* role
* employee_id

---

## API Endpoints

### Authentication

#### Register

POST /auth/register

#### Login

POST /auth/login

---

### Admin Routes

#### Get Employees

GET /employees

#### Create Employee

POST /employees

#### Update Employee

PUT /employees/:id

#### Delete Employee

DELETE /employees/:id

---

### Employee Routes

#### Get Own Profile

GET /employees/me

---

### Manager Routes

#### Get Department Employees

GET /employees/department-members

---

### Other Employee APIs

GET /employees/active

GET /employees/search

GET /employees/department

GET /employees/salary

GET /employees/date

GET /employees/:id

---

## Environment Variables

Create a .env file:

PORT=3000

DB_USER=your_db_user

DB_PASSWORD=your_db_password

DB_HOST=localhost

DB_PORT=5432

DB_NAME=your_db_name

JWT_SECRET=your_secret_key

---

## Run Project

Install dependencies:

npm install

Start server:

npm run dev
