const contenedorAgente = document.getElementById("agenteDia");
let temporizador = 120;
const contenedorTemporizador = document.getElementById("temporizador");
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const confirmarReserva = document.getElementById("btnReservar");
const nombrePasagero = document.getElementById("nombrePasajero");
const nombreError = document.getElementById("errorNombre");
const emailPasagero = document.getElementById("emailPasajero");
const emailError = document.getElementById("errorEmail");
const fecha = document.getElementById("fechaVuelo");
const fechaError = document.getElementById("errorFecha");
const hoy = new Date();
const destino = document.getElementById("destinoVuelo");
let aReservas = [];
tabla = document.getElementById("cuerpoTabla");


   
//localStorage.clear();

hoy.setHours(0,0,0,0);

class Reserva {
    constructor(nombre, email, destinoVuelo, fechaVuelo) {
        this.id = Date.now();
        this.nombre = nombre;
        this.email = email;
        this.destino = destinoVuelo;
        this.fechaVuelo = fechaVuelo;

        if (destinoVuelo.toLoweCase === "Paris") {
            this.precio = 150;
        }

        if (destinoVuelo.toLoweCase === "Roma") {
            this.precio = 120;
        }

        if (destinoVuelo.toLoweCase === "Tokio") {
            this.precio = 850;
        }

    }
}






addEventListener("DOMContentLoaded", () => {

    contenedorAgente.innerHTML = "";

    fetch("https://jsonplaceholder.typicode.com/users").then((respuesta) => {
        return respuesta.json();
    }).then((datos) => {
        const aleatorio = Math.floor(Math.random() * 9);

        const nombre = datos[aleatorio].name;
        const correo = datos[aleatorio].email;


        contenedorAgente.innerHTML += `
        Agente de guardia: ${nombre}, contacto: ${correo}.
        `

    });

     const reservasGuardadas = localStorage.getItem("reservas");

     aReservas = reservasGuardadas ? JSON.parse(reservasGuardadas) : [];

    if(aReservas.length > 0){
       

    pintarTabla(aReservas);
    }
    
});



setInterval(() => {
    contenedorTemporizador.innerHTML = temporizador;



    temporizador -= 1;

    if (temporizador <= 0) {
        clearInterval;

        contenedorTemporizador.innerHTML = "¡Oferta Expirada!";
    }

}, 1000);


//function validarDatos(nombre, email, fecha){
  //  if( || reglexEmail.test(email) || fecha === "" || fecha < Date.now()){
//        return false
  //  }else{
    //    return true;
   // }
//}


function pintarTabla(vuelos){

    tabla.innerHTML = "";

    vuelos.forEach(vuelo => {
        tabla.innerHTML += `
    <tr>
        <td>${vuelo.id}</td>
        <td>${vuelo.nombre}</td>
        <td>${vuelo.email}</td>
        <td>${vuelo.destino}</td>
        <td>${vuelo.fechaVuelo}</td>
        <td>${vuelo.precio}</td>
        <td></td>
        
    </tr>
    `
    });

   
}


confirmarReserva.onclick = () => {
    if(nombrePasagero.value.length <= 3){
        nombreError.style.display = "block";
        nombrePasagero.classList.add("input-error");
    }else{
        nombreError.style.display = "";
        nombrePasagero.classList.remove("input-error");
    }

    if(!regexEmail.test(emailPasagero.value)){
        emailError.style.display = "block";
        emailPasagero.classList.add("input-error");
    }else{
        emailError.style.display = "";
        emailPasagero.classList.remove("input-error");
    }

    const fechaUsu = new Date(fecha.value);

    if(fechaUsu.getTime() <  hoy.getTime() || fecha.value === ""){
        fechaError.style.display = "block";
        fecha.classList.add("input-error");
    }else{
        fechaError.style.display = "";
        fecha.classList.remove("input-error");

    }

    const reserva = new Reserva(nombrePasagero.value, emailPasagero.value, destino.value,fecha.value);

    aReservas.push(reserva);
    localStorage.setItem("reservas", JSON.stringify(aReservas));

}

