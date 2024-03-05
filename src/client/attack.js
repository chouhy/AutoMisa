// abstract class
class Attack {
    constructor() {
        Object.assign(this, {
            comboList: [],
            b2bList: {},
            b2bPiece: {},
            pc:0,
            spinAtk: [],
            nospinAtk: [],
        });
    }
    apply(combos, b2b, clearline, spin, type) {
        return 0;
    }
}
// https://harddrop.com/wiki/Puyo_Puyo_Tetris#Tetris_vs_Tetris_(Versus)
class PPTAttack extends Attack {
    constructor() {
        super();
        this.comboList = [0,1,1,2,2,3,3,4,4,4,5];
        this.b2bList = [1];
        this.pc = 10;
        this.b2bPiece = {
            "I": true,
            "T":true,
        };
        this.spinAtk = [2,4,6];
        this.nospinAtk = [0,1,2];
    }
    apply(combos, b2b, clearline, spin, type) {
        let atk = 0;
        if (clearline == 0) return atk;
        if (combos > 0) {
            atk += this.comboList[Math.min(this.comboList.length-1, combos-1)];
        }
        if (spin == "full" && this.b2bPiece[type] && type != "I") {
            atk += this.spinAtk[clearline-1]; 
        }
        else {
            atk += this.nospinAtk[clearline-1];
        }
        atk += b2b > 0 ? this.b2bList[0] : 0;
        return atk;
    }
}
module.exports = {
    Attack,
    PPTAttack,
};