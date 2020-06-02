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
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    // run the start function after the connection is made to prompt the user
    start();
  });

  function start() {
    inquirer
      .prompt({
        name: "start",
        type: "list",
        message: "What would you like to do?",
        choices: ["View All Employees","View All Departments","View All Roles","Add an Employee", "Update an Employee",
      "Add a Role"],
      })
      .then(function(answer) {
        switch (answer.start){
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
        default: error()        
        }
    });
}

function error(){
  console.log("You must pick an action to continue")
}

function viewAllEmployees(){
    connection.query("SELECT * FROM employee", function(err,results){
        if (err)throw err
        console.table(results)
        start()
    })
}

function viewAllDepts(){
  connection.query("SELECT * FROM department", function(err,results){
    if(err)throw err;
    console.table(results)
    start()
  })
}

function viewAllRoles(){
  connection.query("SELECT * FROM role", function(err,results){
    if(err)throw err;
    console.table(results)
    start()
  })
}


