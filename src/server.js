const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
//configure routes
const estimatorRoute = require('./routes/estimator');

dotenv.config({ path: './config/config.env' });
//logging request details
//create logs folder if not exists
const dirname = path.resolve();
global.basedir = __dirname;
if (!fs.existsSync(path.join(__dirname, 'logs/access.log'))) {
    fs.mkdirSync(path.join(__dirname, 'logs'));
}
//log methods to log file. 
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a+' });
morgan.token('response-time-ms', function getResponse(req, res) {
    const time = this['response-time'](req, res, 0) < 10 ? `0${this['response-time'](req, res, 0)}ms` : `${this['response-time'](req, res, 0)}ms`;
    return time;
});


const app = express();
app.use(morgan(':method\t:url\t:status\t:response-time-ms', { stream: accessLogStream }));

//middlewares
app.use(express.json());
//logger

//routes
app.use('/api/v1/on-covid-19', estimatorRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
