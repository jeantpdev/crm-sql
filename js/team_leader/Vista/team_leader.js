import Controlador from "../Controlador/controlador_team_leader.js";
import cuadrosEstadisticos from '../../componentes/cuadros-estadisticos/cuadros-estadisticos.js';
import Miscelaneas from '../../otros/miscelaneas.js';
import Modal from '../../componentes/Modal/modal.js'
import swalAlert from '../../otros/alertas.js';
import Tabla from "../../componentes/Tabla/tabla.js";

const Vista = {

    datosEstadisticos(res) {

        const cant_ventas_totales_realizadas = res.data.cant_ventas_realizadas;
        const cant_ventas_totales_marzo = res.data.cant_ventas_marzo;
        const cant_ventas_totales_enero = res.data.cant_ventas_enero;
        const cant_ventas_totales_febrero = res.data.cant_ventas_febrero;
        const prom_venta_semana_actual = res.data.prom_venta_semana_actual;
        const prom_venta_mes_actual = res.data.prom_venta_mes_actual;

        cuadrosEstadisticos.llenarCuadroVentasTotales(cant_ventas_totales_realizadas, "Ventas Totales");
        cuadrosEstadisticos.llenarCuadroVentasTotales(prom_venta_semana_actual, "Promedio semana actual");
        cuadrosEstadisticos.llenarCuadroVentasTotales(prom_venta_mes_actual, "Promedio mensual");
        cuadrosEstadisticos.llenarCuadroVentasTotales(cant_ventas_totales_enero, "Ventas Enero");
        cuadrosEstadisticos.llenarCuadroVentasTotales(cant_ventas_totales_febrero, "Ventas Febrero");
        cuadrosEstadisticos.llenarCuadroVentasTotales(cant_ventas_totales_marzo, "Ventas marzo");
    },

    modalContenido(modalCuerpo, modalCabecera, dato) {
        modalCuerpo.innerHTML = `
        <div class="campos">

            <div class="informacion-agente-venta">
                <h3>Informacion agente</h3>
        
                <div class="informacion-agente">
                    <p>Id venta:</p>
                    <p id="idVenta"><i class="fa-solid fa-hashtag"></i> ${dato["id"]}</p>
                    <p><i class="fa-solid fa-calendar-days"></i> Fecha: ${dato["fecha_ingreso_venta"]}</p>
                    <p id="cedula"><i class="fa-solid fa-address-card"> </i> Cedula: ${dato["cedula"]}</p>
                    <p><i class="fa-solid fa-user"></i> Agente: ${dato["nombre_agente"]}</p>
                </div>
        
            </div>
        
        
            <div class="informacion-venta">
        
                <div class="contenido-venta">
                    <h3>Informacion venta</h3>
        
                    <div class="campo compania">
                        <div class="texto">
                            <p>Compañia:</p>
                        </div>
                        <div class="entrada">
                            <p>${dato["compania"]}</p>
                        </div>
                    </div>
        
                    <div class="campo dni">
                        <div class="texto">
                            <p>DNI:</p>
                        </div>
                        <div class="entrada">
                            <p>${dato["dni"]}</p>
                        </div>
                    </div>
        
                    <div class="campo nombre">
                        <div class="texto">
                            <p>Nombre:</p>
                        </div>
                        <div class="entrada">
                            <p>${dato["nombre"]}</p>
                        </div>
                    </div>
        
                    <div class="campo telefono">
                        <div class="texto">
                            <p>Telefono:</p>
                        </div>
                        <div class="entrada">
                            <p>${dato["telefono"]}</p>
                        </div>
                    </div>

                    <div class="campo telefonoFijo">
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
                            <p>${dato["correo"]}</p>
                        </div>
                    </div>
        
                    <div class="campo direccion">
                        <div class="texto">
                            <p>Dirección:</p>
                        </div>
                        <div class="entrada">
                            <p>${dato["direccion"]}</p>
                        </div>
                    </div>
        
                    <div class="campo fecha-nacimiento">
                        <div class="texto">
                            <p>Fecha de nacimiento:</p>
                        </div>
                        <div class="entrada">
                            <p>${dato["fecha_nacimiento"]}</p>
                        </div>
                    </div>
        
                    <div class="campo cups-luz">
                        <div class="texto">
                            <p>CUPS LUZ:</p>
                        </div>
                        <div class="entrada">
                            <p>${dato["cups_luz"]}</p>
                        </div>
                    </div>
        
                    <div class="campo cups-gas">
                        <div class="texto">
                            <p>CUPS GAS:</p>
                        </div>
                        <div class="entrada">
                            <p>${dato["cups_gas"]}</p>
                        </div>
                    </div>
        
                    <div class="campo iban">
                        <div class="texto">
                            <p>IBAN:</p>
                        </div>
                        <div class="entrada">
                            <p>${dato["iban"]}</p>
                        </div>
                    </div>
        
                    <div class="campo numero-contrato">
                        <div class="texto">
                            <p>Numero de Contrato:</p>
                        </div>
                        <div class="entrada">
                            <p>${dato["numero_contrato"]}</p>
                        </div>
                    </div>
        
                    <div class="campo potencia">
                        <div class="texto">
                            <p>POTENCIA:</p>
                        </div>
                        <div class="entrada">
                            <p>${dato["potencia"]}</p>
                        </div>
                    </div>
        
                    <div class="campo peajeGas">
                        <div class="texto">
                            <p>PEAJE GAS:</p>
                        </div>
                        <div class="entrada">
                            <p>${dato["peaje_gas"]}</p>
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
                            <textarea id="observacionesVenta" disabled>${dato["observaciones_venta"]}</textarea>
                        </div>
                    </div>
                </div>
        
                <div class="contenido-editable">
                    <div class="campo llamada-calidad">
                        <div class="texto">
                            <p>Llamada calidad:</p>
                        </div>
                        <div class="entrada">
                            <p>${dato["llamada_calidad"]}</p>
                        </div>
                    </div>
        
                    <div class="campo calidad-enviada">
                        <div class="texto">
                            <p>Calidad enviada:</p>
                        </div>
                        <div class="entrada">
                            <p>${dato["calidad_enviada"]}</p>
                        </div>
                    </div>
        
                    <div class="campo verificacion-calidad">
                        <div class="texto">
                            <p>Verificación calidad:</p>
                        </div>
                        <div class="entrada">
                            <p>${dato["verificacion_calidad"]}</p>
                        </div>
                    </div>
        
                    <div class="campo audios-cargados">
                        <div class="texto">
                            <p>Audios cargados:</p>
                        </div>
                        <div class="entrada">
                            <p>${dato["audios_cargados"]}</p>
                        </div>
                    </div>
        
        
                    <div class="campo legalizacion">
                        <div class="texto">
                            <p>Legalización:</p>
                        </div>
                        <div class="entrada">
                            <p>${dato["legalizacion"]}</p>
                        </div>
                    </div>
        
                    <div class="campo estado">
                        <div class="texto">
                            <p>Estado:</p>
                        </div>
                        <div class="entrada">
                            <select name="" id="estadoComboBoxCampoEditar">
                                <option value="${dato["estado"]}">${dato["estado"]}</option>
                                <option value="recuperada">Recuperada</option>
                                <option value="no recuperable">No recuperable</option>
                            </select>
                        </div>
                    </div>
        
                    <div class="campo descripcion">
                        <div class="texto">
                            <p>Observaciones calidad:</p>
                        </div>
                        <div class="entrada">
                            <textarea disabled>${dato["observaciones_calidad"]}</textarea>
                        </div>
                    </div>
        
                    <div class="campo descripcion">
                        <div class="texto">
                            <p>Observaciones adicionales:</p>
                        </div>
                        <div class="entrada">
                            <textarea id="textareaObservacionesAdicionales">${dato["observaciones_adicionales"]}</textarea>
                        </div>
                    </div>
        
                </div>
        
            </div>
        </div>
         `;
        return modalCabecera, modalCuerpo;
    },

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
                                <option value="no seleccionado" selected>Seleccionar...
                                </option>
                                <option value="Iberdrola (fuera de península)">Iberdrola
                                    (fuera de península) </option>
                                 
                                <option
                                    value="Iberdrola (Cataluña, Aragón, Baleares, Canarias)">
                                    Iberdrola (Cataluña, Aragón, Baleares, Canarias)
                                </option>
                                <option value="Gana energía">Gana energía</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>
                    </div>


                    <div class="campo compania">
                        <div class="texto">
                            <p>Nombre:</p>
                        </div>
                        <div class="entrada">
                            <input type="text" placeholder="Nombre" id="nombre" />

                        </div>
                    </div>

                    <div class="campo compania">
                        <div class="texto">
                            <p>DNI:</p>
                        </div>
                        <div class="entrada">
                            <input type="text" placeholder="DNI" id="dni" />
                        </div>
                    </div>


                    <div class="campo compania">
                        <div class="texto">
                            <p>Telefono:</p>
                        </div>
                        <div class="entrada">
                            <input type="text" placeholder="Telefono" id="telefono">
                        </div>
                    </div>

                    <div class="campo compania">
                        <div class="texto">
                            <p>Telefono fijo (si no tiene, dejarlo vacío):</p>
                        </div>
                        <div class="entrada">
                            <input type="text" placeholder="Telefono fijo" id="telefonoFijo">
                        </div>
                    </div>

                    <div class="campo compania">
                        <div class="texto">
                            <p>Correo (si no tiene, dejarlo vacío):</p>
                        </div>
                        <div class="entrada">
                            <input type="email" name="email" id="correo"
                                placeholder="Correo electronico" />
                        </div>
                    </div>

                    <div class="campo compania">
                        <div class="texto">
                            <p>Dirección:</p>
                        </div>
                        <div class="entrada">
                            <input type="text" placeholder="Dirección" id="direccion" />
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
                            <input type="text" name="luz" id="iban" placeholder="iban" />
                        </div>
                    </div>

                    <div class="campo compania">
                        <div class="texto">
                            <p>CUPS Luz:</p>
                        </div>
                        <div class="entrada">
                            <input type="text" name="luz" id="cupsLuz" placeholder="CUPS Luz" />
                        </div>
                    </div>

                    <div class="campo compania">
                        <div class="texto">
                            <p>CUPS Gas:</p>
                        </div>
                        <div class="entrada">
                            <input type="text" name="luz" id="cupsGas" placeholder="CUPS Gas" />
                        </div>
                    </div>

                    <div class="campo compania">
                        <div class="texto">
                            <p>Base de datos:</p>
                        </div>
                        <div class="entrada">
                            <select name="select" id="datos">
                                <option value="Leaddesk" selected>Leaddesk</option>
                                <option value="Base propia">Base propia</option>
                            </select>
                        </div>
                    </div>

                    <div class="campo compania">
                        <div class="texto">
                            <p>Numero del contrato:</p>
                        </div>
                        <div class="entrada">
                            <input type="text" placeholder="Numero del contrato"
                                id="numeroContrato" required>
                        </div>
                    </div>

                    <div class="campo compania">
                        <div class="texto">
                            <p>Potencia:</p>
                        </div>
                        <div class="entrada">
                            <input type="text" placeholder="Potencia" id="potencia">
                        </div>
                    </div>

                    <div class="campo compania">
                        <div class="texto">
                            <p>Peaje gas:</p>
                        </div>
                        <div class="entrada">
                            <input type="text" placeholder="Peaje gas" id="peajeGas">
                        </div>
                    </div>

                    <div class="campo compania">
                        <div class="texto">
                            <p>Observaciones venta: (si no hay observaciones, dejarlo vacío)
                            </p>
                        </div>
                        <div class="entrada">
                            <input type="text" placeholder="Observaciones venta"
                                id="observacionesVenta">
                        </div>
                    </div>

                </div>

            </div>
        </div>
            `;
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

        //const fechaFormatear = document.getElementById('fecha').value;
        const fechaNacimientoFormatear = document.getElementById('fechaNacimiento').value;
        //const fechaVentaFormatear = document.getElementById('fechaVenta').value;

        //const fecha = this.formatearFechaParaEnvio(fechaFormatear);
        //const fechaVenta = this.formatearFechaParaEnvio(fechaVentaFormatear);

        //const hora = document.getElementById('hora').value;
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
        const datos = document.getElementById('datos').value;
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
                    datos,
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
                datos,
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
        //document.getElementById('fechaNacimiento').value = ""
        document.getElementById('cupsLuz').value = ""
        document.getElementById('cupsGas').value = ""
        document.getElementById('iban').value = ""
        document.getElementById('observacionesVenta').value = ""
        document.getElementById('numeroContrato').value = ""
        document.getElementById('potencia').value = ""
        document.getElementById('peajeGas').value = ""
    },

    mostrarTablaDatos(response) {

        const datos = response.data.ventas_realizadas;
        const tablaDatos = document.getElementById("tablaDatos");

        tablaDatos.innerHTML = "";

        // Definir las columnas que deseas mostrar
        const columnasAMostrar = [
            "fecha_ingreso_venta",
            "nombre_agente",
            "compania",
            "dni",
            "nombre",
            "verificacion_calidad",
            "estado",
        ];

        // Crear encabezado
        const encabezadoRow = document.createElement("tr");
        for (const columna of columnasAMostrar) {
            const th = document.createElement("th");
            th.textContent = columna;
            encabezadoRow.appendChild(th);
        }
        tablaDatos.appendChild(encabezadoRow);

        // Crear filas de datos
        datos.forEach((dato) => {
            const fila = document.createElement("tr");
            for (const columna of columnasAMostrar) {
                const celda = document.createElement("td");
                celda.textContent = dato[columna];

                // Agregar la clase "estado-verde" a la celda específica
                if (
                    columna === "verificacion_calidad" &&
                    dato[columna] === "cumple calidad"
                ) {
                    celda.classList.add("letras-estado-verde");
                }

                // Agregar la clase "estado-verde" a la celda específica
                if (
                    columna === "verificacion_calidad" &&
                    dato[columna] === "no cumple calidad"
                ) {
                    celda.classList.add("letras-estado-rojo");
                }

                if (
                    columna === "verificacion_calidad" &&
                    dato[columna] === "pendiente"
                ) {
                    celda.classList.add("letras-estado-amarillo");
                }

                // Agregar la clase "estado-verde" al select si el estado es "activo"

                if (columna === "estado" && dato[columna] === "recuperada") {
                    celda.classList.add("letras-estado-azul");
                }

                if (
                    (columna === "estado" && dato[columna] === "activa") ||
                    (columna === "estado" && dato[columna] === "firmado")
                ) {
                    celda.classList.add("letras-estado-verde");
                }

                if (columna === "estado" && dato[columna] === "pendiente") {
                    celda.classList.add("letras-estado-amarillo");
                }

                if (
                    (columna === "estado" && dato[columna] === "baja") ||
                    (columna === "estado" && dato[columna] === "devuelta") ||
                    (columna === "estado" && dato[columna] === "cancelada")
                ) {
                    celda.classList.add("letras-estado-rojo");
                }

                fila.appendChild(celda);
            }
            // Agregar botones de editar, eliminar y ver a cada fila
            for (let i = 0; i < 1; i++) {
                const celda = document.createElement("td");
                const boton = document.createElement("button");
                const icono = document.createElement("i");

                // Agregar la clase especial 'no-padding' a las celdas de los botones
                celda.classList.add("no-padding");

                if (i === 0) {
                    // Configuración para el botón de editar
                    icono.classList.add("fa-solid", "fa-eye");
                    icono.setAttribute("id", "abrirModalInformacionDatos");
                    boton.addEventListener("click", () => {
                        Modal.modalCero("targetModalInformacionDatos", "cerrar-modal-informacion-datos");
                        const modalCuerpo = document.getElementById("modalCuerpo");
                        const modalCabecera = document.getElementById("modalCabecera");
                        Vista.modalContenido(modalCuerpo, modalCabecera, dato);
                    });
                }

                boton.appendChild(icono);
                celda.appendChild(boton);
                fila.appendChild(celda);
            }

            tablaDatos.appendChild(fila);
        });
    },

    mostrarTodasLasVentas(res2) {
        const datos = res2.data.ventas

        //const datos = response.data['ventas_realizadas'];
        const tablaDatos = document.getElementById('tablaDatos');
        tablaDatos.innerHTML = '';

        // Definir las columnas que deseas mostrar
        const columnasAMostrar = [
            "fecha_ingreso_venta",
            "nombre_agente",
            "compania",
            "dni",
            "nombre",
            "verificacion_calidad",
            "estado",
        ];

        // Crear encabezado
        const encabezadoRow = document.createElement('tr');
        for (const columna of columnasAMostrar) {

            const th = document.createElement('th');
            th.textContent = columna;
            encabezadoRow.appendChild(th);
        }

        tablaDatos.appendChild(encabezadoRow);

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

                if (
                    (columna === "estado" && dato[columna] === "activa") ||
                    (columna === "estado" && dato[columna] === "firmado")
                ) {
                    celda.classList.add("letras-estado-verde");
                }

                if (columna === "estado" && dato[columna] === "pendiente") {
                    celda.classList.add("letras-estado-amarillo");
                }

                if (
                    (columna === "estado" && dato[columna] === "baja") ||
                    (columna === "estado" && dato[columna] === "devuelta") ||
                    (columna === "estado" && dato[columna] === "cancelada") ||
                    (columna === "estado" && dato[columna] === "no recuperable")

                ) {
                    celda.classList.add("letras-estado-rojo");
                }

                if (
                    (columna === "estado" && dato[columna] === "temporal")

                ) {
                    celda.classList.add("letras-estado-azul");
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
                    icono.classList.add('fa-solid', 'fa-eye');
                    icono.setAttribute('id', 'abrirModalInformacionDatos');
                    boton.addEventListener('click', () => {
                        Modal.modalCero("targetModalInformacionDatos", "cerrar-modal-informacion-datos");
                        const modalCuerpo = document.getElementById("modalCuerpo");
                        const modalCabecera = document.getElementById("modalCabecera");
                        Vista.modalContenido(modalCuerpo, modalCabecera, dato);
                    });
                }

                boton.appendChild(icono);
                celda.appendChild(boton);
                fila.appendChild(celda);
            }

            tablaDatos.appendChild(fila);
        });
    },

    comboboxBuscarAgente(res2) {
        const datos = res2.data["agentes_pertenecientes"];

        const buscarAgente = document.getElementById("buscarAgente");
        const selectBuscar = document.createElement("select");
        selectBuscar.setAttribute("id", "cedulaAgenteBuscar");
        selectBuscar.className = "selectCedulaAgenteBuscar";

        const optionDefault = document.createElement("option");
        optionDefault.value = "no seleccionado";
        optionDefault.text = "sin seleccionar";
        optionDefault.selected = true;
        selectBuscar.appendChild(optionDefault);

        datos.forEach((element) => {
            const option = document.createElement("option");
            option.value = element.cedula;
            option.text = element.nombre;
            selectBuscar.appendChild(option);

        });
        buscarAgente.appendChild(selectBuscar);
        this.traerCedulaAgente()

    },

    traerCedulaAgente() {

        const combobox = document.getElementById("cedulaAgenteBuscar");

        combobox.addEventListener("change", () => {
            const cedulaAgente = combobox.value;
            Controlador.buscarDatosPersonalesAgente(cedulaAgente);
        });

    },

    llenarDatosPersonalesAgente(res) {
        const data = res.data;

        console.log(data)

        const contenedorDatosAgente = document.getElementById(
            "contenedorDatosAgente"
        );
        contenedorDatosAgente.innerHTML = `
        <div class="campo">
            <div class="titulo">
                <p>Cédula:</p>
            </div>
            <div class="texto" id="cedulaAgente">
            <p>${data.cedula}</p>

            </div>
        </div>

        <div class="campo">
            <div class="titulo">
                <p>Nombre:</p>
            </div>
            <div class="texto" id="nombreAgente">
            <p>${data.apodo}</p>

            </div>
        </div>

        <div class="campo">
            <div class="titulo">
                <p>Correo:</p>
            </div>
            <div class="texto" id="correoAgente">
            <p>${data.correo}</p>

            </div>
        </div>

        <div class="campo">
            <div class="titulo">
                <p>Celular:</p>
            </div>
            <div class="texto" id="celularAgente">
            <p>${data.celular}</p>

            </div>
        </div>

        <div class="campo">
            <div class="titulo">
                <p>Campaña:</p>
            </div>
            <div class="texto" id="campañaAgente">
            <p>${data.campana}</p>

            </div>
        </div>

        `;
    },

    llenarEstadisticasAgente(res) {
        const data = res.data;

        const cant_ventas_mes_actual = data.cant_ventas_mes_actual;
        const cant_ventas_semana_actual = data.cant_ventas_semana_actual;
        const prom_venta_mes_actual = data.prom_venta_mes_actual;
        const prom_venta_semana_actual = data.prom_venta_semana_actual;
        const prom_ventas_diarias = data.prom_ventas_diarias;
        const porcCumplirMeta = data.porcCumplirMeta;
        const cant_ventas_restantes = data.cant_ventas_restantes;
        const ventas_activas = data.ventas_activas;
        const ventas_temporales = data.ventas_temporal;
        const ventas_bajas = data.ventas_baja;
        const ventas_firmadas = data.ventas_firmado;
        const ventas_verificadas = data.ventas_verificado;
        const ventas_canceladas = data.ventas_cancelada;
        const ventas_desistimientos = data.ventas_desistimiento;
        const ventas_devueltas = data.ventas_devuelta;
        const ventas_recuperadas = data.ventas_recuperada;

        const contenedorEstadisticasAgente = document.getElementById(
            "contenedorEstadisticasAgente"
        );
        const contenedorEstadoVentasAgente = document.getElementById(
            "contenedorEstadoVentasAgente"
        );

        contenedorEstadisticasAgente.innerHTML = `
        <div class="campo">
            <div class="titulo">
                <p>Ventas mes actual:</p>
            </div>
            <div class="texto">
                <p>${cant_ventas_mes_actual}</p>
            </div>
        </div>

        <div class="campo">
            <div class="titulo">
                <p>Ventas semana actual:</p>
            </div>
            <div class="texto">
                <p>${cant_ventas_semana_actual}</p>
            </div>
        </div>

        <div class="campo">
            <div class="titulo">
                <p>Promedio ventas mes actual:</p>
            </div>
            <div class="texto">
                <p>${prom_venta_mes_actual}</p>
            </div>
        </div>

        <div class="campo">
            <div class="titulo">
                <p>Promedio ventas semana actual:</p>
            </div>
            <div class="texto">
                <p>${prom_venta_semana_actual}</p>
            </div>
        </div>

        <div class="campo">
            <div class="titulo">
                <p>Promedio ventas diarias:</p>
            </div>
            <div class="texto">
                <p>${prom_ventas_diarias}</p>
            </div>
        </div>

        <div class="campo">
            <div class="titulo">
                <p>Ventas restantes (para meta):</p>
            </div>
            <div class="texto">
                <p>${cant_ventas_restantes}</p>
            </div>
        </div>

        <div class="campo">
            <div class="titulo">
                <p>Porcentaje para cumplir meta:</p>
            </div>
            <div class="texto">
                <p>${porcCumplirMeta}%</p>
            </div>
        </div>
        `;

        contenedorEstadoVentasAgente.innerHTML = `
        <div class="campo">
            <div class="titulo">
                <p>Cantidad de ventas activas:</p>
            </div>
            <div class="texto">
                <p>${ventas_activas.length}</p>
            </div>
        </div>

        <div class="campo">
            <div class="titulo">
                <p>Cantidad de ventas temporales:</p>
            </div>
            <div class="texto">
                <p>${ventas_temporales.length}</p>
            </div>
        </div>

        <div class="campo">
            <div class="titulo">
                <p>Cantidad de ventas bajas:</p>
            </div>
            <div class="texto">
                <p>${ventas_bajas.length}</p>
            </div>
        </div>

        <div class="campo">
            <div class="titulo">
                <p>Cantidad de ventas firmadas:</p>
            </div>
            <div class="texto">
                <p>${ventas_firmadas.length}</p>
            </div>
        </div>

        <div class="campo">
            <div class="titulo">
                <p>Cantidad de ventas verificadas:</p>
            </div>
            <div class="texto">
                <p>${ventas_verificadas.length}</p>
            </div>
        </div>

        <div class="campo">
            <div class="titulo">
                <p>Cantidad de ventas canceladas:</p>
            </div>
            <div class="texto">
                <p>${ventas_canceladas.length}</p>
            </div>
        </div>

        <div class="campo">
            <div class="titulo">
                <p>Cantidad de ventas desistimientos:</p>
            </div>
            <div class="texto">
                <p>${ventas_desistimientos.length}</p>
            </div>
        </div>

        <div class="campo">
            <div class="titulo">
                <p>Cantidad de ventas devueltas:</p>
            </div>
            <div class="texto">
                <p>${ventas_devueltas.length}</p>
            </div>
        </div>

        <div class="campo">
            <div class="titulo">
                <p>Cantidad de ventas recuperadas:</p>
            </div>
            <div class="texto">
                <p>${ventas_recuperadas.length}</p>
            </div>
        </div>
        `;
    },

    agentesPertenecientes(res) {
        const dataAgentes = res.data["agentes_pertenecientes"];
        const agentesPertenecientesContenedor = document.getElementById(
            "agentesPertenecientesContenedor"
        );
        const listaAgentesPertenecientes = document.getElementById(
            "listaAgentesPertenecientes"
        );

        // Limpiar la lista antes de agregar nuevos elementos
        listaAgentesPertenecientes.innerHTML = "";

        dataAgentes.forEach((element) => {
            const listItem = document.createElement("div");
            listItem.innerHTML = `
                <p>Cedula: ${element.cedula}</p>
                <p>Nombre: ${element.nombre}</p>
                <p>Cantidad de ventas mes actual: ${element.ventas_mes_actual}</p>

            `;
            listaAgentesPertenecientes.appendChild(listItem);
        });

        // Agregar la lista completa al contenedor
        agentesPertenecientesContenedor.appendChild(listaAgentesPertenecientes);
    },

    editarEstadoVenta() {
        const id_venta = document.getElementById("idVenta").textContent;
        const estado = document.getElementById("estadoComboBoxCampoEditar").value;
        const observaciones_adicionales = document.getElementById('textareaObservacionesAdicionales').value;
        return {
            id_venta,
            estado,
            observaciones_adicionales
        };
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
            filtro.innerHTML = '';
            Tabla.vaciarCamposFiltros();
            Controlador.mostrarVentasTeamLeader();
        }

    },

    filtrarTabla() {
        const columnaBuscarComboBox = document.getElementById('columnaBuscar');
        const textoBuscar = document.getElementById('textoBuscar').value;

        columnaBuscarComboBox.addEventListener('change', () => {
            const estado = columnaBuscarComboBox.value;

            if (estado === "sin filtros") {
                Miscelaneas.recargarPagina(500)
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

}

export default Vista;

document.addEventListener("DOMContentLoaded", function () {
    Controlador.iniciar()
});

// Botón dentro del modal al seleccionar un registro que edita la info de una venta
const botonEditar = document.getElementById('botonEditar');
botonEditar.onclick = function () {
    swalAlert.confirmarAccion({
        texto: '¿Estás seguro de actualizar la venta?',
        funcionAlAceptar: Controlador.editarEstadoVenta,
        mensajeAlCancelar: "No se ha editado nada"
    })
}

// Boton que permite filtrar los registros para una fecha en especifico
const btnBuscarFecha = document.getElementById('btnBuscarFecha');
btnBuscarFecha.onclick = function () {
    Controlador.datosPorFecha()
}

// Boton que permite filtrar los registros para un intervalo de fechas
const btnBuscarIntervalo = document.getElementById('btnIntervalo');
btnBuscarIntervalo.onclick = function () {
    Controlador.datosPorIntervalo()
}

// Boton que permite filtrar los registros según una columna y texto a buscar
const btnFiltrarTabla = document.getElementById('btnFiltrarTabla');
btnFiltrarTabla.onclick = function () {
    Controlador.filtrarTabla();
}

// VENTAS
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
    const datos = document.getElementById('datos').value;
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
        <p>Datos: ${datos || 'no dado'}</p>
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