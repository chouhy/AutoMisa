const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.static('./static'));
app.use(express.static('./build'));
app.use('/', (req, res, next) => next('/index.html'));

function main() {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
}

module.exports = main;
