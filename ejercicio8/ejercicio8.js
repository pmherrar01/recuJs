const botonReloj = document.getElementById("btnPausarPromo");
const contenedorReloj = document.getElementById("relojPromo");
let cont = 60;
const artista = document.getElementById("artistaPatrocinador");
const grupoU = document.getElementById("nombreGrupo");
const ciudadU = document.getElementById("ciudadConcierto");
const precioU = document.getElementById("precioEntrada");
const paseVipU = document.getElementById("pasesVip");
let aConciertos = [];
const botonAnadirConcierto = document.getElementById("btnAnadirConcierto");
const tabla =  document.getElementById("cuerpoTablaConciertos");
const botonBorrar = document.getElementsByClassName("btn-cancelar");

document.addEventListener("DOMContentLoaded", () => {
  let datosLocal = JSON.parse(localStorage.getItem("conciertos"));

  if (datosLocal === null) {
    return;
  } else {
    aConciertos = datosLocal;
    pintarTabla(aConciertos);
  }
});

class Concierto {
  constructor(nombreGrupo, ciudad, precio, paseVip = null) {
    this.id = Date.now();
    this.nombreGrupo = nombreGrupo;
    this.ciudad = ciudad;
    this.precio = precio;
    this.paseVip = paseVip;
  }
}

let reloj = setInterval(actualizarReloj, 1000);

function actualizarReloj() {
  contenedorReloj.innerHTML = `
    Oferta acaba en: ${cont}s
    `;

  if (cont <= 0) {
    contenedorReloj.style.color = "green"
    contenedorReloj.innerHTML= `Oferta finalizada :(`;
  } else {
    cont -= 1;
  }
}

botonReloj.onclick = () => {
  if (reloj) {
    clearInterval(reloj);
    reloj = null;

    if (contenedorReloj) {
      contenedorReloj.style.color = "grey";
    }
  } else {
    reloj = setInterval(actualizarReloj, 1000);
    if (contenedorReloj) {
      contenedorReloj.style.color = "red";
    }
  }
};

fetch("https://jsonplaceholder.typicode.com/users")
  .then((respuesta) => {
    return respuesta.json();
  })
  .then((datos) => {
    let usuarios = datos.splice(0, 10);

    const usuAleatorio = usuarios[Math.floor(Math.random() * usuarios.length)];
    artista.innerHTML = `El concierto esta patrocinado por: ${usuAleatorio.name}, contacto: ${usuAleatorio.email}`;
  });

function validarDatos(grupo, ciudad, precio) {
  if (grupo === "" || ciudad === "" || precio <= 0) {
    return false;
  } else {
    return true;
  }
}

//localStorage.clear();

botonAnadirConcierto.onclick = () => {
  if (validarDatos(grupoU.value, ciudadU.value, precioU.value)) {
    let grupo = grupoU.value;
    let ciudad = ciudadU.value;
    let precio = precioU.value;
    let paseVip = paseVipU.checked ? true : false;

    let concierto = new Concierto(grupo, ciudad, precio, paseVip);

    aConciertos.push(concierto);
    localStorage.setItem("conciertos", JSON.stringify(aConciertos));
    pintarTabla(aConciertos);
  } else {
    window.alert("Error deves introducir los datos bien");
  }
};


function pintarTabla(conciertos){

  if(tabla){

          tabla.innerHTML = "";

    if(conciertos.length != 0){



      conciertos.forEach(concierto => {
        
        let respuesta = concierto.paseVip === true ? "Si" : "No";


        tabla.innerHTML += `
        <tr>
          <td>${concierto.id}</td>
          <td>${concierto.nombreGrupo}</td>
          <td>${concierto.ciudad}</td>
          <td>${concierto.precio}</td>
          <td>${respuesta}</td>
          <td><button class="btn-cancelar" data-id="${concierto.id}">Cancelar</button></td>
        </tr>
        `;
      });
    }
  }

}



tabla.addEventListener("click", (even) => {

  if(even.target.classList.contains("btn-cancelar")){
    let id = parseInt(even.target.dataset.id);

    let posicion = aConciertos.findIndex((concierto) => concierto.id === id);

    aConciertos.splice(posicion,1);

    pintarTabla(aConciertos);
    localStorage.setItem("conciertos", JSON.stringify(aConciertos));

  }

})