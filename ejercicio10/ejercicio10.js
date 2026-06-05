const boton = document.getElementById("btnComprar");
const nombre = document.getElementById("nombre");
const dni = document.getElementById("dni");
const correo = document.getElementById("email");
const fecha = document.getElementById("fechaNac");
const errorNombre = document.getElementById("errorNombre");
const errorDni = document.getElementById("errorDni");
const errorCorreo = document.getElementById("errorEmail")
const errorFecha = document.getElementById("errorFecha")
const patronDni = /^[0-9]{8}[a-zA-Z]$/;
const patronCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


function esMayorDeEdad(fechaNacimiento) {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  
  const fechaLimite = new Date(
    hoy.getFullYear() - 18,
    hoy.getMonth(),
    hoy.getDate()
  );
  
  return nacimiento <= fechaLimite;
}

boton.onclick = () => {

    let todoCorecto = true;

    if(nombre.value === "" || nombre.value.length < 3){
        errorNombre.style.display = "block"
        nombre.classList.add("input-error")
        todoCorecto = false;

    }else{
        errorNombre.style.display = ""
        nombre.classList.remove("input-error")
    }

    if(fecha.value === "" || !esMayorDeEdad(fecha.value)){
        errorFecha.style.display = "block";
        fecha.classList.add("input-error");
        todoCorecto = false;
        
    }else{
        errorFecha.style.display = "";
        fecha.classList.remove("input-error");
    }

    if(dni.value === "" || !patronDni.test(dni.value)){


        errorDni.style.display = "block";
        dni.classList.add("input-error");
        todoCorecto = false;
    }else{
        errorDni.style.display = "";
        dni.classList.remove("input-error");
       
    }

    if(correo.value === "" || !patronCorreo.test(correo.value)){
        errorCorreo.style.display = "block";
        correo.classList.add("input-error");
        todoCorecto = false;
    }else{
        errorCorreo.style.display = "";
        correo.classList.remove("input-error");
      
    }

    let dniMayus = dni.value.toUpperCase();

    if(todoCorecto){
        window.alert(`Compra procesada con éxito. Revisando DNI: ${dniMayus}`);
    }

}
