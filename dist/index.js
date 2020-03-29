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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/draggable.js
let selectedElementId;
var selectedElement, offset;
function makeDraggable(evt) {
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

// CONCATENATED MODULE: ./src/main.js

function main() {
	const enablePaintingButton = document.querySelector('#enablePainting');
	console.log(SVG);
	const draw = SVG('drawing');
	const defs = draw.defs();
	draw.node.setAttribute('onload', evt => makeDraggable(evt));
	const shapes = [];
	let index = 0;
	let shape;
	let paintedElement;
	let paintingenabled = false;

	const getArrowHead = defs => {
		var marker = document.createElementNS(
			'http://www.w3.org/2000/svg',
			'marker'
		);
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

	getArrowHead(defs);

	enablePaintingButton.onclick = () => {
		console.log('enablePaintingButton');
		let activeColor = 'blue';
		let buttonColor = 'white';
		paintingenabled = !paintingenabled;
		if (paintingenabled) {
			buttonColor = activeColor;
		}
		enablePaintingButton.style.backgroundColor = buttonColor;
	};

	const getDrawObject = () => {
		shape = document.getElementById('shape').value;
		const color = document.getElementById('colorPanelValue').value;
		const option = {
			stroke: color,
			'stroke-width': 2,
			'fill-opacity': 0
		};

		switch (shape) {
			case 'mouse paint':
				return draw.polyline().attr(option);
			case 'ellipse':
				return draw.ellipse().attr(option);
			case 'rect':
				return draw.rect().attr(option);
			case 'line':
				return draw.line().attr(option);
			case 'dark_square':
				return draw.rect().attr(option);
		}
		return null;
	};

	draw.on('mousedown', event => {
		if (!paintingenabled) return null;
		const shape = getDrawObject();
		shape.node.setAttribute('class', 'draggable');
		shapes[index] = shape;
		shape.draw(event);
	});
	draw.on('mousemove', event => {
		if (!paintingenabled) return null;
		if (shape === 'mouse paint' && shapes[index]) {
			shapes[index].draw('point', event);
		}
	});
	draw.on('mouseup', event => {
		if (!paintingenabled) return null;
		if (shape === 'mouse paint') {
			shapes[index].draw('stop', event);
		} else if (shape === 'line') {
			shapes[index].node.setAttribute('marker-end', 'url(#arrow)');
			shapes[index].draw(event);
		} else if (shape === 'dark_square') {
			const color = shapes[index].node.getAttribute('stroke');
			shapes[index].node.setAttribute('fill', color);
			shapes[index].node.removeAttribute('fill-opacity');
			shapes[index].draw(event);
		} else {
			shapes[index].draw(event);
		}
		index++;
	});
}

// EXTERNAL MODULE: ./src/svg.draw.js
var svg_draw = __webpack_require__(0);

// CONCATENATED MODULE: ./src/styles.js
const drawingStyles = {
	border: '1px solid #ccc',
	position: 'absolute',
	width: '100%',
	height: '100%',
	background: 'transparent'
};

const shapeOptions = {
	'mouse paint': 'Mouse paint',
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
	const ButtonText = document.createTextNode(text);
	Button.appendChild(ButtonText);
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

const createHTMLElement = {
	button: createButton,
	dropdown: createDropdown,
	input: createInput,
	div: createDiv
};

// CONCATENATED MODULE: ./src/index.js




let selectedColor = 'rgb(90, 233, 142)';

function createPanel() {
	var body = document.getElementsByTagName('BODY')[0];
	const controlPanel = createHTMLElement.div('controlPanel', controlPanelStyle);
	const button = createHTMLElement.button('Paint', 'enablePainting');
	const comment = createHTMLElement.button('Comment', 'btn-comment');
	const deleteButton = createHTMLElement.button('Delete', 'btn-delete');
	const shape = createHTMLElement.dropdown('shape', shapeOptions);
	const colorPicker = createColorPicker();
	controlPanel.appendChild(button);
	controlPanel.appendChild(shape);
	controlPanel.appendChild(comment);
	controlPanel.appendChild(deleteButton);
	controlPanel.appendChild(colorPicker);
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
	main();
}

init();


/***/ })
/******/ ]);