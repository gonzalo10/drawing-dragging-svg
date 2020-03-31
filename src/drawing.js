import './libs/svg.draw';
import makeDraggable from './dragging';
const RECT = 'rect';
const ARROW = 'arrow';
const FREE_DRAW = 'free_draw';
const CIRCLE = 'circle';

let draw;
let defs;
const shapes = [];
let index = 0;
let shape;
let selctedShape = null;
let prevShapeButton = null;

let color;

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
			color = e.target.value;
			const dropdown = document.getElementById('color_picker_dropdown');
			dropdown.style.display = 'none';
			const colorBubble = document.getElementById('color_picker_bubble');
			colorBubble.style.backgroundColor = e.target.value;
		};
	}
};

export default function drawing() {
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
	shape = selctedShape;
	if (!shape) return null;
	if (!color) color = 'black';
	const option = {
		stroke: color,
		'stroke-width': 4,
		'fill-opacity': 0
	};

	switch (shape) {
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
	if (shape === 'free_draw') {
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
};

const handleMouseMove = event => {
	if (!selctedShape) return null;
	if (shape === 'free_draw' && shapes[index]) {
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
