/*
    PRODUCTOS
        categoria: se utiliza para poder filtrar por categoría cuando el cliente lo requiera.
        oferta   : este campo es un arreglo con 2 datos.
                   El primer campo muestra el porcentaje de descuento correspondiente a la oferta. Ese porcentaje se utiliza para mostrarlo en una etiqueta en color y además para calcular el precio anterior a la oferta.
                   El segundo campo guarda el color que se va a utilizar para resaltar la etiqueta que muestra el porcentja de la oferta.                   
*/
export const bdProductos = [
    {
        codigo: "V01",
        nombre: "Omnium Malbec",
        categoria: "Vinos",
        precio: 814.00,
        url: "./img/V01.jpeg",
        oferta: []
    },
    {
        codigo: "V02",
        nombre: "La Poderosa Malbec",
        categoria: "Vinos",
        precio: 1439.00,
        url: "./img/V02.jpeg",
        oferta: [20, "#18d607"]
    },
    {
        codigo: "V03",
        nombre: "Terra Malbec",
        categoria: "Vinos",
        precio: 1228.2,
        url: "./img/V03.jpeg",
        oferta: []
    },
    {
        codigo: "V04",
        nombre: "Finca Magnolia Cabernet Sauvignon",
        categoria: "Vinos",
        precio: 1208.00,
        url: "./img/V04.jpeg",
        oferta: [15,"#ebd618"]
    },
    {
        codigo: "V05",
        nombre: "Colomé Torrontés",
        categoria: "Vinos",
        precio: 2640.30,
        url: "./img/V05.jpeg",
        oferta: []
    },
    {
        codigo: "V06",
        nombre: "Prófugo Especias Cabernet Sauvignon",
        categoria: "Vinos",
        precio: 852.00,
        url: "./img/V06.jpeg",
        oferta: []
    },
    {
        codigo: "V07",
        nombre: "Los Helechos Chardonnay",
        categoria: "Vinos",
        precio: 4656.50,
        url: "./img/V07.jpeg",
        oferta: [15,"#ebd618"]
    },
    {
        codigo: "V08",
        nombre: "Lagarde Malbec",
        categoria: "Vinos",
        precio: 2310.00,
        url: "./img/V08.jpeg",
        oferta: [20, "#18d607"]
    },
    {
        codigo: "V09",
        nombre: "Amalaya Blanco Blend",
        categoria: "Vinos",
        precio: 1320.00,
        url: "./img/V09.jpeg",
        oferta: [30,"#f7064e"]
    },
    {
        codigo: "V10",
        nombre: "Alta Vista Estate Premium Malbec",
        categoria: "Vinos",
        precio: 2310.00,
        url: "./img/V10.jpeg",
        oferta: [20, "#18d607"]
    },
    {
        codigo: "V11",
        nombre: "Escorihuela Gascón Malbec Cabernet",
        categoria: "Vinos",
        precio: 2574.00,
        url: "./img/V11.jpeg",
        oferta: []
    },
    {
        codigo: "V12",
        nombre: "Trapiche Alaris Malbec",
        categoria: "Vinos",
        precio: 1126.00,
        url: "./img/V12.jpeg",
        oferta: []
    },
    {
        codigo: "V13",
        nombre: "Laureano Gomez Terroir Malbec",
        categoria: "Vinos",
        precio: 2904.00,
        url: "./img/V13.jpeg",
        oferta: []
    },
    {
        codigo: "V14",
        nombre: "Intimo Cabernet Merlot Malbec",
        categoria: "Vinos",
        precio: 1743.00,
        url: "./img/V14.jpeg",
        oferta: []
    },
    {
        codigo: "V15",
        nombre: "Famiglia Bianchi Red Blend",
        categoria: "Vinos",
        precio: 1648.00,
        url: "./img/V15.jpeg",
        oferta: [15,"#ebd618"]
    },
    {
        codigo: "V16",
        nombre: "Tucumen Reserva Malbec",
        categoria: "Vinos",
        precio: 1683.00,
        url: "./img/V16.jpeg",
        oferta: []
    },
    {
        codigo: "E01",
        nombre: "Alta Vista Brut Nature",
        categoria: "Espumantes",
        precio: 2380.00,
        url: "./img/E01.jpeg",
        oferta: []
    },
    {
        codigo: "E02",
        nombre: "Navarro Correas Dolores Extra Brut",
        categoria: "Espumantes",
        precio: 1802.00,
        url: "./img/E02.jpeg",
        oferta: [20,"#18d607"]
    },
    {
        codigo: "E03",
        nombre: "Navarro Correas Extra Brut",
        categoria: "Espumantes",
        precio: 2400.20,
        url: "./img/E03.jpeg",
        oferta: []
    },
    {
        codigo: "E04",
        nombre: "Nieto Senetiner Extra Brut",
        categoria: "Espumantes",
        precio: 3220.00,
        url: "./img/E04.jpeg",
        oferta: [30,"#f7064e"]
    },
    {
        codigo: "E05",
        nombre: "Vive Sweet Sparkling",
        categoria: "Espumantes",
        precio: 1978.30,
        url: "./img/E05.jpeg",
        oferta: [15,"#ebd618"]
    },
    {
        codigo: "E06",
        nombre: "Domaine Bousquet Brut Rosé",
        categoria: "Espumantes",
        precio: 3376.00,
        url: "./img/E06.jpeg",
        oferta: []
    },
    {
        codigo: "E07",
        nombre: "Alamos Extra Brut",
        categoria: "Espumantes",
        precio: 2660.50,
        url: "./img/E07.jpeg",
        oferta: [30,"#f7064e"]
    },
    {
        codigo: "E08",
        nombre: "Cruzat Premier Rosé Extra Brut",
        categoria: "Espumantes",
        precio: 3600.00,
        url: "./img/E08.jpeg",
        oferta: []
    },
    {
        codigo: "E09",
        nombre: "Deseado Dulce Natural",
        categoria: "Espumantes",
        precio: 2850.00,
        url: "./img/E09.jpeg",
        oferta: []
    },
    {
        codigo: "E10",
        nombre: "Mumm Léger",
        categoria: "Espumantes",
        precio: 2285.00,
        url: "./img/E10.jpeg",
        oferta: [20, "#18d607"]
    },
    {
        codigo: "E11",
        nombre: "Alma Negra Brut Nature Rosé",
        categoria: "Espumantes",
        precio: 7000.00,
        url: "./img/E11.jpeg",
        oferta: []
    },
    {
        codigo: "E12",
        nombre: "Cruzat Millésime",
        categoria: "Espumantes",
        precio: 12720.00,
        url: "./img/E12.jpeg",
        oferta: []
    },
    {
        codigo: "W01",
        nombre: "Old Parr De Luxe Whisky 750 ml",
        categoria: "Whisky",
        precio: 10470.00,
        url: "./img/W01.jpeg",
        oferta: [30,"#f7064e"]
    },
    {
        codigo: "W02",
        nombre: "The Singleton 15 Años Whisky 700 ml",
        categoria: "Whisky",
        precio: 31830.00,
        url: "./img/W02.jpeg",
        oferta: []
    },
    {
        codigo: "W03",
        nombre: "Glen Elgin 12 Años Whisky 750 ml",
        categoria: "Whisky",
        precio: 35487.00,
        url: "./img/W03.jpeg",
        oferta: []
    },
    {
        codigo: "W04",
        nombre: "Jack Daniels Whisky 750 ml",
        categoria: "Whisky",
        precio: 15638.00,
        url: "./img/W04.jpeg",
        oferta: [20, "#18d607"]
    },
    {
        codigo: "W05",
        nombre: "White Horse Whisky 750 ml",
        categoria: "Whisky",
        precio: 3675.00,
        url: "./img/W05.jpeg",
        oferta: []
    },
    {
        codigo: "W06",
        nombre: "Buchanans DeLuxe 12 Años Whisky 750 ml",
        categoria: "Whisky",
        precio: 15381.00,
        url: "./img/W06.jpeg",
        oferta: [15,"#ebd618"]
    },
    {
        codigo: "W07",
        nombre: "Glenmorangie Whisky 700 ml",
        categoria: "Whisky",
        precio: 31650.00,
        url: "./img/W07.jpeg",
        oferta: []
    },
    {
        codigo: "W08",
        nombre: "The Macallan Sherry Oak 12 Años Whisky 750 ml",
        categoria: "Whisky",
        precio: 101320.00,
        url: "./img/W08.jpeg",
        oferta: []
    },
    {
        codigo: "W09",
        nombre: "Johnnie Walker Swing Whisky 750 ml",
        categoria: "Whisky",
        precio: 30369.00,
        url: "./img/W09.jpeg",
        oferta: []
    },
    {
        codigo: "W10",
        nombre: "Jim Beam White Whisky 750 ml",
        categoria: "Whisky",
        precio: 10064.00,
        url: "./img/W10.jpeg",
        oferta: [30,"#f7064e"]
    },
    {
        codigo: "W11",
        nombre: "Cardhu 12 Años Whisky 700 ml",
        categoria: "Whisky",
        precio: 50703.00,
        url: "./img/W11.jpeg",
        oferta: [20,"#52e122"]
    },
    {
        codigo: "W12",
        nombre: "Ardbeg Whisky 700 ml",
        categoria: "Whisky",
        precio: 46063.00,
        url: "./img/W12.jpeg",
        oferta: []
    },
    {
        codigo: "C01",
        nombre: "Clausthaler Cerveza sin alcohol 330 ml",
        categoria: "Cervezas",
        precio: 941.00,
        url: "./img/C01.jpeg",
        oferta: [30,"#f7064e"]
    },
    {
        codigo: "C02",
        nombre: "Quilmes Cerveza sin alcohol Lata 473 ml",
        categoria: "Cervezas",
        precio: 470.00,
        url: "./img/C02.jpeg",
        oferta: []
    },
    {
        codigo: "C03",
        nombre: "Patagonia Amber Lager Cerveza Lata 410 ml",
        categoria: "Cervezas",
        precio: 607.00,
        url: "./img/C03.jpeg",
        oferta: [20,"#52e122"]
    },
    {
        codigo: "C04",
        nombre: "Beagle Cream Stout Cerveza 330 ml",
        categoria: "Cervezas",
        precio: 720.00,
        url: "./img/C04.jpeg",
        oferta: []
    },
    {
        codigo: "C05",
        nombre: "Schofferhofer Cerveza Lata 500 ml",
        categoria: "Cervezas",
        precio: 1232.00,
        url: "./img/C05.jpeg",
        oferta: []
    },
    {
        codigo: "C06",
        nombre: "Estrella Damm Cerveza Lata 500 ml",
        categoria: "Cervezas",
        precio: 933.00,
        url: "./img/C06.jpeg",
        oferta: []
    },
    {
        codigo: "C07",
        nombre: "Kaiserdom Kellerbier Cerveza Lata 1000 ml",
        categoria: "Cervezas",
        precio: 2896.00,
        url: "./img/C07.jpeg",
        oferta: [30,"#f7064e"]
    },
    {
        codigo: "C08",
        nombre: "Kunstmann Session IPA Cerveza Lata 470 ml",
        categoria: "Cervezas",
        precio: 924.00,
        url: "./img/C08.jpeg",
        oferta: []
    },
    {
        codigo: "C09",
        nombre: "Dab Cerveza Lata 500 ml",
        categoria: "Cervezas",
        precio: 1232.00,
        url: "./img/C09.jpeg",
        oferta: [15,"#ebd618"]
    },
    {
        codigo: "C10",
        nombre: "Gift Pack Estrella Damm x4 Cervezas 330 ml + 1 Vaso",
        categoria: "Cervezas",
        precio: 10170.00,
        url: "./img/C10.jpeg",
        oferta: []
    },
    {
        codigo: "C1",
        nombre: "Brew House Jack Herer Hemp NEIPA Cerveza Lata 473 ml",
        categoria: "Cervezas",
        precio: 2420.00,
        url: "./img/C11.jpeg",
        oferta: []
    },
    {
        codigo: "C12",
        nombre: "Cusqueña Dorada Cerveza 330 ml",
        categoria: "Cervezas",
        precio: 1212.00,
        url: "./img/C12.jpeg",
        oferta: [20, "#18d607"]
    }
];