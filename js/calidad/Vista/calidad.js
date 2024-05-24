import Controlador from "../Controlador/controlador_calidad.js";
import cuadrosEstadisticos from '../../componentes/cuadros-estadisticos/cuadros-estadisticos.js';
import Miscelaneas from '../../otros/miscelaneas.js';
import Modal from '../../componentes/Modal/modal.js'
import swalAlert from '../../otros/alertas.js';
import Tabla from "../../componentes/Tabla/tabla.js";
import ModeloVentas from "../../ventas/Modelo/modelo_ventas.js";
import ModeloGeneral from "../../generales/Modelo/modelo_general.js";

const Vista = {

    datosEstadisticos(cant_ventas_dia_actual, response_semana_actual, response_mes_actual) {
        const cant_ventas_semana_actual = response_semana_actual.data['cant_ventas_semana_actual']
        const cant_ventas_mes_actual = response_mes_actual.data['cant_ventas_mes_actual']

        cuadrosEstadisticos.llenarCuadroVentasTotales(cant_ventas_dia_actual, "Ventas dia actual")
        cuadrosEstadisticos.llenarCuadroVentasTotales(cant_ventas_semana_actual, "Ventas semana actual")
        cuadrosEstadisticos.llenarCuadroVentasTotales(cant_ventas_mes_actual, "Ventas mes actual")

    },

    modalContenido(modalCuerpo, modalCabecera, dato) {
        modalCuerpo.innerHTML =
            `
            <div class="campos">

                <div class="informacion-agente-venta">
                    <h3>Informacion agente</h3>
            
                    <div class="informacion-agente">
                        <p><i class="fa-solid fa-hashtag"></i><b> Id venta:</b></p>
                        <p id="idVenta">${dato['id']}</p>
                        <p>Cedula:</p>
                        <p id="cedula">${dato['cedula']}</p>
                        <p><i class="fa-solid fa-calendar-days"></i><b> Fecha:</b> ${dato['fecha_ingreso_venta']}</p>
                        <p><i class="fa-solid fa-people-group"></i><b> Lider Equipo:</b> ${dato['lider_equipo']}</p>
                        <p><i class="fa-solid fa-user"></i><b> Agente:</b> ${dato['nombre_agente']}</p>
                    </div>
            
                </div>
            
            
                <div class="informacion-venta">
            
                    <div class="contenido-venta">
            
                        <div class="campo compania">
                            <div class="texto">
                                <p>Compañia:</p>
                            </div>
                            <div class="entrada">
                                <p>${dato['compania']}</p>
                            </div>
                        </div>
            
                        <div class="campo dni">
                            <div class="texto">
                                <p>DNI:</p>
                            </div>
                            <div class="entrada">
                                <input disabled type="text" value="${dato['dni']}">
                            </div>
                        </div>
            
                        <div class="campo nombre">
                            <div class="texto">
                                <p>Nombre:</p>
                            </div>
                            <div class="entrada">
                                <input disabled type="text" value="${dato['nombre']}">
                            </div>
                        </div>
            
                        <div class="campo telefono">
                            <div class="texto">
                                <p>Telefono:</p>
                            </div>
                            <div class="entrada">
                                <input disabled type="text" value="${dato['telefono']}">
                            </div>
                        </div>

                        <div class="campo telefono">
                            <div class="texto">
                                <p>Telefono fijo:</p>
                            </div>
                            <div class="entrada">
                                <p>${dato['telefono_fijo']}</p>
                            </div>
                        </div>
            
                        <div class="campo correo">
                            <div class="texto">
                                <p>Correo:</p>
                            </div>
                            <div class="entrada">
                                <p>${dato['correo']}</p>
                            </div>
                        </div>
            
                        <div class="campo direccion">
                            <div class="texto">
                                <p>Dirección:</p>
                            </div>
                            <div class="entrada">
                                <p>${dato['direccion']}</p>
                            </div>
                        </div>
            
                        <div class="campo fecha-nacimiento">
                            <div class="texto">
                                <p>Fecha de nacimiento:</p>
                            </div>
                            <div class="entrada">
                                <p>${dato['fecha_nacimiento']}</p>
                            </div>
                        </div>
            
                        <div class="campo cups-luz">
                            <div class="texto">
                                <p>CUPS LUZ:</p>
                            </div>
                            <div class="entrada">
                                <p>${dato['cups_luz']}</p>
                            </div>
                        </div>
            
                        <div class="campo cups-gas">
                            <div class="texto">
                                <p>CUPS GAS:</p>
                            </div>
                            <div class="entrada">
                                <p>${dato['cups_gas']}</p>
                            </div>
                        </div>
            
                        <div class="campo iban">
                            <div class="texto">
                                <p>IBAN:</p>
                            </div>
                            <div class="entrada">
                                <p>${dato['iban']}</p>
                            </div>
                        </div>
            
                        <div class="campo numero-contrato">
                            <div class="texto">
                                <p>Numero de Contrato:</p>
                            </div>
                            <div class="entrada">
                                <p>${dato['numero_contrato']}</p>
                            </div>
                        </div>
            
                        <div class="campo potencia">
                            <div class="texto">
                                <p>POTENCIA:</p>
                            </div>
                            <div class="entrada">
                                <p>${dato['potencia']}</p>
                            </div>
                        </div>
            
                        <div class="campo peajeGas">
                            <div class="texto">
                                <p>PEAJE GAS:</p>
                            </div>
                            <div class="entrada">
                                <p>${dato['peaje_gas']}</p>
                            </div>
                        </div>

                        <div class="campo mantenimiento">
                            <div class="texto">
                                <p>Tipo mantenimiento:</p>
                            </div>
                            <div class="entrada">
                                <p>${dato['tipo_mantenimiento']}</p>
                            </div>
                        </div>
            
                        <div class="campo descripcion-venta">
                            <div class="texto">
                                <p>Observaciones venta:</p>
                            </div>
                            <div class="entrada">
                                <textarea id="observacionesVenta" disabled>${dato['observaciones_venta']}</textarea>
                            </div>
                        </div>
                    </div>
            
                    <div class="contenido-editable">
                        <div class="campo llamada-calidad">
                            <div class="texto">
                                <p>Llamada calidad:</p>
                            </div>
                            <div class="entrada">
                                <select name="" id="llamadaCalidadComboBoxCampoEditar">
                                    <option value="${dato['llamada_calidad']}">${dato['llamada_calidad']}</option>
                                    <option value="corregida">Corregida</option>
                                    <option value="realizada">Realizada</option>
                                </select>
                            </div>
                        </div>
            
                        <div class="campo calidad-enviada">
                            <div class="texto">
                                <p>Calidad enviada:</p>
                            </div>
                            <div class="entrada">
                                <select name="" id="calidadEnviadaComboBoxCampoEditar">
                                    <option value="${dato['calidad_enviada']}">${dato['calidad_enviada']}</option>
                                    <option value="si">Si</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </div>
            
                        <div class="campo verificacion-calidad">
                            <div class="texto">
                                <p>Verificación calidad:</p>
                            </div>
                            <div class="entrada">
                                <select name="" id="verificacionComboBoxCampoEditar">
                                    <option value="${dato['verificacion_calidad']}">${dato['verificacion_calidad']}</option>
                                    <option value="cumple calidad">Cumple calidad</option>
                                    <option value="no cumple calidad">No cumple calidad</option>
                                </select>
                            </div>
                        </div>
            
                        <div class="campo audios-cargados">
                            <div class="texto">
                                <p>Audios cargados:</p>
                            </div>
                            <div class="entrada">
                                <select name="" id="audiosCargadosComboBoxCampoEditar">
                                    <option value="${dato['audios_cargados']}">${dato['audios_cargados']}</option>
                                    <option value="si">Si</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </div>

                        <div class="campo estado">
                            <div class="texto">
                                <p>Estado:</p>
                            </div>
                            <div class="entrada">
                                <select name="" id="estadoComboBoxCampoEditar">
                                    <option value="${dato['estado']}">${dato['estado']}</option>
                                    <option value="activa">Activa</option>
                                    <option value="temporal">Temporal</option>
                                    <option value="baja">Baja</option>
                                    <option value="firmado">Firmado</option>
                                    <option value="verificado">Verificado</option>
                                    <option value="cancelada">Cancelada</option>
                                    <option value="desistimiento">Desistimiento</option>
                                    <option value="devuelta">Devuelta</option>
                                </select>
                            </div>
                        </div>
            
                        <div class="campo descripcion">
                            <div class="texto">
                                <p>Observaciones calidad:</p>
                            </div>
                            <div class="entrada">
                                <textarea id="observacionesCalidadCampoEditar">${dato['observaciones_calidad']}</textarea>
                            </div>
                        </div>
            
            
                        <div class="campo legalizacion">
                            <div class="texto">
                                <p>Legalización:</p>
                            </div>
                            <div class="entrada">
                                <select name="" id="legalizacion">
                                    <option value="${dato['legalizacion']}">${dato['legalizacion']}</option>
                                     
                                     
                                    <option value="no aplica">No aplica</option>
                                </select>
                            </div>
                        </div>
            
                    </div>
            
                </div>
            </div>
        
            `
        return modalCabecera, modalCuerpo
    },

    editarVenta() {
        const id_venta = document.getElementById('idVenta').textContent;
        const cedula = document.getElementById('cedula').textContent;
        const llamada_calidad = document.getElementById('llamadaCalidadComboBoxCampoEditar').value;
        const calidad_enviada = document.getElementById('calidadEnviadaComboBoxCampoEditar').value;
        const verificacion_calidad = document.getElementById('verificacionComboBoxCampoEditar').value;
        const observaciones_calidad = document.getElementById('observacionesCalidadCampoEditar').value;
        const audios_cargados = document.getElementById('audiosCargadosComboBoxCampoEditar').value;
        const estado = document.getElementById('estadoComboBoxCampoEditar').value;
        const legalizacion = document.getElementById('legalizacion').value

        return {
            id_venta,
            cedula,
            llamada_calidad,
            calidad_enviada,
            verificacion_calidad,
            observaciones_calidad,
            audios_cargados,
            estado,
            legalizacion
        };

    },

    mostrarTodasLasVentas(response) {
        const datos = response.data.ventas

        //const datos = response.data['ventas_realizadas'];
        const tablaDatos = document.getElementById('tablaDatos');
        tablaDatos.innerHTML = '';

        // Definir las columnas que deseas mostrar
        const columnasAMostrar = ['fecha_ingreso_venta', 'compania', 'dni', 'nombre_agente', 'lider_equipo', 'nombre', 'direccion', 'verificacion_calidad', 'audios_cargados', 'observaciones_calidad'];
        //const columnas = Object.keys(datos[0]);

        // Crear encabezado
        const encabezadoRow = document.createElement('tr');
        for (const columna of columnasAMostrar) {
            const th = document.createElement('th');
            th.textContent = columna;
            encabezadoRow.appendChild(th);
        }
        tablaDatos.appendChild(encabezadoRow);

        const thEstado = document.createElement('th');
        thEstado.textContent = 'estado';
        encabezadoRow.appendChild(thEstado);
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
                if (columna === 'verificacion_calidad' && dato[columna] === 'no cumple calidad') {
                    celda.classList.add('letras-estado-rojo');
                }

                if (columna === 'verificacion_calidad' && dato[columna] === 'pendiente') {
                    celda.classList.add('letras-estado-amarillo');
                }

                if (columna === "estado" && dato[columna] === "recuperada") {
                    celda.classList.add("letras-estado-azul");
                }

                if ((columna === "estado" && dato[columna] === "activa") || (columna === "estado" && dato[columna] === "firmado")) {
                    celda.classList.add("letras-estado-verde");
                }

                if (columna === "estado" && dato[columna] === "pendiente") {
                    celda.classList.add("letras-estado-amarillo");
                }

                if ((columna === "estado" && dato[columna] === "baja") || (columna === "estado" && dato[columna] === "devuelta") || (columna === "estado" && dato[columna] === "cancelada")) {
                    celda.classList.add("letras-estado-rojo");
                }



                fila.appendChild(celda);
            }

            const estado = dato['estado']
            const idVenta = dato['id']

            const estadoCell = document.createElement('td');

            const estadoSelect = document.createElement('select');
            estadoSelect.setAttribute('id', 'actualizarEstado')
            const estadosPosibles = [estado, 'firmado', 'verificado', 'temporal', 'activa', 'devuelta', 'cancelado', 'baja', 'desistimiento'];


            estadosPosibles.forEach(estado => {
                const option = document.createElement('option');
                option.value = estado;
                option.textContent = estado;
                estadoSelect.appendChild(option);
            });

            estadoSelect.value = dato.estado;
            estadoSelect.addEventListener('change', async (event) => {
                try {
                    // Actualizar el estado en la base de datos
                    const estadoo = dato.id = event.target.value; // Actualizar el estado en el objeto de datos
                    swalAlert.mostrarPantallaDeCarga("Actualizando estado...")
                    const cedulaUsuario = localStorage.getItem('cedula')
                    const res = await ModeloVentas.editarEstadoDesdeTabla(idVenta, estadoo, cedulaUsuario);
                    if (res.status == 200) {
                        Controlador.mostrarTodasLasVentas()
                        Swal.close();
                    }

                } catch (error) {
                    Swal.close();
                    console.error(error);
                    swalAlert.mostrarMensajeError('Error al actualizar el estado')
                }
            });

            // Agregar la clase "estado-verde" al select si el estado es "activo"
            if (estado === 'activa' || estado === 'firmado') {
                estadoSelect.classList.add('estado-verde');
            }

            if (estado === 'recuperada' || estado === 'temporal' || estado === 'verificado') {
                estadoSelect.classList.add('estado-azul');
            }

            if (estado === 'pendiente') {
                estadoSelect.classList.add('estado-amarillo');
            }

            if (estado === 'devuelta' || estado === 'baja' || estado === 'cancelado') {
                estadoSelect.classList.add('estado-rojo');
            }

            estadoCell.appendChild(estadoSelect);
            fila.appendChild(estadoCell);

            // Agregar botones de editar, eliminar y ver a cada fila
            for (let i = 0; i < 1; i++) {
                const celda = document.createElement('td');
                const boton = document.createElement('button');
                const icono = document.createElement('i');

                // Agregar la clase especial 'no-padding' a las celdas de los botones
                celda.classList.add('no-padding');

                if (i === 0) {
                    // Configuración para el botón de editar
                    icono.classList.add('fa-solid', 'fa-pen-to-square');
                    icono.setAttribute('id', 'abrirModalInformacionDatos');
                    boton.addEventListener('click', () => {
                        Modal.modalCero("targetModalInformacionDatos", "cerrar-modal-informacion-datos")
                        const modalCuerpo = document.getElementById('modalCuerpo');
                        const modalCabecera = document.getElementById('modalCabecera');
                        Vista.modalContenido(modalCuerpo, modalCabecera, dato)
                    });
                }
                // else if (i === 1) {
                //     // Configuración para el botón de eliminar
                //     icono.classList.add('fa-solid');
                //     boton.addEventListener('click', function () {
                //         // Lógica para eliminar el elemento
                //         Swal.fire({
                //             title: `¿Estás seguro? `,
                //             icon: "warning",
                //             showCancelButton: true,
                //             confirmButtonColor: "#3085d6",
                //             cancelButtonColor: "#d33",
                //             confirmButtonText: "Agregar"
                //         }).then((result) => {
                //             if (result.isConfirmed) {
                //                 const ref = dato['ref'];
                //                 Controlador.eliminarDatosFormulario(ref);
                //             }
                //         });
                //     });
                // }

                boton.appendChild(icono);
                celda.appendChild(boton);
                fila.appendChild(celda);
            }

            tablaDatos.appendChild(fila);
        });
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

    tomarFecha() {
        const fecha = document.getElementById('buscarPorFecha').value;
        return { fecha }
    },

    buscarPorIntervalo() {
        const fechaInicio = document.getElementById('start_date').value;
        const fechaFinal = document.getElementById('end_date').value;

        return { fechaInicio, fechaFinal }
    },

    mostrarFiltrosActivos(filtroActivo, filtroValor) {
        const contenedorFiltrosActivos = document.getElementById('contenedorFiltrosActivos');
        const filtro = document.createElement('div')

        contenedorFiltrosActivos.innerHTML = '';

        filtro.innerHTML =
            `
        <div class="filtro">
            <p>${filtroActivo}: ${filtroValor} <i id = "quitarFiltro" class="fa-solid fa-xmark quitar-filtro"></i></p>
        </div>
        `;

        contenedorFiltrosActivos.append(filtro);

        const quitarFiltro = document.getElementById('quitarFiltro');
        quitarFiltro.onclick = function () {
            Tabla.vaciarCamposFiltros();
            filtro.innerHTML = '';
            Controlador.mostrarTodasLasVentas()
        }

    }

}

export default Vista;

document.addEventListener('DOMContentLoaded', function () {

    /* Modal agregar datos
    Modal.modalIncrustado("targetModalAgregarDatos", "abrirModalAgregarDatos", "cerrar-modal-agregar-datos") */

    Controlador.iniciar();
});

// Botón dentro del modal al seleccionar un registro que edita la info de una venta
const botonEditar = document.getElementById('botonEditar');
botonEditar.onclick = function () {
    swalAlert.confirmarAccion({
        texto: '¿Estás seguro de actualizar la venta?',
        funcionAlAceptar: Controlador.editarventa,
        mensajeAlCancelar: "No se ha editado nada"
    })
}

// Boton que permite filtrar los registros para una fecha en especifico
const btnBuscarFecha = document.getElementById('btnBuscarFecha');
btnBuscarFecha.onclick = function () {
    Controlador.datosPorFecha();
}

// Boton que permite filtrar los registros para un intervalo de fechas
const btnBuscarIntervalo = document.getElementById('btnIntervalo');
btnBuscarIntervalo.onclick = function () {
    Controlador.datosPorIntervalo();
}

// Boton que permite filtrar los registros según una columna y texto a buscar
const btnFiltrarTabla = document.getElementById('btnFiltrarTabla');
btnFiltrarTabla.onclick = function () {
    Controlador.filtrarTabla();
}