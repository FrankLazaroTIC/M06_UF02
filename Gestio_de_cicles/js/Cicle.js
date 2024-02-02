
class Cicle{
    constructor(nom, categoria, numAlumnes, abreviatura){
        this.nom = nom;
        this.categoria = categoria;
        this.numAlumnes = numAlumnes;
        this.abreviatura = abreviatura;
        this.numEdicions = 0;
        this.ultimaEdicio = null;
        this.moduls = [];
    }

    setNumEdicions(){
        this.numEdicions++;
        this.ultimaEdicio = new Date();
    }

    afegirModul(modul){
        this.moduls.push(modul);
        this.moduls.sort((a, b) => a.num - b.num);
    }

    calcularHores(){
        let hores = 0;
        this.moduls.forEach(modul => {
            hores += parseInt(modul.hores);
        });
        return hores;
    }

    toString(){
        let info = `
            Nom: ${this.nom}
            Categoria: ${this.categoria}
            Num d'alumnes: ${this.numAlumnes}
            Abreviatura: ${this.abreviatura}
            Num d'edicions: ${this.numEdicions}
            Última edició: ${this.ultimaEdicio}
            `;

        if(this.moduls.length > 0){
            info += "Mòduls:\n";
            this.moduls.forEach(modul => {
                info += `  - ${modul.nom} (Num: ${modul.num}, Hores: ${modul.hores})\n`;
            });
        }
        return info;
    }
}

export { Cicle };