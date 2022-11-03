
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
const btnClose:any = document.querySelector(".cancelBtn");
const winners:any = document.querySelectorAll(".winners");
var sorteoLista = document.querySelectorAll(".player");
const cuadroWinners:any = document.querySelector(".mostrarWinners");
const fondo:any = document.querySelector(".blurryBack");
var list:any[] = [];

    
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
            element.parentNode?.remove();
            let jugador = element.parentNode?.firstChild;
            let lugar = list.indexOf(jugador);
            list.splice(lugar, 1);
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
        let pos:number = 0;
        let opcion:number = getCant();
        
        if(list.length > 0){
            while(opcion > ganadores.length){
                pos = Math.floor(Math.random() * list.length );
                ganador = list[pos];
                if(ganadores.indexOf(ganador) == -1){
                    ganadores.push(ganador);
                }    
            }
        } 
        mostrarOrdenGanadores(ganadores);
        fondo.setAttribute("style","display: flex;");
        /* fondo.style.display = "flex"; */ 
    }

    btnSorteo.addEventListener("click", () => {
        list = [];
        sorteoLista.forEach( e => {
            list.push(e.firstChild?.textContent?.trim()); /* ingresa participantes a la lista, sin espacios laterales en sus nombres */
        })
        puestosGanadores(list);    
    })
    /* Cancela el cuadro donde muestra a los ganadores */
    btnClose.addEventListener("click", () => {
        fondo.style.display = "none";
    })


console.log(list);