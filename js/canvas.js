var controller;
var canvas;
var ctx;

function init() {
    var c = document.createElement('canvas');
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    c.style.position = 'absolute';
    c.style.left = c.style.top = '0px';
    ctx = c.getContext('2d');
    document.body.appendChild(c);
    canvas = c

    controller = new Controller(canvas, ctx);
    window.requestAnimationFrame(loop, canvas);
}


function draw() {
    var width = canvas.width;
    var height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    ctx.globalCompositeOperation = 'source-over';

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    controller.draw(ctx);
}

function update(delta) {
    controller.update(delta);
}

function loop(timestamp) {
    var timeDiff = timestamp - lastRender
    //Timestamp is in ms, easier to work with delta in seconds
    var delta = timeDiff/1000

    update(delta)
    draw()
  
    lastRender = timestamp
    window.requestAnimationFrame(loop, canvas)
}

var lastRender = 0;
var sparks = [];
init();
