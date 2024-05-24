const swalAlert = {

    confirmarAccion(opciones) {
        const {
            texto,
            html,
            funcionAlAceptar,
            parametroFuncionAceptar,
            funcionAlCancelar,
            confirmButtonText = 'Aceptar',
            cancelButtonText = 'Cancelar',
            mensajeAlCancelar,
            titulo = '¿Estás seguro?',
            icono = 'warning'
        } = opciones;

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
            title: titulo,
            html: html,
            text: texto,
            icon: icono,
            showCancelButton: true,
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            reverseButtons: false
        }).then((result) => {
            if (result.isConfirmed) {
                if (funcionAlAceptar) {
                    if(parametroFuncionAceptar){
                        funcionAlAceptar(parametroFuncionAceptar)
                    }else{
                        funcionAlAceptar();
                    }
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                if (funcionAlCancelar) {
                    funcionAlCancelar();
                } else {
                    swalWithBootstrapButtons.fire(
                        'Cancelado',
                        mensajeAlCancelar,
                        'error'
                    );
                }
            }
        });
    },

    mostrarMensajeError(mensaje) {
        Swal.fire({
            icon: 'error',
            title: 'Algo salió mal',
            text: mensaje,
        })
    },

    mostrarAlertaSatisfactorio(mensaje) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
        })
    },

    mostrarMensajeAdvertencia(mensaje) {
        Swal.fire({
            icon: 'warning',
            title: 'Faltan campos por llenar',
            text: mensaje,
        })
    },

    mostrarPantallaDeCarga(mensaje){
        Swal.fire({
            title: mensaje,
            html: '<div class="loader"></div>',
            allowOutsideClick: false,
            showConfirmButton: false
          });
        
    }

}

/* 
            swalAlert.mostrarPantallaDeCarga()
                Swal.close();


*/

export default swalAlert;