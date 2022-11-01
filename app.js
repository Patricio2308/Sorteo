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
var listParticipantes = document.getElementById("lista");
var btnSorteo = document.querySelector(".sorteo");
var winners = document.querySelectorAll(".winners");
var sorteoLista = document.querySelectorAll(".player");
var cuadroWinners = document.querySelector(".winners");
var fondo = document.querySelector(".blurryBack");
var list = [];
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
        /* Alternativo */ /* listParticipantes.innerHTML  = `<li class="player" style="list-style:none ;"> ${input.value} <button type="submit" class="delButton">x</button></li>`; */
        listParticipantes.appendChild(crearList());
        input.value = null;
        console.log(listParticipantes);
        console.log(btnDel);
        sorteoLista = document.querySelectorAll(".player");
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
        sorteoLista = document.querySelectorAll(".player");
    });
});
function getCant() {
    var cant = document.getElementsByName("cant");
    for (var i = 0; i < cant.length; i++) {
        if (cant[i].checked)
            return (cant[i].value);
    }
}
/* function ganadores(list) {
    const pos:number[] = [];
    var cantGanadores:number = winners.length;
} */
function mostrarGanadores(ganadores) {
    fondo.setAttribute("display", "flex");
    fondo.style.display = "flex";
    cuadroWinners.textContent = "\"El ganador es \"+ ".concat(ganadores[0], " ");
}
function puestosGanadores(list) {
    var ganadores = [];
    var ganador;
    var pos = 0;
    var opcion = getCant();
    if (list.length > 0) {
        while (opcion > ganadores.length) {
            pos = Math.floor(Math.random() * list.length);
            ganador = list[pos];
            if (ganadores.indexOf(ganador) == -1) {
                ganadores.push(ganador);
            }
        }
        mostrarGanadores(ganadores);
        /*             alert("El ganador es "+ ganadores[0] + " El segundo puesto es para "+ ganadores[1] + " El tercer puesto es para "+ ganadores[2]);
         */ }
    else
        alert("Faltan participantes");
}
btnSorteo.addEventListener("click", function () {
    list = [];
    sorteoLista.forEach(function (e) {
        var _a, _b;
        list.push((_b = (_a = e.firstChild) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()); /* ingresa participantes a la lista, sin espacios laterales en sus nombres */
    });
    puestosGanadores(list);
    console.log(list);
});
fondo.addEventListener("click", function () {
    fondo.style.display = "none";
});
console.log(list);
