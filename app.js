const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const session = require("express-session");
var cookieParser = require('cookie-parser');
const passport = require("passport");
const cors = require('cors');
// const dotenv = require('dotenv');
// dotenv.config();
const makeSureIs = require('./middlewares/authMiddleware');

const app = express();
const port = process.env.PORT || 5000;
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: 'http://localhost:3000', credentials: true}));

app.set('view engine', 'ejs');
app.use(session({
    secret: 'Little secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: 'lax',
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
      domain: 'localhost',
      httpOnly: true,
    }
}));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));

const router = require('./routes/all');

app.use('/', router);

app.listen(port, () => {
    console.log(`Wonderful project started on http://localhost:${port}`);
});

mongoose.connect("mongodb://127.0.0.1:27017/waterfilterDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// app.use('/admin', adminRoutes);
// app.use('/phone-agent', phoneAgentRoutes);
// Role.findOne({ title: 'admin' })
//     .then(adminRole => {
//         if (adminRole) {
//             const newUser = new User({
//                 name: 'Patrik Madhi',
//                 username: 'patrickmadhi@gmail.com',
//                 roleId: adminRole._id
//             });
//
//             return User.register(newUser, 'adminadmin');
//         } else {
//             console.error('Admin role not found');
//             return null; // Return a resolved promise with null value
//         }
//     })
//     .then(savedUser => {
//         if (savedUser) {
//             console.log('User created successfully');
//         }
//     })
//     .catch(err => {
//         console.error('Error:', err);
//     });

// User.findById("660da1067c29d0061008b08b")
//     .populate('roleId')
//     .exec()
//     .then(user => {
//         console.log('User with populated role:', user);
//     })
//     .catch(error => {
//         console.error('Error fetching user:', error);
//     });
