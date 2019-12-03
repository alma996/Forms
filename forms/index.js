const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var cors = require('cors');

// use it before all route definitions
app.use(cors({origin: 'http://localhost:4200'}));

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employeedb',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if(!err)
    console.log('DB connection succed.');
    else
    console.log('DB connesction failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

app.listen(3000,()=>console.log('Express server is running at post no: 3000'));

//GET ALL EMPLOYEES
app.get('/employees',(req,res)=>{
    mysqlConnection.query('SELECT * FROM employee',(err, rows, fields)=>{
        if(!err)
        rows.forEach(element => {
            if(element.constructor == Array)
            res.send('Inserted employee id : ' + element[0].EmpID);
        });
        else
        console.log(err);
    })
});

//GET AN EMPLOYEES
app.get('/employees/:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM employee WHERE EmpID = ?',[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

//DELETE AN EMPLOYEES
app.delete('/employees/:id',(req,res)=>{
    mysqlConnection.query('DELETE FROM employee WHERE EmpID = ?',[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send('Delete successfully.');
        else
        console.log(err);
    })
});

//INSERT AN EMPLOYEES
app.post('/employees',(req,res)=>{
    console.log('******',req.body);
    
    let emp = req.body;
    
    var sql = "INSERT INTO employee (EmpID, Name, EmpCode, Salary) VALUES (?,?,?,?)";
    

    mysqlConnection.query(sql,[emp.EmpID, emp.Name, emp.EmpCode, emp.Salary],(err, rows, fields)=>{
        if(!err)
        res.send("User succesfully added");
        else
        console.log(err);
    })
});

//UPDATE AN EMPLOYEES
app.put('/employees',(req,res)=>{
    console.log('******',req.body);
    
    let emp = req.body;
    
    var sql = "UPDATE employee SET `Name`=?, `EmpCode`=?, `Salary`=? WHERE `EmpID`=?";
    

    mysqlConnection.query(sql,[emp.Name, emp.EmpCode, emp.Salary, emp.EmpID],(err, rows, fields)=>{
        if(!err)
        res.send("User succesfully added");
        else
        console.log(err);
    })
});


