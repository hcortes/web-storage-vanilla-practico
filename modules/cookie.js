
import { sleep, charClean } from "../utils/helpers.js";


const input01 = document.getElementById('input-01');
const textarea01 = document.getElementById('textarea-01');
const pMensaje01 = document.getElementById("p-mensaje-01");
const dummySpace01 = document.getElementById("dummy-space-01");

document.body.addEventListener('click', btnHandler);

function btnHandler(event) {
	if (event.target.tagName === 'BUTTON') {
		const accion = event.target.dataset.accion;
		if (accionesTodas01[accion]) {
			accionesTodas01[accion]();
		}
	}
}``


class CommandHandler01 {
	init01(valor) {
		input01.value = valor;
	}
	dateNow01() {
		const fecha = new Date();
		const formatoUTC = fecha.toUTCString();
		textarea01.value += formatoUTC + "\n";
	}
	clear01() {
		textarea01.value = "";
	}
	update01() {
		document.cookie = input01.value
		input01.textContent = "Cookie creada: " + document.cookie;
		this.avisoMostrar(input01.value);
	}
	async avisoMostrar(mensa){
		pMensaje01.textContent = mensa; 
		pMensaje01.style.display = 'block';	dummySpace01.style.display = 'none';
		await sleep(3000);
		pMensaje01.style.display = 'none'; dummySpace01.style.display = 'block';
	}
	query01() {
		textarea01.value = "";
		const cookies = document.cookie.split(';');
		for (let cookie of cookies) {
			textarea01.value += cookie.trim() + '\n';		
			// const [clave, valor] = cookie.trim().split('=');					// if (clave === nombre) {					// 	return valor || null;					// }
		}
	}
	funcionStringify01() {
		let temp = "";
		temp = textarea01.value ;
		 textarea01.value = "";
		textarea01.value = JSON.stringify(temp) ;		
	}
	funcionParse01() {
		let temp = "";
		temp = textarea01.value ;
		textarea01.value = "";
		try {
			temp = charClean(temp);
			console.log("D:", temp );
			
			let str = JSON.stringify(JSON.parse( temp ) , null, 4 );
			textarea01.value = str;

		} catch (error) {
			this.avisoMostrar("Failed to parse JSON:", error);
			textarea01.value = temp;
		}
	}

	ejecutar01(accion, ...args) {
		if (typeof this[accion] === "function") {
			this[accion](...args);
		} else {
			console.log("funcion no existe:", accion);
		}
	}
}

const accionesTodas01 = new CommandHandler01();
// IIFE, Immediately Invoked Function Expression
(function (param) {
	accionesTodas01.ejecutar01("init01", param);
})("demo=activo; max-age=3600; path=/");

