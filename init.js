const drawingStyles = {
	border: '1px solid #ccc',
	position: 'absolute',
	width: '100%',
	height: '100%'
};
const static = {
	cursor: 'not-allowed'
};
const draggable = {
	cursor: 'move'
};

feedbackButtonStyles = {
	display: 'none'
};

const applyStyles = (styles, element) => {
	console.log(element);
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
	ButtonText = document.createTextNode(text);
	Button.appendChild(ButtonText);
	return Button;
}
function createDiv(id, style) {
	var newDiv = document.createElement('div');
	if (id) {
		newDiv.setAttribute('id', id);
	}
	applyStyles(style, newDiv);
	return newDiv;
}

const shapeOptions = {
	'mouse paint': 'Mouse paint',
	rect: 'Rectangle',
	ellipse: 'Circle'
};
const colorOptions = {
	'#ff0099': 'Pink',
	'#f3f313': 'Yellow',
	'#0dd5fc': 'Blue',
	'#83f52c': 'Green'
};

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

function createPanel() {
	var body = document.getElementsByTagName('BODY')[0];
	const button = createButton('Paint', 'enablePainting');
	const div = createDiv('drawing', drawingStyles);
	const shape = createDropdown('shape', shapeOptions);
	const color = createDropdown('color', colorOptions);
	body.appendChild(button);
	body.appendChild(div);
	body.appendChild(shape);
	body.appendChild(color);
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

function init() {
	createPanel();
	applyGlobalStyles();
}

init();
