import config from "../../supabase/keys.js";
import Miscelaneas from "../../otros/miscelaneas.js";

const Modelo = {

    async actualizarDatosVenta(valores, cedulaUsuario) {

        const observaciones_calidad = Miscelaneas.limpiarSaltosDeLinea(valores.observaciones_calidad)

        const data_clientes = {
            llamada_calidad: valores.llamada_calidad,
            calidad_enviada: valores.calidad_enviada,
            verificacion_calidad: valores.verificacion_calidad,
            observaciones_calidad: observaciones_calidad,
            audios_cargados: valores.audios_cargados,
            cedula: valores.cedula,
            legalizacion: valores.legalizacion,
            estado: valores.estado,
            id_venta: valores.id_venta.trim(),
            cedula_usuario: cedulaUsuario
        };

        const res = axios({
            method: "PUT",
            url: "http://127.0.0.1:5700/editar-venta-calidad/",
            data: data_clientes,
            headers: config.headers,
        });
        return res
    },

    async ventasDiaActual() {
        const res = axios({
            method: "GET",
            url: 'http://127.0.0.1:5700/estadisticas-venta-dia/',
            headers: config.headers,
        });
        return res
    },

    async ventaAgenteSemanaActual() {
        const res = axios({
            method: "GET",
            url: 'http://127.0.0.1:5700/ventas-agente-semana-actual/',
            headers: config.headers,
        });
        return res
    },

    async ventasMesActual() {
        const res = axios({
            method: "GET",
            url: 'http://127.0.0.1:5700/estadisticas-agentes-mensual/',
            headers: config.headers,
        });
        return res
    },

    async traerTodasLasVentas() {
        const res = axios({
            method: "GET",
            url: "http://127.0.0.1:5700/mostrar-ventas/",
            headers: config.headers,
        });
        return res
    },

}

export default Modelo;