import Controlador from "../Controlador/controlador_perfil.js";
import Modal from '../../componentes/Modal/modal.js'
import swalAlert from "../../otros/alertas.js";

const Vista = {

    mostrarDatosUsuario(res) {
        const datos = res.data;
        const apodo = datos["apodo"];
        const campana = datos["campana"];
        const cedula = datos["cedula"];
        const celular = datos["celular"];
        const correo = datos["correo"];
        const estado = datos["estado"];
        const grupo = datos["grupo"];
        const lider_equipo = datos["lider_equipo"];
        const lider_responsable = datos["lider_responsable"];
        const nombre = datos["nombre"];
        const rol = datos["rol"];

        const informacionPerfil = document.getElementById("informacionPerfil");
        informacionPerfil.innerHTML = `
                <div class="campo">
                    <div class="titulo">
                        <p>Cédula:</p>
                    </div>
                    <div class="texto nombre">
                        <p id = "cedulaAgente">${cedula}</p>
                    </div>
                </div>

                <div class="campo">
                    <div class="titulo">
                        <p>Apodo:</p>
                    </div>
                    <div class="texto direccion">
                        <p>${apodo}</p>
                    </div>
                </div>

                <div class="campo">
                    <div class="titulo">
                        <p>Nombre:</p>
                    </div>
                    <div class="texto nombre">
                        <p>${nombre}</p>
                    </div>
                </div>

                <div class="campo">
                    <div class="titulo">
                        <p>Correo:</p>
                    </div>
                    <div class="texto correo">
                        <p>${correo}</p>
                    </div>
                </div>

                <div class="campo">
                    <div class="titulo">
                        <p>Celular:</p>
                    </div>
                    <div class="texto celular">
                        <p>${celular}</p>
                    </div>
                </div>

                <div class="campo">
                    <div class="titulo">
                        <p>Campaña:</p>
                    </div>
                    <div class="texto nombre">
                        <p>${campana}</p>
                    </div>
                </div>

                <div class="campo">
                    <div class="titulo">
                        <p>Estado:</p>
                    </div>
                    <div class="texto sexo">
                        <p>${estado}</p>
                    </div>
                </div>

                <div class="campo">
                    <div class="titulo">
                        <p>Grupo:</p>
                    </div>
                    <div class="texto fecha">
                        <p>${grupo}</p>
                    </div>
                </div>

                <div class="campo">
                    <div class="titulo">
                        <p>Lider Equipo:</p>
                    </div>
                    <div class="texto direccion">
                        <p>${lider_equipo}</p>
                    </div>
                </div>

                <div class="campo">
                    <div class="titulo">
                        <p>Lider responsable:</p>
                    </div>
                    <div class="texto direccion">
                        <p>${lider_responsable}</p>
                    </div>
                </div>

                <div class="campo">
                    <div class="titulo">
                        <p>Rol:</p>
                    </div>
                    <div class="texto direccion">
                        <p>${rol}</p>
                    </div>
                </div>


                `;
    },

    modalAbierto(res) {
        Modal.modalCero("targetModalEditarPerfil", "cerrar-modal-editar-perfil")
        const modalCuerpo = document.getElementById('modalCuerpoEditarPerfil');
        const modalCabecera = document.getElementById('modalCabeceraEditarPerfil');
        Vista.modalContenido(modalCuerpo, modalCabecera, res);
    },

    async modalCambiarContrasena(){
        const { value: password } = await Swal.fire({
            title: "Ingresa tu contraseña nueva",
            input: "password",
            inputLabel: "Contraseña",
            inputPlaceholder: "contraseña",
            inputAttributes: {
              maxlength: "14",
              autocapitalize: "off",
              autocorrect: "off"
            }
          });
          if (password) {
            swalAlert.confirmarAccion({
                funcionAlAceptar: Controlador.cambiarContrasena,
                parametroFuncionAceptar: password
            })
          }
    },

    modalContenido(modalCuerpo, modalCabecera, res) {
        const datos = res.data;
       
        const apodo = datos["apodo"];
        const campana = datos["campana"];
        const cedula = datos["cedula"];
        const celular = datos["celular"];
        const correo = datos["correo"];
        const estado = datos["estado"];
        const grupo = datos["grupo"];
        const lider_equipo = datos["lider_equipo"];
        const lider_responsable = datos["lider_responsable"];
        const nombre = datos["nombre"];
        const rol = datos["rol"];

        modalCuerpo.innerHTML = `
        <div class="lado-izquierdo">

            <div class="titulo-central-modal">
                <p id="apodoEditar">${apodo}</p>
            </div>

            <div class="contenedor-foto-perfil-modal">
                <div class="foto-perfil">
                    <img src="../img/undraw_male_avatar_g98d.svg" alt="">
                </div>
            </div>

         </div>
    
        <div class="lado-derecho">
            <div class="informacion-agente">
                <div class="lado-izquierdo-editar">
                      
                    <div class="campo">
                        <div class="titulo">
                            <p><b>Cédula:</b></p>
                        </div>
                        <div class="texto nombre">
                            <p>${cedula}</p>
                        </div>
                    </div>
                    <div class="campo">
                        <div class="titulo">
                            <p><b>Rol:</b></p>
                        </div>
                        <div class="texto direccion">
                            <p>${rol}</p>
                        </div>
                    </div>

                    <div class="campo">
                        <div class="titulo">
                            <p><b>Estado:</b></p>
                        </div>
                        <div class="texto sexo">
                            <p>${estado}</p>
                        </div>
                    </div>

                    <div class="campo">
                        <div class="titulo">
                            <p><b>Grupo:</b></p>
                        </div>
                        <div class="texto fecha">
                            <p>${grupo}</p>
                        </div>
                    </div>

                </div>
                <div class="lado-derecho-editar">
                    <div class="campo">
                        <div class="titulo">
                            <p><b>Nombre:</b></p>
                        </div>
                        <div class="texto nombre">
                        <input type="text" id="campoNombreEditar" value = "${nombre}">

                        </div>
                    </div>

                    <div class="campo">
                        <div class="titulo">
                            <p><b>Correo:</b></p>
                        </div>
                        <div class="texto correo">
                        <input type="text" id="campoCorreoEditar" value = "${correo}">

                        </div>
                    </div>

                    <div class="campo">
                        <div class="titulo">
                            <p><b>Celular:</b></p>
                        </div>
                        <div class="texto celular">
                        <input type="text" id="campoCelularEditar" value = "${celular}">

                        </div>
                    </div>

                    <div class="campo">
                        <div class="titulo">
                            <p><b>Campaña:</b></p>
                        </div>
                        <div class="texto nombre">
                            <select name="" id="campañaComboBoxCampoEditar">
                                <option value="${campana}">${campana}</option>
                                 
                                 
                            </select>
                        </div>
                    </div>

                    <div class="campo">
                        <div class="titulo">
                            <p><b>Lider Equipo:</b></p>
                        </div>
                        <div class="texto direccion">
                            <select name="" id="equipoComboBoxCampoEditar">
                                <option value="${lider_equipo}">${lider_equipo}</option>
                                <option value="ray">Ray</option>
                                <option value="davina">Davina</option>
                                <option value="laureano">Laureano</option>
                                <option value="andres">Andres</option>
                                <option value="nicanor">Nicanor</option>
                            </select>
                        </div>
                    </div>

                    <div class="campo">
                        <div class="titulo">
                            <p><b>Lider responsable:</b></p>
                        </div>
                        <div class="texto direccion">
                            <select name="" id="responsableComboBoxCampoEditar">
                                <option value="${lider_responsable}">${lider_responsable}</option>
                                 
                                 
                            </select>
                        </div>
                    </div>

                </div>
               


               
            </div>                  
        </div>
           
        `;

    },

    actualizarAgentes() {
        const apodo = document.getElementById("apodoEditar").textContent;
        const nombre = document.getElementById("campoNombreEditar").value;
        const correo = document.getElementById("campoCorreoEditar").value;
        const celular = document.getElementById("campoCelularEditar").value;
        const campaña = document.getElementById("campañaComboBoxCampoEditar").value;
        const liderResponsable = document.getElementById("responsableComboBoxCampoEditar").value;
        const liderEquipo = document.getElementById("equipoComboBoxCampoEditar").value;
        const cedulaAgente = document.getElementById("cedulaAgente").textContent;

        return {
            apodo,
            nombre,
            correo,
            celular,
            campaña,
            liderResponsable,
            liderEquipo,
            cedulaAgente
        };
    },

}
export default Vista;

document.addEventListener('DOMContentLoaded', function () {
    Controlador.iniciarPagina()
});

const abrirModal = document.getElementById("abrirModal");
abrirModal.onclick = function () {
    Controlador.datosModal()
};

const modalCambiarContrasena = document.getElementById('modalCambiarContrasena');
modalCambiarContrasena.onclick = function(){
    Vista.modalCambiarContrasena()
}

const editarAgente = document.getElementById("botonEditar");
editarAgente.onclick = function () {
    swalAlert.confirmarAccion({
        texto: 'actualizarás los datos del usuario',
        funcionAlAceptar: Controlador.editarAgente
    })
};

// Boton de actualizar contraseña se encuentra en la funcion: modalCambiarContrasena