var express = require('express')
var bodyParser = require("body-parser")
var app = express()

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('myDB');


//now any files in public are routed
app.use(express.static('public_html'))

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }))

// REST endpoint for posting a new user
app.post('/users', function (req, res, next) {
    console.log(req.body);

    let username = req.body.name;
    let password = req.body.password;
    let comment = req.body.comment;
    let option = req.body.optradio;

    var stmt = db.run(
        `INSERT OR IGNORE INTO User VALUES("${username}", "${password}", "${comment}", "${option}")`
    )
    console.log("Just received POST data for users endpoint!");
    console.log(`Data includes: ${username}, ${password}, ${comment} and ${option}`);

    res.status(200).redirect('/');
    // Alternative to redirect() method:
    // res.write("<a href=\"/\">Back to Form Page</a>");    
    // res.send();
});

app.get('/users', function (req, res) {
    // Display a web page table
    res.write('<html><body>');
    res.write("<h3> The User Information Table </h3>");
    res.write("<table><tr style='background-color:#006633'>");
    res.write('<th width="150" style="color:#ffff99">Name</th>');
    res.write('<th width="150" style="color:#ffff99">Password</th>');
    res.write('<th width="150" style="color:#ffff99">Comment</th>');
    res.write('<th width="150" style="color:#ffff99">Option</th><tr>');

    // Retrieve data from table User on the server 
    // and display it in a web page table structure
    // db.all('SELECT * FROM User', function (err, rows) {
    db.all('SELECT * FROM User', function (err, rows) {
        rows.forEach(function (row) {
            res.write('<tr style="background-color:#ccffcc">');
            res.write('<td width="150" align="center">' + row.name + '</td>'); //
            res.write('<td width="150" align="center">' + row.password + '</td>');
            res.write('<td width="150" align="center">' + row.comment + '</td>');
            res.write('<td width="150" align="center">' + row.option + '</td></tr>');
        });
        res.write('</table>');

        res.write("<a href=\"/\">Back to Form Page</a>");

        res.write('<h4>Note: row.username did not work (displaying "undefined") b/c it doesn\'t match the column name in the sqlite3 table.</h4>');
        res.write("<p>CREATE TABLE IF NOT EXISTS User (name TEXT...</p>");
        res.write('</body></html>');
        res.send();
    });
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});