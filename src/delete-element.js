var deleteButton = document.querySelector('#btn-delete');

deleteButton.onclick = () => {
	if (!selectedElementId) return null;
	const svgToDelete = document.getElementById(selectedElementId);
	svgToDelete.parentNode.removeChild(svgToDelete);
};
