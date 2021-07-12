const canvas = document.querySelector("#jsCanvas");
const context = canvas.getContext("2d");
const range = document.querySelector(".controls__range>input");
const colors = document.getElementsByClassName("jsColor");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const CANVAS_SIZE = 700;
const INITIAL_COLOR = "#2c2c2c";

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

context.fillStyle = "white";
context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
context.strokeStyle = INITIAL_COLOR;
context.fillStyle = INITIAL_COLOR;
context.lineWidth = range.value;


let isPainting = false;
let filling = false;

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick ));

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

if(range) {
  range.addEventListener("change", onRangeChange);
}

if(mode) {
  mode.addEventListener("click", handleModeClick);
}

if(save) {
  save.addEventListener("click", handleSaveClick);
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
        if (!filling) {
          context.lineTo(x, y);
          context.stroke();
        }
    }
}

function onRangeChange(event) {
    context.lineWidth = range.value;
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  context.strokeStyle = color;
}

function handleModeClick() {
  if(filling) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handelCanvasClick() {
  if(filling) {
    context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleSaveClick() {
  const image = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[🎨]";
  link.click();
}