const express = require("express");
const app = express();
const mysql = require("mysql2");

app.use(express.static("sf"));

app.listen(8081, function () {
  console.log("server listening at port 8081...");
});

let dbparams = {
  host: "localhost",
  user: "root",
  password: "cdac",
  database: "lib",
  port: 3306,
};
const connection = mysql.createConnection(dbparams);
app.get("/getBookDetails", function (req, res) {
  console.log("Inside getBookDetails");
  // let input = {bookid:1, bookname:'book1', price:100};
  let bookid = req.query.bookid;
  console.log(bookid);
  console.log("Connection Successful");
  let output = {
    status: false,
    bookdetails: { bookid: 0, bookname: "", price: 0 },
  };
  connection.query(
    "select * from book where bookid = ?",
    [bookid],
    (err, rows) => {
      if (err) {
        console.log("trouble" + err);
      } else {
        if (rows.length > 0) {
          output.status = true;
          output.bookdetails = row[0];
        } else {
          console.log("book not found");
        }
      }
      res.send(output);
    }
  );
});
app.get("/updatebookdetails", function (req, res) {
  console.log("Inside updatebookdetails");
  let bookdetails = {
    bookid: req.query.bookid,
    bookname: req.query.bookname,
    price: req.query.price,
  };
  console.log(bookdetails);
  console.log("Connection Successful");
  let output = {
    status: false,
  };
  connection.query(
    "update book set bookid = ? , bookname = ? where price = ?",
    [bookdetails.bookid, bookdetails.bookname, bookdetails.price],
    (err, res1) => {
      if (err) {
        console.log(err);
      } else {
        if (res1.affectedRows > 0) {
          console.log("Update Successful");
          output.status = true;
        } else {
          console.log("Update Failure");
        }
      }
      res1.send(output);
    }
  );
});
