const { APPStacker } = require('./stacker');
const { View } = require('./view');
const { PPTattack } = require('./attack.js');
let stacker = new APPStacker;
let atk = new PPTattack;
stacker.spawn();
stacker.setGarbageList([1, 0, 0, 0, 1, 0]);
stacker.setAtkCal(atk);
stacker.setb2bPiece(atk.b2bPiece);

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

let gameMsg = {"type":"start","hold":null,"combo":0,"back_to_back":false,"board":getEmptyBoard()};
gameMsg["queue"] = (stacker.piece.type+stacker.queue).split("");
//"queue":["I","T","I","L","O","Z"]
console.log(gameMsg);

function getEmptyBoard() {
    return [[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null]];
}

let bot = new Worker("./build.emscripten/misaImport.js");

bot.onmessage = (m) => {
    // console.log(m.data);
    switch (m.data.type) {
        case "info":
            bot.postMessage({"type":"rules"});
            break;
        case "ready":
            bot.postMessage(gameMsg);
            bot.postMessage({"type":"suggest"});
            break;
        // do pathfinding and push to inputs then animate will process steps inside
        case "suggestion":
            let move = m.data.moves[0];
            console.log(move);
            hold = stacker.hold;
            let steps = stacker.pathFinding(move.location, move.spin);
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

        // normal update
        if (!stacker.garbageTick) {
            if (hold == '' && hold != stacker.hold) {
              console.log("add peice "+ stacker.queue.slice(-2) );
              bot.postMessage({"type":"new_piece", "piece":stacker.queue.slice(-2,-1)});
            }
            bot.postMessage({"type":"new_piece", "piece":stacker.queue.slice(-1)});
            console.log("add peice "+ stacker.queue.slice(-1));
        }
        // update the whole board
        else {
            gameMsg["board"] = getEmptyBoard();
            let curBoard = stacker.convertBoard(gameMsg["board"]);
            console.log("curBoard");
            console.log(curBoard);
            gameMsg["back_to_back"] = stacker.b2b >= 0;
            gameMsg["queue"] = (stacker.piece.type+stacker.queue).split("");
            gameMsg["combo"] = stacker.combos;
            gameMsg["hold"] = stacker.hold == '' ? null : stacker.hold;
            console.log("update board");
            console.log(gameMsg);
            // gameMsg["back_to_back_num"] = stacker.b2b;
            bot.postMessage(gameMsg);
            // // bot.postMessage({"type":"stop"});
        }
        // send tbp request to bot
        // count++;
        // if (count < 6)
        bot.postMessage({"type":"suggest"});
        return;
    }
    // inputs.shift();
    stacker.apply(inputs.shift());
    view.draw();
}
setInterval(animate, 100);