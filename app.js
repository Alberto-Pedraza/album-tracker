/**
 * !UTILIZAR EL DOM (DOCUMENT OBJECT MODEL)
 * ! Todo lo que seleccionemos al principio debe ser seleccionado mediante el document
 * 
 * *Versión de Josué
 * https://github.com/Omiced/album-tracker71 
 * 
 * todo: Opciones de selección
 * ?Clásicas:
 *  getElementById  https://developer.mozilla.org/es/docs/Web/API/Document/getElementById
 *  getElementByClassName  https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName 
 * 
 * *Modernas:
 * Nos permite seleccionar por un selector css
 * 
 * SELECTORES CSS:
 * etiqueta, por ejemplo form
 * clase .  por ejemplo .form
 * id #     por ejemplo  #title
 * 
 * querySelector() si usamos un selector como de clase solo va a seleccionar la primera coincidencia  https://developer.mozilla.org/es/docs/Web/API/Document/querySelector 
 * querySelectorAll  https://developer.mozilla.org/es/docs/Web/API/Document/querySelectorAll
 */

const formElement = document.getElementById("albumForm");
console.log(formElement);

//Aqui también vamos a buscar por ID pero querySelector permite encontrar por otros elementos aparte del id, como la clase o el name.
const albumElement = document.querySelector("#albumContainer");
console.log(albumElement);

/**
 * !EVENTOS
 * Es cualquier acción que realiza el usuario en la página web
 * https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model/Events 
 * 
 * *Escuchar por el evento
 * Escuchamos por un evento para que cuando ocurra desencadene una respuesta
 */

/**
 * Form Data: https://developer.mozilla.org/es/docs/Web/API/FormData
 * *Pasos para extraer info del formulario
 * 1. Agregar un event listener del evento submit
 * 2. Prevenir el comportamiento por defecto
 * 3. Construir un form data dándole el elemento formulario.
 * 4. Extraer la información del form data y guardarla  usando el spread operator
 * El spread operator desempaqueta la información de un iterable y la guarda en otro
 * https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Spread_syntax
 * 5. Crear un objeto con la información usando Object.fromEntries()
 * object from entries recibe un array de arrays
 * https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
 */

formElement.addEventListener("submit",(event)=>{
    event.preventDefault();
    const formData = new FormData(formElement);
    console.log(formData);
    console.log(formData.get("title")); //Obtienes un solo elemento
    const dataArray = [...formData];
    console.log(dataArray);
    const dataObject = Object.fromEntries(dataArray);
    console.log(dataObject);
    //Para hacer todo esto en una sola línea:
    // const album = Object.fromEntries([...newFormData(formElement)]);
});

const card = `
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
      <a href="#" class="card-link">Card link</a>
      <a href="#" class="card-link">Another link</a>
    </div>
  </div>
`;

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