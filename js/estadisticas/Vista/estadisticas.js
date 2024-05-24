import Miscelaneas from '../../otros/miscelaneas.js'
import Controlador from '../Controlador/controlador-estadisticas.js'

const Vista = {

    llenarCuadroVentasTotales(cant_venta_totales, titulo) {

        const datos = document.getElementById("contenedorDatos")
        const contenidoDatos = document.createElement('div')
        contenidoDatos.classList.add("estadistica")
        contenidoDatos.innerHTML = `
            <div class="titulo">
                <p>${titulo}</p>
            </div>
             
            <div class="valor">
               <p>${cant_venta_totales}</p>
            </div>
    
            <div class="icono">
               <i class="fa-solid fa-money-check-dollar"></i>
            </div>
        `
        datos.append(contenidoDatos)

    },

    datosEstadisticos(res) {
        this.limpiarCuadrosVentasTotales()

        const cant_ventas_totales_realizadas = res.data.cant_ventas_realizadas
        const cant_ventas_totales_enero = res.data.cant_ventas_enero
        const cant_ventas_totales_febrero = res.data.cant_ventas_febrero
        const cant_ventas_totales_marzo = res.data.cant_ventas_marzo

        Vista.llenarCuadroVentasTotales(cant_ventas_totales_realizadas, "Ventas Totales")
        Vista.llenarCuadroVentasTotales(cant_ventas_totales_enero, "Ventas Enero")
        Vista.llenarCuadroVentasTotales(cant_ventas_totales_febrero, "Ventas Febrero")
        Vista.llenarCuadroVentasTotales(cant_ventas_totales_marzo, "Ventas Marzo")

    },

    llenarPromedios(res){
        const data = res.data

        //ventas
        const cantVentasActivas = data.ventas_activas.length
        const cantVentasDevuelta = data.ventas_devuelta.length
        const cantVentasCancelada = data.ventas_cancelada.length
        const cantVentasRecuperadas = data.ventas_recuperada.length
        const cantVentasTemporal = data.ventas_temporal.length
        const cantVentasBaja = data.ventas_baja.length
        const cantVentasFirmado = data.ventas_firmado.length
        const cantVentasVerificado = data.ventas_verificado.length
        const cantVentasDesistimiento = data.ventas_desistimiento.length
        const cantVentasPendiente = data.ventas_pendiente.length
        const cantVentasNoRecuperable = data.ventas_no_recuperable.length

        const contenidoStatusVentas = document.getElementById('contenidoStatusVentas');
        contenidoStatusVentas.innerHTML = 

        `
            <div class="status">
                <div class="icono-venta">
                    <i class="fa-solid fa-check"></i>
                </div>

                <div class="titulo-venta">
                    <p>Activas</p>
                </div>
                
                <div class="cant-venta">
                    <p>${cantVentasActivas}</p>
                </div>
            </div>

            <div class="status">
                <div class="icono-venta">
                    <i class="fa-solid fa-rotate-left"></i>
                </div>
                
                <div class="titulo-venta">
                    <p>Devueltas</p>
                </div>

                <div class="cant-venta">
                    <p>${cantVentasDevuelta}</p>
                </div>
            </div>

            <div class="status">
                <div class="icono-venta">
                    <i class="fa-solid fa-xmark"></i>
                </div>
                
                <div class="titulo-venta">
                    <p>Canceladas</p>
                </div>
                
                <div class="cant-venta">
                    <p>${cantVentasCancelada}</p>
                </div>
            </div>

            <div class="status">
                <div class="icono-venta">
                    <i class="fa-solid fa-xmark"></i>
                </div>

                <div class="titulo-venta">
                    <p>Bajas</p>
                </div>

                <div class="cant-venta">
                    <p>${cantVentasBaja}</p>
                </div>
            </div>
            
            <div class="status">
                <div class="icono-venta">
                    <i class="fa-solid fa-signature"></i>
                </div>

                <div class="titulo-venta">
                    <p>Firmadas</p>
                </div>

                <div class="cant-venta">
                    <p>${cantVentasFirmado}</p>
                </div>
            </div>

            <div class="status">
                <div class="icono-venta">
                    <i class="fa-solid fa-pause"></i>
                </div>

                <div class="titulo-venta">
                    <p>Pendiente</p>
                </div>

                <div class="cant-venta">
                    <p>${cantVentasPendiente}</p>
                </div>
            </div>

            <div class="status">
                <div class="icono-venta">
                    <i class="fa-solid fa-check"></i>
                </div>

                <div class="titulo-venta">
                    <p>Recuperada</p>
                </div>

                <div class="cant-venta">
                    <p>${cantVentasRecuperadas}</p>
                </div>
            </div>

            <div class="status">
                <div class="icono-venta">
                    <i class="fa-solid fa-hourglass"></i>
                </div>

                <div class="titulo-venta">
                    <p>Temporal</p>
                </div>

                <div class="cant-venta">
                    <p>${cantVentasTemporal}</p>
                </div>
            </div>

            <div class="status">
                <div class="icono-venta">
                    <i class="fa-solid fa-check"></i>
                </div>

                <div class="titulo-venta">
                    <p>Verificada</p>
                </div>

                <div class="cant-venta">
                    <p>${cantVentasVerificado}</p>
                </div>
            </div>

            <div class="status">
                <div class="icono-venta">
                    <i class="fa-solid fa-xmark"></i>
                </div>

                <div class="titulo-venta">
                    <p>Desistimiento</p>
                </div>

                <div class="cant-venta">
                    <p>${cantVentasDesistimiento}</p>
                </div>
            </div>

            <div class="status">
                <div class="icono-venta">
                    <i class="fa-solid fa-xmark"></i>
                </div>

                <div class="titulo-venta">
                    <p>No recuperable</p>
                </div>

                <div class="cant-venta">
                    <p>${cantVentasNoRecuperable} </p>
                </div>
            </div>

        `;
    },

    crearGrafico(myChart, labels_barra, datos_barra, tipo) {

        const cha = new Chart(myChart, {
            type: tipo,
            data: {
                labels: labels_barra,
                datasets: [{
                    label: '# de ventas',
                    data: datos_barra,
                    borderWidth: 1,
                    backgroundColor: [
                        'rgba(93, 23, 235, 0.2)', // Morado oscuro
                        'rgba(0, 100, 0, 0.2)',   // Verde oscuro
                        'rgba(255, 80, 234, 0.2)',
                    ]
                },


                ]
            },

        });
    },

    mostrarGraficas(res) {

        const myChart = document.getElementById('myChart')
        const dona = document.getElementById('myDona')

        const mesActual = parseInt(res.data.cant_ventas_marzo)

        const datos_barra = [res.data.cant_ventas_enero, res.data.cant_ventas_febrero, mesActual]
        const labels_barra = ['Enero', 'Febrero', 'Marzo']
        this.crearGrafico(myChart, labels_barra, datos_barra, 'bar')

        const datos_dona = [mesActual, 23 - mesActual]
        const labels_dona = ['Ventas realizadas', 'Ventas por cumplir']
        this.crearGrafico(dona, labels_dona, datos_dona, 'doughnut')

        const tituloGrafica = document.getElementById('tituloGrafica')
        tituloGrafica.innerHTML =
            `
        <p>Ventas mes actual =  ${mesActual}/23</p>
        `;
    },
/*
    llenarPromedios(res) {

        //promedios
        const ventasSemanaActual = res.data.cant_ventas_semana_actual
        const promedioMesActual = res.data.prom_venta_mes_actual
        const promedioSemanaActual = res.data.prom_venta_semana_actual
        const vistaPromedioSemanal = document.getElementById('promedioSemanal');
        const vistaPromedioMensual = document.getElementById("promedioMensual");
        const vistaVentaSemanal = document.getElementById("ventaSemanal");
        vistaPromedioSemanal.innerHTML = `
        <div class="icono">
           <p> <i class="fa-solid fa-percent"></i></p>
        </div>
        <div class="titulo_promedio">
            <p>Promedio ventas semanal</p>
        </div>
        <div class="numero_promedio">
            <p>${promedioSemanaActual} </i></p>
        </div>
    `;

        vistaPromedioMensual.innerHTML = `
        <div class="icono">
            <p> <i class="fa-solid fa-percent"></i></p>
        </div>
        <div class="titulo_promedio">
            <p>Promedio ventas mensual</p>
        </div>
        <div class="numero_promedio">
            <p>${promedioMesActual}</i></p>
        </div>
    `;

        vistaVentaSemanal.innerHTML = `
        <div class="icono">
            <p> <i class="fa-solid fa-calendar-days"></i></p>
        </div>
        <div class="titulo_promedio">
            <p>Cantidad ventas semanal</p>
        </div>
        <div class="numero_promedio">
            <p>${ventasSemanaActual}</p>
        </div>
    `;


        //ventas
        const cantVentasActivas = res.data.ventas_activas.length
        const cantVentasTemporal = res.data.ventas_temporal.length
        const cantVentasBaja = res.data.ventas_baja.length
        const cantVentasFirmado = res.data.ventas_firmado.length
        const cantVentasVerificado = res.data.ventas_verificado.length
        const cantVentasCancelada = res.data.ventas_cancelada.length
        const cantVentasDesistimiento = res.data.ventas_desistimiento.length
        const cantVentasPendiente = res.data.ventas_pendiente.length
        const cantVentasNoRecuperable = res.data.ventas_no_recuperable.length
        const cantVentasDevuelta = res.data.ventas_devuelta.length

        const ventas = document.getElementById('ventas')

        ventas.innerHTML = `
        <div class="ventas_estado" id="ventasActivas">
            <div class="icono">
                <p><i class="fa-solid fa-check"></i></p>
            </div>
            <div class="titulo_promedio">
                <p>Ventas activas</p>
            </div>
            <div class="numero_promedio">
                <p>${cantVentasActivas}</i></p>
            </div>
        </div>

        <div class="ventas_estado" id="ventasBajas">
            <div class="icono">
                <p><i class="fa-solid fa-check"></i></p>
            </div>
            <div class="titulo_promedio">
                <p>Ventas temporales</p>
            </div>
            <div class="numero_promedio">
                <p>${cantVentasTemporal}</i></p>
            </div>
        </div>

        <div class="ventas_estado" id="ventasPendiente">
            <div class="icono">
                <p><i class="fa-solid fa-check"></i></p>
            </div>
            <div class="titulo_promedio">
                <p>Ventas bajas</p>
            </div>
            <div class="numero_promedio">
                <p>${cantVentasBaja}</i></p>
            </div>
        </div>

        <div class="ventas_estado" id="ventasPendiente">
            <div class="icono">
                <p><i class="fa-solid fa-check"></i></p>
            </div>
            <div class="titulo_promedio">
                <p>Ventas pendientes</p>
            </div>
            <div class="numero_promedio">
                <p>${cantVentasPendiente}</i></p>
            </div>
        </div>

        <div class="ventas_estado" id="ventasPendiente">
            <div class="icono">
                <p><i class="fa-solid fa-check"></i></p>
            </div>
            <div class="titulo_promedio">
                <p>Ventas canceladas</p>
            </div>
            <div class="numero_promedio">
                <p>${cantVentasCancelada}</i></p>
            </div>
        </div>

        <div class="ventas_estado" id="ventasNoSeleccionada">
            <div class="icono">
                <p><i class="fa-solid fa-check"></i></p>
            </div>
            <div class="titulo_promedio">
                <p>Ventas devueltas</p>
            </div>
            <div class="numero_promedio">
                <p>${cantVentasDevuelta}</i></p>
            </div>
        </div>

        <div class="ventas_estado" id="ventasNoSeleccionada">
            <div class="icono">
                <p><i class="fa-solid fa-check"></i></p>
            </div>
            <div class="titulo_promedio">
                <p>Ventas firmadas</p>
            </div>
            <div class="numero_promedio">
                <p>${cantVentasFirmado}</i></p>
            </div>
        </div>

        <div class="ventas_estado" id="ventasNoSeleccionada">
            <div class="icono">
                <p><i class="fa-solid fa-check"></i></p>
            </div>
            <div class="titulo_promedio">
                <p>Ventas verificadas</p>
            </div>
            <div class="numero_promedio">
                <p>${cantVentasVerificado}</i></p>
            </div>
        </div>

        <div class="ventas_estado" id="ventasNoSeleccionada">
            <div class="icono">
                <p><i class="fa-solid fa-check"></i></p>
            </div>
            <div class="titulo_promedio">
                <p>Ventas desestimiento</p>
            </div>
            <div class="numero_promedio">
                <p>${cantVentasDesistimiento}</i></p>
            </div>
        </div>

        <div class="ventas_estado" id="ventasNoSeleccionada">
            <div class="icono">
                <p><i class="fa-solid fa-check"></i></p>
            </div>
            <div class="titulo_promedio">
                <p>Ventas no recuperadas</p>
            </div>
            <div class="numero_promedio">
                <p>${cantVentasNoRecuperable}</i></p>
            </div>
        </div>

`;

    },
*/
    obtenerDatosSegunSeleccion(resAgente, seleccion) {

        switch (seleccion) {
            case 'activa':
                return resAgente.data.ventas_activas;
            case 'devuelta':
                return resAgente.data.ventas_devuelta;
            case 'cancelada':
                return resAgente.data.ventas_cancelada;
            case 'firmado':
                return resAgente.data.ventas_firmado;
            case 'pendiente':
                return resAgente.data.ventas_pendiente;
            case 'recuperada':
                return resAgente.data.ventas_recuperada;
            case 'temporal':
                return resAgente.data.ventas_temporal;
            case 'verificada':
                return resAgente.data.ventas_verificado;
            case 'bajas':
                return resAgente.data.ventas_baja;
            case 'desistimiento':
                return resAgente.data.ventas_desistimiento;
            case 'no recuperable':
                return resAgente.data.ventas_no_recuperable;
            default:
                return [];

        }
    },

    crearFilaDeDatos(dato, columnasAMostrar) {
        const fila = document.createElement('tr');
        columnasAMostrar.forEach(columna => {
            const celda = document.createElement('td');
            celda.textContent = dato[columna];
            this.aplicarEstilos(celda, columna, dato[columna]);
            fila.appendChild(celda);
        });
        return fila;
    },

    aplicarEstilos(celda, columna, valor) {

        const estilos = {
            'verificacion_calidad': {
                'cumple calidad': 'letras-estado-verde',
                'no cumple calidad': 'letras-estado-rojo',
                'pendiente': 'letras-estado-amarillo'
            },

            'estado': {
                'activa': 'letras-estado-verde',
                'firmado': 'letras-estado-verde',
                'recuperada': 'letras-estado-azul',
                'temporal': 'letras-estado-azul',
                'verificada': 'letras-estado-azul',
                'devuelta': 'letras-estado-rojo',
                'cancelada': 'letras-estado-rojo',
                'desistimiento': 'letras-estado-rojo',
                'baja': 'letras-estado-rojo',
                'pendiente': 'letras-estado-amarillo',

            }
        };
        if (estilos[columna] && estilos[columna][valor]) {
            celda.classList.add(estilos[columna][valor]);
        }
    },

    mostrarTodasLasVentas(resAgente) {

        const combobox = document.getElementById('estadoVenta');
        combobox.addEventListener('change', () => {
            const seleccion = combobox.value;

            const datos = this.obtenerDatosSegunSeleccion(resAgente, seleccion)

            const tablaDatos = document.getElementById('tablaDatos');
            tablaDatos.innerHTML = '';

            // Definir las columnas que deseas mostrar
            const columnasAMostrar = ['fecha_ingreso_venta', 'nombre_agente', 'observaciones_venta', 'verificacion_calidad', 'observaciones_calidad', 'observaciones_adicionales', 'estado'];

            // Crear encabezado
            const encabezadoRow = document.createElement('tr');
            for (const columna of columnasAMostrar) {
                const th = document.createElement('th');
                th.textContent = columna;
                encabezadoRow.appendChild(th);
            }

            tablaDatos.appendChild(encabezadoRow)
            datos.forEach(dato => {
                const fila = this.crearFilaDeDatos(dato, columnasAMostrar)
                tablaDatos.appendChild(fila)

            })

        })

    },

    obtenerNombre() {
        const combobox = document.getElementById('teamLeader');
        combobox.addEventListener('change', () => {
            const cedula = combobox.value;
            if (cedula) {
                Controlador.ventasRealizadasAgente(cedula, (res) => {
                    this.datosEstadisticos(res);
                });
                Controlador.traerAgentesPertenecientes(cedula)
            } else {
                this.limpiarCuadrosVentasTotales()
                const datos = document.getElementById("contenedorDatos");

                // Eliminar cuadros si no se selecciona ningún equipo líder
                datos.innerHTML =
                    `
                <div class="estadistica">
                    <div class="titulo">
                        <p>Ventas Totales</p>
                    </div>
                    
                    <div class="valor">
                    <p></p>
                    </div>

                    <div class="icono">
                    <i class="fa-solid fa-money-check-dollar"></i>
                    </div>                                
                </div>

                <div class="estadistica">
                    <div class="titulo">
                        <p>Ventas Diciembre</p>
                    </div>
                    
                    <div class="valor">
                    <p></p>
                    </div>

                    <div class="icono">
                    <i class="fa-solid fa-money-check-dollar"></i>
                    </div>                                
                </div>

                <div class="estadistica">
                    <div class="titulo">
                        <p>Ventas Enero</p>
                    </div>
                    
                    <div class="valor">
                    <p></p>
                    </div>

                    <div class="icono">
                    <i class="fa-solid fa-money-check-dollar"></i>
                    </div>                                
                </div>

                <div class="estadistica">
                    <div class="titulo">
                        <p>Ventas Febrero</p>
                    </div>
                    
                    <div class="valor">
                    <p></p>
                    </div>

                    <div class="icono">
                    <i class="fa-solid fa-money-check-dollar"></i>
                    </div>                                
                </div>        
        `;
            }
        });
    },

    limpiarCuadrosVentasTotales() {
        const datos = document.getElementById("contenedorDatos");
        datos.innerHTML = ""; // Eliminar todos los cuadros de ventas
    },

    agentesPertenecientes(res, lider_equipo) {
        console.log(lider_equipo)
        const dataAgentes = res.data["agentes_pertenecientes"];
        const tituloAgentesPertenecientesTeamLeader = document.getElementById('tituloAgentesPertenecientesTeamLeader');
        tituloAgentesPertenecientesTeamLeader.textContent = `Agentes pertenecientes a:  ${Miscelaneas.capitalizarTexto(lider_equipo)}`
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

    contenidoAdmin() {
        const contenidoPagina = document.getElementById('contenidoPagina');
        contenidoPagina.innerHTML = '';

        contenidoPagina.innerHTML =
            `
        <section class="cabecera">
        <div class="nombre-lider">
            <p>Team leader:</p>
            <select name="team leader" id="teamLeader">
                <option value="No selecionado" selected>No selecionado</option>
                <option value="1047362494">Andres</option>
                <option value="11122344">Davina</option>
                <option value="1188813">Ray</option>
                <option value="1143461749">Laureano</option>
                <option value="9055720373">Nicanor</option>
            </select>
        </div>
    </section>

    <section class="cuerpo">
        <div class="estadisticas">
            <div class="indicadores">
            <!--
                <div class="promedio-mes">
                    <p><b>Promedio ventas mensual</b> = 23</p>
                </div>
                

                <div class="promedio-semanal">
                    <p><b>Promedio ventas semanal</b> = 12</p>
                </div>
                -->
            </div>
            <div class="datos-estadisticos">
                <div class="contenido-datos-estadisticos" id="contenedorDatos">

                </div>
            </div>
        </div>

        <div class="opciones">
            <div class="tarjetas">

                <div class="tarjeta tarjeta-equipo">
                    <div class="cabecera">
                        <div class="icono">
                            <i class="fa-solid fa-people-group"></i>
                        </div>
                        <div class="titulo">
                            <p id = "tituloAgentesPertenecientesTeamLeader">Agentes pertenecientes a:</p>
                        </div>
                    </div>

                    <div class="cuerpo">
                        <div class="descripcion" id = "agentesPertenecientesContenedor">
                            <ul id = "listaAgentesPertenecientes">
                                
                            </ul>
                        </div>
                    </div>

                    <div class="pie">
                        <a href="../estadisticas.html">Ver estadísticas</a>
                    </div>
                </div>

            </div>
        </div>
        </div>
    </section>
        `;

    },

    identificarRol() {
        if (localStorage.getItem('rol') == "admin") {
            this.contenidoAdmin()
            Vista.obtenerNombre();
        }
    }
}

export default Vista;

document.addEventListener('DOMContentLoaded', function () {

    Controlador.iniciarPagina()
})