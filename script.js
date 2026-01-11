const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const btn = document.querySelector("#btn");

canvas.width = 600;
canvas.height = 600;

const mult = 1;
let xVel = 1.3 * mult;
let yVel = 2 * mult;
const radio = 2 * mult;
let x = radio;
let y = radio;
let hue = 0;
const hueVel = 360 / 127;

let animacion = null;
let pausado = false;

function mueve() {
	document.body.style.backgroundColor = `hsl(${hue}, 100%, 5%)`

	//ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
	ctx.fillStyle = `hsl(120, 100%, 50%)`;
	ctx.beginPath();
	ctx.arc(x, y, radio, 0, Math.PI * 2);
	ctx.fill();

	if (x >= canvas.width - radio || x < radio) {
		xVel *= -1;
		hue += hueVel;
	}
	if (y >= canvas.height - radio || y < radio) {
		yVel *= -1;
		hue += hueVel;
	}
	x += xVel;
	y += yVel;

	animacion = requestAnimationFrame(mueve);
}

btn.addEventListener("click", () => {
	if (pausado) {
		mueve();
		btn.textContent = "Pausar";
	} else {
		cancelAnimationFrame(animacion);
		btn.textContent = "Reanudar";
	}
	pausado = !pausado;
});

mueve();
