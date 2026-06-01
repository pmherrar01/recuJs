const frase = document.getElementById("texto-frase");
const autor = document.getElementById("autor-frase");
const boton = document.getElementById("btn-nueva-frase");
const numeroAle = Math.floor(Math.random() * 44);

const obtenerFrase = () => {
  fetch("https://www.positive-api.online/phrases/esp")
    .then((respuesta) => {
      return respuesta.json();
    })
    .then((datos) => {
      frase.textContent = datos[numeroAle].text;
      datos[0].author_id === null
        ? (autor.textContent = "anonimo")
        : (autor.textContent = datos[numeroAle].author_id);
    });
};

boton.addEventListener("click", obtenerFrase);
