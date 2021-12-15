var k: any;
let vinoteke: Vinoteka[] = [];
let aktivnaVinoteka: Vinoteka = null;

function promeniAktivnu(selekt: HTMLSelectElement) {
    aktivnaVinoteka = vinoteke.filter((elem) => elem.id == Number(selekt.value))[0];
    refreshIspis();
}


class Vino {
    naziv: string;
    cena: number;
    varijanta: string;

    constructor(naziv: string, cena: number, varijanta: string) {
        this.naziv = naziv;
        this.cena = cena;
        this.varijanta = varijanta;
    }
}

class Vinoteka {
    private _id: number;
    private _naziv: string;
    private _vina: Vino[];

    constructor(id: number, naziv: string) {
        this._id = id;
        this._naziv = naziv;
        this._vina = [];
    }

    public get id(): number {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }

    public get naziv(): string {
        return this._naziv;
    }

    public set naziv(value: string) {
        this._naziv = value;
    }

    public get vina(): Vino[] {
        return this._vina;
    }

    dodajVino(vino: Vino): void {
        this._vina.push(vino);
    }

    najzastupljenijaVarijanta(): void {
        let output = document.getElementById("varijante");
        let crno: Vino[] = this._vina.filter(el => el.varijanta == "Crno");
        let belo: Vino[] = this._vina.filter(el => el.varijanta == "Belo");
        let rose: Vino[] = this._vina.filter(el => el.varijanta == "Rose");
        let najzastupljenije: Vino[] = [];

        if (crno.length > belo.length && crno.length > rose.length) {
            najzastupljenije = crno;
        } else if (belo.length > rose.length) {
            najzastupljenije = belo;
        } else {
            najzastupljenije = rose;
        }

        if (najzastupljenije.length == 0) {
            output.innerHTML = `<h3> Vinoteka, ${aktivnaVinoteka.naziv}, jos nema vina na prodaju. </h3>`
        } else {
            output.innerHTML = `<h3> Najzastupljenija varijanta za vinoteku, ${aktivnaVinoteka.naziv} je <br>
                ${najzastupljenije[0].varijanta} sa ukupno kupljenih ${najzastupljenije.length} vina.</h3>`
        }
    }

    najskupljaVarijanta(): void {
        let output = document.getElementById("varijante");
        let crnoVino: Vino[] = this._vina.filter(el => el.varijanta == "Crno");
        let beloVino: Vino[] = this._vina.filter(el => el.varijanta == "Belo");
        let roseVino: Vino[] = this._vina.filter(el => el.varijanta == "Rose");
        let najskupljaVarijanta: Vino[] = [];

        if (crnoVino.reduce((prev, next) => prev + next.cena, 0) >= beloVino.reduce((prev, next) => prev + next.cena, 0) && crnoVino.reduce((prev, next) => prev + next.cena, 0) >= roseVino.reduce((prev, next) => prev + next.cena, 0)) {
            najskupljaVarijanta = crnoVino;
        } else if (beloVino.reduce((prev, next) => prev + next.cena, 0) >= roseVino.reduce((prev, next) => prev + next.cena, 0)) {
            najskupljaVarijanta = beloVino;
        } else {
            najskupljaVarijanta = roseVino;
        }

        if (najskupljaVarijanta.length == 0) {
            output.innerHTML = `<h3> Vinoteka ${aktivnaVinoteka.naziv}, jos nema vina na prodaju. </h3>`;
        } else {
            output.innerHTML = `<h3> Najskuplja varijanta u vinoteci ${aktivnaVinoteka.naziv} je <br>
                ${najskupljaVarijanta[0].naziv} sa prosecnom cenom po vinu ${najskupljaVarijanta.reduce((prev, next) => prev + next.cena, 0) / najskupljaVarijanta.length} </h3>`
        }

    }

    getNajskuplji(): Vino {
        return this._vina.reduce((prev: Vino, next: Vino) => {
            if (prev.cena > next.cena) {
                return prev;
            } else {
                return next;
            }
        })
    }

    getNajeftinije(): Vino {
        return this._vina.reduce((prev: Vino, next: Vino) => {
            if (prev.cena < next.cena) {
                return prev;
            } else {
                return next;
            }
        })
    }
}

function refreshIspis(): void {
    let output: string = `<ul class="list-group">`;

    for (let i = 0; i < aktivnaVinoteka.vina.length; i++) {

        let klasa = "";
        if (aktivnaVinoteka.vina.length > 0 && aktivnaVinoteka.vina[i].naziv == aktivnaVinoteka.getNajskuplji().naziv) {
            klasa = "list-group-item-danger";
        }
        if (aktivnaVinoteka.vina.length > 0 && aktivnaVinoteka.vina[i].naziv == aktivnaVinoteka.getNajeftinije().naziv) {
            klasa = "list-group-item-success";
        }
        output += `<li class="list-group-item ${klasa}">${aktivnaVinoteka.vina[i].naziv}` +
            ` (${aktivnaVinoteka.vina[i].varijanta}) ` +
            `<span class="badge">${aktivnaVinoteka.vina[i].cena}</span></li>`;
    }

    document.getElementById("vina").innerHTML = output;
}

function wireEvents(): void {

    document.getElementById("dodajVino").onclick = () => {
        let naziv: HTMLInputElement = document.getElementById("naziv") as HTMLInputElement;
        let cena: HTMLInputElement = document.getElementById("cena") as HTMLInputElement;
        let varijanta: HTMLSelectElement = document.getElementById("varijanta") as HTMLSelectElement;
        let v: Vino = new Vino(naziv.value, Number(cena.value), varijanta.value);
        aktivnaVinoteka.dodajVino(v);
        refreshIspis();
    };

    document.getElementById("najzastupljenijaVarijanta").onclick = function () {
        aktivnaVinoteka.najzastupljenijaVarijanta();
    }

    document.getElementById("najskupljaVarijanta").onclick = function () {
        aktivnaVinoteka.najskupljaVarijanta();
    }
}


window.onload = function () {
    k.forEach((elem) => {
        let s: Vinoteka = new Vinoteka(Number(elem.id), elem.naziv);
        elem.vina.forEach((elem) => {
            let p: Vino = new Vino(elem.naziv, Number(elem.cena), elem.varijanta);
            s.dodajVino(p);
        });
        vinoteke.push(s);
        if (aktivnaVinoteka == null) {
            aktivnaVinoteka = s;
        }
    });

    let selekt: HTMLElement = document.getElementById("vinoteka");
    let output: string = "";
    for (let i = 0; i < vinoteke.length; i++) {
        let optionElem = `<option value=${vinoteke[i].id}>${vinoteke[i].naziv}</option>`;
        output += optionElem;
    }
    selekt.innerHTML = output;
    refreshIspis();
    wireEvents();
}
