export const applyStyles = (styles, element) => {
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

export const addTrashIcon = () => {
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

export const addCommentIcon = () => {
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

export const addSquareIcon = () => {
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
export const addCircleIcon = () => {
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

export const createHTMLElement = {
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
