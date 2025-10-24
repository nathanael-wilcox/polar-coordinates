const numOne = document.getElementById("num1");
const angleOne = document.getElementById("angle1");
const numTwo = document.getElementById("num2");
const angleTwo = document.getElementById("angle2");
const submit = document.getElementById("submit");
const distance = document.getElementById("distance");
const angle = document.getElementById("angle");

const canvas = document.getElementById("canvas");

let width = canvas.width;
let height = canvas.height;

let padding = 40;
let textOffset = 3;

const ctx = canvas.getContext("2d");

async function loadFonts() {
  const font = new FontFace("Inter", "url(Inter/static/Inter-Regular.ttf)");
  await font.load();
  document.fonts.add(font);
}

loadFonts();

const drawLine = (x, y, h, k) => {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(h, k);
  ctx.stroke();
  ctx.closePath();
};

ctx.translate(width / 2, height / 2);
ctx.font = '18px "Inter"';
ctx.lineCap = "square";

submit.onclick = () => {
  ctx.translate(-width / 2, -height / 2);
  ctx.clearRect(0, 0, width, height);
  ctx.translate(width / 2, height / 2);
  ctx.strokeStyle = "#E5EEF3";
  ctx.lineWidth = 2;
  drawLine(0, -height / 2, 0, 0);
  drawLine(-width / 2, 0, 0, 0);
  drawLine(width / 2, 0, 0, 0);
  drawLine(0, height / 2, 0, 0);
  ctx.strokeStyle = "#D7E4F0";
  ctx.lineWidth = 4;
  let nOne = Number(numOne.value);
  let aOne = Number(angleOne.value);
  let nTwo = Number(numTwo.value);
  let aTwo = Number(angleTwo.value);
  let oneCoords = {
    x: nOne * Math.cos((aOne / 180) * Math.PI),
    y: -nOne * Math.sin((aOne / 180) * Math.PI),
  };
  let twoCoords = {
    x: nTwo * Math.cos((aTwo / 180) * Math.PI),
    y: -nTwo * Math.sin((aTwo / 180) * Math.PI),
  };
  let first =
    Math.cos((aOne * Math.PI) / 180) * nOne +
    Math.cos((aTwo * Math.PI) / 180) * nTwo;
  let second =
    Math.sin((aOne * Math.PI) / 180) * nOne +
    Math.sin((aTwo * Math.PI) / 180) * nTwo;
  let finalNumber = Math.sqrt(first * first + second * second);
  let finalCoords = {
    x: oneCoords.x + twoCoords.x,
    y: oneCoords.y + twoCoords.y,
  };
  let quad =
    finalCoords.x >= 0 && finalCoords.y < 0
      ? 1
      : finalCoords.x < 0 && finalCoords.y < 0
      ? 2
      : finalCoords.x < 0 && finalCoords.y >= 0
      ? 3
      : 4;
  let finalAngle =
    quad == 1
      ? Math.round(
          ((Math.atan(second / first) * 180) / Math.PI + Number.EPSILON) * 100
        ) / 100
      : quad == 4
      ? 360 +
        Math.round(
          ((Math.atan(second / first) * 180) / Math.PI + Number.EPSILON) * 100
        ) /
          100
      : 180 +
        Math.round(
          ((Math.atan(second / first) * 180) / Math.PI + Number.EPSILON) * 100
        ) /
          100;
  let factor =
    Math.abs(nOne) > Math.abs(nTwo)
      ? Math.abs(nOne) > Math.round(finalNumber)
        ? (width / 2 - padding) / Math.abs(nOne)
        : (width / 2 - padding) / Math.round(finalNumber)
      : Math.abs(nTwo) > Math.round(finalNumber)
      ? (width / 2 - padding) / Math.abs(nTwo)
      : (width / 2 - padding) / Math.round(finalNumber);
  drawLine(
    oneCoords.x * factor,
    oneCoords.y * factor,
    finalCoords.x * factor,
    finalCoords.y * factor
  );
  drawLine(
    twoCoords.x * factor,
    twoCoords.y * factor,
    finalCoords.x * factor,
    finalCoords.y * factor
  );
  ctx.strokeStyle = "#75A3D1";
  drawLine(0, 0, oneCoords.x * factor, oneCoords.y * factor);
  drawLine(0, 0, twoCoords.x * factor, twoCoords.y * factor);
  ctx.strokeStyle = "#3870A8";
  drawLine(0, 0, finalCoords.x * factor, finalCoords.y * factor);
  ctx.fillStyle = "#080F0F";
  ctx.fillText(
    `${nOne}`,
    oneCoords.x * factor + textOffset,
    oneCoords.y * factor - textOffset
  );
  ctx.fillText(
    `${nTwo}`,
    twoCoords.x * factor + textOffset,
    twoCoords.y * factor - textOffset
  );
  ctx.fillText(
    `${Math.round(finalNumber)}`,
    finalCoords.x * factor + textOffset,
    finalCoords.y * factor - textOffset
  );
  distance.innerText = Math.round((finalNumber + Number.EPSILON) * 100) / 100;
  angle.innerText = `${finalAngle}`;
};
