const contenedorAlerta = document.getElementById("alertaPeligro");
const contenedorSensores = document.getElementById("contenedorSensores");
let tiempo = 10;
const contador = document.getElementById("contadorTiempo");
const botonTiempo = document.getElementById("btnPararTemporizador");
const boronReparar = document.getElementById("btnReparar");


boronReparar.addEventListener("click", () => {
    let sensoresAReparar = document.querySelectorAll(".check-sensor:checked");
    let ids = [];
    sensoresAReparar.forEach(sensor => {
        ids.push(sensor.value);
    });

    window.alert("Se han mandado a reparar los sensores: " +  ids.join(", "));

})

botonTiempo.addEventListener("click", () => {
  clearInterval(idContador);
});

const idContador = setInterval(() => {
  tiempo -= 1;
  contador.innerHTML = tiempo;

  if (tiempo === 0) {
    obtenerSensores();
    tiempo = 11;
  }
}, 1000);

function pintarSensores(aSensores) {
  if (aSensores.some((sensor) => sensor.completed === false)) {
    contenedorAlerta.style.display = "block";
  } else {
    contenedorAlerta.style.display = "none";
  }

  contenedorSensores.innerHTML = "";
  aSensores.forEach((sensor) => {
    let clase = sensor.completed ? "ok" : "fallando";
    let texto = sensor.completed ? "✅ OK" : "❌ ROTO";

    contenedorSensores.innerHTML += `
                <div class="sensor-card ${clase}">
                    <input type="checkbox" class="check-sensor" value="${sensor.id}"> 
                    <strong>ID: ${sensor.id}</strong> - ${sensor.title} ${texto}
                </div>
            `;
  });
}

function obtenerSensores() {
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((respuesta) => {
      return respuesta.json();
    })
    .then((datos) => {
      const elementosAleatorios = datos
        .toSorted(() => 0.5 - Math.random())
        .slice(0, 10);
      pintarSensores(elementosAleatorios);
    });
}

obtenerSensores();
