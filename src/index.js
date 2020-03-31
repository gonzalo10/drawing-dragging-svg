import drawing from './drawing';
import {
	drawingStyles,
	shapeOptions,
	mainStyleDiv,
	lableStyle,
	spanStyle,
	controlPanelStyle,
	IconButtonStyles
} from './styles';
import { applyStyles, createHTMLElement } from './helpers';
import takeScreenShot from './screen-shot';
const htmlFile = require('./colorPicker.html');
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
	takeScreenShot();
}

init();
