import Vista from "../Vista/usuarios.js";
import Modelo from "../Modelo/modelo_usuarios.js";
import swalAlert from "../../otros/alertas.js"
import controladorGeneral from "../../generales/Controlador/controlador_general.js";
import Menu from "../../componentes/menu/menu.js"
import Modal from "../../componentes/Modal/modal.js";
import Miscelaneas from "../../otros/miscelaneas.js";
import ModeloGeneral from "../../generales/Modelo/modelo_general.js";

const Controlador = {

    usuarioLogeado() {
        const datosUsuario = controladorGeneral.datosUsuarioLogeado();
        if (datosUsuario.rol == "team leader") {
            Controlador.mostrarUsuariosTeamLeader()
            Controlador.botonCrearUsuarioTeamLeader()
        }

        if (datosUsuario.rol == "admin") {
            Controlador.mostrarTodosUsuarios()
            Controlador.botonCrearUsuarioAdmin()
        }

    },

    async filtrarTabla() {
        const { columnaBuscar, textoBuscar } = Vista.filtrarTabla();
        const res = await ModeloGeneral.filtrarTabla(columnaBuscar, textoBuscar);
        console.log(res)
        if (localStorage.getItem('rol') == "admin") {
            Vista.mostrarTodosUsuarios(res)
            Vista.mostrarFiltrosActivos(columnaBuscar, textoBuscar);
        }
        if (localStorage.getItem('rol') == "team leader") {
            Vista.mostrarUsuariosTeamLeader(res);
            Vista.mostrarFiltrosActivos(columnaBuscar, textoBuscar);
        }

    },

    /* ADMIN */
    async mostrarTodosUsuarios() {
        try {
            const response = await Modelo.traerUsuarios();
            if (response.status == 200) {
                Vista.mostrarTodosUsuarios(response);
                Vista.datosEstadisticos(response)
            } else {
                swalAlert.mostrarMensajeError("Hubo un error al mostrar las ventas")
            }
        }
        catch (error) {
            console.log(error)
        }
    },

    async agregarUsuarioAdmin() {

        const { primerNombre, primerApellido, cedula, correo, liderEquipo } = Vista.enviarDatosNuevoUsuario()

        const usuario = Miscelaneas.unirNombreApellido(primerNombre, primerApellido)
        const nombre = `${Miscelaneas.capitalizarTexto(primerNombre.trim())} ${Miscelaneas.capitalizarTexto(primerApellido.trim())}`
        //const apodo = `${primerNombre.trim().toLowerCase()} ${primerApellido.trim().toLowerCase()}`
        //const cedulaUsuario = localStorage.getItem('cedula')

        try {
            const cedula_usuario = cedula ? cedula : Miscelaneas.generarNumeroAleatorio()

            const res = await Modelo.insertarAgente(nombre, usuario, cedula_usuario, correo, liderEquipo)

            console.log(res)
/*              
            if (res.status == 200) {
                swalAlert.mostrarAlertaSatisfactorio("Usuario creado con éxito")
                Miscelaneas.recargarPagina(1000)
            } else {
                swalAlert.mostrarMensajeError("Hubo un error al crear el usuario")
            }
*/

        } catch (error) {
            console.log(error)
            swalAlert.mostrarMensajeError("Error al insertar los datos")
        }


    },

    botonCrearUsuarioAdmin() {

        const botonCrearUsuario = document.getElementById('botonCrearUsuario')

        botonCrearUsuario.innerHTML = `<button id="abrirModalAgregarDatos" class="btn-success">Agregar usuario <i class="fa-solid fa-plus"></i></button>
        `

        const abrirModalAgregarDatos = document.getElementById('abrirModalAgregarDatos')

        abrirModalAgregarDatos.onclick = function () {
            Modal.modalCero("targetModalAgregarUsuarioAdmin", "cerrar-modal")
        }
    },

    async editarUsuarioAdmin() {

        try {
            swalAlert.mostrarPantallaDeCarga("Actualizando usuario...")
            const datosUsuarioEditarAdmin = Vista.enviarDatosAgenteEditarAdmin();
            const cedula = datosUsuarioEditarAdmin.cedula
            const datosAgente = await ModeloGeneral.traerDatosPersonalesAgente(cedula)
            const idAgente = datosAgente.data['id_agente']
            const cedulaUsuario = localStorage.getItem('cedula')

            const res = await Modelo.actualizarAgente(datosUsuarioEditarAdmin, idAgente, cedulaUsuario)

            if (res.status == 200) {
                Swal.close();
                swalAlert.mostrarAlertaSatisfactorio("Se actualizó los datos del usuario");
                Controlador.mostrarTodosUsuarios();
            } else {
                Swal.close();
                swalAlert.mostrarMensajeError("No se pudo actualizar el usuario")
            }

        } catch (error) {
            console.log(error)
            Swal.close();
            swalAlert.mostrarMensajeError("Hubo un error al actualizar los datos del usuario")
        }
    },

    async eliminarUsuario(idAgente) {
        try {
            swalAlert.mostrarPantallaDeCarga("Eliminando usuario...")
            const cedulaUsuario = localStorage.getItem('cedula')
            const res = await Modelo.eliminarUsuario(idAgente, cedulaUsuario);

            if (res.status == 200) {
                Swal.close();
                swalAlert.mostrarAlertaSatisfactorio("Se eliminó el usuario");
                const datosUsuario = controladorGeneral.datosUsuarioLogeado();

                if (datosUsuario.rol == "team leader") {
                    Controlador.mostrarUsuariosTeamLeader()
                }

                if (datosUsuario.rol == "admin") {
                    Controlador.mostrarTodosUsuarios()
                }

            } else {
                swalAlert.mostrarMensajeError("Error al eliminar la venta");
            }
        } catch (error) {
            Swal.close();
            console.log(error);
        }
    },

    /* TEAM LEADER */
    async agregarUsuarioTeamLeader() {

        try {
            const cedulaLider = localStorage.getItem('cedula')
            const res = await ModeloGeneral.traerDatosPersonalesAgente(cedulaLider)
            const liderEquipo = res.data['lider_equipo']

            const { primerNombre, primerApellido, cedula, correo, celular, grupo, campaña } = Vista.enviarDatosAgenteTeamLeader()
            const usuario = Miscelaneas.unirNombreApellido(primerNombre, primerApellido)
            const nombre = `${Miscelaneas.capitalizarTexto(primerNombre.trim())} ${Miscelaneas.capitalizarTexto(primerApellido.trim())}`
            const apodo = `${primerNombre.trim().toLowerCase()} ${primerApellido.trim().toLowerCase()}`
            const liderResponsable = 'no dado'

            if (cedula.length == 0) {
                const cedulaFinal = Miscelaneas.generarNumeroAleatorio(cedula);
                const res = await Modelo.insertarAgente(apodo, nombre, usuario, cedulaFinal, correo.toLowerCase(), celular, grupo, campaña, liderResponsable, liderEquipo, cedulaLider)
                if (res.status == 200) {
                    swalAlert.mostrarAlertaSatisfactorio("Usuario unido al equipo")
                    Miscelaneas.recargarPagina(1000)
                } else {
                    swalAlert.mostrarMensajeError("Error al crear al usuario")
                }

            } else {
                const res = await Modelo.insertarAgente(apodo, nombre, usuario, cedula, correo, celular, grupo, campaña, liderResponsable, liderEquipo, cedulaLider)
                if (res.status == 200) {
                    swalAlert.mostrarAlertaSatisfactorio("Usuario unido al equipo")
                    Miscelaneas.recargarPagina(1000)
                } else {
                    swalAlert.mostrarMensajeError("Error al crear al usuario")
                }
            }

        } catch (error) {
            console.log(error)
            swalAlert.mostrarMensajeError("Error al insertar los datos")
        }


    },

    async mostrarUsuariosTeamLeader() {
        try {
            const cedulaLider = localStorage.getItem('cedula')
            const res = await ModeloGeneral.traerDatosPersonalesAgente(cedulaLider)
            const liderEquipo = res.data['lider_equipo']

            const response = await Modelo.traerUsuariosTeamLeader(liderEquipo);

            if (response.status == 200) {
                Vista.mostrarUsuariosTeamLeader(response);
                Vista.datosEstadisticos(response);
            } else {
                swalAlert.mostrarMensajeError("Hubo un error al mostrar las ventas")
            }
        }
        catch (error) {
            console.log(error)
        }
    },

    async editarUsuarioTeamLeader() {

        try {
            swalAlert.mostrarPantallaDeCarga("Actualizando usuario...")
            const datosUsuarioEditarTeamLeader = Vista.enviarDatosAgenteTeamLeader();

            const res = await Modelo.actualizarAgenteTeamLeader(datosUsuarioEditarTeamLeader)
            if (res.status == 200) {
                Swal.close();
                swalAlert.mostrarAlertaSatisfactorio("Se actualizó los datos del usuario");
                Controlador.mostrarUsuariosTeamLeader();
            } else {
                Swal.close();
                swalAlert.mostrarMensajeError("No se pudo actualizar el usuario")
            }
        } catch (error) {
            console.log(error)
            Swal.close();
            swalAlert.mostrarMensajeError("Hubo un error al actualizar los datos del usuario")
        }
    },

    botonCrearUsuarioTeamLeader() {
        const botonCrearUsuario = document.getElementById('botonCrearUsuario')

        botonCrearUsuario.innerHTML = `<button id="abrirModalAgregarDatos" class="btn-success">Agregar usuario al equipo <i class="fa-solid fa-plus"></i></button>
        `

        const abrirModalAgregarDatos = document.getElementById('abrirModalAgregarDatos')

        abrirModalAgregarDatos.onclick = function () {
            Modal.modalCero("targetModalAgregarUsuarioTeamLeader", "cerrar-modal")
        }
    },

    iniciar() {
        Menu.opcionesMenu();
        Controlador.usuarioLogeado();
    }
}

/* Validacion en el boton, si es team leader, que abra el model que es */

export default Controlador;
