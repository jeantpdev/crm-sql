import Modelo from "../Modelo/modelo_login.js";
import Vista from "../Vista/login.js";
import Miscelaneas from "../../otros/miscelaneas.js";
import swalAlert from "../../otros/alertas.js";

const Controlador = {

    async iniciarSesion() {
        const { usuario, password } = Vista.getDatosInicioSesion();
        try {
            const res = await Modelo.iniciar_sesion(usuario, password);

            if (res.data.acceso == "AUTORIZADO") {
                const access_token = res.data.access_token;
                const cedula = res.data.cedula;
                const rol = res.data.rol;

                localStorage.setItem("access_token", access_token);
                localStorage.setItem("cedula", cedula);
                localStorage.setItem("rol", rol);

                if(res.data.rol == "admin"){
                    Miscelaneas.redirigirAdmin();
                }

                if (res.data.rol == "agente"){
                    Miscelaneas.redirigirAIndex();
                }

                if (res.data.rol == "team leader"){
                    Miscelaneas.redirigirTeamLeader();
                }

                if (res.data.rol == "calidad"){
                    Miscelaneas.redirigirCalidad();
                }
                
                if (res.data.rol == "reportes"){
                    Miscelaneas.redirigirReportes();
                }


            } else {
                swalAlert.mostrarMensajeError("Usuario no encontrado")
                Miscelaneas.redirigirAdmin();
                //Vista.limpiarCampos();
            }

        } catch (err) {
            swalAlert.mostrarMensajeError('Error al iniciar sesión');
            console.log(err);
        }
    },



}
export default Controlador