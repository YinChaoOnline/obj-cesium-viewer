const http = require('http');
const path = require('path');
const fs = require('fs');
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const obj2gltf = require('obj2gltf');

const app = express();

app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json
app.use(bodyParser.json());

// View engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

//use middleware
app.use(express.static(path.join(__dirname, 'public')));

app.get('', function (req, res) {
    res.sendFile(path.join(__dirname,'public/index.html'));
})

// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//start server
const server=app.listen(port, function () {
    console.log("app is running on port: "+ port);
});

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // Named pipe
        return val;
    }

    if (port >= 0) {
        // Port number
        return port;
    }

    return false;
}

// listen and close methods are need for mocha testing.
exports.listen = function (port) {
    app.listen(port, function () {
        console.log("app is running on port: " + port);
    });
};

// close destroys the server.
exports.close = function () {
    server.close();
};