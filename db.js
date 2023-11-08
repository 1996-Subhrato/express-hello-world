const mysql = require("mysql2");
/*
Cloud Database
*/
const connection = mysql.createConnection({
    host: "103.38.50.111",
    user: "demo",
    password: "password",
    database: "demo",
    port: 3306,
});

/*
Local Database
*/
// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "", // password of workbench
//     database: "xenonstack", // name of database
// });
connection.connect((err) => {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log("Connected to the database.");
});
module.exports = connection