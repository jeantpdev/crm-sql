import Controlador from "../Controlador/controlador_login.js";

const Vista = {

    //Método de la vista que recibe los valores que hay en el DOM y los retorna
    getDatosInicioSesion() {
        const usuario = document.getElementById('usuario').value;
        const password = document.getElementById('contrasena').value;
        return { usuario, password };
    },

    vaciarCampos() {
        nombre.value = "";
        apellido.value = "";
        usuario.value = "";
        titulo.value = "";
        descripcion.value = "";
    },

}
export default Vista;

const botonEnviar = document.getElementById('btnIngresar');
const botonEnter = document
botonEnter.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        Controlador.iniciarSesion();
    }
});

botonEnviar.onclick = function () {
    Controlador.iniciarSesion()
}

