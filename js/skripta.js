const upozorenje = {
    crveno: ["Prokupac", "Cabernet Sauvignon"],
    belo: "Sauvignon blanc"
};

const boja = {
    plava: "blue",
    crvena: "red"
};

const vina = [{naziv: "Svb Rosa", drzava: "Srbija"}, {naziv: "Port", drzava: "Portugal"},
    {naziv: "Dom", drzava: "Francuska"}];

function proveraForme(forma) {

    if (forma.naziv.value.trim() === "") {
        return false;
    }
    if (forma.drzava.value.trim() === "") {
        return false;
    }
    if (forma.cena.value.trim() === "" || isNaN(forma.cena.value) || Number(forma.cena.value) < 0) {
        return false;
    }
    if (forma.varijanta.value.trim() === "") {
        return false;
    }
    if (forma.sorta.value === "Prazno") {
        return false;
    }
    if ((forma.varijanta.value === "belo" && forma.varijanta.value !== "Sauvignon blanc") || (forma.varijanta.value == "crveno" && forma.varijanta.value == "Sauvignon blanc")) {
        return false;
    }
    for (var i = 0; i < vina.length; i++) {
        if ((forma.naziv.value == vina[i]["naziv"]) != (forma.drzava.value == vina[i]["drzava"])) {
            return false;
        }
    }
    return true;
}

function vineSelect(select) {
    let tekst = document.getElementById("text");

    if (select.value == "crveno") {
        tekst.innerHTML = `${upozorenje.crveno}`;
    } else if (select.value == "belo") {
        tekst.innerHTML = `${upozorenje.belo}`;
    } else {
        tekst.innerHTML = "";
    }
}
