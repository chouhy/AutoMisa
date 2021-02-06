const stacker = require('./stacker.js');
const rules = require('./ruleset.json');
const theme = require('./theme.json');

const CELL = 30;

class View {
    constructor(stacker, drawing) {
        function context(x) {
            return {
                canvas: drawing[x],
                ctx: drawing[x].getContext('2d'),
            };
        }
        Object.assign(this, {
            stacker,
            container: drawing.container,
            matrix: context('matrix'),
            previews: context('previews'),
            hold: context('hold'),
        });
    }

    resize() {
        this.matrix.canvas.width = CELL * rules.cols;
        this.matrix.canvas.height = CELL * rules.rows;
        this.previews.canvas.width = CELL * 4;
        this.previews.canvas.height = CELL * 3 * 5;
        this.hold.canvas.width = CELL * 4;
        this.hold.canvas.height = CELL * 3;
    }

    _clear({ canvas, ctx }) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.container.style.backgroundColor = theme.bg;
    }

    _drawGrid() {
        let { ctx } = this.matrix;

        // horizontal and vertical grid lines
        ctx.beginPath();
        for (let i = 1; i < rules.rows; i++) {
            ctx.moveTo(0, i * CELL + .5);
            ctx.lineTo(rules.cols * CELL, i * CELL + .5);
        }
        for (let i = 1; i < rules.cols; i++) {
            ctx.moveTo(i * CELL + .5, 0);
            ctx.lineTo(i * CELL + .5, rules.rows * CELL);
        }
        ctx.strokeStyle = theme.grid[0];
        ctx.stroke();

        // crosses on grid intersections
        ctx.beginPath();
        let d = Math.floor(CELL * 0.3);
        for (let i = 1; i < rules.rows; i++) {
            let y = i * CELL + .5;
            for (let j = 1; j < rules.cols; j++) {
                let x = j * CELL + .5;
                ctx.moveTo(x - d, y); ctx.lineTo(x + d, y);
                ctx.moveTo(x, y - d); ctx.lineTo(x, y + d);
            }
        }
        ctx.strokeStyle = theme.grid[1];
        ctx.stroke();

        // outline around the edges
        ctx.beginPath();
        ctx.moveTo(0.5, 0.5);
        ctx.lineTo(0.5, rules.rows * CELL - 0.5);
        ctx.lineTo(rules.cols * CELL - 0.5, rules.rows * CELL - 0.5);
        ctx.lineTo(rules.cols * CELL - 0.5, 0.5);
        ctx.lineTo(0.5, 0.5);
        ctx.strokeStyle = theme.grid[2];
        ctx.stroke();
    }

    _drawMatrixCells() {
        let { ctx } = this.matrix;
        let { matrix } = this.stacker;

        for (let i = 0; i < matrix.length; i++) {
            let y = (rules.rows - i - 1) * CELL;
            for (let j = 0; j < rules.cols; j++) {
                let x = j * CELL;
                let c = matrix[i][j];
                if (c == ' ') {
                    continue;
                }
                ctx.fillStyle = theme.mino[c];
                ctx.fillRect(x, y, CELL, CELL);
            }
        }
    }

    _drawPiece() {
        let { ctx } = this.matrix;
        let { piece } = this.stacker;

        let coords = stacker.minos(piece).map(([dx, dy]) => {
            return [piece.x + dx, piece.y + dy, piece.ghostY + dy];
        });

        // ghost
        ctx.beginPath();
        for (let [x, _y, gY] of coords) {
            let sx = x * CELL;
            let sy = (rules.rows - gY - 1) * CELL;
            ctx.rect(sx, sy, CELL, CELL);
        }
        ctx.globalAlpha = 0.4;
        ctx.fillStyle = theme.mino[piece.type];
        ctx.fill();

        // piece
        ctx.beginPath();
        for (let [x, y, _gY] of coords) {
            let sx = x * CELL;
            let sy = (rules.rows - y - 1) * CELL;
            ctx.rect(sx, sy, CELL, CELL);
        }
        ctx.globalAlpha = 1;
        ctx.fillStyle = theme.mino[piece.type];
        ctx.fill();
    }

    _drawQueue(ctx, queue) {
        for (let i = 0; i < queue.length; i++) {
            let type = queue[i];
            let coords = rules.shapes[type].coords;

            // apply offset to minos to draw them roughly centered
            let ox, oy;
            switch (type) {
            case 'I':
                ox = 1;
                oy = 0;
                break;
            case 'O':
                ox = 0.5;
                oy = 1;
                break;
            default:
                ox = 1.5;
                oy = 1;
                break;
            }

            // -draw minos
            ctx.beginPath();
            for (let [x, y] of coords) {
                let sx = (ox + x) * CELL;
                let sy = (i * 3 + oy - y) * CELL;
                ctx.rect(sx, sy, CELL, CELL);
            }
            ctx.fillStyle = theme.mino[type];
            ctx.fill();
        }
    }

    _drawHold() {
        this._drawQueue(this.hold.ctx, this.stacker.hold);
    }

    _drawPreviews() {
        this._drawQueue(this.previews.ctx, this.stacker.queue);
    }

    draw() {
        this._clear(this.matrix);
        this._drawGrid();
        this._drawMatrixCells();
        this._drawPiece();
        this._clear(this.hold);
        this._drawHold();
        this._clear(this.previews);
        this._drawPreviews();
    }
}

module.exports = { View };
