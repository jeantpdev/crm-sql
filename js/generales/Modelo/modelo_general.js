import config from "../../supabase/keys.js";

const Modelo = {

    async traerDatosPersonalesAgente(cedula) {

        //se almacena la respuesta en "res" para obtener el resultado de la petición y retornarla para mostrar en la vista
        const res = axios({
            method: "GET",
            url: "http://127.0.0.1:5700/datos-personales/" + cedula,
            headers: config.headers,
        });
        return res
    },

}

export default Modelo;