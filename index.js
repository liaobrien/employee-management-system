const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();

// database connection
const db = mysql.createConnection(
      {
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: "employees_db"
      },
      console.log(`Connected to the employees_db database.`)
);

// all inquirer questions
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
            name: "newRole"
      },
      {
            type: "input",
            message: "What is the salary for this role?",
            name: "roleSalary"
      },
      {
            type: "list",
            message: "Which department does the role belong to?",
            choices: [],
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
            choices: [],
            name: "empRole"
      },
      {
            type: "list",
            message: "Who is the employee's manager?",
            choices: [],
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
                              addEmployee();
                              break;

                        case "Update Employee Role":
                              break;

                        case "View All Roles":
                              listRoles();
                              break;

                        case "Add Role":
                              addRoles();
                              break;

                        case "View All Departments":
                              listDepartments();
                              break;

                        case "Add Department":
                              addDepartment();
                              break;

                        default: // quit
                              quit();
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
            console.log(" "); // faux line break for better viewability
            console.table(results);
            init();
      })
};

// add emp
function addEmployee() {
      // declare empty arrays for the questions with type: list
      addEmp[2].choices = []; // what is the emp's role?
      addEmp[3].choices = []; // who is their manager?
      // i want to fill the emp role question with all the available roles in my table, and make sure they have a dept_id to go with them
      db.query('SELECT title, department_id FROM role', function (error, results) {
            if (error) {
                  throw error;
            }

            results.forEach(role => {
                  // push list choices to role title array
                  addEmp[2].choices.push(role.title);
            })
      })

      db.query('SELECT first_name, last_name, manager_id FROM employee', function (error, results) {
            if (error) {
                  throw error;
            }

            results.forEach(employee => {
                  // makes sure only names showing are actual managers
                  if (employee.manager_id !== null) {
                        // push list choices to role title array
                        addEmp[3].choices.push(`${employee.first_name} ${employee.last_name}`);
                  }

            })
      })


      inquirer
            .prompt(addEmp)
            .then((response) => {
                  console.log(response);
                  // not finished yet
            })
}

// update emp role

function listRoles() {
      db.query('SELECT * FROM role', function (error, results) {
            if (error) {
                  throw error;
            }
            console.log(" "); // faux line break for better viewability
            console.table(results);
            init();
      })
};

// add role
function addRoles() {
      addRole[2].choices = [];

      db.query("SELECT id, name FROM department", function (err, results) {
            if (err) {
                  throw err;
            }
            results.forEach(department => {
                  addRole[2].choices.push(department.name)
            })

            inquirer
                  .prompt(addRole)
                  .then((response) => {
                        // set up role/department id
                        let addRoleId = "";
                        results.forEach(department => {
                              if (department.name === response.roleDept) {
                                    addRoleId = department.id;
                              }
                        })
                        // actual query to add the role
                        db.query(`INSERT INTO role(title, salary, department_id) VALUES ("${response.newRole}", ${response.roleSalary}, ${addRoleId});`, function (error, results) {
                              if (error) {
                                    throw error;
                              }
                              console.log("Role has been added to the database!")
                              listRoles();
                              init();
                        })
                  });
      });

}

function listDepartments() {
      db.query('SELECT * FROM department', function (error, results) {
            if (error) {
                  throw error;
            }
            console.log(" "); // faux line break for better viewability
            console.table(results);
            init();
      })
};

function addDepartment() {
      inquirer
            .prompt(addDept)
            .then((response) => {
                  // since response is the whole key/value, deptName is just the value
                  const deptName = response.addDept;
                  db.query(`INSERT INTO department(name) VALUES ("${deptName}")`, function (error, results) {
                        if (error) {
                              throw error;
                        }
                        console.log("Department sucessfully added!");
                        init();
                  })
            })
}

function quit() {
      process.exit();
}