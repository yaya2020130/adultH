// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var cors = require('cors')
const session = require('express-session')
var SequelizeStore = require('connect-session-sequelize')(session.Store);
require("dotenv").config();

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(session(
  {
    secret: process.env.SESSION_SECRET,
    store: new SequelizeStore({
      db: db.sequelize
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 2 * 60 * 60 * 1000
    }
  }));
// Static directory
// app.use(express.static("public"));




app.get("/", (req, res) => {
  res.send("Wellcome to my page")
})
// app.post("/api/login",({body:{username,password}},res)=> {
//   db.User.findOne({where:{username:username}}).then(user=>{
//     user.password === session.password ? res.json(user) : res.json('Incorrect password!')
//   }).catch(err=> res.json("cannot find user!"))
// })


// app.post("/api/login",({body:{username,password}},res)=> {
//   db.User.findOne({where:{username:username}}).then(dbUser=>{//check if password entered matches db password
app.post("/login", (req, res) => {
  db.User.findOne({
    where: {
      username: req.body.username
    }
  }).then(dbUser => {


    if (!dbUser) {
      req.session.user = false;
      res.send("no user found")
      
      
      // 


    } else if (bcrypt.compareSync(req.body.password, dbUser.password)) {
      //    res.send("logged in")
      req.session.user = {
        id: dbUser.id,
        username: dbUser.username,
        isAdmin: dbUser.isAdmin
      }
      console.log(req.session.user)
      res.json(req.session)
    } else {
      req.session.user = false
      res.send("incorrect password")
    }
  }).catch(err => {
    req.session.user = false;
    res.status(500);
  })
})


// signup page
app.post("/api/signup", ({ body: { username, password, isAdmin = false } }, res) => {
  db.User.create({ username, password, isAdmin }).then(dbUser => {
    res.json(dbUser)
  }).catch(err => {
    res.status(500);
  })
})

app.get('/api/currentuser', (req,res)=>{
  res.json(req.session)
})

//   db.User.create({username,password, isAdmin: code === process.env.admin_code ? true : false}).then(data=>console.log(data))
// })




app.get("/readsessions", (req, res) => {

  res.json(req.session)
})



app.get("/patients", (req, res) => {
  console.log("this rout is correcet")
  db.Patient.findAll().then(data => {
    console.log(data);
    res.json(data)
  })

})



app.post('/api/patients', (req, res) => {
  // if(req.session.user){
  db.Patient.create(req.body).then(data => {
    res.json(data)
  })
  // }else{
  //   res.status(401).send("log in first")
  // }
})


app.get("/logout", (req, res) => {
  req.session.destroy();
  res.json("logged out!")
})




app.get("/newEntry", (req, res) => {
  db.Patient.findAll().then(data => {
    console.log(data);
    res.json(data)
  })

})


app.get("/api/logbook/:id", (req, res) => {
  db.Patient.findOne({
    where: {
      id: req.params.id
    }
  }).then(data => {
    console.log(data);
    res.json(data)
  })

})



app.post('/api/logbook', (req, res) => {
  if (req.session.user) {
    db.LogBook.create(req.body).then(data => {
      res.json(data)
    })
  } else {
    res.status(401).send("log in first")
  }
})









// ===========




// Get one patient By id
app.get('/patient/:id', (req, res) => {
  const id = req.params.id;
  db.Patient.findOne({
    where: { id: id }
  })
    .then(data => {
      res.json(data)
    })
})

// PUT route for updating patient
app.put("/api/patient/:id", function (req, res) {
  console.log(req.session.user, req.body, req.params.id)
  if (req.session.user) {

    console.log(req.body)
    const id = req.params.id
    db.Patient.update(req.body,
      {
        where: {
          id: id
        }
      })
      .then(function (PatientData) {
        res.json(PatientData);
      });
  } else {
    res.status(401).send("log in first")
  }
});







// POST single Patient
app.post('/newEntry', (req, res) => {
  const lastname = req.body.lastname;
  const firstname = req.body.firstname
  const email = req.body.email;
  const phone_number = req.body.phone_number;
  const address = req.body.address

  db.Patient.create({
    lastname: lastname,
    firstname: firstname,
    email: email,
    phone_number: phone_number,
    address: address
  })
    .then(newPat => {
      res.json(newPat);
    })
});



// creating employeee

// app.get("/api/employees/:id", (req, res) => {
//   db.Employees.findOne({
//       where: {
//           id: req.params.id
//       }
//   }).then(employee => {
//       res.json(employee)
//   })
// })





app.get("/employee", (req, res) => {
  db.employee.findAll().then(data => {
    console.log(data);
    res.json(data)
  })

})



app.post('/api/employee', (req, res) => {
  // if(req.session.user){
  db.Employee.create(req.body).then(data => {
    res.json(data)
  })
})


app.put("/api/employee/:id", (req, res) => {
  if (req.session.user) {

    db.Employee.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
      }
    ).then(employeeData => {
      res.json(employeeData);
    })
  } else {
    res.status(401).send("log in first")
  }
})

//  manager route





app.get("/manager", (req, res) => {
  db.Manager.findAll().then(data => {
    console.log(data);
    res.json(data)
  })

})



app.post('/api/manager', (req, res) => {
  // if(req.session.user){
  db.Manager.create(req.body).then(data => {
    res.json(data)
  })
})


app.put("/api/manager/:id", (req, res) => {
  if (req.session.user) {

    db.Manager.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
      }
    ).then(managerData => {
      res.json(managerData);
    })
  } else {
    res.status(401).send("log in first")
  }
})



// app.post("/api/employees/:id", (req, res) => {
//   // if (req.session.user) {

//       db.Employees.create(
//           req.body

//       ).then(employeesData => {
//           res.json(employeesData);
//       })

// })








// Routes
// // =============================================================
// require("./routes/post-api-routes.js")(app);
// require("./routes/author-api-routes.js")(app);
// require("./routes/html-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({
  force: false
}).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
