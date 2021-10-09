const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

var db = mysql.createConnection({
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: "employees_db"
});