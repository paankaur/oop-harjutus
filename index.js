const express = require('express');
// const db = require('./utils/db');

const app = express();
const PORT = 3025;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const articleRoutes = require('./routes/articles');
const authorsRoutes = require('./routes/authors');
app.use('/', authorsRoutes);
app.use('/', articleRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});