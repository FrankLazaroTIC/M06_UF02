			
// POKEMONS
let arrayPokemon = [];
async function pokemonData() {
    try {
        const response = await fetch("js/data/pokemon.json");
        const data = await response.json();
        let dades = data.pokemon;
        for (let index = 0; index < dades.length; index++) {
            let pokemonData = {

                num: dades[index].num,
                name: dades[index].name,
                img: dades[index].img,
                height: dades[index].height,
            };
            arrayPokemon.push(pokemonData);
        }

        displayTable(arrayPokemon);
		//Mostrem els botons per la part 1
		document.getElementById("part1").style.display = "block";
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// MUNICIPIS
async function municipisData() {
    try {
        const response = await fetch("js/data/municipis.json");
        const data = await response.json();

        dades = data.elements;
        let arrayMunicipis = [];

        for (let index = 0; index < dades.length; index++) {
            console.log(dades);
            console.log(dades[index].municipi_nom);
            arrayMunicipis.push(dades[index].name);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


// METEORITS
async function meteoritsData() {
    try {
        const response = await fetch("js/data/earthMeteorites.json");
        const data = await response.json();

        dades = data;
        let arrayMeteorits = [];

        for (let index = 0; index < dades.length; index++) {
            console.log(dades);
            console.log(dades[index].name);
            arrayMeteorits.push(dades[index].name);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


// MOVIES
async function moviesData() {
    try {
        const response = await fetch("js/data/movies.json");
        const data = await response.json();

        dades = data.movies;
        let arrayMovies = [];

        for (let index = 0; index < dades.length; index++) {
            console.log(dades);
            console.log(dades[index].title);
            arrayMovies.push(dades[index].name);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

/*

	Part0

municipisData();
metoritsData();
moviesData();


*/


/*

	Part1

*/


//Funció que inicialitza tot de nou.
function iniciar() {
 location.reload();

}

///Funció que crea la taula en el div "resultat"
function displayTable(pokemonArray) {
    let taulaDiv = document.getElementById("resultat");

    let table = document.createElement("table");
    let headerRow = table.insertRow(0);

    // Mapear los nombres de las columnas para cambiar la presentación
    let arrayColumnes = {
        num: "#",
        img: "Imatge",
        name: "Nom",
        height: "Pes"
        // Agrega más mapeos si es necesario
    };

    // Crear encabezados de columna
    for (let key in pokemonArray[0]) {
        if (pokemonArray[0].hasOwnProperty(key)) {
            let headerCell = document.createElement("th");
            headerCell.textContent = arrayColumnes[key] || key;
            headerRow.appendChild(headerCell);
        }
    }

    // Crear filas de datos
    for (let pokemon of pokemonArray) {
        let fila = table.insertRow();

        for (let key in pokemon) {
            if (pokemon.hasOwnProperty(key)) {
                let cell = fila.insertCell();
                if (key === "img") {
                    // Para la columna "img", insertar una imagen
                    let imatge = document.createElement("img");
                    imatge.src = pokemon[key];
                    imatge.alt = "Pokemon Image";
                    cell.appendChild(imatge);
                } else {
                    // Para otras columnas, insertar texto
                    cell.textContent = pokemon[key];
                }
            }
        }
    }

    taulaDiv.appendChild(table);
}

//Funció que retorna l’array ordenat de manera ascendent o descendent en funció del que se li passi per paràmetre.
function orderList(ordre) {
    let columna = 'num';  // Cambia 'id' por 'num' ya que esa es la propiedad que estás utilizando

    if (ordre === 'asc') {
        arrayPokemon.sort((a, b) => a[columna] - b[columna]);
        displayTable(arrayPokemon);
        alert("Ordenat correctament");
    } else if (ordre === 'desc') {
        arrayPokemon.sort((a, b) => b[columna] - a[columna]);

        // Volver a llamar a la función displayTable para actualizar la tabla
        displayTable(arrayPokemon);
        alert("Ordenat correctament");

    }

    // Limpiar el contenido existente del contenedor
    let tableContainer = document.getElementById("resultat");
    tableContainer.innerHTML = "";

    // Volver a llamar a la función displayTable para actualizar la tabla
    displayTable(arrayPokemon);
}

let resultadoElement;
function calcMitjana() {
    // Eliminar el elemento existente si hay alguno
    if (resultadoElement) {
        resultadoElement.parentNode.removeChild(resultadoElement);
    }

    let arrayPesos = arrayPokemon.map(pokemon => parseFloat(pokemon.weight)); // Obtener un array de pesos como números

    // Calcular la media
    let media = arrayPesos.reduce((total, peso) => total + peso, 0) / arrayPesos.length;

    // Crear un elemento para mostrar el resultado
    resultadoElement = document.createElement("p");
    resultadoElement.textContent = `Mitjana:  ${media.toFixed(2)}`;

    // Insertar el resultado al lado del botón
    let contenedorBoton = document.querySelector("button:nth-child(7)"); // Ajusta el selector según tu HTML
    contenedorBoton.insertAdjacentElement("afterend", resultadoElement);
}

function searchList() {
    // Solicitar al usuario el elemento a buscar
    const searchItem = prompt("Introdueix l'element a buscar:");

    // Verificar si el usuario hizo clic en Cancelar o ingresó un valor vacío
    if (searchItem === null || searchItem.trim() === "") {
        alert("Operació cancel·lada o element buit.");
        return;
    }

    // Buscar la posición del elemento en el array
    const foundIndex = arrayPokemon.findIndex(pokemon => pokemon.name.toLowerCase() === searchItem.toLowerCase());

    if (foundIndex !== -1) {
        // Eliminar la tabla existente
        const tableContainer = document.getElementById("resultat");
        tableContainer.innerHTML = "";

        // Crear una nueva tabla con la fila encontrada
        const newTable = document.createElement("table");
        const headerRow = newTable.insertRow(0);

        // Crear encabezados de columna
        for (let key in arrayPokemon[0]) {
            if (arrayPokemon[0].hasOwnProperty(key)) {
                let headerCell = document.createElement("th");
                headerCell.textContent = key;
                headerRow.appendChild(headerCell);
            }
        }

        // Crear la fila de datos
        const foundPokemon = arrayPokemon[foundIndex];
        const foundRow = newTable.insertRow();
        for (let key in foundPokemon) {
            if (foundPokemon.hasOwnProperty(key)) {
                let cell = foundRow.insertCell();
                if (key === "img") {
                    // Para la columna "img", insertar una imagen
                    let imgElement = document.createElement("img");
                    imgElement.src = foundPokemon[key];
                    imgElement.alt = "Pokemon Image";
                    cell.appendChild(imgElement);
                } else {
                    // Para otras columnas, insertar texto
                    cell.textContent = foundPokemon[key];
                }
            }
        }

        // Mostrar la nueva tabla en el contenedor
        tableContainer.appendChild(newTable);
    } else {
        alert(`L'element "${searchItem}" no es troba a la llista.`);
    }
}
