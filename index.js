const express = require('express');
const sessions = require('express-session');
const hbs = require('express-handlebars');


const app = express();
const PORT = 3025;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessions({
    secret: 'thisIsMySecretKey',
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
    resave: false
}));

app.set('   view engine', 'hbs');
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/'
}));

const articleRoutes = require('./routes/articles');
const authorsRoutes = require('./routes/authors');

app.use('/', authorsRoutes);
app.use('/', articleRoutes);

const userRoutes = require('./routes/users');
app.use('/', userRoutes);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});