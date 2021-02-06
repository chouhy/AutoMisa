const { AI } = require('blockfish');

let ai = null;

function handleBlockfishRequest(req, res, next) {
    if (ai === null) {
        ai = new AI;
    }
    let { config, snapshot } = req.body;
    ai.analyze(snapshot, config, result => res.send(result));
}

module.exports = [ handleBlockfishRequest ];
