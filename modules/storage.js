
import { sleep, charClean, parseEntrada } from "../utils/helpers.js";

 
const input03 = document.getElementById('input-03');
const textarea03 = document.getElementById('textarea-03');
const pMensaje03 = document.getElementById("p-mensaje-03");
const dummySpace03 = document.getElementById("dummy-space-03");

document.body.addEventListener('click', btnHandler);

function btnHandler(event) {
	if (event.target.tagName === 'BUTTON') {
		const accion = event.target.dataset.accion;
		if (accionesTodas03[accion]) {
			accionesTodas03[accion]();
		}
	}
}


class CommandHandler03 {
	init03(valor) {
		input03.value = valor;
	}
	dateNow03() {
		const fecha = new Date();
		const formatoUTC = fecha.toUTCString();
		textarea03.value += formatoUTC + "\n";
	}
	clear03() {
		textarea03.value = "";
	}
	update03() {
		try {
			const [clave, valor] = parseEntrada(input03.value);
			localStorage.setItem(clave, valor);			
		} catch (error) {
			this.avisoMostrar(error);
			return;
		}
		// input03.textContent = "session Storage creada: " + input03.value;
		this.avisoMostrar("Local Storage creada: " + input03.value);
	}
	async avisoMostrar(mensa){
		pMensaje03.textContent = mensa; 
		pMensaje03.style.display = 'block';	dummySpace03.style.display = 'none';
		await sleep(3000);
		pMensaje03.style.display = 'none'; dummySpace03.style.display = 'block';
	}
	query03() {
		textarea03.value = "";
		for (let i = 0; i < localStorage.length; i++) {
			const clave = localStorage.key(i);
			const valor = localStorage.getItem(clave);
			// console.log(`${clave}: ${valor}`);
			textarea03.value += `${clave}: ${valor}` + '\n';	;
		}
	}
	delete03(){
		let temp = input03.value;
		temp = temp.replace(/"/g, "'");
		temp = temp.trim();
		temp = temp.replace(/^['"]|['"]$/g, '');

		localStorage.removeItem(temp); 
		this.avisoMostrar("delete ok:" + temp );
	}
	deleteAll03(){
		if (confirm("delete all?")) {
			localStorage.clear();
		} 
	}

	funcionStringify03() {
		let temp = "";
		temp = textarea03.value ;
		 textarea03.value = "";
		textarea03.value = JSON.stringify(temp) ;		
	}
	funcionParse03() {
		let temp = "";
		temp = textarea03.value ;
		textarea03.value = "";
		try {
			temp = charClean(temp);
			console.log("D:", temp );
			
			let str = JSON.stringify(JSON.parse( temp ) , null, 4 );
			textarea03.value = str;

		} catch (error) {
			this.avisoMostrar("Failed to parse JSON:", error);
			textarea03.value = temp;
		}
	}

	ejecutar03(accion, ...args) {
		if (typeof this[accion] === "function") {
			this[accion](...args);
		} else {
			console.log("funcion no existe:", accion);
		}
	}
}

const accionesTodas03 = new CommandHandler03();
// IIFE, Immediately Invoked Function Expression
(function (param) {
	accionesTodas03.ejecutar03("init03", param);
})('"key", "value"');

