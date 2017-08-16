const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const port = process.env.PORT || 3000;

app.disable('x-powered-by');
app.use(require('cookie-parser')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join('public')));

app.use(cors());
app.options('*', cors());

app.use((err, _req, res, _next) => {
    if (err.output && err.output.statusCode) {
        return res
            .status(err.output.statusCode)
            .set('Content-Type', 'text/plain')
            .send(err.message);
    }

    console.error(JSON.stringify(err, null, 2));

    if (err.status) {
        return res
            .status(err.status)
            .set('Content-Type', 'text/plain')
            .send(err.statusText);
    }

    console.error(err.stack);
    res.sendStatus(500);
});

const httpsOptions = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
}

const server = https.createServer(httpsOptions, app)

app.listen(port, () => {
    console.log(`Server running on ${port}`)
});