const producto = {
    categoria : "",
    nombreProducto : 0,
    precio : 0,
    stock : 0,
}

const botonAnadirProducto = document.getElementById("btnAnadir");


const validadDatos = () => {
    if(document.getElementById("categoriaProducto").value === null || document.getElementById("nombreProducto").value === "" ||  getElementById("precioBase").value === "" || document.getElementById("unidadesStock").value  || parseFloat(getElementById("precioBase").value) < 0 || parseInt(getElementById("unidadesStock").value) < 0 ){
        return false;
    }else{
        return true;
    }
}

botonAnadirProducto.addEventListener("click", () => {

    if(validadDatos){
        producto =   {
        categoria : document.getElementById("categoriaProducto").value,
        nombreProducto: document.getElementById("nombreProducto").value,
        precio: document.getElementById("precioBase").value,
        stock: document.getElementById("unidadesStock").value

    }
    }else{
        window.alert("Error los campos estan mal rellenos");
        return;
    }
    
})