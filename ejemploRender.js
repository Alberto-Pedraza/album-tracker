/**
 * !MANIPULACIÓN DE LA INTERFAZ:
 * 1. Propiedad llamada innerhtml, dentro de ella podremos observar todo el html que vive dentro de la etiqueta seleccionada
 * 2.Propiedad llamada textContent. Esta sólo mostrará el texto que tiene dentro.
 */

console.log(albumElement.innerHTML);
console.log("text content");
console.log(albumElement.textContent);

//Si no usamos con cuidado el innerHTML se podrían borrar los datos que ya se tenían en el html, por eso es importante concatenar lo que se va a agregar +=
//Si se pusiera el = nada más, estaríamos reasignando toda lo que esté dentro del elemento al texto nuevo que se ingresa.
//! IMPORTANTE: No usar innerHTML para renderizar solo texto si estoy recibiendo y mostrando, porque es propenso a inyección de html. 
// Para eso mejor usar textContent.
albumElement.innerHTML += "<h1>Hola tonotos</h1>";
albumElement.innerHTML += card;
console.log(albumElement.innerHTML);

//Aquí vemos lo que pasa si usamos textContent
/**
albumElement.textContent += "Hola";
albumElement.textContent += card;
*/

/**
 * ! Insert Adjacent HTML
 * https://developer.mozilla.org/es/docs/Web/API/Element/insertAdjacentHTML
 * Permite insertar html en el contenedor sin borrar lo que ya está y en una posición específica.
 * Tiene 4 posiciones
 * 1. beforebegin
 * 2. beforeend
 * 3. afterbegin
 * 4. afterend
 */
albumElement.insertAdjacentHTML("afterend","<p>Insertado por insert adjacent html</p>");

albumElement.insertAdjacentHTML("beforeend",card);