let catalogo = [];
let carrito = [];
const contenedorProductos = document.getElementById("contenedorProductos");
const tienda = document.querySelector(".tienda");
const carritoResumen = document.getElementById("contenedorCarrito");

function pintarCatalogo(aPrendas) {
    if (contenedorProductos) {
        contenedorProductos.innerHTML = ""
        aPrendas.forEach(pro => {
            contenedorProductos.innerHTML += `
<div class="tarjeta-producto">
    <div class="img-container">
        <img src="${pro.image}" alt="Imagen del producto">
    </div>
    <div class="info-producto">
        <h3 class="titulo-producto">${pro.title}</h3>
        <span class="precio-producto">$${parseFloat(pro.price).toFixed(2)}</span>
        <button class="btn-anadir" data-id="${pro.id}">🛒 Añadir al carrito</button>
    </div>
</div>
           `;
        });
    }
}

addEventListener("DOMContentLoaded", async () => {

    fetch("https://fakestoreapi.com/products?limit=6").then((respuesta) => {
        return respuesta.json();
    }
    ).then((datos) => {
        datos.forEach(prenda => {
            catalogo.push(prenda)
        });

        pintarCatalogo(catalogo);
    }

    )

})

function pintarCarrito(aCarrito) {
    carritoResumen.innerHTML = ""
    if (aCarrito.length <= 0) {
        carritoResumen.innerHTML += "El carrito esta vacio";
    } else {
        aCarrito.forEach(proCa => {
            carritoResumen.innerHTML += `
            <div class="item-carrito" >
    <img src="${proCa.image}" alt="Producto" class="img-carrito">
    <div class="info-carrito">
        <span class="titulo-carrito">${proCa.title}</span>
        <span class="precio-carrito">$${parseFloat(proCa.price).toFixed(2)}</span>
    </div>
    <button class="btn-borrar" data-id="${proCa.id}">❌</button>
</div>

            `
        });
    }

     let total = carrito.reduce((acumulador, pro) => acumulador + pro.price, 0);
        document.getElementById("precioTotal").innerHTML = total.toFixed(2);
}



tienda.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-anadir")) {
        let id = parseInt(event.target.dataset.id);
        let posicion = catalogo.findIndex((pro) => pro.id === id);

        carrito.push(catalogo[posicion]);

        pintarCarrito(carrito);

       

    }


    


})




carritoResumen.addEventListener("click", (event) => {
if(event.target.classList.contains("btn-borrar")){
        let id = parseInt(event.target.dataset.id);
        let posicion = carrito.findIndex((producto) => producto.id === id);

        carrito.splice(catalogo[posicion],1);
        pintarCarrito(carrito);

    }
})


