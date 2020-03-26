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
