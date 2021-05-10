const express = require('express');
const bodyParser = require('body-parser');
const next = require('next');
const routes = require('./routes');
const port = parseInt(process.env.PORT, 10) || 7070;
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
    const server = express();
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use((req, res, cb) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Access-Control-Allow-Credentials', 'true');
        cb();
    });
    // START: request api auto login from web to hidden api link from client
    // END: request api auto login from web to hidden api link from client
    server.use(handler).listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
}).catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
});