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
//console.log(formElement);

//Aqui también vamos a buscar por ID pero querySelector permite encontrar por otros elementos aparte del id, como la clase o el name.
const albumElement = document.querySelector("#albumContainer");
//console.log(albumElement);

//!Agregamos la variable de albums para guardar la información:
//Se definió con let para que no dé error en la parte del event listener de volver a cargar la página.
let albums = [];

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

window.addEventListener("load",(event)=>{
    if (getItemLocalStorage("albums")== undefined) return;
    albums = [...getItemLocalStorage("albums")];
    console.log(albums);
    /**
     * Segunda opción:
     * getItemLocalStorage("albums").forEach((album) => albums.push(album));
     */
    //* Con esto renderizamos las cards de la información que ya había en memoria local cuando vuelves a cargar la página para que no se quede en blanco y tengas que comenzar de cero
    albums.map((album)=> renderCard(album, albumElement));
})

formElement.addEventListener("submit",(event)=>{
    event.preventDefault();
    const formData = new FormData(formElement);
    //console.log(formData);
    //console.log(formData.get("title")); //Obtienes un solo elemento
    const dataArray = [...formData];
    //console.log(dataArray);
    const album = Object.fromEntries(dataArray);
    console.log(album);
    //Para hacer todo esto en una sola línea:
    // const album = Object.fromEntries([...newFormData(formElement)]);
    albums.push(album);
    //console.log(albums);
    setLocalStorage("albums",albums);
    //Limpiamos antes de volver a renderizar todas las cards para evitar la acumulación.
    albumElement.innerHTML = "";
    //Renderizamos todas las cards dentro del array de albums
    albums.map((album)=> renderCard(album, albumElement));
    formElement.reset();
});

//Para que se pueda utilizar en distintos lugares ponemos como parámetro de la función al elemento html
const renderCard = (albumObject,htmlElement) =>{
    const card = `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${albumObject.title}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">${albumObject.artist}</h6>
                <p class="card-text">Año: ${albumObject.year}</p>
                <a href="#" class="card-link">Género: ${albumObject.genre}</a>
                <a href="#" class="card-link">Rating: ${albumObject.rating}</a>
            </div>
        </div>
    `;
    htmlElement.insertAdjacentHTML("beforeend", card);
};

//Versión para sólo este script:
/**
const renderCard = (albumObject) =>{
    const card = `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${albumObject.title}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">${albumObject.artist}</h6>
                <p class="card-text">${albumObject.year}</p>
                <a href="#" class="card-link">${albumObject.genre}</a>
                <a href="#" class="card-link">${albumObject.rating}</a>
            </div>
        </div>
    `;
    albumElement.insertAdjacentHTML("beforeend", card);
};
*/

/**
 * *EN EL DÍA DOS LOS ELEMENTOS A AÑADIR SON:
 * 1. Crear un array para almacenar los albums
 * 1.1 cada que creemos un album guardarlo en el array
 * 2. renderizar todos los albums del array, no solo uno
 * 3.  Usar localstorage para almacenar la info
 * https://developer.mozilla.org/es/docs/Web/API/Window/localStorage
 * 4. obtener la informacion guardada y mostrarla por si el usuario actualiza
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
 * 
 */

const setLocalStorage = (key,value) => {
    //Paso 1: Convertir el valor a texto
    const textValue = JSON.stringify(value);
    //Paso 2: Almacenar
    localStorage.setItem(key,textValue);
};

const getItemLocalStorage = (key)=>{
    //https://dev.to/arikaturika/one-concept-a-day-early-return-pattern-in-javascript-3pol 
    //Escribimos la primera parte para planificar por si hay algún error o el dato que se dió no era el esperado
    if(localStorage.getItem(key) == null) return;
    //Convertimos de texto a lenguaje js (lo opuesto a lo que se hizo en setLocalStorage)
    const data = JSON.parse(localStorage.getItem(key));
    return data;
};

