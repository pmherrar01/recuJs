let stockCoches = [];
const botonAnadir = document.getElementById("btnAnadir");
const botonFiltrarBaratos = document.getElementById("btnFiltrarBaratos");
const botonCalcularMedia = document.getElementById("btnCalcularMedia");

//localStorage.clear();

document.addEventListener("DOMContentLoaded", () => {
  const datosLocal = JSON.parse(localStorage.getItem("stockCoches"));

  if (datosLocal === null) {
    return;
  } else {
    stockCoches = datosLocal;
    actualizarTabla(datosLocal);
  }
});

function actualizarTabla(aCoches) {
  const tabla = document.getElementById("cuerpoTablaCoches");
  tabla.innerHTML = "";
  aCoches.forEach((coche) => {
    const nuevaFila = document.createElement("tr");

    for (const key in coche) {
      if (!Object.hasOwn(coche, key)) continue;

      const nuevaColumna = document.createElement("td");
      nuevaColumna.textContent = coche[key];

      nuevaFila.appendChild(nuevaColumna);
    }

    tabla.appendChild(nuevaFila);
  });
}

function actualizarLocalStorage(aCoches) {
  localStorage.setItem("stockCoches", JSON.stringify(aCoches));
}

botonFiltrarBaratos.addEventListener("click", () => {
    let aBaratos = stockCoches.filter(coche => coche.precio <= 10000);

    actualizarTabla(aBaratos);

})

botonCalcularMedia.addEventListener("click", () => {
let suma = stockCoches.reduce((acc, coche) => acc + parseInt(coche.precio), 0)

    window.alert( "La media del concesionario es:  " +  suma / stockCoches.length);
})

botonAnadir.addEventListener("click", () => {
  const marcaUsu = document.getElementById("marca").value.toLowerCase();
  const modeloUsu = document.getElementById("modelo").value.toLowerCase();
  const precioUsu = document.getElementById("precio").value.toLowerCase();
  const anioUsu = document.getElementById("anio").value.toLowerCase();
  const cocheUsu = {
    marca: marcaUsu.trim(),
    modelo: modeloUsu.trim(),
    precio: precioUsu.trim(),
    anio: anioUsu.trim(),
  };

  if (
    cocheUsu.marca === "" ||
    cocheUsu.modelo === "" ||
    parseInt(cocheUsu.precio) === 0 ||
    parseInt(cocheUsu.anio) === 0
  ) {
    window.alert("Error no puedes introducir esos campos");
  } else {
    if (
      stockCoches.some(
        (coche) =>
          coche.marca === cocheUsu.marca && coche.modelo === cocheUsu.modelo,
      )
    ) {
        window.alert("ese coche ya existe");
      return;
    } else {
      stockCoches.push(cocheUsu);
      actualizarTabla(stockCoches);
      actualizarLocalStorage(stockCoches);
    }
  }
});
