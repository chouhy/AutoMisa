(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports={
    "previews": 5,
    "cheese": {
        "min": 4,
        "max": 9
    },
    "rows": 20,
    "cols": 10,
    "offsets": {
        "JLSTZ": {
            "spawn":   [[ 0, 0], [ 0, 0], [ 0, 0], [ 0, 0], [ 0, 0]],
            "right":   [[ 0, 0], [ 1, 0], [ 1,-1], [ 0, 2], [ 1, 2]],
            "reverse": [[ 0, 0], [ 0, 0], [ 0, 0], [ 0, 0], [ 0, 0]],
            "left":    [[ 0, 0], [-1, 0], [-1,-1], [ 0, 2], [-1, 2]]
        },
        "I": {
            "spawn":   [[ 0, 0], [-1, 0], [ 2, 0], [-1, 0], [ 2, 0]],
            "right":   [[-1, 0], [ 0, 0], [ 0, 0], [ 0, 1], [ 0,-2]],
            "reverse": [[-1, 1], [ 1, 1], [-2, 1], [ 1, 0], [-2, 0]],
            "left":    [[ 0, 1], [ 0, 1], [ 0, 1], [ 0,-1], [ 0, 2]]
        },
        "O": {
            "spawn":   [[ 0, 0]],
            "right":   [[ 0,-1]],
            "reverse": [[-1,-1]],
            "left":    [[-1, 0]]
        }
    },
    "shapes": {
        "J": {
            "coords": [[-1, 1], [-1, 0], [ 0, 0], [ 1, 0]],
            "spawn": [4, 19],
            "offsets": "JLSTZ"
        },
        "L": {
            "coords": [[ 1, 1], [-1, 0], [ 0, 0], [ 1, 0]],
            "spawn": [4, 19],
            "offsets": "JLSTZ"
        },
        "T": {
            "coords": [[ 0, 1], [-1, 0], [ 0, 0], [ 1, 0]],
            "spawn": [4, 19],
            "offsets": "JLSTZ"
        },
        "S": {
            "coords": [[-1, 0], [ 0, 0], [ 0, 1], [ 1, 1]],
            "spawn": [4, 19],
            "offsets": "JLSTZ"
        },
        "Z": {
            "coords": [[ 1, 0], [ 0, 0], [ 0, 1], [-1, 1]],
            "spawn": [4, 19],
            "offsets": "JLSTZ"
        },
        "I": {
            "coords": [[-1, 0], [ 0, 0], [ 1, 0], [ 2, 0]],
            "spawn": [4, 19],
            "offsets": "I"
        },
        "O": {
            "coords": [[ 0, 0], [ 1, 0], [ 0, 1], [ 1, 1]],
            "spawn": [4, 19],
            "offsets": "O"
        }
    }
}

},{}],2:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var ruleset = require('./ruleset');
var Stacker = /*#__PURE__*/function () {
  function Stacker() {
    _classCallCheck(this, Stacker);
    Object.assign(this, {
      matrix: [],
      hold: "",
      queue: "",
      piece: null,
      comboing: false,
      clear: 0,
      garbage: 5
    });
  }
  _createClass(Stacker, [{
    key: "copy",
    value: function copy() {
      var matrix = this.matrix,
        hold = this.hold,
        queue = this.queue,
        garbage = this.garbage;
      var piece = this.piece ? Object.assign({}, this.piece) : null;
      return Object.assign(new Stacker(), {
        matrix: matrix,
        hold: hold,
        queue: queue,
        piece: piece,
        garbage: garbage
      });
    }
  }, {
    key: "spawn",
    value: function spawn() {
      var queue = this.queue;
      if (queue === "") {
        this.piece = null;
        return null;
      }
      var type = queue[0];
      this.queue = queue.substring(1);
      var _ruleset$shapes$type$ = _slicedToArray(ruleset.shapes[type].spawn, 2),
        x = _ruleset$shapes$type$[0],
        y = _ruleset$shapes$type$[1];
      var rotation = 'spawn';
      this.piece = {
        type: type,
        x: x,
        y: y,
        rotation: rotation,
        ghostY: null
      };
      this._computeGhost();
      return type;
    }
  }, {
    key: "apply",
    value: function apply(op) {
      if (this.piece === null) {
        this.spawn();
      }
      if (op === 'hold') {
        var hold = this.hold;
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
            dx: op == 'left' ? -1 : 1,
            dy: 0,
            r: this.piece.rotation
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
  }, {
    key: "_computeGhost",
    value: function _computeGhost() {
      if (this.piece !== null) {
        var ghost = Object.assign({}, this.piece);
        while (!this._intersects(ghost)) {
          ghost.y -= 1;
        }
        this.piece.ghostY = ghost.y + 1;
      }
    }
  }, {
    key: "_transform",
    value: function _transform(tfs) {
      var _this$piece = this.piece,
        x = _this$piece.x,
        y = _this$piece.y,
        rotation = _this$piece.rotation;
      var attempt = 0;
      var _iterator = _createForOfIteratorHelper(tfs),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _step.value,
            dx = _step$value.dx,
            dy = _step$value.dy,
            r = _step$value.r;
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
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      this.piece.x = x;
      this.piece.y = y;
      this.piece.rotation = rotation;
      return null;
    }
  }, {
    key: "_sonicDrop",
    value: function _sonicDrop() {
      this.piece.y = this.piece.ghostY;
    }
  }, {
    key: "_intersects",
    value: function _intersects(pc) {
      var _this = this;
      return minos(pc).some(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          dx = _ref2[0],
          dy = _ref2[1];
        return _this._getMatrix(pc.x + dx, pc.y + dy) != '_';
      });
    }
  }, {
    key: "_lock",
    value: function _lock() {
      var _this$piece2 = this.piece,
        type = _this$piece2.type,
        x = _this$piece2.x,
        y = _this$piece2.y;
      var _iterator2 = _createForOfIteratorHelper(minos(this.piece)),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _step2$value = _slicedToArray(_step2.value, 2),
            dx = _step2$value[0],
            dy = _step2$value[1];
          this._setMatrix(x + dx, y + dy, type);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      this.sift();
      this.spawn();
      this.comboing = this.clear > 0;
    }
  }, {
    key: "_getMatrix",
    value: function _getMatrix(x, y) {
      if (x < 0 || x >= ruleset.cols || y < 0) {
        return 'X';
      } else if (y >= this.matrix.length) {
        return '_';
      } else {
        return this.matrix[y][x];
      }
    }
  }, {
    key: "_setMatrix",
    value: function _setMatrix(x, y, c) {
      if (x < 0 || x >= ruleset.cols || y < 0) {
        throw new Error('_setMatrix() invalid position');
      }
      while (y >= this.matrix.length) {
        this.matrix.push(EMPTY_ROW);
      }
      var row = this.matrix[y];
      this.matrix[y] = row.substring(0, x) + c + row.substring(x + 1);
    }
  }, {
    key: "sift",
    value: function sift() {
      this.clear = 0;
      for (var y = 0; y < this.matrix.length; y++) {
        if (!this.matrix[y].includes('_')) {
          this.matrix.splice(y, 1);
          y -= 1;
          this.clear++;
        }
      }
    }
  }]);
  return Stacker;
}();
var ROTATE = {
  'spawn': {
    'no': 'spawn',
    'cw': 'right',
    'ccw': 'left'
  },
  'right': {
    'no': 'right',
    'cw': 'reverse',
    'ccw': 'spawn'
  },
  'reverse': {
    'no': 'reverse',
    'cw': 'left',
    'ccw': 'right'
  },
  'left': {
    'no': 'left',
    'cw': 'spawn',
    'ccw': 'reverse'
  }
};
function minos(_ref3) {
  var type = _ref3.type,
    rotation = _ref3.rotation;
  var rotate;
  switch (rotation) {
    case 'spawn':
      rotate = function rotate(xy) {
        return xy;
      };
      break;
    case 'right':
      rotate = function rotate(_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
          x = _ref5[0],
          y = _ref5[1];
        return [y, -x];
      };
      break;
    case 'reverse':
      rotate = function rotate(_ref6) {
        var _ref7 = _slicedToArray(_ref6, 2),
          x = _ref7[0],
          y = _ref7[1];
        return [-x, -y];
      };
      break;
    case 'left':
      rotate = function rotate(_ref8) {
        var _ref9 = _slicedToArray(_ref8, 2),
          x = _ref9[0],
          y = _ref9[1];
        return [-y, x];
      };
      break;
  }
  return ruleset.shapes[type].coords.map(rotate);
}
function kicks(_ref10, spin) {
  var type = _ref10.type,
    rotation = _ref10.rotation;
  var r0 = rotation;
  var r1 = ROTATE[r0][spin];
  var offsets = ruleset.offsets[ruleset.shapes[type].offsets];
  var tfs = [];
  for (var i = 0; i < offsets.spawn.length; i++) {
    var _offsets$r0$i = _slicedToArray(offsets[r0][i], 2),
      x0 = _offsets$r0$i[0],
      y0 = _offsets$r0$i[1];
    var _offsets$r1$i = _slicedToArray(offsets[r1][i], 2),
      x1 = _offsets$r1$i[0],
      y1 = _offsets$r1$i[1];
    tfs.push({
      dx: x0 - x1,
      dy: y0 - y1,
      r: r1
    });
  }
  return tfs;
}
function makeEmptyRow() {
  var emptyRow = '';
  while (emptyRow.length < ruleset.cols) {
    emptyRow += '_';
  }
  return emptyRow;
}
var EMPTY_ROW = makeEmptyRow();
var RandomBagStacker = /*#__PURE__*/function (_Stacker) {
  _inherits(RandomBagStacker, _Stacker);
  var _super = _createSuper(RandomBagStacker);
  function RandomBagStacker() {
    var _this2;
    _classCallCheck(this, RandomBagStacker);
    _this2 = _super.call(this);
    Object.assign(_assertThisInitialized(_this2), {
      _bag: []
    });
    _this2._refill();
    return _this2;
  }
  _createClass(RandomBagStacker, [{
    key: "spawn",
    value: function spawn() {
      _get(_getPrototypeOf(RandomBagStacker.prototype), "spawn", this).call(this);
      this._refill();
    }
  }, {
    key: "_refill",
    value: function _refill() {
      while (this.queue.length < ruleset.previews) {
        if (this._bag.length === 0) {
          this._bag = Object.keys(ruleset.shapes).slice(0);
        }
        var i = Math.floor(Math.random() * this._bag.length);
        var type = this._bag.splice(i, 1)[0];
        this.queue += type;
      }
    }
  }]);
  return RandomBagStacker;
}(Stacker);
var CheeseRaceStacker = /*#__PURE__*/function (_RandomBagStacker) {
  _inherits(CheeseRaceStacker, _RandomBagStacker);
  var _super2 = _createSuper(CheeseRaceStacker);
  function CheeseRaceStacker() {
    var _this3;
    _classCallCheck(this, CheeseRaceStacker);
    _this3 = _super2.call(this);
    Object.assign(_assertThisInitialized(_this3), {
      _prevGarbageCol: null
    });
    _this3._cheese();
    return _this3;
  }
  _createClass(CheeseRaceStacker, [{
    key: "apply",
    value: function apply(op) {
      _get(_getPrototypeOf(CheeseRaceStacker.prototype), "apply", this).call(this, op);
      if (op === 'hd') {
        this._cheese();
      }
    }
  }, {
    key: "_cheese",
    value: function _cheese() {
      var cheese = 0;
      var _iterator3 = _createForOfIteratorHelper(this.matrix),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var row = _step3.value;
          if (row.includes('X')) {
            cheese += 1;
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      var target = this.comboing ? ruleset.cheese.min : ruleset.cheese.max;
      while (cheese < target) {
        cheese += 1;
        this._addGarbage(1);
      }
    }
  }, {
    key: "_addGarbage",
    value: function _addGarbage(height) {
      var col;
      if (this._prevGarbageCol === null) {
        col = Math.floor(Math.random() * ruleset.cols);
      } else {
        col = Math.floor(Math.random() * (ruleset.cols - 1));
        col = (col + this._prevGarbageCol + 1) % ruleset.cols;
      }
      this._prevGarbageCol = col;
      var line = '';
      for (var i = 0; i < ruleset.cols; i++) {
        line += i === col ? '_' : 'X';
      }
      for (var _i2 = 0; _i2 < height; _i2++) {
        this.matrix.unshift(line);
      }
      this._computeGhost();
    }
  }]);
  return CheeseRaceStacker;
}(RandomBagStacker);
module.exports = {
  Stacker: Stacker,
  RandomBagStacker: RandomBagStacker,
  CheeseRaceStacker: CheeseRaceStacker,
  minos: minos
};

},{"./ruleset":1}],3:[function(require,module,exports){
module.exports={
    "bg": "#000000",
    "grid": ["#101010", "#202020", "#404040"],
    "garbage": "#FF270F",
    "mino": {
        "Z": "#d70f37",
        "L": "#e35b02",
        "O": "#e39f02",
        "S": "#59b101",
        "I": "#0f9bd7",
        "J": "#2141c6",
        "T": "#af298a",
        "X": "#999999"
    }
}

},{}],4:[function(require,module,exports){
"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var stacker = require('./stacker');
var rules = require('./ruleset');
var theme = require('./theme');
var CELL = 30;
var View = /*#__PURE__*/function () {
  function View(stacker, drawing) {
    _classCallCheck(this, View);
    function context(x) {
      return {
        canvas: drawing[x],
        ctx: drawing[x].getContext('2d')
      };
    }
    Object.assign(this, {
      stacker: stacker,
      container: drawing.container,
      garbage: context('garbage'),
      matrix: context('matrix'),
      previews: context('previews'),
      hold: context('hold')
    });
  }
  _createClass(View, [{
    key: "resize",
    value: function resize() {
      this.matrix.canvas.width = CELL * rules.cols;
      this.matrix.canvas.height = CELL * rules.rows;
      this.garbage.canvas.width = CELL / 3;
      this.garbage.canvas.height = CELL * rules.rows;
      this.previews.canvas.width = CELL * 4;
      this.previews.canvas.height = CELL * 3 * 5;
      this.hold.canvas.width = CELL * 4;
      this.hold.canvas.height = CELL * 3;
    }
  }, {
    key: "_clear",
    value: function _clear(_ref) {
      var canvas = _ref.canvas,
        ctx = _ref.ctx;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.container.style.backgroundColor = theme.bg;
    }
  }, {
    key: "_drawGrid",
    value: function _drawGrid() {
      var ctx = this.matrix.ctx;

      // horizontal and vertical grid lines
      ctx.beginPath();
      for (var i = 1; i < rules.rows; i++) {
        ctx.moveTo(0, i * CELL + .5);
        ctx.lineTo(rules.cols * CELL, i * CELL + .5);
      }
      for (var _i = 1; _i < rules.cols; _i++) {
        ctx.moveTo(_i * CELL + .5, 0);
        ctx.lineTo(_i * CELL + .5, rules.rows * CELL);
      }
      ctx.strokeStyle = theme.grid[0];
      ctx.stroke();

      // crosses on grid intersections
      ctx.beginPath();
      var d = Math.floor(CELL * 0.3);
      for (var _i2 = 1; _i2 < rules.rows; _i2++) {
        var y = _i2 * CELL + .5;
        for (var j = 1; j < rules.cols; j++) {
          var x = j * CELL + .5;
          ctx.moveTo(x - d, y);
          ctx.lineTo(x + d, y);
          ctx.moveTo(x, y - d);
          ctx.lineTo(x, y + d);
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
  }, {
    key: "_drawGarbage",
    value: function _drawGarbage() {
      var ctx = this.garbage.ctx;
      var garbage = this.stacker.garbage;
      for (var i = 0; i < garbage; i++) {
        var y = (rules.rows - i - 1) * CELL;
        ctx.fillStyle = theme.garbage;
        ctx.fillRect(0, y, 10, CELL);
      }
    }
  }, {
    key: "_drawMatrixCells",
    value: function _drawMatrixCells() {
      var ctx = this.matrix.ctx;
      var matrix = this.stacker.matrix;
      for (var i = 0; i < matrix.length; i++) {
        var y = (rules.rows - i - 1) * CELL;
        for (var j = 0; j < rules.cols; j++) {
          var x = j * CELL;
          var c = matrix[i][j];
          if (c == '_') {
            continue;
          }
          ctx.fillStyle = theme.mino[c];
          ctx.fillRect(x, y, CELL, CELL);
        }
      }
    }
  }, {
    key: "_drawPiece",
    value: function _drawPiece() {
      var ctx = this.matrix.ctx;
      var piece = this.stacker.piece;
      if (piece === null) {
        return;
      }
      var coords = stacker.minos(piece).map(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
          dx = _ref3[0],
          dy = _ref3[1];
        return [piece.x + dx, piece.y + dy, piece.ghostY + dy];
      });

      // ghost
      ctx.beginPath();
      var _iterator = _createForOfIteratorHelper(coords),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 3),
            x = _step$value[0],
            _y = _step$value[1],
            gY = _step$value[2];
          var sx = x * CELL;
          var sy = (rules.rows - gY - 1) * CELL;
          ctx.rect(sx, sy, CELL, CELL);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      ctx.globalAlpha = 0.4;
      ctx.fillStyle = theme.mino[piece.type];
      ctx.fill();

      // piece
      ctx.beginPath();
      var _iterator2 = _createForOfIteratorHelper(coords),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _step2$value = _slicedToArray(_step2.value, 3),
            _x = _step2$value[0],
            y = _step2$value[1],
            _gY = _step2$value[2];
          var _sx = _x * CELL;
          var _sy = (rules.rows - y - 1) * CELL;
          ctx.rect(_sx, _sy, CELL, CELL);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle = theme.mino[piece.type];
      ctx.fill();
    }
  }, {
    key: "_drawQueue",
    value: function _drawQueue(ctx, queue) {
      for (var i = 0; i < queue.length; i++) {
        var type = queue[i];
        var coords = rules.shapes[type].coords;

        // apply offset to minos to draw them roughly centered
        var ox = void 0,
          oy = void 0;
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

        // draw minos
        ctx.beginPath();
        var _iterator3 = _createForOfIteratorHelper(coords),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var _step3$value = _slicedToArray(_step3.value, 2),
              x = _step3$value[0],
              y = _step3$value[1];
            var sx = (ox + x) * CELL;
            var sy = (i * 3 + oy - y) * CELL;
            ctx.rect(sx, sy, CELL, CELL);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
        ctx.fillStyle = theme.mino[type];
        ctx.fill();
      }
    }
  }, {
    key: "_drawHold",
    value: function _drawHold() {
      this._drawQueue(this.hold.ctx, this.stacker.hold);
    }
  }, {
    key: "_drawPreviews",
    value: function _drawPreviews() {
      this._drawQueue(this.previews.ctx, this.stacker.queue);
    }
  }, {
    key: "draw",
    value: function draw() {
      this._clear(this.matrix);
      this._drawGrid();
      this._drawMatrixCells();
      this._drawPiece();
      this._clear(this.garbage);
      this._drawGarbage();
      this._clear(this.hold);
      this._drawHold();
      this._clear(this.previews);
      this._drawPreviews();
    }
  }]);
  return View;
}();
module.exports = {
  View: View
};

},{"./ruleset":1,"./stacker":2,"./theme":3}],5:[function(require,module,exports){
"use strict";

var _require = require('./stacker'),
  CheeseRaceStacker = _require.CheeseRaceStacker;
var _require2 = require('./view'),
  View = _require2.View;
var stacker = new CheeseRaceStacker();
stacker.spawn();
var a = new Worker("/build.emscripten/misaImport.js");
a.onmessage = function (m) {
  console.log(m.data);
};
var drawing = {
  container: document.body,
  matrix: document.getElementById('matrix'),
  garbage: document.getElementById('garbage'),
  hold: document.getElementById('hold'),
  previews: document.getElementById('previews')
};
var view = new View(stacker, drawing);
view.resize();
view.draw();
var inputs = [];
function animate() {
  if (inputs === null) {
    return;
  }
  if (inputs.length === 0) {
    inputs = null;
    // send tbp request to bot
    // do pathfinding to fill inputs
    return;
  }
  stacker.apply(inputs.shift());
  view.draw();
}
setInterval(animate, 100);

},{"./stacker":2,"./view":4}]},{},[5]);
