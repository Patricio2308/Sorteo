/* Funciones como variables sus 2 formas */
var future = function () {
    return "the future is now";
};
/* function future():string {
    return "the future is now";
} */
var btnAdd = document.querySelector(".addButton");
var input = document.getElementById("textEnter");
var btnDel = document.querySelectorAll(".delButton");
var listPart = document.getElementById("lista");
var btnSorteo = document.querySelector(".sorteo");
var winners = document.querySelectorAll(".winners");
var playersLista = document.querySelectorAll(".player");
function crearButtonDel() {
    var btnElem = document.createElement("button");
    btnElem.setAttribute("type", "submit");
    btnElem.setAttribute("class", "delButton");
    btnElem.textContent = "x";
    btnElem.addEventListener("click", function () {
        var _a;
        (_a = btnElem.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
    });
    return btnElem;
}
/* Texto ingresado con su primer letra en mayuscula */
function crearMayus() {
    var valor = input.value.trim(); /*  Le quita los espacios a los costados */
    var primerCaracter = valor.charAt(0).toUpperCase();
    var restoCadena = valor.substring(1, valor.length);
    return primerCaracter.concat(restoCadena);
}
/* Se crea un elemento "li" y le inserta los atributos, el retorno es la misma "li" */
function crearList() {
    var li = document.createElement("li");
    li.setAttribute("class", "player");
    li.setAttribute("style", "list-style:none;");
    li.textContent = crearMayus();
    li.appendChild(crearButtonDel());
    return li;
}
function agregarPlayer() {
    if (input.value.trim() !== "") {
        list.push(crearMayus());
        /* Alternativo */ /* listPart.innerHTML  = `<li class="player" style="list-style:none ;"> ${input.value} <button type="submit" class="delButton">x</button></li>`; */
        listPart.appendChild(crearList());
        input.value = null;
        console.log(listPart);
        console.log(btnDel);
        playersLista = document.querySelectorAll(".player");
    }
}
/* Ingresa participate al apretar boton */
btnAdd.addEventListener('click', agregarPlayer);
/* Ingresa participate al apretar enter */
input.addEventListener('keypress', function (event) {
    if (event.keyCode == 13) {
        agregarPlayer();
    }
});
/* Elimina participate al apretar boton */
btnDel.forEach(function (element) {
    element.addEventListener("click", function () {
        var _a, _b;
        (_a = element.parentNode) === null || _a === void 0 ? void 0 : _a.remove();
        var jugador = (_b = element.parentNode) === null || _b === void 0 ? void 0 : _b.firstChild;
        var lugar = list.indexOf(jugador);
        list.splice(lugar, 1);
        playersLista = document.querySelectorAll(".player");
    });
});
function getCant() {
    var cant = document.getElementsByName("cant");
    for (var i = 0; i < cant.length; i++) {
        if (cant[i].checked)
            return (cant[i].value);
    }
}
function ganadores(list) {
    var pos = [];
    var cantGanadores = winners.length;
}
function puestosGanadores() {
    var ganadores = [];
    var ganador;
    var pos = 0;
    if (list.length > 0) {
        while (getCant() > ganadores.length) {
            var pos = Math.floor(Math.random() * list.length);
            if (!ganadores.includes(list[pos])) {
                ganadores.push(list[pos]);
                pos++;
            }
        }
        alert("El ganador es " + ganadores[0] + " El segundo puesto es para " + ganadores[1] + " El tercer puesto es para " + ganadores[2]);
    }
    else
        alert("Faltan participantes");
}
btnSorteo.addEventListener("click", function () {
    list = [];
    playersLista.forEach(function (e) {
        var _a, _b;
        list.push((_b = (_a = e.firstChild) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()); /* ingresa participantes a la lista, sin espacios laterales en sus nombres */
    });
    puestosGanadores();
    console.log(list);
});
var list = [];
console.log(list);
