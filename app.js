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
var btnReset = document.querySelector(".reset");
var btnClose = document.querySelector(".cancelBtn");
var sorteoLista = document.querySelectorAll(".player");
var cuadroWinners = document.querySelector(".mostrarWinners");
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
        var jugador = (_a = element.parentNode) === null || _a === void 0 ? void 0 : _a.firstChild;
        var lugar = list.indexOf(jugador);
        list.splice(lugar, 1);
        (_b = element.parentNode) === null || _b === void 0 ? void 0 : _b.remove();
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
function mostrarOrdenGanadores(ganadores) {
    switch (ganadores.length) {
        case 1:
            cuadroWinners.textContent = "El ganador es \"".concat(ganadores[0], "\" ");
            break;
        case 2:
            cuadroWinners.textContent = "El ganador es \"".concat(ganadores[0], "\", el segundo puesto es para \"").concat(ganadores[1], "\" ");
            break;
        case 3:
            cuadroWinners.textContent = "El ganador es \"".concat(ganadores[0], "\", \n                                        el segundo puesto es para \"").concat(ganadores[1], "\" \n                                        y el tercer puesto es para \"").concat(ganadores[2], "\" ");
            break;
        default:
            cuadroWinners.textContent = "Faltan participantes";
            break;
    }
}
function puestosGanadores(list) {
    var ganadores = [];
    var ganador;
    var pos;
    var opcion = getCant();
    ganadores = [];
    if (list.length > 0 && list.length >= opcion) {
        while (opcion > ganadores.length) {
            pos = Math.floor(Math.random() * list.length);
            ganador = list[pos];
            if (ganadores.indexOf(ganador) == -1) {
                ganadores.push(ganador);
            }
        }
        mostrarOrdenGanadores(ganadores);
    }
    else
        cuadroWinners.textContent = "Faltan participantes";
    fondo.setAttribute("style", "display: flex;");
    /* fondo.style.display = "flex"; */
}
btnSorteo.addEventListener("click", function () {
    list = [];
    sorteoLista.forEach(function (e) {
        var _a, _b;
        list.push((_b = (_a = e.firstChild) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()); /* ingresa participantes a la lista, sin espacios laterales en sus nombres */
    });
    puestosGanadores(list);
});
btnClose.addEventListener('keydown', function (event) {
    if (event.keyCode === 27) {
        console.log("CODIGO 27");
        fondo.style.visibility = "hidden";
    }
});
var btnAcceptReset = document.getElementById("acceptReset");
var btnCancelReset = document.getElementById("cancelReset");
var cuadroReset = document.querySelector("#askReset");
/* Se pregunta antes de eliminar y actualizar la lista de los participantes */
btnReset.addEventListener("click", function () {
    cuadroReset.setAttribute("style", "position: fixed; display: flex; flex-direction: column; justify-content: space-around;");
});
/* Cancelar el reset */
btnCancelReset.addEventListener("click", function () {
    cuadroReset === null || cuadroReset === void 0 ? void 0 : cuadroReset.setAttribute("style", "display: none;");
});
/* Aceptar el reset, tiene un peque??o delay entre que acepta y resetea */
btnAcceptReset.addEventListener("click", function () {
    setTimeout(function () {
        listParticipantes.innerHTML = "";
        sorteoLista = document.querySelectorAll(".player");
    }, 200);
    cuadroReset === null || cuadroReset === void 0 ? void 0 : cuadroReset.setAttribute("style", "display: none;");
});
/* Cancela el cuadro donde muestra a los ganadores */
btnClose.addEventListener("click", function () {
    fondo.style.display = "none";
});
fondo.addEventListener("click", function (event) {
    if (event.target === fondo) {
        fondo.style.display = "none";
    }
});
