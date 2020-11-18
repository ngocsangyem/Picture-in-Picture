const videoEL = document.getElementById('video') as HTMLVideoElement;
const btn = document.getElementById('button') as HTMLElement;

// Prompt to select media stream, pass  to video element, then play
async function selectMediaStream() {
	try {
		// Typescript not support getDisplayMedia
		// https://github.com/microsoft/TypeScript/issues/33232
		// @ts-ignore
		const mediaStream = await navigator.mediaDevices.getDisplayMedia();
		videoEL.srcObject = mediaStream;
		videoEL.onloadedmetadata = () => {
			videoEL.play();
		};
	} catch (error) {
		console.log('Oops error: ', error);
	}
}

btn.addEventListener('click', async () => {
	(btn as HTMLInputElement).disabled = true;
	// Start Picture in Picture
	await (videoEL as any).requestPictureInPicture();
	// reset button
	(btn as HTMLInputElement).disabled = false;
});

// Load
selectMediaStream();
