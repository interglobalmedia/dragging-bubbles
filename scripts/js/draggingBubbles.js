// canvas bubbles code
window.onload = init();

function init() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvas.addEventListener("mousemove", mouseMove, false);

	mouse = {
		x: 0,
		y: 0
	};
	particleHolder = [];
	x = 100;
	y = 100;
	angle = 0.2;
	radius = 80;
	particleCount = 1000;
	color = [
		"rgba(106, 210, 231, 0.5)",
		"rgba(250, 104, 0, 0.5)",
		"rgba(243, 132, 48, 0.5)",
		"rgba(198, 244, 98, 0.5)",
		"rgba(255, 107, 107, 0.5)",
		"rgba(250, 204, 0, 0.5)",
		"rgba(232, 125, 2, 0.5)",
		"rgba(202, 232, 105, 0.5)",
		"rgba(0, 169, 199, 0.5)",
		"rgba(63, 191, 202, 0.5)",
		"rgba(174, 225, 55, 0.5)",
		"rgba(208, 231, 80, 0.5)",
		"rgba(78, 189, 233, 0.5)",
		"rgba(37, 174, 228, 0.5)",
		"rgba(249, 214, 36, 0.5)",
		"rgba(240, 122, 25, 0.5)",
		"rgba(239, 169, 46, 0.5)",
		"rgba(136, 197, 38, 0.5)",
		"rgba(190, 242, 2, 0.5)",
		"rgba(250, 42, 0, 0.5)",
		"rgba(0, 178, 255, 0.5)",
		"rgba(127, 255, 36, 0.5)",
		"rgba(194, 255, 102, 0.5)",
		"rgba(200, 255, 0, 0.5)",
		"rgba(19, 205, 75, 0.5)",
		"rgba(126, 112, 215, 0.5)",
		"rgba(187, 233, 7, 0.5)",
		"rgba(192, 250, 56, 0.5)",
		"rgba(170, 255, 0, 0.5)",
		"rgba(255, 170, 0, 0.5)",
		"rgba(255, 0, 170, 0.5)",
		"rgba(170, 0, 255, 0.5)",
		"rgba(0, 170, 255, 0.5)",
		"rgba(255, 255, 0, 0.5)",
	];

	function mouseMove(event) {
		mouse.x = event.pageX - canvas.offsetLeft;
		mouse.y = event.pageY - canvas.offsetLeft;
	}

	for (i = 0; i < particleCount; i++) {
		particleHolder.push(new generateParticles());
	}

	function generateParticles() {
		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;
		this.color = color[Math.floor(Math.random() * color.length)];
		this.rad = Math.floor(Math.random() * 8);
	}

	function vibrate() {
		context.fillStyle = "blue";
		context.fillRect(0, 0, canvas.width, canvas.height);
		for (let j = 0; j < particleHolder.length; j++) {
			let p = particleHolder[j];
			let distanceX = p.x - mouse.x;
			let distanceY = p.y - mouse.y;
			particleDistance = Math.sqrt(
				distanceX * distanceX + distanceY * distanceY
			);

			particleMouse = Math.max(
				Math.min(75 / (particleDistance / p.rad), 10),
				0.1
			);
			context.beginPath();
			context.fillStyle = p.color;
			context.arc(
				p.x + Math.sin(angle++ * Math.cos(radius++)),
				p.y - Math.cos(angle++ * Math.sin(radius++)),
				p.rad * particleMouse,
				Math.PI * 2,
				false
			);
			context.fill();
		}
	}
	setInterval(vibrate, 30);
}

// web audio api code
const audioContext = new AudioContext();
const audioElement1 = document.getElementById('track1');
const audioElement2 = document.getElementById('track2');
/* set loop property on audio element and dynamically add the loop attribute to the audio element. Set the value of the attribute to true. */
audioElement1.loop = true;
const source1 = audioContext.createMediaElementSource(audioElement1);
audioElement2.loop = true;
const source2 = audioContext.createMediaElementSource(audioElement2);

// create the volume control
const gainNode = audioContext.createGain()
gainNode.gain.value = 0.5
let currGain = gainNode.gain.value

source1.connect(gainNode).connect(audioContext.destination);
source2.connect(gainNode).connect(audioContext.destination);
// create buffer source using AJAX request
const bufferSource = audioContext.createBufferSource();
const request = new XMLHttpRequest();
request.open('GET', 'audio/Late_Night_Drive.mp3', true);
request.responseType = 'arraybuffer';
request.onload = () => {
	audioContext.decodeAudioData(request.response, (buffer) => {
		bufferSource.buffer = buffer;
		// ...
	});
};
request.send();
// buffer
bufferSource.start();
// when un-commented, the music plays on page  load
// audioElement.play();

/* place audioElement.play() inside function so that audio only starts when click on start button instead of on page load. */
function play() {
	const audioElement1 = document.getElementById('track1');
	const audioElement2 = document.getElementById('track2');
	audioElement1.play();
	audioElement2.play();
}

// start mousemove

canvas.addEventListener("mousemove", function (e) {
	mouse.x = e.pageX - canvas.offsetLeft;
	mouse.y = e.pageY - canvas.offsetLeft;
	play();
	if (audioContext.state === 'suspended') {
		audioContext.resume();
	}
});

// end mousemove

// start mouseover

canvas.addEventListener("mouseover", function () {
	play();
	if (audioContext.state === 'suspended') {
		audioContext.resume();
	}
})

// end mouseover

canvas.addEventListener("click", function (e) {
	audioContext.suspend();
	bufferSource.stop();
	audioElement1.pause();
	audioElement2.pause();
});

// start mouseup

canvas.addEventListener("mouseup", function (e) {
	audioContext.suspend();
	bufferSource.stop();
	audioElement1.pause();
	audioElement2.pause();
});

// end mouseup

// start mouseout

canvas.addEventListener("mouseout", function (e) {
	audioContext.suspend();
	bufferSource.stop();
	audioElement1.pause();
	audioElement2.pause();
});

// end mouseout

const volumeControl = document.querySelector('#volume')
volumeControl.addEventListener(
    'input',
    function () {
		gainNode.gain.value = this.value
    },
    false
)

function refresh() {
	document.location.reload()
}

const btnPlus = document.querySelector('.btn-plus')
const btnMinus = document.querySelector('.btn-minus')
const btnRefresh = document.querySelector('.btn-refresh')

// start btnPlus

btnPlus.addEventListener('mousedown', function () {
	currGain = 1.0;
	gainNode.gain.setTargetAtTime(1.0, audioContext.currentTime + 3, 3);
})

// end btnPlus

// start btnMinus

btnMinus.addEventListener('mousedown', function () {
	currGain = 0;
	gainNode.gain.setTargetAtTime(0, audioContext.currentTime + 3, 3);
})

//end btnMinus

// start btnRefresh

btnRefresh.addEventListener('mousedown', refresh)

// end btnRefresh

// map over mouse events and associate them with touch events

function touch2Mouse(e) {
	let theTouch = e.changedTouches[0];
	let mouseEvt;

	switch (e.type) {
		case 'touchstart':
			mouseEvt = 'mousedown';
			break;
		case 'touchstart':
			mouseEvt = 'mousemove';
			break;
		case 'touchstart':
			mouseEvt = 'mouseover';
			break;
		case 'touchend':
			mouseEvt = 'mouseup';
			break;
		case 'touchend':
			mouseEvt = 'mouseout';
			break;
		case 'touchmove':
			mouseEvt = 'mousemove';
			break;
		case 'touchmove':
			mouseEvt = 'mouseover';
			break;
		default:
			return;
	}
	const mouseEvent = document.createEvent('MouseEvent');
	mouseEvent.initMouseEvent(mouseEvt, true, true, window, 1, theTouch.screenX, theTouch.screenY, theTouch.clientX, theTouch.clientY, false, false, false, false, 0, null);
	theTouch.target.dispatchEvent(mouseEvent);
	e.preventDefault();
}