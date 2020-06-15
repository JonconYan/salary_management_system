var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'yxk6321124',
  database : 'salary_manage'
});
module.exports = connection;