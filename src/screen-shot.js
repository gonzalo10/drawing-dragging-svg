import html2canvas from 'html2canvas';

async function createScreenShot() {
	const canvas = await html2canvas(document.body, {
		useCORS: false,
		proxy: 'http://localhost:3000',
		allowTaint: false
	});
	return canvas;
}

const takeScreenshot = () => {
	const button = document.getElementById('take_screenshot');
	button.onclick = () => {
		const canvas = createScreenShot();
		console.log(canvas.toDataURL());
	};
};

export default takeScreenshot;
