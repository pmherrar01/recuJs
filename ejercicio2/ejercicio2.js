const contenidoUsu = document.getElementById("nuevo-jugador");
const listaJugadores = document.getElementById("lista-jugadores");
const boton = document.getElementById("btn-anadir");


boton.addEventListener("click",  () => {
    let jugadorUsu = contenidoUsu.value;

    if(jugadorUsu.trim() === ""){
        window.alert("Error no has introducido nada");

        return;

    }

    

    const nuevoElemento = document.createElement("li") ;


    nuevoElemento.textContent = jugadorUsu;

    listaJugadores.appendChild(nuevoElemento);
});