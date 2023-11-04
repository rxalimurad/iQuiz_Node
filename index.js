const express = require('express')()
const app = require('./routes')
const dotenv = require('dotenv');
const bodyParser = require('body-parser');


// Load env vars
dotenv.config({ path: './config/config.env' });

app.use(bodyParser.json());
express.use('/quiz', app);

const PORT = process.env.PORT || 6969;

express.listen(PORT, () => {
    console.log('Server Started');
});
