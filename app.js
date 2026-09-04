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
const albums = [];

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
    const album = Object.fromEntries(dataArray);
    console.log(album);
    //Para hacer todo esto en una sola línea:
    // const album = Object.fromEntries([...newFormData(formElement)]);
    albums.push(album);
    //console.log(albums);
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
 * 4. obtener la informacion guardada y mostrarla por si el usuario actualiza
 */