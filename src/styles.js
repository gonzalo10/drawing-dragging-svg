export const drawingStyles = {
	position: 'absolute',
	top: '0',
	left: '0',
	width: '100%',
	height: '100%',
	background: 'transparent'
};

export const IconButtonStyles = {
	border: '1px solid transparent',
	padding: '0',
	margin: '0',
	cursor: 'pointer'
};

export const shapeOptions = {
	free_draw: 'Mouse paint',
	rect: 'Rectangle',
	ellipse: 'Circle',
	line: 'Line',
	dark_square: 'dark square'
};

export const mainStyleDiv = {
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

export const lableStyle = {
	position: 'relative',
	cursor: 'pointer',
	width: '50px',
	height: '50px',
	display: 'flex',
	alignItems: 'center'
};

export const spanStyle = color => ({
	backgroundColor: color,
	width: '40px',
	height: '40px',
	borderRadius: '30%'
});

export const controlPanelStyle = {
	width: 'auto',
	justifyContent: 'center',
	display: 'flex',
	alignItems: 'center',
	position: 'absolute',
	left: '50%',
	transform: 'translate(-50%)'
};
