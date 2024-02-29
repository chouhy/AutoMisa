const { CheeseRaceStacker } = require('./stacker');
const { View } = require('./view');

let stacker = new CheeseRaceStacker;
stacker.spawn();
var a = new Worker("/build.emscripten/misaImport.js");
a.onmessage = (m) => {
    console.log(m.data);
}
let drawing = {
    container: document.body,
    matrix: document.getElementById('matrix'),
    garbage: document.getElementById('garbage'),
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
        // send tbp request to bot
        // do pathfinding to fill inputs
        return;
    }
    stacker.apply(inputs.shift());
    view.draw();
}

setInterval(animate, 100);
