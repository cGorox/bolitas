const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const xVelnput = document.querySelector("#xVelInput");
const yVelnput = document.querySelector("#yVelInput");
const btnIniciar = document.querySelector("#btnIniciar");
const btnLimpiar = document.querySelector("#btnLimpiar")

canvas.width = 600;
canvas.height = 600;

const mult = 1;
let xVel = 10;
let yVel = 11;
const radio = 3;
let x = radio;
let y = radio;
let hue = 120;
const hueVel = 360 / 127;

let animacion = null;
let pausado = true;
let iniciado = false

function mueve() {
	document.body.style.backgroundColor = `hsl(${hue}, 100%, 5%)`;

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

function actualizarTextoBoton() {
	if (!iniciado) {
		btnIniciar.textContent = "Iniciar"
	} else if (pausado) {
		btnIniciar.textContent = "Reanudar"
	} else {
		btnIniciar.textContent = "Pausar"
	}
}

function iniciarDesdeInputs() {
	xVel = parseFloat(xVelnput.value);
	yVel = parseFloat(yVelnput.value);

	x = radio
	y = radio
	hue = 120

	iniciado = true
	pausado = false

	actualizarTextoBoton()
	mueve()
}

btnIniciar.addEventListener("click", () => {
	if (!iniciado) {
		iniciarDesdeInputs()
		return
	}

	if (pausado) {
		mueve();
	} else {
		cancelAnimationFrame(animacion);
	}

	pausado = !pausado;
	actualizarTextoBoton()
});

btnLimpiar.addEventListener("click", () => {
	cancelAnimationFrame(animacion)

	iniciado = false
	pausado = true

	ctx.clearRect(0, 0, canvas.width, canvas.height)
	actualizarTextoBoton()
})

