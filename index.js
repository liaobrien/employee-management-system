const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();

const db = mysql.createConnection(
      {
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: "employees_db"
      },
      console.log(`Connected to the employees_db database.`)
);

const firstQuestion = [
      {
            type: "list",
            message: "What would you like to do?",
            choices: [
                  "View All Employees",
                  "Add Employee",
                  "Update Employee Role",
                  "View All Roles",
                  "Add Role",
                  "View All Departments",
                  "Add Department",
                  "Quit",
            ],
            name: "toDo"
      }
];

const addDept = [
      {
            type: "input",
            message: "What department would you like to add?",
            name: "addDept"
      }
];

const addRole = [
      {
            type: "input",
            message: "What role would you like to add?",
            name: "addRole"
      },
      {
            type: "input",
            message: "What is the salary for this role?",
            name: "roleSalary"
      },
      {
            type: "list",
            message: "Which department does the role belong to?",
            choices: [

            ],
            name: "roleDept"
      }
];

const addEmp = [
      {
            type: "input",
            message: "What is the employee's first name?",
            name: "empFirstName"
      },
      {
            type: "input",
            message: "What is the employee's last name?",
            name: "empLastName"
      },
      {
            type: "list",
            message: "What is the employee's role?",
            choices: [
                  // will create later through seeds.sql
            ],
            name: "empRole"
      },
      {
            type: "list",
            message: "Who is the employee's manager?",
            choices: [
                  // will create later through seeds.sql
            ],
            name: "empManager"
      }
];

const updateEmpRole = [
      {
            type: "list",
            message: "Which Employee would you like to update",
            choices: [],
            name: "empUpdateRole",
      },

      {
            type: "input",
            message: "What is the Employee's new role",
            name: "empNewRole"
      },
];

function init() {
      inquirer
            .prompt(firstQuestion)
            .then((response) => {
                  switch (response.toDo) {
                        case "View All Employees":
                              listEmployees();
                              break;

                        case "Add Employee":
                              // actions tbd atm
                              break;

                        case "Update Employee Role":
                              break;

                        case "View All Roles":
                              listRoles();
                              break;

                        case "Add Role":
                              break;

                        case "View All Departments":
                              break;

                        case "Add Department":
                              break;

                        default: // quit
                              break;
                  }
            })
};

init();

function listEmployees() {
      db.query('SELECT * FROM employee', function (error, results) {
            if (error) {
                  throw error;
            }
            console.table(results);
            init();
      })
}

// add emp

// update emp role

function listRoles() {
      db.query('SELECT * FROM role', function (error, results) {
            if (error) {
                  throw error;
            }
            console.table(results);
            init();
      })
}