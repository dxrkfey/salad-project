var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const bcrypt = require('bcrypt');
const saltRounds = 10; //ใช้เจนรหัส
var jwt = require('jsonwebtoken');
const secret='login-2023'
var cookieParser = require('cookie-parser')


app.use(cors());
app.use(express.json());
app.use(cookieParser());


const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'salad'
});
var getuse;

// app.post('/createCookie', function (req, res) {
//   res.cookie('token', token);
//   res.end("create cookie");
// });

// app.get('/delcokkie',function(req,res){
//   res.clearCookie('cookie', token);
// })

app.post('/register', jsonParser, function (req, res, next) {
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    connection.execute(
    'INSERT INTO user (email, password, fname, lname, number) VALUES (?,?,?,?,?)',
    [req.body.email, hash, req.body.fname, req.body.lname, req.body.number],
    function(err, results, fields) {
      if(err){
        res.json({status: 'error', message: err})
        return
      }
      res.json({status: 'ok'})
    }
   );
  });
})

app.post('/login',jsonParser, function (req, res, next) {
  connection.execute(
    'SELECT * FROM User WHERE email=?',
    [req.body.email],
    function(err, User, fields) {
      if(err){ res.json({status:'error',message: err}); return }
      if(User.length == 0 ){ res.json({status:'error',message: 'No user found'}); return }
      bcrypt.compare(req.body.password, User[0].password,function(err,islogin){
        if(islogin){
          const email = req.body.email;
          if(email=="tayida@gmail.com"){
            var token = jwt.sign({ id:User[0].id,email: User[0].email }, secret,{ expiresIn: '1h' });
            res.cookie('token', token);
            res.json({status:'okadmin',message:'login success',token})
          }
          else{
            var token = jwt.sign({id:User[0].id,email: User[0].email }, secret,{ expiresIn: '1h' });
            var decoded = jwt.verify(token, secret)
            var userid = decoded["id"]
            getuse = userid;
            res.cookie('token', token);
            res.json({status:'ok',message:'login success',token,userid})
          }
         
        }
        else{
          res.json({status:'error ',message:'login failed'})
        }
      }); 
    }
    );
})


// app.post('/logout', (req, res) => {
//   // Clear the authentication cookie
//   res.clearCookie('token');

//   // Clear the user's session
//   req.session.destroy(err => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Failed to destroy session');
//     } else {
//       res.send('Logged out successfully');
//     }
//   });
// });


app.post("/authen", jsonParser, (req, res, next) =>{
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, secret);
    const payload = decoded;
    // Add the UserID to the request object for use in subsequent middleware
    UserID = decoded["id"];
    getuse = UserID;
    res.json({ status: "ok", decoded,UserID});
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
});


app.post('/menu', jsonParser, function (req, res, next) {
  connection.execute(
    'SELECT * FROM menu WHERE menuID=?',
    [req.body.menuID],
    function (err, results, fields) {
      if (err) {
        res.json({ status: 'error', message: err })
        return
      }
      res.json({ status: 'ok', results })
    }
  );
  console.log(req.body)
})


  app.post('/orderinput', jsonParser, function (req, res, next) {
    // console.log(generateRandomNumber(4)+generateRandomString(3));
    let date = new Date(Date.now());

    connection.execute(
      'INSERT INTO `order`(`date`, `amount`, `TotalPrice`, `status`, `user_id`) VALUES (?,?,?,?,?)',
      [date, req.body.amount,req.body.TotalPrice,req.body.status,req.body.user_id],
      function (err, results, fields) {
        if (err) {
          res.json({ status: 'error', message: err })
          console.log(err)
          return
        }
        var ORDERID = results.insertId;
        //console.log(ORDERID)
        res.json({ status: 'ok', results , ORDERID});
      }
    );
  })

  app.post('/order_detail', jsonParser, function (req, res, next) {
    connection.execute(
      'INSERT INTO order_detail (menu_name, price, amount,`menuID`, orderID) VALUES (?,?,?,?,?)',
      [req.body.menu_name, req.body.price,req.body.amount,,req.body.menuID,req.body.orderID],
      function (err, results, fields) {
        if (err) {
          res.json({ status: 'error', message: err })
          return
        }
        res.json({ status: 'ok', results })
      }
    );
  })
  
  app.put("/update", (req, res) => {
    const id = req.body.orderID;
    const status = req.body.status;
    connection.query( 'UPDATE order SET status = ? WHERE orderID = ?',
      [status, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  })
  
  app.get("/orderdetail", (req, res) => {
    connection.query('SELECT order.orderID, order.TotalPrice, order.amount,`order`.`status`, GROUP_CONCAT(order_detail.menu_name," :"," ",order_detail.amount," ") AS detail FROM order, order_detail WHERE  order.orderID = order_detail.orderID AND order.date = CURDATE() AND order.status = "ยืนยันคำสั่งซื้อ" GROUP BY order.orderID', 
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  })
  
  
  app.get("/static", (req, res) => {
    connection.query('SELECT order_detail.menu_name, SUM(order_detail.amount) AS amount FROM orderJOIN order_detail ON order.orderID = order_detail.orderID WHERE order.status = "เสร็จสิ้น" AND MONTH(order.Date) = MONTH(NOW()) GROUP BY order_detail.menu_name',
     (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  })
  app.get("/recentdeposits", (req, res) => {
    connection.query('SELECT SUM(TotalPrice) AS amount FROM orderWHERE order.status = "เสร็จสิ้น" AND MONTH(order.Date) = MONTH(NOW())',
     (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  })
  app.get("/order", (req, res) => {
    connection.query('SELECT * FROM orderWHERE status = "ยืนยันคำสั่งซื้อ" AND date = CURDATE()', (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  })
  app.get("/orderconfirmation", (req, res) => {
    connection.query('SELECT order.orderID, order.TotalPrice, order.amount,`order`.`status`, GROUP_CONCAT(order_detail.menu_name," :"," ",order_detail.amount," ") AS detail FROM order, order_detail WHERE  order.orderID = order_detail.orderID AND order.date = CURDATE() AND order.status = "รอยืนยันคำสั่งซื้อ" GROUP BY order.orderID',
     (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  })
  app.get("/orderalert", (req, res) => {
    connection.query('SELECT COUNT(*) AS AlertOrder FROM order WHERE status="รอยืนยันคำสั่งซื้อ" AND date = CURDATE() ', (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  })
  
  app.get("/orderfinish", (req, res) => {
    connection.query('SELECT order.orderID, order.TotalPrice, order.amount,`order`.`status`, GROUP_CONCAT(order_detail.menu_name," :"," ",order_detail.amount," ") AS detail FROM order, order_detail WHERE  order.orderID = order_detail.orderID AND order.date = CURDATE() AND order.status = "เสร็จสิ้น" OR order.status = "ยกเลิกคำสั่งซื้อ" GROUP BY order.orderID', (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  })
  
  
  
  

app.get("/history", (req, res) => {
  const Date = 'DATE_FORMAT(date,"%d %M %Y")';
  connection.query('SELECT *, DATE_FORMAT(date,"%d %M %Y") As Date FROM `order` WHERE user_id = ? ;',[getuse],(err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
})


app.listen(3333,jsonParser, function () {
  console.log('CORS-enabled web server listening on port 3333')
})