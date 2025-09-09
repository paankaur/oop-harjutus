const express = require('express');
// const db = require('./utils/db');

const app = express();
const PORT = 3025;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const articleRoutes = require('./routes/articles');

app.use('/', articleRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});