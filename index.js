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
    choices: ["View All Employees", "View All Departments", "View All Roles", "Add an Employee", "Delete an employee", "Update an Employee",
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
        case "Delete an employee":
          removeEmp()
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

function removeEmp (){
  inquirer.prompt([
    {
      message: "What is the employee's ID?",
      name: "id",
      type: "input",
    }
]).then(function(answer){
  connection.query(
    "DELETE FROM employee WHERE ?",
    {
      id: answer.id,
    },function (err) {
      if (err) throw err;
      console.log("Employee was successfully deleted.")
      start()
    }
  )}
)}
// function updateEmployee() {
//   inquirer.prompt([
//     {
//       message: "Which employee would you like to update? Please enter ID number",
//       name: "empid",
//       type: "input",
//     },
//     {
//       message: "Which value would you like to update?",
//       name: "update",
//       type: "list",
//       choices: ["First Name", "Last Name", "Role-iD", "Manager-iD", "Delete Employee", "Start", "Exit"],
//     },
//   ])
//     .then(function (answer) {
//       switch (answer.update) {
//         case "First Name":
//           updateName();
//           break;
//         case "Last Name":
//           updateLName();
//           break;
//         case "Role-iD":
//           updateRoleid();
//           break;
//         case "Manager-iD":
//           updateManagerid();
//           break;
//         case "Delete Employee":
//           deleteEmp();
//           break;
//         case "Start":
//           start();
//           break;
//         case "Exit":
//           conEnd();
//           break;  
//       }    
//     });
//     function updateName(answer) {
//       connection.query(
//         "UPDATE employee SET ? WHERE employee.id ="
//         [
//           {
//             first_name: answer.update
//           },
//           {
//             id: answer.empid
//           }
//         ],
//         function(error) {
//           if (error) throw err;
//           console.log("First name updated successfully!");
//           console.table(results)
//           updateEmployee();
//         }
//       )
//     }

//     function updateLName(answer){
//     connection.query(
//       "UPDATE employee SET ? WHERE ?",
//       [
//         {
//           last_name: answer.update
//         },
//         {
//           id: answer.empid
//         }
//       ],
//       function(error) {
//         if (error) throw err;
//         console.log("Last name updated successfully!");
//         updateEmployee();
//       }
//     )
//    }
//     function updateRoleid(answer){
//     connection.query(
//       "UPDATE employee SET ? WHERE ?",
//       [
//         {
//           role_id: answer.update
//         },
//         {
//           id: answer.empid
//         }
//       ],
//       function(error) {
//         if (error) throw err;
//         console.log("Role-iD updated successfully!");
//         updateEmployee();
//       }
//     )
//     }
//     function updateManagerid(answer){
//     connection.query(
//       "UPDATE employee SET ? WHERE ?",
//       [
//         {
//           manager_id: answer.update
//         },
//         {
//           id: answer.empid
//         }
//       ],
//       function(error) {
//         if (error) throw err;
//         console.log("Manager-iD updated successfully!");
//         updateEmployee();
//       }
//     )
//     }
//     function deleteEmp(answer){
//     connection.query(
//       "DELETE FROM employee WHERE ?",
//       [
//         {
//           id: answer.empid
//         }
//       ],
//       function(error) {
//         if (error) throw err;
//         console.log("Employee deleted successfully!");
//         updateEmployee();
//       }
//     )
//   }
// }
  
