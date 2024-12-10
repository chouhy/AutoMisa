import ruleset from './ruleset.js';

class Stacker {
    constructor() {
        Object.assign(this, {
            matrix: [],
            hold: "",
            queue: "",
            piece: null,
            comboing: false,
            clear: 0,
        });
    }
    specificBoardState() {
        this.matrix = [
           "XXXXXX___X",
           "XXXXX____X",
           "XXXXXX___X",
           "XXXXXX___X",
           "XXXXXX__XX"
        ];
    }
    copy() {
        let { matrix, hold, queue } = this;
        let piece = this.piece ? Object.assign({}, this.piece) : null;
        return Object.assign(new Stacker, { matrix, hold, queue, piece });
    }

    spawn() {
        let { queue } = this;
        if (queue === "") {
            this.piece = null;
            return null;
        }
        let type = queue[0];
        this.queue = queue.substring(1);
        let [x, y] = ruleset.shapes[type].spawn;
        let rotation = 'spawn';
        this.piece = { type, x, y, rotation, ghostY: null };
        this._computeGhost();
        return type;
    }

    apply(op) {
        if (this.piece === null) {
            this.spawn();
        }

        if (op === 'hold') {
            let hold = this.hold;
            this.hold = this.piece ? this.piece.type : '';
            if (hold !== '') {
                this.queue = hold + this.queue;
            }
            return this.spawn();
        }

        switch (op) {
        case 'left':
        case 'right':
            // horizontal movement
            return this._transform([{
                dx: op == 'left' ? - 1 : 1,
                dy: 0,
                r: this.piece.rotation,
            }]);

        case 'ccw':
        case 'cw':
            // rotation
            // https://harddrop.com/wiki/SRS#How_Guideline_SRS_Really_Works
            return this._transform(kicks(this.piece, op));

        case 'sd':
        case 'hd':
            this._sonicDrop();
            if (op === 'hd') {
                this._lock();
            }
            break;

        default:
            break;
        }
    }

    _computeGhost() {
        if (this.piece !== null) {
            let ghost = Object.assign({}, this.piece);
            while (!this._intersects(ghost)) {
                ghost.y -= 1;
            }
            this.piece.ghostY = ghost.y + 1;
        }
    }

    _transform(tfs) {
        let { piece: { x, y, rotation } } = this;
        let attempt = 0;
        for (let { dx, dy, r } of tfs) {
            attempt++;
            this.piece.x = x + dx;
            this.piece.y = y + dy;
            this.piece.rotation = r;
            if (!this._intersects(this.piece)) {
                this._computeGhost();
                return attempt;
            }
        }
        // reset since all attempts failed
        this.piece.x = x;
        this.piece.y = y;
        this.piece.rotation = rotation;
        return null;
    }

    _sonicDrop() {
        this.piece.y = this.piece.ghostY;
    }

    _intersects(pc) {
        return minos(pc).some(([dx, dy]) => {
            return this._getMatrix(pc.x + dx, pc.y + dy) != '_';
        });
    }

    _lock() {
        let { type, x, y } = this.piece;
        for (let [dx, dy] of minos(this.piece)) {
            this._setMatrix(x + dx, y + dy, type);
        }
        this.sift();
        this.spawn();
        this.comboing = this.clear > 0;
    }

    _getMatrix(x, y) {
        if (x < 0 || x >= ruleset.cols || y < 0) {
            return 'X';
        } else if (y >= this.matrix.length) {
            return '_';
        } else {
            return this.matrix[y][x];
        }
    }

    _setMatrix(x, y, c) {
        if (x < 0 || x >= ruleset.cols || y < 0) {
            throw new Error('_setMatrix() invalid position');
        }
        while (y >= this.matrix.length) {
            this.matrix.push(EMPTY_ROW);
        }
        let row = this.matrix[y];
        this.matrix[y] = row.substring(0, x) + c + row.substring(x + 1);
    }

    sift() {
        this.clear = 0;
        for (let y = 0; y < this.matrix.length; y++) {
            if (!this.matrix[y].includes('_')) {
                this.matrix.splice(y, 1);
                y -= 1;
                this.clear++;
            }
        }
    }
}

const ROTATE = {
    'spawn': {
        'no': 'spawn',
        'cw': 'right',
        'ccw': 'left',
    },
    'right': {
        'no': 'right',
        'cw': 'reverse',
        'ccw': 'spawn',
    },
    'reverse': {
        'no': 'reverse',
        'cw': 'left',
        'ccw': 'right',
    },
    'left': {
        'no': 'left',
        'cw': 'spawn',
        'ccw': 'reverse',
    },
};

function minos({ type, rotation }) {
    let rotate;
    switch (rotation) {
    case 'spawn':   rotate = xy => xy; break;
    case 'right':   rotate = ([x, y]) => ([y, -x]); break;
    case 'reverse': rotate = ([x, y]) => ([-x, -y]); break;
    case 'left':    rotate = ([x, y]) => ([-y, x]); break;
    }
    return ruleset.shapes[type].coords.map(rotate);
}

function kicks({ type, rotation }, spin) {
    let r0 = rotation;
    let r1 = ROTATE[r0][spin];
    let offsets = ruleset.offsets[ruleset.shapes[type].offsets];
    let tfs = [];
    for (let i = 0; i < offsets.spawn.length; i++) {
        let [x0, y0] = offsets[r0][i];
        let [x1, y1] = offsets[r1][i];
        tfs.push({
            dx: x0 - x1,
            dy: y0 - y1,
            r: r1,
        });
    }
    return tfs;
}

function makeEmptyRow() {
    let emptyRow = '';
    while (emptyRow.length < ruleset.cols) {
        emptyRow += '_';
    }
    return emptyRow;
}

const EMPTY_ROW = makeEmptyRow();

// TODO: make this bag generator an injected dependency
class RandomBagStacker extends Stacker {
    constructor() {
        super();
        Object.assign(this, { _bag: [] })
        this._refill();
    }

    spawn() {
        super.spawn();
        this._refill();
    }

    _refill() {
        while (this.queue.length < ruleset.previews) {
            if (this._bag.length === 0) {
                this._bag = Object.keys(ruleset.shapes).slice(0);
            }
            let i = Math.floor(Math.random() * this._bag.length);
            let type = this._bag.splice(i, 1)[0];
            this.queue += type;
        }
    }
}
const TBPorientationMapping = {
    "north": "spawn",
    "east": "right",
    "south": "reverse",
    "west": "left"
}


class VSStacker extends RandomBagStacker {
    constructor() {
        super();
        Object.assign(this, { 
            // garbage = { height, column}
            garbage: [],
            combos: 0,
            garbageTick: false,
            _b2bPiece: {},
            _spin: "",
            b2b: -1,
            _atkCal: null,
            _prevType: "",
        });
    }

    setAtkCal(atkCal) {
        this._atkCal = atkCal;
        this._b2bPiece = atkCal.b2bPiece;
    }


    setSpin(spin) {
        this._spin = spin;
    }

    isAllClear() {
        return this.matrix.length == 0;
    }

    _addGarbage(height, col) {
        if (col >= ruleset.cols || col < 0) return;

        let line = '';
        for (let i = 0; i < ruleset.cols; i++) {
            line += (i === col) ? '_' : 'X';
        }
        for (let i = 0; i < height; i++) {
            this.matrix.unshift(line);
        }
        this._computeGhost();
    }
    _cancel(attack) {
        console.log("atk = "+attack);
        while (attack > 0 && this.garbage.length > 0) {
            if (this.garbage[0].height > attack) {
                this.garbage[0].height -= attack;
                attack = 0;
            }
            else {
                attack -= this.garbage[0].height;
                this.garbage.shift();
            }
        }
    }
    apply(op) {
        if (op == 'hd') {
            this._prevType = this.piece.type;
        }
        super.apply(op);
        if (op === 'hd') {
            // same as combo 2 consecutive b2b is b2bx1
            if (this.clear > 0) {
                // tetris is always b2b
                if (this._prevType == "I" && this.clear == 4)
                    this.b2b++;
                else if (!this._b2bPiece[this._prevType]) {
                    this.b2b = -1;
                }
                else {
                    if (this._spin == "none") {
                        this.b2b = -1;
                    }
                    else {
                        this.b2b++;
                    }
                }
            }
            
            if (this.comboing) {
                if (this._atkCal) {
                    console.log("peice:"+this._prevType);
                    console.log("combos:"+this.combos);
                    console.log("spin:"+this._spin);                    
                    console.log("b2b:"+this.b2b);
                    console.log("combos:"+this.combos);
                    console.log("clear:"+this.clear);
                    this._cancel(this._atkCal.apply(this.combos, this.b2b, this.clear, this._spin, this._prevType, this.isAllClear()));
                }
                return;
            }
            this.garbageTick = false;
            while (this.garbage.length > 0) {
                this.garbageTick = true;
                let g = this.garbage.shift();
                this._addGarbage(g.height, g.col);
            }
        }
    }
    _lock() {
        super._lock();
        if (this.comboing) this.combos++;
        // 2 consecutive clears = 1 combo
        else this.combos = -1;
    }
}

class CheeseRaceStacker extends RandomBagStacker {
    constructor() {
        super();
        Object.assign(this, { _prevGarbageCol: null });
        this._cheese();
    }

    apply(op) {
        super.apply(op);
        if (op === 'hd') {
            this._cheese();
        }
    }

    _cheese() {
        let cheese = 0;
        for (let row of this.matrix) {
            if (row.includes('X')) {
                cheese += 1;
            }
        }

        let target = this.comboing ? ruleset.cheese.min : ruleset.cheese.max;
        while (cheese < target) {
            cheese += 1;
            this._addGarbage(1);
        }
    }

    _addGarbage(height) {
        let col;
        if (this._prevGarbageCol === null) {
            col = Math.floor(Math.random() * ruleset.cols);
        } else {
            col = Math.floor(Math.random() * (ruleset.cols - 1));
            col = (col + this._prevGarbageCol + 1) % ruleset.cols;
        }
        this._prevGarbageCol = col;

        let line = '';
        for (let i = 0; i < ruleset.cols; i++) {
            line += (i === col) ? '_' : 'X';
        }
        for (let i = 0; i < height; i++) {
            this.matrix.unshift(line);
        }
        this._computeGhost();
    }
}

class TBPStacker extends VSStacker {
    constructor() {
        super();
        Object.assign(this, { 
            _targetPeice: null,
        });
    }
    pathFinding(location, spin) {
        let { orientation, type, x:initX, y:initY} = location;
        orientation = TBPorientationMapping[orientation];
        let curPiece = { type, x: initX, y: initY, rotation: orientation, ghostY: null };
        this._targetPeice = curPiece;
        this.setSpin(spin);
    }

    convertBoard(board) {
        let curBoard = this.matrix.map(row => row.split('').map(c => {
            if (c == "_") return null;
            if (c == "X") return "G";
            return c;
        }));
        curBoard.forEach((r, row) => {
            r.forEach((c, col) => {
                board[row][col] = c;
            });
        });
        return curBoard;
    }
}
// Debug perpose
class InstantMoveStacker extends TBPStacker {
    pathFinding(location, spin) {
        super.pathFinding(location, spin);
        let targetPeice = this._targetPeice;
        let steps = [];
        if (this.piece.type != targetPeice.type) {
            steps.push("hold");
        }
        if (targetPeice.rotation == "right") {
            steps.push("cw");
        }
        if (targetPeice.rotation == "left") {
            steps.push("ccw");
        }
        if (targetPeice.rotation == "reverse"){
            steps.push("cw");
            steps.push("cw");
        }
        steps.push("im");
        steps.push("hd");
        console.log("move create");
        return steps;
    }
    apply(op) {
        super.apply(op);
        if (op == "im") {
            this.piece.x = this._targetPeice.x;
            this.piece.y = this._targetPeice.y;
            this._computeGhost();
        }
    }
}
const reverseOp = {
    "up": "sd",
    "l": "right",
    "r": "left",
    "cw": "ccw",
    "ccw": "cw"
}
const ops = ["up","l", "r", "cw", "ccw"];

class PathFindingStacker extends TBPStacker {
   
    _transformForPath(piece, tfs) {
        let { x, y, rotation } = piece;
        let attempt = 0;
        for (let { dx, dy, r } of tfs) {
            attempt++;
            piece.x = x + dx;
            piece.y = y + dy;
            piece.rotation = r;
            if (!this._intersects(piece)) {
                return attempt;
            }
        }
        // reset since all attempts failed
        piece.x = x;
        piece.y = y;
        piece.rotation = rotation;
        return null;
    }
    _transformSimple(piece, tfs, attemptIdx) {
        let { dx, dy, r } = tfs[attemptIdx];
        piece.x += dx;
        piece.y += dy;
        piece.rotation = r;
    }
    _getTransformOptions(piece, rotate) {
        let { x, y, rotation } = piece;
        let attempt = 0;
        let options = [];
        let tfs = kicks(piece, rotate);
        for (let { dx, dy, r } of tfs) {
            piece.x = x + dx;
            piece.y = y + dy;
            piece.rotation = r;
            if (!this._intersects(piece)) {
                this._transformForPath(piece, kicks(piece, rotate == "cw"?"ccw":"cw"));
                if (piece.x == x && piece.y == y) {
                    options.push(attempt);
                }
            }
            attempt++;
        }
        // reset 
        piece.x = x;
        piece.y = y;
        piece.rotation = rotation;
        return options;
    }
    _isFloating(curPiece) {
        curPiece.y--;
        let result = !this._intersects(curPiece);
        curPiece.y++;
        return result;
    }
    isSkyReachable(piece) {
        let [_, top] = ruleset.shapes[piece.type].spawn;
        let oldY = piece.y;
        let ret = true;
        while(piece.y++ < top) {
            if (this._intersects(piece)) {
                ret = false;
                break;
            }
        }

        piece.y = oldY;
        return ret;
    }
    // find path until reachable to sky
    _pathFinding(curPiece, test) {
        if (this.isSkyReachable(curPiece)) 
            return true;
        for (let op of ops) {
            let lastOp;
            switch(op){
            case "up":
                curPiece.y++;
                if (!this._intersects(curPiece)) {
                    test.push({op:op});
                    if(this._pathFinding(curPiece, test)) return true;
                    test.pop();
                }
                curPiece.y--;
                break;
            case "l":
            case "r":
                let dx = (op == "l") ? -1 : 1;
                lastOp = test.at(-1);
                // prevent infinite lrlrlr movement
                if (lastOp && (lastOp.op == "l" || lastOp.op == "r") && lastOp.op != op) continue;
                let oldX = curPiece.x;
                curPiece.x += dx;
                
                while (!this._intersects(curPiece)) {
                    test.push({op:op});
                    if (!this._isFloating(curPiece) && this._pathFinding(curPiece, test)) return true;
                    curPiece.x += dx;
                }
                while (test.length > 0 && test.at(-1).op == op) test.pop();
                curPiece.x = oldX;
                break;
            case "cw":
            case "ccw":
                lastOp = test.at(-1);
                // attempts in options are tested, no intersections
                let options = this._getTransformOptions(curPiece, op);
                let { x, y, rotation } = curPiece;
                for (let i = options.length-1; i >= 0; i--) {
                    // prevent infinite cw cww loop
                    if (lastOp && (lastOp.op == "cw" || lastOp.op == "ccw") && lastOp.op != op && lastOp.idx == options[i])
                        continue;
                    this._transformSimple(curPiece, kicks(curPiece, op), options[i]);
                    test.push({op:op, idx:options[i]});
                    if (this._pathFinding(curPiece, test)) return true;
                    // reset
                    curPiece.x = x;
                    curPiece.y = y;
                    curPiece.rotation = rotation;
                    test.pop();
                }
                break;
            default:
            }
        }
        return false;
    }

    pathFinding(location, spin) {
        super.pathFinding(location, spin);

        let curPiece = this._targetPeice;
        let type = curPiece.type;
        let [x, y] = ruleset.shapes[type].spawn;
        let rotation = 'spawn';
        let spawnPiece = { type, x, y, rotation, ghostY: null };
        let test = [];
        let steps = [];
        curPiece._float = false;
        // console.log(this._targetPeice);
        if (this._pathFinding(curPiece, test)) {
            if (this.piece.type != curPiece.type) {
                steps.push("hold");
            }
            // simply move spawnPiece to curPiece position
            if (curPiece.rotation == "reverse") {
                steps.push("cw");
                steps.push("cw");
                this._transformForPath(spawnPiece, kicks(spawnPiece, "cw"));
                this._transformForPath(spawnPiece, kicks(spawnPiece, "cw"));
            }
            if (curPiece.rotation == "right") {
                steps.push("cw");
                this._transformForPath(spawnPiece, kicks(spawnPiece, "cw"));
            }
            if (curPiece.rotation == "left") {
                steps.push("ccw");
                this._transformForPath(spawnPiece, kicks(spawnPiece, "ccw"));
            }
            while (spawnPiece.x != curPiece.x) {
                if (spawnPiece.x > curPiece.x) {
                    spawnPiece.x--;
                    steps.push("left");
                }
                else {
                    spawnPiece.x++;
                    steps.push("right");
                }
            }
            steps.push("sd");
            // reverse test ops and fill inputs
            while (test.length > 0) {
                let op = reverseOp[test.pop().op];
                if (op == "sd" && steps.length > 0 && steps.slice(-1) == "sd") continue;
                steps.push(op);
            }
        }
        else {
            throw new Error("cannot drop this piece");
        }
        if (steps.slice(-1) == "sd") steps.pop();
        steps.push("hd");
        // console.log("steps");
        // console.log(steps);
        return steps;
    }
}
// attack per peice
class APPStacker extends PathFindingStacker {
    constructor() {
        super();
        Object.assign(this, {
            _garbageListIdx: 0,
            _garbageList: [0],
        });
    }
    // deep copy
    setGarbageList(gList) {
        if (gList.length < 1) return;
        this._garbageList = [...gList];
    }

    tick() {
        let g = this._garbageList[this._garbageListIdx];
        if (g > 0) {
            this.garbage.push({height: g, col: Math.floor(Math.random() * ruleset.cols)});
        }
        this._garbageListIdx = (this._garbageListIdx + 1) % this._garbageList.length;
    }

    apply(op) {
        super.apply(op);
        if (op == "hd") {
            this.tick();
        }
    }
}

export {
    Stacker,
    RandomBagStacker,
    VSStacker,
    PathFindingStacker,
    InstantMoveStacker,
    APPStacker,
    CheeseRaceStacker,
    minos
};
