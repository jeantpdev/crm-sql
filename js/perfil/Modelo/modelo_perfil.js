import config from '../../supabase/keys.js';

//Modelo que recibe los datos y los envia a la base de datos
const Modelo = {

    async cambiarContrasena(idAgente, contrasena){

        const data_agentes ={
            id_agente: idAgente,
            contrasena: contrasena
        }

        const res = axios({
            method: "PUT",
            url: "http://127.0.0.1:5700/cambiar-contrasena/",
            data: data_agentes,
            headers: config.headers,
          });
          return res
    
    },

    async actualizarAgente(datos, idAgente){

        const data_agentes ={
            nombre: datos.nombre,
            correo: datos.correo,
            celular: datos.celular,
            campana: datos.campaña,
            lider_responsable: datos.liderResponsable,
            lider_equipo: datos.liderEquipo,
            id_agente: idAgente
        }

        const res = axios({
            method: "PUT",
            url: "http://127.0.0.1:5700/actualizar-informacion-agente/",
            data: data_agentes,
            headers: config.headers,
          });
          return res
        
        
    }
}
export default Modelo;
