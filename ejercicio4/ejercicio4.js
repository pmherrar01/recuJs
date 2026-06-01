let aJugadores = [];
const boton = document.getElementById("btn-anadir");
const listaJugadores = document.getElementById("lista-jugadores");
const jugardorUsu = document.getElementById("nuevo-jugador");

boton.addEventListener("click", () => {
  let valorJugarUsu = jugardorUsu.value;

  if (valorJugarUsu.trim() === "") {
    window.alert("Error, no has escrito nada!");
    return;
  }

  const nuevoElemento = document.createElement("li");
  nuevoElemento.textContent = valorJugarUsu;

  listaJugadores.appendChild(nuevoElemento);

  aJugadores.push(valorJugarUsu);

  guardarEnLocal(aJugadores);
});

const guardarEnLocal = (lista) => {
  localStorage.setItem("jugadoresGuardados", JSON.stringify(lista));
};

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("jugadoresGuardados") === null) {
    return;
  } else {
    
    JSON.parse(localStorage.getItem("jugadoresGuardados")).forEach((jugador) => {
      const nuevoElemento = document.createElement("li");
      aJugadores.push(jugador);
      nuevoElemento.textContent = jugador;
      listaJugadores.appendChild(nuevoElemento);
    });

    console.log(aJugadores);
  }
});
