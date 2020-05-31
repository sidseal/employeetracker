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
        name: "Whichthing",
        type: "list",
        message: "Which thing....?",
        choices: ["POST", "BID", "EXIT"]
      })
      .then(function(answer) {
        if (answer.Whichthing === "POST"){
           return viewAllEmployees()
        }
    });
}

function viewAllEmployees(){
    connection.query("SELECT * FROM employee", function(err,sults){
        if (err)throw err
        console.table(sults)
        goAgain()
    })
}