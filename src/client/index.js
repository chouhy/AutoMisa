const { CheeseRaceStacker } = require('./stacker');
const { View } = require('./view');
const blockfish = require('./blockfish');

let stacker = new CheeseRaceStacker;
stacker.spawn();

let drawing = {
    container: document.body,
    matrix: document.getElementById('matrix'),
    hold: document.getElementById('hold'),
    previews: document.getElementById('previews'),
};

let view = new View(stacker, drawing);
view.resize();
view.draw();

let inputs = [];

function animate() {
    if (inputs === null) {
        return;
    }
    if (inputs.length === 0) {
        inputs = null;
        blockfish.suggest(stacker, (result, err) => {
            let sugg = result.suggestions[0];
            let newInputs = sugg.inputs;
            let hd = newInputs.indexOf('hd');
            inputs = newInputs.slice(0, hd + 1);
            console.log(`rating: ${sugg.rating}`);
        });
        return;
    }
    stacker.apply(inputs.shift());
    view.draw();
}

setInterval(animate, 100);
