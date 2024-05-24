import Menu from "../../componentes/menu/menu.js";
import Modelo from '../Modelo/modelo_codigos.js'
import Vista from '../Vista/codigos.js'
const Controlador = {

    iniciarPagina(){
        Menu.opcionesMenu()
    },

    async datosCodigoPostal() {
        const { codigo } = Vista.codigoPostalBuscar();
        const res = await Modelo.traerInfoCodigosPostales(codigo)

        Vista.mostrarDatosCodigo(res)
    },
}
export default Controlador;