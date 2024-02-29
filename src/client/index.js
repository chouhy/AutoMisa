const { VSStacker } = require('./stacker');
const { View } = require('./view');

let stacker = new VSStacker;
stacker.spawn();

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

let newGameMsg = {"type":"start","hold":null,"combo":0,"back_to_back":false,"board":[[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null]]};
newGameMsg["queue"] = (stacker.piece.type+stacker.queue).split("");
//"queue":["I","T","I","L","O","Z"]

let bot = new Worker("./build.emscripten/misaImport.js");
bot.onmessage = (m) => {
    console.log(m.data);
    switch (m.data.type) {
        case "info":
            bot.postMessage({"type":"rules"});
            break;
        case "ready":
            bot.postMessage(newGameMsg);
            setInterval(animate, 100);
            break;
        // do pathfinding and push to inputs then animate will process steps inside
        case "suggestion":
            console.log("a move");
            break;
        default:
            break;
    }
}

let inputs = [];

function animate() {
    if (inputs === null) {
        return;
    }
    if (inputs.length === 0) {
        inputs = null;
        // send tbp request to bot
        bot.postMessage({"type":"suggest"});
        return;
    }
    stacker.apply(inputs.shift());
    view.draw();
}