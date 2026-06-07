const contenedorCamarero = document.getElementById("camareroTurno");
const contendorContador = document.getElementById("temporizador");
let contadorInicial = 90;
const divContador = document.querySelector(".reloj")
const botonMandarCocina = document.getElementById("btnHacerPedido");
const nombreCliente = document.getElementById("nombreCliente");
const nombreError = document.getElementById("errorNombre");
const regex = /^[A-Z]{3}\d{3}$/;
const descuento = document.getElementById("codigoDescuento");
const descuentoError = document.getElementById("errorCodigo");
const patatas = document.getElementById("extraPatatas");
let aPedidos = [];
const burguer = document.getElementById("tipoBurger");
const tabla = document.getElementById("cuerpoTabla");
const precioTotal = document.getElementById("cajaTotal");
const filtro = document.getElementById("filtroBurger");





class Pedido{
    constructor(cliente, burguer, patatas = null){
        this.id = Date.now();
        this.cliente = cliente;
        this.burguer = burguer;
        this.patatas = patatas;
        if(this.burguer.toLowerCase() === "clasica"){
            this.precioFinal = 8;
        }

        if(this.burguer.toLowerCase() === "queso"){
            this.precioFinal = 10;
        }
        if(this.burguer.toLowerCase() === "vegana"){
            this.precioFinal = 9.5
        }

        if(patatas === true){
            this.precioFinal += 2;
        }
    }
}

function pintarPedidos(pedidos) {
    if(tabla){
        tabla.innerHTML = "";

        pedidos.forEach(p => {
            tabla.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td>${p.cliente}</td>
                <td>${p.burguer}</td>
                <td>${p.patatas === false ?  "No incluidas" : "Si incluidas"}</td>
                <td>${p.precioFinal}</td>
                <td><button data-id= "${p.id}" class="btn-cancelar"  >Eliminar</button></td>
            </tr>
            `
        });

        sumarPrecioFianl(pedidos);

    }
}


addEventListener("DOMContentLoaded", () => {

    contenedorCamarero.innerHTML = "";

    fetch("https://jsonplaceholder.typicode.com/users").then((respuesta) => {
        return respuesta.json();
    }).then((datos) => {
        const numAle = Math.floor(Math.random() * datos.length);

        const nameCamarero = datos[numAle].name;
        const userNameCamarero = datos[numAle].username;

        contenedorCamarero.innerHTML = `Camarero de turno: ${nameCamarero} | Username: ${userNameCamarero}`;
    })


    let local = localStorage.getItem("pedidos");

    aPedidos = local ? JSON.parse(local) : [];

    pintarPedidos(aPedidos);


});



let contador = setInterval(() => {

    contadorInicial -= 1;

    contendorContador.innerHTML = contadorInicial;

    if(contadorInicial <= 0){
        divContador.innerHTML = "¡Cocina Cerrada!";

        clearInterval(contador);
    }

}, 1000);

tabla.onclick = (event) => {
    if(event.target.classList.contains("btn-cancelar")){
        let id = event.target.dataset.id;
        let posicionBorrar = aPedidos.findIndex(pedido => Number(pedido.id)  === Number(id));

        aPedidos.splice(posicionBorrar, 1);
        localStorage.setItem("pedidos", JSON.stringify(aPedidos));
        pintarPedidos(aPedidos);

        }
}

function sumarPrecioFianl(pedidos) {
    let total = pedidos.reduce((acumulador, p) => acumulador + p.precioFinal, 0);

    precioTotal.innerHTML = ` ${total.toFixed(2)}`;

}


botonMandarCocina.onclick = () => {
    let todoCorrecto = true;

    if(nombreCliente.value.length < 2){
        todoCorrecto = false;
        nombreError.style.display = "block";
        nombreCliente.classList.add("input-error");
    }else{
        nombreError.style.display = "";
        nombreCliente.classList.remove("input-error");
    }

    if(descuento.value !== ""){

        if(!regex.test(descuento.value)){
            todoCorrecto = false;
            descuentoError.style.display = "block";
            descuento.classList.add("input-error");
        }else{
            descuentoError.style.display = "";
            descuento.classList.remove("input-error");
        }

    }

    let quierePatatas = false;

    if(patatas.checked === true){
        quierePatatas = true;
    }

    if(todoCorrecto){

        let nuevoPedido = new Pedido(nombreCliente.value, burguer.value, quierePatatas);

        aPedidos.push(nuevoPedido);
        localStorage.setItem("pedidos", JSON.stringify(aPedidos));

        pintarPedidos(aPedidos);


    }

}

if(filtro){
    filtro.addEventListener("change", (event) => {

        filtrado = event.target.value;

        if(filtrado.toLowerCase() === "todas"){
            pintarPedidos(aPedidos);
        }else{

            let filtrados = aPedidos.filter(pedido => pedido.burguer.toLowerCase() === filtrado.toLowerCase());

            pintarPedidos(filtrados)
        }

    })
}