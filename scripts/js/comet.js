// web audio api code
const context = new AudioContext();
const audioElement = document.getElementById('track');
/* set loop porperty on audio element and dynamically add the loop attribute to the audio element. Set the value of the attribute to true. */
audioElement.loop = true;
const source = context.createMediaElementSource(audioElement);

source.connect(context.destination);
// create buffer source using AJAX request
const bufferSource = context.createBufferSource();
const request = new XMLHttpRequest();
request.open('GET', 'audio/Late_Night_Drive.mp3', true);
request.responseType = 'arraybuffer';
request.onload = () => {
  context.decodeAudioData(request.response, (buffer) => {
    bufferSource.buffer = buffer;
    // ...
  });
};
request.send();
// buffer
bufferSource.start();
// when un-commented, the music plays on page  load
// audioElement.play();


// canvas code
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let raf;
let running = false;

const ball = {
    x: 100,
    y: 100,
    vx: 7,
    vy: 1,
    radius: 40,
    color: "#fe7f2d",
    draw: function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    },
};

function clear() {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    let bgColor = `rgba(${red}, ${green}, ${blue}, 0.3)`;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    clear();
    ball.draw();
    ball.x += ball.vx;
    console.log((ball.x += ball.vx));
    ball.y += ball.vy;
    console.log((ball.y += ball.vy));

    if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
        ball.vy = -ball.vy;
    }
    if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
        ball.vx = -ball.vx;
    }

    raf = window.requestAnimationFrame(draw);
}

/* place audioElement.play() inside function so that audio only starts when click on start button instead of on page load. */
function play() {
  const audioElement = document.getElementById('track');
  audioElement.play();
}

canvas.addEventListener("mousemove", function (e) {
    if (!running) {
        clear();
        ball.x = e.clientX;
        ball.y = e.clientY;
        ball.draw();
    }
    play();
    if (context.state === 'suspended') {
        context.resume();
    }
});

canvas.addEventListener("click", function (e) {
    if (!running) {
        raf = window.requestAnimationFrame(draw);
        running = true;
    }
    context.suspend();
    bufferSource.stop();
    audioElement.pause();
});

canvas.addEventListener("mouseout", function (e) {
    window.cancelAnimationFrame(raf);
    running = false;
    context.suspend();
    bufferSource.stop();
    audioElement.pause();
});

ball.draw();