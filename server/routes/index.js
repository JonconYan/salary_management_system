var express = require('express');
var router = express.Router();
var connection = require('../db/sql.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var sql;
router.get('/worker_info',function(req, res ,next){
  sql = 'SELECT class_name,uid,name,sex,level,kind FROM class_info,worker_info WHERE class_info.class_id = worker_info.class_id';
  connection.query(sql, function (error, results, fields) {
    res.json(results);
    })
});


router.get('/class_info',function(req, res ,next){
  connection.query("SELECT class_name,class_info.class_id,COUNT(*) AS num FROM class_info,worker_info WHERE class_info.class_id = worker_info.class_id GROUP BY class_info.class_id", function (error, results, fields) {
    res.json(results);
    })
});

router.get('/daily_info',function(req, res, next){
  connection.query("SELECT daily_time.uid,worker_info.name,CONCAT(date,' ',time) as time\
                    FROM daily_time,worker_info\
                    WHERE daily_time.uid = worker_info.uid",function(error,results,fields) {
                      res.json(results);
                    })
});

router.get('/worker_type',function(req, res, next){
  connection.query("SELECT class_info.class_id,class_info.class_name,worker_type.level,worker_type.base_money\
                    FROM class_info,worker_type\
                    WHERE class_info.class_id=worker_type.class_id",function(error,results,fields) {
                      res.json(results);
                    })
});

router.get('/worker_type/update',function(req,res,next){
  sql = 'UPDATE worker_type SET base_money='+req.query.base_money+' WHERE class_id='+req.query.class_id+' AND level='+req.query.level;
  //console.log(temp);
  connection.query(sql,function(error,results,fields) {
                      res.send('update success!');
                    })
});

router.get('/worker_type/insert',function(req,res,next){
  sql = 'INSERT INTO worker_type VALUES('+req.query.class_id+','+req.query.level+','+req.query.base_money+')';
  connection.query(sql,function(error,results,fields) {
                      res.send('update success!');
                    })
});

router.get('/worker_type/delete',function(req,res,next){
  sql = 'DELETE FROM worker_type WHERE class_id='+req.query.class_id+' AND level='+req.query.level
  connection.query(sql,function(error,results,fields) {
                      res.send('DELETE success!');
                    })
});

router.get('/login',function(req,res,next){
  sql = 'SELECT * FROM user WHERE id=\''+req.query.id+'\' AND password=\''+req.query.password+'\'';
  connection.query(sql,function(error,results,fields) {
                      //console.log(sql,results,results[0].is_admin);
                      if(results==undefined||results.length==0)
                        res.send('0');
                      else if(results[0].is_admin=='1')
                        res.send('1');
                      else
                        res.send('2');
                    })
});

router.get('/other_money_info',function(req, res, next){
  sql = 'SELECT other_money.uid,DATE_FORMAT(date, \'%Y-%m-%d\') as date,other_money.hours,other_money.type,other_money.money,worker_info.name\
        FROM other_money,worker_info\
        WHERE other_money.uid = worker_info.uid'
  connection.query(sql,function(error,results,fields) {
                      console.log(results);
                      res.json(results);
                    })
});

router.get('/other_money_info/update',function(req,res,next){
  sql = 'UPDATE other_money SET money='+req.query.money+' WHERE uid='+req.query.uid+' AND date='+req.query.date;
  //console.log(temp);
  connection.query(sql,function(error,results,fields) {
                      res.send('update success!');
                    })
});

router.get('/other_money_info/insert',function(req,res,next){
  sql = 'INSERT INTO other_money VALUES('+'\''+req.query.uid+'\''+',\''+req.query.date+'\','+req.query.hours+','+req.query.type+','+req.query.money+')';
  connection.query(sql,function(error,results,fields) {
                      res.send('update success!');
                    })
});

router.get('/other_money_info/delete',function(req,res,next){
  sql = 'DELETE FROM other_money WHERE uid=\''+req.query.uid+'\' AND date=\''+req.query.date+'\''
  console.log(sql);
  connection.query(sql,function(error,results,fields) {
                      res.send('DELETE success!');
                    })
});

router.get('/salary_report',function(req,res,next){

  sql = "CALL update_monthmoney();"
  connection.query(sql);
  sql="SELECT * FROM month_money;"
  connection.query(sql,function(error,results,fields) {
                      console.log(sql,results);
                      res.json(results);
                    })
});

router.get('/annual_bonus',function(req,res,next){

  sql="SELECT *,CEIL((month_sum+other_money_sum)/12) as annual_bonus\
       FROM\
       (SELECT uid,name,class_id,class_name,sum(days) as days, sum(IFNULL(other_money_sum,0)) as other_money_sum,sum(sum) as month_sum\
       FROM month_money\
       GROUP BY uid) t1"
  connection.query(sql,function(error,results,fields) {
                      console.log(sql,results);
                      res.json(results);
                    })
});


module.exports = router;
