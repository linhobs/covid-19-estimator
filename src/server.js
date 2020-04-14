const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');

//configure routes
const estimatorRoute = require('./routes/estimator');

dotenv.config({ path: './config/config.env' });
const app = express();

//middlewares
app.use(express.json());

//routes
app.use('/api/v1/on-covid-19', estimatorRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
