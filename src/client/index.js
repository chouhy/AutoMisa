const { CheeseRaceStacker } = require('./stacker');
const { View } = require('./view');
const blockfish = require('./blockfish');

let stacker = new CheeseRaceStacker;
stacker.spawn();

blockfish.suggest(stacker, (sugg, err) => {
    if (err !== null) {
        console.error(err);
        return;
    }
    console.log('blockfish suggestion: ', sugg);
});

let drawing = {
    container: document.body,
    matrix: document.getElementById('matrix'),
    hold: document.getElementById('hold'),
    previews: document.getElementById('previews'),
};

let view = new View(stacker, drawing);
view.resize();
view.draw();
