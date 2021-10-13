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
            message: "What is the employee's role id?",
            choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            name: "empRole"
      },
      {
            type: "list",
            message: "What is the employee's manager id? (If they are a manager, choose null.)",
            choices: [1, 3, 5, 7, 9, "null"],
            name: "empManager"
      }
];

const updateEmpRole = [
      {
            type: "list",
            message: "Picking by id, which Employee would you like to update",
            choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            name: "empUpdateRole",
      },

      {
            type: "list",
            message: "What is the Employee's new role id?",
            choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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
                              updateEmployeeRole();
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
      db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.dept_name AS department, role.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id;', function (error, results) {
            if (error) {
                  throw error;
            }
            console.log(" "); // faux line break for better viewability
            console.table(results);
            init();
      })
};

function addEmployee() {
      inquirer
            .prompt(addEmp)
            .then((response) => {
                  db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("${response.empFirstName}", "${response.empLastName}", ${response.empRole}, ${response.empManager});`, function (error, results) {
                        if (error) {
                              throw error;
                        }
                        console.log("Employee added to database!");
                        listEmployees();
                        init();
                  })
            })

}

function updateEmployeeRole() {
      inquirer
            .prompt(updateEmpRole)
            .then((response) => {
                  db.query(`UPDATE employee SET role_id = ${response.empNewRole} WHERE id = ${response.empUpdateRole};`, function (error, results) {
                        if (error) {
                              throw error;
                        }
                        console.log("Employee role updated!");
                        init();
                  })
            })
}

function listRoles() {
      db.query('SELECT role.id, role.title, role.salary, department.dept_name AS department FROM role INNER JOIN department ON role.department_id = department.id;', function (error, results) {
            if (error) {
                  throw error;
            }
            console.log(" "); // faux line break for better viewability
            console.table(results);
            init();
      })
};

function addRoles() {
      addRole[2].choices = [];

      db.query("SELECT id, dept_name FROM department", function (err, results) {
            if (err) {
                  throw err;
            }
            results.forEach(department => {
                  addRole[2].choices.push(department.dept_name)
            })

            inquirer
                  .prompt(addRole)
                  .then((response) => {
                        // set up role/department id
                        let addRoleId = "";
                        results.forEach(department => {
                              if (department.dept_name === response.roleDept) {
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
                  db.query(`INSERT INTO department(dept_name) VALUES ("${deptName}")`, function (error, results) {
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