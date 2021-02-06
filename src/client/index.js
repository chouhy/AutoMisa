const { View } = require('./view');

let stacker = {
    hold: "S",
    queue: "ZIOJL",
    matrix: [
        "XXXXXXXX X",
        "XXXX XXXXX",
        " XXXXXXXXX",
        "X XXXXXXXX",
    ],
    piece: {
        type: "T",
        rotation: "reverse",
        x: 4, y: 19, ghostY: 5,
    },
};

let drawing = {
    container: document.body,
    matrix: document.getElementById('matrix'),
    hold: document.getElementById('hold'),
    previews: document.getElementById('previews'),
};

let view = new View(stacker, drawing);
view.resize();
view.draw();
