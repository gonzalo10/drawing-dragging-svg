import './libs/svg.draw';
import makeDraggable from './dragging';
let draw;
let defs;
let enablePaintingButton;
const shapes = [];
let index = 0;
let shape;
let paintingenabled = false;
export default function drawing() {
	enablePaintingButton = document.querySelector('#enablePainting');
	draw = SVG('drawing');
	defs = draw.defs();
	draw.node.onload = function(evt) {
		makeDraggable(evt);
	};
	getArrowHead(defs);
	enablePaintingButton.onclick = () =>
		hanldePaintingButtonClick(enablePaintingButton);
	draw.on('mousedown', event => handleMouseDown(event));
	draw.on('mousemove', event => handleMouseMove(event));
	draw.on('mouseup', event => handleMouseUp(event));
}

const hanldePaintingButtonClick = () => {
	let activeColor = 'blue';
	let buttonColor = 'white';
	paintingenabled = !paintingenabled;
	if (paintingenabled) {
		buttonColor = activeColor;
	}
	enablePaintingButton.style.backgroundColor = buttonColor;
};

const getDrawObject = () => {
	// shape = document.getElementById('shape').value;
	if (!shape) shape = 'free_draw';
	let color;
	// const color = document.getElementById('colorPanelValue').value;
	if (!color) color = 'black';
	const option = {
		stroke: color,
		'stroke-width': 2,
		'fill-opacity': 0
	};

	switch (shape) {
		case 'free_draw':
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

const handleMouseUp = event => {
	if (!paintingenabled) return null;
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
	if (!paintingenabled) return null;
	if (shape === 'free_draw' && shapes[index]) {
		shapes[index].draw('point', event);
	}
};

const handleMouseDown = event => {
	if (!paintingenabled) return null;
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
