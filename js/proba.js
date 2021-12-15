var k;
var vinoteke = [];
var aktivnaVinoteka = null;
function promeniAktivnu(selekt) {
    aktivnaVinoteka = vinoteke.filter(function (elem) { return elem.id == Number(selekt.value); })[0];
    refreshIspis();
}
var Vino = /** @class */ (function () {
    function Vino(naziv, cena, varijanta) {
        this.naziv = naziv;
        this.cena = cena;
        this.varijanta = varijanta;
    }
    return Vino;
}());
var Vinoteka = /** @class */ (function () {
    function Vinoteka(id, naziv) {
        this._id = id;
        this._naziv = naziv;
        this._vina = [];
    }
    Object.defineProperty(Vinoteka.prototype, "id", {
        /**
         * Getter id
         * @return {number}
         */
        get: function () {
            return this._id;
        },
        /**
         * Setter id
         * @param {number} value
         */
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vinoteka.prototype, "naziv", {
        /**
         * Getter naziv
         * @return {string}
         */
        get: function () {
            return this._naziv;
        },
        /**
         * Setter naziv
         * @param {string} value
         */
        set: function (value) {
            this._naziv = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vinoteka.prototype, "vina", {
        /**
         * Getter vina
         * @return {Vino[]}
         */
        get: function () {
            return this._vina;
        },
        enumerable: false,
        configurable: true
    });
    Vinoteka.prototype.dodajVino = function (vino) {
        this._vina.push(vino);
    };
    Vinoteka.prototype.najzastupljenijaVarijanta = function () {
        var output = document.getElementById("varijante");
        var crno = this._vina.filter(function (el) { return el.varijanta == "Crno"; });
        var belo = this._vina.filter(function (el) { return el.varijanta == "Belo"; });
        var rose = this._vina.filter(function (el) { return el.varijanta == "Rose"; });
        var najzastupljenije = [];
        if (crno.length > belo.length && crno.length > rose.length) {
            najzastupljenije = crno;
        }
        else if (belo.length > rose.length) {
            najzastupljenije = belo;
        }
        else {
            najzastupljenije = rose;
        }
        if (najzastupljenije.length == 0) {
            output.innerHTML = "<h3> Vinoteka, ".concat(aktivnaVinoteka.naziv, ", jos nema vina na prodaju. </h3>");
        }
        else {
            output.innerHTML = "<h3> Najzastupljenija varijanta za vinoteku, ".concat(aktivnaVinoteka.naziv, " je <br>\n                ").concat(najzastupljenije[0].varijanta, " sa ukupno kupljenih ").concat(najzastupljenije.length, " vina.</h3>");
        }
    };
    Vinoteka.prototype.najskupljaVarijanta = function () {
        var output = document.getElementById("varijante");
        var crnoVino = this._vina.filter(function (el) { return el.varijanta == "Crno"; });
        var beloVino = this._vina.filter(function (el) { return el.varijanta == "Belo"; });
        var roseVino = this._vina.filter(function (el) { return el.varijanta == "Rose"; });
        var najskupljaVarijanta = [];
        if (crnoVino.reduce(function (prev, next) { return prev + next.cena; }, 0) >= beloVino.reduce(function (prev, next) { return prev + next.cena; }, 0) && crnoVino.reduce(function (prev, next) { return prev + next.cena; }, 0) >= roseVino.reduce(function (prev, next) { return prev + next.cena; }, 0)) {
            najskupljaVarijanta = crnoVino;
        }
        else if (beloVino.reduce(function (prev, next) { return prev + next.cena; }, 0) >= roseVino.reduce(function (prev, next) { return prev + next.cena; }, 0)) {
            najskupljaVarijanta = beloVino;
        }
        else {
            najskupljaVarijanta = roseVino;
        }
        if (najskupljaVarijanta.length == 0) {
            output.innerHTML = "<h3> Vinoteka ".concat(aktivnaVinoteka.naziv, ", jos nema vina na prodaju. </h3>");
        }
        else {
            output.innerHTML = "<h3> Najskuplja varijanta u vinoteci ".concat(aktivnaVinoteka.naziv, " je <br>\n                ").concat(najskupljaVarijanta[0].naziv, " sa prosecnom cenom po vinu ").concat(najskupljaVarijanta.reduce(function (prev, next) { return prev + next.cena; }, 0) / najskupljaVarijanta.length, " </h3>");
        }
    };
    Vinoteka.prototype.getNajskuplji = function () {
        return this._vina.reduce(function (prev, next) {
            if (prev.cena > next.cena) {
                return prev;
            }
            else {
                return next;
            }
        });
    };
    Vinoteka.prototype.getNajeftinije = function () {
        return this._vina.reduce(function (prev, next) {
            if (prev.cena < next.cena) {
                return prev;
            }
            else {
                return next;
            }
        });
    };
    return Vinoteka;
}());
function refreshIspis() {
    var output = "<ul class=\"list-group\">";
    for (var i = 0; i < aktivnaVinoteka.vina.length; i++) {
        var klasa = "";
        if (aktivnaVinoteka.vina.length > 0 && aktivnaVinoteka.vina[i].naziv == aktivnaVinoteka.getNajskuplji().naziv) {
            klasa = "list-group-item-danger";
        }
        if (aktivnaVinoteka.vina.length > 0 && aktivnaVinoteka.vina[i].naziv == aktivnaVinoteka.getNajeftinije().naziv) {
            klasa = "list-group-item-success";
        }
        output += "<li class=\"list-group-item ".concat(klasa, "\">").concat(aktivnaVinoteka.vina[i].naziv) +
            " (".concat(aktivnaVinoteka.vina[i].varijanta, ") ") +
            "<span class=\"badge\">".concat(aktivnaVinoteka.vina[i].cena, "</span></li>");
    }
    document.getElementById("vina").innerHTML = output;
}
function wireEvents() {
    document.getElementById("dodajVino").onclick = function () {
        var naziv = document.getElementById("naziv");
        var cena = document.getElementById("cena");
        var varijanta = document.getElementById("varijanta");
        var v = new Vino(naziv.value, Number(cena.value), varijanta.value);
        aktivnaVinoteka.dodajVino(v);
        refreshIspis();
    };
    document.getElementById("najzastupljenijaVarijanta").onclick = function () {
        aktivnaVinoteka.najzastupljenijaVarijanta();
    };
    document.getElementById("najskupljaVarijanta").onclick = function () {
        aktivnaVinoteka.najskupljaVarijanta();
    };
}
window.onload = function () {
    k.forEach(function (elem) {
        var s = new Vinoteka(Number(elem.id), elem.naziv);
        elem.vina.forEach(function (elem) {
            var p = new Vino(elem.naziv, Number(elem.cena), elem.varijanta);
            s.dodajVino(p);
        });
        vinoteke.push(s);
        if (aktivnaVinoteka == null) {
            aktivnaVinoteka = s;
        }
    });
    var selekt = document.getElementById("vinoteka");
    var output = "";
    for (var i = 0; i < vinoteke.length; i++) {
        var optionElem = "<option value=".concat(vinoteke[i].id, ">").concat(vinoteke[i].naziv, "</option>");
        output += optionElem;
    }
    selekt.innerHTML = output;
    refreshIspis();
    wireEvents();
};
//# sourceMappingURL=proba.js.map