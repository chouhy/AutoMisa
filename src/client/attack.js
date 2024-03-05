// abstract class
class attack {
    constructor() {
        Object.assign(this, {
            comboList: [],
            b2bList: {},
            b2bPiece: {},
            pc,
            spinAtk: [],
            nospinAtk: [],
        });
    }
    apply(combos, b2b, clearline, spin, type) {
        return 0;
    }
}
// https://harddrop.com/wiki/Puyo_Puyo_Tetris#Tetris_vs_Tetris_(Versus)
class PPTattack extends attack {
    constructor() {
        Object.assign(this, {
            comboList: [0,1,1,2,2,3,3,4,4,4,5],
            b2bList: [1],
            pc: 10,
            b2bPiece: {
                "I": true,
                "T":true,
            },
            spinAtk: [2,4,6],
            nospinAtk: [0,1,2],
        });
    }
    apply(combos, b2b, clearline, spin, type) {
        let atk = 0;
        if (clearline == 0) return atk;
        atk += this.comboList[Math.min(this.comboList.length-1), combos];
        if (spin == "full" && this.b2bPiece[type] && type != "I") {
            atk += spinAtk[clearline-1]; 
        }
        else {
            atk += nospinAtk[clearline-1];
        }
        if (this.b2bPiece[type]) {
            atk += b2b > 0 ? b2bList[0] : 0;
        }
        return atk;
    }
}