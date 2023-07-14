/*      VINOTECA
        PREENTREGA 3
        FECHA ENTREGA: MIERCOLES 10/07/2023 23:59HS.
        MAXIMINO LEANDRO DANIEL
*/
//Importar
import { cargaCarritoLS , cargarProductos , cargarEventos , totalProductos } from "./clases_funciones.js";

/* Ejecutar */
cargaCarritoLS(); //se lee el localstorage con la clave 'micarrito'
cargarEventos(); //se cargan los eventos
cargarProductos(totalProductos); //se cargan los productos
