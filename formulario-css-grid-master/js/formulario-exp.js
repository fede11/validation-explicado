const formulario = document.getElementById('formulario'); // Obtiene el elemento con el id "formulario" del documento HTML
const inputs = document.querySelectorAll('#formulario input'); // Obtiene todos los elementos input que están dentro del elemento con el id "formulario"

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
	usuario: false,
	nombre: false,
	password: false,
	correo: false,
	telefono: false
}
const validarFormulario = (e) => { // Definición de una función flecha con un parámetro "e"
	switch (e.target.name) { // Se utiliza la estructura switch para evaluar el atributo "name" del elemento HTML que ha desencadenado el evento
		case "usuario": // Si el "name" es "usuario"...
			validarCampo(expresiones.usuario, e.target, 'usuario'); // ...llama a la función "validarCampo" y le pasa tres argumentos: la expresión regular a validar, el elemento HTML que ha desencadenado el evento y la cadena de texto 'usuario'
		break; // Se utiliza el "break" para salir de la estructura switch
		
		case "nombre": // Si el "name" es "nombre"...
			validarCampo(expresiones.nombre, e.target, 'nombre'); // ...llama a la función "validarCampo" y le pasa tres argumentos: la expresión regular a validar, el elemento HTML que ha desencadenado el evento y la cadena de texto 'nombre'
		break; // Se utiliza el "break" para salir de la estructura switch
		
		case "password": // Si el "name" es "password"...
			validarCampo(expresiones.password, e.target, 'password'); // ...llama a la función "validarCampo" y le pasa tres argumentos: la expresión regular a validar, el elemento HTML que ha desencadenado el evento y la cadena de texto 'password'
			validarPassword2(); // Llama a la función "validarPassword2"
		break; // Se utiliza el "break" para salir de la estructura switch
		
		case "password2": // Si el "name" es "password2"...
			validarPassword2(); // Llama a la función "validarPassword2"
		break; // Se utiliza el "break" para salir de la estructura switch
		
		case "correo": // Si el "name" es "correo"...
			validarCampo(expresiones.correo, e.target, 'correo'); // ...llama a la función "validarCampo" y le pasa tres argumentos: la expresión regular a validar, el elemento HTML que ha desencadenado el evento y la cadena de texto 'correo'
		break; // Se utiliza el "break" para salir de la estructura switch
		
		case "telefono": // Si el "name" es "telefono"...
			validarCampo(expresiones.telefono, e.target, 'telefono'); // ...llama a la función "validarCampo" y le pasa tres argumentos: la expresión regular a validar, el elemento HTML que ha desencadenado el evento y la cadena de texto 'telefono'
		break; // Se utiliza el "break" para salir de la estructura switch
	}
}

const validarCampo = (expresion, input, campo) => {
	// Se verifica si la expresión regular proporcionada en el primer parámetro coincide con el valor actual del campo
	if(expresion.test(input.value)){
		// Si la validación es exitosa, se eliminan las clases correspondientes al estilo de error
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		// Se agregan las clases correspondientes al estilo de éxito
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		// Se cambia el icono que indica el estado del campo a uno de éxito
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		// Se elimina el icono que indica el estado de error
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		// Se oculta el mensaje de error en caso de que esté visible
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		// Se indica que el campo ha sido validado correctamente
		campos[campo] = true;
	} else {
		// Si la validación no es exitosa, se agregan las clases correspondientes al estilo de error
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		// Se eliminan las clases correspondientes al estilo de éxito
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		// Se cambia el icono que indica el estado del campo a uno de error
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		// Se elimina el icono que indica el estado de éxito
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		// Se muestra el mensaje de error correspondiente
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		// Se indica que el campo no ha sido validado correctamente
		campos[campo] = false;
	}
}

const validarPassword2 = () => {
	// Obtener los elementos de contraseña y confirmación de contraseña
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

	// Verificar si las contraseñas son diferentes
	if(inputPassword1.value !== inputPassword2.value){
		// Si las contraseñas no coinciden, agregar estilos de error
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos['password'] = false; // Marcar el campo de contraseña como inválido en el objeto 'campos'
	} else {
		// Si las contraseñas coinciden, agregar estilos de éxito
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos['password'] = true; // Marcar el campo de contraseña como válido en el objeto 'campos'
	}
}

// Seleccionar todos los elementos input del formulario y agregarles eventos
inputs.forEach((input) => {
    // Agregar un evento para cuando el usuario levanta una tecla en el input.
    // Esto se hace con el método addEventListener, que recibe como primer parámetro
    // el nombre del evento ('keyup') y como segundo parámetro una función que se ejecutará
    // cada vez que se produzca el evento. En este caso, la función es validarFormulario.
    input.addEventListener('keyup', validarFormulario);
    
    // Agregar un evento para cuando el usuario saca el foco del input (es decir, hace clic
    // fuera del input). Esto se hace con el método addEventListener, que recibe como primer
    // parámetro el nombre del evento ('blur') y como segundo parámetro una función que se
    // ejecutará cada vez que se produzca el evento. En este caso, la función es validarFormulario.
    input.addEventListener('blur', validarFormulario);
  });

  formulario.addEventListener('submit', (e) => {
	// Evita que se envíe el formulario de manera predeterminada
	e.preventDefault();

	// Verifica si los campos del formulario están validados y si los términos y condiciones han sido aceptados
	const terminos = document.getElementById('terminos');
	if(campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked ){
		// Resetea el formulario si todo está validado y los términos se han aceptado
		formulario.reset();

		// Muestra un mensaje de éxito por 5 segundos
		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		// Elimina los íconos de verificación de cada campo del formulario
		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		// Si los campos no están validados o los términos no se han aceptado, muestra un mensaje de error
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});
