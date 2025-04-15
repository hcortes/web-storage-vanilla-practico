
# Readme   
App en html vanilla para testing de web storage ver: RFC 6265 sections 8.5 and 8.6. 

El protocolo HTTP es stateless, lo que significa que cada solicitud al servidor es independiente y no conserva información sobre solicitudes anteriores. Esto representa un desafío cuando se desea mantener datos del usuario entre páginas o sesiones (por ejemplo, un carrito de compras o preferencias de usuario).
Para resolver esta limitación, los navegadores ofrecen mecanismos de almacenamiento local, como:

✅ Web Storage (HTML5)
Incluye dos formas principales:
localStorage: Guarda datos de manera persistente, incluso si el usuario cierra el navegador.
sessionStorage: Guarda datos temporalmente, y se borra cuando se cierra la pestaña o ventana.

🎯 ¿Por qué usar Web Storage?
Permite mantener estado del usuario (sesión, preferencias, progreso, etc.).
Mejora la experiencia de usuario evitando solicitudes repetidas al servidor.
Reduce la carga del servidor, al manejar cierta lógica del lado del cliente.
Es más fácil de usar y con mayor capacidad que las cookies tradicionales.

🍪 Cookies
Son pequeños archivos de texto que el navegador guarda.
Se envían automáticamente al servidor con cada solicitud HTTP.
Se usan tradicionalmente para:
Autenticación (por ejemplo, mantener al usuario logueado).
Seguimiento (analytics, historial de navegación).
Personalización del contenido.
Tienen un tamaño limitado (~4KB).


### Patrones utilizados 
- Factory 
- Command 
- Event Delegacion 

### Others 
- Manejo de modules 



### Code  

El encabezado Set-Cookie debe enviarse desde el servidor HTTP como parte de la respuesta cuando se carga la página. No puede ser parte del documento HTML porque los encabezados HTTP se envían antes de que el contenido del cuerpo (como el HTML) sea procesado por el navegador.


Usar el Middleware cookie-parser
Luego, en tu aplicación Express, debes agregar el middleware cookie-parser para analizar las cookies de las solicitudes:

```js
	const express = require('express');
	const cookieParser = require('cookie-parser');
	const app = express();

	// Usa el middleware cookie-parser
	app.use(cookieParser());

	app.get('/', (req, res) => {
		// Verificar si la cookie 'user' está presente
		const user = req.cookies.user; // Esto accederá a la cookie "user" enviada por el cliente

		if (user) {
			res.send(`Cookie recibida: ${user}`);
		} else {
			res.send('No se encontró la cookie');
		}
	});

	app.get('/setcookie', (req, res) => {
		// Establecer una cookie
		res.cookie('user', 'JohnDoe', {
			expires: new Date(2025, 9, 21), // Fecha de expiración
			httpOnly: true, // No accesible por JavaScript
			secure: true, // Solo en HTTPS
			sameSite: 'Strict', // Políticas de seguridad
		});
		res.send('Cookie establecida');
	});

	app.listen(3000, () => {
		console.log('Servidor escuchando en http://localhost:3000');
	});
```

El servidor enviará una respuesta con el encabezado Set-Cookie:


```http
	HTTP/1.1 200 OK
	Set-Cookie: user=JohnDoe; Expires=Wed, 21 Oct 2025 07:28:00 GMT; Path=/; Secure; HttpOnly
	Content-Type: text/html; charset=UTF-8
```

### HTML5 Data Attributes
Almacenan información adicional sin saturar el HTML. Se pueden añadir datos a los  elementos HTML que puedan ser utilizados por JavaScript, CSS o incluso simplemente para darle más significado al HTML

**Ejemplo**  
```html 
<div data-user-id="12345" data-role="admin">User Info</div>
```
Acceder a los datos:
```js 
let userInfo = document.querySelector('div[data-user-id]');

// Access the data attribute
let userId = userInfo.getAttribute('data-user-id');
console.log(userId); // Output: 12345
```





### Tools 
https://regex101.com/  
https://jsonpath.com/  
https://htmlboilerplates.com/   



*Este resumen fue generado por ChatGPT en base a una conversación interactiva. HC. abril, 2025*

