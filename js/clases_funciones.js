//importar
import { bdProductos } from "./bdProductos.js"; //Base de datos de productos disponibles
import { bdFPago } from "./bdFPago.js"; //Base de datos opciones de pago
import { bdUsuariosInt } from "./bdUsuarios.js";

//------------------------------------------------------------------- DECLARACION DE VARIABLES Y CONSTANTES ----------------------------------------------

//Menú de Navegación
const linkProductos = document.getElementById('nav-productos');
const linkOfertas = document.getElementById('nav-ofertas');

//Carrito de compras del medio del menú de navegación
const carrito = document.querySelector(".carrito");

//Icono de Login en el menú de navegación (izquierda)
const usuarioLogin = document.querySelector('.user-login-off'); //es el ícono que está a la izquierda en la barra de navegación
const nombreUser = document.querySelector('.nombre-user-login'); //etiqueta Nombre a la derecha del ícono del login (arriba izquierda). Se asigna el nombre del usuario cuando se loguea
const cerrarSesion = document.querySelector('#cierre-sesion'); //cierra la sesión del usuario

//Totales carrito que se muestra en el menú de navegación arriba a la derecha
const totalesCarrito = document.querySelector(".totales-carrito");

//Sección Filtros
const textoAlternativo = document.getElementById('texto-alternativo'); //texto alternativo del filtro
const cantidadProdEncontrados = document.getElementById('total-productos'); //productos encontrados del filtro
const textoABuscar = document.querySelector("#texto-filtro"); //texto del filtro
const buscarProducto = document.querySelector("#buscar"); //botón buscar del filtro
const tipoFiltro = document.querySelector("#tipo-filtro"); //dropdown tipo de filtro

//Seccion Productos
const seccionProductos = document.getElementById("productos"); //Sección productos

//Formulario Modal carrito de compras
const modal = document.querySelector(".modal"); //Modal Carrito de Compras
const modalContainer = document.querySelector(".modal-container"); //Container carrito de compras
const modalContainerTitulo = document.querySelector(".modal-container-titulo"); //Título carrito de compras
const cerrarModal = document.querySelector(".modal-close"); //Cerrar carrito de compras
const vaciarCarrito = document.querySelector("#vaciar-carrito"); //Botón para vaciar carrito de compras
const finalizarCompra = document.querySelector("#finalizar-compra"); //botón para finalizar compra

//Formulario Modal para finalizar la compra - Datos personales y forma de pago
const modalFinCompra = document.querySelector(".modal-fincompra"); //Modal Finalizar Compra
const cerrarFinCompra = document.querySelector(".close-fincompra"); //Cerrar modal finalización compra
const volverAlCarrito = document.querySelector(".volver-carrito"); //Link para volver al carrito cuando se está en el modal de finalización de la compra
const selectFPago = document.querySelector(".formapago"); //dropdown para seleccionar las opciones de pago
const finalizarPago = document.querySelector(".finalizar-pago"); //botón para realizar el pago

//Carrito fijo en la parte inferior derecha
const carritoFijo = document.querySelector(".carrito-fijo");

//Formulario de Login
const modalLogin = document.querySelector(".modal-login"); //Modal Login
const usuarioEmail = document.getElementById('login-email'); //input donde se ingresa el e-mail al momento del login
const usuarioClave = document.getElementById('login-clave'); //input donde se ingresa la clave al momento del login
const buttonLogin = document.getElementById('button-login'); //botón 'Ingresar' del formulario Login que tiene
const errorLogin = document.getElementById('errorLog'); //párrafo que informa que la combinación de E-mail y clave no existen
const crearCuenta = document.getElementById('crearCuenta'); //link para crear un nuevo usuario o cuenta

//Formulario de Nuevo Usuario
const modalNuevoUsuario = document.querySelector(".modal-nuevoUsuario"); //Modal Nuevo Usuario
const buttonNuevoUsuario = document.querySelector(".button-nuevoUsuario"); //Botón para crear nuevo usuario
const nuevoUsuarioEmail = document.querySelector("#nuevoUsuario-email");
const errorNuevoUsuario = document.querySelector('#errorLog-nuevoUsuario'); //párrafo que informa que el E-mail se encuentra registrado en la base de datos
const nuevoUsuarioNombre = document.querySelector('#nuevoUsuario-nombre');
const nuevoUsuarioClave = document.querySelector('#nuevoUsuario-clave');
const nuevoUsuarioReIngreseClave = document.querySelector('#nuevoUsuario-reIngreseClave');

//-------------------------------------- OTRAS VARIABLES Y CONSTANTES ------------------------------------------------------
export const totalProductos = [...bdProductos]; //base de datos de productos en un array
let miCarrito = [];
let totalFinalCarrito = 0;
let cantCuota = 0;
let importeCuota = 0;
let blnModalFinalizarCompra = false;

//------------------------------------------------------------------- EXPRESIONES REGULARES ----------------------------------------------
const regexEMail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/; //para validar correo electrónico
const regexApellidoNombre = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s'-]+$/; //para validar ingreso de Apellido y Nombre

//----------------------------------------------------------------------------- DECLARACION DE CLASES ----------------------------------------------------
//clase del carrito de compra
class CarritoCompra {
    constructor(codigo, nombre, cantidad, precio) { //me resulta manejar más fácil así al constructor que utilizando desestructuración
        this.codigo = codigo;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
    }
    //Se declaran las funciones get y set que se van a utilizar
    getCodigo = function () {
        return this.codigo;
    }
    getNombre = function () {
        return this.nombre;
    }
    getCantidad = function () {
        return this.cantidad;
    }
    getPrecio = function () {
        return this.precio;
    }
    setCantidad = function (cantidad) {
        this.cantidad = cantidad;
    }
};

//-----------------------------------------------------------------------------  D E C L A R A C I O N   D E   F U N C I O N E S  ----------------------------------------------------

//* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  F U N C I O N E S   C O M U N E S   A   T O D O S   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
//Lee la clave "micarrito" del localStorage. La clave "micarrito" contiene el total de productos agregado al carrito que todavía no se finalizó o concretó la compra.
export const cargaCarritoLS = () => {
    const micarritoLS = JSON.parse(localStorage.getItem('micarrito')) || []; //se hace la lectura del localstorage para ver si el carrito tiene contenido
    //Instancia todos los registros del carrito
    micarritoLS.forEach((el) => {
        miCarrito.push(new CarritoCompra(el.codigo, el.nombre, el.cantidad, el.precio)); //Se agrega el producto en el carrito
    }); -carrito - 1
    actualizaTotalesCarrito(miCarrito); //actualiza total carrito

    //Verifica is existe algún usuario logueado en la clave "Auth" del localStorage
    if (leeLogin().nombre) {
        nombreUser.textContent = leeLogin().nombre; //asigna el nombre del usuario a la etiqueta a la derecha del ícono de login
        cerrarSesion.classList.add('cerrar-sesion'); //muetra párrafo de Cierre de Sesión
        cambiaColorIconoLogin('user-login-on','user-login-off');
    }
    else {
        nombreUser.textContent = "Ingresar";
        cerrarSesion.classList.remove('cerrar-sesion');
        cambiaColorIconoLogin('user-login-off','user-login-on');
    };
};

//Actualiza la clave "micarrito" en el localStorage
const seteaCarritoLS = (miCarrito) => {
    localStorage.setItem("micarrito", JSON.stringify(miCarrito));
    actualizaTotalesCarrito(miCarrito); //actualiza total carrito
};

//Lee la clave "isLogin" del localStorage. Esta clave contiene el valor "true" si el usuario ya está logueado o "false" de lo contrario.
const leeLogin = () => {
    return JSON.parse(localStorage.getItem('Auth')) || { isLogin: false, nombre: "", email: "" };
};

//actualiza Totales del Carrito en el menú superior a la derecha
const actualizaTotalesCarrito = (miCarrito) => {
    const totalProductos = document.querySelector(".productos");
    const totalItems = document.querySelector(".items");
    const totalImporte = document.querySelector(".importe");
    //Items y Total del subtotal del carrito de compras
    const totalItemsSubTotalCarrito = document.querySelector(".modal-subtotal-carrito-2");
    const totalImporteSubTotalCarrito = document.querySelector(".modal-subtotal-carrito-3");
    const totalProductosSubTotalCarrito = document.querySelector(".modal-subtotal-carrito-1");

    //obtiene la totalidad de productos y lo asigna al elemento correspondiente
    totalProductos.textContent = miCarrito.length;
    totalProductosSubTotalCarrito.textContent = `Total Productos: ( ${miCarrito.length} )`;
    //obtiene la totalidad de los items
    const totalItemsCarrito = miCarrito.reduce((totalAcum, valorActual) => {
        return totalAcum + valorActual.getCantidad();
    }, 0);
    totalItems.textContent = totalItemsCarrito;
    totalItemsSubTotalCarrito.textContent = totalItemsCarrito; //total items del subtotal del carrito de compras
    //obtiene importe total del carrito
    const totalImporteCarrito = miCarrito.reduce((totalAcum, valorActual) => {
        return totalAcum + (valorActual.getCantidad() * valorActual.getPrecio());
    }, 0);
    totalFinalCarrito = totalImporteCarrito;
    totalImporte.textContent = '$ ' + totalImporteCarrito.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    totalImporteSubTotalCarrito.textContent = '$ ' + totalImporteCarrito.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }); //total importe del subtotal del carrito
};

const modalShowToggleCarrito = () => {
    modal.classList.toggle('modal--show');
};
const modalShowToggleFinCompra = () => {
    modalFinCompra.classList.toggle('modal-fincompra--show');
};
const modalShowToggleLogin = () => {
    modalLogin.classList.toggle('modal-login--show');
};
const modalShowToggleCerrarSesion = () => {
    cerrarSesion.classList.toggle('cerrar-sesion');
};
const modalShowToggleNuevoUsuario = () => {
    modalNuevoUsuario.classList.toggle('modal-nuevoUsuario--show');
};

//* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  F U N C I O N E S   D E L   M E N U   N A V E G A C I O N   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
//Muestra los productos disponibles para la venta en el DOM generando los elementos HTML
export const cargarProductos = (productos,textoProductosEncontrados="Productos Encontrados: ") => {
    borrarArticulos();
    if (productos.length === 0) { //si el array de productos no contiene datos se muestra un mensaje que indica la no existencia productos.
        textoAlternativo.innerHTML = `<p class="texto-alternativo">No hay productos por mostrar.</p>`
    }
    else { //de lo contrario, se muestran todos los productos del array
        (textoABuscar.value) && (textoAlternativo.innerHTML = `<p class="texto-alternativo">Resultado de la búsqueda <b>Por ${(tipoFiltro.value === '1' ? "Descripción" : "Categoría")}</b></p>
                                                                   <span class="color-alternativo">'${textoABuscar.value}'</span>`);
        (productos.length > 0) && (cantidadProdEncontrados.innerHTML = `<p class="total-productos">${textoProductosEncontrados}<b>${productos.length}</b></p>`);
        productos.forEach((el) => {
            let precioFormateado = el.precio.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }); //da formato al precio unitario
            
            //PARA CREAR LOS ELEMENTOS DEL DOM PREFERÍ UTILIZAR LOS MÉTODOS DE CREACIÓN DE ELEMENTOS antes que el innerHTML
            //SE CREA EL DIV PRINCIPAL PARA CONTENER A LOS ARTICULOS O PRODUCTOS
            const articuloDiv = document.createElement('div');
            articuloDiv.classList.add('articulo'); //se le asigna class="articulo"
            //se crea un div hijo de Artículo. Este div es para contener la imagen del producto
            const articuloDivIMG = document.createElement('div');
            articuloDivIMG.classList.add('articulo-img'); //se le asigna class="articulo-img"
            //se crea el elemento img para la imagen del producto o artículo
            const articuloIMG = document.createElement('img');
            articuloIMG.src=el.url;
            articuloIMG.alt=el.nombre;
            //hasta acá se definió el div contenedor para la imagen del producto, quedando en el html de la sig manera:
            //                  <div class="articulo-img">
            //                      <img src="el.url" alt="el.nombre">
            //                  </div>
            
            //Ahora se crea un párrafo <p></p> para contener el nombre del producto
            const articuloNombre = document.createElement('p');
            articuloNombre.classList.add('articulo-nombre'); //se le asigna class="articulo-nombre"
            articuloNombre.textContent = el.nombre;
            //hasta acá se definió el párrafo para el nombre, quedando en el html de la sig manera:
            //                  <p class="articulo-nombre">el.nombre</p>

            //Ahora se crea un div para contener el precio del producto con sus extras (precio anterior, oferta, etc...)
            const articuloLineaPrecioDiv = document.createElement('div');
            articuloLineaPrecioDiv.classList.add('articulo-linea-precio'); //se le asigna class="articulo-linea-precio"
            const articuloPrecio = document.createElement('p'); //se crear el párrafo para el precio
            articuloPrecio.classList.add('articulo-precio'); //se le asigna class="articulo-precio";
            articuloPrecio.textContent = `$ ${precioFormateado}`;
            
            //Se realizan todos los appendChild
            articuloDivIMG.appendChild(articuloIMG);
            articuloDiv.appendChild(articuloDivIMG);
            articuloDiv.appendChild(articuloNombre);
            articuloLineaPrecioDiv.appendChild(articuloPrecio);
            articuloDiv.appendChild(articuloLineaPrecioDiv);

            //Se agregan las ofertas, si el artículo está en oferta
            if(el.oferta[0] > 0) {
                //calcula precio de lista = (precio / ((100 - oferta) / 100)) => 1798,75 = (1439 / ((100 - 20) / 100))
                let precioLista = (el.precio / ((100 - el.oferta[0]) / 100));
                let precioListaFormateado = precioLista.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }); //da formato al precio anterior

                //agrega párrafo Precio Lista
                const articuloPrecioLista = document.createElement('p');
                articuloPrecioLista.classList.add('articulo-preciolista');
                articuloPrecioLista.textContent = `$${precioListaFormateado}`;
                articuloPrecio.parentNode.insertBefore(articuloPrecioLista, articuloPrecio); //agrega el precio anterior a la oferta antes del precio actual

                //agrega párrafo con bonificación
                const articuloOferta = document.createElement('p');
                articuloOferta.classList.add('articulo-oferta');
                articuloOferta.textContent = `${el.oferta[0]}% off`
                articuloOferta.style.backgroundColor = el.oferta[1];
                articuloLineaPrecioDiv.appendChild(articuloOferta);
                //Con el precio actual, el html quedaría de la sig manera:
                //
                //                             <div class="articulo-linea-precio">
                //                                 <p class="articulo-precio-anterior">$${precioListaFormateado}</p>
                //                                 <p class="articulo-precio">$${precioFormateado}</p>
                //                                 <p class="articulo-oferta">{el.oferta[0]}% off</p>
                //                             </div>
            };
            
            ////////////////////////////////   ESTE CODIGO SE UTILIZARÍA CON LA PROPIEDAD INNERHTML ///////////////////////////////////
                    //if(el.oferta[0]===0) {//
                    //    articulo.innerHTML = ` 
                    //                        <div class="articulo-img"><img src="${el.url}" alt="${el.nombre}"></div>
                    //                        <div class="articulo-informacion">
                    //                            <p class="articulo-nombre">${el.nombre}</p>
                    //                            <p class="articulo-precio">$${precioFormateado}</p>
                    //                        </div>`
                    // }
                    // else {
                    //     articulo.innerHTML = ` 
                    //                         <div class="articulo-img"><img src="${el.url}" alt="${el.nombre}"></div>
                    //                         <div class="articulo-informacion">
                    //                             <div class="articulo-nombre">${el.nombre}</div>
                    //                             <div class="articulo-linea-precio">
                    //                                 <p class="articulo-precio-anterior">$${precioFormateado}</p>
                    //                                 <p class="articulo-precio">$${precioFormateado}</p>
                    //                                 <p class="articulo-oferta">30% off</p>
                    //                             </div>
                    //                         </div>`
                    // };
            /////////////////////////////////////////////////////////

            //Se crea el elemento button para Comprar
            const botonComprar = document.createElement('button');
            botonComprar.classList.add("articulo-button");
            botonComprar.textContent = "Comprar";
            botonComprar.addEventListener("click", () => {
                agregaArticulo(el.codigo, el.nombre, el.precio); //se agrega el producto o artículo al carrito
            });
            articuloDiv.appendChild(botonComprar);
            seccionProductos.appendChild(articuloDiv);
        });
    }
};

//Borra los productos en el DOM
const borrarArticulos = () => {
    //borra el párrafo de No hay productos para mostrar
    textoAlternativo.innerHTML = `<p class="texto-alternativo"></p>`
    cantidadProdEncontrados.innerHTML = `<p class="total-productos"></p>`
    //borra todos los productos mostrados
    seccionProductos.innerHTML = '';
};

//Agrega productos al carrito, previa verificación si el producto ya existe. En ese caso se suma 1 a la cantidad. Si no existe se crea una instancia u objeto invocando a la función actualizaMiCarrito
const agregaArticulo = (codigo, nombre, precio) => {
    let cantidad = verificaCantidadEnCarrito(codigo); //verifica si el código ya existe en el carrito y devuelve la cantidad
    actualizaMiCarrito(codigo, nombre, precio, cantidad);
};

//Verifica si el producto existe en el carrito. Si existe retorna o devuelve la cantidad de ese producto agregada al carrito y si no lo encuentra devuelve cero.
const verificaCantidadEnCarrito = (codigo = '') => {
    if (miCarrito.length === 0) return 0; //Si el carrito está vacío, retorna 0
    const buscar = miCarrito.find((producto) => producto.getCodigo() === codigo);
    if (buscar) return buscar.getCantidad(); //si encuentra el código en miCarrito, devuelve la cantidad comprada
    return 0; //si no encuentra el código en el carrito, devuelve cero
};

//Actualiza cantidad de un producto existente o agrega un producto al carrito
const actualizaMiCarrito = (codigo, nombre, precio, cantidad) => {
    const indice = miCarrito.findIndex((producto) => producto.getCodigo() === codigo);
    (indice >= 0) //Si el método 'findIndex' encuentra el registro indice va a ser igual o mayor a cero, de lo contrario es -1
        ? miCarrito[indice].setCantidad(cantidad + 1) //Actualiza la cantidad del producto en el carrito sumando 1.
        : miCarrito.push(new CarritoCompra(codigo, nombre, 1, precio)); //Se agrega el producto en el carrito
    seteaCarritoLS(miCarrito);
    alertAgregado('success', 'producto agregado', '#dd710c');
};

//Alerta de Producto Agregado al Carrito
const alertAgregado = (icono, titulo, colorFondo) => {
    Toast.fire({
        icon: icono, // success
        title: titulo, // agregado
        background: colorFondo, // #34b555
    });
};

//Librería SweetAlert para producto agregado
const Toast = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    width: 300,
    color: 'whitesmoke',
    timer: 1000,
    timerProgressBar: true,
});

//Filtrar Ofertas
const filtrarOfertas = () => {
    let filtroOfertas = [];
    filtroOfertas = totalProductos.filter((el) => (el.oferta[0] > 0)); //busca por oferta = 1
    return filtroOfertas;
};

//muestra el contenido del carrito de compras
const muestraCarritoCompras = () => {
    if (miCarrito.length === 0) {
        alertaCarritoVacio(0, false);
    }
    else {
        limpiaHtmlCarrito();
        modalShowToggleCarrito();
        agregaHtmlCarrito(miCarrito); //Crea el html para los productos que se encuentran en el carrito
    }
};

//Avisa que el carrito está vacío en el caso que se quiera acceder por las 3 vías de acceso existentes (Carrito del Menú, Totalizador del Carrito del menú (arriba-derecha) y el carrito flotante (abajo-derecha))
const alertaCarritoVacio = (miliSeg, ocultaModal) => {
    setTimeout(() => {
        (ocultaModal) && modalShowToggleCarrito();
        Swal.fire({
            confirmButtonColor: 'rgb(11, 168, 11)',
            title: 'Carrito de Compras vacío',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        })
    }, miliSeg);
};

//Limpia el html del carrito de compras
const limpiaHtmlCarrito = () => {
    const productosModalCarrito = document.querySelectorAll(".modal-productos");
    productosModalCarrito.forEach((div) => {
        div.remove();
    })
};

//HTML CARRITO. Crea el código html dinámico del carrito de compras
const agregaHtmlCarrito = (miCarrito) => {
    const miCarritoOrdenado = miCarrito.slice().sort(function (a, b) {
        return miCarrito.indexOf(b) - miCarrito.indexOf(a);
    });
    miCarritoOrdenado.forEach((el) => {
        const producto = document.createElement('div');
        let precioUnitFormateado = el.getPrecio().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }); //da formato al precio unitario
        let precioTotal = (el.getPrecio() * el.getCantidad());
        let precioTotalFormateado = precioTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }); //da formato al precio total
        const urlProducto = buscaURLProducto(el.codigo);
        producto.classList.add('modal-productos');
        producto.id = el.codigo;

        producto.innerHTML = ` 
                            <img class="modal-productos-img" src="${urlProducto.url}" alt="${el.getNombre()}"></img>
                            <span class="modal-productos-col1">${el.getNombre()}</span>
                            <span class="modal-productos-col2">${el.getCantidad()}</span>
                            <span class="modal-productos-col3">${precioUnitFormateado}</span>
                            <span class="modal-productos-col3">${precioTotalFormateado}</span>
                            <a class="modal-productos-eliminar" href="#">X</a>
                            </div>`

        modalContainer.insertBefore(producto, modalContainerTitulo.nextSibling);
        const eliminarProducto = document.querySelector(".modal-productos-eliminar");
        //evento "click" para eliminar un producto del carrito
        eliminarProducto.addEventListener("click", () => {
            confirmaEliminarProducto(miCarrito, el.codigo, el.nombre); user - login
        });

    });
};

const buscaURLProducto = ((codigoProducto) => {
    return totalProductos.find((item => item.codigo === codigoProducto));
});

//solicita la confirmación para eliminar un producto agregado al carrito
const confirmaEliminarProducto = (miCarrito, codigoProducto, nombreProducto) => {
    //Confirma la eliminación?
    const urlProducto = buscaURLProducto(codigoProducto);
    //en esta combiné 2 sweetalerts. 'A confirm dialog, with a function attached to the "Confirm"-button' + 'A custom positioned dialog'
    Swal.fire({
        title: `${nombreProducto} será eliminado! Confirma?`,
        imageUrl: urlProducto.url,
        imageWidth: 80,
        imageHeight: 120,
        showCancelButton: true,
        cancelButtonText: 'No',
        confirmButtonColor: 'rgb(11, 168, 11)',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, confirmo!'
    }).then((result) => {
        if (result.isConfirmed) {
            borraProducto(miCarrito, codigoProducto);
            let textoTitle = "El producto ha sido eliminado!";
            if (miCarrito.length === 0) textoTitle = "El carrito ha sido vaciado!";
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: textoTitle,
                showConfirmButton: false,
                timer: 1100
            })
        }
    })
};

//borra un producto del carrito
const borraProducto = (miCarrito, codigoProducto) => {
    //busco el indice correspondiente al objeto
    let index = miCarrito.findIndex((objeto) => {
        return objeto.codigo === codigoProducto;
    });
    //borro el objeto del array del carrito
    if (index !== -1) {
        miCarrito.splice(index, 1);
        seteaCarritoLS(miCarrito);
        const itemABorrar = document.getElementById(codigoProducto);
        itemABorrar.remove();
        if (miCarrito.length === 0) {
            setTimeout(() => {
                modalShowToggleCarrito();
            }, 1100);
        }
    }
};

//* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  *  F U N C I O N E S   D E L   I C O N O   D E   L O G I N   D E L   U S U A R I O   * * * * * * * * * * *  * * * * * * * * * * * * * * * * * * * * * * * * 
//Setea la clave "isLogin" del localStorage. Esta clave contiene el valor "true" si el usuario ya está logueado o "false" de lo contrario.
const setLogin = (opcion, nombreUsuario, emailUsuario) => {
    localStorage.setItem("Auth", JSON.stringify({ isLogin: opcion, nombre: nombreUsuario, email: emailUsuario }));
};

//Cambia el color del ícono login: orange cuando el usuario está logueado y white cuando no lo está.
const cambiaColorIconoLogin = (arg1,arg2) => {
    usuarioLogin.classList.add(arg1);
    usuarioLogin.classList.remove(arg2);
};

//* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  *  F U N C I O N E S   D E L   S E C T O R   F I L T R O S   P R O D U C T O S   * * * * * * * * * * *  * * * * * * * * * * * * * * * * * * * * * * * * 
//Filtrar productos
const filtrarProductos = () => {
    let filtroProductos = [];
    (tipoFiltro.value === "1")
        ? filtroProductos = totalProductos.filter((el) => (el.nombre.toLowerCase()).includes(textoABuscar.value.toLowerCase())) //busca por nombre del producto value = 1
        : filtroProductos = totalProductos.filter((el) => (el.categoria.toLowerCase()).includes(textoABuscar.value.toLowerCase())); //busca por categoría del producto value = 2
    return filtroProductos;
};

//Limpia filtro de búsqueda de productos
const limpiaFiltro = () => {
    tipoFiltro.value="1";
    textoABuscar.placeholder = "Producto...";
    textoABuscar.value="";
    textoAlternativo.innerHTML="";
};

//* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  *  F U N C I O N E S   C A R R I T O   D E   C O M P R A S   * * * * * * * * * * *  * * * * * * * * * * * * * * * * * * * * * * * * 
//Verifica si el usuario está logueado antes de proceder a agregar algún producto al carrito o acceder al carrito de compras
//Si no está logueado, solicita su correo y contraseña de acceso
const validaIngreso = () => {
    if (leeLogin().isLogin === false) {
        usuarioClave.value = '',usuarioEmail.value = ''; //limpia las cajas de email y clave
        errorLogin.classList.remove('errorLog--show');//limpia el texto de error login
        modalShowToggleLogin();
        return false;
    };
    return true;
};

//Agrega código html del formulario modal de la forma de apago
const agregaHtmlFPago = () => {
    completaEMail();
    const totalAPagar = document.querySelector(".importe-totalapagar");
    totalAPagar.textContent = totalFinalCarrito.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    //agrega la opción 'Seleccione una opción...' a la lista para obligar al usuario a seleccionar una forma de pago
    const opt = document.createElement('option');
    opt.disabled = true;
    opt.selected = true;
    opt.textContent = "Seleccione una opción...";
    selectFPago.appendChild(opt);
    bdFPago.forEach((op) => {
        let cantPago = "";
        let impCuota = (totalFinalCarrito + (totalFinalCarrito * op.tasa / 100)) / op.cuotas;
        impCuota = impCuota.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        (op.cuotas > 1) ? cantPago = "pagos" : cantPago = "pago";
        let textoFPago = ` ( ${op.cuotas} ${cantPago} de ${impCuota} )`;
        const opt = document.createElement('option');
        opt.value = op.codigo;
        opt.textContent = op.nombre + textoFPago;
        selectFPago.appendChild(opt)
    });
};

//Vacía el carrito de compras
const vaciaCarritoCompras = () => {
    Swal.fire({
        title: `El carrito será vaciado! Confirma?`,
        imageWidth: 80,
        imageHeight: 120,
        showCancelButton: true,
        cancelButtonText: 'No',
        confirmButtonColor: 'rgb(11, 168, 11)',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, confirmo!'
    }).then((result) => {
        if (result.isConfirmed) {
            miCarrito.forEach((el) => {
                const itemABorrar = document.getElementById(el.codigo);
                itemABorrar.remove(); //borra el contenido del html del carrito para cada elemento o producto
            });
            miCarrito.splice(0); //vacía el array
            seteaCarritoLS(miCarrito); //actualiza el localstorage
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'El carrito ha sido vaciado!',
                showConfirmButton: false,
                timer: 1100
            })
            setTimeout(() => {
                modalShowToggleCarrito();
            }, 1100); //espera 1,5 segundos para quitar el carrito vacío de la pantalla
        }
    })
};

//limpia html de forma de pago
const limpiaHtmlFPago = () => {
    while (selectFPago.firstChild) {
        selectFPago.removeChild(selectFPago.firstChild);
    }
};

//Asigna al campo E-Mail del formulario de pago el e-mail del usuario que se encuentra logueado
const completaEMail = () => {
    const email = document.querySelector("#email");
    email.value = leeLogin().email; //asigna al campo email el e-mail con el que el usuario se logueó
};

//* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  *  F U N C I O N E S   F O R M U L A R I O   D E   P A G O   * * * * * * * * * * *  * * * * * * * * * * * * * * * * * * * * * * * * 

//Valida la forma de pago
const validaFPago = (opcionSel, value) => {
    if (opcionSel === 0) return alertaDatosIngresados('Debe seleccionar una forma de pago.') && false;
    const buscar = bdFPago.find((el) => el.codigo === value);
    if (buscar) {
        const desFPago = document.querySelector("#descripcion-fpago");
        let cantPago = "";
        let totalPago = (totalFinalCarrito + (totalFinalCarrito * buscar.tasa / 100));
        let impCuota = totalPago / buscar.cuotas;
        impCuota = impCuota.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        totalPago = totalPago.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        (buscar.cuotas > 1) ? cantPago = "pagos" : cantPago = "pago";
        if (buscar.cuotas > 1) {
            desFPago.classList.add('descripcion-fpago-siv');
            desFPago.classList.remove('descripcion-fpago-nov');
            desFPago.textContent = `En ${buscar.cuotas} ${cantPago} de $${impCuota}. Total: $${totalPago}. Recargo ${buscar.tasa}%`;

        }
        else if (buscar.detalles !== "") {
            desFPago.classList.add('descripcion-fpago-siv');
            desFPago.classList.remove('descripcion-fpago-nov');
            desFPago.textContent = `Deberá transferir al CBU Nº ${buscar.detalles}`;
        }
        else {
            desFPago.classList.add('descripcion-fpago-nov');
            desFPago.classList.remove('descripcion-fpago-siv');
            desFPago.textContent = "";
        }
        cantCuota = buscar.cuotas;
        importeCuota = impCuota.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };
    return true;
};

/* Validaciones Datos Personales */
const validacionDatosPersonales = () => {
    const nombre = document.querySelector("#nombre");
    const apellido = document.querySelector("#apellido");
    const email = document.querySelector("#email");
    const domicilio = document.querySelector("#domicilio");
    const ciudad = document.querySelector("#ciudad");
    //Para revisar los datos ingresados se utiliza "Operador Ternario" + "Operador Lógico AND(&&) o de Cortocircuito", así se evita el uso de ELSE.
    //Nombre
    if (!nombre.value) return alertaDatosIngresados('Debe ingresar su nombre.') && false;
    if (!regexApellidoNombre.test(nombre.value)) return alertaDatosIngresados('El nombre ingresado no es válido.') && false;
    //Apellido
    if (!apellido.value) return alertaDatosIngresados('Debe ingresar su apellido.') && false;
    if (!regexApellidoNombre.test(apellido.value)) return alertaDatosIngresados('El apellido ingresado no es válido.') && false;
    //Email
    if (!email.value) return alertaDatosIngresados('Debe ingresar su e-mail.') && false;
    if (!regexEMail.test(email.value)) return alertaDatosIngresados('El correo ingresado no es válido') && false;
    //Domicilio
    if (!domicilio.value) return alertaDatosIngresados('Debe ingresar su domicilio.') && false;
    //Localidad
    if (!ciudad.value) return alertaDatosIngresados('Debe ingresar su ciudad.') && false;

    //si las revisiones/validaciones son correctas se retorna true;
    return true;
};

const alertaDatosIngresados = (texto) => {
    Swal.fire({
        text: texto,
        confirmButtonColor: 'red'
    });
};

//Se solicita al usuario que confirme la compra
const confirmaCompra = () => {
    let descri = "pago";
    (cantCuota > 1) ? descri = "pagos" : descri = "pago";
    Swal.fire({
        title: `Se va a efectuar la compra en ${cantCuota} ${descri} de ${importeCuota}.`,
        text: "Confirma?",
        html:
            '<span style="font-size: 1.5rem;"><b>Confirma?</b></span>',
        imageUrl: './img/compra.jpeg',
        imageWidth: 300,
        imageHeight: 250,
        imageAlt: 'Compra A Confirmar',
        showCancelButton: true,
        confirmButtonColor: 'rgb(168, 114, 13)',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Confirmo la compra!',
        cancelButtonText: 'No quiero realizar la compra!'
    }).then((result) => {
        if (result.isConfirmed) {
            //Si acepta la compra se llama a la función compraExitosa()
            Swal.fire({
                title: 'El Nº de Orden es ' +  compraExitosa(),
                imageUrl: './img/graciascompra.webp',
                imageWidth: 290,
                imageHeight: 270,
                imageAlt: 'Gracias por su Compra',
                confirmButtonColor: 'rgb(168, 114, 13)'
              })
            setTimeout(() => {
                modalShowToggleFinCompra();
            }, 1100);
        }
    })
};

const compraExitosa = () => {
    miCarrito.splice(0); // al confirmarse la compra se borra el array de miCarrito
    seteaCarritoLS(miCarrito); // y se actualiza el localstorage
    return Math.floor(Math.random() * 90000) + 10000; //genera un nro aleatorio de 5 dígitos para devolverlo como nro de orden de compra
};

//* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  *  F U N C I O N E S   D E L   F O R M U L A R I O   L O G I N   U S U A R I O   * * * * * * * * * * *  * * * * * * * * * * * * * * * * * * * * * * * * 
//Valida usuario y clave en el login
const validaUser = async () => {
    errorLogin.classList.add('errorLog--show');
    if(!usuarioEmail.value) {
        errorLogin.textContent="Debe ingresar un E-Mail !!";
        return
    }
    (usuarioEmail.value) && (errorLogin.textContent="Verificando E-Mail...");
    await fetch('https://fakestoreapi.com/users')
                .then(res=>res.json()) //en res se obtiene el paquete de datos de la api
                .then((json) => {
                    //con map obtengo los campos que necesito del array original y los paso al nuevo array. Si quiero cambiar el nombre a algún campo mirar la segunda parte del map. Por ej. el campo password en el array original pasa a llamarse clave en el nuevo array bdUsuarios
                    const bdUsuariosExt = json.map(({ email, password, name: {firstname} }) => ({ email, clave: password, nombre: firstname}));
                    const bdUsuariosTotal = [...bdUsuariosInt, ...bdUsuariosExt]; //se utiliza spread operator para concatenar a los array de los usuarios internos más los usuarios de la api. También se podría haber utilizado el método "concat"              
                    //busco si existe el email y clave en el nuevo array bdUsuariosExt obtenido de la API
                    const userExist = bdUsuariosTotal.find(el => ((el.email).toUpperCase() === (usuarioEmail.value).toUpperCase() && el.clave === usuarioClave.value));
                    if(userExist) {
                        errorLogin.classList.remove('errorLog--show');
                        bienvenidaUser(userExist.nombre, userExist.email, 0);
                    }
                    else {
                        errorLogin.classList.add('errorLog--show');
                        errorLogin.textContent="La combinación de E-Mail y clave no existen";
                    }
                }) 
                .catch(err=>errorLogin.classList.add('errorLog--show')) //si hay algún error y viene por el catch entonces gestiono el error con lo mismo del operador ternario del (userExist)
};

//Si el usuario existe en el array interno o en la api, se produce el ingreso
const bienvenidaUser = (nombreUsuario, emailUsuario, opc) => {
    let texto =(opc===0) ? `Hola ${nombreUsuario}, ingresaste a tu cuenta!!` : `Hola ${nombreUsuario}, tu cuenta ha sido creada. Accediendo...`;
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: texto,
        showConfirmButton: false,
        timer: 1100
    })
    setTimeout(() => {
        setLogin(true, nombreUsuario, emailUsuario); //graba Auth = { isLogin: true, nombre: "Juan", email: "juan@gmail.com"} en el localStorage
        modalShowToggleLogin(); //oculta el formulario modal del login
        (opc===1) && modalShowToggleNuevoUsuario(); //oculta el formulario modal del nuevo usuario
        (opc===1) && limpiaDatosNuevoUsuario(); //limpia los datos del modal nuevo usuario
        muestraNombreUsuario(nombreUsuario); //muestra el nombre de usuario a la derecha del ícono de login en la barra de navegación
        if(blnModalFinalizarCompra) {
            limpiaHtmlFPago(); //limpia el html de la forma de pago
            modalShowToggleFinCompra(); //muestra el modal de la finalización de la compra
            agregaHtmlFPago(); //agrega el html de la forma de pago
            blnModalFinalizarCompra=false;
        };
    }, 1100);
};

const limpiaDatosNuevoUsuario = () => {
    //Limpia las cajas de ingreso del formulario de creación del nuevo usuario
    nuevoUsuarioEmail.value = '';
    nuevoUsuarioNombre.value='';
    nuevoUsuarioClave.value = '';
    nuevoUsuarioReIngreseClave.value='';
};

//Muestra el nombre del usuario a la derecha del ícono login (barra de navegación arriba - izquierda)
const muestraNombreUsuario = (nombreUsuario) => {
    nombreUser.textContent = nombreUsuario;
    modalShowToggleCerrarSesion();
    cambiaColorIconoLogin('user-login-on','user-login-off');
};

//* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  *  F U N C I O N E S   D E L   F O R M U L A R I O   N U E V O   U S U A R I O   * * * * * * * * * * *  * * * * * * * * * * * * * * * * * * * * * * * * 
//Verifica si el correo electrónico del usuario a crear existe en la base de datos de usuarios (array + api)
const verificaExistenciaUsuario = async () => {
    errorNuevoUsuario.classList.add('errorLog-nuevoUsuario--show');
    if(!nuevoUsuarioEmail.value) {
        errorNuevoUsuario.textContent="Debe ingresar un E-Mail !!";
        return;
    }
    if (!regexEMail.test(nuevoUsuarioEmail.value)) {
        errorNuevoUsuario.textContent="El correo ingresado no es válido";
        return;
    }
    if(!nuevoUsuarioNombre.value) {
        errorNuevoUsuario.textContent="Debe ingresar un nombre !!";
        return;
    }
    if (!regexApellidoNombre.test(nuevoUsuarioNombre.value)) {
        errorNuevoUsuario.textContent="El nombre ingresado no es válido !!";
        return;
    }
    if(!nuevoUsuarioClave.value) {
        errorNuevoUsuario.textContent="Debe ingresar una clave !!";
        return;
    }
    if(nuevoUsuarioClave.value !== nuevoUsuarioReIngreseClave.value) {
        errorNuevoUsuario.textContent="Las claves ingresadas no coinciden !!";
        return;
    }
    (nuevoUsuarioEmail.value) && (errorNuevoUsuario.textContent="Verificando E-Mail...");
    await fetch('https://fakestoreapi.com/users')
    .then(res=>res.json()) //en res se obtiene el paquete de datos de la api
    .then((json) => {
        //con map obtengo los campos que necesito del array original y los paso al nuevo array. Si quiero cambiar el nombre a algún campo mirar la segunda parte del map. Por ej. el campo password en el array original pasa a llamarse clave en el nuevo array bdUsuarios
        const bdUsuariosExt = json.map(({ email, password, name: {firstname} }) => ({ email, clave: password, nombre: firstname}));
        const bdUsuariosTotal = [...bdUsuariosInt, ...bdUsuariosExt]; //se utiliza spread operator para concatenar a los array de los usuarios internos más los usuarios de la api. También se podría haber utilizado el método "concat"              
        //busco si el correo del nuevo usuario que se está creando ya existe en el nuevo array bdUsuariosExt obtenido de la API
        //en caso que exista hay que informar que ese correo ya se encuentra registrado y no permitir avanzar.
        const userExist = bdUsuariosTotal.find(el => ((el.email).toUpperCase() === (nuevoUsuarioEmail.value).toUpperCase()));
        if(userExist) {
            //Si el correo está en la base de datos, no permitir registrar nuevamente
            errorNuevoUsuario.classList.add('errorLog-nuevoUsuario--show');
            errorNuevoUsuario.textContent=`El E-Mail ${nuevoUsuarioEmail.value} ya se encuentra registrado.`;
            limpiaDatosNuevoUsuario();
            return;
        }
        else {
            //Si el correo no está en la base de datos, hay que agregarlo y permitir avanzar
            let nuevoUsuario = {email: nuevoUsuarioEmail.value, nombre: nuevoUsuarioNombre.value, clave:nuevoUsuarioClave.value };
            bdUsuariosInt.push(nuevoUsuario); //agrega el nuevo usuario a bdUsuariosInt (bd interna de usuarios)
            bienvenidaUser(nuevoUsuarioNombre.value, nuevoUsuarioEmail.value ,1); //bienvenida al usuario
            errorNuevoUsuario.classList.remove('errorLog-nuevoUsuario--show');
        }
    }) 
    .catch(err=>errorNuevoUsuario.classList.add('errorLog-nuevoUsuario--show')) //si hay algún error y viene por el catch entonces gestiono el error con lo mismo del operador ternario del (userExist)
};

//------------------------------------------------ C A R G A   T O D O S   L O S   E V E N T O S  ----------------------------------------------------
export const cargarEventos = () => {

//******************************* E V E N T O S   D E L   M E N U   N A V E G A C I O N  *********************************

    //evento "click" del link Productos de la barra de navegación
    linkProductos.addEventListener("click", () => {
        cargarProductos(totalProductos, "Productos encontrados : "); //se cargan todos los productos
        limpiaFiltro();
    });

    //evento "click" del link Ofertas de la barra de navegación
    linkOfertas.addEventListener("click", () => {
        const productosOferta = filtrarOfertas();
        cargarProductos(productosOferta,"Productos en Oferta : ");
        limpiaFiltro();
    });

    //evento "click" del carrito del menú (ubicado en el centro del menú de navegación). Para visualizar la totalidad del carrito de compras.
    carrito.addEventListener("click", (e) => {
        e.preventDefault();
        muestraCarritoCompras();
    });

    //evento "click" sobre los totales del carrito del menú (ubicado sobre la derecha del menú de navegación). Para visualizar la totalidad del carrito de compras.
    totalesCarrito.addEventListener("click", (e) => {
        e.preventDefault();
        muestraCarritoCompras();
    });

//********************************* E V E N T O S   D E L   I C O N O   D E L   U S U A R I O (IZQUIERDA MENU DE NAVEGACION) *********************************

    //evento "click" sobre ícono de la barra de navegación "user-login"
    usuarioLogin.addEventListener("click", (e) => {
        e.preventDefault();
        validaIngreso();
    });

    //evento "click" sobre la etiqueta 'Ingresar' del login
    nombreUser.addEventListener("click", (e) => {
        e.preventDefault();
        validaIngreso();
    });

    //evento "click" sobre cerrar sesión del usuario
    cerrarSesion.addEventListener("click", (e) => {
        e.preventDefault();
        setLogin(false, "",""); //actualiza la clave "Auth" del localStorage
        nombreUser.textContent = "Ingresar"; //borra el nombre del usuario logueado
        modalShowToggleCerrarSesion(); //oculta el cierre de sesión
        cambiaColorIconoLogin('user-login-off','user-login-on');
    });

//********************************* E V E N T O S   D E L   S E C T O R   F I L T R O S   P R O D U C T O S  *********************************

    //evento "click" del botón 'Buscar' producto
    buscarProducto.addEventListener("click", () => {
        const filtroProductos = filtrarProductos();
        cargarProductos(filtroProductos,"Productos encontrados : ");
    });

    //evento "Enter" de la caja de texto donde se ingresa el producto a buscar
    textoABuscar.addEventListener("keypress", (e) => {
        if (e.key === 'Enter') {
            const filtroProductos = filtrarProductos();
            cargarProductos(filtroProductos,"Productos encontrados : ");
        };
    });

    //evento "input" de la caja de texto donde se ingresa el producto a buscar
    textoABuscar.addEventListener("input", (e) => {
        const { value } = e.target; //desestructuración del objeto "e" para obtener el atributo value
        !value && cargarProductos(totalProductos,"Productos encontrados : "); //si "value" no tiene ningún valor entonces se cargan todos los productos de la "base de datos"
    });

    //evento "click" del dropdown tipo Filtro
    tipoFiltro.addEventListener("change", (e) => {
        const { value } = e.target;
        if (value === "1") {
            textoABuscar.value = "";
            textoABuscar.placeholder = "Producto...";
        }
        else {
            textoABuscar.value = "";
            const categoriasUnicas = totalProductos.reduce((categorias, producto) => {
                categorias.add(producto.categoria);
                return categorias;
            }, new Set());
            const descripcionCategorias = [...categoriasUnicas].join(', ');
            textoABuscar.placeholder = descripcionCategorias + " ...";
        }
    });

//********************************* E V E N T O S   D E L   C A R R I T O   F L O T A N T E *********************************

    //evento "click" del carrito fijo (abajo derecha). Para visualizar la totalidad del carrito de compras.
    carritoFijo.addEventListener("click", (e) => {
        e.preventDefault();
        muestraCarritoCompras();
    });

//********************************* E V E N T O S   D E L   C A R R I T O   D E   C O M P R A S *********************************

    //evento "click" sobre finalizar compra del carrito de compras
    finalizarCompra.addEventListener("click", (e) => {
        e.preventDefault();
        blnModalFinalizarCompra = true;
        if (validaIngreso()) {
            modalShowToggleCarrito(); //cierra el modal del carrito de compras
            setTimeout(() => {
                limpiaHtmlFPago();
                modalShowToggleFinCompra(); //muestra el modal de la finalización de la compra
                agregaHtmlFPago();
            }, 200);
        };

    });

    //evento "click" sobre vaciar carrito de compra
    vaciarCarrito.addEventListener("click", (e) => {
        e.preventDefault();
        vaciaCarritoCompras();
    });

    //evento "click" para cerrar el modal del carrito de compras. Cierra el carrito de compras.
    cerrarModal.addEventListener("click", (e) => {
        e.preventDefault();
        modalShowToggleCarrito();
    });

//*********************************  E V E N T O S   D E L   F O R M U L A R I O   D E   P A G O  *********************************

    //evento "click" para cerrar el modal del formulario de pago.
    cerrarFinCompra.addEventListener("click", (e) => {
        e.preventDefault();
        modalShowToggleFinCompra();
    });

    //evento "change" en el dropdown de las opciones de pago en el formulario de finalización de la compra
    selectFPago.addEventListener("change", (e) => {
        e.preventDefault();
        validaFPago(selectFPago.selectedIndex, selectFPago.value);
    });

    //evento "click" en el botón de finalizar compra. Verifica si el usuario está logueado, de lo contrario solicita que se loguee
    finalizarPago.addEventListener("click", (e) => {
        e.preventDefault();
        if (validacionDatosPersonales() && validaFPago(selectFPago.selectedIndex)) {
            confirmaCompra();
        }
    })

    //evento "click" para volver al carrito de compras desde el formulario de finalización de la compra
    volverAlCarrito.addEventListener("click", (e) => {
        e.preventDefault();
        modalShowToggleFinCompra();
        modalShowToggleCarrito();
    });

 //********************************* E V E N T O S   D E L   F O R M U L A R I O   L O G I N   D E L   U S U A R I O *********************************
   
    //evento "click" en usuarioEmail. Al hacer click en el email, borra el contenido del errorLogin
    usuarioEmail.addEventListener("click", () => {
        errorLogin.classList.remove('errorLog--show');
    });

    //evento "input" que al borrar el input clave borra el mensaje de error de login
    usuarioEmail.addEventListener("input", (e) => {
        const { value } = e.target; //desestructuración del objeto "e" para obtener el atributo value
        !value && errorLogin.classList.remove('errorLog--show');
    });
    //evento "input" que al borrar el input clave borra el mensaje de error de login
    usuarioClave.addEventListener("input", (e) => {
        const { value } = e.target; //desestructuración del objeto "e" para obtener el atributo value
        !value && errorLogin.classList.remove('errorLog--show');
    });

    //evento "Enter" de la caja "clave" del login
    usuarioClave.addEventListener("keypress", (e) => {
        if (e.key === 'Enter') {
            validaUser();
        };
    });

    //Botón de Inicio o Login
    buttonLogin.addEventListener("click", () => {
        validaUser();
    });

    //evento "click" sobre la etiqueta 'Crear una Cuenta' del formulario de login
    crearCuenta.addEventListener("click", (e) => {
        e.preventDefault();
        modalShowToggleNuevoUsuario();
    });

//********************************* E V E N T O S   D E L   F O R M U L A R I O   N U E V O   U S U A R I O  *********************************
    
    //evento "click" en nuevoUsuarioEmail. Al hacer click en el email, borra el contenido del errorLoginNuevoUsuario
    nuevoUsuarioEmail.addEventListener("click", () => {
        errorNuevoUsuario.classList.remove('errorLog-nuevoUsuario--show');
    });

    //evento "input" que al borrar el input email borra el mensaje de error de login
    nuevoUsuarioEmail.addEventListener("input", (e) => {
        const { value } = e.target; //desestructuración del objeto "e" para obtener el atributo value
        !value && errorNuevoUsuario.classList.remove('errorLog-nuevoUsuario--show');
    });

    //evento "click" en nuevoUsuarioNombre. Al hacer click en el nombre, borra el contenido del errorLoginNuevoUsuario
    nuevoUsuarioNombre.addEventListener("click", (e) => {
        const { value } = e.target; //desestructuración del objeto "e" para obtener el atributo value
        !value && errorNuevoUsuario.classList.remove('errorLog-nuevoUsuario--show');
    });

    //evento "input" que al borrar el input clave borra el mensaje de error de login
    nuevoUsuarioClave.addEventListener("input", (e) => {
        const { value } = e.target; //desestructuración del objeto "e" para obtener el atributo value
        !value && errorNuevoUsuario.classList.remove('errorLog-nuevoUsuario--show');
    });

    //evento "input" que al borrar el input clave borra el mensaje de error de login
    nuevoUsuarioReIngreseClave.addEventListener("input", (e) => {
        const { value } = e.target; //desestructuración del objeto "e" para obtener el atributo value
        !value && errorNuevoUsuario.classList.remove('errorLog-nuevoUsuario--show');
    });

    //evento "Enter" de la caja "re-ingrese clave" del nuevo usuario
    nuevoUsuarioReIngreseClave.addEventListener("keypress", (e) => {
        if (e.key === 'Enter') {
            verificaExistenciaUsuario();
        };
    });

    //evento "click" sobre botón Crear Nuevo Usuario
    buttonNuevoUsuario.addEventListener("click", (e) => {
        e.preventDefault();
        verificaExistenciaUsuario();
    });

//********************************* E V E N T O S   G L O B A L E S *********************************

    //evento "keydown" con key = "Escape" para poder cerrar los formularios modales que estén abiertos, presionando la tecla "ESC"
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            modal.classList.remove('modal--show');
            modalFinCompra.classList.remove('modal-fincompra--show');
            modalLogin.classList.remove('modal-login--show');
            modalNuevoUsuario.classList.remove('modal-nuevoUsuario--show');
        }
    });
//FIN DE LA CARGA DE EVENTOS ***************************************************************************************************
};
