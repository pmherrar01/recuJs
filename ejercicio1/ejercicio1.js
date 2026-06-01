const jugador = {
    alias: "GamerPro99",
    nivel: 42,
    colorTema: "purple"
};

const tituloContainer = document.getElementById("nombre");
const pContainer = document.getElementById("rango");


tituloContainer.textContent = jugador.alias;
tituloContainer.style.color = jugador.colorTema;
pContainer.textContent = `Nivel:  ${jugador.nivel}`;