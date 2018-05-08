const http = require('http');
const path = require('path');
const fs = require('fs');
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const obj2gltf = require('obj2gltf');
const moment = require('moment');

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
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

const port = process.env.PORT || 3000;
// Get port from environment and store in Express.
// on CLI(USE Git Bash), set the port with "PORT=8080 node server"
app.set('port', port);

//start server
const server = app.listen(port, function () {
    console.log("app is running on port: " + port);
});

//handle http requests
app.post('/upload', function (req, res) {

    let currentTime = moment().format('DD/MM/YYYY HH:mm:ss');
    console.log(`start post upload, ${currentTime}`)

    // create an incoming form object
    let form = new formidable.IncomingForm();
    let fileName = '';

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = false;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, 'public/uploads');

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    // IF EXISTED, DELETE the file;
    form.on('file', function (field, file) {
        if (fs.existsSync(path.join(form.uploadDir, file.name))) {
            fs.unlinkSync(path.join(form.uploadDir, file.name));
        }
        fs.rename(file.path, path.join(form.uploadDir, file.name));
        fileName = file.name;
    });

    // log any errors that occur
    form.on('error', function (err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    // then convert obj to gltf
    form.on('end', function () {

        //send a success
        res.end('success');
        currentTime = moment().format('DD/MM/YYYY HH:mm:ss');
        console.log(`start converting obj to gltf, ${currentTime}`)
        //start converting obj to gltf
        obj2gltf(path.join(form.uploadDir, fileName), {
            materialsCommon: true,
            secure: true,
            checkTransparency: true
        }).then(function (gltf) {
            currentTime = moment().format('DD/MM/YYYY HH:mm:ss');
            const data = Buffer.from(JSON.stringify(gltf));
            fs.writeFileSync(path.join(form.uploadDir, 'result.gltf'), data);
            console.log(`gltf generated done! ${currentTime}`)
        }).catch(function (err) {
            console.log('gltf generated failed for: ' + err);
        });
    });

    // parse the incoming request containing the form data
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err)
        }
    });
});

app.get('/gltf', (req, res) => {
    res.download(path.join('public/uploads', 'result.gltf'));
})

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