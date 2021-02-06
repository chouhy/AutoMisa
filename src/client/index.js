const { CheeseRaceStacker } = require('./stacker');
const { View } = require('./view');

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
