const canvas = document.querySelector("#jsCanvas");
const context = canvas.getContext("2d");
const range = document.querySelector(".controls__range>input");

canvas.width = 700;
canvas.height = 700;
context.strokeStyle = "#2c2c2c";
context.lineWidth = parseFloat(range.value);

let isPainting = false;

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    range.addEventListener("change", onRangeChange);
}

function stopPainting() {
    isPainting = false;
}

function startPainting() {
    isPainting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!isPainting) {
        context.beginPath();
        context.moveTo(x, y);
    } else {
        context.lineTo(x, y);
        context.stroke();
    }
}

function onMouseDown(event) {
    isPainting = true;
}

function onRangeChange(event) {
    context.lineWidth = parseFloat(range.value);
    console.log(context.lineWidth);
}