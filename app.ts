
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
const listPart:any = document.getElementById("lista");
const btnSorteo:any = document.querySelector(".sorteo");
const winners:any = document.querySelectorAll(".winners");
var playersLista = document.querySelectorAll(".player");

    
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
            playersLista = document.querySelectorAll(".player");
        })
 
    });

    function getCant(){
        var cant:any = document.getElementsByName("cant");
        for(let i=0; i<cant.length; i++){
            if(cant[i].checked)
            return (cant[i].value);
        }
    }

    function ganadores(list) {
        const pos:number[] = [];
        var cantGanadores:number = winners.length;
    }

    function puestosGanadores(){
        var ganadores:any[] = [];
        var ganador:string;
        var pos:number = 0;
        if(list.length > 0){
            while(getCant() > ganadores.length){
                var pos:number = Math.floor(Math.random() * list.length );
                ganador = list[pos];
                if(!ganadores.indexOf(ganador)){
                    ganadores.push(list[pos]);
                    pos++;
                }    
            }
            alert("El ganador es "+ ganadores[0] + " El segundo puesto es para "+ ganadores[1] + " El tercer puesto es para "+ ganadores[2]);
        } else
            alert("Faltan participantes")
    }

    btnSorteo.addEventListener("click", () => {
        list = [];
        playersLista.forEach( e => {
            list.push(e.firstChild?.textContent?.trim()); /* ingresa participantes a la lista, sin espacios laterales en sus nombres */
        })
        puestosGanadores();
        console.log(list);
        
            
    })

    let list:any[] = [];

console.log(list);