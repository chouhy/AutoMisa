const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const port = process.env.PORT;
const staticDir = process.env.STATIC_FILES;

if (!port) { throw new Error("PORT unset"); }
if (!staticDir) { throw new Error("STATIC_FILES unset"); }

app.use(express.static(staticDir));
app.use(express.json());

app.get('/', (req, res, next) => next('/index.html'));
app.post('/blockfish', require('./blockfish'));

function main() {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    })
}

module.exports = main;
