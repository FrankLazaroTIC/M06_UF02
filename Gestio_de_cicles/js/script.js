import { Cicle } from './Cicle.js';
import { Modul } from './Modul.js';

let llistatCicles = [];

function afegirCicle() {
    let nom = document.getElementById("cicle_nom").value;
    let categoria = document.getElementById("cicle_categoria").value;
    let numAlumnes = document.getElementById("cicle_alumnes").value;
    let abreviatura = document.getElementById("cicle_abr").value;

    let cicle = new Cicle(nom, categoria, numAlumnes, abreviatura);
    
    if (document.getElementById("editCicle").value === "-1") {
        llistatCicles.push(cicle);
    } else {
        let index = parseInt(document.getElementById("editCicle").value);

        if (index >= 0 && index < llistatCicles.length) {
            llistatCicles[index].nom = nom;
            llistatCicles[index].categoria = categoria;
            llistatCicles[index].numAlumnes = numAlumnes;
            llistatCicles[index].abreviatura = abreviatura;
        }
        netejarFormularis();
    }
    
    actualitzarSelector();
    printLlistat(llistatCicles);
    netejarFormularis();

    document.getElementById("editCicle").value = -1;
}

function afegirModul() {
    let cicleIndex = document.getElementById("modul_cicle").value;
    let modul_nom = document.getElementById("modul_nom").value;
    let modul_num = document.getElementById("modul_num").value;
    let modul_hores = document.getElementById("modul_hores").value;

    if (!isNaN(cicleIndex) && cicleIndex >= 0 && cicleIndex < llistatCicles.length) {
        let modul = new Modul(modul_num, modul_nom, modul_hores);
        llistatCicles[cicleIndex].afegirModul(modul);
        printLlistat(llistatCicles);
        netejarFormularis();
    } else {
        alert('Índice de cicle no válido.');
    }
}


function calculHores(cicleIndex) {
    if (!isNaN(cicleIndex) && cicleIndex >= 0 && cicleIndex < llistatCicles.length) {
        let hores = llistatCicles[cicleIndex].moduls.reduce((total, modul) => total + parseInt(modul.hores), 0);
        alert(`El cicle té un total de ${hores} hores.`);
    } else {
        alert('Índice de cicle no válido.');
    }
}


function removeCicle(i) {
    llistatCicles.splice(i, 1);
    printLlistat(llistatCicles);
    actualitzarSelector();
}

function editCicle(i) {
    if (i !== -1) {
        document.getElementById("cicle_nom").value = llistatCicles[i].nom;
        document.getElementById("cicle_categoria").value = llistatCicles[i].categoria;
        document.getElementById("cicle_alumnes").value = llistatCicles[i].numAlumnes;
        document.getElementById("cicle_abr").value = llistatCicles[i].abreviatura;

        document.getElementById("editCicle").value = i;
    }
}

function printLlistat(llistat) {

    let str = "";
    llistat.forEach(function (element, index) {
        str += `<div class="block p-6 mb-3 w-full bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${element.abreviatura.toUpperCase()}. ${element.nom}</h5>
            <h6 class="text-gray-700">${element.categoria}</h6>
            <p class="font-normal text-gray-700">Num d'alumnes: ${element.numAlumnes}</p>`;

        if (element.moduls && element.moduls.length > 0) {  
            str += `<p class="font-normal text-gray-700">Nom dels mòduls: `;
            element.moduls.forEach((modul, index) => {
                str += `${modul.nom}`;
                if (index < element.moduls.length - 1) {
                    str += ', ';
                }
            });
            str += `</p>`;
        } else {
            str += `<p class="font-normal text-gray-700">No hi ha mòduls per a aquest cicle</p>`;
        }
        str += `<button type="button" onClick="removeCicle(${index})" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Eliminar</button>
                <button type="button" onClick="editCicle(${index})" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Editar</button>
                <button type="button" onClick="calculHores(${index})" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Càlcul hores</button>
            </div>`;
    });
    document.getElementById("llistat").innerHTML = str;
}

function actualitzarSelector() {
    let select = document.getElementById('modul_cicle');
    select.innerHTML = "";
    if (llistatCicles.length > 0) {
        llistatCicles.forEach(function (element, index) {
            let opt = document.createElement('option');
            opt.value = index;
            opt.text = element.nom;
            select.appendChild(opt);
        });
    }
    
}


function netejarFormularis() {
    var inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }

    var selects = document.getElementsByTagName("select");
    for (let i = 0; i < selects.length; i++) {
        selects[i].value = 0;
    }
}


document.getElementById("btnAfegirCicle").addEventListener("click", afegirCicle);
document.getElementById("btnAfegirModul").addEventListener("click", afegirModul);

window.editCicle = editCicle;
window.calculHores = calculHores;
window.netejarFormularis = netejarFormularis;
window.actualitzarSelector = actualitzarSelector;
window.removeCicle = removeCicle;