const ruleset = require('./ruleset');

class Stacker {
    constructor() {
        Object.assign(this, {
            matrix: [],
            hold: "",
            queue: "",
            piece: null,
            comboing: false,
            clear: 0,
            garbage: 5,
        });
    }

    copy() {
        let { matrix, hold, queue, garbage } = this;
        let piece = this.piece ? Object.assign({}, this.piece) : null;
        return Object.assign(new Stacker, { matrix, hold, queue, piece, garbage });
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

module.exports = {
    Stacker,
    RandomBagStacker,
    CheeseRaceStacker,
    minos
};
