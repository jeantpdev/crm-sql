import Menu from "../../componentes/menu/menu.js";
import Modelo from "../Modelo/modelo_perfil.js";
import Vista from "../Vista/perfil.js";
import swalAlert from "../../otros/alertas.js";
import ModeloGeneral from "../../generales/Modelo/modelo_general.js";
import Miscelaneas from "../../otros/miscelaneas.js";

const Controlador = {

    iniciarPagina() {
        Menu.opcionesMenu()
        Controlador.datosAgente()
    },

    async datosAgente() {
        const res = await ModeloGeneral.traerDatosPersonalesAgente(localStorage.getItem('cedula'))
        Vista.mostrarDatosUsuario(res)
    },

    async datosModal() {
        const res = await ModeloGeneral.traerDatosPersonalesAgente(localStorage.getItem('cedula'))
        Vista.modalAbierto(res)
    },

    async cambiarContrasena(contrasena){
        try {
            const cedula = localStorage.getItem('cedula')

            const datosAgente = await ModeloGeneral.traerDatosPersonalesAgente(cedula)
            const idAgente = datosAgente.data['id_agente']

            const res = await Modelo.cambiarContrasena(idAgente, contrasena)

            if (res.status == 200) {
                swalAlert.mostrarAlertaSatisfactorio("Se cambió la contraseña correctamente");
            } else {
                swalAlert.mostrarMensajeError("No se pudo actualizar")
            }

        } catch (error) {
            console.log(error)
            swalAlert.mostrarMensajeError("Hubo un error al actualizar la venta")
        }
    },

    async editarAgente() {
        try {
            const datos = Vista.actualizarAgentes()
            const cedula = datos.cedulaAgente
            const datosAgente = await ModeloGeneral.traerDatosPersonalesAgente(cedula)
            const idAgente = datosAgente.data['id_agente']
            const res = await Modelo.actualizarAgente(datos, idAgente)

            if (res.status == 200) {
                swalAlert.mostrarAlertaSatisfactorio("Se actualizo el usuario correctamente");
                Miscelaneas.recargarPagina(1000)
            } else {
                swalAlert.mostrarMensajeError("No se pudo actualizar")
            }

        } catch (error) {
            console.log(error)
            swalAlert.mostrarMensajeError("Hubo un error al actualizar el usuario")
        }
    },

}
export default Controlador;