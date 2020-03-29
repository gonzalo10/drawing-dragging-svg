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

export const createHTMLElement = {
	button: createButton,
	dropdown: createDropdown,
	input: createInput,
	div: createDiv
};
