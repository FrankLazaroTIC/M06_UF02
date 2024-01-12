			
// POKEMONS

let dades;

let arrayPokemon = [];

// POKEMONS
async function pokemonData() {
    try {
        const response = await fetch("js/data/pokemon.json");
        const data = await response.json();

        dades = data.pokemon;

        for (let index = 0; index < dades.length; index++) {
            let pokemonData = {
                num: dades[index].num,
                img: dades[index].img,
                name: dades[index].name,
                weight: dades[index].weight,
            };
            arrayPokemon.push(pokemonData);
        }

        displayTable(arrayPokemon);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


function iniciar(){
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
    resultadoElement.textContent = `La media de peso es: ${media.toFixed(2)}`;

    // Insertar el resultado al lado del botón
    let contenedorBoton = document.querySelector("button:nth-child(7)"); // Ajusta el selector según tu HTML
    contenedorBoton.insertAdjacentElement("afterend", resultadoElement);
}