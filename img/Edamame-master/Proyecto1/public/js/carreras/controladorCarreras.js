'use strict'

/**
 * Lista las carreras al cargar la página.
 */
mostrarListaCarreras()

/**
 * Hace click a la opción de 'Acciones' para que se muestre
 * por default al cargar o recargar la página.
 */
document.getElementById("defaultOpen").click();

/**
 * Declaración de variables.
 */
let inputCodigo = document.querySelector('#txtCodigo');
let inputNombre = document.querySelector('#txtNombre');
let inputCreditos = document.querySelector('#txtCreditos');
let inputFecha = document.querySelector('#txtFecha');
let inputEstado = document.querySelector('#rdButton');
let inputBuscar = document.querySelector('#txtBuscarCodigo');
let botonRegistrar = document.querySelector('#btnRegistrar');

/**
 * Declaración de eventos relacionados a elementos HTML.
 */
botonRegistrar.addEventListener('click', obtenerDatos);
inputBuscar.addEventListener('keyup', mostrarBusqueda);

/**
 * Declaración de expresiones regulares.
 */
let regexCodigo = /^[a-zA-Z0-9]+$/;
let regexNombre = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ ]+$/;
let regexCreditos = /^[0-9]+$/;

/**
 * Descripción: breve descripción sobre la funcionalidad
 * @param: n/a
 * @return: n/a
 */
function obtenerDatos(){
    let sCodigo = inputCodigo.value;
    let sNombre = inputNombre.value;
    let nCreditos = inputCreditos.value;
    let dFechaCreacion = inputFecha.value;
    let bEstado = inputEstado.checked;

    let bError = false;
    bError = validarRegistro();
    
    if(bError == true){
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar la carrera, revise los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
          });
    }else{
        let respuesta = registrarCarrera(sCodigo , sNombre, nCreditos, dFechaCreacion, bEstado);
        if(respuesta.success == true){
            swal({
                title: 'Registro correcto',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Entendido'
              });
        }else{
            swal({
                title: 'Registro incorrecto',
                text: respuesta.msg,
                type: 'error',
                confirmButtonText: 'Entendido'
              });
        }
        limpiarFormulario();
        mostrarListaCarreras();  
    }
};

/**
 * Descripción: Valida los campos del registro y devuelve 'false'
 * en caso de que todos sean válidos o devuelve 'true' en caso de
 * que al menos uno no lo sea.
 * @param: n/a
 * @return: {boolean} bError
 */
function validarRegistro(){
    let bError = false;
    let sCodigo = inputCodigo.value;
    let sNombre = inputNombre.value;
    let nCreditos = Number(inputCreditos.value);
    let dFechaCreacion = new Date(inputFecha.value);
    let dFechaActual = new Date();

    // Validación del input para código
    if (sCodigo == '' || (regexCodigo.test(sCodigo) == false) ){
        inputCodigo.classList.add('errorInput');
        bError = true;
    }else{
        inputCodigo.classList.remove('errorInput');
    }

    // Validación del input para nombre
    if (sNombre == '' || (regexNombre.test(sNombre) == false) ){
        inputNombre.classList.add('errorInput');
        bError = true;
    }else{
        inputNombre.classList.remove('errorInput');
    }

    // Validación del input para créditos
    if(nCreditos == 0 || (regexCreditos.test(nCreditos) == false) ){
        inputCreditos.classList.add('errorInput');
        bError = true;
    }else{
        inputCreditos.classList.remove('errorInput');
    }

    // Validación del input para fecha
    if (dFechaCreacion == '' || dFechaCreacion > dFechaActual ){
        inputFecha.classList.add('errorInput');
        bError = true;
    }else{
        inputFecha.classList.remove('errorInput');
    }

    // agregar validarEstado();
    return bError;
}

/**
 * Descripción: Recibe la lista de carreras desde una petición al servicio
 * y los muestra en la tabla tblCarreras con un formato más adecuado para
 * el usuario.
 * @param: n/a
 * @return: n/a
 */
function mostrarListaCarreras(){
    let listaCarreras = obtenerCarreras();
    let tbody = document.querySelector('#tblCarreras tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < listaCarreras.length; i++){
        let fila = tbody.insertRow();

        let celdaCodigo = fila.insertCell();
        let celdaNombre = fila.insertCell();
        let celdaCreditos = fila.insertCell();
        let celdaFechaCreacion = fila.insertCell();
        let celdaEstado = fila.insertCell();

        celdaCodigo.innerHTML = listaCarreras[i]['codigo'];
        celdaNombre.innerHTML = listaCarreras[i]['nombre'];
        celdaCreditos.innerHTML = listaCarreras[i]['creditos'];

        let dFecha = new Date(listaCarreras[i]['fechaCreacion']);
        let nMes = dFecha.getUTCMonth() + 1;
        let nDia = dFecha.getUTCDate();
        let nAnno = dFecha.getUTCFullYear();
        celdaFechaCreacion.innerHTML = nDia + '/' + nMes + '/' + nAnno;
        
        let bEstado = listaCarreras[i]['estado'];
        if(bEstado){
            celdaEstado.innerHTML = 'Activa';
        }else{
            celdaEstado.innerHTML = 'Inactiva';
        }
    }
};

/**
 * Descripción: Envía como parámetro el String al servicio para
 * obtener una lista de carreras cuyo nombre haga match, y las 
 * muestra en una tabla junto con las opciones para editar y 
 * eliminar.
 * @param: n/a
 * @return: n/a
 */
function mostrarBusqueda(){
    let listaCarreras = obtenerBusqueda(inputBuscar.value);

    let tbody = document.querySelector('#tblBusqueda tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < listaCarreras.length; i++){
        let fila = tbody.insertRow();

        let celdaCodigo = fila.insertCell();
        let celdaNombre = fila.insertCell();
        let celdaCreditos = fila.insertCell();
        let celdaFechaCreacion = fila.insertCell();
        let celdaEstado = fila.insertCell();
        let celdaEditar = fila.insertCell();
        let celdaEliminar = fila.insertCell();

        celdaCodigo.innerHTML = listaCarreras[i]['codigo'];
        celdaNombre.innerHTML = listaCarreras[i]['nombre'];
        celdaCreditos.innerHTML = listaCarreras[i]['creditos'];
        
        let dFecha = new Date(listaCarreras[i]['fechaCreacion']);
        let nMes = dFecha.getUTCMonth() + 1;
        let nDia = dFecha.getUTCDate();
        let nAnno = dFecha.getUTCFullYear();
        celdaFechaCreacion.innerHTML = nDia + '/' + nMes + '/' + nAnno;
        
        let bEstado = listaCarreras[i]['estado'];
        if(bEstado){
            celdaEstado.innerHTML = 'Activa';
        }else{
            celdaEstado.innerHTML = 'Inactiva';
        }

        let botonEditar = document.createElement('a');
        botonEditar.href = '#';
        botonEditar.classList.add('far');
        botonEditar.classList.add('fa-edit');
        celdaEditar.appendChild(botonEditar);

        let botonEliminar = document.createElement('a');
        botonEliminar.href = '#';
        botonEliminar.classList.add('far');
        botonEliminar.classList.add('fa-trash-alt');
        celdaEliminar.appendChild(botonEliminar);
    }
};

/**
 * Descripción: Limpia los inputs del formulario de registro
 * podiendo en '' cada uno de los campos.
 * @param: n/a
 * @return: n/a
 */
function limpiarFormulario(){
    inputCodigo.value = '';
    inputNombre.value = '';
    inputCreditos.value = '';
    inputFecha.value = '';
};

/**
 * Descripción: Muestra una función según el botón presionado
 * en el panel de 'Acciones' y deshabilita las otras funciones
 * para que no se muestren.
 * @param: {String} evento, {String} funcion
 * @return: n/a
 */
function abrirFuncion(evt, funcion) {
    let i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(funcion).style.display = "block";
    evt.currentTarget.className += " active";
};