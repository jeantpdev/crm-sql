import swalAlert from "../../otros/alertas.js"
import Miscelaneas from "../../otros/miscelaneas.js";
import Modelo from "../../generales/Modelo/modelo_general.js";

const Controlador = {

    datosUsuarioLogeado() {
        const rol = localStorage.getItem('rol')
        const cedula = localStorage.getItem('cedula')
        return { rol, cedula }
    },

    async datosUsuario() {
        const cedula = localStorage.getItem('cedula')
        const res = await Modelo.traerDatosPersonalesAgente(cedula)

        const nombreUsuario = res.data.nombre;
        const rolUsuario = res.data.rol;
        const liderEquipoUsuario = res.data.lider_equipo;

        return { cedula, nombreUsuario, rolUsuario, liderEquipoUsuario }

    },

}

export default Controlador;
