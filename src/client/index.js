const { InstantMoveStacker } = require('./stacker');
const { View } = require('./view');

let stacker = new InstantMoveStacker;
stacker.spawn();
let hold = null;
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
console.log(newGameMsg.queue);
let bot = new Worker("./build.emscripten/misaImport.js");
bot.onmessage = (m) => {
    // console.log(m.data);
    switch (m.data.type) {
        case "info":
            bot.postMessage({"type":"rules"});
            break;
        case "ready":
            bot.postMessage(newGameMsg);
            bot.postMessage({"type":"suggest"});
            break;
        // do pathfinding and push to inputs then animate will process steps inside
        case "suggestion":
            let move = m.data.moves[0];
            console.log(move.location);
            hold = stacker.hold;
            let steps = stacker.pathFinding(move.location, view);
            bot.postMessage({"type":"play", "move":m.data.moves[0]});
            steps.push("delay");
            inputs = steps;
            break;
        default:
            break;
    }
}

// document.getElementById("next").addEventListener("click", function() {
//   console.log(this.id);
//   bot.postMessage({"type":"suggest"});
// });

let inputs = null;
function animate() {
    if (inputs === null) {
        return;
    }
    if (inputs.length === 0) {
        inputs = null;
        if (hold == '' && hold != stacker.hold) {
          console.log("add peice "+ stacker.queue.slice(-2) );
          bot.postMessage({"type":"new_piece", "piece":stacker.queue.slice(-2,-1)});
        }
        bot.postMessage({"type":"new_piece", "piece":stacker.queue.slice(-1)});
        console.log("add peice "+ stacker.queue.slice(-1));
        // send tbp request to bot
        bot.postMessage({"type":"suggest"});
        return;
    }
    // inputs.shift();
    stacker.apply(inputs.shift());
    view.draw();
}
setInterval(animate, 100);