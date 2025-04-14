
import { sleep, charClean, parseEntrada } from "../utils/helpers.js";


const input02 = document.getElementById('input-02');
const textarea02 = document.getElementById('textarea-02');
const pMensaje02 = document.getElementById("p-mensaje-02");
const dummySpace02 = document.getElementById("dummy-space-02");

document.body.addEventListener('click', btnHandler);

function btnHandler(event) {
	if (event.target.tagName === 'BUTTON') {
		const accion = event.target.dataset.accion;
		if (accionesTodas02[accion]) {
			accionesTodas02[accion]();
		}
	}
}


class CommandHandler02 {
	init02(valor) {
		input02.value = valor;
	}
	dateNow02() {
		const fecha = new Date();
		const formatoUTC = fecha.toUTCString();
		textarea02.value += formatoUTC + "\n";
	}
	clear02() {
		textarea02.value = "";
	}
	update02() {
		try {
			const [clave, valor] = parseEntrada(input02.value);
			sessionStorage.setItem(clave, valor);			
		} catch (error) {
			this.avisoMostrar(error);
			return;
		}
		// input02.textContent = "session Storage creada: " + input02.value;
		this.avisoMostrar("session Storage creada: " + input02.value);
	}
	async avisoMostrar(mensa){
		pMensaje02.textContent = mensa; 
		pMensaje02.style.display = 'block';	dummySpace02.style.display = 'none';
		await sleep(3000);
		pMensaje02.style.display = 'none'; dummySpace02.style.display = 'block';
	}
	query02() {
		textarea02.value = "";
		for (let i = 0; i < sessionStorage.length; i++) {
			const clave = sessionStorage.key(i);
			const valor = sessionStorage.getItem(clave);
			// console.log(`${clave}: ${valor}`);
			textarea02.value += `${clave}: ${valor}` + '\n';	;
		}
	}
	delete02(){
		let temp = input02.value;
		temp = temp.replace(/"/g, "'");
		temp = temp.trim();
		temp = temp.replace(/^['"]|['"]$/g, '');

		sessionStorage.removeItem(temp); 
		this.avisoMostrar("delete ok:" + temp );
	}
	deleteAll02(){
		if (confirm("delete all?")) {
			sessionStorage.clear();
		} 
	}

	funcionStringify02() {
		let temp = "";
		temp = textarea02.value ;
		 textarea02.value = "";
		textarea02.value = JSON.stringify(temp) ;		
	}
	funcionParse02() {
		let temp = "";
		temp = textarea02.value ;
		textarea02.value = "";
		try {
			temp = charClean(temp);
			console.log("D:", temp );
			
			let str = JSON.stringify(JSON.parse( temp ) , null, 4 );
			textarea02.value = str;

		} catch (error) {
			this.avisoMostrar("Failed to parse JSON:", error);
			textarea02.value = temp;
		}
	}

	ejecutar02(accion, ...args) {
		if (typeof this[accion] === "function") {
			this[accion](...args);
		} else {
			console.log("funcion no existe:", accion);
		}
	}
}

const accionesTodas02 = new CommandHandler02();
// IIFE, Immediately Invoked Function Expression
(function (param) {
	accionesTodas02.ejecutar02("init02", param);
})('"key", "value"');

