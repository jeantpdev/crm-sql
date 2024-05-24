import Modelo from '../Modelo/modelo-agentes.js'
import Menu from '../../componentes/menu/menu.js'
import Vista from '../Vista/agentes.js'
import swalAlert from "../../otros/alertas.js"
import Miscelaneas from '../../otros/miscelaneas.js'
import ModeloVentas from '../../ventas/Modelo/modelo_ventas.js'
import ModeloGeneral from '../../generales/Modelo/modelo_general.js'

const Controlador = {

    async ventasRealizadasAgente() {
        const res = await ModeloVentas.traerVentasRealizadasAgente(localStorage.getItem('cedula'))

        Vista.mostrarTablaDatos(res)
        Vista.datosEstadisticos(res)
    },

    async datosAgenteGraficas() {
        const res = await ModeloVentas.traerVentasRealizadasAgente(localStorage.getItem('cedula'))
        Vista.mostrarGraficas(res)
    },

    async editarventa() {
        try {
            const valores = Vista.editarVenta();
            const cedulaUsuario = localStorage.getItem('cedula')
            const res = await ModeloVentas.actualizarDatosVenta(valores, cedulaUsuario);

            if (res.status == 200) {
                swalAlert.mostrarAlertaSatisfactorio("Se actualizó el registro de la venta correctamente");
                Miscelaneas.recargarPagina(1000)
            } else {
                swalAlert.mostrarMensajeError("Hubo un error al actualizar la venta")
            }

        } catch (error) {
            console.log(error)
            swalAlert.mostrarMensajeError("Hubo un error al actualizar la venta")
        }
    },

    async insertarDatos() {
        const { compania, nombre, dni, telefono, telefonoFijo, correo, direccion, fechaNacimiento, cupsLuz, cupsGas, iban, datos, observacionesVenta, numeroContrato, potencia, peajeGas, valorMantenimiento, valorTipoMantenimiento } = Vista.enviarDatosFormulario()
/*
        try {
*/
            const cedula = localStorage.getItem('cedula')
            const datos_agente = await ModeloGeneral.traerDatosPersonalesAgente(cedula)
            console.log(datos_agente)
            
            const nombreAgente = datos_agente.data.datos_agente[0]["nombre"];
            const liderEquipo = datos_agente.data.datos_agente[0]["lider_equipo"];
            const fechaActual = Miscelaneas.obtenerFechaActualIngresarVenta()

            const res = await ModeloVentas.insertarVenta(fechaActual, 
                                                        compania, 
                                                        Miscelaneas.capitalizarTexto(nombre), 
                                                        Miscelaneas.convertirAMayusculas(dni), 
                                                        telefono, 
                                                        telefonoFijo,
                                                        correo.toLowerCase(), 
                                                        direccion.toLowerCase(),
                                                        Miscelaneas.convertirFechaAFormatoISO(fechaNacimiento),
                                                        cupsLuz,
                                                        cupsGas, 
                                                        Miscelaneas.capitalizarTexto(iban), 
                                                        numeroContrato, 
                                                        potencia, 
                                                        peajeGas, 
                                                        observacionesVenta, 
                                                        cedula, 
                                                        liderEquipo, 
                                                        nombreAgente, 
                                                        valorMantenimiento, 
                                                        valorTipoMantenimiento)

/*
            if (res.status == 200) {
                swalAlert.mostrarAlertaSatisfactorio("Se agregó la venta correctamente");
                Miscelaneas.recargarPagina(1000)
            } else {
                swalAlert.mostrarMensajeError("Hubo un error al actualizar la venta")
            }

        } catch (error) {
            console.log(error)
            swalAlert.mostrarMensajeError("Error al insertar los datos")
        }*/
    },

    iniciarPagina() {
        Menu.opcionesMenu()
        Controlador.ventasRealizadasAgente()
    },

}
export default Controlador;