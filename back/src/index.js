const express = require("express");
const mongoose = require("mongoose");
const useRoutes=require("./routes/index");
const rootergoogle = require('./routes/auth');
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const engine=require('ejs-mate');
let passport=require('passport');
const port = process.env.PORT || 9000;
const session=require('express-session');
const flash= require('connect-flash');

//const passport = require("passport");

// app.use(cors());
app.use(cookieParser());

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // For legacy browser support
  methods: "GET, PUT, DELETE, OPTIONS, POST"
}
const corsConfig = { 
    credentials: true,
    origin: true,
    "Allow-Access-Control-Origin": "*"
};

app.use(cors(corsConfig));




// todo el mundo connect
// app.use( "/",function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", req.header('Origin'));
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//   next();
// });
// app.use("/", function (req, res)  {
//   res.setHeader("Access-Control-Allow-Origin", "*")
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader("Access-Control-Max-Age", "1800");
//   res.setHeader("Access-Control-Allow-Headers", "content-type");
//   res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
//    });


require('./models/usergoogle');
require('./Passport/passport.js');
//const logintwet=require('./routes/logintwet');
// const route=require('./routes');
var SQLiteStore = require('connect-sqlite3')(session);

//setting
app.set('views',path.join(__dirname,'views'));
app.engine('ejs',engine);
app.set('view engine','ejs');


app.use(session({
  secret:'danielpercoromero',
  resave:true,
  saveUninitialized:true
}))
app.use(flash());
app.use(morgan("dev")); // nos permite que la aplicacion muestre los datos que se estan enviando
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}));

// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: false,
//   store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
// }));
app.use(passport.authenticate('session'));
app.use(helmet());

// app.use(cors()); 
//app.use(favicon());

app.use(logger("dev"));
app.use(express.json());
//app.use(express.methodOverride());
app.use((req,res,next)=>{
  
  res.locals.success_msg=req.flash('success_msg');

  next();
});
//Routes
app.use(passport.initialize());
app.use(passport.session());
app.use("/", useRoutes);
app.use("/", rootergoogle);
app.use(bodyParser.json());

//rutas passport

 //app.get('/',); 

// app.get('/logout',function(req,res){
//   req.logOut();
//   res.redirect('/');
// });

// app.get('/auth/twitter',passport.authenticate('twitter'));

// app.get('/auth/twitter/callback',passport.authenticate('twitter',
//   {successRedirect:'/',failureRedirect:'/login'}     

// ));



//Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connect to MomgoDB Atlas"))
  .catch((err) => console.log(err));

app.listen(port, () => console.log("servidor escuchando ", port));