let catalogo = [];
const contenedorPelis = document.getElementById("contenedorPeliculas");
let buscador = document.getElementById("inputBuscador");
let generos = [];
let selectGeneros = document.getElementById("selectGenero");


class Pelicula {
    constructor(titulo, genero) {
        this.titulo = titulo;
        this.genero = genero
    }
}



let peli1 = new Pelicula("peli1", "miedo");
catalogo.push(peli1);
let peli2 = new Pelicula("peli2", "comedia");
catalogo.push(peli2);
let peli3 = new Pelicula("peli3", "drama");
catalogo.push(peli3);
let peli4 = new Pelicula("peli4", "drama");
catalogo.push(peli4);
let peli5 = new Pelicula("peli5", "accion");
catalogo.push(peli5);
let peli6 = new Pelicula("peli6", "comedia");
catalogo.push(peli6);
let peli7 = new Pelicula("peli7", "misterio");
catalogo.push(peli7);
let peli8 = new Pelicula("peliX", "xxx");
catalogo.push(peli8);


function pintarPelis(aPelis) {


    if (contenedorPelis) {
        contenedorPelis.innerHTML = "";

        aPelis.forEach(peli => {
            contenedorPelis.innerHTML += `
            <div class="tarjeta"> Titulo: ${peli.titulo}, Genero: ${peli.genero} </div>
            `;
        });

    }


}




document.addEventListener("DOMContentLoaded", () => {
    pintarPelis(catalogo);

    selectGeneros.innerHTML = `<option value="Todos">Todos los géneros</option>`;

    catalogo.forEach(peli => {

        if (!generos.includes(peli.genero)) {
            generos.push(peli.genero);
            
        }



    });


    generos.forEach(genero => {
        selectGeneros.innerHTML += `
        <option value="${genero}">${genero}</option>
      `;
   });




})


function aplicarFiltros(){

    let tituloAFiltrar = buscador.value;
    let generoAFiltar = selectGeneros.value;

    const aPelisFiltradas = catalogo.filter(pelis => {

        let encajaTitulo = pelis.titulo.toLowerCase().includes(tituloAFiltrar)

        let encajaGenero = (generoAFiltar === "Todos") || (pelis.genero === generoAFiltar);

        return encajaTitulo && encajaGenero;

    })

    pintarPelis(aPelisFiltradas);

}


selectGeneros.addEventListener("change", (event) => {

    aplicarFiltros();

    
})


buscador.addEventListener("input", () => {

    aplicarFiltros();

})