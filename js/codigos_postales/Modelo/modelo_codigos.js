import config from "../../supabase/keys.js";
const Modelo = {
    async traerInfoCodigosPostales(codigo) {

        const data_enviar = {
            "codigo_postal" : codigo
        }

        //se almacena la respuesta en "res" para obtener el resultado de la petición y retornarla para mostrar en la vista
        const res = axios({
            method: "POST",
            url: "http://127.0.0.1:5700/info-codigo/",
            data: data_enviar,
            headers: config.headers,
        });
        return res

    }
}
export default Modelo;