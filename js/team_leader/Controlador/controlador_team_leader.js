import Vista from "../Vista/team_leader.js";
import Modelo from "../Modelo/modelo_team_leader.js";
import ModeloVentas from "../../ventas/Modelo/modelo_ventas.js";
import swalAlert from "../../otros/alertas.js"
import ModeloTabla from "../../componentes/Tabla/Modelo/modelo_tabla.js";
import Miscelaneas from "../../otros/miscelaneas.js";
import Menu from "../../componentes/menu/menu.js"
import ModeloGeneral from "../../generales/Modelo/modelo_general.js";
import cuadrosEstadisticos from "../../componentes/cuadros-estadisticos/cuadros-estadisticos.js";

const Controlador = {

    async editarEstadoVenta() {
        const valores = Vista.editarEstadoVenta()
        const cedulaUsuario = localStorage.getItem('cedula')

        const res = await ModeloVentas.editarEstadoVenta(valores, cedulaUsuario)

        if (res.status == 200) {
            swalAlert.mostrarAlertaSatisfactorio("Venta modificada")
            Miscelaneas.recargarPagina(1000)
        } else {
            swalAlert.mostrarMensajeError("Ocurrió un error mientras se cambiaba el estado de la venta")
        }
    },

    async mostrarVentasTeamLeader() {
        try {
            swalAlert.mostrarPantallaDeCarga("Actualizando tabla...")
            const res2 = await Modelo.traerDatosPersonalesAgente(localStorage.getItem('cedula'))
            const nombre_formatear = res2.data['apodo']
            const liderEquipo = nombre_formatear.split(' ')[0];

            const res = await Modelo.infoEquipo(liderEquipo)
            if (res.status == 200) {
                Vista.mostrarTablaDatos(res)
                Swal.close();
            } else {
                swalAlert.mostrarMensajeError("Hubo un error al mostrar las ventas")
            }

        } catch (error) {
            console.log(error)
            Swal.close();
        }

    },

    async insertarDatos() {
        const { compania, nombre, dni, telefono, telefonoFijo, correo, direccion, fechaNacimiento, cupsLuz, cupsGas, iban, datos, observacionesVenta, numeroContrato, potencia, peajeGas, valorMantenimiento, valorTipoMantenimiento } = Vista.enviarDatosFormulario()

        try {

            const cedula = localStorage.getItem('cedula')
            const datos_agente = await ModeloGeneral.traerDatosPersonalesAgente(cedula)

            const nombreAgente = datos_agente.data.apodo;
            const liderEquipo = datos_agente.data.lider_equipo;
            const liderResponsable = datos_agente.data.lider_responsable;
            const fechaActual = Miscelaneas.obtenerFechaActualIngresarVenta()

            const res = await ModeloVentas.insertarVenta(fechaActual, compania, Miscelaneas.convertirAMayusculas(nombre), Miscelaneas.convertirAMayusculas(dni), telefono, telefonoFijo, correo.toLowerCase(), direccion, fechaNacimiento, cupsLuz, cupsGas, Miscelaneas.capitalizarTexto(iban), datos, numeroContrato, potencia, peajeGas, observacionesVenta, cedula, liderEquipo, liderResponsable, nombreAgente, valorMantenimiento, valorTipoMantenimiento,)

            if (res.status == 200) {
                swalAlert.mostrarAlertaSatisfactorio("Se agregó la venta correctamente");
                Miscelaneas.recargarPagina(1000)
            } else {
                swalAlert.mostrarMensajeError("Hubo un error al actualizar la venta")
            }

        } catch (error) {
            console.log(error)
            swalAlert.mostrarMensajeError("Error al insertar los datos")
        }
    },

    async ventasRealizadasAgente() {
        const res2 = await Modelo.traerDatosPersonalesAgente(localStorage.getItem('cedula'))
        const nombre_formatear = res2.data['apodo']
        const liderEquipo = nombre_formatear.split(' ')[0];

        const res = await Modelo.infoEquipo(liderEquipo)
        Vista.datosEstadisticos(res)
        Vista.mostrarTablaDatos(res)
    },

    async buscarDatosPersonalesAgente(cedulaAgente) {
        // const { combobox } = Vista.traerCedulaAgente();
        const res = await Modelo.traerDatosPersonalesAgente(cedulaAgente)

        //const res2 = await Modelo.traerVentasRealizadasAgente(cedulaAgente)

        const res3 = await Modelo.mostrarEstadisticas(cedulaAgente);

        Vista.llenarDatosPersonalesAgente(res)
        Vista.llenarEstadisticasAgente(res3)
    },

    async traerAgentesPertenecientes() {

        const res = await ModeloGeneral.traerDatosPersonalesAgente(localStorage.getItem('cedula'))
        const nombre_formatear = res.data['apodo']
        const liderEquipo = nombre_formatear.split(' ')[0];

        const res2 = await Modelo.agentesPertenecientes(liderEquipo)
        Vista.agentesPertenecientes(res2)
        Vista.comboboxBuscarAgente(res2)
    },

    async filtrarTabla() {

        try {
            swalAlert.mostrarPantallaDeCarga("Filtrando tabla...")

            const { columnaBuscar, textoBuscar } = Vista.filtrarTabla();

            // Datos del lider de equipo
            const cedulaUsuario = localStorage.getItem('cedula')
            const datos_agente = await ModeloGeneral.traerDatosPersonalesAgente(cedulaUsuario)
            const liderEquipo = datos_agente.data.lider_equipo;

            const res2 = await ModeloTabla.filtrarTablaTeamLeader(columnaBuscar, textoBuscar, liderEquipo);
            Vista.mostrarTodasLasVentas(res2);
            Vista.mostrarFiltrosActivos(columnaBuscar, textoBuscar);
            Swal.close();
        } catch (error) {
            console.log(error)
            Swal.close(); // Este cierra el Swal de carga para abrir el de error
            swalAlert.mostrarMensajeError("Revisa que haya un rango de fechas válido")
        }

    },

    async datosPorFecha() {

        try {
            const { fecha } = Vista.tomarFecha();

            const fechaFormateada = Miscelaneas.formatearFechaParaEnvio(fecha);

            // Datos del lider de equipo
            const cedulaUsuario = localStorage.getItem('cedula')
            const datos_agente = await ModeloGeneral.traerDatosPersonalesAgente(cedulaUsuario)
            const liderEquipo = datos_agente.data.lider_equipo;

            const res2 = await ModeloTabla.mostrarVentasPorFechaTeamLeader(fechaFormateada, liderEquipo);

            Vista.mostrarTodasLasVentas(res2);
            Vista.mostrarFiltrosActivos('fecha', fechaFormateada)
            Swal.close();

        } catch (error) {
            console.log(error)
            Swal.close(); // Este cierra el Swal de carga para abrir el de error
            swalAlert.mostrarMensajeError("Revisa que haya un rango de fechas válido")
        }

    },

    async datosPorIntervalo() {

        try {
            swalAlert.mostrarPantallaDeCarga("Filtrando tabla...")
            const { fechaInicio, fechaFinal } = Vista.buscarPorIntervalo()

            const fechaFormateadaInicio = Miscelaneas.formatearFechaParaEnvio(fechaInicio);
            const fechaFormateadaFinal = Miscelaneas.formatearFechaParaEnvio(fechaFinal)

            const res = await ModeloGeneral.traerDatosPersonalesAgente(localStorage.getItem('cedula'))
            const nombre_formatear = res.data['apodo']
            const liderEquipo = nombre_formatear.split(' ')[0];

            const res2 = await ModeloTabla.mostrarPorIntervaloTeamLeader(liderEquipo, fechaFormateadaInicio, fechaFormateadaFinal);
            console.log(res2)
            Vista.mostrarTodasLasVentas(res2);
            const intervaloFecha = `${fechaFormateadaInicio} - ${fechaFormateadaFinal} `
            Vista.mostrarFiltrosActivos('fechas', intervaloFecha)
            Swal.close();

        } catch (error) {
            console.log(error)
            Swal.close(); // Este cierra el Swal de carga para abrir el de error
            swalAlert.mostrarMensajeError("Revisa que haya un rango de fechas válido")
        }

    },

    iniciar() {
        Controlador.traerAgentesPertenecientes();
        Controlador.ventasRealizadasAgente();
        Menu.opcionesMenu();
    }
}

export default Controlador;