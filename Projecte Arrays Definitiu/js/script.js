			
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

        // Creem la taula
        displayTablePokemon(arrayPokemon);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
function displayTablePokemon(pokemonArray) {
    let taulaDiv = document.getElementById("resultat");
    taulaDiv.innerHTML = "";

    let table = document.createElement("table");
    let headerRow = table.insertRow(0);

    // Fem un array per assignar el noms a les columnes
    let arrayColumnes = {
        num: "#",
        img: "Imatge",
        name: "Nom",
        height: "Pes"
    };

    for (let key in pokemonArray[0]) {
        if (pokemonArray[0].hasOwnProperty(key)) {
            let headerCell = document.createElement("th");
            headerCell.textContent = arrayColumnes[key] || key;
            headerRow.appendChild(headerCell);
        }
    }

    // Creem les files amb les dades
    for (let pokemon of pokemonArray) {
        let fila = table.insertRow();

        for (let key in pokemon) {
            if (pokemon.hasOwnProperty(key)) {
                let cell = fila.insertCell();
                if (key === "img") {
                    // Per mostrar les imatges 
                    let imatge = document.createElement("img");
                    imatge.src = pokemon[key];
                    imatge.alt = "Pokemon Image";
                    cell.appendChild(imatge);
                } else {
                    // En cas contrari els afegim com a text
                    cell.textContent = pokemon[key];
                }
            }
        }
    }

    taulaDiv.appendChild(table);
}

// MUNICIPIS
let arrayMunicipis = [];
async function municipisData() {
    try {
        const response = await fetch("js/data/municipis.json");
        const data = await response.json();

        dades = data.elements;

        for (let index = 0; index < dades.length; index++) {
            let municipiData = {
                id: dades[index].ine,
                name: dades[index].municipi_nom,
                img: dades[index].municipi_escut,
                population: dades[index].nombre_habitants,
                area: dades[index].extensio,
                altitude: dades[index].altitud
            };
            arrayMunicipis.push(municipiData);
        }

        displayTable(arrayMunicipis,"resultat");
        document.getElementById("resultat").style.display = "block";
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// METEORITS
let arrayMeteorits = [];

async function meteoritsData() {
    try {
        const response = await fetch("js/data/earthMeteorites.json");
        const data = await response.json();

        for (let index = 0; index < data.length; index++) {
            let meteoritData = {
                id: data[index].id,
                name: data[index].name,
                mass: data[index].mass,
            };
            arrayMeteorits.push(meteoritData);
        }

        // Creem la taula
        displayTable(arrayMeteorits, "resultat");
        document.getElementById("resultat").style.display = "block";
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// MOVIES
let arrayMovies = [];
async function moviesData() {
    try {
        const response = await fetch("js/data/movies.json");
        const data = await response.json();

        let dades = data.movies;

        for (let index = 0; index < dades.length; index++) {
            let movieData = {
                title: dades[index].title,
                //plot: dades[index].plot,
                genres: dades[index].genres.join(", "), // Convertim el array en cadenes
                year: dades[index].year,
                img: dades[index].url,
                rating: dades[index].rating,
                countries: dades[index].countries.join(", "), 
                language: dades[index].language.join(", ") 
            };
            arrayMovies.push(movieData);
        }

        // Creem la taula
        displayTable(arrayMovies,"resultat");
        document.getElementById("resultat").style.display = "block";
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

//Mostrar taula
function displayTable(dataArray, tableId) {
    let tableContainer = document.getElementById(tableId);

    // Si hi ha una taula la borrem i inicialitzem un altre
    tableContainer.innerHTML = "";

    let table = document.createElement("table");
    table.classList.add("custom-table");

    let headerRow = table.insertRow();
    for (let key in dataArray[0]) {
        if (dataArray[0].hasOwnProperty(key)) {
            let headerCell = document.createElement("th");
            headerCell.textContent = key.charAt(0).toUpperCase() + key.slice(1); // La primera lletra majuscula
            headerCell.addEventListener("click", function() {
                sortTable(dataArray, key, tableId); // Pasem la funcio al headerRow
            });
            headerRow.appendChild(headerCell);
        }
    }

    for (let item of dataArray) {
        let dataRow = table.insertRow();
        for (let key in item) {
            if (item.hasOwnProperty(key)) {
                let cell = dataRow.insertCell();
                if (key === "img") {
                    let imgElement = document.createElement("img");
                    imgElement.src = item[key];
                    imgElement.alt = "Image";
                    imgElement.classList.add("table-img");
                    cell.appendChild(imgElement);
                } else {
                    cell.textContent = item[key];
                }
            }
        }
    }

    // Afegim la taula
    tableContainer.appendChild(table);
}


/*

	Part1

*/


/*
    Nomes funciona per la taula Pokemon

*/

//Funció que retorna l’array ordenat de manera ascendent o descendent en funció del que se li passi per paràmetre.
function orderList(ordre) {
    let columna = 'num';  

    if (ordre === 'asc') {
        arrayPokemon.sort((a, b) => a[columna] - b[columna]);
        displayTablePokemon(arrayPokemon);
    } else if (ordre === 'desc') {
        arrayPokemon.sort((a, b) => b[columna] - a[columna]);
        displayTablePokemon(arrayPokemon);

    }

    // Limpiar el contenido existente del contenedor
    let tableContainer = document.getElementById("resultat");
    tableContainer.innerHTML = " ";

    // Volver a llamar a la función displayTable para actualizar la tabla
    displayTablePokemon(arrayPokemon);
}

let resultadoElement;
function calcMitjana() {

    if (resultadoElement) {
        resultadoElement.parentNode.removeChild(resultadoElement);
    }

    let arrayPesos = arrayPokemon.map(pokemon => parseFloat(pokemon.weight)); // Ens guardem a un array els pesos de tots els pokemons

    // Fem el calcul
    let media = arrayPesos.reduce((total, peso) => total + peso, 0) / arrayPesos.length;

    // Creem l'element on mostrarem el pes
    resultadoElement = document.createElement("p");
    resultadoElement.textContent = `Mitjana:  ${media.toFixed(2)}`;

    // Fem que el resultat es mostri
    let contenedorBoton = document.querySelector("button:nth-child(7)");
    contenedorBoton.insertAdjacentElement("afterend", resultadoElement);
}

function sortTable(dataArray, columnName, tableId) {
    const columnIndex = Object.keys(dataArray[0]).indexOf(columnName);

    if (columnIndex === -1) {
        console.error("No hem trobat la columna", columnName);
        return;
    }

    dataArray.sort((a, b) => {
        const valueA = a[Object.keys(a)[columnIndex]];
        const valueB = b[Object.keys(b)[columnIndex]];
        const numA = parseFloat(valueA);
        const numB = parseFloat(valueB);

        if (!isNaN(numA) && !isNaN(numB)) {
            return numA - numB;
            return String(valueA).localeCompare(String(valueB));
        }
    });

    displayTable(dataArray, tableId);
}

// Inicialitza tot de nou.
function iniciar(){
    location.reload();
}

/*
function searchList() {
    const searchItem = prompt("Introdueix l'element a buscar:");

    if (searchItem === null || searchItem.trim() === "") {
        alert("Operació cancel·lada o element buit.");
        return;
    }

    const foundIndex = arrayPokemon.findIndex(pokemon => pokemon.name.toLowerCase() === searchItem.toLowerCase());

    if (foundIndex !== -1) {
        const tableContainer = document.getElementById("resultat");
        tableContainer.innerHTML = "";

        const newTable = document.createElement("table");
        const headerRow = newTable.insertRow(0);

        for (let key in arrayPokemon[0]) {
            if (arrayPokemon[0].hasOwnProperty(key)) {
                let headerCell = document.createElement("th");
                headerCell.textContent = key;
                headerRow.appendChild(headerCell);
            }
        }

        const foundPokemon = arrayPokemon[foundIndex];
        const foundRow = newTable.insertRow();
        for (let key in foundPokemon) {
            if (foundPokemon.hasOwnProperty(key)) {
                let cell = foundRow.insertCell();
                if (key === "img") {
                    let imgElement = document.createElement("img");
                    imgElement.src = foundPokemon[key];
                    imgElement.alt = "Pokemon Image";
                    cell.appendChild(imgElement);
                } else {
                    cell.textContent = foundPokemon[key];
                }
            }
        }

        tableContainer.appendChild(newTable);
    } else {
        alert(`L'element "${searchItem}" no es troba a la llista.`);
    }
}
*/


/*

Parte 2

*/

let arrayLabels; // Guardem els tipus
let arrayDadesGraf; // Guardem la quantitat de pokemons que hi ha per tipus
let backgroundColor; // Color de fons
let borderColor;

arrayLabels = ["Grass", "Poison", "Fire", "Flying", "Water", "Bug", "Normal", "Electric", "Ground", "Fighting", "Psychic", "Rock", "Ice", "Ghost", "Dragon"];
arrayDadesGraf = [14, 33, 12, 19, 32, 12, 24, 9, 14, 8, 14, 11, 5, 3, 3];

// Especifiquem l'estil del grafic
borderColor = arrayLabels.map(() => getRandomColor());
backgroundColor = borderColor.map(color => color.replace(")", ", 0.2)").replace("rgb", "rgba"));

// Generem colors aleatoris
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Creem el grafic
const config = {
    type: 'polarArea',
    data: {
        labels: arrayLabels,
        datasets: [{
            label: 'Quantitat de Pokemons per tipus',
            data: arrayDadesGraf,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};

function mostrarGrafico() {
    const myChart = new Chart(document.getElementById('myChart'), config);
    document.getElementById('myChart').style.display = 'block';
}

    let arrayLabelsMovies = [
        "Drama", "Crime", "Action", "Thriller", "Biography", "History", "Adventure",
        "Fantasy", "Western", "Romance", "Sci-Fi", "Mystery", "Comedy", "War", "Family",
        "Animation", "Musical", "Music", "Horror", "Film-Noir", "Sport"
    ];

    let arrayDadesGrafMovies = [
        185, 53, 39, 60, 27, 15, 57, 28, 8, 27, 32, 33, 44, 28, 25, 22, 5, 8, 4, 6, 10
    ];

    let borderColorArrayMovies = arrayLabelsMovies.map(() => getRandomColor());
    let backgroundColorArrayMovies = borderColorArrayMovies.map(color => color.replace(")", ", 0.2)").replace("rgb", "rgba"));

    const configMovies = {
        type: 'polarArea',
        data: {
            labels: arrayLabelsMovies,
            datasets: [{
                label: 'Quantitat de pelis per genere',
                data: arrayDadesGrafMovies,
                backgroundColor: backgroundColorArrayMovies,
                borderColor: borderColorArrayMovies,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    }

function mostrarGraficoMovies() {
    const moviesChart = new Chart(document.getElementById('moviesChart'), configMovies);
    document.getElementById('moviesChart').style.display = 'block';
}

/*

Parte 3

*/

    // Funció per filtrar en temps real
    function filterList() {
        const searchTerm = document.getElementById('txtSearch').value.toLowerCase();
        const filteredList = arrayPokemon.filter(pokemon =>
            Object.values(pokemon).some(value => value.toString().toLowerCase().includes(searchTerm))
        );

        // Mostrem una taula amb els resultats
        displayTablePokemon(filteredList);
    }

    addSortEvents();