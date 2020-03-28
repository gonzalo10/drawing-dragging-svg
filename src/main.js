const enablePaintingButton = document.querySelector('#enablePainting');
const drawing = document.getElementById('drawing');
console.log(drawing);
const draw = SVG('drawing');
const defs = draw.defs();
draw.node.setAttribute('onload', 'makeDraggable(evt)');
const shapes = [];
let index = 0;
let shape;
let paintedElement;
let paintingenabled = false;

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
