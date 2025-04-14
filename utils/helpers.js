function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function charClean(valor) {
    let regex = /^\"|\"$|\\n|\\/gm;
    valor = valor.trim();
    return valor.replace(regex, "");
}

function charClean2(valor) {
    let regex = new RegExp('^\\"|\\"$|\\\\n|\\\\', "gm");
    valor = valor.trim();
    return valor.replace(regex, "");
}

function parseEntrada(entrada) {
    let inQuotes = false;
    let bracketDepth = 0;

    for (let i = 0; i < entrada.length; i++) {
        const char = entrada[i];

        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === "{" && !inQuotes) {
            bracketDepth++;
        } else if (char === "}" && !inQuotes) {
            bracketDepth--;
        } else if (char === "," && !inQuotes && bracketDepth === 0) {
            // Separar clave y valor aquí
            const clave = entrada.slice(0, i).trim().replace(/^"|"$/g, "");
            const valor = entrada.slice(i + 1).trim();
            return [clave, valor];
        }
    }

    throw new Error("entrada inválida. Asegúrate de tener una coma principal que separa clave y valor.");
}

 

const USER_NAME = "bob";

export { sleep, charClean, parseEntrada, USER_NAME };
