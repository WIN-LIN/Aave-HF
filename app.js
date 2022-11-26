require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { API_VERSION } = process.env;

app.use(express.static('public'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// API routes
app.use('/api/' + API_VERSION, [
    require('./backend/routes/user_route'),
    require('./backend/routes/blockchain_route'),
]);

app.use(function (req, res, next){
    res.status(404).send("Page Not Found");
});

app.use(function (err, req, res, next){
    console.error(err);
    res.status(500).send('Internal Server Error');
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
