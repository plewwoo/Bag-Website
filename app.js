const path = require('path');
const express = require('express');
const hbs = require('express-handlebars');
const session = require('express-session')
const hostname = 'localhost';
const port = 3001;

const bagsRouter = require('./routes/bags');
const indexRouter = require('./routes/index')

const logger = require('./middleware/logger');

const app = express();

app.use(session({
  secret: 'mysecret',
  saveUninitialized: false,
  resave: false
  }));

  app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
})

//Template Engines
app.engine('hbs', hbs({ extname: 'hbs' }))
app.set('view engine', 'hbs');

//Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Custom Middleware
app.use(logger);
 
//Routes
app.use('/apis/bags', bagsRouter)
app.use('/', indexRouter)

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});