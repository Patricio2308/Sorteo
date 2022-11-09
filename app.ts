
/* Funciones como variables sus 2 formas */
var future = function():string {
    return "the future is now";
};
/* function future():string {
    return "the future is now";
} */

const btnAdd:any = document.querySelector(".addButton");
const input:any = document.getElementById("textEnter");
const btnDel:any = document.querySelectorAll(".delButton");
const listParticipantes:any = document.getElementById("lista");
const btnSorteo:any = document.querySelector(".sorteo");
const btnReset:any = document.querySelector(".reset");
const btnClose:any = document.querySelector(".cancelBtn");
let sorteoLista = document.querySelectorAll(".player");
const cuadroWinners:any = document.querySelector(".mostrarWinners");
const fondo:any = document.querySelector(".blurryBack");
let list:any[] = [];


    
    function crearButtonDel() {
        const btnElem = document.createElement("button");
        btnElem.setAttribute("type", "submit");
        btnElem.setAttribute("class","delButton");
        btnElem.textContent = "x";
        btnElem.addEventListener("click", () => {
            btnElem.parentElement?.remove();
        })
        return btnElem;
    } 
    /* Texto ingresado con su primer letra en mayuscula */
    function crearMayus(){
        const valor = input.value.trim(); /*  Le quita los espacios a los costados */
        const primerCaracter = valor.charAt(0).toUpperCase();
        const restoCadena = valor.substring(1, valor.length);
        return primerCaracter.concat(restoCadena);
    }
    /* Se crea un elemento "li" y le inserta los atributos, el retorno es la misma "li" */
    function crearList(){
        var li:any = document.createElement("li");
        li.setAttribute("class","player");
        li.setAttribute("style","list-style:none;");
        li.textContent = crearMayus();
        li.appendChild(crearButtonDel());
        return li;
    }

    function agregarPlayer() {
        if(input.value.trim() !== ""){
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
    input.addEventListener('keypress', (event) => {
        if(event.keyCode == 13){
            agregarPlayer();
        }
    });
    /* Elimina participate al apretar boton */
    btnDel.forEach(element => {
        element.addEventListener("click", () => {
            let jugador = element.parentNode?.firstChild;
            let lugar = list.indexOf(jugador);
            list.splice(lugar, 1);
            element.parentNode?.remove();
            sorteoLista = document.querySelectorAll(".player");
        })
 
    });

    function getCant(){
        var cant:any = document.getElementsByName("cant");
        for(let i=0; i<cant.length; i++){
            if(cant[i].checked)
            return (cant[i].value);
        }
    }

    function mostrarOrdenGanadores(ganadores) {
        switch(ganadores.length){
            case 1: 
            cuadroWinners.textContent = `El ganador es "${ganadores[0]}" `;
            break;
            case 2: 
            cuadroWinners.textContent = `El ganador es "${ganadores[0]}", el segundo puesto es para "${ganadores[1]}" `;
            break;
            case 3: 
            cuadroWinners.textContent = `El ganador es "${ganadores[0]}", 
                                        el segundo puesto es para "${ganadores[1]}" 
                                        y el tercer puesto es para "${ganadores[2]}" `;
            break;
            default:
            cuadroWinners.textContent = `Faltan participantes` ;
            break;
        }
    }

    function puestosGanadores(list){
        let ganadores:string[] = [];
        let ganador:string;
        let pos:number;
        let opcion:number = getCant();
        ganadores = [];
        
        if(list.length > 0 && list.length >= opcion){
            while(opcion > ganadores.length){
                pos = Math.floor(Math.random() * list.length );
                ganador = list[pos];
                if(ganadores.indexOf(ganador) == -1){
                    ganadores.push(ganador);
                }    
            }
            mostrarOrdenGanadores(ganadores);
        } else
        cuadroWinners.textContent = `Faltan participantes` ;
        fondo.setAttribute("style","display: flex;");
        /* fondo.style.display = "flex"; */ 
    }

    btnSorteo.addEventListener("click", () => {
        list = [];
        sorteoLista.forEach( e => {
            list.push(e.firstChild?.textContent?.trim()); /* ingresa participantes a la lista, sin espacios laterales en sus nombres */
        })
        puestosGanadores(list);    
    });
    
    btnClose.addEventListener('keydown', (event) => {
        if(event.keyCode === 27){
            console.log("CODIGO 27");
            fondo.style.visibility = "hidden";
        }
    });

    const btnAcceptReset = document.getElementById("acceptReset");
    const btnCancelReset = document.getElementById("cancelReset");
    const cuadroReset = document.querySelector("#askReset");
    /* Se pregunta antes de eliminar y actualizar la lista de los participantes */
    btnReset.addEventListener("click", () => {
        cuadroReset!.setAttribute("style","position: fixed; display: flex; flex-direction: column; justify-content: space-around;");
    })
    /* Cancelar el reset */
    btnCancelReset!.addEventListener("click", () => {
        cuadroReset?.setAttribute("style","display: none;");
    })
    /* Aceptar el reset, tiene un pequeño delay entre que acepta y resetea */
    btnAcceptReset!.addEventListener("click", () => {
        setTimeout(
            () => {
                listParticipantes.innerHTML = "";
                sorteoLista = document.querySelectorAll(".player");
            }
            ,200);
        cuadroReset?.setAttribute("style","display: none;");
    })
    /* Cancela el cuadro donde muestra a los ganadores */
    btnClose.addEventListener("click", () => {
            fondo.style.display = "none";
    })
    fondo.addEventListener("click", (event) => {
        if(event.target ===  fondo){
            fondo.style.display = "none";
        }
    })
