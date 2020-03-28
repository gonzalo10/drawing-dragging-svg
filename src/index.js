import main from './main';
import './svg.draw';

const drawingStyles = {
	border: '1px solid #ccc',
	position: 'absolute',
	width: '100%',
	height: '100%'
};

let selectedColor = 'rgb(90, 233, 142)';

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
	ellipse: 'Circle',
	line: 'Line',
	dark_square: 'dark square'
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
	const comment = createButton('Comment', 'btn-comment');
	const deleteButton = createButton('Delete', 'btn-delete');
	const div = createDiv('drawing', drawingStyles);
	const shape = createDropdown('shape', shapeOptions);
	// const color = createDropdown('color', colorOptions);
	createColorPicker();
	body.appendChild(button);
	body.appendChild(div);
	body.appendChild(shape);
	// body.appendChild(color);
	body.appendChild(comment);
	body.appendChild(deleteButton);
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
	main();
}

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

const createColorItem = color => {
	var label = document.createElement('label');
	applyStyles(lableStyle, label);
	var span = document.createElement('span');
	applyStyles(spanStyle(color), span);
	label.appendChild(span);
	label.id = color;
	label.addEventListener('click', function(e) {
		const pastColorSpan = document.getElementById(selectedColor).childNodes[0];
		console.log(pastColorSpan);
		pastColorSpan.style.border = '2px solid transparent';
		selectedColor = e.currentTarget.id;
		document.getElementById('colorPanelValue').value = selectedColor;
		e.target.style.border = '2px solid blue';
	});
	return label;
};
const createColorInput = () => {
	var input = document.createElement('input');
	input.id = 'colorPanelValue';
	input.type = 'text';
	input.value = selectedColor;
	applyStyles({ display: 'none' }, input);
	return input;
};

function createColorPicker() {
	var body = document.getElementsByTagName('BODY')[0];
	const div = createDiv('colorPickerPanel', mainStyleDiv);
	const colorItemGreen = createColorItem('rgb(90, 233, 142)');
	const colorItemYellow = createColorItem('rgb(247, 224, 0)');
	const colorItemRed = createColorItem('rgb(247, 0, 0)');
	const colorItemBlue = createColorItem('rgb(57, 201, 255)');
	const colorItemBlack = createColorItem('rgb(0, 0, 0)');
	const colorInput = createColorInput();
	div.appendChild(colorItemGreen);
	div.appendChild(colorItemBlue);
	div.appendChild(colorItemRed);
	div.appendChild(colorItemYellow);
	div.appendChild(colorItemBlack);
	div.appendChild(colorInput);
	body.appendChild(div);
}

init();
