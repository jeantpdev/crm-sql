import Controlador from "../Controlador/controlador_usuarios.js";
import cuadrosEstadisticos from '../../componentes/cuadros-estadisticos/cuadros-estadisticos.js';
import Miscelaneas from '../../otros/miscelaneas.js';
import Modal from '../../componentes/Modal/modal.js'
import swalAlert from '../../otros/alertas.js';

const Vista = {

    datosEstadisticos(response) {
        
        if (response.data.cant_usuarios){
            const cant_usuarios = response.data.cant_usuarios
            cuadrosEstadisticos.llenarCuadroVentasTotales(cant_usuarios, 'Cantidad de agentes')
        }

    },

    /* ADMIN */

    mostrarTodosUsuarios(response) {
        console.log(response)
        const datos = response.data.usuarios

        //const datos = response.data['ventas_realizadas'];
        const tablaDatos = document.getElementById('tablaDatos');
        tablaDatos.innerHTML = '';

        // Definir las columnas que deseas mostrar
        const columnasAMostrar = ['usuario', 'nombre', 'lider_equipo', 'rol', 'correo'];
        //const columnas = Object.keys(datos[0]);

        // Crear encabezado
        const encabezadoRow = document.createElement('tr');
        for (const columna of columnasAMostrar) {
            const th = document.createElement('th');
            th.textContent = columna;
            encabezadoRow.appendChild(th);
        }
        tablaDatos.appendChild(encabezadoRow);

        // Crear filas de datos
        datos.forEach(dato => {
            const fila = document.createElement('tr');
            for (const columna of columnasAMostrar) {
                const celda = document.createElement('td');
                celda.textContent = dato[columna];

                // Agregar la clase "estado-verde" a la celda específica
                if (columna === 'rol' && dato[columna] === 'team leader') {
                    celda.classList.add('letras-estado-morado');
                }

                // Agregar la clase "estado-verde" a la celda específica
                if (columna === 'rol' && dato[columna] === 'calidad') {
                    celda.classList.add('letras-estado-verde');
                }

                // Agregar la clase "estado-verde" a la celda específica
                if (columna === 'rol' && dato[columna] === 'reportes') {
                    celda.classList.add('letras-estado-azul');
                }

                // Agregar la clase "estado-verde" a la celda específica
                if (dato[columna] === 'no dado' || dato[columna] === 'no asignado') {
                    celda.classList.add('letras-estado-rojo');
                }

                fila.appendChild(celda);
            }
            // Agregar botones de editar, eliminar y ver a cada fila
            for (let i = 0; i < 2; i++) {
                const celda = document.createElement('td');
                const boton = document.createElement('button');
                const icono = document.createElement('i');

                // Agregar la clase especial 'no-padding' a las celdas de los botones
                celda.classList.add('no-padding');

                if (i === 0) {
                    // Configuración para el botón de editar
                    icono.classList.add('fa-solid', 'fa-pen-to-square');
                    icono.setAttribute('id', 'abrirModalInformacionUsuario');
                    boton.addEventListener('click', () => {
                        Modal.modalCero("targetModalInformacionUsuario", "cerrar-modal-editar-usuario")
                        const modalCuerpo = document.getElementById('modalCuerpoEditarUsuario');
                        const modalCabecera = document.getElementById('modalCabecera');
                        Vista.modalContenidoEditarUsuario(modalCuerpo, modalCabecera, dato)
                    });
                }
                else if (i === 1) {
                    // Configuración para el botón de eliminar
                    icono.classList.add('fa-solid', 'fa-trash');
                    boton.addEventListener('click', function () {
                        // Lógica para eliminar el elemento
                        Swal.fire({
                            title: `¿Estás seguro? `,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Eliminar"
                        }).then((result) => {
                            if (result.isConfirmed) {
                                const idAgente = dato['id_agente'];
                                Controlador.eliminarUsuario(idAgente);
                            }
                        });
                    });
                }

                boton.appendChild(icono);
                celda.appendChild(boton);
                fila.appendChild(celda);
            }

            tablaDatos.appendChild(fila);
        });
    },

    modalContenidoEditarUsuario(modalCuerpo, modalCabecera, dato) {

        const apodo = dato.apodo;
        const campana = dato.campana;
        const cedula = dato.cedula;
        const celular = dato.celular;
        const correo = dato.correo;
        const estado = dato.estado;
        const grupo = dato.grupo;
        const lider_equipo = dato.lider_equipo;
        const nombre = dato.nombre;
        const rol = dato.rol;

        modalCuerpo.innerHTML = `
    
        <div class="informacion-agente">
        <div class="no-editable">
    
            <div class="campo">
                <div class="titulo">
                    <p><b>Apodo:</b></p>
                </div>
                <div class="texto nombre">
                    <p id="apodoEditar">${apodo}</p>
                </div>
            </div>
    
    
            <div class="campo">
                <div class="titulo">
                    <p><b>Cédula:</b></p>
                </div>
                <div class="texto nombre">
                    <p id = "cedulaEditar">${cedula}</p>
                </div>
            </div>
    
            <div class="campo">
                <div class="titulo">
                    <p><b>Estado:</b></p>
                </div>
                <div class="texto">
                    <p>${estado}</p>
                </div>
            </div>
    
        </div>
    
        <div class="editable">

            <div class="campo">
                <div class="titulo">
                    <p><b>Nombre:</b></p>
                </div>
                <div class="texto nombre">
                    <input type="text" id="campoNombreEditar" value="${nombre}">
    
                </div>
            </div>
    
            <div class="campo">
                <div class="titulo">
                    <p><b>Correo:</b></p>
                </div>
                <div class="texto correo">
                    <input type="text" id="campoCorreoEditar" value="${correo}">
    
                </div>
            </div>
    
            <div class="campo">
                <div class="titulo">
                    <p><b>Celular:</b></p>
                </div>
                <div class="texto celular">
                    <input type="text" id="campoCelularEditar" value="${celular}">
    
                </div>
            </div>
    
            <div class="campo">
                <div class="titulo">
                    <p><b>Campaña:</b></p>
                </div>
                <div class="texto nombre">
                    <select name="" id="campañaComboBoxCampoEditar">
                        <option value="${campana}">${campana}</option>
                        <option value="choti">Choti</option>
                        <option value="moni">Moni</option>
                    </select>
                </div>
            </div>

            <div class="campo">
                <div class="titulo">
                    <p><b>Rol:</b></p>
                </div>
                <div class="texto direccion">
                <select name="" id="rolComboBoxCampoEditar">
                    <option value="${rol}">${rol}</option>
                    <option value="agente">agente</option>
                    <option value="team leader">team leader</option>
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
                        <option value="jean">Jean</option>
                        <option value="carlos">Carlos</option>
                    </select>
                </div>
            </div>

            <div class="campo">
                <div class="titulo">
                    <p><b>Grupo:</b></p>
                </div>
                <div class="texto">
                    <select name="" id="grupoComboBoxCampoEditar">
                        <option value="${grupo}">${grupo}</option>
                    </select>
                </div>
            </div>  
    
        </div>
    
    </div>      
           
        `;

        return modalCabecera, modalCuerpo;
    },

    enviarDatosNuevoUsuario() {
        const primerNombre = document.getElementById('primerNombre').value;
        const primerApellido = document.getElementById('primerApellido').value;
        const cedula = document.getElementById('cedulaAgente').value;
        const correo = document.getElementById('correoAgente').value;
        const liderEquipo = document.getElementById('liderEquipo').value;

        return {
            primerNombre,
            primerApellido,
            cedula,
            correo,
            liderEquipo
        };

    },

    enviarDatosAgenteEditarAdmin() {
        const apodo = document.getElementById('apodoEditar').textContent;
        const nombre = document.getElementById('campoNombreEditar').value;
        const cedula = document.getElementById('cedulaEditar').textContent;
        const correo = document.getElementById('campoCorreoEditar').value;
        const celular = document.getElementById('campoCelularEditar').value;
        const campaña = document.getElementById('campañaComboBoxCampoEditar').value;
        const grupo = document.getElementById('grupoComboBoxCampoEditar').value;
        const rol = document.getElementById('rolComboBoxCampoEditar').value;
        const liderEquipo = document.getElementById('equipoComboBoxCampoEditar').value;
        const liderResponsable = document.getElementById('responsableComboBoxCampoEditar').value;

        return {
            apodo,
            nombre,
            cedula,
            correo,
            celular,
            campaña,
            grupo,
            rol,
            liderEquipo,
            liderResponsable
        };

    },

    /* TEAM LEADER */

    mostrarUsuariosTeamLeader(response) {
        const datos = response.data.lista_agentes

        //const datos = response.data['ventas_realizadas'];
        const tablaDatos = document.getElementById('tablaDatos');
        tablaDatos.innerHTML = '';

        // Definir las columnas que deseas mostrar
        const columnasAMostrar = ['apodo', 'usuario', 'cedula', 'nombre', 'campana', 'correo', 'celular', 'grupo'];
        //const columnas = Object.keys(datos[0]);

        // Crear encabezado
        const encabezadoRow = document.createElement('tr');
        for (const columna of columnasAMostrar) {
            const th = document.createElement('th');
            th.textContent = columna;
            encabezadoRow.appendChild(th);
        }
        tablaDatos.appendChild(encabezadoRow);

        // Crear filas de datos
        datos.forEach(dato => {
            const fila = document.createElement('tr');
            for (const columna of columnasAMostrar) {
                const celda = document.createElement('td');
                celda.textContent = dato[columna];

                // Agregar la clase "estado-verde" a la celda específica
                if (columna === 'verificacion_calidad' && dato[columna] === 'cumple calidad') {
                    celda.classList.add('letras-estado-verde');
                }

                // Agregar la clase "estado-verde" a la celda específica
                if (dato[columna] === 'no dado' || dato[columna] === 'no asignado') {
                    celda.classList.add('letras-estado-rojo');
                }



                fila.appendChild(celda);
            }
            // Agregar botones de editar, eliminar y ver a cada fila
            for (let i = 0; i < 1; i++) {
                const celda = document.createElement('td');
                const boton = document.createElement('button');
                const icono = document.createElement('i');

                // Agregar la clase especial 'no-padding' a las celdas de los botones
                celda.classList.add('no-padding');

                if (i === 0) {
                    icono.classList.add('fa-solid', 'fa-trash');
                    boton.addEventListener('click', function () {
                        // Lógica para eliminar el elemento
                        Swal.fire({
                            title: `¿Estás seguro? `,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Eliminar"
                        }).then((result) => {
                            if (result.isConfirmed) {
                                const idAgente = dato['id_agente'];
                                Controlador.eliminarUsuario(idAgente);
                            }
                        });
                    });
                }
                else if (i === 1) {
                    // Configuración para el botón de eliminar

                }

                boton.appendChild(icono);
                celda.appendChild(boton);
                fila.appendChild(celda);
            }

            tablaDatos.appendChild(fila);
        });
    },

    enviarDatosAgenteTeamLeader() {
        const primerNombre = document.getElementById('teamLeader_primerNombre').value;
        const primerApellido = document.getElementById('teamLeader_primerApellido').value;
        const cedula = document.getElementById('teamLeader_cedulaAgente').value;
        const correo = document.getElementById('teamLeader_correoAgente').value;
        const celular = document.getElementById('teamLeader_celularAgente').value;
        const grupo = document.getElementById('teamLeader_grupo').value;
        const campaña = document.getElementById('teamLeader_campaña').value;

        return {
            primerNombre,
            primerApellido,
            cedula,
            correo,
            celular,
            grupo,
            campaña,
        };

    },

    modalContenidoEditarUsuarioTeamLeader(modalCuerpo, modalCabecera, dato) {

        const apodo = dato.apodo;
        const campana = dato.campana;
        const cedula = dato.cedula;
        const celular = dato.celular;
        const correo = dato.correo;
        const estado = dato.estado;
        const grupo = dato.grupo;
        const lider_responsable = dato.lider_responsable;
        const nombre = dato.nombre;

        modalCuerpo.innerHTML = `
        
            <div class="informacion-agente">
            <div class="no-editable">
        
                <div class="campo">
                    <div class="titulo">
                        <p><b>Apodo:</b></p>
                    </div>
                    <div class="texto nombre">
                        <p id="apodoEditar">${apodo}</p>
                    </div>
                </div>
        
        
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
        
            <div class="editable">
    
                <div class="campo">
                    <div class="titulo">
                        <p><b>Nombre:</b></p>
                    </div>
                    <div class="texto nombre">
                        <input type="text" id="teamLeader_nombre" value="${nombre}">
        
                    </div>
                </div>
        
                <div class="campo">
                    <div class="titulo">
                        <p><b>Correo:</b></p>
                    </div>
                    <div class="texto correo">
                        <input type="text" id="campoCorreoEditar" value="${correo}">
        
                    </div>
                </div>
        
                <div class="campo">
                    <div class="titulo">
                        <p><b>Celular:</b></p>
                    </div>
                    <div class="texto celular">
                        <input type="text" id="campoCelularEditar" value="${celular}">
        
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
               
            `;

        return modalCabecera, modalCuerpo;
    },

    filtrarTabla() {
        const columnaBuscarComboBox = document.getElementById('columnaBuscar');
        const textoBuscar = document.getElementById('textoBuscar').value;

        columnaBuscarComboBox.addEventListener('change', () => {
            const estado = columnaBuscarComboBox.value;

            if (estado === "sin filtros") {
                this.recargarPagina(500)
                let textoBuscar = document.getElementById('textoBuscar');
                textoBuscar.value = ""
            }

        })

        const columnaBuscar = columnaBuscarComboBox.value;

        return { columnaBuscar, textoBuscar }

    },
}


export default Vista;

document.addEventListener('DOMContentLoaded', function () {

    Controlador.iniciar();
    const botonAgregarUsuarioAdmin = document.getElementById('botonAgregarUsuarioAdmin')

    botonAgregarUsuarioAdmin.onclick = function () {
        Controlador.agregarUsuarioAdmin()
    }

    const botonAgregarUsuarioTeamLeader = document.getElementById('botonAgregarUsuarioTeamLeader')

    botonAgregarUsuarioTeamLeader.onclick = function () {
        Controlador.agregarUsuarioTeamLeader()
    }

    const botonEditarUsuarioAdmin = document.getElementById('botonEditarUsuarioAdmin')

    botonEditarUsuarioAdmin.onclick = function () {
        Controlador.editarUsuarioAdmin()
    }

    const botonEditarUsuarioTeamLeader = document.getElementById('botonEditarUsuarioTeamLeader')

    botonEditarUsuarioTeamLeader.onclick = function () {
        Controlador.editarUsuarioTeamLeader()
    }
/*
    // Boton que permite filtrar los registros según una columna y texto a buscar
    const btnFiltrarTabla = document.getElementById('btnFiltrarTabla');
    btnFiltrarTabla.onclick = function () {
        Controlador.filtrarTabla();
    }
*/

});
