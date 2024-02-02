class Modul {
    constructor(num, nom, hores) {
        this.num = num;
        this.nom = nom;
        this.hores = hores;
    }

    toString() {
        return `MP${this.num}. ${this.nom} (${this.hores}h)`;
    }
}

export { Modul };