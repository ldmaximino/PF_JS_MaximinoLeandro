/*
FORMAS DE PAGO
nombre   : se utiliza para mostrar el nombre en la lista desplegable de las formas de pago
cuotas   : se utiliza para hacer el cálculo y mostrar el precio por cada una de las cuotas
tasa     : se utiliza para calcular el interés y mostrar el importe final de cada cuota
detalles : algunos tipo de carteras (ej. cuentas bancarias) muestran el cbu al cual el cliente debe transferir si selecciona la opción.
           El CBU es mostrado en una etiqueta debajo de la lista desplegable donde se seleccionó la opción 'Transf Bancaria'.
*/
export const bdFPago = [
    {
        codigo: "E1",
        nombre: "Efectivo 1 pago",
        cuotas: 1,
        tasa:0,
        detalles: ""
    },
    {
        codigo: "B1",
        nombre: "Transf Bancaria",
        cuotas: 1,
        tasa: 0,
        detalles: "CBU 0720117888000038343945"
    },
    {
        codigo: "T1",
        nombre: "T.Crédito 1 pago",
        cuotas: 1,
        tasa: 0,
        detalles: ""
    }
    ,
    {
        codigo: "T2",
        nombre: "T.Crédito",
        cuotas: 3,
        tasa: 10,
        detalles: ""
    },
    {
        codigo: "T3",
        nombre: "T.Crédito",
        cuotas: 6,
        tasa: 20,
        detalles: ""
    },
    {
        codigo: "T4",
        nombre: "T.Crédito",
        cuotas: 12,
        tasa: 110,
        detalles: ""
    }
];