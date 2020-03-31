import html2canvas from 'html2canvas';

const takeScreenshot = () => {
	const button = document.getElementById('take_screenshot');
	console.log(button);
	button.onclick = () => {
		html2canvas(document.body).then(function(canvas) {
			console.log(canvas.toDataURL());
		});
	};
};

export default takeScreenshot;

// function createScreenShot() {
// 	const canvas = html2canvas(document.body, {
// 		useCORS: false,
// 		proxy: 'http://localhost:3000',
// 		allowTaint: true
// 	});
// 	return canvas;
// }

// function paintScreenshot(screenshotUrl) {
// 	screenshotImg.src = screenshotUrl;
// }

// function createAndPaintScreenshot() {
// 	return createScreenShot().then(canvas => {
// 		paintScreenshot(canvas.toDataURL());
// 	});
// }
