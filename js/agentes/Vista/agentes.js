import Controlador from '../Controlador/controlador-agente.js'
import cuadrosEstadisticos from '../../componentes/cuadros-estadisticos/cuadros-estadisticos.js';
import Miscelaneas from '../../otros/miscelaneas.js';
import Modal from '../../componentes/Modal/modal.js'
import swalAlert from "../../otros/alertas.js"


const Vista = {

    mostrarTablaDatos(response) {
        const datos = response.data['ventas_agente'];

        if (datos.length == 0){
            console.log("No hay ventas realizadas")
        }

        const tablaDatos = document.getElementById('tablaDatos');

        tablaDatos.innerHTML = '';

        // Definir las columnas que deseas mostrar
        const columnasAMostrar = ['fecha_ingreso', 'estado', 'dni', 'nombre_cliente', 'observaciones_venta', 'verificacion_calidad', 'observaciones_calidad'];

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
                if (columna === 'verificacion_calidad' && dato[columna] === 'no cumple calidad') {
                    celda.classList.add('letras-estado-rojo');
                }

                if (columna === 'verificacion_calidad' && dato[columna] === 'pendiente') {
                    celda.classList.add('letras-estado-amarillo');
                }

                // Agregar la clase "estado-verde" al select si el estado es "activo"

                if (columna === 'estado' && dato[columna] === 'recuperada') {
                    celda.classList.add('letras-estado-azul');
                }


                if (columna === 'estado' && dato[columna] === 'activa' || columna === 'estado' && dato[columna] === 'firmado') {
                    celda.classList.add('letras-estado-verde');
                }

                if (columna === 'estado' && dato[columna] === 'pendiente') {
                    celda.classList.add('letras-estado-amarillo');
                }

                if (columna === 'estado' && dato[columna] === 'baja' || columna === 'estado' && dato[columna] === 'devuelta' || columna === 'estado' && dato[columna] === 'cancelada') {
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
                    // Configuración para el botón de editar
                    icono.classList.add('fa-solid', 'fa-pen-to-square');
                    icono.setAttribute('id', 'abrirModalInformacionVenta');
                    boton.addEventListener('click', () => {
                        Modal.modalCero("targetModalInformacionVenta", "cerrar-modal-informacion-venta")
                        const modalCuerpo = document.getElementById('modalCuerpoInformacionVenta');
                        const modalCabecera = document.getElementById('modalCabecera');
                        Vista.modalContenidoInformacionVenta(modalCuerpo, modalCabecera, dato)
                    });
                }

                boton.appendChild(icono);
                celda.appendChild(boton);
                fila.appendChild(celda);
            }

            tablaDatos.appendChild(fila);
        });
    },

    datosEstadisticos(res) {

        const cant_ventas_totales_realizadas = res.data.cant_ventas_realizadas
        const cant_ventas_totales_enero = res.data.cant_ventas_enero
        const cant_ventas_totales_febrero = res.data.cant_ventas_febrero
        const cant_ventas_totales_marzo = res.data.cant_ventas_marzo

        cuadrosEstadisticos.llenarCuadroVentasTotales(cant_ventas_totales_realizadas, "Ventas Totales")
        cuadrosEstadisticos.llenarCuadroVentasTotales(cant_ventas_totales_enero, "Ventas Enero")
        cuadrosEstadisticos.llenarCuadroVentasTotales(cant_ventas_totales_febrero, "Ventas Febrero")
        cuadrosEstadisticos.llenarCuadroVentasTotales(cant_ventas_totales_marzo, "Ventas Marzo")

    },

    editarVenta() {
        const id_venta = document.getElementById('idVenta').textContent;
        const cedula = document.getElementById('cedula').textContent;
        const compania = document.getElementById('campoCompañiaEditar').textContent;
        const nombre = document.getElementById('campoNombreEditar').textContent;
        const dni = document.getElementById('campoDniEditar').textContent;
        const telefono = document.getElementById('campoTelefonoEditar').textContent;
        const telefonoFijo = document.getElementById('campoTelefonoFijoEditar').textContent;
        const correo = document.getElementById('campoCorreoEditar').textContent;
        const direccion = document.getElementById('campoDireccionEditar').textContent;
        const fechaNacimiento = document.getElementById('campoFechaNacimientoEditar').textContent;
        const cupsLuz = document.getElementById('campoCupsLuzEditar').textContent;
        const cupsGas = document.getElementById('campoCupsGasEditar').textContent;
        const iban = document.getElementById('campoIbanEditar').textContent;
        const numeroContrato = document.getElementById('campoNumeroContratoEditar').textContent;
        const potencia = document.getElementById('campoPotenciaEditar').textContent;
        const peajeGas = document.getElementById('campoPeajeGasEditar').textContent;
        const tipoMantenimiento = document.getElementById('tipoMantenimiento').textContent;
        const llamada_calidad = document.getElementById('llamadaCalidadComboBoxCampoEditar').textContent;
        const calidad_enviada = document.getElementById('calidadEnviadaComboBoxCampoEditar').textContent;
        const verificacion_calidad = document.getElementById('verificacionComboBoxCampoEditar').textContent;
        const observaciones_calidad = document.getElementById('observacionesCalidadCampoEditar').textContent;
        const audios_cargados = document.getElementById('audiosCargadosComboBoxCampoEditar').textContent;
        const estado = document.getElementById('estadoComboBoxCampoEditar').value;
        const observaciones_adicionales = document.getElementById('observacionesAdicionalesCampoEditar').textContent;
        const legalizacion = document.getElementById('legalizacion').textContent;

        return {
            id_venta,
            cedula,
            compania,
            nombre,
            dni,
            telefono,
            telefonoFijo,
            correo,
            direccion,
            fechaNacimiento,
            cupsLuz,
            cupsGas,
            iban,
            numeroContrato,
            potencia,
            peajeGas,
            tipoMantenimiento,
            llamada_calidad,
            calidad_enviada,
            verificacion_calidad,
            observaciones_calidad,
            audios_cargados,
            estado,
            observaciones_adicionales,
            legalizacion
        };

    },

    // ANADIR VENTA
    modalContenidoVenta(modalCuerpo, modalCabecera, dato) {
        modalCuerpo.innerHTML =
            `
            <div class="campos">
            <div class="informacion-venta">

                <div class="contenido-venta">

                    <div class="campo compania">
                        <div class="texto">
                            <p>Compañia:</p>
                        </div>
                        <div class="entrada seleccion-compañia" id = "companiaSeccion">
                            <select name="select" id="compania">
                                <option value="no seleccionado">Seleccionar...</option>
                                <option value="choti" selected>Choti</option>
                                <option value="moni">Moni</option>
                            </select>
                        </div>
                    </div>

                    <div class="campo compania">
                        <div class="texto">
                            <p>Nombre:</p>
                        </div>
                        <div class="entrada">
                            <input type="text" placeholder="Nombre" id="nombre" value = "Vaso"/>

                        </div>
                    </div>

                    <div class="campo compania">
                        <div class="texto">
                            <p>DNI:</p>
                        </div>
                        <div class="entrada">
                            <input type="text" placeholder="DNI" id="dni" value = "E35432X"/>
                        </div>
                    </div>


                    <div class="campo compania">
                        <div class="texto">
                            <p>Telefono:</p>
                        </div>
                        <div class="entrada">
                            <input type="text" placeholder="Telefono" id="telefono" value = "324253">
                        </div>
                    </div>

                    <div class="campo compania">
                        <div class="texto">
                            <p>Telefono fijo (si no tiene, dejarlo vacío):</p>
                        </div>
                        <div class="entrada">
                            <input type="text" placeholder="Telefono fijo" id="telefonoFijo" value = "12314343">
                        </div>
                    </div>

                    <div class="campo compania">
                        <div class="texto">
                            <p>Correo (si no tiene, dejarlo vacío):</p>
                        </div>
                        <div class="entrada">
                            <input type="email" name="email" id="correo" placeholder="Correo electronico" value = "correo@asd"/>
                        </div>
                    </div>

                    <div class="campo compania">
                        <div class="texto">
                            <p>Dirección:</p>
                        </div>
                        <div class="entrada">
                            <input type="text" placeholder="Dirección" id="direccion" value = "direccion"/>
                        </div>
                    </div>

                    <div class="campo compania">
                        <div class="texto">
                            <p>Fecha de nacimiento:</p>
                        </div>
                        <div class="entrada">
                            <input type="date" name="fecha" id="fechaNacimiento" />

                        </div>
                    </div>
                </div>
                <div class="contenido-editable">

                    <div class="campo compania">
                        <div class="texto">
                            <p>IBAN:</p>
                        </div>
                        <div class="entrada">
                            <input type="text" name="luz" id="iban" placeholder="iban" value = "asd" />
                        </div>
                    </div>

                    <div class="campo compania">
                        <div class="texto">
                            <p>CUPS Luz:</p>
                        </div>
                        <div class="entrada">
                            <input type="text" name="luz" id="cupsLuz" placeholder="CUPS Luz" value = "34241423"/>
                        </div>
                    </div>

                    <div class="campo compania">
                        <div class="texto">
                            <p>CUPS Gas:</p>
                        </div>
                        <div class="entrada">
                            <input type="text" name="luz" id="cupsGas" placeholder="CUPS Gas" value = "43242352"/>
                        </div>
                    </div>

                    <div class="campo compania">
                        <div class="texto">
                            <p>Numero del contrato:</p>
                        </div>
                        <div class="entrada">
                            <input type="text" placeholder="Numero del contrato" id="numeroContrato" required value = "213443">
                        </div>
                    </div>

                    <div class="campo compania">
                        <div class="texto">
                            <p>Potencia:</p>
                        </div>
                        <div class="entrada">
                            <input type="text" placeholder="Potencia" id="potencia" value = "3,2kw">
                        </div>
                    </div>

                    <div class="campo compania">
                        <div class="texto">
                            <p>Peaje gas:</p>
                        </div>
                        <div class="entrada">
                            <input type="text" placeholder="Peaje gas" id="peajeGas" value = "352kw">
                        </div>
                    </div>

                    <div class="campo compania">
                        <div class="texto">
                            <p>Observaciones venta: (si no hay observaciones, dejarlo vacío)
                            </p>
                        </div>
                        <div class="entrada">
                            <input type="text" placeholder="Observaciones venta" id="observacionesVenta" value = "observaciones de la venta">
                        </div>
                    </div>

                </div>

            </div>
        </div>
            `;
    },

    modalContenidoInformacionVenta(modalCuerpoInformacionVenta, modalCabecera, dato) {

        console.log(dato)
        modalCuerpoInformacionVenta.innerHTML =

            `
        <div class="campos">
            <div class="informacion-agente-venta">
                <h3>Informacion venta</h3>
            </div>
        
            <div class="informacion-venta">
        
                <div class="contenido-venta">

                <div class="campo dni">
                    <div class="texto">
                        <p>Fecha ingreso:</p>
                    </div>
                    <div class="entrada">
                        <p id="campoDniEditar">${dato['fecha_ingreso']}</p>
                    </div>
                </div>

                    <div class="campo dni">
                        <div class="texto">
                            <p>DNI:</p>
                        </div>
                        <div class="entrada">
                            <p id="campoDniEditar">${dato['dni']}</p>
                        </div>
                    </div>
        
                    <div class="campo nombre">
                        <div class="texto">
                            <p>Nombre:</p>
                        </div>
                        <div class="entrada">
                            <p id="campoNombreEditar">${dato['nombre_cliente']}</p>
                        </div>
                    </div>
        
                    <div class="campo telefono">
                        <div class="texto">
                            <p>Telefono:</p>
                        </div>
                        <div class="entrada">
                            <p id="campoTelefonoEditar">${dato['telefono']}</p>
                        </div>
                    </div>
        
                    <div class="campo correo">
                        <div class="texto">
                            <p>Correo:</p>
                        </div>
                        <div class="entrada">
                            <p id="campoCorreoEditar">${dato['correo']}</p>
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
                            <p id="llamadaCalidadComboBoxCampoEditar">${dato['llamada_realizada']}</p>
                        </div>
                    </div>
        
                    <div class="campo calidad-enviada">
                        <div class="texto">
                            <p>Calidad enviada:</p>
                        </div>
                        <div class="entrada">
                            <p id="calidadEnviadaComboBoxCampoEditar">${dato['calidad_enviada']}</p>
                        </div>
                    </div>
        
                    <div class="campo verificacion-calidad">
                        <div class="texto">
                            <p>Verificación calidad:</p>
                        </div>
                        <div class="entrada">
                            <p id="verificacionComboBoxCampoEditar">${dato['verificacion_calidad']}</p>
                        </div>
                    </div>
        
                    <div class="campo estado">
                        <div class="texto">
                            <p>Estado:</p>
                        </div>
                        <div class="entrada">
                            <select name="" id="estadoComboBoxCampoEditar">
                                <option value="${dato['estado']}">${dato['estado']}</option>
                                <option value="recuperada">recuperada</option>
                            </select>
                        </div>
                    </div>
        
                    <div class="campo descripcion">
                        <div class="texto">
                            <p>Observaciones calidad:</p>
                        </div>
                        <div class="entrada">
                            <textarea disabled id="observacionesCalidadCampoEditar">${dato['observaciones_calidad']}</textarea>
                            </div>
                    </div>
        
                </div>
            </div>
        </div>
        `
    },

    quitarBordeRojo(event) {
        event.target.style.borderColor = ""; // Restablecer el borde a su estado original
    },

    createTipoMantenimientoOptions() {
        const combobox = document.getElementById('compania');
        const form = document.getElementById('companiaSeccion');

        const seleccion = combobox.value;
        const tipo = this.value;
        // Remove existing tipo mantenimiento label and input
        const existingTipoLabel = document.getElementById('tipoLabel');
        const existingTipoInput = document.getElementById('tipoMantenimiento');
        if (existingTipoLabel) existingTipoLabel.remove();
        if (existingTipoInput) existingTipoInput.remove();

        const tipoMantenimientolabel = document.createElement('label');
        tipoMantenimientolabel.textContent = 'Tipo mantenimiento:';
        tipoMantenimientolabel.setAttribute('id', 'tipoLabel');

        const tipoMantenimientoInput = document.createElement('select');
        tipoMantenimientoInput.setAttribute('name', 'tipoMantenimiento');
        tipoMantenimientoInput.setAttribute('id', 'tipoMantenimiento');
        if (tipo === 'Luz') {

            if (seleccion === 'Iberdrola (fuera de península)' || seleccion === 'Iberdrola (Cataluña, Aragón, Baleares, Canarias)') {
                tipoMantenimientoInput.innerHTML = `
                        <option value="Pack iberdrola" selected>Pack iberdrola</option>
                    `;
            }

            if (seleccion === 'Naturgy') {

                tipoMantenimientoInput.innerHTML = `
                        <option value="Svh: servihogar plus" selected>Svh: servihogar plus</option>
                        <option value="Sve: servielevtric xpress piezas">Sve: servielevtric xpress piezas</option>
                        <option value="Sve y svh">Sve y svh</option>
                    `;

            }

            form.appendChild(tipoMantenimientolabel);
            form.appendChild(tipoMantenimientoInput);

        }
        else if (tipo === "Luz y gas") {

            if (seleccion === "Iberdrola (fuera de península)" || seleccion === "Iberdrola (Cataluña, Aragón, Baleares, Canarias)") {

                tipoMantenimientoInput.innerHTML = `
                        <option value="Pack iberdrola" selected>Pack iberdrola</option>
                        <option value="Mantenimiento gas">Mantenimiento gas</option>
                        <option value="Pack iberdrola y mantenimiento gas">Pack iberdrola y mantenimiento gas</option>

                    `;
            }

            if (seleccion === 'Naturgy') {

                tipoMantenimientoInput.innerHTML = `
                        <option value="Svh: servihogar plus" selected>Svh: servihogar plus</option>
                        <option value="Sve: servielevtric xpress piezas">Sve: servielevtric xpress piezas</option>
                        <option value="Svg: servigas complet" selected>Svg: servigas complet</option>
                        <option value="Svh y Svg">Svh y Svg</option>
                        <option value="Sve y Svg">Sve y Svg</option>
                        <option value="Svh Sve y Svg">Svh Sve y Svg</option>
                    `;
            }
            form.appendChild(tipoMantenimientolabel);
            form.appendChild(tipoMantenimientoInput);

        }
        else if (tipo === "Gas") {

            if (seleccion === "Iberdrola (fuera de península)" || seleccion === "Iberdrola (Cataluña, Aragón, Baleares, Canarias)") {

                tipoMantenimientoInput.innerHTML = `
                        <option value="Mantenimiento gas">Mantenimiento gas</option>

                    `;
            }

            if (seleccion === 'Naturgy') {

                tipoMantenimientoInput.innerHTML = `
                    <option value="Svg: servigas complet" selected>Svg: servigas complet</option>
                   
                `;
            }


            form.appendChild(tipoMantenimientolabel);
            form.appendChild(tipoMantenimientoInput);

        }
        else {
            if (existingTipoLabel) existingTipoLabel.remove();
            if (existingTipoInput) existingTipoInput.remove();
        }
    },

    enviarValores() {
        const valorMantenimientoElement = document.getElementById('mantenimiento');
        const valorTipoMantenimientoElement = document.getElementById('tipoMantenimiento');

        // Verificar si los elementos select existen antes de intentar acceder a sus valores
        const valorMantenimiento = valorMantenimientoElement ? valorMantenimientoElement.value : null;
        const valorTipoMantenimiento = valorTipoMantenimientoElement ? valorTipoMantenimientoElement.value : null;

        Vista.enviarDatosFormulario(valorMantenimiento, valorTipoMantenimiento);
    },

    enviarDatosFormulario() {

        const fechaNacimientoFormatear = document.getElementById('fechaNacimiento').value;
        const compania = document.getElementById('compania').value;
        const nombre = document.getElementById('nombre').value;
        const dni = document.getElementById('dni').value;
        const telefono = document.getElementById('telefono').value;
        const telefonoFijo = document.getElementById('telefonoFijo').value;
        const correo = document.getElementById('correo').value;
        const direccion = document.getElementById('direccion').value;
        const fechaNacimiento = Miscelaneas.formatearFechaParaEnvio(fechaNacimientoFormatear);
        const cupsLuz = document.getElementById('cupsLuz').value;
        const cupsGas = document.getElementById('cupsGas').value;
        const iban = document.getElementById('iban').value;
        const numeroContrato = document.getElementById('numeroContrato').value;
        const potencia = document.getElementById('potencia').value;
        const peajeGas = document.getElementById('peajeGas').value;
        const observacionesVenta = document.getElementById('observacionesVenta').value;
        const valorMantenimientoElement = document.getElementById('mantenimiento');
        const valorTipoMantenimientoElement = document.getElementById('tipoMantenimiento');

        // Verificar si los elementos select existen antes de intentar acceder a sus valores
        const valorMantenimiento = valorMantenimientoElement ? valorMantenimientoElement.value : null;
        const valorTipoMantenimiento = valorTipoMantenimientoElement ? valorTipoMantenimientoElement.value : null;

        const camposVacios = []
        if (nombre === "" || dni === "" || telefono === "" || direccion === "" || cupsLuz === "" || iban === "" || numeroContrato === "") {
            const campos = ['nombre', 'dni', 'telefono', 'direccion', 'cupsLuz', 'iban', 'numeroContrato'];

            campos.forEach(campo => {
                const input = document.getElementById(campo);
                const valor = input.value.trim();
                if (valor === "") {
                    input.style.borderColor = "red"; // Marcar el campo vacío en rojo
                    input.addEventListener('input', Vista.quitarBordeRojo); // Agregar evento para quitar el borde rojo al escribir
                    camposVacios.push(campo);
                } else {
                    input.style.borderColor = ""; // Restablecer el borde a su estado original
                }
            });
            //llenar mensajes
            swalAlert.mostrarMensajeAdvertencia(`Campos vacios, verifica que  el/los campo(s): ${camposVacios.join(', ')} esten llenos.`)

        } else if (compania === "Iberdrola (fuera de península)" || compania === "Iberdrola (Cataluña, Aragón, Baleares, Canarias)") {
            if (numeroContrato.length == 0) {
                swalAlert.mostrarMensajeAdvertencia("Tienes que llenar el campo numero del contrato")
            } else {
                //AGREGAR POTENCIA Y EMPUJO
                return {
                    compania,
                    nombre,
                    dni,
                    telefono,
                    telefonoFijo,
                    correo,
                    direccion,
                    fechaNacimiento,
                    cupsLuz,
                    cupsGas,
                    iban,
                    observacionesVenta,
                    numeroContrato,
                    potencia,
                    peajeGas,
                    valorMantenimiento,
                    valorTipoMantenimiento,
                };
            }
        } else {

            return {
                compania,
                nombre,
                dni,
                telefono,
                telefonoFijo,
                correo,
                direccion,
                fechaNacimiento,
                cupsLuz,
                cupsGas,
                iban,
                observacionesVenta,
                numeroContrato,
                potencia,
                peajeGas,
                valorMantenimiento,
                valorTipoMantenimiento,
            };
        }
    },

    vaciarCampos() {
        document.getElementById('nombre').value = ""
        document.getElementById('dni').value = ""
        document.getElementById('telefono').value = ""
        document.getElementById('telefonoFijo').value = ""
        document.getElementById('correo').value = ""
        document.getElementById('direccion').value = ""
        document.getElementById('cupsLuz').value = ""
        document.getElementById('cupsGas').value = ""
        document.getElementById('iban').value = ""
        document.getElementById('observacionesVenta').value = ""
        document.getElementById('numeroContrato').value = ""
        document.getElementById('potencia').value = ""
        document.getElementById('peajeGas').value = ""
    },

}
export default Vista;

document.addEventListener('DOMContentLoaded', function () {

    Controlador.iniciarPagina()

});



const botonAñadirVenta = document.getElementById('botonAñadirVenta');
botonAñadirVenta.onclick = function () {
    Modal.modalCero("targetModalIngresarventa", "cerrar-modal-ingresar-venta")
    const modalCuerpo = document.getElementById('modalCuerpoAñadirVenta');
    const modalCabecera = document.getElementById('modalCabeceraAñadirVenta');
    Vista.modalContenidoVenta(modalCuerpo, modalCabecera);

    //AGREGAR NUEVOS CAMPOS
    const form = document.getElementById('companiaSeccion');
    const combobox = document.getElementById('compania');
    const tipomante = Vista.createTipoMantenimientoOptions

    combobox.addEventListener('change', () => {
        const seleccion = combobox.value;

        // Remove existing labels and inputs
        const existingLabel = document.getElementById('label');
        const existingInput = document.getElementById('mantenimiento');
        const existingTipoLabel = document.getElementById('tipoLabel');
        const existingTipoInput = document.getElementById('tipoMantenimiento');

        if (existingLabel) existingLabel.remove();
        if (existingInput) existingInput.remove();

        if (seleccion === "no seleccionado") {
            alert("Tienes que seleccionar una compañia")
        }

        if (seleccion === 'Naturgy' || seleccion === 'Iberdrola (fuera de península)' || seleccion === 'Iberdrola (Cataluña, Aragón, Baleares, Canarias)') {
            const mantenimientolabel = document.createElement('label');
            mantenimientolabel.textContent = 'Mantenimiento:';
            mantenimientolabel.setAttribute('id', 'label');

            const mantenimientoInput = document.createElement('select');
            mantenimientoInput.setAttribute('name', 'mantenimiento');
            mantenimientoInput.setAttribute('id', 'mantenimiento');
            mantenimientoInput.innerHTML = `
            <option value="Sin mantenimiento" selected>Sin mantenimiento</option>
            <option value="Luz y gas">Luz y gas</option>
            <option value="Luz">Luz</option>
            <option value="Gas">Gas</option>
        `;

            form.appendChild(mantenimientolabel);
            form.appendChild(mantenimientoInput);
            mantenimientoInput.addEventListener('change', tipomante);
            if (existingTipoLabel) existingTipoLabel.remove();
            if (existingTipoInput) existingTipoInput.remove();
        } else {

            if (existingTipoLabel) existingTipoLabel.remove();
            if (existingTipoInput) existingTipoInput.remove();
        }

        if (seleccion === "Iberdrola (fuera de península)" || seleccion === "Iberdrola (Cataluña, Aragón, Baleares, Canarias)") {
            const numeroContrato = document.getElementById('numeroContrato')
            numeroContrato.required = 'true';
        }
        return {
            seleccion
        }

    });
};

const botonModalAgregarVenta = document.getElementById('botonModalAgregarVenta');
botonModalAgregarVenta.onclick = function () {
    const fechaNacimientoFormatear = document.getElementById('fechaNacimiento').value;
    const compania = document.getElementById('compania').value;
    const nombre = document.getElementById('nombre').value;
    const dni = document.getElementById('dni').value;
    const telefono = document.getElementById('telefono').value;
    const telefonoFijo = document.getElementById('telefonoFijo').value;
    const correo = document.getElementById('correo').value;
    const direccion = document.getElementById('direccion').value;
    const fechaNacimiento = Miscelaneas.formatearFechaParaEnvio(fechaNacimientoFormatear); //////////
    const cupsLuz = document.getElementById('cupsLuz').value;
    const cupsGas = document.getElementById('cupsGas').value;
    const iban = document.getElementById('iban').value;
    const numeroContrato = document.getElementById('numeroContrato').value;
    const potencia = document.getElementById('potencia').value;
    const peajeGas = document.getElementById('peajeGas').value;
    const observacionesVenta = document.getElementById('observacionesVenta').value;
    const valorMantenimientoElement = document.getElementById('mantenimiento');
    const valorTipoMantenimientoElement = document.getElementById('tipoMantenimiento');

    if (compania === "no seleccionado") {
        swalAlert.mostrarMensajeAdvertencia("Es necesario que selecciones una compañia")

    } else {

        // Verificar si los elementos select existen antes de intentar acceder a sus valores
        const valorMantenimiento = valorMantenimientoElement ? valorMantenimientoElement.value : null;
        const valorTipoMantenimiento = valorTipoMantenimientoElement ? valorTipoMantenimientoElement.value : null;

        const htmlContent = `
    <div style="max-height: 265px; overflow-y: auto;">
        <h3>Valores ingresados:</h3>
        <p>Compañia: ${compania}</p>
        <p>Mantenimiento: ${valorMantenimiento || 'no dado'}</p>
        <p>Tipo mantenimiento: ${valorTipoMantenimiento || 'no dado'}</p>
        <p>Nombre: ${nombre}</p>
        <p>DNI: ${dni || 'no dado'}</p>
        <p>Telefono: ${telefono}</p>
        <p>Telefono fijo: ${telefonoFijo}</p>
        <p>Correo: ${correo || 'no dado'}</p>
        <p>Dirección: ${direccion || 'no dado'}</p>
        <p>Fecha de nacimiento: ${fechaNacimiento || 'no dado'}</p>
        <p>Cups luz: ${cupsLuz}</p>
        <p>Cups gas: ${cupsGas || 'no dado'}</p>
        <p>IBAN: ${iban || 'no dado'}</p>
        <p>Numero de contrato: ${numeroContrato || 'no dado'}</p>
        <p>Potencia: ${potencia || 'no dado'}</p>
        <p>Peaje: ${peajeGas || 'no dado'}</p>
        <p>Observacion venta: ${observacionesVenta}</p>
    </div>
    `;

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: '¿Estás seguro?',
            // text: '¿Deseas ingresar esta venta en la Base de datos?',
            icon: 'warning',
            html: htmlContent,
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                Controlador.insertarDatos()
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                    'Cancelado',
                    'No se ha ingresado nada',
                    'error'
                );
            }
        });

    }

}

const botonModalEditarVentaAgente = document.getElementById('botonModalEditarVentaAgente');
botonModalEditarVentaAgente.onclick = function (){
    Controlador.editarventa()
}
