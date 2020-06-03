const inquirer = require("inquirer");
const mysql = require("mysql");
require('dotenv').config()

const connection = mysql.createConnection({
  host: "localhost",


  port: 3306,


  user: "root",


  password: process.env.MYSQL_PASS,
  database: "emptracker_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  // run the start function after the connection is made to prompt the user
  start();
});

function start() {
  inquirer.prompt({
    name: "start",
    type: "list",
    message: "What would you like to do?",
    choices: ["View All Employees", "View All Departments", "View All Roles", "Add an Employee", "Update an Employee",
      "Add a Role", "Exit"],
  })
    .then(function (answer) {
      switch (answer.start) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "View All Departments":
          viewAllDepts();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "Add an Employee":
          addEmployee();
          break;
        case "Update an Employee":
          updateEmployee();
          break;
        case "Add a Role":
          addRole();
          break;
        case "Exit":
          conEnd();
          break;
      }
    });
}

function conEnd() {
  console.log("Goodbye!")
  connection.end()
}

function viewAllEmployees() {
  connection.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err
    console.table(results)
    start()
  })
}

function viewAllDepts() {
  connection.query("SELECT * FROM department", function (err, results) {
    if (err) throw err;
    console.table(results)
    start()
  })
}

function viewAllRoles() {
  connection.query("SELECT * FROM role", function (err, results) {
    if (err) throw err;
    console.table(results)
    start()
  })
}

function addEmployee() {
  inquirer.prompt([
    {
      message: "What is the employee's first name?",
      name: "firstname",
      type: "input",
    },
    {
      message: "What is the employee's last name?",
      name: "lastname",
      type: "input",
    },
    {
      message: "What is the employee's role ID?",
      name: "roleid",
      type: "input",
    },
    {
      message: "What is the employee's manager ID?",
      name: "managerid",
      type: "input",
    },
  ]).then(function (answer) {
    connection.query(
      "INSERT INTO employee SET ?",
      {
        first_name: answer.firstname,
        last_name: answer.lastname,
        role_id: answer.roleid,
        manager_id: answer.managerid,
      }, function (err) {
        if (err) throw err;
        console.log(answer.firstname, answer.lastname + " was successfully added to the list of employees");
        start();
      })
  })
}

function updateEmployee() {
  inquirer.prompt([
    {
      message: "Which employee would you like to update? Please enter ID number",
      name: "empid",
      type: "input",
    },
    {
      message: "Which value would you like to update?",
      name: "update",
      type: "list",
      choices: ["Name", "Role-iD", "Manager-iD","Delete Employee","Exit"],
    },
  ])
    .then(function (answer) {
      switch (answer.update) {
        case "Name":
          updateName();
          break;
        case "Role-iD":
          updateRoleid();
          break;
        case "Manager-iD":
          updateManagerid();
          break;
        case "Delete Employee":
          deleteEmp();
          break;  
        case "Exit":
          conEnd();
          break;
      }
    })
  }



