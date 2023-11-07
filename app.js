const express = require("express");
const app = express();
const mysql = require("mysql2");
const session = require("express-session");

app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Configure the express-session middleware
app.use(
  session({
    secret: "xenonstack", // Replace with a secret key for session data encryption
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set secure to true for HTTPS
  })
);

// DB connection
const connection = mysql.createConnection({
  host: "103.38.50.111",
  user: "demo",
  password: "password",
  database: "demo",
  port: 3306,
});
connection.connect((err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log("Connected to the database.");
});
// -------------

function isLoggedIn(req, res, next) {
  // console.log(req.session.user);
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
}

app.post("/api/login", (req, res) => {
  let { email, password } = req.body;
  if (!(email && password)) {
    return res.json({ code: 1, message: "All fields are required." });
  }
  let checkUser = `SELECT * FROM users WHERE email='${email}' AND password='${password}'`;
  connection.query(checkUser, (e, row) => {
    if (e) {
      return res.json({ code: 1, message: e.message });
    }

    if (row.length === 0) {
      return res.json({ code: 1, message: "Invalid Email or Password" });
    }

    req.session.user = {
      email: email,
      firstName: row[0].firstName,
      lastName: row[0].lastName,
    };
    res.json({ code: 2, message: "User Authenticated Successfully" });
  });
});

app.post("/api/register", (req, res) => {
  let { firstName, lastName, email, password } = req.body;
  if (!(firstName && lastName && email && password)) {
    return res.json({ code: 1, message: "All fields are required." });
  }
  let alreadyExist = `SELECT * FROM users WHERE email='${email}'`;
  connection.query(alreadyExist, (e, row) => {
    if (e) {
      return res.json({ code: 1, message: e.message });
    }

    if (row.length > 0) {
      return res.json({ code: 1, message: "User already exists." });
    }

    let sqlQuery = `INSERT INTO users(firstName, lastName, email, password) VALUES ('${firstName}', '${lastName}', '${email}', '${password}')`;
    connection.query(sqlQuery, (e) => {
      if (e) {
        return res.json({ code: 1, message: e.message });
      }
      res.json({ code: 2, message: "Account created successfully" });
    });
  });
});

app.post("/api/contact", (req, res) => {
  let { email, fullName, message } = req.body;
  if (!(email && fullName && message)) {
    return res.json({ code: 1, message: "All fields are required." });
  }
  let sqlQuery = `INSERT INTO contact(email, fullName, message) VALUES ('${email}', '${fullName}', '${message}')`;
  connection.query(sqlQuery, (e) => {
    if (e) {
      return res.json({ code: 1, message: e.message });
    }
    res.json({ code: 2, message: "Form submitted successfully" });
  });
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error destroying the session: " + err);
    }
    res.redirect("/login");
  });
});

app.get("/dashboard", isLoggedIn, (req, res) => {
  let { email, firstName, lastName } = req.session.user;
  res.render("dashboard", {
    title: "User Dashboard",
    email,
    firstName,
    lastName,
  });
});

app.get("/login", (req, res) => {
  res.render("login", { title: "Login Page" });
});

app.get("/register", (req, res) => {
  res.render("register", { title: "Create New Account" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact Us" });
});

app.get("/", (req, res) => {
  res.render("index", { title: "Home Page" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
