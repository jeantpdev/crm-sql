import Vista from "../Vista/calidad.js";
import Modelo from "../Modelo/modelo_calidad.js";
import ModeloVentas from "../../ventas/Modelo/modelo_ventas.js";
import swalAlert from "../../otros/alertas.js"
import ModeloTabla from "../../componentes/Tabla/Modelo/modelo_tabla.js";
import Miscelaneas from "../../otros/miscelaneas.js";
import Menu from "../../componentes/menu/menu.js"

const Controlador = {

    async estadisticasSemanaMesDiaActual() {
        const response_dia_actual = await ModeloVentas.ventasDiaActual();
        const response_semana_actual = await ModeloVentas.ventaAgenteSemanaActual();
        const response_mes_actual = await ModeloVentas.ventasMesActual();

        if (response_dia_actual.data['venta_dia_status'] == "error") {
            var cant_ventas_dia_actual = 0
        } else {
            var cant_ventas_dia_actual = response_dia_actual.data['cant_ventas_dia_actual']
        }

        Vista.datosEstadisticos(cant_ventas_dia_actual, response_semana_actual, response_mes_actual);
    },

    async mostrarTodasLasVentas() {
        try {
            swalAlert.mostrarPantallaDeCarga("Actualizando tabla...")
            const response = await ModeloVentas.traerTodasLasVentas();
            if (response.status == 200) {
                Vista.mostrarTodasLasVentas(response);
                Swal.close();
            } else {
                swalAlert.mostrarMensajeError("Hubo un error al mostrar las ventas")
            }
        }
        catch (error) {
            console.log(error)
            Swal.close();
        }
    },

    async filtrarTabla() {
        try {
            swalAlert.mostrarPantallaDeCarga("Filtrando tabla...")
            const { columnaBuscar, textoBuscar } = Vista.filtrarTabla()
            const res = await ModeloTabla.filtrarTabla(columnaBuscar, textoBuscar)
            Vista.mostrarTodasLasVentas(res);
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
            swalAlert.mostrarPantallaDeCarga("Filtrando tabla...")
            const { fecha } = Vista.tomarFecha();
            const fechaFormateada = Miscelaneas.formatearFechaParaEnvio(fecha);

            const fechaVacia = fechaFormateada.length;

            if (fechaVacia === 0) {
                Vista.mostrarTodasLasVentas();
            }

            const res = await ModeloTabla.mostrarVentasPorFecha(fechaFormateada);
            Vista.mostrarTodasLasVentas(res);
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
            const res = await ModeloTabla.mostrarPorIntervalo(fechaFormateadaInicio, fechaFormateadaFinal);
            Vista.mostrarTodasLasVentas(res)

            // Simplemente para mostrar las fechas seleccionadas en string
            const intervaloFecha = `${fechaFormateadaInicio} - ${fechaFormateadaFinal} `
            Vista.mostrarFiltrosActivos('fechas', intervaloFecha)
            Swal.close();
        } catch (error) {
            console.log(error)
            Swal.close();
            swalAlert.mostrarMensajeError("Revisa que haya un rango de fechas válido")
        }


    },

    async editarventa() {
        try {
            swalAlert.mostrarPantallaDeCarga("Actualizando venta...")
            const valores = Vista.editarVenta();
            const cedulaUsuario = localStorage.getItem('cedula')
            const res = await Modelo.actualizarDatosVenta(valores, cedulaUsuario);

            if (res.status == 200) {
                Swal.close();
                swalAlert.mostrarAlertaSatisfactorio("Se actualizo el registro de la venta correctamente");
                Miscelaneas.recargarPagina(1000);
            } else {
                Swal.close();
                swalAlert.mostrarMensajeError("Error al actualizar la venta")
            }

        } catch (error) {
            Swal.close();
            console.log(error)
            swalAlert.mostrarMensajeError("Hubo un error al actualizar la venta")
        }
    },

    iniciar() {
        Controlador.mostrarTodasLasVentas();
        Controlador.estadisticasSemanaMesDiaActual();
        Menu.opcionesMenu();
    }

}

export default Controlador