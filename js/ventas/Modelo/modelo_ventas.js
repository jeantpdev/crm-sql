import config from '../../supabase/keys.js';
import Miscelaneas from '../../otros/miscelaneas.js';

const ModeloVentas = {
    /*
    async descargarCSV() {
        const res = axios({
            method: "GET",
            url: "http://127.0.0.1:5700/descargar-ventas/",
            headers: config.headers,
            responseType: 'arraybuffer',  // Indica a Axios que esperamos una respuesta binaria
        });

        return res
    },

    async descargarVentasPorIntervalo(fechaFormateadaInicio, fechaFormateadaFinal) {

        const datosEnviar = {
            fecha_inicial: fechaFormateadaInicio,
            fecha_final: fechaFormateadaFinal
        }

        const res = axios({
            method: "POST",
            url: "http://127.0.0.1:5700/descargar-ventas-intervalo-fechas/",
            headers: config.headers,
            data: datosEnviar,
            responseType: 'arraybuffer',  // Indica a Axios que esperamos una respuesta binaria
        });

        return res
    },
*/
    async traerTodasLasVentas() {
        const res = axios({
            method: "GET",
            url: "http://127.0.0.1:5700/mostrar-ventas/",
            headers: config.headers,
        });
        return res
    },

    async ventasDiaActual() {
        const res = axios({
            method: "GET",
            url: 'http://127.0.0.1:5700/ventas-dia-actual/',
            headers: config.headers,
        });
        return res
    },

    async ventasMesActual() {
        const res = axios({
            method: "GET",
            url: 'http://127.0.0.1:5700/ventas-mes-actual/',
            headers: config.headers,
        });
        return res
    },

    async traerVentasRealizadasAgente(cedula) {
        const res = axios({
            method: "GET",
            url: "http://127.0.0.1:5700/venta-agente/" + cedula,
            headers: config.headers,
        });
        return res
    },

    async insertarVenta(fechaActual, compania, nombre, dni, telefono, telefonoFijo, correo, direccion, fechaNacimiento, cupsLuz, cupsGas, iban, numeroContrato, potencia, peajeGas, observacionesVenta, cedula, liderEquipo, nombreAgente, valorMantenimiento, valorTipoMantenimiento) {

        const datos_insertar_bd = {
            compania: compania,
            fecha_ingreso: fechaActual || 'no dado',
            nombre: nombre.trim() || 'no dado',
            dni: dni,
            telefono: telefono.trim() || 'no dado',
            telefono_fijo: telefonoFijo.trim() || 'no dado',
            correo: correo.trim() || 'no dado',
            direccion: direccion.trim() || 'no dado',
            fecha_nacimiento: fechaNacimiento || 'no dado',
            cups_luz: cupsLuz || 'no tiene',
            cups_gas: cupsGas || 'no tiene',
            iban: iban.trim(),
            numero_contrato: numeroContrato.trim() || 'no dado',
            potencia: potencia.trim() || 'no dado',
            peaje_gas: peajeGas.trim() || 'no dado',
            observaciones_venta: observacionesVenta.trim() || 'no dado',
            verificacion: false,
            responsable_calidad: 'leidy',
            llamada_realizada: false, //
            calidad_enviada: false, //
            observaciones_calidad: 'pendiente', //
            audios_cargados: false, //
            estado: 'pendiente', //
            observaciones_adicionales: 'pendiente', //
            cedula: cedula,
            lider_equipo: liderEquipo,
            nombre_agente: nombreAgente,
            mantenimiento: valorMantenimiento || 'no aplica',
            tipo_mantenimiento: valorTipoMantenimiento || 'no aplica',
        }

        console.log(datos_insertar_bd)

        const res = await axios({
            method: 'POST',
            url: "http://127.0.0.1:5700/crear-venta/",
            headers: config.headers,
            data: datos_insertar_bd
        });
        return res

    },

    /*
    async ventaAgenteSemanaActual() {
        const res = axios({
            method: "GET",
            url: 'http://127.0.0.1:5700/ventas-agente-semana-actual/',
            headers: config.headers,
        });
        return res
    },

    async ventasPorLiderEquipo(liderEquipo) {
        const res = axios({
            method: "GET",
            url: 'http://127.0.0.1:5700/info-equipo/' + liderEquipo,
            headers: config.headers,
        });
        return res
    },

    async actualizarDatosVenta(valores, cedulaUsuario) {

        const observaciones_adicionales = Miscelaneas.limpiarSaltosDeLinea(valores.observaciones_adicionales)
        const observaciones_calidad = Miscelaneas.limpiarSaltosDeLinea(valores.observaciones_calidad)

        const data_clientes = {
            compania: valores.compania,
            nombre: valores.nombre,
            dni: valores.dni,
            telefono: valores.telefono,
            telefono_fijo: valores.telefonoFijo,
            correo: valores.correo,
            direccion: valores.direccion,
            fecha_nacimiento: valores.fechaNacimiento,
            cups_luz: valores.cupsLuz,
            cups_gas: valores.cupsGas,
            iban: valores.iban,
            numero_contrato: valores.numeroContrato,
            potencia: valores.potencia,
            peaje_gas: valores.peajeGas,
            tipo_mantenimiento: valores.tipoMantenimiento,
            llamada_calidad: valores.llamada_calidad,
            calidad_enviada: valores.calidad_enviada,
            verificacion_calidad: valores.verificacion_calidad,
            observaciones_calidad: observaciones_calidad,
            audios_cargados: valores.audios_cargados,
            estado: valores.estado,
            observaciones_adicionales: observaciones_adicionales,
            cedula: valores.cedula,
            legalizacion: valores.legalizacion,
            id_venta: valores.id_venta.trim(),
            cedula_usuario: cedulaUsuario
        };

        const res = await axios({
            method: "PUT",
            url: "http://127.0.0.1:5700/editar-venta/",
            headers: config.headers,
            data: data_clientes
        });
        return res
    },

    async editarEstadoDesdeTabla(idVenta, estadoo, cedulaUsuario) {

        const infoEstado = {
            estado: estadoo,
            id_venta: idVenta,
            cedula_usuario : cedulaUsuario
        }

        const res = await axios({
            method: "PUT",
            url: "http://127.0.0.1:5700/editar-venta-estado/",
            data: infoEstado,
            headers: config.headers,
        });
        return res

    },

    async eliminarVenta(id, cedulaUsuario) {

        const datosVentaEliminar = {
            id_venta: id,
            cedula_usuario : cedulaUsuario
        }

        const res = axios({
            method: "DELETE",
            url: "http://127.0.0.1:5700/eliminar-venta/",
            data: datosVentaEliminar,
            headers: config.headers,
        });
        return res
    },
    */
    /* TEAM LEADER 

    async editarEstadoVenta(valores, cedulaUsuario) {

        const observaciones_adicionales = Miscelaneas.limpiarSaltosDeLinea(valores.observaciones_adicionales)

        const infoEstado = {
            estado: valores.estado,
            id_venta: valores.id_venta.trim(),
            observaciones_adicionales: observaciones_adicionales,
            cedula_usuario: cedulaUsuario 
        }

        const res = await axios({
            method: "PUT",
            url: "http://127.0.0.1:5700/editar-venta-team-leader/",
            data: infoEstado,
            headers: config.headers,
        });
        return res

    },
*/
}

export default ModeloVentas;