const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
// git initconst http = require('http');
// const appUrl = require('./app');

const port = process.env.PORT || 3000;
// const server = http.createServer(appUrl);

// server.listen(port, () => {
//     console.log(`started on port ${port}`);
// })

require ('dotenv').config();

app.use(express.urlencoded( {extended: true} ));
app.use(express.static('public'));
app.use(expressLayouts);

app.use(cookieParser('VideoBlogSecure'));
app.use(session({
    secret: 'VideoBlogSecretSession',
    saveUninitialized: true,
    resave: true,
}))
app.use(flash());
app.use(fileUpload());

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

const routes = require('./server/routes/recipeRoutes.js');
app.use('/', routes);

app.listen(port, () => console.log(`Listening to port ${port}`));