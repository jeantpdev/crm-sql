import config from "../../supabase/keys.js";

const Modelo = {
    
    async traerUsuarios() {
        const res = axios({
            method: "GET",
            url: 'http://127.0.0.1:5700/traer-usuarios/',
            headers: config.headers,
        });
        return res
    },

    async traerUsuariosTeamLeader(lider_equipo) {
        const res = axios({
            method: "GET",
            url: 'http://127.0.0.1:5700/lista-agentes/'+lider_equipo,
            headers: config.headers,    
        });
        return res
    },

    async insertarAgente(nombre, usuario, cedula, correo, liderEquipo) {

        const data_agentes = {
            usuario: usuario,
            nombre: nombre,
            cedula: cedula,
            correo: correo || 'no dado',
            lider_equipo: liderEquipo,
            rol: 'agente',
            contrasena: "Global2024*"
        }
        
        console.log(data_agentes)

        const res = await axios({
            method: "POST",
            url: "http://127.0.0.1:5700/crear-usuario/",
            headers: config.headers,
            data: data_agentes
        })
        return res
    },

    async actualizarAgente(datosUsuarioEditarAdmin, idAgente, cedulaUsuario) {

        const data_agentes = {
            apodo: datosUsuarioEditarAdmin.apodo,
            nombre: datosUsuarioEditarAdmin.nombre,
            correo: datosUsuarioEditarAdmin.correo,
            celular: datosUsuarioEditarAdmin.celular,
            campana: datosUsuarioEditarAdmin.campaña,
            lider_responsable: datosUsuarioEditarAdmin.liderResponsable,
            grupo: datosUsuarioEditarAdmin.grupo,
            rol: datosUsuarioEditarAdmin.rol,
            lider_equipo: datosUsuarioEditarAdmin.liderEquipo,
            id_agente: idAgente,
            cedula_usuario: cedulaUsuario
        }

        const res = axios({
            method: "PUT",
            url: "http://127.0.0.1:5700/actualizar-informacion-agente/",
            data: data_agentes,
            headers: config.headers,
        });
        return res

    },

    async actualizarAgenteTeamLeader(datosUsuarioEditarTeamLeader) {

        const data_agentes = {
            apodo: datosUsuarioEditarTeamLeader.apodo,
            nombre: datosUsuarioEditarTeamLeader.nombre,
            correo: datosUsuarioEditarTeamLeader.correo,
            celular: datosUsuarioEditarTeamLeader.celular,
            campana: datosUsuarioEditarTeamLeader.campaña,
            lider_responsable: datosUsuarioEditarTeamLeader.liderResponsable,
        }

        const res = axios({
            method: "PUT",
            url: "http://127.0.0.1:5700/actualizar-informacion-agente-team-leader/",
            data: data_agentes,
            headers: config.headers,
        });
        return res
    },

    async eliminarUsuario(idAgente, cedulaUsuario) {

        const infoUsuarioEliminar = {
            id_agente: idAgente,
            cedula_usuario: cedulaUsuario
        }

        const res = axios({
            method: "DELETE",
            url: "http://127.0.0.1:5700/eliminar-usuario/",
            data: infoUsuarioEliminar,
            headers: config.headers,
        });

        return res
    },
}

export default Modelo;