/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

(function() {
	function a(a, b, c) {
		(this.el = a), a.remember('_paintHandler', this);
		var d = this,
			e = this.getPlugin();
		(this.parent = a.parent(SVG.Nested) || a.parent(SVG.Doc)),
			(this.p = this.parent.node.createSVGPoint()),
			(this.m = null),
			(this.startPoint = null),
			(this.lastUpdateCall = null),
			(this.options = {});
		for (var f in this.el.draw.defaults)
			(this.options[f] = this.el.draw.defaults[f]),
				'undefined' != typeof c[f] && (this.options[f] = c[f]);
		e.point && ((e.pointPlugin = e.point), delete e.point);
		for (var f in e) this[f] = e[f];
		b ||
			this.parent.on('click.draw', function(a) {
				d.start(a);
			});
	}
	(a.prototype.transformPoint = function(a, b) {
		return (
			(this.p.x = a - (this.offset.x - window.pageXOffset)),
			(this.p.y = b - (this.offset.y - window.pageYOffset)),
			this.p.matrixTransform(this.m)
		);
	}),
		(a.prototype.start = function(a) {
			var b = this;
			(this.m = this.el.node.getScreenCTM().inverse()),
				(this.offset = { x: window.pageXOffset, y: window.pageYOffset }),
				(this.options.snapToGrid *= Math.sqrt(
					this.m.a * this.m.a + this.m.b * this.m.b
				)),
				(this.startPoint = this.snapToGrid(
					this.transformPoint(a.clientX, a.clientY)
				)),
				this.init && this.init(a),
				this.el.fire('drawstart', { event: a, p: this.p, m: this.m }),
				SVG.on(window, 'mousemove.draw', function(a) {
					b.update(a);
				}),
				(this.start = this.point);
		}),
		(a.prototype.point = function(a) {
			return this.point != this.start
				? this.start(a)
				: this.pointPlugin
				? this.pointPlugin(a)
				: void this.stop(a);
		}),
		(a.prototype.stop = function(a) {
			a && this.update(a),
				this.clean && this.clean(),
				SVG.off(window, 'mousemove.draw'),
				this.parent.off('click.draw'),
				this.el.forget('_paintHandler'),
				(this.el.draw = function() {}),
				this.el.fire('drawstop');
		}),
		(a.prototype.update = function(a) {
			!a && this.lastUpdateCall && (a = this.lastUpdateCall),
				(this.lastUpdateCall = a),
				this.calc(a),
				this.el.fire('drawupdate', { event: a, p: this.p, m: this.m });
		}),
		(a.prototype.done = function() {
			this.calc(), this.stop(), this.el.fire('drawdone');
		}),
		(a.prototype.cancel = function() {
			this.stop(), this.el.remove(), this.el.fire('drawcancel');
		}),
		(a.prototype.snapToGrid = function(a) {
			var b = null;
			if (a.length)
				return (
					(b = [
						a[0] % this.options.snapToGrid,
						a[1] % this.options.snapToGrid
					]),
					(a[0] -=
						b[0] < this.options.snapToGrid / 2
							? b[0]
							: b[0] - this.options.snapToGrid),
					(a[1] -=
						b[1] < this.options.snapToGrid / 2
							? b[1]
							: b[1] - this.options.snapToGrid),
					a
				);
			for (var c in a)
				(b = a[c] % this.options.snapToGrid),
					(a[c] -=
						(b < this.options.snapToGrid / 2
							? b
							: b - this.options.snapToGrid) +
						(0 > b ? this.options.snapToGrid : 0));
			return a;
		}),
		(a.prototype.param = function(a, b) {
			(this.options[a] = null === b ? this.el.draw.defaults[a] : b),
				this.update();
		}),
		(a.prototype.getPlugin = function() {
			return this.el.draw.plugins[this.el.type];
		}),
		SVG.extend(SVG.Element, {
			draw: function(b, c, d) {
				b instanceof Event || 'string' == typeof b || ((c = b), (b = null));
				var e = this.remember('_paintHandler') || new a(this, b, c || {});
				return b instanceof Event && e.start(b), e[b] && e[b](c, d), this;
			}
		}),
		(SVG.Element.prototype.draw.defaults = { snapToGrid: 1 }),
		(SVG.Element.prototype.draw.extend = function(a, b) {
			var c = {};
			'string' == typeof a ? (c[a] = b) : (c = a);
			for (var d in c) {
				var e = d.trim().split(/\s+/);
				for (var f in e) SVG.Element.prototype.draw.plugins[e[f]] = c[d];
			}
		}),
		(SVG.Element.prototype.draw.plugins = {}),
		SVG.Element.prototype.draw.extend('rect image', {
			init: function(a) {
				var b = this.startPoint;
				this.el.attr({ x: b.x, y: b.y, height: 0, width: 0 });
			},
			calc: function(a) {
				var b = { x: this.startPoint.x, y: this.startPoint.y },
					c = this.transformPoint(a.clientX, a.clientY);
				(b.width = c.x - b.x),
					(b.height = c.y - b.y),
					this.snapToGrid(b),
					b.width < 0 && ((b.x = b.x + b.width), (b.width = -b.width)),
					b.height < 0 && ((b.y = b.y + b.height), (b.height = -b.height)),
					this.el.attr(b);
			}
		}),
		SVG.Element.prototype.draw.extend('line polyline polygon', {
			init: function(a) {
				this.set = new SVG.Set();
				var b = this.startPoint,
					c = [
						[b.x, b.y],
						[b.x, b.y]
					];
				this.el.plot(c), this.drawCircles();
			},
			calc: function(a) {
				var b = this.el.array().valueOf();
				if ((b.pop(), a)) {
					var c = this.transformPoint(a.clientX, a.clientY);
					b.push(this.snapToGrid([c.x, c.y]));
				}
				this.el.plot(b);
			},
			point: function(a) {
				if (this.el.type.indexOf('poly') > -1) {
					var b = this.transformPoint(a.clientX, a.clientY),
						c = this.el.array().valueOf();
					return (
						c.push(this.snapToGrid([b.x, b.y])),
						this.el.plot(c),
						this.drawCircles(),
						void this.el.fire('drawpoint', {
							event: a,
							p: { x: b.x, y: b.y },
							m: this.m
						})
					);
				}
				this.stop(a);
			},
			clean: function() {
				this.set.each(function() {
					this.remove();
				}),
					this.set.clear(),
					delete this.set;
			},
			drawCircles: function() {
				var a = this.el.array().valueOf();
				this.set.each(function() {
					this.remove();
				}),
					this.set.clear();
				for (var b = 0; b < a.length; ++b) {
					(this.p.x = a[b][0]), (this.p.y = a[b][1]);
					var c = this.p.matrixTransform(
						this.parent.node
							.getScreenCTM()
							.inverse()
							.multiply(this.el.node.getScreenCTM())
					);
					this.set.add(
						this.parent
							.circle(5)
							.stroke({ width: 1 })
							.fill('#ccc')
							.center(c.x, c.y)
					);
				}
			}
		}),
		SVG.Element.prototype.draw.extend('circle', {
			init: function(a) {
				var b = this.startPoint;
				this.el.attr({ cx: b.x, cy: b.y, r: 1 });
			},
			calc: function(a) {
				var b = this.transformPoint(a.clientX, a.clientY),
					c = {
						cx: this.startPoint.x,
						cy: this.startPoint.y,
						r: Math.sqrt(
							(b.x - this.startPoint.x) * (b.x - this.startPoint.x) +
								(b.y - this.startPoint.y) * (b.y - this.startPoint.y)
						)
					};
				this.snapToGrid(c), this.el.attr(c);
			}
		}),
		SVG.Element.prototype.draw.extend('ellipse', {
			init: function(a) {
				var b = this.startPoint;
				this.el.attr({ cx: b.x, cy: b.y, rx: 1, ry: 1 });
			},
			calc: function(a) {
				var b = this.transformPoint(a.clientX, a.clientY),
					c = {
						cx: this.startPoint.x,
						cy: this.startPoint.y,
						rx: Math.abs(b.x - this.startPoint.x),
						ry: Math.abs(b.y - this.startPoint.y)
					};
				this.snapToGrid(c), this.el.attr(c);
			}
		});
}.call(this));

// This is custom extension of line, polyline, polygon which doesn't draw the circle on the line.
SVG.Element.prototype.draw.extend('line polyline polygon', {
	init: function(e) {
		this.set = new SVG.Set();

		var p = this.startPoint,
			arr = [
				[p.x, p.y],
				[p.x, p.y]
			];

		this.el.plot(arr);
	},

	// The calc-function sets the position of the last point to the mouse-position (with offset ofc)
	calc: function(e) {
		var arr = this.el.array().valueOf();
		arr.pop();

		if (e) {
			var p = this.transformPoint(e.clientX, e.clientY);
			arr.push(this.snapToGrid([p.x, p.y]));
		}

		this.el.plot(arr);
	},

	point: function(e) {
		if (this.el.type.indexOf('poly') > -1) {
			// Add the new Point to the point-array
			var p = this.transformPoint(e.clientX, e.clientY),
				arr = this.el.array().valueOf();

			arr.push(this.snapToGrid([p.x, p.y]));

			this.el.plot(arr);

			// Fire the `drawpoint`-event, which holds the coords of the new Point
			this.el.fire('drawpoint', {
				event: e,
				p: { x: p.x, y: p.y },
				m: this.m
			});

			return;
		}

		// We are done, if the element is no polyline or polygon
		this.stop(e);
	},

	clean: function() {
		// Remove all circles
		this.set.each(function() {
			this.remove();
		});

		this.set.clear();

		delete this.set;
	}
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// Module
var code = "<style>.annotate-heading{background-color:#3023ae;border-bottom-right-radius:4px;border-bottom-left-radius:4px;-webkit-box-shadow:inset 0 -1px 0 rgba(255,84,0,.12);box-shadow:inset 0 -1px 0 rgba(255,84,0,.12);cursor:default;color:#fff;display:-webkit-box;display:-ms-flexbox;display:flex;font-weight:600;padding:8px;position:absolute;left:50%;top:0;-webkit-transform:translateX(-50%);-ms-transform:translateX(-50%);transform:translateX(-50%);white-space:nowrap;z-index:1}.button_cancel{background-color:#c80428;color:#fff;width:45px;margin:0;padding:0;border:1px solid transparent;border-radius:5px}.button_confirm{background-color:#00ad37;color:#fff;width:45px;margin:0;padding:0;border:1px solid transparent;border-radius:5px}.toolbar{display:inline-flex;margin-left:10px;margin-right:10px;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:10;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.toolbar_item{position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;padding:0 5px}.toolbar_button{border:2px solid transparent;color:#ddd;cursor:pointer;display:inline-block;font-size:22px;background:0 0;border-radius:5px;height:40px;outline:0;padding:3px;-webkit-transition:all .15s;-o-transition:all .15s;transition:all .15s;vertical-align:top;width:40px}.toolbar_button:hover{border:2px solid #fff}.toolbar_button>.color_picker_item_current_color{position:absolute;bottom:6px;right:10px;width:9px;height:9px;border-radius:50%}.toolbar_button_content{display:flex;justify-content:center}.svg_icon{fill:#fff}.rotate_45{transform:rotate(-45deg)}.dropdown_color_picker{box-shadow:0 0 3px rgba(10,10,10,.2);position:absolute;width:260px;top:55px;left:calc(50% - 130px);display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;background-color:#fff;border-radius:5px;border:1px solid #ccc;z-index:2;overflow:hidden;max-height:80vh;overflow-y:auto}.color_picker_item{position:relative;display:inline-block;cursor:pointer;width:50px;height:50px;display:flex;align-items:center;justify-content:center}.color_picker_item>span{display:block;width:30px;height:30px;background-color:#fff;border-radius:20%}.color_picker_item input{position:absolute;opacity:0;top:0;left:0;width:0;height:0}</style> <div class=annotate-heading> <button class=\"button button_cancel\"> <div title=\"Delete screenshot\" name=ios-close-icon> <svg width=25 height=25 viewBox=\"0 0 512 512\" class=svg_icon> <path d=\"M133.1 128l23.6 290.7c0 16.2 13.1 29.3 29.3 29.3h141c16.2 0 29.3-13.1 29.3-29.3L379.6 128M194.7 393L188 160h18.5l6.9 233h-18.7zm70.3 0h-18V160h18v233zm52.3 0h-18.6l6.8-233H324l-6.7 233zM364 92h-36l-26.3-23c-3.7-3.2-8.4-5-13.2-5h-64.8c-4.9 0-9.7 1.8-13.4 5L184 92h-36c-17.6 0-30 8.4-30 26h276c0-17.6-12.4-26-30-26z\"></path> </svg> </div> </button> <nav class=toolbar> <div class=toolbar_item> <button type=button title=Undo disabled=disabled class=toolbar_button> <div title=Undo class=toolbar_button_content> <svg width=22 height=22 viewBox=\"0 0 512 512\" class=svg_icon> <path d=\"M479.9 394.9c0-19.6 4.2-97.1-56.8-158.7-40.4-40.7-91.9-61.7-163.4-65.5-2.1-.1-3.8-1.9-3.8-4V84c0-3.2-3.5-5.1-6.2-3.4L33.8 222.8c-2.4 1.6-2.4 5.1 0 6.7l215.9 142.2c2.7 1.8 6.2-.1 6.2-3.4v-81.6c0-2.3 1.9-4.1 4.2-4 44.1 1.7 69.5 10.9 97.1 23.2 36.1 16.2 72.9 50.9 94.5 83.5 13.1 19.9 19.2 33.9 21.4 39.7.7 1.7 2.3 2.8 4.1 2.8h2.9c-.1-11.7-.2-26.7-.2-37z\"></path> </svg> </div> <span class=toolbar__button__counter style=display:none>0</span> </button> </div> <div class=toolbar_item> <button id=free_draw_button type=button title=Pencil class=\"toolbar_button is-active\"> <div title=Pencil class=toolbar_button_content> <svg viewBox=\"0 0 512 512\" width=22 height=22 class=svg_icon> <path d=\"M64 368v80h80l235.727-235.729-79.999-79.998L64 368zm377.602-217.602c8.531-8.531 8.531-21.334 0-29.865l-50.135-50.135c-8.531-8.531-21.334-8.531-29.865 0l-39.468 39.469 79.999 79.998 39.469-39.467z\"></path> </svg> </div> </button> </div> <div class=toolbar_item> <button id=arrow_draw_button type=button title=Arrow class=toolbar_button> <div title=Arrow class=\"toolbar_button_content rotate_45\"> <svg viewBox=\"0 0 512 512\" width=26 height=26 class=svg_icon> <path d=\"M85 277.375h259.704L225.002 397.077 256 427l171-171L256 85l-29.922 29.924 118.626 119.701H85v42.75z\"></path> </svg> </div> </button> </div> <div class=toolbar_item> <button id=rec_draw_button type=button title=Rectangle class=toolbar_button> <div class=toolbar_button_content title=Rectangle> <svg width=22 height=22 viewBox=\"0 0 512 512\" class=svg_icon> <path d=\"M405.3 106.7v298.7H106.7V106.7h298.6m0-42.7H106.7C83.2 64 64 83.2 64 106.7v298.7c0 23.5 19.2 42.7 42.7 42.7h298.7c23.5 0 42.7-19.2 42.7-42.7V106.7C448 83.2 428.8 64 405.3 64z\"></path> </svg> </div> </button> </div> <div class=toolbar_item> <button id=color_picker_button type=button title=\"Color picker\" class=toolbar_button> <div class=toolbar_button_content title=\"Color picker\"> <svg viewBox=\"0 0 512 512\" width=22 height=22 class=svg_icon> <path d=\"M256 64C150.401 64 64 150.401 64 256c0 105.604 86.401 192 192 192 18.136 0 32-13.864 32-32 0-8.531-3.198-16-8.531-21.333-5.333-5.334-8.531-12.803-8.531-21.334 0-18.135 13.864-32 32-32h38.396c58.667 0 106.667-48 106.667-106.666C448 140.802 361.604 64 256 64zM138.667 256c-18.136 0-32-13.864-32-32s13.864-32 32-32c18.135 0 32 13.864 32 32s-13.865 32-32 32zm64-85.333c-18.136 0-32-13.865-32-32 0-18.136 13.864-32 32-32 18.135 0 32 13.864 32 32 0 18.135-13.865 32-32 32zm106.666 0c-18.135 0-32-13.865-32-32 0-18.136 13.865-32 32-32 18.136 0 32 13.864 32 32 0 18.135-13.864 32-32 32zm64 85.333c-18.135 0-32-13.864-32-32s13.865-32 32-32c18.136 0 32 13.864 32 32s-13.864 32-32 32z\"></path> </svg> </div> <span id=color_picker_bubble class=color_picker_item_current_color style=background-color:#f70000></span> </button> <div id=color_picker_dropdown class=dropdown_color_picker style=display:none> <label class=color_picker_item><span style=background-color:#5ae98e><input type=radio name=color value=#5AE98E /></span></label><label class=color_picker_item><span style=background-color:#f70000><input type=radio name=color value=#f70000 /></span></label><label class=color_picker_item><span style=background-color:#f7e000><input type=radio name=color value=#f7e000 /></span></label><label class=color_picker_item><span style=background-color:#39c9ff><input type=radio name=color value=#39C9FF /></span></label><label class=color_picker_item><span style=background-color:#172330><input type=radio name=color value=#172330 /></span></label> </div> </div> </nav> <button class=button_confirm> <div title=Listo name=ios-checkmark-icon class=\"\"> <svg width=40 height=40 viewBox=\"0 0 512 512\" class=svg_icon> <path d=\"M362.6 192.9L345 174.8c-.7-.8-1.8-1.2-2.8-1.2-1.1 0-2.1.4-2.8 1.2l-122 122.9-44.4-44.4c-.8-.8-1.8-1.2-2.8-1.2-1 0-2 .4-2.8 1.2l-17.8 17.8c-1.6 1.6-1.6 4.1 0 5.7l56 56c3.6 3.6 8 5.7 11.7 5.7 5.3 0 9.9-3.9 11.6-5.5h.1l133.7-134.4c1.4-1.7 1.4-4.2-.1-5.7z\"></path> </svg> </div> </button> </div> ";
// Exports
module.exports = code;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/libs/svg.draw.js
var svg_draw = __webpack_require__(0);

// CONCATENATED MODULE: ./src/dragging.js
let selectedElementId;
let transform;
var selectedElement, offset;
function makeDraggable(evt) {
	if (!evt) return null;
	var svg = evt.target;
	svg.addEventListener('mousedown', startDrag);
	svg.addEventListener('mousemove', drag);
	svg.addEventListener('mouseup', endDrag);
	svg.addEventListener('mouseleave', endDrag);
	svg.addEventListener('dblclick', selectElement);
	function selectElement(evt) {
		if (evt.target.id === selectedElementId) {
			evt.target.removeAttribute('style');
			selectedElementId = null;
		} else {
			selectedElementId = evt.target.id;
			evt.target.style.outline = '1px solid blue';
		}
	}

	function drag(evt) {
		if (selectedElement) {
			evt.preventDefault();
			var coord = getMousePosition(evt);
			transform.setTranslate(coord.x - offset.x, coord.y - offset.y);
		}
	}
	function endDrag(evt) {
		if (!selectedElementId) {
			evt.target.removeAttribute('style');
		}
		selectedElement = null;
	}
	function startDrag(evt) {
		if (evt.target.classList.contains('draggable')) {
			let outlineStyle = '1px dashed lightgrey';
			if (selectedElementId) outlineStyle = '1px solid blue';
			evt.target.style.outline = outlineStyle;
			selectedElement = evt.target;
			offset = getMousePosition(evt);
			// Get all the transforms currently on this element
			var transforms = selectedElement.transform.baseVal;
			// Ensure the first transform is a translate transform
			if (
				transforms.length === 0 ||
				transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE
			) {
				// Create an transform that translates by (0, 0)
				var translate = svg.createSVGTransform();
				translate.setTranslate(0, 0);
				// Add the translation to the front of the transforms list
				selectedElement.transform.baseVal.insertItemBefore(translate, 0);
			}
			// Get initial translation amount
			transform = transforms.getItem(0);
			offset.x -= transform.matrix.e;
			offset.y -= transform.matrix.f;
		}
	}
	function getMousePosition(evt) {
		var CTM = svg.getScreenCTM();
		return {
			x: (evt.clientX - CTM.e) / CTM.a,
			y: (evt.clientY - CTM.f) / CTM.d
		};
	}
}

// CONCATENATED MODULE: ./src/drawing.js


const RECT = 'rect';
const ARROW = 'arrow';
const FREE_DRAW = 'free_draw';
const CIRCLE = 'circle';

let draw;
let defs;
const shapes = [];
let index = 0;
let drawing_shape;
let selctedShape = null;
let prevShapeButton = null;

let drawing_color;

let activeStyleStateButton = '2px solid white';
const handleSelectShape = (newShape, button) => {
	if (selctedShape === newShape) {
		button.style.border = '';
		selctedShape = null;
		prevShapeButton = button;
		return;
	}
	prevShapeButton.style.border = '';
	button.style.border = activeStyleStateButton;
	selctedShape = newShape;
	prevShapeButton = button;
	return;
};

const setInitialStateShape = initialButton => {
	selctedShape = FREE_DRAW;
	prevShapeButton = initialButton;
	initialButton.style.border = activeStyleStateButton;
};

const shapeEventListeners = () => {
	const free_drawButton = document.querySelector('#free_draw_button');
	const rect_drawButton = document.querySelector('#rec_draw_button');
	const arrow_drawButton = document.querySelector('#arrow_draw_button');
	const colorPickerButton = document.querySelector('#color_picker_button');
	setInitialStateShape(free_drawButton);

	rect_drawButton.onclick = () => {
		handleSelectShape(RECT, rect_drawButton);
	};
	free_drawButton.onclick = () => {
		handleSelectShape(FREE_DRAW, free_drawButton);
	};
	arrow_drawButton.onclick = () => {
		handleSelectShape(ARROW, arrow_drawButton);
	};
	colorPickerButton.onclick = () => {
		const dropdown = document.getElementById('color_picker_dropdown');
		const dropdownState = dropdown.style.display;
		if (dropdownState === 'none') {
			dropdown.style.display = '';
		} else {
			dropdown.style.display = 'none';
		}
	};
	const colorPickerItemSelected = document.getElementsByClassName(
		'color_picker_item'
	);
	for (var i = 0; i < colorPickerItemSelected.length; i++) {
		colorPickerItemSelected[i].onclick = e => {
			drawing_color = e.target.value;
			const dropdown = document.getElementById('color_picker_dropdown');
			dropdown.style.display = 'none';
			const colorBubble = document.getElementById('color_picker_bubble');
			colorBubble.style.backgroundColor = e.target.value;
		};
	}
};

function drawing() {
	shapeEventListeners();
	draw = SVG('drawing');
	defs = draw.defs();
	draw.node.onload = function(evt) {
		makeDraggable(evt);
	};
	getArrowHead(defs);

	draw.on('mousedown', event => handleMouseDown(event));
	draw.on('mousemove', event => handleMouseMove(event));
	draw.on('mouseup', event => handleMouseUp(event));
}

const getDrawObject = () => {
	drawing_shape = selctedShape;
	if (!drawing_shape) return null;
	if (!drawing_color) drawing_color = 'black';
	const option = {
		stroke: drawing_color,
		'stroke-width': 4,
		'fill-opacity': 0
	};

	switch (drawing_shape) {
		case 'free_draw':
			return draw.polyline().attr(option);
		case 'ellipse':
			return draw.ellipse().attr(option);
		case 'rect':
			return draw.rect().attr(option);
		case 'arrow':
			return draw.line().attr(option);
		case 'dark_square':
			return draw.rect().attr(option);
	}
	return null;
};

const handleMouseUp = event => {
	if (!selctedShape) return null;
	if (drawing_shape === 'free_draw') {
		shapes[index].draw('stop', event);
	} else if (drawing_shape === 'line') {
		shapes[index].node.setAttribute('marker-end', 'url(#arrow)');
		shapes[index].draw(event);
	} else if (drawing_shape === 'dark_square') {
		const color = shapes[index].node.getAttribute('stroke');
		shapes[index].node.setAttribute('fill', color);
		shapes[index].node.removeAttribute('fill-opacity');
		shapes[index].draw(event);
	} else {
		shapes[index].draw(event);
	}
	index++;
};

const handleMouseMove = event => {
	if (!selctedShape) return null;
	if (drawing_shape === 'free_draw' && shapes[index]) {
		shapes[index].draw('point', event);
	}
};

const handleMouseDown = event => {
	if (!selctedShape) return null;
	const shape = getDrawObject();
	shape.node.setAttribute('class', 'draggable');
	shapes[index] = shape;
	shape.draw(event);
};

const getArrowHead = defs => {
	var marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
	marker.setAttribute('id', 'arrow');
	marker.setAttribute('viewBox', '0 0 10 10');
	marker.setAttribute('refX', '5');
	marker.setAttribute('refY', '5');
	marker.setAttribute('markerUnits', 'strokeWidth');
	marker.setAttribute('markerWidth', '6');
	marker.setAttribute('markerHeight', '6');
	marker.setAttribute('orient', 'auto-start-reverse');
	marker.setAttribute('fill', 'blue');
	var path = document.createElementNS('http;//www.w3.org/2000/svg', 'path');
	path.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
	marker.appendChild(path);
	defs.node.appendChild(marker);
};

// CONCATENATED MODULE: ./src/styles.js
const drawingStyles = {
	border: '1px solid #ccc',
	position: 'absolute',
	width: '100%',
	height: '100%',
	background: 'transparent'
};

const IconButtonStyles = {
	border: '1px solid transparent',
	padding: '0',
	margin: '0',
	cursor: 'pointer'
};

const shapeOptions = {
	free_draw: 'Mouse paint',
	rect: 'Rectangle',
	ellipse: 'Circle',
	line: 'Line',
	dark_square: 'dark square'
};

const mainStyleDiv = {
	justifyContent: ' center',
	boxShadow: '0 0 3px rgba(10,10,10,.2)',
	// position: 'absolute',
	width: '260px',
	top: '55px',
	left: 'calc(50% - 130px)',
	display: 'flex',
	flexWrap: 'wrap',
	backgroundColor: '#fff',
	borderRadius: '5px',
	border: '1px solid #ccc',
	zIndex: '2',
	overflow: 'hidden',
	maxHeight: '80vh',
	overflowY: 'auto'
};

const lableStyle = {
	position: 'relative',
	cursor: 'pointer',
	width: '50px',
	height: '50px',
	display: 'flex',
	alignItems: 'center'
};

const spanStyle = color => ({
	backgroundColor: color,
	width: '40px',
	height: '40px',
	borderRadius: '30%'
});

const controlPanelStyle = {
	width: 'auto',
	justifyContent: 'center',
	display: 'flex',
	alignItems: 'center',
	position: 'absolute',
	left: '50%',
	transform: 'translate(-50%)'
};

// CONCATENATED MODULE: ./src/helpers.js
const applyStyles = (styles, element) => {
	Object.keys(styles).forEach(style => {
		element.style[style] = styles[style];
	});
};

function createButton(text, id, clickAction, styles) {
	var Button = document.createElement('button');
	if (clickAction) {
		Button.onclick = clickAction;
	}
	if (id) {
		Button.setAttribute('id', id);
	}
	if (styles) {
		applyStyles(styles, Button);
	}
	if (text) {
		const ButtonText = document.createTextNode(text);
		Button.appendChild(ButtonText);
	}
	return Button;
}
function createDropdown(id, options) {
	var newSelect = document.createElement('select');
	newSelect.setAttribute('id', id);
	Object.keys(options).forEach(optionKey => {
		var newOption = document.createElement('option');
		newOption.setAttribute('value', optionKey);
		newOption.innerText = options[optionKey];
		newSelect.appendChild(newOption);
	});
	return newSelect;
}

const createInput = (id, value, type, styles) => {
	var input = document.createElement('input');
	input.id = id;
	input.type = type;
	input.value = value;
	applyStyles(styles, input);
	return input;
};

function createDiv(id, style) {
	var newDiv = document.createElement('div');
	if (id) {
		newDiv.setAttribute('id', id);
	}
	if (style) {
		applyStyles(style, newDiv);
	}
	return newDiv;
}

const addTrashIcon = () => {
	const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svg.setAttribute('aria-hidden', 'true');
	svg.setAttribute('viewbox', '0 0 60 55');
	svg.setAttribute('width', '40');
	svg.setAttribute('height', '40');
	var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	path.setAttribute(
		'd',
		'M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306'
	);
	path.style.transform = 'scale(2)';
	svg.appendChild(path);
	return svg;
};

const addCommentIcon = () => {
	const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svg.setAttribute('aria-hidden', 'true');
	svg.setAttribute('viewbox', '0 0 60 55');
	svg.setAttribute('width', '40');
	svg.setAttribute('height', '40');
	var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	path.setAttribute(
		'd',
		'M17.211,3.39H2.788c-0.22,0-0.4,0.18-0.4,0.4v9.614c0,0.221,0.181,0.402,0.4,0.402h3.206v2.402c0,0.363,0.429,0.533,0.683,0.285l2.72-2.688h7.814c0.221,0,0.401-0.182,0.401-0.402V3.79C17.612,3.569,17.432,3.39,17.211,3.39M16.811,13.004H9.232c-0.106,0-0.206,0.043-0.282,0.117L6.795,15.25v-1.846c0-0.219-0.18-0.4-0.401-0.4H3.189V4.19h13.622V13.004z'
	);
	path.style.transform = 'scale(2)';
	svg.appendChild(path);
	return svg;
};

const addSquareIcon = () => {
	const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svg.setAttribute('width', '40');
	svg.setAttribute('height', '40');
	var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
	rect.setAttribute('width', '30');
	rect.setAttribute('height', '30');
	rect.setAttribute('x', '5');
	rect.setAttribute('y', '5');
	rect.setAttribute(
		'style',
		'fill:transparent;stroke-width:2;stroke:rgb(0,0,0)'
	);
	svg.appendChild(rect);
	return svg;
};
const addCircleIcon = () => {
	const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svg.setAttribute('width', '40');
	svg.setAttribute('height', '40');
	var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
	circle.setAttribute('cx', '20');
	circle.setAttribute('cy', '20');
	circle.setAttribute('r', '17');
	circle.setAttribute(
		'style',
		'fill:transparent;stroke-width:1;stroke:rgb(0,0,0)'
	);
	svg.appendChild(circle);
	return svg;
};

const addIconButton = (id, Icon, action, style) => {
	const button = createHTMLElement.button(null, id, null, style);
	button.appendChild(Icon);
	return button;
};

const createHTMLElement = {
	button: createButton,
	dropdown: createDropdown,
	input: createInput,
	div: createDiv,
	trashIcon: addTrashIcon,
	commentIcon: addCommentIcon,
	squareIcon: addSquareIcon,
	circleIcon: addCircleIcon,
	iconButton: addIconButton
};

// CONCATENATED MODULE: ./src/index.js



const htmlFile = __webpack_require__(1);
let selectedColor = 'rgb(90, 233, 142)';

function createPanel() {
	var body = document.getElementsByTagName('BODY')[0];
	const controlPanel = createHTMLElement.div('controlPanel', controlPanelStyle);
	const button = createHTMLElement.button('Paint', 'enablePainting');
	const comment = createHTMLElement.button('Comment', 'btn-comment');
	const deleteButton = createHTMLElement.button('Delete', 'btn-delete');
	const shape = createHTMLElement.dropdown('shape', shapeOptions);
	const trashIcon = createHTMLElement.trashIcon();
	const trashIconButton = createHTMLElement.iconButton(
		'circleId',
		trashIcon,
		null,
		IconButtonStyles
	);
	const commentIcon = createHTMLElement.commentIcon();
	const commentIconButton = createHTMLElement.iconButton(
		'circleId',
		commentIcon,
		null,
		IconButtonStyles
	);
	const squareIcon = createHTMLElement.squareIcon();
	const squareIconButton = createHTMLElement.iconButton(
		'circleId',
		squareIcon,
		null,
		IconButtonStyles
	);
	const circleIcon = createHTMLElement.circleIcon();
	const circleIconButton = createHTMLElement.iconButton(
		'circleId',
		circleIcon,
		null,
		IconButtonStyles
	);
	// const colorPicker = createColorPicker();
	// controlPanel.appendChild(button);
	// controlPanel.appendChild(shape);
	// controlPanel.appendChild(comment);
	// controlPanel.appendChild(deleteButton);
	// controlPanel.appendChild(colorPicker);
	// controlPanel.appendChild(trashIconButton);
	// controlPanel.appendChild(commentIconButton);
	// controlPanel.appendChild(squareIconButton);
	// controlPanel.appendChild(circleIconButton);
	controlPanel.innerHTML = htmlFile;
	body.appendChild(controlPanel);
}

function applyGlobalStyles() {
	const cssStyles = `
    .draggable {
        cursor: move;
    }
    `;
	var style = document.createElement('style');
	style.type = 'text/css';
	if (style.styleSheet) {
		style.styleSheet.cssText = cssStyles;
	} else {
		style.appendChild(document.createTextNode(cssStyles));
	}
	document.getElementsByTagName('head')[0].appendChild(style);
}

const createColorItem = color => {
	var label = document.createElement('label');
	applyStyles(lableStyle, label);
	var span = document.createElement('span');
	applyStyles(spanStyle(color), span);
	label.appendChild(span);
	label.id = color;
	label.addEventListener('click', function(e) {
		const pastColorSpan = document.getElementById(selectedColor).childNodes[0];
		pastColorSpan.style.border = '2px solid transparent';
		selectedColor = e.currentTarget.id;
		document.getElementById('colorPanelValue').value = selectedColor;
		e.target.style.border = '2px solid blue';
	});
	return label;
};

function createColorPicker() {
	const colorPickerPanel = createHTMLElement.div(
		'colorPickerPanel',
		mainStyleDiv
	);
	const colorItemGreen = createColorItem('rgb(90, 233, 142)');
	const colorItemYellow = createColorItem('rgb(247, 224, 0)');
	const colorItemRed = createColorItem('rgb(247, 0, 0)');
	const colorItemBlue = createColorItem('rgb(57, 201, 255)');
	const colorItemBlack = createColorItem('rgb(0, 0, 0)');
	const colorInput = createHTMLElement.input(
		'colorPanelValue',
		selectedColor,
		'text',
		{ display: 'none' }
	);
	colorPickerPanel.appendChild(colorItemGreen);
	colorPickerPanel.appendChild(colorItemBlue);
	colorPickerPanel.appendChild(colorItemRed);
	colorPickerPanel.appendChild(colorItemYellow);
	colorPickerPanel.appendChild(colorItemBlack);
	colorPickerPanel.appendChild(colorInput);
	return colorPickerPanel;
}

const createdrawingCanvas = () => {
	var body = document.getElementsByTagName('BODY')[0];
	const drawingCanvas = createHTMLElement.div('drawing', drawingStyles);
	body.appendChild(drawingCanvas);
};

function init() {
	createdrawingCanvas();
	createPanel();
	applyGlobalStyles();
	drawing();
}

init();


/***/ })
/******/ ]);