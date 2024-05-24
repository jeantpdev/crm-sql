import Controlador from "../Controlador/controlador_codigos.js";

const Vista = {
    codigoPostalBuscar() {
        const codigo = document.getElementById('codigoPostal').value;
        return { codigo }
    },

    mostrarDatosCodigo(res) {

        const datos = res.data
        const codigoPostal = datos['codigo_postal']
        const nombreProvincia = datos['nombre_provincia']
        const nombreComunidad = datos['nombre_comunidad']
        const provinciaNombre = nombreProvincia.replace(/�/g, 'Ñ')
        const comunidadNombre = nombreComunidad.replace(/�/g, 'Ñ')

        const contenedorCodigoPostal = document.getElementById('verCodigoPostal')
        const contenedorNombreProvincia = document.getElementById('verNombreProvincia')
        const contenedorNombreComunidad = document.getElementById('verNombreComunidad')
        const contenedorCuenta = document.getElementById("cuentaIngresar")

        if (codigoPostal == 'No encontrado') {

            contenedorCuenta.innerHTML = `
            <p> <b>No existe información para el código postal</p>
            `
        } else {

          

            contenedorCodigoPostal.innerHTML =
                `
                <p>${codigoPostal}</p>
            `;

            contenedorNombreProvincia.innerHTML =
                `
                <p>${provinciaNombre}</p>
            `;

            contenedorNombreComunidad.innerHTML =
                `
                <p>${comunidadNombre}</p>
            `;

        }
        if (comunidadNombre === 'CATALUÑA'){
            contenedorCuenta.innerHTML = `
            <p> <b>Nota: La venta debe ser registrada con la cuenta de : ${comunidadNombre}</p> <br>
            <ul>
            <li>USUARIO CATALUÑA</li>
            <li>CARLOS STEVEN VILLAMIZAR RUIZ</li>
            <li>ACREDICION: Y520420</li>
            <li>DNI: Y1264262N</li>
            <li>CLAVE: GrupoGestionex04!</li>
            </ul>
            `

        }else if (comunidadNombre === 'ARAGON'){
            contenedorCuenta.innerHTML = `
            <p> <b>Nota: La venta debe ser registrada con la cuenta de : ${comunidadNombre}</p> <br>
            <ul>
            <li>USUARIO ARAGON</li>
            <li>VICENTE JAVIER AGUDO BUENO</li>
            <li>ACREDICION: Y499260</li>
            <li>DNI: 06266215A</li>
            <li>CLAVE: GrupoGestionex04!</li>
            </ul>
            `
        }else if (comunidadNombre === 'BALEARES'){
            contenedorCuenta.innerHTML = `
            <p> <b>Nota: La venta debe ser registrada con la cuenta de : ${comunidadNombre}</p> <br>
            <ul>
            <li>USUARIO BALEARES</li>
            <li>KAREN JULY HUANCA</li>
            <li>ACREDICION: YA75260</li>
            <li>DNI: 11782211R</li>
            <li>CLAVE: Gestionex.1</li>
            </ul>
            `
        }else{
            contenedorCuenta.innerHTML = `
            <p> <b>Nota: La venta debe ser registrada con la cuenta de : ${comunidadNombre}</p> <br>
            <ul>
            <li>USUARIO BALEARES</li>
            <li>KAREN JULY HUANCA</li>
            <li>ACREDICION: YA75260</li>
            <li>DNI: 11782211R</li>
            <li>CLAVE: Gestionex.1</li>
            </ul>
            
     
            `
        }




    },

}
export default Vista;

document.addEventListener('DOMContentLoaded', function(){
    Controlador.iniciarPagina()
})

const btnBuscarCodigo = document.getElementById('btnBuscarCodigo');

btnBuscarCodigo.onclick = function () {
    Controlador.datosCodigoPostal()
}

const botonEnter = document
botonEnter.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        Controlador.datosCodigoPostal();
    }
});
