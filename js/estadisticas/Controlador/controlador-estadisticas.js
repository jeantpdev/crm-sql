import Menu from '../../componentes/menu/menu.js'
import Modelo from '../Modelo/modelo-estadisticas.js'
import Vista from '../Vista/estadisticas.js'
const Controlador = {

    async traerAgentesPertenecientes(cedula) {
        const datosAgente = await Modelo.traerDatosPersonalesAgente(cedula)
        const lider_equipo = datosAgente.data.lider_equipo
        const res2 = await Modelo.agentesPertenecientes(lider_equipo)

        Vista.agentesPertenecientes(res2, lider_equipo)
    },

    async ventasRealizadasAgente(cedula) {
        const datosAgente = await Modelo.traerDatosPersonalesAgente(cedula)
        const lider_equipo = datosAgente.data.lider_equipo

        const res = await Modelo.infoEquipo(lider_equipo)
        Vista.datosEstadisticos(res)
    },

    async datosAgenteGraficas() {
        const rol = localStorage.getItem('rol')
        const res2 = await Modelo.traerDatosPersonalesAgente(localStorage.getItem('cedula'))

        if (rol == "team leader") {
            const nombreFormatear = res2.data['apodo']
            const liderEquipo = nombreFormatear.split(' ')[0];
            const res = await Modelo.infoEquipo(liderEquipo)
            Vista.mostrarGraficas(res)
        }

        if (rol == "agente") {
            const cedula = res2.data['cedula']
            const resAgente = await Modelo.mostrarEstadisticasAgente(cedula)
            Vista.mostrarGraficas(resAgente)
        }

    },

    async mostrarEstadisticas() {
        const rol = localStorage.getItem('rol')
        const res2 = await Modelo.traerDatosPersonalesAgente(localStorage.getItem('cedula'))

        if (rol == "agente") {
            const cedula = res2.data['cedula']
            const resAgente = await Modelo.mostrarEstadisticasAgente(cedula)
            Vista.datosEstadisticos(resAgente)
            Vista.llenarPromedios(resAgente)
        }

        if (rol == "team leader") {
            const nombre_formatear = res2.data['apodo']
            const liderEquipo = nombre_formatear.split(' ')[0];
            const res = await Modelo.mostrarEstadisticas(liderEquipo)
            Vista.datosEstadisticos(res)
            Vista.llenarPromedios(res)
        }
    },

    async mostrarEstadoVentasTabla() {
        const rol = localStorage.getItem('rol')
        const res2 = await Modelo.traerDatosPersonalesAgente(localStorage.getItem('cedula'))

        if (rol == "agente") {
            const cedula = res2.data['cedula']
            const resAgente = await Modelo.mostrarEstadisticasAgente(cedula)
            console.log(resAgente)
            Vista.mostrarTodasLasVentas(resAgente)
        }

        if (rol == "team leader") {
            const nombre_formatear = res2.data['apodo']
            const liderEquipo = nombre_formatear.split(' ')[0];
            const res = await Modelo.mostrarEstadisticas(liderEquipo)
            Vista.mostrarTodasLasVentas(res)
        }


    },

    iniciarPagina() {
        Menu.opcionesMenu();
        Vista.identificarRol()
        Controlador.datosAgenteGraficas();
        Controlador.mostrarEstadisticas();
        Controlador.mostrarEstadoVentasTabla();
    },
}
export default Controlador;