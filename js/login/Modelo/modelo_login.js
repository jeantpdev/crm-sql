import config from "../../supabase/keys.js";

//Modelo que recibe los datos y los envia a la base de datos
const Modelo = {

    async iniciar_sesion(usuario, password) {

        const datos_insertar_bd = {
            usuario: usuario,
            contrasena: password
        }
        //se almacena la respuesta en "res" para obtener el resultado de la petición y retornarla para mostrar en la vista
        const res = axios({
            method: "POST",
            url: "http://127.0.0.1:5700/iniciar-sesion/",
            headers: config.headers,
            data: datos_insertar_bd,
        });
        return res
    },
}
export default Modelo; 
