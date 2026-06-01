class Producto  {

    constructor(categoria, nombreProducto, precio, stock){

    
    this.id = Date.now();
    this.categoria = categoria;
    this.nombreProducto = nombreProducto;
    this.precio = precio;
    this.stock = stock;
    }
}
let inventario = [];
const botonAnadirProducto = document.getElementById("btnAnadir");
const tabla = document.getElementById("cuerpoTablaAlmacen");

//localStorage.clear();


const validadDatos = () => {
    if(document.getElementById("categoriaProducto").value === null || document.getElementById("nombreProducto").value === "" ||  document.getElementById("precioBase").value === "" || document.getElementById("unidadesStock").value === "" || parseFloat(document.getElementById("precioBase").value) < 0 || parseInt(document.getElementById("unidadesStock").value) < 0 ){
        return false;
    }else{
        return true;
    }
}

const anadirLocalStorage = (aInventario) => {
    localStorage.setItem("inventario", JSON.stringify(aInventario))
} 


function pintarTabla(aInventario)  {

    tabla.innerHTML = "";

    aInventario.forEach(pro => {
        tabla.innerHTML += `
        <tr>
            <td>${pro.id}</td>
            <td>${pro.nombreProducto}</td>
            <td>${pro.categoria}</td>
            <td>${pro.precio}</td>
            <td>${pro.stock}</td>
            <td><button class="btnVender" data-id="${pro.id}">Vender una unidad</button></td>
        </tr>
        `;
    });
}


document.addEventListener("DOMContentLoaded", () => {

    let datosLocal = JSON.parse(localStorage.getItem("inventario"));

    if(datosLocal === null){
        return;
    }else{
        inventario = datosLocal;
        pintarTabla(datosLocal);
    }

});

function restarStock(oProducto){

    oProducto.stock -=  1;

}

tabla.addEventListener("click", (event) => {
    if(event.target.classList.contains("btnVender")){
        let id = parseInt(event.target.dataset.id);
        let posicion = inventario.findIndex(producto => producto.id === id);

        restarStock(inventario[posicion]);

        if(inventario[posicion].stock === 0){
            inventario.splice(posicion, 1);
        }


                    pintarTabla(inventario);
                    anadirLocalStorage(inventario);

    }
})


botonAnadirProducto.addEventListener("click", () => {

    if(validadDatos()){
        const nuevoProducto = new Producto (
        document.getElementById("categoriaProducto").value,
        document.getElementById("nombreProducto").value,
        parseFloat(document.getElementById("precioBase").value),
        parseInt(document.getElementById("unidadesStock").value)
        )

    inventario.push(nuevoProducto);
    anadirLocalStorage(inventario);
    pintarTabla(inventario);

    }else{
        window.alert("Error los campos estan mal rellenos");
        return;
    }
    
})