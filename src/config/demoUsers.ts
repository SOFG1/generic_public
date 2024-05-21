import { IGTrends } from "../store/opponents"
import { IPdfReportData } from "../store/sentimentor"
import { addZeroForward } from "../utils"



export const demoUsers = [
    "Stoic_Demo_User"
]





//Highlights Map data
export const demoMapPointsStats = [
    {
        "city": "Colonia Kino",
        "lat": "32.40472307692308",
        "lng": "-116.8058846153846",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Los Altos (Ruíz Valencia)",
        "lat": "32.4538",
        "lng": "-116.9963",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Colinas del Florido",
        "lat": "32.49058888888889",
        "lng": "-116.78061111111111",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Jardines del Lago",
        "lat": "32.4222",
        "lng": "-117.0664",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia INFONAVIT La Mesa",
        "lat": "32.32389090909091",
        "lng": "-116.8769",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia El Triunfo",
        "lat": "32.40616666666667",
        "lng": "-116.75873333333334",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia La Morita 2a Sección",
        "lat": "32.05833333333333",
        "lng": "-116.678175",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Condesa",
        "lat": "32.48574166666666",
        "lng": "-116.88399166666666",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia De los Maestros",
        "lat": "32.48574166666666",
        "lng": "-116.88399166666666",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Lomas del Pacifico",
        "lat": "32.4345",
        "lng": "-116.9469",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Zona industrial Valle Bonito",
        "lat": "32.4256",
        "lng": "-116.8831",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Otay Galerías",
        "lat": "32.468",
        "lng": "-116.8041",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Los Venados",
        "lat": "32.4194",
        "lng": "-116.92279999999998",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Plazas",
        "lat": "32.4089",
        "lng": "-116.9436",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Insurgentes",
        "lat": "32.5482",
        "lng": "-116.7397",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia La Joya",
        "lat": "32.44844615384615",
        "lng": "-116.87156923076924",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Quinta Versalles",
        "lat": "32.4306",
        "lng": "-117.025",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Javier Rojo Gómez",
        "lat": "32.4939",
        "lng": "-116.8222",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Valle del Rubí Sección Terrazas",
        "lat": "32.3557",
        "lng": "-116.8121",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Anexa Magisterial",
        "lat": "32.5482",
        "lng": "-116.7397",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Valle Dorado",
        "lat": "32.433260000000004",
        "lng": "-116.87776999999998",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Calete",
        "lat": "32.362",
        "lng": "-116.9505",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Los Naranjos",
        "lat": "32.43026666666666",
        "lng": "-116.90063333333332",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Puente La Joya",
        "lat": "32.5651",
        "lng": "-116.5175",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Lomas de Matamoros",
        "lat": "32.47053636363636",
        "lng": "-116.8684",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Plan de Barranquitas",
        "lat": "32.496766666666666",
        "lng": "-116.79406666666668",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Hacienda del Mar",
        "lat": "32.4193",
        "lng": "-116.99101428571429",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Cañón Azteca",
        "lat": "32.4724",
        "lng": "-116.9359",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia La Pechuga",
        "lat": "32.3362",
        "lng": "-116.7472",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Camino Real",
        "lat": "32.40154444444445",
        "lng": "-116.83006666666668",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Hipódromo",
        "lat": "32.50418888888888",
        "lng": "-116.99482222222224",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia La Jolla",
        "lat": "32.4462",
        "lng": "-117.001",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Emiliano Zapata",
        "lat": "32.433260000000004",
        "lng": "-116.87776999999998",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Colinas del Sol",
        "lat": "32.4647",
        "lng": "-117.0425",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Zona industrial Industrial Pacífico III",
        "lat": "32.46521",
        "lng": "-116.87767",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Unidad habitacional INFONAVIT Loma II",
        "lat": "32.46782",
        "lng": "-116.79802",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Azcona",
        "lat": "32.450525",
        "lng": "-116.721025",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Rinconada de Otay",
        "lat": "32.4089",
        "lng": "-116.9436",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Colinas de la Presa",
        "lat": "32.43026666666666",
        "lng": "-116.90063333333332",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Quintas Campestre El Refugio",
        "lat": "32.4732",
        "lng": "-116.8046",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Ojo de Agua (El Florido)",
        "lat": "32.49058888888889",
        "lng": "-116.78061111111111",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Lagunitas 3a Sección",
        "lat": "32.44055",
        "lng": "-116.84985",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Electricistas",
        "lat": "32.313233333333336",
        "lng": "-116.70433333333332",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Terrazas del Sol",
        "lat": "32.4679",
        "lng": "-117.0877",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Jalisco",
        "lat": "32.513459999999995",
        "lng": "-116.7722",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Contreras Oeste",
        "lat": "32.313233333333336",
        "lng": "-116.70433333333332",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Equipamiento Colegio Ibero Tijuana",
        "lat": "32.4386",
        "lng": "-116.9661",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Reacomodo Obras Publicas",
        "lat": "32.4252",
        "lng": "-117.0099",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Loma Encantada",
        "lat": "32.43455",
        "lng": "-116.9743",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Meseta del Chema",
        "lat": "32.405",
        "lng": "-116.79970000000002",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Unidad habitacional Otay Universidad",
        "lat": "32.22461428571428",
        "lng": "-116.53342857142856",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Loma Bonita (NA)",
        "lat": "32.4252",
        "lng": "-117.0099",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Pórticos del Lago",
        "lat": "32.41961428571428",
        "lng": "-117.03117142857144",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa del Real II",
        "lat": "32.36484074074074",
        "lng": "-116.74276296296296",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia La Ilusión",
        "lat": "32.3915",
        "lng": "-116.9576",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Río Tijuana 2a. Etapa",
        "lat": "32.32389090909091",
        "lng": "-116.8769",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Misiones del Pedregal",
        "lat": "32.35883333333333",
        "lng": "-116.7714",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Defensores de Baja California",
        "lat": "32.5333",
        "lng": "-116.7333",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Bugambilias (Jacarandas)",
        "lat": "32.4222",
        "lng": "-117.0664",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Colinas de La Mesa",
        "lat": "32.431574999999995",
        "lng": "-116.904675",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Gerónimo Meza",
        "lat": "32.313233333333336",
        "lng": "-116.70433333333332",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa Fontana IV",
        "lat": "32.47053636363636",
        "lng": "-116.8684",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Las Huertas 4a Sección",
        "lat": "32.505406666666666",
        "lng": "-116.76182",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Lomas de San Martín",
        "lat": "32.46521",
        "lng": "-116.87767",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Lomas Las Huertas",
        "lat": "32.505406666666666",
        "lng": "-116.76182",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Margarita Residencial",
        "lat": "32.5007",
        "lng": "-116.8071",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Luna Park",
        "lat": "32.431014285714284",
        "lng": "-116.90294285714286",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Privada Hacienda Córdoba",
        "lat": "32.405",
        "lng": "-116.7997",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Privada Catalana",
        "lat": "32.48452857142858",
        "lng": "-116.96044285714288",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Santa Elena",
        "lat": "32.32389090909091",
        "lng": "-116.8769",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa Fontana IX",
        "lat": "32.36484074074074",
        "lng": "-116.74276296296296",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Urías",
        "lat": "32.513459999999995",
        "lng": "-116.7722",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Alfa Panamericano",
        "lat": "32.466",
        "lng": "-116.6881",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia López Oeste",
        "lat": "32.483293333333336",
        "lng": "-116.81761333333334",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Baja California",
        "lat": "32.431014285714284",
        "lng": "-116.90294285714286",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Costa Coronado Residencial",
        "lat": "32.4585",
        "lng": "-117.0176",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento La Perla Bahía",
        "lat": "32.4475875",
        "lng": "-116.9742375",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Lomas Hipódromo",
        "lat": "32.421842857142856",
        "lng": "-116.88708571428572",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Zermeño (Mérida)",
        "lat": "32.42765",
        "lng": "-116.89255",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Los Saucillos",
        "lat": "32.405",
        "lng": "-116.79970000000002",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Puerta Plata",
        "lat": "32.3915",
        "lng": "-116.9576",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Real de San Francisco",
        "lat": "32.405",
        "lng": "-116.7997",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Unidad habitacional Estadio Potros",
        "lat": "32.40472307692308",
        "lng": "-116.8058846153846",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Industrial Morelos",
        "lat": "32.466",
        "lng": "-116.6881",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Residencial Agua Caliente",
        "lat": "32.4317",
        "lng": "-116.85684",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Escolar Agua Caliente",
        "lat": "32.496766666666666",
        "lng": "-116.79406666666668",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Unidad habitacional Militar",
        "lat": "32.350744444444445",
        "lng": "-116.8455",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia El Pedregal",
        "lat": "32.490966666666665",
        "lng": "-116.6942",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Alfonso Garzón",
        "lat": "32.5333",
        "lng": "-116.7333",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Balcón Las Huertas",
        "lat": "32.513459999999995",
        "lng": "-116.7722",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Rincón Toscano",
        "lat": "32.47284285714286",
        "lng": "-117.00107142857144",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa Fontana III",
        "lat": "32.36484074074074",
        "lng": "-116.74276296296296",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Cañadas del Florido",
        "lat": "32.05833333333333",
        "lng": "-116.678175",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Tres M (Pérez)",
        "lat": "32.5075",
        "lng": "-116.79189999999998",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Nido de las Águilas",
        "lat": "32.5482",
        "lng": "-116.7397",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Lomas de Agua Caliente 5a Sección",
        "lat": "32.4248",
        "lng": "-116.89830000000002",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia La Cuestecita",
        "lat": "32.4306",
        "lng": "-117.025",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Las Torres",
        "lat": "32.5482",
        "lng": "-116.7397",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia El Chicote",
        "lat": "32.4252",
        "lng": "-116.9955",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia El Cortez",
        "lat": "32.42098",
        "lng": "-116.97188",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Roberto Yahuaca",
        "lat": "32.4041",
        "lng": "-116.8198",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Residencial Los Abedules",
        "lat": "32.2572",
        "lng": "-116.746",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Valparaíso Residencial",
        "lat": "32.43455",
        "lng": "-116.9743",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Valle del Pedregal",
        "lat": "32.40490714285714",
        "lng": "-116.79287857142856",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Terrazas de San Angel",
        "lat": "32.42258",
        "lng": "-117.09744",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Condominio Real de La Frontera",
        "lat": "32.5254",
        "lng": "-116.9178",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Gerónimo Meza Este",
        "lat": "32.313233333333336",
        "lng": "-116.70433333333332",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia El Niño",
        "lat": "32.5075",
        "lng": "-116.79189999999998",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento FOVISSSTE Los Volcanes",
        "lat": "32.483293333333336",
        "lng": "-116.81761333333334",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Villa Mar",
        "lat": "32.4585",
        "lng": "-117.0176",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Simón Bolívar",
        "lat": "32.40490714285714",
        "lng": "-116.79287857142856",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Monte Bello",
        "lat": "32.40154444444445",
        "lng": "-116.83006666666668",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia El Progreso",
        "lat": "32.4193",
        "lng": "-116.88335",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Rancho las Flores 2a Sección",
        "lat": "32.5187",
        "lng": "-117.0874",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Terrazas del Valle 2a Sección",
        "lat": "32.5075",
        "lng": "-116.79189999999998",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Laderas de Otay",
        "lat": "32.22461428571428",
        "lng": "-116.53342857142856",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Mirador Capistrano",
        "lat": "32.40472307692308",
        "lng": "-116.8058846153846",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Alcalá",
        "lat": "32.313233333333336",
        "lng": "-116.70433333333332",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Kennedy",
        "lat": "32.5333",
        "lng": "-116.7333",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Genaro Vázquez Sección Tres",
        "lat": "32.43449999999999",
        "lng": "-116.9582888888889",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Vista Alamar",
        "lat": "32.46782",
        "lng": "-116.79802",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia El Peñón",
        "lat": "32.329181818181816",
        "lng": "-116.68644545454544",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Arboledas",
        "lat": "32.42765",
        "lng": "-116.89255",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Alicia Carrillo",
        "lat": "32.313233333333336",
        "lng": "-116.70433333333332",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Las Fuentes",
        "lat": "32.505406666666666",
        "lng": "-116.76182",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia La Remosa",
        "lat": "32.421842857142856",
        "lng": "-116.88708571428572",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Playa Diamante",
        "lat": "32.44551666666667",
        "lng": "-116.96688333333334",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Lomas del Valle",
        "lat": "32.5075",
        "lng": "-116.79189999999998",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Ampliación Guaycura",
        "lat": "32.41961428571428",
        "lng": "-117.03117142857144",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia El Pípila",
        "lat": "32.47053636363636",
        "lng": "-116.8684",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Anexa 20 de Noviembre",
        "lat": "32.4424",
        "lng": "-116.7405",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Arboledas de La Mesa",
        "lat": "32.42765",
        "lng": "-116.89255",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Del Río",
        "lat": "32.5333",
        "lng": "-116.7333",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Lomas del Refugio",
        "lat": "32.49058888888889",
        "lng": "-116.78061111111111",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Libramiento (Zona AO)",
        "lat": "32.405",
        "lng": "-116.79970000000002",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia El Prado Este",
        "lat": "32.483293333333336",
        "lng": "-116.81761333333334",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Patrimonio Alamar",
        "lat": "32.44583333333333",
        "lng": "-116.7912",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Otay Diamantes",
        "lat": "32.468",
        "lng": "-116.8041",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa Residencial del Bosque",
        "lat": "32.329181818181816",
        "lng": "-116.68644545454544",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Hábitat Piedras Blancas",
        "lat": "32.4256",
        "lng": "-116.8831",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Anexa Niños Héroes",
        "lat": "32.42098",
        "lng": "-116.97188",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Residencial La Esmeralda",
        "lat": "32.48574166666666",
        "lng": "-116.88399166666666",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento La Esperanza [Granjas Familiares]",
        "lat": "32.4589",
        "lng": "-117.10765",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Vista Hermosa",
        "lat": "32.4222",
        "lng": "-117.0664",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Las Brisas Norte",
        "lat": "32.44844615384615",
        "lng": "-116.87156923076924",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Valle Vista 2a Sección",
        "lat": "32.506625",
        "lng": "-116.690575",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Unidad habitacional Capistrano INFONAVIT",
        "lat": "32.40472307692308",
        "lng": "-116.8058846153846",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento La Muralla",
        "lat": "32.44438571428571",
        "lng": "-116.82194285714286",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Natura Sección Vistas del Sol",
        "lat": "32.3915",
        "lng": "-116.9576",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Jardines del Rubí",
        "lat": "32.3557",
        "lng": "-116.8121",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Herradura Sur",
        "lat": "32.4248",
        "lng": "-116.8983",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Pórticos de Tijuana",
        "lat": "32.419415384615384",
        "lng": "-117.02846153846154",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Ribera del Bosque",
        "lat": "32.329181818181816",
        "lng": "-116.68644545454544",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Cumbres del Sol",
        "lat": "32.371833333333335",
        "lng": "-116.81466666666668",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Guadalajara (La Mesa)",
        "lat": "32.44844615384615",
        "lng": "-116.87156923076924",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento El Florido Sección Colinas",
        "lat": "32.49058888888889",
        "lng": "-116.78061111111111",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Neidhart",
        "lat": "32.50418888888888",
        "lng": "-116.99482222222224",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Anexa Roma",
        "lat": "32.4345",
        "lng": "-116.9469",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Zona militar 28 Batallón de Infantería",
        "lat": "32.350744444444445",
        "lng": "-116.8455",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Terrazas de La Presa",
        "lat": "32.4516",
        "lng": "-116.9109",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia El Mirador",
        "lat": "32.4742",
        "lng": "-116.8065142857143",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Ley del Servicio Civil",
        "lat": "32.42258",
        "lng": "-117.09744",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Colinas de la Presa Sección Montebello",
        "lat": "32.43026666666666",
        "lng": "-116.90063333333332",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Otay Vista",
        "lat": "32.46782",
        "lng": "-116.79802",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Anexa Santa Fe",
        "lat": "32.505406666666666",
        "lng": "-116.76182",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Anexa Del Río",
        "lat": "32.5333",
        "lng": "-116.7333",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Jardines de La Gloria",
        "lat": "32.4462",
        "lng": "-117.001",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento El Rincón",
        "lat": "32.40490714285714",
        "lng": "-116.79287857142856",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Santa Fe",
        "lat": "32.49058888888889",
        "lng": "-116.78061111111111",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Lomas Doctores (Chapultepec Doctores)",
        "lat": "32.333975",
        "lng": "-116.8985",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento INFONAVIT Lomas del Porvenir",
        "lat": "32.441375",
        "lng": "-116.952175",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa del Real VIII",
        "lat": "32.36484074074074",
        "lng": "-116.74276296296296",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Salvatierra",
        "lat": "32.3",
        "lng": "-116.91670000000002",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Mariano Matamoros (Centro)",
        "lat": "32.405",
        "lng": "-116.7997",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Los Venados Oeste",
        "lat": "32.4194",
        "lng": "-116.92279999999998",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Unión",
        "lat": "32.43723333333333",
        "lng": "-116.93746666666668",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Murua Poniente",
        "lat": "32.506625",
        "lng": "-116.690575",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Las Plazas",
        "lat": "32.48574166666666",
        "lng": "-116.88399166666666",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Cuauhtémoc",
        "lat": "32.496766666666666",
        "lng": "-116.79406666666668",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Zona industrial El Florido I",
        "lat": "32.2572",
        "lng": "-116.746",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Buenos Aires Sur",
        "lat": "32.3617",
        "lng": "-116.7366",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Otay Constituyentes",
        "lat": "32.4089",
        "lng": "-116.9436",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Parajes del Valle",
        "lat": "32.5007",
        "lng": "-116.8071",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Zona industrial Valle del Sur 1",
        "lat": "32.3557",
        "lng": "-116.8121",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Plaza Otay",
        "lat": "32.46782",
        "lng": "-116.79802",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Lomas Tijuana",
        "lat": "32.441375",
        "lng": "-116.952175",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia El Florido III",
        "lat": "32.405",
        "lng": "-116.7997",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Pedregal del Matamoros",
        "lat": "32.3617",
        "lng": "-116.7366",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Contreras",
        "lat": "32.313233333333336",
        "lng": "-116.70433333333332",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Dávila",
        "lat": "32.362",
        "lng": "-116.9505",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Agua Caliente Sección Pinos",
        "lat": "32.496766666666666",
        "lng": "-116.79406666666668",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Artesanal",
        "lat": "32.42098",
        "lng": "-116.97188",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento San Quintín",
        "lat": "32.46521",
        "lng": "-116.87767",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Chapultepec 9a Sección",
        "lat": "32.50418888888888",
        "lng": "-116.99482222222224",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia La Esperanza",
        "lat": "32.37",
        "lng": "-116.6345",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa del Prado",
        "lat": "32.433260000000004",
        "lng": "-116.87776999999998",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Vista Dorada",
        "lat": "32.4248",
        "lng": "-116.89830000000002",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia José Sandoval",
        "lat": "32.483293333333336",
        "lng": "-116.81761333333334",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Vista del Valle",
        "lat": "32.5075",
        "lng": "-116.79189999999998",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Baja Malibú (Sección Lomas)",
        "lat": "32.4193",
        "lng": "-116.99101428571429",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Patrimonio Familiar",
        "lat": "32.350744444444445",
        "lng": "-116.8455",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Colinas del Alamar (Torres del Lago)",
        "lat": "32.4222",
        "lng": "-117.0664",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Angélica",
        "lat": "32.313233333333336",
        "lng": "-116.70433333333332",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa del Real III",
        "lat": "32.36484074074074",
        "lng": "-116.74276296296296",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Zona industrial Industrial Pacífico II",
        "lat": "32.43449999999999",
        "lng": "-116.9582888888889",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Viñas del Mar II",
        "lat": "32.4536",
        "lng": "-117.065",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Real de La Gloria",
        "lat": "32.4462",
        "lng": "-117.001",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Valle del Sur",
        "lat": "32.3557",
        "lng": "-116.8121",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Real del Monte",
        "lat": "32.40154444444445",
        "lng": "-116.83006666666668",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Santa Fe",
        "lat": "32.505406666666666",
        "lng": "-116.76182",
        "per": 0,
        "size": 0.01
    },
    {
        "city": "Colonia 10 de Mayo",
        "lat": "32.5482",
        "lng": "-116.7397",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Unidad habitacional Presidentes",
        "lat": "32.419415384615384",
        "lng": "-117.02846153846154",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Zona industrial Parque Industrial Pacífico IV",
        "lat": "32.43449999999999",
        "lng": "-116.9582888888889",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa Fontana VII",
        "lat": "32.36484074074074",
        "lng": "-116.74276296296296",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Villa Urrutia",
        "lat": "32.431574999999995",
        "lng": "-116.904675",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Playa Blanca",
        "lat": "32.425200000000004",
        "lng": "-117.094875",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Chapultepec Este",
        "lat": "32.50418888888888",
        "lng": "-116.99482222222224",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia San Angel",
        "lat": "32.4225",
        "lng": "-117.0431",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Playas de Tijuana Sección Jardines del Sol",
        "lat": "32.4475875",
        "lng": "-116.9742375",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia I Ayuntamiento",
        "lat": "32.4345",
        "lng": "-116.9469",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Herrera",
        "lat": "32.43723333333333",
        "lng": "-116.93746666666668",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Altamira Sur",
        "lat": "32.450525",
        "lng": "-116.721025",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Playas de Tijuana Sección Costa Hermosa",
        "lat": "32.4538",
        "lng": "-116.9963",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa del Sol V",
        "lat": "32.36484074074074",
        "lng": "-116.74276296296296",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Jardín de las Bugambilias",
        "lat": "32.513459999999995",
        "lng": "-116.7722",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Paseos del Vergel",
        "lat": "32.44438571428571",
        "lng": "-116.82194285714286",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Ampliación Tejamen",
        "lat": "32.40490714285714",
        "lng": "-116.79287857142856",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Tepeyac",
        "lat": "32.40490714285714",
        "lng": "-116.79287857142856",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento El Palmar",
        "lat": "32.40490714285714",
        "lng": "-116.79287857142856",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Pórticos de La Mesa",
        "lat": "32.405",
        "lng": "-116.79970000000002",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Las Villas Santa Fe",
        "lat": "32.4718",
        "lng": "-116.86178571428572",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Perimetral Norte",
        "lat": "32.468",
        "lng": "-116.8041",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Gabilondo",
        "lat": "32.362",
        "lng": "-116.9505",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Anexa Porvenir",
        "lat": "32.405",
        "lng": "-116.79970000000002",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Cortez",
        "lat": "32.313233333333336",
        "lng": "-116.70433333333332",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Paseos del Pacífico",
        "lat": "32.46521",
        "lng": "-116.87767",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Otay Jardín II",
        "lat": "32.22461428571428",
        "lng": "-116.53342857142856",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento La Esperanza",
        "lat": "32.40490714285714",
        "lng": "-116.79287857142856",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Hacienda las Delicias III",
        "lat": "32.3915",
        "lng": "-116.9576",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Cañón Miramar",
        "lat": "32.4724",
        "lng": "-116.9359",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Guadalupe Victoria",
        "lat": "32.35883333333333",
        "lng": "-116.7714",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Praderas de La Mesa Sección Valle de las Flores",
        "lat": "32.405",
        "lng": "-116.79970000000002",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia 3 de Octubre",
        "lat": "32.431574999999995",
        "lng": "-116.904675",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Lomas de La Presa",
        "lat": "32.43026666666666",
        "lng": "-116.90063333333332",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia 18 de Marzo",
        "lat": "32.42765",
        "lng": "-116.89255",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Playas de Tijuana Sección La Riviera",
        "lat": "32.4475875",
        "lng": "-116.9742375",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Zona industrial Los Pinos (Limón)",
        "lat": "32.42765",
        "lng": "-116.89255",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Las Huertas 5a Sección",
        "lat": "32.431014285714284",
        "lng": "-116.90294285714286",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia La Esmeralda",
        "lat": "32.505406666666666",
        "lng": "-116.76182",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Leonardo Rodriguez Alcaine",
        "lat": "32.4306",
        "lng": "-117.025",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Rincón Dorado",
        "lat": "32.3617",
        "lng": "-116.7366",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Mesa de Otay",
        "lat": "32.468",
        "lng": "-116.8041",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Insurgentes",
        "lat": "32.405",
        "lng": "-116.79970000000002",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Las Flores",
        "lat": "32.46521",
        "lng": "-116.87767",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Generación 2000",
        "lat": "32.3915",
        "lng": "-116.9576",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa del Campo",
        "lat": "32.49058888888889",
        "lng": "-116.78061111111111",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia El Roble Tres R",
        "lat": "32.4732",
        "lng": "-116.8046",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Linda Vista",
        "lat": "32.4041",
        "lng": "-116.8198",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Chula Vista",
        "lat": "32.333975",
        "lng": "-116.8985",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Herradura",
        "lat": "32.4248",
        "lng": "-116.89830000000002",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Gas y Anexas",
        "lat": "32.44844615384615",
        "lng": "-116.87156923076924",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Ignacio Zaragoza",
        "lat": "32.22461428571428",
        "lng": "-116.53342857142856",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Constitución del 17",
        "lat": "32.42765",
        "lng": "-116.89255",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Zona Norte",
        "lat": "32.4179",
        "lng": "-116.87213333333334",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Pontevedra",
        "lat": "32.5482",
        "lng": "-116.7397",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Genaro Vázquez",
        "lat": "32.43449999999999",
        "lng": "-116.9582888888889",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Quinta Alta",
        "lat": "32.313233333333336",
        "lng": "-116.70433333333332",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Murua Oriente",
        "lat": "32.44583333333333",
        "lng": "-116.7912",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Héroes de Independencia",
        "lat": "32.47053636363636",
        "lng": "-116.8684",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Los Lobos",
        "lat": "32.3617",
        "lng": "-116.7366",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia El Tecolote",
        "lat": "32.43449999999999",
        "lng": "-116.9582888888889",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Leonardo Rodriguez Alcaine",
        "lat": "32.4475875",
        "lng": "-116.9742375",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Ejido Francisco Villa",
        "lat": "32.405",
        "lng": "-116.7997",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Valle Vista 1a Sección",
        "lat": "32.506625",
        "lng": "-116.690575",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa Fontana X",
        "lat": "32.47053636363636",
        "lng": "-116.8684",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Cerro II",
        "lat": "32.40472307692308",
        "lng": "-116.8058846153846",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Unidad habitacional Plaza España",
        "lat": "32.419415384615384",
        "lng": "-117.02846153846154",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Cañón Centenario",
        "lat": "32.43768333333333",
        "lng": "-116.82155",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Empleado Postal",
        "lat": "32.5333",
        "lng": "-116.7333",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Morelos",
        "lat": "32.445366666666665",
        "lng": "-116.732",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Xicotencatl Leyva",
        "lat": "32.4523",
        "lng": "-116.9682",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Jardín Dorado",
        "lat": "32.3617",
        "lng": "-116.7366",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Colinas de La Cantera",
        "lat": "32.40616666666667",
        "lng": "-116.75873333333334",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento El Rubí",
        "lat": "32.4345",
        "lng": "-116.9469",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Las Brisas",
        "lat": "32.44844615384615",
        "lng": "-116.87156923076924",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Verona Residencial",
        "lat": "32.4391",
        "lng": "-116.99188333333336",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia México Lindo",
        "lat": "32.431574999999995",
        "lng": "-116.904675",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Hacienda Linda Vista",
        "lat": "32.4538",
        "lng": "-116.9963",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Valle del Alamar II",
        "lat": "32.5482",
        "lng": "-116.7397",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Alberto Bustamante",
        "lat": "32.4386",
        "lng": "-116.9661",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Cañón de las Rosas",
        "lat": "32.4724",
        "lng": "-116.9359",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Los Ángeles",
        "lat": "32.483293333333336",
        "lng": "-116.81761333333334",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Flores Magón",
        "lat": "32.4523",
        "lng": "-116.9682",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Zona industrial Ciudad Industrial",
        "lat": "32.5254",
        "lng": "-116.9178",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Cañón del Matadero",
        "lat": "32.4724",
        "lng": "-116.9359",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Los Reyes",
        "lat": "32.43026666666666",
        "lng": "-116.90063333333332",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento La Cúspide",
        "lat": "32.4983",
        "lng": "-117.1207",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Fernández",
        "lat": "32.4667",
        "lng": "-116.7769",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Los Olivos Norte",
        "lat": "32.40154444444445",
        "lng": "-116.83006666666668",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Sanchez Taboada IV",
        "lat": "32.40616666666667",
        "lng": "-116.75873333333334",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Natura Sección Bosques",
        "lat": "32.3915",
        "lng": "-116.9576",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villas de Baja California",
        "lat": "32.43026666666666",
        "lng": "-116.90063333333332",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Francisco Zarco",
        "lat": "32.4647",
        "lng": "-117.0425",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Alfredo Ames",
        "lat": "32.4252",
        "lng": "-116.9955",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Cuauhtémoc",
        "lat": "32.4103",
        "lng": "-116.836",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Hipódromo Agua Caliente",
        "lat": "32.5167",
        "lng": "-117.0167",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Residencial Los Leones",
        "lat": "32.4462",
        "lng": "-117.001",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Coral Beach",
        "lat": "32.4475875",
        "lng": "-116.9742375",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Cerro Colorado",
        "lat": "32.40472307692308",
        "lng": "-116.8058846153846",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Anexa Veracruz",
        "lat": "32.505406666666666",
        "lng": "-116.76182",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Horóscopo",
        "lat": "32.405",
        "lng": "-116.7997",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Zona industrial Fideicomiso el Florido",
        "lat": "32.05833333333333",
        "lng": "-116.678175",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa del Sol IV",
        "lat": "32.36484074074074",
        "lng": "-116.74276296296296",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Unidad habitacional Cuatro Estrellas",
        "lat": "32.43455",
        "lng": "-116.9743",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Condominio Residencial Frontera",
        "lat": "32.468",
        "lng": "-116.8041",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Llamas Amaya",
        "lat": "32.350744444444445",
        "lng": "-116.8455",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia El Prado",
        "lat": "32.483293333333336",
        "lng": "-116.81761333333334",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Zona industrial Baja Maq. El Águila",
        "lat": "32.419415384615384",
        "lng": "-117.02846153846154",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Equipamiento Campo de Golf",
        "lat": "32.50418888888888",
        "lng": "-116.99482222222224",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento TECNOMEX",
        "lat": "32.4983",
        "lng": "-117.1207",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa del Prado Segunda Sección",
        "lat": "32.433260000000004",
        "lng": "-116.87776999999998",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Huertas 1a. Sección",
        "lat": "32.513459999999995",
        "lng": "-116.7722",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Misión del Sol",
        "lat": "32.4538",
        "lng": "-116.9963",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa Fontana II",
        "lat": "32.36484074074074",
        "lng": "-116.74276296296296",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Los Álamos",
        "lat": "32.37725",
        "lng": "-116.69665",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Las Vegas",
        "lat": "32.44844615384615",
        "lng": "-116.87156923076924",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Rubio",
        "lat": "32.513459999999995",
        "lng": "-116.7722",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia La Villa",
        "lat": "32.505406666666666",
        "lng": "-116.76182",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Cañón el Salado",
        "lat": "32.513459999999995",
        "lng": "-116.7722",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Laderas del Mar",
        "lat": "32.4983",
        "lng": "-117.1207",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Independencia",
        "lat": "32.450525",
        "lng": "-116.721025",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Punta Bandera",
        "lat": "32.4619",
        "lng": "-117.101",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Pinos de Narez",
        "lat": "32.431014285714284",
        "lng": "-116.90294285714286",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Vista Bella",
        "lat": "32.4718",
        "lng": "-116.86178571428572",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Benton",
        "lat": "32.44844615384615",
        "lng": "-116.87156923076924",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Anáhuac",
        "lat": "32.483293333333336",
        "lng": "-116.81761333333334",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Marrón",
        "lat": "32.496766666666666",
        "lng": "-116.79406666666668",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Jardines de las Cruces",
        "lat": "32.350744444444445",
        "lng": "-116.8455",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Alamar",
        "lat": "32.44583333333333",
        "lng": "-116.7912",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Praderas del Sol",
        "lat": "32.419415384615384",
        "lng": "-117.02846153846154",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Paseo Santa María",
        "lat": "32.05833333333333",
        "lng": "-116.678175",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia San Antonio",
        "lat": "32.32389090909091",
        "lng": "-116.8769",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia 20 de Noviembre",
        "lat": "32.4424",
        "lng": "-116.7405",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Anexa Internacional",
        "lat": "32.48574166666666",
        "lng": "-116.88399166666666",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Nuevo Progreso",
        "lat": "32.4732",
        "lng": "-116.8046",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Monte Real",
        "lat": "32.40483636363637",
        "lng": "-116.80335454545455",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Zona industrial Internacional Tijuana",
        "lat": "32.4776",
        "lng": "-117.0087",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Lomas Taurinas",
        "lat": "32.5333",
        "lng": "-116.7333",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia El Olivar",
        "lat": "32.4194",
        "lng": "-116.92279999999998",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Vistas de Palmillas",
        "lat": "32.44438571428571",
        "lng": "-116.82194285714286",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Oaxaca (Ángel Fernández)",
        "lat": "32.4193",
        "lng": "-116.88335",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Mariano Matamoros (Sur)",
        "lat": "32.405",
        "lng": "-116.7997",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Altamira",
        "lat": "32.4041",
        "lng": "-116.8198",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Villa Lomas",
        "lat": "32.4248",
        "lng": "-116.89830000000002",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Residencial La Esperanza",
        "lat": "32.48574166666666",
        "lng": "-116.88399166666666",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Campos",
        "lat": "32.431014285714284",
        "lng": "-116.90294285714286",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Zona industrial Tomas Alva Edison",
        "lat": "32.3915",
        "lng": "-116.9576",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Riberas del Alamar",
        "lat": "32.4667",
        "lng": "-116.7769",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Villa Cruz",
        "lat": "32.40483636363637",
        "lng": "-116.80335454545455",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Guillen",
        "lat": "32.313233333333336",
        "lng": "-116.70433333333332",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Agua Caliente",
        "lat": "32.5167",
        "lng": "-117.0167",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Puesta del Sol",
        "lat": "32.44551666666667",
        "lng": "-116.96688333333334",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Hidalgo",
        "lat": "32.44583333333333",
        "lng": "-116.7912",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Campestre La Gloria",
        "lat": "32.4462",
        "lng": "-117.001",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Lomas de Agua Caliente 1a Sección",
        "lat": "32.48452857142858",
        "lng": "-116.96044285714288",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Condominios Villas California",
        "lat": "32.4462",
        "lng": "-117.001",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Lomas Villas",
        "lat": "32.40490714285714",
        "lng": "-116.79287857142856",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Nueva Esperanza (La Cuesta)",
        "lat": "32.48574166666666",
        "lng": "-116.88399166666666",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Pórticos de San Antonio",
        "lat": "32.4718",
        "lng": "-116.86178571428572",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Albatros",
        "lat": "32.4585",
        "lng": "-117.0176",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Las Misiones",
        "lat": "32.419415384615384",
        "lng": "-117.02846153846154",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Fausto González",
        "lat": "32.4252",
        "lng": "-117.0099",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Chapultepec 10a Sección",
        "lat": "32.50418888888888",
        "lng": "-116.99482222222224",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia El Seminario",
        "lat": "32.405",
        "lng": "-116.79970000000002",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa del Sol I",
        "lat": "32.36484074074074",
        "lng": "-116.74276296296296",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Altabrisa",
        "lat": "32.3362",
        "lng": "-116.7472",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Xochimilco Solidaridad",
        "lat": "32.46521",
        "lng": "-116.87767",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Rincón de Otay",
        "lat": "32.46782",
        "lng": "-116.79802",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Zona industrial Chilpancingo",
        "lat": "32.5254",
        "lng": "-116.9178",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Carmen Castillo",
        "lat": "32.37",
        "lng": "-116.6345",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Jardines de Las Arboledas",
        "lat": "32.4194",
        "lng": "-116.92279999999998",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Internacional",
        "lat": "32.48574166666666",
        "lng": "-116.88399166666666",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Sonora",
        "lat": "32.40154444444445",
        "lng": "-116.83006666666668",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Aviación",
        "lat": "32.496766666666666",
        "lng": "-116.79406666666668",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Zona industrial Nordika",
        "lat": "32.43449999999999",
        "lng": "-116.9582888888889",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Rancho La Cima",
        "lat": "32.4345",
        "lng": "-116.9469",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia El Realito",
        "lat": "32.4256",
        "lng": "-116.8831",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Cerro Colorado 2a Sección (Lomas del Colorado)",
        "lat": "32.40472307692308",
        "lng": "-116.8058846153846",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Parque Industrial La Mesa",
        "lat": "32.406580000000005",
        "lng": "-116.74652",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Amparo Sánchez",
        "lat": "32.43768333333333",
        "lng": "-116.82155",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento El Jibarito",
        "lat": "32.4523",
        "lng": "-116.9682",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Playas de Tijuana Sección Monumental",
        "lat": "32.44551666666667",
        "lng": "-116.96688333333334",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia FOVISSSTE V",
        "lat": "32.46782",
        "lng": "-116.79802",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia El Florido 2a. Sección",
        "lat": "32.405",
        "lng": "-116.7997",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Buenos Aires Norte",
        "lat": "32.3617",
        "lng": "-116.7366",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Colinas del Rey",
        "lat": "32.36538",
        "lng": "-116.81364",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Rancho el Grande",
        "lat": "32.48452857142858",
        "lng": "-116.96044285714288",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Nueva Aurora",
        "lat": "32.48544285714286",
        "lng": "-117.03485714285716",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Granjas Familiares Unidas",
        "lat": "32.5482",
        "lng": "-116.7397",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Lomas del Río",
        "lat": "32.40490714285714",
        "lng": "-116.79287857142856",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Isla Coronado",
        "lat": "32.42258",
        "lng": "-117.09744",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Maclovio Rojas",
        "lat": "32.49058888888889",
        "lng": "-116.78061111111111",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Tomas Aquino",
        "lat": "32.5333",
        "lng": "-116.7333",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Ejido Francisco Villa Sur",
        "lat": "32.405",
        "lng": "-116.7997",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Puerta del Río",
        "lat": "32.405",
        "lng": "-116.7997",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Hacienda las Palomas",
        "lat": "32.421842857142856",
        "lng": "-116.88708571428572",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Aguaje de La Tuna 1a Sección",
        "lat": "32.48574166666666",
        "lng": "-116.88399166666666",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Anexa Miramar",
        "lat": "32.5187",
        "lng": "-117.0874",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Revolución",
        "lat": "32.496766666666666",
        "lng": "-116.79406666666668",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Condominio Mar Vista",
        "lat": "32.4742",
        "lng": "-116.8065142857143",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Burócrata Ruiz Cortines",
        "lat": "32.5167",
        "lng": "-116.9833",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Los Laureles",
        "lat": "32.4742",
        "lng": "-116.8065142857143",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Vista Lago",
        "lat": "32.468",
        "lng": "-116.8041",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Natura Sección Amanecer",
        "lat": "32.3915",
        "lng": "-116.9576",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Laderas de Monterrey",
        "lat": "32.47284285714286",
        "lng": "-117.00107142857144",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Chapultepec Alamar",
        "lat": "32.37725",
        "lng": "-116.69665",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Garita Otay",
        "lat": "32.468",
        "lng": "-116.8041",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Los Españoles",
        "lat": "32.490966666666665",
        "lng": "-116.6942",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Las Californias",
        "lat": "32.4604",
        "lng": "-116.90155",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Los Árboles",
        "lat": "32.505406666666666",
        "lng": "-116.76182",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Jardines de Agua Caliente",
        "lat": "32.4317",
        "lng": "-116.85684",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Lomas Conjunto Residencial",
        "lat": "32.513459999999995",
        "lng": "-116.7722",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Mineral de Santa Fe",
        "lat": "32.5333",
        "lng": "-116.7333",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Residencial Villaflores",
        "lat": "32.37725",
        "lng": "-116.69665",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Chapultepec 8a Sección",
        "lat": "32.50418888888888",
        "lng": "-116.99482222222224",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Campo Koa",
        "lat": "32.4193",
        "lng": "-116.99101428571429",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia La Ciénega Poniente",
        "lat": "32.32389090909091",
        "lng": "-116.8769",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Vista Azul",
        "lat": "32.4589",
        "lng": "-117.10765",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Valle Imperial",
        "lat": "32.329181818181816",
        "lng": "-116.68644545454544",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Condominio Privada San Miguel",
        "lat": "32.44583333333333",
        "lng": "-116.7912",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Ampliación Las Américas",
        "lat": "32.419415384615384",
        "lng": "-117.02846153846154",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Ejido Francisco Villa 2a Sección",
        "lat": "32.405",
        "lng": "-116.7997",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia INFONAVIT Cachanillas",
        "lat": "32.406580000000005",
        "lng": "-116.74652",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Lomas Virreyes",
        "lat": "32.2572",
        "lng": "-116.746",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Colinas de Chapultepec",
        "lat": "32.48452857142858",
        "lng": "-116.96044285714288",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia San Carlos",
        "lat": "32.40472307692308",
        "lng": "-116.8058846153846",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa Residencial Santa Fe 5a Sección",
        "lat": "32.4306",
        "lng": "-117.025",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Villa Colonial",
        "lat": "32.4317",
        "lng": "-116.85684",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Castro Green",
        "lat": "32.431014285714284",
        "lng": "-116.90294285714286",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Rancho el Águila",
        "lat": "32.419415384615384",
        "lng": "-117.02846153846154",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Lomas de San Pedro",
        "lat": "32.405",
        "lng": "-116.7997",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Praderas de La Mesa",
        "lat": "32.40483636363637",
        "lng": "-116.80335454545455",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa Residencial Santa Fe 3a Sección",
        "lat": "32.4252",
        "lng": "-116.9955",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Pinos del Agüero",
        "lat": "32.513459999999995",
        "lng": "-116.7722",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Estrella del Pacífico",
        "lat": "32.4391",
        "lng": "-116.99188333333336",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Ramos Sur",
        "lat": "32.513459999999995",
        "lng": "-116.7722",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Xicoténcatl Dos",
        "lat": "32.4647",
        "lng": "-117.0425",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Rancho Rivera",
        "lat": "32.4667",
        "lng": "-116.7769",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Las Colonias",
        "lat": "32.05833333333333",
        "lng": "-116.678175",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia San Antonio del Mar",
        "lat": "32.425200000000004",
        "lng": "-117.094875",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Cubillas",
        "lat": "32.333975",
        "lng": "-116.8985",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Monte San Antonio",
        "lat": "32.4345",
        "lng": "-116.9469",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Unidad habitacional INFONAVIT Latinos",
        "lat": "32.406580000000005",
        "lng": "-116.74652",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Nueva Tijuana",
        "lat": "32.468",
        "lng": "-116.8041",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Lomas Santa Fe",
        "lat": "32.4536",
        "lng": "-117.065",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Hacienda Agua Caliente",
        "lat": "32.421842857142856",
        "lng": "-116.88708571428572",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Ampliación Salvatierra",
        "lat": "32.3",
        "lng": "-116.91670000000002",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Miramar",
        "lat": "32.5187",
        "lng": "-117.0874",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Melchor Ocampo",
        "lat": "32.506625",
        "lng": "-116.690575",
        "per": 0,
        "size": 0.01
    },
    {
        "city": "Colonia Lomas del Mirador",
        "lat": "32.4742",
        "lng": "-116.8065142857143",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Francisco Villa",
        "lat": "32.4193",
        "lng": "-116.88335",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Cañón de las Carretas",
        "lat": "32.4252",
        "lng": "-117.0099",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Santa Cecilia",
        "lat": "32.4317",
        "lng": "-116.85684",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Juárez",
        "lat": "32.38305",
        "lng": "-116.88515",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Ecologista",
        "lat": "32.4724",
        "lng": "-116.93590000000002",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa Fontana V",
        "lat": "32.47053636363636",
        "lng": "-116.8684",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia El Paraíso",
        "lat": "32.313233333333336",
        "lng": "-116.70433333333332",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Cañón Tampico",
        "lat": "32.4742",
        "lng": "-116.8065142857143",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Los Valles",
        "lat": "32.391549999999995",
        "lng": "-116.95765",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia El Ranchito",
        "lat": "32.431574999999995",
        "lng": "-116.904675",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Las Palmas",
        "lat": "32.313233333333336",
        "lng": "-116.70433333333332",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia San Antonio Oeste",
        "lat": "32.32389090909091",
        "lng": "-116.8769",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Centro Comercial Otay",
        "lat": "32.3362",
        "lng": "-116.7472",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Cañón Primavera",
        "lat": "32.4248",
        "lng": "-116.8983",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Aguaje de La Tuna 2a Sección",
        "lat": "32.48574166666666",
        "lng": "-116.88399166666666",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Las Villas Tijuana",
        "lat": "32.4391",
        "lng": "-116.99188333333336",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia El Monte",
        "lat": "32.4679",
        "lng": "-117.0877",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Misión de las Californias",
        "lat": "32.3617",
        "lng": "-116.7366",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Cañón de La Pedrera",
        "lat": "32.4248",
        "lng": "-116.8983",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Alcatraces",
        "lat": "32.4252",
        "lng": "-116.9955",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Niños Héroes (La Mesa)",
        "lat": "32.42765",
        "lng": "-116.89255",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Conjunto Residencial Cataviña",
        "lat": "32.48452857142858",
        "lng": "-116.96044285714288",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Hacienda los Venados",
        "lat": "32.3915",
        "lng": "-116.9576",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Playas de Tijuana Sección Playas Coronado",
        "lat": "32.44551666666667",
        "lng": "-116.96688333333334",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia La Campiña",
        "lat": "32.405",
        "lng": "-116.79970000000002",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Real del Mar",
        "lat": "32.4258",
        "lng": "-117.0392",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Castillo",
        "lat": "32.466",
        "lng": "-116.6881",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia El Valle",
        "lat": "32.513459999999995",
        "lng": "-116.7722",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia López Lucio",
        "lat": "32.313233333333336",
        "lng": "-116.70433333333332",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Rancho las Flores 1a Sección",
        "lat": "32.5187",
        "lng": "-117.0874",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Anexo los Laureles",
        "lat": "32.4742",
        "lng": "-116.8065142857143",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Paseos del Florido",
        "lat": "32.05833333333333",
        "lng": "-116.678175",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento San Agustin",
        "lat": "32.43455",
        "lng": "-116.9743",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Leos Montoya",
        "lat": "32.313233333333336",
        "lng": "-116.70433333333332",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Florido Viejo",
        "lat": "32.49058888888889",
        "lng": "-116.78061111111111",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia La Mesa",
        "lat": "32.483293333333336",
        "lng": "-116.81761333333334",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Lagunitas",
        "lat": "32.44055",
        "lng": "-116.84985",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Guaycura",
        "lat": "32.4222",
        "lng": "-117.0664",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Hacienda Las Delicias",
        "lat": "32.3915",
        "lng": "-116.9576",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa del Real X",
        "lat": "32.36484074074074",
        "lng": "-116.74276296296296",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Villa de Alcázar",
        "lat": "32.4194",
        "lng": "-116.92279999999998",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia División del Norte",
        "lat": "32.42765",
        "lng": "-116.89255",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia San Jerónimo",
        "lat": "32.48452857142858",
        "lng": "-116.96044285714288",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa Bonita",
        "lat": "32.40490714285714",
        "lng": "-116.79287857142856",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Colinas San Rafael",
        "lat": "32.433260000000004",
        "lng": "-116.87776999999998",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Manuel Rivera Anaya",
        "lat": "32.46782",
        "lng": "-116.79802",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Chihuahua",
        "lat": "32.4193",
        "lng": "-116.88335",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Lomas de Tlatelolco",
        "lat": "32.49058888888889",
        "lng": "-116.78061111111111",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Emperadores",
        "lat": "32.505406666666666",
        "lng": "-116.76182",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Zona industrial Valle Sur",
        "lat": "32.48544285714286",
        "lng": "-117.03485714285716",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Hidalgo",
        "lat": "32.445366666666665",
        "lng": "-116.732",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa Residencial Santa Fe 1a Sección",
        "lat": "32.4391",
        "lng": "-116.99188333333336",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Jardines de La Misión",
        "lat": "32.466",
        "lng": "-116.6881",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Residencial Las Cascadas",
        "lat": "32.36538",
        "lng": "-116.81364",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Ampliación Reforma",
        "lat": "32.406580000000005",
        "lng": "-116.74652",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Lomas de Agua Caliente",
        "lat": "32.5167",
        "lng": "-117.0167",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia México",
        "lat": "32.445366666666665",
        "lng": "-116.732",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Tecnológico",
        "lat": "32.4749",
        "lng": "-116.7956",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Presa Rodriguez",
        "lat": "32.4516",
        "lng": "-116.9109",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Michoacán",
        "lat": "32.4225",
        "lng": "-117.0431",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Insurgentes",
        "lat": "32.40483636363637",
        "lng": "-116.80335454545455",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Puerta del Sol",
        "lat": "32.3617",
        "lng": "-116.7366",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Cumbres de Juárez",
        "lat": "32.47284285714286",
        "lng": "-117.00107142857144",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Unidad habitacional FOVISSSTE II",
        "lat": "32.46782",
        "lng": "-116.79802",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Zona industrial Los Olivos",
        "lat": "32.44844615384615",
        "lng": "-116.87156923076924",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Jardines de San Carlos",
        "lat": "32.313233333333336",
        "lng": "-116.70433333333332",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Tejamen",
        "lat": "32.40490714285714",
        "lng": "-116.79287857142856",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Brisa Marina",
        "lat": "32.3",
        "lng": "-116.91670000000002",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Cañón del Matadero Este",
        "lat": "32.4742",
        "lng": "-116.8065142857143",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Milenio 2000",
        "lat": "32.4585",
        "lng": "-117.0176",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Residencial Isla Cedros",
        "lat": "32.4718",
        "lng": "-116.86178571428572",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa del Real VI",
        "lat": "32.36484074074074",
        "lng": "-116.74276296296296",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa del Real I",
        "lat": "32.36484074074074",
        "lng": "-116.74276296296296",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Hacienda del Pacifico",
        "lat": "32.46521",
        "lng": "-116.87767",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Maestros Universitarios",
        "lat": "32.4089",
        "lng": "-116.9436",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Hacienda las Flores",
        "lat": "32.43455",
        "lng": "-116.9743",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Nueva Aurora Sur",
        "lat": "32.48544285714286",
        "lng": "-117.03485714285716",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Vista Encantada",
        "lat": "32.4724",
        "lng": "-116.93590000000002",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Hacienda Santa María",
        "lat": "32.05833333333333",
        "lng": "-116.678175",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Unidad habitacional Plaza San Marcos",
        "lat": "32.419415384615384",
        "lng": "-117.02846153846154",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Lázaro Cárdenas",
        "lat": "32.4386",
        "lng": "-116.9661",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia María Medina",
        "lat": "32.43768333333333",
        "lng": "-116.82155",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa del Real VII",
        "lat": "32.36484074074074",
        "lng": "-116.74276296296296",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Terrazas del Valle",
        "lat": "32.4875",
        "lng": "-116.8267",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Loma Dorada",
        "lat": "32.41961428571428",
        "lng": "-117.03117142857144",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia INFONAVIT Lomas Verdes",
        "lat": "32.431014285714284",
        "lng": "-116.90294285714286",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Granjas División del Norte",
        "lat": "32.5482",
        "lng": "-116.7397",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Camino Viejo",
        "lat": "32.4194",
        "lng": "-116.92279999999998",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Manuel Paredes II",
        "lat": "32.4345",
        "lng": "-116.9469",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Sección Campestre",
        "lat": "32.4193",
        "lng": "-116.99101428571429",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Madero Sur",
        "lat": "32.47284285714286",
        "lng": "-117.00107142857144",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Banus Residencial",
        "lat": "32.43449999999999",
        "lng": "-116.9582888888889",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Playas de Tijuana Sección Jardines",
        "lat": "32.4538",
        "lng": "-116.9963",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Zona industrial Lago Sur",
        "lat": "32.4222",
        "lng": "-117.0664",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Hacienda las Fuentes",
        "lat": "32.05833333333333",
        "lng": "-116.678175",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Hacienda los Laureles",
        "lat": "32.433260000000004",
        "lng": "-116.87776999999998",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Los Arenales A",
        "lat": "32.4667",
        "lng": "-116.7769",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Colinas de Cortés",
        "lat": "32.37",
        "lng": "-116.6345",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Siena Residencial",
        "lat": "32.4391",
        "lng": "-116.99188333333336",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Chapultepec California",
        "lat": "32.505406666666666",
        "lng": "-116.76182",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia El Bosque",
        "lat": "32.4248",
        "lng": "-116.89830000000002",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Modesto Ponce",
        "lat": "32.3",
        "lng": "-116.91670000000002",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Hacienda San Martín",
        "lat": "32.4252",
        "lng": "-116.9955",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Panamericano",
        "lat": "32.466",
        "lng": "-116.6881",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Rinconada 2",
        "lat": "32.4089",
        "lng": "-116.9436",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Terrazas La Morita",
        "lat": "32.44438571428571",
        "lng": "-116.82194285714286",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Playas de Tijuana Sección Terrazas",
        "lat": "32.44551666666667",
        "lng": "-116.96688333333334",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Zona industrial Parque Industrial Misiones de las Californias",
        "lat": "32.3362",
        "lng": "-116.7472",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento La Escondida",
        "lat": "32.4718",
        "lng": "-116.86178571428572",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia El Mirador (La Mesa)",
        "lat": "32.40154444444445",
        "lng": "-116.83006666666668",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Lomas de La Amistad",
        "lat": "32.406580000000005",
        "lng": "-116.74652",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Yamille",
        "lat": "32.32389090909091",
        "lng": "-116.8769",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Bellas Artes",
        "lat": "32.468",
        "lng": "-116.8041",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Divina Providencia",
        "lat": "32.4724",
        "lng": "-116.93590000000002",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento San Antonio Club Hípico y de Golf",
        "lat": "32.4258",
        "lng": "-117.0392",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa Fontana VI",
        "lat": "32.36484074074074",
        "lng": "-116.74276296296296",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Ramírez",
        "lat": "32.44844615384615",
        "lng": "-116.87156923076924",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Palma Real",
        "lat": "32.391549999999995",
        "lng": "-116.95765",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia La Mesa Sur",
        "lat": "32.483293333333336",
        "lng": "-116.81761333333334",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Bosques de La Presa",
        "lat": "32.43026666666666",
        "lng": "-116.90063333333332",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Plan de Iguala",
        "lat": "32.513459999999995",
        "lng": "-116.7722",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia División los Altos",
        "lat": "32.4538",
        "lng": "-116.9963",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Baja Malibú",
        "lat": "32.425200000000004",
        "lng": "-117.094875",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Arenales B",
        "lat": "32.4667",
        "lng": "-116.7769",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Liberal Lomas del Rubí",
        "lat": "32.36538",
        "lng": "-116.81364",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Misión de las Américas",
        "lat": "32.419415384615384",
        "lng": "-117.02846153846154",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Baja Malibú (Sección Playas)",
        "lat": "32.425200000000004",
        "lng": "-117.094875",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Otay Campestre",
        "lat": "32.46782",
        "lng": "-116.79802",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Roberto de La Madrid",
        "lat": "32.468",
        "lng": "-116.8041",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Manuel Paredes I",
        "lat": "32.4193",
        "lng": "-116.88335",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia La Cueva",
        "lat": "32.3",
        "lng": "-116.91670000000002",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Ampliación Lomas de Tlatelolco",
        "lat": "32.49058888888889",
        "lng": "-116.78061111111111",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Lomas del Pedregal",
        "lat": "32.49058888888889",
        "lng": "-116.78061111111111",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Valle de las Palmas",
        "lat": "32.405",
        "lng": "-116.7997",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Tona",
        "lat": "32.4516",
        "lng": "-116.9109",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia La Sierra",
        "lat": "32.36538",
        "lng": "-116.81364",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento El Águila",
        "lat": "32.419415384615384",
        "lng": "-117.02846153846154",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Las Lilas",
        "lat": "32.483293333333336",
        "lng": "-116.81761333333334",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Costa Dorada",
        "lat": "32.4391",
        "lng": "-116.99188333333336",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Granjas el Tecolote",
        "lat": "32.43449999999999",
        "lng": "-116.9582888888889",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Buena Vista",
        "lat": "32.49023333333333",
        "lng": "-116.76213333333334",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Mesetas del Guaycura",
        "lat": "32.41961428571428",
        "lng": "-117.03117142857144",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Villa Floresta",
        "lat": "32.431014285714284",
        "lng": "-116.90294285714286",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Alfonso Ballesteros",
        "lat": "32.40490714285714",
        "lng": "-116.79287857142856",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Playas de Tijuana Sección Triangulo de Oro",
        "lat": "32.4538",
        "lng": "-116.9963",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Lomas Misión",
        "lat": "32.4538",
        "lng": "-116.9963",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Anexa Postal",
        "lat": "32.5167",
        "lng": "-116.9833",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Azteca",
        "lat": "32.40483636363637",
        "lng": "-116.80335454545455",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa Fontana VIII",
        "lat": "32.47053636363636",
        "lng": "-116.8684",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Granjas Buenos Aires Sección La Palma",
        "lat": "32.3915",
        "lng": "-116.9576",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Cañón Palmas",
        "lat": "32.431574999999995",
        "lng": "-116.904675",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Insurgentes",
        "lat": "32.3362",
        "lng": "-116.7472",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Rubí Aguadores",
        "lat": "32.4345",
        "lng": "-116.9469",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Mi Patrimonio",
        "lat": "32.46521",
        "lng": "-116.87767",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa Fontana I",
        "lat": "32.36484074074074",
        "lng": "-116.74276296296296",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Paseos de Guaycura",
        "lat": "32.419415384615384",
        "lng": "-117.02846153846154",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Zona industrial Presidentes",
        "lat": "32.419415384615384",
        "lng": "-117.02846153846154",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Sanchez Taboada Produtsa",
        "lat": "32.40616666666667",
        "lng": "-116.75873333333334",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Otay Jardín",
        "lat": "32.22461428571428",
        "lng": "-116.53342857142856",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villas del Dorado",
        "lat": "32.405",
        "lng": "-116.7997",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Valle del Rubí Sección Lomas",
        "lat": "32.371833333333335",
        "lng": "-116.81466666666668",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento San Mateo",
        "lat": "32.3",
        "lng": "-116.91670000000002",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Unidad habitacional XVIII Ayuntamiento",
        "lat": "32.43449999999999",
        "lng": "-116.9582888888889",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Cañón de las Palmeras",
        "lat": "32.441375",
        "lng": "-116.952175",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Roma",
        "lat": "32.4041",
        "lng": "-116.8198",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Pegaso I",
        "lat": "32.5482",
        "lng": "-116.7397",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Las Abejas",
        "lat": "32.05833333333333",
        "lng": "-116.678175",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Unidad habitacional INFONAVIT Patrimonio",
        "lat": "32.44583333333333",
        "lng": "-116.7912",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Niños Héroes",
        "lat": "32.4193",
        "lng": "-116.88335",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Cañón Rubí",
        "lat": "32.42098",
        "lng": "-116.97188",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Jardines de Chapultepec",
        "lat": "32.48452857142858",
        "lng": "-116.96044285714288",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa Residencial Santa Fe 2a Sección",
        "lat": "32.4306",
        "lng": "-117.025",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Lomas del Real",
        "lat": "32.4718",
        "lng": "-116.86178571428572",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Las Palmeras",
        "lat": "32.441375",
        "lng": "-116.952175",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Cañadas del Florido 2a. Sección",
        "lat": "32.05833333333333",
        "lng": "-116.678175",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Obrera 1a Sección",
        "lat": "32.4345",
        "lng": "-116.9469",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa Fontana XI",
        "lat": "32.47053636363636",
        "lng": "-116.8684",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Gutiérrez Ovalle",
        "lat": "32.350744444444445",
        "lng": "-116.8455",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Lomas de San Antonio",
        "lat": "32.42258",
        "lng": "-117.09744",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa del Real XI",
        "lat": "32.36484074074074",
        "lng": "-116.74276296296296",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia FIDUZET",
        "lat": "32.36484074074074",
        "lng": "-116.74276296296296",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Universidad Sur",
        "lat": "32.22461428571428",
        "lng": "-116.53342857142856",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Río Vista",
        "lat": "32.46782",
        "lng": "-116.79802",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Tierra y Libertad",
        "lat": "32.47053636363636",
        "lng": "-116.8684",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Felipa Velázquez",
        "lat": "32.4103",
        "lng": "-116.836",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Residencial San Marino",
        "lat": "32.4258",
        "lng": "-117.0392",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Valle Redondo",
        "lat": "32.5007",
        "lng": "-116.8071",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Lomas del Mar",
        "lat": "32.4536",
        "lng": "-117.065",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia La Escondida",
        "lat": "32.313233333333336",
        "lng": "-116.70433333333332",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Cumbres del Pacífico (Terrazas del Pacífico)",
        "lat": "32.43449999999999",
        "lng": "-116.9582888888889",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Ignacio Ramírez",
        "lat": "32.40490714285714",
        "lng": "-116.79287857142856",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia San José del Alto",
        "lat": "32.490966666666665",
        "lng": "-116.6942",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Luis Echeverría",
        "lat": "32.48574166666666",
        "lng": "-116.88399166666666",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Granjas Princesas del Sol",
        "lat": "32.49058888888889",
        "lng": "-116.78061111111111",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Leandro Valle",
        "lat": "32.46521",
        "lng": "-116.87767",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Las Cumbres",
        "lat": "32.4041",
        "lng": "-116.8198",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Libertad",
        "lat": "32.5167",
        "lng": "-116.9833",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Loma Bonita",
        "lat": "32.3617",
        "lng": "-116.7366",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Unidad habitacional Las Praderas",
        "lat": "32.40472307692308",
        "lng": "-116.8058846153846",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Guanajuato",
        "lat": "32.505406666666666",
        "lng": "-116.76182",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa del Sol III",
        "lat": "32.36484074074074",
        "lng": "-116.74276296296296",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Xicotencatl Leyva Alemán",
        "lat": "32.4386",
        "lng": "-116.9661",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Cerro Colorado I",
        "lat": "32.40472307692308",
        "lng": "-116.8058846153846",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia El Florido IV",
        "lat": "32.05833333333333",
        "lng": "-116.678175",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa Fontana XIV",
        "lat": "32.36484074074074",
        "lng": "-116.74276296296296",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Viñedos Casa Blanca",
        "lat": "32.4875",
        "lng": "-116.8267",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Obrera 2a Sección",
        "lat": "32.4345",
        "lng": "-116.9469",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Cañón del Matadero Norte",
        "lat": "32.4538",
        "lng": "-116.9963",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Reforma",
        "lat": "32.43768333333333",
        "lng": "-116.82155",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Natura Sección Arboledas",
        "lat": "32.3915",
        "lng": "-116.9576",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Madero (Cacho)",
        "lat": "32.38305",
        "lng": "-116.88515",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Rancho Macías",
        "lat": "32.4724",
        "lng": "-116.93590000000002",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Ejido Lázaro Cárdenas",
        "lat": "32.4252",
        "lng": "-116.9955",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Lomas Terrabella",
        "lat": "32.3617",
        "lng": "-116.7366",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Durán",
        "lat": "32.40616666666667",
        "lng": "-116.75873333333334",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Alemán",
        "lat": "32.466",
        "lng": "-116.6881",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Reynoso",
        "lat": "32.313233333333336",
        "lng": "-116.70433333333332",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Monarca",
        "lat": "32.4462",
        "lng": "-117.001",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia La Morita",
        "lat": "32.05833333333333",
        "lng": "-116.678175",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Gertrudis Green",
        "lat": "32.313233333333336",
        "lng": "-116.70433333333332",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Maurilio Magallón",
        "lat": "32.513459999999995",
        "lng": "-116.7722",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Magisterial",
        "lat": "32.5482",
        "lng": "-116.7397",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa Fontana XIII",
        "lat": "32.36484074074074",
        "lng": "-116.74276296296296",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Puerta de Hierro",
        "lat": "32.5167",
        "lng": "-117.0167",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Lázaro Cárdenas 3ra Mesa",
        "lat": "32.4386",
        "lng": "-116.9661",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia José López Portillo",
        "lat": "32.40472307692308",
        "lng": "-116.8058846153846",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Colina del Mediterráneo",
        "lat": "32.4538",
        "lng": "-116.9963",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia San Luis",
        "lat": "32.433260000000004",
        "lng": "-116.87776999999998",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Montecarlo",
        "lat": "32.3617",
        "lng": "-116.7366",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Anexa Sanchez Taboada",
        "lat": "32.37",
        "lng": "-116.6345",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Niños Héroes Este",
        "lat": "32.42765",
        "lng": "-116.89255",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Cerro Colorado 3a Sección",
        "lat": "32.40472307692308",
        "lng": "-116.8058846153846",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Los Santos",
        "lat": "32.490966666666665",
        "lng": "-116.6942",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Cañón de La Pedrera Este",
        "lat": "32.4248",
        "lng": "-116.8983",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Anexa Durango",
        "lat": "32.505406666666666",
        "lng": "-116.76182",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Ampliación Sanchez Taboada",
        "lat": "32.40616666666667",
        "lng": "-116.75873333333334",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Hacienda el Colorado",
        "lat": "32.405",
        "lng": "-116.7997",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Loma Dorada Campos",
        "lat": "32.431014285714284",
        "lng": "-116.90294285714286",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Ejido Chilpancingo",
        "lat": "32.5254",
        "lng": "-116.9178",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Manuel Paredes 3a Sección",
        "lat": "32.4345",
        "lng": "-116.9469",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Los Olivos",
        "lat": "32.4256",
        "lng": "-116.8831",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Rincón Colonial Chapultepec",
        "lat": "32.50418888888888",
        "lng": "-116.99482222222224",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Pedregal de Santa Julia",
        "lat": "32.48544285714286",
        "lng": "-117.03485714285716",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia La Gloria",
        "lat": "32.4462",
        "lng": "-117.001",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Real de Loma Bonita",
        "lat": "32.48544285714286",
        "lng": "-117.03485714285716",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Unidad habitacional FOVISSSTE",
        "lat": "32.4089",
        "lng": "-116.9436",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Mar de Cortez",
        "lat": "32.4475875",
        "lng": "-116.9742375",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Durango",
        "lat": "32.505406666666666",
        "lng": "-116.76182",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia El Refugio",
        "lat": "32.44438571428571",
        "lng": "-116.82194285714286",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia El Florido 1a. Sección",
        "lat": "32.405",
        "lng": "-116.7997",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Las Huertas 3a Sección",
        "lat": "32.44844615384615",
        "lng": "-116.87156923076924",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia El Mirador",
        "lat": "32.329181818181816",
        "lng": "-116.68644545454544",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Ejido Matamoros",
        "lat": "32.329181818181816",
        "lng": "-116.68644545454544",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Unidad habitacional Electricistas",
        "lat": "32.313233333333336",
        "lng": "-116.70433333333332",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Pueblo Bonito",
        "lat": "32.4248",
        "lng": "-116.89830000000002",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Anexa Loma Dorada",
        "lat": "32.431014285714284",
        "lng": "-116.90294285714286",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Colima",
        "lat": "32.40616666666667",
        "lng": "-116.75873333333334",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Camichin",
        "lat": "32.313233333333336",
        "lng": "-116.70433333333332",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento San Miguel",
        "lat": "32.4391",
        "lng": "-116.99188333333336",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Aeropuerto Tijuana (Gral. Abelardo L. Rodríguez)",
        "lat": "32.468",
        "lng": "-116.8041",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Los Delfines",
        "lat": "32.4193",
        "lng": "-116.99101428571429",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Las Torres de Matamoros",
        "lat": "32.47053636363636",
        "lng": "-116.8684",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia La Fuente del Valle",
        "lat": "32.5075",
        "lng": "-116.79189999999998",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Cañón del Sainz",
        "lat": "32.433260000000004",
        "lng": "-116.87776999999998",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Ojo de Agua",
        "lat": "32.49058888888889",
        "lng": "-116.78061111111111",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Hacienda Casa Grande",
        "lat": "32.2572",
        "lng": "-116.746",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Fortín de las Flores",
        "lat": "32.32389090909091",
        "lng": "-116.8769",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Gran Tenochtitlán",
        "lat": "32.4724",
        "lng": "-116.9359",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Bosque de las Araucarias",
        "lat": "32.3362",
        "lng": "-116.7472",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Anexa Divina Providencia",
        "lat": "32.4724",
        "lng": "-116.93590000000002",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Unidad habitacional INDECO Universidad",
        "lat": "32.22461428571428",
        "lng": "-116.53342857142856",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Planetario",
        "lat": "32.4248",
        "lng": "-116.89830000000002",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Villa Fontana XVI",
        "lat": "32.36484074074074",
        "lng": "-116.74276296296296",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Zona industrial El Florido II",
        "lat": "32.2572",
        "lng": "-116.746",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Granjas Familiares de Matamoros",
        "lat": "32.3617",
        "lng": "-116.7366",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Rancho Escondido",
        "lat": "32.5482",
        "lng": "-116.7397",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Empleados Federales",
        "lat": "32.496766666666666",
        "lng": "-116.79406666666668",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Mariano Matamoros (Norte)",
        "lat": "32.47053636363636",
        "lng": "-116.8684",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Santa Anita",
        "lat": "32.40154444444445",
        "lng": "-116.83006666666668",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Zona industrial Industrial Pacífico I",
        "lat": "32.46521",
        "lng": "-116.87767",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Residencial El Fuerte",
        "lat": "32.41961428571428",
        "lng": "-117.03117142857144",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia 5 y 8 Hectáreas",
        "lat": "32.4345",
        "lng": "-116.9469",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Zona Este",
        "lat": "32.4179",
        "lng": "-116.87213333333334",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Vista Mar Residencial",
        "lat": "32.4983",
        "lng": "-117.1207",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Obrera 3a Sección",
        "lat": "32.4345",
        "lng": "-116.9469",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Colinas de San Ángel",
        "lat": "32.40154444444445",
        "lng": "-116.83006666666668",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Aeropuerto",
        "lat": "32.4604",
        "lng": "-116.90155",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Sánchez Díaz",
        "lat": "32.48574166666666",
        "lng": "-116.88399166666666",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Rancho Santa Cruz",
        "lat": "32.433260000000004",
        "lng": "-116.87776999999998",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Santa Rosa (Ciudad)",
        "lat": "32.43723333333333",
        "lng": "-116.93746666666668",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia López Mateos",
        "lat": "32.421842857142856",
        "lng": "-116.88708571428572",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa del Álamo",
        "lat": "32.433260000000004",
        "lng": "-116.87776999999998",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Zona Centro",
        "lat": "32.4179",
        "lng": "-116.87213333333334",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Altiplano",
        "lat": "32.329181818181816",
        "lng": "-116.68644545454544",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Orizaba",
        "lat": "32.431014285714284",
        "lng": "-116.90294285714286",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Jardines de La Mesa",
        "lat": "32.431574999999995",
        "lng": "-116.904675",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia La Isla",
        "lat": "32.4538",
        "lng": "-116.9963",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia San Bernardo (Terrazas de San Bernardo)",
        "lat": "32.4724",
        "lng": "-116.93590000000002",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Luz Juárez",
        "lat": "32.313233333333336",
        "lng": "-116.70433333333332",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Mar Vista",
        "lat": "32.4386",
        "lng": "-116.9661",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Colinas de Agua Caliente",
        "lat": "32.421842857142856",
        "lng": "-116.88708571428572",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Isla Mujeres",
        "lat": "32.4718",
        "lng": "-116.86178571428572",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Cumbres del Sol",
        "lat": "32.42258",
        "lng": "-117.09744",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Camino Verde (Cañada Verde)",
        "lat": "32.4103",
        "lng": "-116.836",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Ramos",
        "lat": "32.513459999999995",
        "lng": "-116.7722",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Loma Blanca",
        "lat": "32.4273",
        "lng": "-117.0268",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Niño Artillero",
        "lat": "32.40616666666667",
        "lng": "-116.75873333333334",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia El Pedregal Oeste",
        "lat": "32.490966666666665",
        "lng": "-116.6942",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Rinconada 1",
        "lat": "32.4089",
        "lng": "-116.9436",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Moreno 2da. Sección",
        "lat": "32.44844615384615",
        "lng": "-116.87156923076924",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Cañón Oasis",
        "lat": "32.4248",
        "lng": "-116.89830000000002",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Fundadores",
        "lat": "32.47284285714286",
        "lng": "-117.00107142857144",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Zona industrial Valle del Sur 2",
        "lat": "32.3557",
        "lng": "-116.8121",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Campestre Murua",
        "lat": "32.4749",
        "lng": "-116.7956",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Ceceña",
        "lat": "32.483293333333336",
        "lng": "-116.81761333333334",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Sanchez Taboada II",
        "lat": "32.43768333333333",
        "lng": "-116.82155",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Bonilla",
        "lat": "32.4252",
        "lng": "-116.9955",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Los Girasoles",
        "lat": "32.4732",
        "lng": "-116.8046",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Planicie",
        "lat": "32.329181818181816",
        "lng": "-116.68644545454544",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa Fontana XII",
        "lat": "32.36484074074074",
        "lng": "-116.74276296296296",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa del Sol II",
        "lat": "32.36484074074074",
        "lng": "-116.74276296296296",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia División del Norte",
        "lat": "32.43768333333333",
        "lng": "-116.82155",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Vivienda Popular",
        "lat": "32.371833333333335",
        "lng": "-116.81466666666668",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Vista del Río",
        "lat": "32.405",
        "lng": "-116.7997",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Jardines de Chapultepec S-E",
        "lat": "32.4248",
        "lng": "-116.89830000000002",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Garita Internacional",
        "lat": "32.468",
        "lng": "-116.8041",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Hacienda Acueducto",
        "lat": "32.313233333333336",
        "lng": "-116.70433333333332",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Cañón del Padre",
        "lat": "32.3617",
        "lng": "-116.7366",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Residencial Alameda",
        "lat": "32.431574999999995",
        "lng": "-116.904675",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villas Otay",
        "lat": "32.3362",
        "lng": "-116.7472",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Kino II",
        "lat": "32.40472307692308",
        "lng": "-116.8058846153846",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Monterrey",
        "lat": "32.47284285714286",
        "lng": "-117.00107142857144",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Colinas de California",
        "lat": "32.466",
        "lng": "-116.6881",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Playas de Tijuana Sección Costa Azul",
        "lat": "32.4538",
        "lng": "-116.9963",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Nueva Era",
        "lat": "32.350744444444445",
        "lng": "-116.8455",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Urbi Quinta del Cedro Segunda Sección",
        "lat": "32.4536",
        "lng": "-117.065",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Cumbres del Rubí",
        "lat": "32.40490714285714",
        "lng": "-116.79287857142856",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Anexa Herrera",
        "lat": "32.4345",
        "lng": "-116.9469",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento San Carlos",
        "lat": "32.313233333333336",
        "lng": "-116.70433333333332",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Granja Puesta del Sol",
        "lat": "32.3",
        "lng": "-116.91670000000002",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Hipódromo Dos",
        "lat": "32.40154444444445",
        "lng": "-116.83006666666668",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Anexa Simón Bolívar",
        "lat": "32.40490714285714",
        "lng": "-116.79287857142856",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia La Ciénega",
        "lat": "32.42765",
        "lng": "-116.89255",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Partido del Trabajo",
        "lat": "32.49058888888889",
        "lng": "-116.78061111111111",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Ex Ejido Tampico",
        "lat": "32.35883333333333",
        "lng": "-116.7714",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia SEPANAL",
        "lat": "32.49023333333333",
        "lng": "-116.76213333333334",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Brisas del Mar",
        "lat": "32.4193",
        "lng": "-116.99101428571429",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Cuesta Blanca",
        "lat": "32.4273",
        "lng": "-117.0268",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Sonoita",
        "lat": "32.313233333333336",
        "lng": "-116.70433333333332",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Sanchez Taboada III",
        "lat": "32.40616666666667",
        "lng": "-116.75873333333334",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Cañón de La Raza",
        "lat": "32.40483636363637",
        "lng": "-116.80335454545455",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Chihuahua La Mesa",
        "lat": "32.32389090909091",
        "lng": "-116.8769",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Fuentes del Sol",
        "lat": "32.42258",
        "lng": "-117.09744",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Guerrero",
        "lat": "32.450525",
        "lng": "-116.721025",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Roberto Curiel",
        "lat": "32.36538",
        "lng": "-116.81364",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Sevilla Residencial",
        "lat": "32.2572",
        "lng": "-116.746",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento García",
        "lat": "32.4194",
        "lng": "-116.92279999999998",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Fortín de las Flores Oeste",
        "lat": "32.32389090909091",
        "lng": "-116.8769",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Santa Rosa",
        "lat": "32.313233333333336",
        "lng": "-116.70433333333332",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Burócrata Hipódromo",
        "lat": "32.421842857142856",
        "lng": "-116.88708571428572",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Playas de Tijuana Sección el Dorado",
        "lat": "32.4475875",
        "lng": "-116.9742375",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa Campestre",
        "lat": "32.466",
        "lng": "-116.6881",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia IMAQ Tijuana",
        "lat": "32.405",
        "lng": "-116.79970000000002",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Urbi Quinta del Cedro",
        "lat": "32.4536",
        "lng": "-117.065",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Praderas de la Gloria",
        "lat": "32.4391",
        "lng": "-116.99188333333336",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Chapultepec",
        "lat": "32.50418888888888",
        "lng": "-116.99482222222224",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Santa Cruz",
        "lat": "32.483293333333336",
        "lng": "-116.81761333333334",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Residencial Barcelona",
        "lat": "32.43449999999999",
        "lng": "-116.9582888888889",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento El Laurel I",
        "lat": "32.44438571428571",
        "lng": "-116.82194285714286",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Portezuelos",
        "lat": "32.405",
        "lng": "-116.7997",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Zona Urbana Río Tijuana",
        "lat": "32.496766666666666",
        "lng": "-116.79406666666668",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Altiplano 5a Sección",
        "lat": "32.329181818181816",
        "lng": "-116.68644545454544",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Los Pirules",
        "lat": "32.37725",
        "lng": "-116.69665",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Corona Encantada",
        "lat": "32.4724",
        "lng": "-116.93590000000002",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Anexa Buena Vista",
        "lat": "32.5333",
        "lng": "-116.7333",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Río Tijuana 3a Etapa",
        "lat": "32.405",
        "lng": "-116.7997",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Colinas de La Cruz",
        "lat": "32.431014285714284",
        "lng": "-116.90294285714286",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Alfonso Corona del Rosal",
        "lat": "32.490966666666665",
        "lng": "-116.6942",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Las Américas",
        "lat": "32.419415384615384",
        "lng": "-117.02846153846154",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Zona industrial Parque Industrial El Florido Sección La Encantada",
        "lat": "32.4256",
        "lng": "-116.8831",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Ampliación Ejido Lázaro Cárdenas",
        "lat": "32.4252",
        "lng": "-116.9955",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Dimenstein",
        "lat": "32.483293333333336",
        "lng": "-116.81761333333334",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Ranchería Rincón del Mediterraneo",
        "lat": "32.49058888888889",
        "lng": "-116.78061111111111",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Centro Urbano 70-76",
        "lat": "32.5333",
        "lng": "-116.7333",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Segunda Parte del Soler",
        "lat": "32.4538",
        "lng": "-116.9963",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Unidad habitacional Fidel Velázquez",
        "lat": "32.40483636363637",
        "lng": "-116.80335454545455",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Anexa Ruiz Cortines",
        "lat": "32.5167",
        "lng": "-116.9833",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Cañón Rosales",
        "lat": "32.5187",
        "lng": "-117.0874",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa del Real V",
        "lat": "32.36484074074074",
        "lng": "-116.74276296296296",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villa del Real IV",
        "lat": "32.36484074074074",
        "lng": "-116.74276296296296",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Vivienda Magisterial 37",
        "lat": "32.42765",
        "lng": "-116.89255",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento La Rioja Residencial",
        "lat": "32.46521",
        "lng": "-116.87767",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Zona industrial La Jolla",
        "lat": "32.4724",
        "lng": "-116.93590000000002",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Villa Fontana XVIII",
        "lat": "32.36484074074074",
        "lng": "-116.74276296296296",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Cubillas Sur",
        "lat": "32.333975",
        "lng": "-116.8985",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Ampliación Gabriel Rodriguez",
        "lat": "32.3617",
        "lng": "-116.7366",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Martínez",
        "lat": "32.431014285714284",
        "lng": "-116.90294285714286",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Las 2 Palmas",
        "lat": "32.4273",
        "lng": "-117.0268",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Otay Insurgentes",
        "lat": "32.3362",
        "lng": "-116.7472",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Moreno",
        "lat": "32.483293333333336",
        "lng": "-116.81761333333334",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Loma Bonita Norte",
        "lat": "32.48544285714286",
        "lng": "-117.03485714285716",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia La Perla Residencial",
        "lat": "32.4475875",
        "lng": "-116.9742375",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Urbiquinta Marsella",
        "lat": "32.41961428571428",
        "lng": "-117.03117142857144",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Zona industrial Alamar II",
        "lat": "32.5482",
        "lng": "-116.7397",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Rancho 3 Piedras (La Ladrillera)",
        "lat": "32.5075",
        "lng": "-116.79189999999998",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Agraristas",
        "lat": "32.40483636363637",
        "lng": "-116.80335454545455",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Vaim",
        "lat": "32.32389090909091",
        "lng": "-116.8769",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Pegaso II",
        "lat": "32.5482",
        "lng": "-116.7397",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Nuevo Milenio",
        "lat": "32.48544285714286",
        "lng": "-117.03485714285716",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Ciudad Jardín",
        "lat": "32.4345",
        "lng": "-116.9469",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Corona del Mar",
        "lat": "32.5651",
        "lng": "-116.5175",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Reynoso Parcela 162",
        "lat": "32.313233333333336",
        "lng": "-116.70433333333332",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Santa Fe",
        "lat": "32.5007",
        "lng": "-116.8071",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia El Lago",
        "lat": "32.4222",
        "lng": "-117.0664",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia El Porvenir",
        "lat": "32.40483636363637",
        "lng": "-116.80335454545455",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Colas del Matamoros",
        "lat": "32.329181818181816",
        "lng": "-116.68644545454544",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Montes Olímpicos",
        "lat": "32.42098",
        "lng": "-116.97188",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Viñas del Mar",
        "lat": "32.4536",
        "lng": "-117.065",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Sirak M Baloyan",
        "lat": "32.4134",
        "lng": "-116.8441",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Ampliación Lomas Taurinas",
        "lat": "32.3362",
        "lng": "-116.7472",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Patria Nueva",
        "lat": "32.41961428571428",
        "lng": "-117.03117142857144",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia La Ciénega Sur",
        "lat": "32.42765",
        "lng": "-116.89255",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia América",
        "lat": "32.362",
        "lng": "-116.9505",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento El Laurel II",
        "lat": "32.44438571428571",
        "lng": "-116.82194285714286",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia López Leyva",
        "lat": "32.5333",
        "lng": "-116.7333",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Magaña",
        "lat": "32.313233333333336",
        "lng": "-116.70433333333332",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Patrimonial Benito Juárez",
        "lat": "32.4345",
        "lng": "-116.9469",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Veracruz",
        "lat": "32.505406666666666",
        "lng": "-116.76182",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Villegas",
        "lat": "32.350744444444445",
        "lng": "-116.8455",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Pacifico Campestre",
        "lat": "32.4258",
        "lng": "-117.0392",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Punta del Mar",
        "lat": "32.4619",
        "lng": "-117.101",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Chamizal",
        "lat": "32.49023333333333",
        "lng": "-116.76213333333334",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Los Olivos",
        "lat": "32.4317",
        "lng": "-116.85684",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Huertas 2a. Sección",
        "lat": "32.513459999999995",
        "lng": "-116.7722",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Ejido Chilpancingo",
        "lat": "32.5254",
        "lng": "-116.9178",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Otay Colonial",
        "lat": "32.468",
        "lng": "-116.8041",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Rodeo",
        "lat": "32.405",
        "lng": "-116.79970000000002",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Xicoténcatl Leyva (OE)",
        "lat": "32.468",
        "lng": "-116.8041",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Villas del Río",
        "lat": "32.405",
        "lng": "-116.7997",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia López",
        "lat": "32.483293333333336",
        "lng": "-116.81761333333334",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Castro",
        "lat": "32.44844615384615",
        "lng": "-116.87156923076924",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Santa Paula",
        "lat": "32.40490714285714",
        "lng": "-116.79287857142856",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Ampliación Loma Bonita",
        "lat": "32.3617",
        "lng": "-116.7366",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Paraíso del Río",
        "lat": "32.405",
        "lng": "-116.7997",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Guadalajara",
        "lat": "32.47284285714286",
        "lng": "-117.00107142857144",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Santa Mónica",
        "lat": "32.4193",
        "lng": "-116.99101428571429",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Playas de Tijuana Sección Costa",
        "lat": "32.44551666666667",
        "lng": "-116.96688333333334",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Fraccionamiento Bonaterra",
        "lat": "32.466",
        "lng": "-116.6881",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Antorcha II",
        "lat": "32.4589",
        "lng": "-117.10765",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia La Joya Este",
        "lat": "32.44844615384615",
        "lng": "-116.87156923076924",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Anexa Pro Hogar",
        "lat": "32.3557",
        "lng": "-116.8121",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Soler",
        "lat": "32.4538",
        "lng": "-116.9963",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Playas de Tijuana Sección Costa de Oro",
        "lat": "32.4538",
        "lng": "-116.9963",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Colonia Delicias",
        "lat": "32.4089",
        "lng": "-116.9436",
        "per": 1,
        "size": 0.01
    },
    {
        "city": "Unidad habitacional Alba Roja",
        "lat": "32.405",
        "lng": "-116.7997",
        "per": 10,
        "size": 0.01
    },
    {
        "city": "Colonia Valle Verde",
        "lat": "32.329181818181816",
        "lng": "-116.68644545454544",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Lomas de Agua Caliente 6a Sección (Lomas Altas)",
        "lat": "32.4248",
        "lng": "-116.89830000000002",
        "per": 5,
        "size": 0.01
    },
    {
        "city": "Colonia Real de San Antonio",
        "lat": "32.4718",
        "lng": "-116.86178571428572",
        "per": 1,
        "size": 0.01
    }
]

export const demoMapLevelStats = [
    {
        "city": "Colonia Centro Urbano 70-76",
        "lat": 32.5333,
        "lng": -116.7333,
        "city_score": 0.3,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Residencial Los Abedules",
        "lat": 32.2572,
        "lng": -116.746,
        "city_score": 0.1,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Ramos Sur",
        "lat": 32.513459999999995,
        "lng": -116.7722,
        "city_score": 0.3,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia La Sierra",
        "lat": 32.36538,
        "lng": -116.81364,
        "city_score": 0.3,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Planetario",
        "lat": 32.4248,
        "lng": -116.89830000000002,
        "city_score": 0.7,
        "city_size": 0.85,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Terrazas La Morita",
        "lat": 32.44438571428571,
        "lng": -116.82194285714286,
        "city_score": 0.4,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Vista del Río",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.4,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Misión de las Californias",
        "lat": 32.3617,
        "lng": -116.7366,
        "city_score": 1.0,
        "city_size": 0.8,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Ejido Francisco Villa",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.6,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa Fontana VIII",
        "lat": 32.47053636363636,
        "lng": -116.8684,
        "city_score": 0.3,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Puerta del Río",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.4,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Zona militar 28 Batallón de Infantería",
        "lat": 32.350744444444445,
        "lng": -116.8455,
        "city_score": 0.7,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia De los Maestros",
        "lat": 32.48574166666666,
        "lng": -116.88399166666666,
        "city_score": 0.7,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Centro Comercial Otay",
        "lat": 32.3362,
        "lng": -116.7472,
        "city_score": 0.5,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Colinas de la Presa",
        "lat": 32.43026666666666,
        "lng": -116.90063333333332,
        "city_score": 0.2,
        "city_size": 0.15,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Rincón Colonial Chapultepec",
        "lat": 32.50418888888888,
        "lng": -116.99482222222224,
        "city_score": 0.9,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Ramírez",
        "lat": 32.44844615384615,
        "lng": -116.87156923076924,
        "city_score": 0.7,
        "city_size": 0.85,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento San Antonio Club Hípico y de Golf",
        "lat": 32.4258,
        "lng": -117.0392,
        "city_score": 0.6,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Monterrey",
        "lat": 32.47284285714286,
        "lng": -117.00107142857144,
        "city_score": 0.2,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Sanchez Taboada IV",
        "lat": 32.40616666666667,
        "lng": -116.75873333333334,
        "city_score": 0.6,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento García",
        "lat": 32.4194,
        "lng": -116.92279999999998,
        "city_score": 0.7,
        "city_size": 0.85,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Unión",
        "lat": 32.43723333333333,
        "lng": -116.93746666666668,
        "city_score": 0.4,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Santa Anita",
        "lat": 32.40154444444445,
        "lng": -116.83006666666668,
        "city_score": 0.9,
        "city_size": 0.8,
        "description": [
            null
        ]
    },
    {
        "city": "Condominio Real de La Frontera",
        "lat": 32.5254,
        "lng": -116.9178,
        "city_score": 0.4,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Insurgentes",
        "lat": 32.405,
        "lng": -116.79970000000002,
        "city_score": 0.8,
        "city_size": 0.8,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Lomas del Pedregal",
        "lat": 32.49058888888889,
        "lng": -116.78061111111111,
        "city_score": 0.1,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Campos",
        "lat": 32.431014285714284,
        "lng": -116.90294285714286,
        "city_score": 0.0,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Guadalupe Victoria",
        "lat": 32.35883333333333,
        "lng": -116.7714,
        "city_score": 0.6,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Patria Nueva",
        "lat": 32.41961428571428,
        "lng": -117.03117142857144,
        "city_score": 0.1,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Presa Rodriguez",
        "lat": 32.4516,
        "lng": -116.9109,
        "city_score": 0.0,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Cañón de La Pedrera Este",
        "lat": 32.4248,
        "lng": -116.8983,
        "city_score": 0.2,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Jardines de Chapultepec",
        "lat": 32.48452857142858,
        "lng": -116.96044285714288,
        "city_score": 0.5,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Bugambilias (Jacarandas)",
        "lat": 32.4222,
        "lng": -117.0664,
        "city_score": 0.3,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Pórticos del Lago",
        "lat": 32.41961428571428,
        "lng": -117.03117142857144,
        "city_score": 0.1,
        "city_size": 0.15,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Anexa Magisterial",
        "lat": 32.5482,
        "lng": -116.7397,
        "city_score": 0.2,
        "city_size": 0.15,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Rancho Rivera",
        "lat": 32.4667,
        "lng": -116.7769,
        "city_score": 0.4,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Los Españoles",
        "lat": 32.490966666666665,
        "lng": -116.6942,
        "city_score": 0.6,
        "city_size": 0.8,
        "description": [
            null
        ]
    },
    {
        "city": "Zona industrial Fideicomiso el Florido",
        "lat": 32.05833333333333,
        "lng": -116.678175,
        "city_score": 0.3,
        "city_size": 0.15,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Kino II",
        "lat": 32.40472307692308,
        "lng": -116.8058846153846,
        "city_score": 0.9,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Residencial La Esperanza",
        "lat": 32.48574166666666,
        "lng": -116.88399166666666,
        "city_score": 0.3,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Cañón Tampico",
        "lat": 32.4742,
        "lng": -116.8065142857143,
        "city_score": 0.7,
        "city_size": 0.8,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa Residencial Santa Fe 5a Sección",
        "lat": 32.4306,
        "lng": -117.025,
        "city_score": 0.7,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Jalisco",
        "lat": 32.513459999999995,
        "lng": -116.7722,
        "city_score": 0.2,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Anexa 20 de Noviembre",
        "lat": 32.4424,
        "lng": -116.7405,
        "city_score": 0.8,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Vaim",
        "lat": 32.32389090909091,
        "lng": -116.8769,
        "city_score": 0.4,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Las Huertas 5a Sección",
        "lat": 32.431014285714284,
        "lng": -116.90294285714286,
        "city_score": 0.7,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Paseo Santa María",
        "lat": 32.05833333333333,
        "lng": -116.678175,
        "city_score": 0.0,
        "city_size": 0.05,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia San Antonio Oeste",
        "lat": 32.32389090909091,
        "lng": -116.8769,
        "city_score": 0.7,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia El Chicote",
        "lat": 32.4252,
        "lng": -116.9955,
        "city_score": 0.1,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Mar Vista",
        "lat": 32.4386,
        "lng": -116.9661,
        "city_score": 0.4,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia María Medina",
        "lat": 32.43768333333333,
        "lng": -116.82155,
        "city_score": 0.7,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Equipamiento Campo de Golf",
        "lat": 32.50418888888888,
        "lng": -116.99482222222224,
        "city_score": 1.0,
        "city_size": 1.0,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Las Américas",
        "lat": 32.419415384615384,
        "lng": -117.02846153846154,
        "city_score": 0.3,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa Fontana II",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.0,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa del Sol I",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.2,
        "city_size": 0.1,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Paseos del Pacífico",
        "lat": 32.46521,
        "lng": -116.87767,
        "city_score": 0.3,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Los Girasoles",
        "lat": 32.4732,
        "lng": -116.8046,
        "city_score": 0.7,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Camino Real",
        "lat": 32.40154444444445,
        "lng": -116.83006666666668,
        "city_score": 0.6,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Magaña",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.8,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Arboledas",
        "lat": 32.42765,
        "lng": -116.89255,
        "city_score": 0.6,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Costa Dorada",
        "lat": 32.4391,
        "lng": -116.99188333333336,
        "city_score": 1.0,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Hacienda las Fuentes",
        "lat": 32.05833333333333,
        "lng": -116.678175,
        "city_score": 0.9,
        "city_size": 0.85,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Los Álamos",
        "lat": 32.37725,
        "lng": -116.69665,
        "city_score": 0.4,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa del Real XI",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 1.0,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Leonardo Rodriguez Alcaine",
        "lat": 32.4475875,
        "lng": -116.9742375,
        "city_score": 0.7,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Los Arenales A",
        "lat": 32.4667,
        "lng": -116.7769,
        "city_score": 0.7,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Magisterial",
        "lat": 32.5482,
        "lng": -116.7397,
        "city_score": 0.5,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Valle Redondo",
        "lat": 32.5007,
        "lng": -116.8071,
        "city_score": 0.9,
        "city_size": 0.85,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Ejido Matamoros",
        "lat": 32.329181818181816,
        "lng": -116.68644545454544,
        "city_score": 0.9,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Colima",
        "lat": 32.40616666666667,
        "lng": -116.75873333333334,
        "city_score": 0.7,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Alfredo Ames",
        "lat": 32.4252,
        "lng": -116.9955,
        "city_score": 0.4,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Santa Paula",
        "lat": 32.40490714285714,
        "lng": -116.79287857142856,
        "city_score": 0.8,
        "city_size": 0.9,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Azcona",
        "lat": 32.450525,
        "lng": -116.721025,
        "city_score": 0.4,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Colinas del Sol",
        "lat": 32.4647,
        "lng": -117.0425,
        "city_score": 0.5,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Herrera",
        "lat": 32.43723333333333,
        "lng": -116.93746666666668,
        "city_score": 0.2,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Patrimonio Alamar",
        "lat": 32.44583333333333,
        "lng": -116.7912,
        "city_score": 0.8,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa del Real V",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.6,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Obrera 2a Sección",
        "lat": 32.4345,
        "lng": -116.9469,
        "city_score": 0.6,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa Fontana XI",
        "lat": 32.47053636363636,
        "lng": -116.8684,
        "city_score": 0.8,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Arenales B",
        "lat": 32.4667,
        "lng": -116.7769,
        "city_score": 1.0,
        "city_size": 1.0,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Santa Fe",
        "lat": 32.505406666666666,
        "lng": -116.76182,
        "city_score": 0.0,
        "city_size": 0.0,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Anexa Internacional",
        "lat": 32.48574166666666,
        "lng": -116.88399166666666,
        "city_score": 0.8,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Las Fuentes",
        "lat": 32.505406666666666,
        "lng": -116.76182,
        "city_score": 0.4,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Obrera 3a Sección",
        "lat": 32.4345,
        "lng": -116.9469,
        "city_score": 0.1,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Contreras",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.4,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Tona",
        "lat": 32.4516,
        "lng": -116.9109,
        "city_score": 0.2,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Hacienda las Flores",
        "lat": 32.43455,
        "lng": -116.9743,
        "city_score": 0.0,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Anexo los Laureles",
        "lat": 32.4742,
        "lng": -116.8065142857143,
        "city_score": 0.7,
        "city_size": 0.8,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Manuel Paredes II",
        "lat": 32.4345,
        "lng": -116.9469,
        "city_score": 0.2,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Felipa Velázquez",
        "lat": 32.4103,
        "lng": -116.836,
        "city_score": 0.8,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Reacomodo Obras Publicas",
        "lat": 32.4252,
        "lng": -117.0099,
        "city_score": 0.8,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Lomas de Agua Caliente",
        "lat": 32.5167,
        "lng": -117.0167,
        "city_score": 0.9,
        "city_size": 0.9,
        "description": [
            null
        ]
    },
    {
        "city": "Unidad habitacional Fidel Velázquez",
        "lat": 32.40483636363637,
        "lng": -116.80335454545455,
        "city_score": 0.4,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa del Real I",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.7,
        "city_size": 0.8,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Granjas Buenos Aires Sección La Palma",
        "lat": 32.3915,
        "lng": -116.9576,
        "city_score": 0.5,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Morelos",
        "lat": 32.445366666666665,
        "lng": -116.732,
        "city_score": 0.8,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Lomas de Agua Caliente 6a Sección (Lomas Altas)",
        "lat": 32.4248,
        "lng": -116.89830000000002,
        "city_score": 0.3,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Panamericano",
        "lat": 32.466,
        "lng": -116.6881,
        "city_score": 1.0,
        "city_size": 1.0,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Florido Viejo",
        "lat": 32.49058888888889,
        "lng": -116.78061111111111,
        "city_score": 0.2,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Alcalá",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.1,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Hacienda del Pacifico",
        "lat": 32.46521,
        "lng": -116.87767,
        "city_score": 0.1,
        "city_size": 0.1,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Altabrisa",
        "lat": 32.3362,
        "lng": -116.7472,
        "city_score": 0.3,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Hacienda las Delicias III",
        "lat": 32.3915,
        "lng": -116.9576,
        "city_score": 0.9,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Garita Otay",
        "lat": 32.468,
        "lng": -116.8041,
        "city_score": 0.7,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Dávila",
        "lat": 32.362,
        "lng": -116.9505,
        "city_score": 1.0,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Zona industrial Valle Bonito",
        "lat": 32.4256,
        "lng": -116.8831,
        "city_score": 0.9,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Camino Verde (Cañada Verde)",
        "lat": 32.4103,
        "lng": -116.836,
        "city_score": 0.5,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Residencial El Fuerte",
        "lat": 32.41961428571428,
        "lng": -117.03117142857144,
        "city_score": 0.9,
        "city_size": 0.8,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia I Ayuntamiento",
        "lat": 32.4345,
        "lng": -116.9469,
        "city_score": 0.7,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Salvatierra",
        "lat": 32.3,
        "lng": -116.91670000000002,
        "city_score": 0.0,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia El Realito",
        "lat": 32.4256,
        "lng": -116.8831,
        "city_score": 0.6,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Las 2 Palmas",
        "lat": 32.4273,
        "lng": -117.0268,
        "city_score": 0.7,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Rinconada de Otay",
        "lat": 32.4089,
        "lng": -116.9436,
        "city_score": 0.8,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa Fontana IV",
        "lat": 32.47053636363636,
        "lng": -116.8684,
        "city_score": 0.3,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Plan de Barranquitas",
        "lat": 32.496766666666666,
        "lng": -116.79406666666668,
        "city_score": 0.9,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Lagunitas",
        "lat": 32.44055,
        "lng": -116.84985,
        "city_score": 0.3,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento El Laurel I",
        "lat": 32.44438571428571,
        "lng": -116.82194285714286,
        "city_score": 0.3,
        "city_size": 0.15,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Calete",
        "lat": 32.362,
        "lng": -116.9505,
        "city_score": 0.9,
        "city_size": 0.95,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Residencial Agua Caliente",
        "lat": 32.4317,
        "lng": -116.85684,
        "city_score": 0.8,
        "city_size": 0.8,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Colinas de la Presa Sección Montebello",
        "lat": 32.43026666666666,
        "lng": -116.90063333333332,
        "city_score": 0.6,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Playas de Tijuana Sección Jardines del Sol",
        "lat": 32.4475875,
        "lng": -116.9742375,
        "city_score": 0.0,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Praderas de La Mesa",
        "lat": 32.40483636363637,
        "lng": -116.80335454545455,
        "city_score": 0.9,
        "city_size": 0.85,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Granjas Familiares de Matamoros",
        "lat": 32.3617,
        "lng": -116.7366,
        "city_score": 0.2,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa Fontana V",
        "lat": 32.47053636363636,
        "lng": -116.8684,
        "city_score": 0.2,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Playas de Tijuana Sección Triangulo de Oro",
        "lat": 32.4538,
        "lng": -116.9963,
        "city_score": 0.4,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Misión del Sol",
        "lat": 32.4538,
        "lng": -116.9963,
        "city_score": 0.2,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Cuesta Blanca",
        "lat": 32.4273,
        "lng": -117.0268,
        "city_score": 0.3,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Las Palmas",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.2,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Villa Cruz",
        "lat": 32.40483636363637,
        "lng": -116.80335454545455,
        "city_score": 0.2,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Cuauhtémoc",
        "lat": 32.496766666666666,
        "lng": -116.79406666666668,
        "city_score": 0.2,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Rubí Aguadores",
        "lat": 32.4345,
        "lng": -116.9469,
        "city_score": 0.8,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Jardines de Agua Caliente",
        "lat": 32.4317,
        "lng": -116.85684,
        "city_score": 0.3,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Hacienda Las Delicias",
        "lat": 32.3915,
        "lng": -116.9576,
        "city_score": 0.9,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Cañón de las Rosas",
        "lat": 32.4724,
        "lng": -116.9359,
        "city_score": 0.7,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Santa Elena",
        "lat": 32.32389090909091,
        "lng": -116.8769,
        "city_score": 0.5,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Chapultepec 8a Sección",
        "lat": 32.50418888888888,
        "lng": -116.99482222222224,
        "city_score": 0.1,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Camino Viejo",
        "lat": 32.4194,
        "lng": -116.92279999999998,
        "city_score": 0.8,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Playas de Tijuana Sección Costa de Oro",
        "lat": 32.4538,
        "lng": -116.9963,
        "city_score": 0.9,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa Fontana X",
        "lat": 32.47053636363636,
        "lng": -116.8684,
        "city_score": 0.0,
        "city_size": 0.1,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Rancho 3 Piedras (La Ladrillera)",
        "lat": 32.5075,
        "lng": -116.79189999999998,
        "city_score": 0.9,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Nuevo Milenio",
        "lat": 32.48544285714286,
        "lng": -117.03485714285716,
        "city_score": 0.6,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Natura Sección Vistas del Sol",
        "lat": 32.3915,
        "lng": -116.9576,
        "city_score": 0.2,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Vista Azul",
        "lat": 32.4589,
        "lng": -117.10765,
        "city_score": 0.6,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Aviación",
        "lat": 32.496766666666666,
        "lng": -116.79406666666668,
        "city_score": 0.4,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Sección Campestre",
        "lat": 32.4193,
        "lng": -116.99101428571429,
        "city_score": 0.3,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Zona industrial Valle Sur",
        "lat": 32.48544285714286,
        "lng": -117.03485714285716,
        "city_score": 0.5,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Ampliación Salvatierra",
        "lat": 32.3,
        "lng": -116.91670000000002,
        "city_score": 0.9,
        "city_size": 0.9,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Estrella del Pacífico",
        "lat": 32.4391,
        "lng": -116.99188333333336,
        "city_score": 0.1,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Ignacio Zaragoza",
        "lat": 32.22461428571428,
        "lng": -116.53342857142856,
        "city_score": 0.3,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia 10 de Mayo",
        "lat": 32.5482,
        "lng": -116.7397,
        "city_score": 0.2,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Hábitat Piedras Blancas",
        "lat": 32.4256,
        "lng": -116.8831,
        "city_score": 0.6,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Cerro II",
        "lat": 32.40472307692308,
        "lng": -116.8058846153846,
        "city_score": 0.3,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Altamira",
        "lat": 32.4041,
        "lng": -116.8198,
        "city_score": 0.0,
        "city_size": 0.05,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Lázaro Cárdenas 3ra Mesa",
        "lat": 32.4386,
        "lng": -116.9661,
        "city_score": 0.2,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Jardines del Rubí",
        "lat": 32.3557,
        "lng": -116.8121,
        "city_score": 0.4,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Chihuahua",
        "lat": 32.4193,
        "lng": -116.88335,
        "city_score": 0.9,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento La Cúspide",
        "lat": 32.4983,
        "lng": -117.1207,
        "city_score": 0.2,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Héroes de Independencia",
        "lat": 32.47053636363636,
        "lng": -116.8684,
        "city_score": 0.8,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Pórticos de La Mesa",
        "lat": 32.405,
        "lng": -116.79970000000002,
        "city_score": 0.4,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa del Real VI",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.8,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Rubio",
        "lat": 32.513459999999995,
        "lng": -116.7722,
        "city_score": 0.9,
        "city_size": 0.9,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento La Muralla",
        "lat": 32.44438571428571,
        "lng": -116.82194285714286,
        "city_score": 0.2,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Ojo de Agua",
        "lat": 32.49058888888889,
        "lng": -116.78061111111111,
        "city_score": 0.6,
        "city_size": 0.8,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Loma Dorada",
        "lat": 32.41961428571428,
        "lng": -117.03117142857144,
        "city_score": 0.4,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Lomas de La Amistad",
        "lat": 32.406580000000005,
        "lng": -116.74652,
        "city_score": 0.5,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Hidalgo",
        "lat": 32.445366666666665,
        "lng": -116.732,
        "city_score": 0.6,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Fernández",
        "lat": 32.4667,
        "lng": -116.7769,
        "city_score": 0.7,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Anáhuac",
        "lat": 32.483293333333336,
        "lng": -116.81761333333334,
        "city_score": 0.9,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Los Ángeles",
        "lat": 32.483293333333336,
        "lng": -116.81761333333334,
        "city_score": 0.3,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento La Rioja Residencial",
        "lat": 32.46521,
        "lng": -116.87767,
        "city_score": 0.9,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Mesetas del Guaycura",
        "lat": 32.41961428571428,
        "lng": -117.03117142857144,
        "city_score": 0.8,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Rancho Santa Cruz",
        "lat": 32.433260000000004,
        "lng": -116.87776999999998,
        "city_score": 0.8,
        "city_size": 0.8,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Quinta Versalles",
        "lat": 32.4306,
        "lng": -117.025,
        "city_score": 0.1,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Rancho el Grande",
        "lat": 32.48452857142858,
        "lng": -116.96044285714288,
        "city_score": 0.2,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Guerrero",
        "lat": 32.450525,
        "lng": -116.721025,
        "city_score": 0.9,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia La Fuente del Valle",
        "lat": 32.5075,
        "lng": -116.79189999999998,
        "city_score": 0.4,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia 3 de Octubre",
        "lat": 32.431574999999995,
        "lng": -116.904675,
        "city_score": 0.5,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villas del Dorado",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.0,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa Residencial Santa Fe 1a Sección",
        "lat": 32.4391,
        "lng": -116.99188333333336,
        "city_score": 0.6,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia El Ranchito",
        "lat": 32.431574999999995,
        "lng": -116.904675,
        "city_score": 0.4,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Conjunto Residencial Cataviña",
        "lat": 32.48452857142858,
        "lng": -116.96044285714288,
        "city_score": 0.2,
        "city_size": 0.15,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Agraristas",
        "lat": 32.40483636363637,
        "lng": -116.80335454545455,
        "city_score": 0.2,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Alfonso Garzón",
        "lat": 32.5333,
        "lng": -116.7333,
        "city_score": 0.6,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Genaro Vázquez",
        "lat": 32.43449999999999,
        "lng": -116.9582888888889,
        "city_score": 1.0,
        "city_size": 0.95,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Juárez",
        "lat": 32.38305,
        "lng": -116.88515,
        "city_score": 0.9,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Unidad habitacional INDECO Universidad",
        "lat": 32.22461428571428,
        "lng": -116.53342857142856,
        "city_score": 0.0,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Las Plazas",
        "lat": 32.48574166666666,
        "lng": -116.88399166666666,
        "city_score": 0.9,
        "city_size": 0.9,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa del Prado",
        "lat": 32.433260000000004,
        "lng": -116.87776999999998,
        "city_score": 0.2,
        "city_size": 0.15,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Lomas del Mar",
        "lat": 32.4536,
        "lng": -117.065,
        "city_score": 0.7,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Las Californias",
        "lat": 32.4604,
        "lng": -116.90155,
        "city_score": 0.6,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Río Tijuana 3a Etapa",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.9,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Buena Vista",
        "lat": 32.49023333333333,
        "lng": -116.76213333333334,
        "city_score": 0.5,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Gabilondo",
        "lat": 32.362,
        "lng": -116.9505,
        "city_score": 0.2,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Residencial La Esmeralda",
        "lat": 32.48574166666666,
        "lng": -116.88399166666666,
        "city_score": 0.2,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Privada Hacienda Córdoba",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.4,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Guaycura",
        "lat": 32.4222,
        "lng": -117.0664,
        "city_score": 0.0,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa Fontana XIV",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.6,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Ignacio Ramírez",
        "lat": 32.40490714285714,
        "lng": -116.79287857142856,
        "city_score": 1.0,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa del Sol IV",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.6,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Hacienda Santa María",
        "lat": 32.05833333333333,
        "lng": -116.678175,
        "city_score": 0.9,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia El Olivar",
        "lat": 32.4194,
        "lng": -116.92279999999998,
        "city_score": 0.9,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Lomas Villas",
        "lat": 32.40490714285714,
        "lng": -116.79287857142856,
        "city_score": 0.9,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia INFONAVIT Lomas Verdes",
        "lat": 32.431014285714284,
        "lng": -116.90294285714286,
        "city_score": 0.7,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Emperadores",
        "lat": 32.505406666666666,
        "lng": -116.76182,
        "city_score": 0.1,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Ampliación Sanchez Taboada",
        "lat": 32.40616666666667,
        "lng": -116.75873333333334,
        "city_score": 0.3,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Lomas Conjunto Residencial",
        "lat": 32.513459999999995,
        "lng": -116.7722,
        "city_score": 0.5,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Roma",
        "lat": 32.4041,
        "lng": -116.8198,
        "city_score": 1.0,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Herradura Sur",
        "lat": 32.4248,
        "lng": -116.8983,
        "city_score": 0.7,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Aguaje de La Tuna 2a Sección",
        "lat": 32.48574166666666,
        "lng": -116.88399166666666,
        "city_score": 0.9,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Ampliación Loma Bonita",
        "lat": 32.3617,
        "lng": -116.7366,
        "city_score": 0.4,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia América",
        "lat": 32.362,
        "lng": -116.9505,
        "city_score": 0.9,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Unidad habitacional FOVISSSTE",
        "lat": 32.4089,
        "lng": -116.9436,
        "city_score": 0.4,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Plaza Otay",
        "lat": 32.46782,
        "lng": -116.79802,
        "city_score": 0.2,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa Fontana I",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.9,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Valle del Pedregal",
        "lat": 32.40490714285714,
        "lng": -116.79287857142856,
        "city_score": 0.7,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Escolar Agua Caliente",
        "lat": 32.496766666666666,
        "lng": -116.79406666666668,
        "city_score": 0.7,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Zona industrial Industrial Pacífico II",
        "lat": 32.43449999999999,
        "lng": -116.9582888888889,
        "city_score": 0.1,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Mineral de Santa Fe",
        "lat": 32.5333,
        "lng": -116.7333,
        "city_score": 0.3,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Castro Green",
        "lat": 32.431014285714284,
        "lng": -116.90294285714286,
        "city_score": 0.1,
        "city_size": 0.15,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Urbi Quinta del Cedro",
        "lat": 32.4536,
        "lng": -117.065,
        "city_score": 0.8,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Residencial San Marino",
        "lat": 32.4258,
        "lng": -117.0392,
        "city_score": 0.4,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Brisa Marina",
        "lat": 32.3,
        "lng": -116.91670000000002,
        "city_score": 1.0,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Internacional",
        "lat": 32.48574166666666,
        "lng": -116.88399166666666,
        "city_score": 0.1,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Monte Bello",
        "lat": 32.40154444444445,
        "lng": -116.83006666666668,
        "city_score": 0.2,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia López Lucio",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.7,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia El Progreso",
        "lat": 32.4193,
        "lng": -116.88335,
        "city_score": 0.9,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia La Escondida",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.2,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Zona Este",
        "lat": 32.4179,
        "lng": -116.87213333333334,
        "city_score": 0.6,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Cañón de La Pedrera",
        "lat": 32.4248,
        "lng": -116.8983,
        "city_score": 0.3,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa Residencial Santa Fe 3a Sección",
        "lat": 32.4252,
        "lng": -116.9955,
        "city_score": 0.5,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Villa de Alcázar",
        "lat": 32.4194,
        "lng": -116.92279999999998,
        "city_score": 0.7,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Modesto Ponce",
        "lat": 32.3,
        "lng": -116.91670000000002,
        "city_score": 0.2,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Chapultepec 9a Sección",
        "lat": 32.50418888888888,
        "lng": -116.99482222222224,
        "city_score": 0.9,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Chula Vista",
        "lat": 32.333975,
        "lng": -116.8985,
        "city_score": 0.6,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Hipódromo",
        "lat": 32.50418888888888,
        "lng": -116.99482222222224,
        "city_score": 0.5,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Castillo",
        "lat": 32.466,
        "lng": -116.6881,
        "city_score": 0.6,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Loma Bonita",
        "lat": 32.3617,
        "lng": -116.7366,
        "city_score": 0.1,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Cañón del Matadero Norte",
        "lat": 32.4538,
        "lng": -116.9963,
        "city_score": 0.5,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Zona industrial Internacional Tijuana",
        "lat": 32.4776,
        "lng": -117.0087,
        "city_score": 0.5,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Hacienda Acueducto",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.8,
        "city_size": 0.9,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Cerro Colorado",
        "lat": 32.40472307692308,
        "lng": -116.8058846153846,
        "city_score": 0.8,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Residencial Isla Cedros",
        "lat": 32.4718,
        "lng": -116.86178571428572,
        "city_score": 0.1,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Pedregal de Santa Julia",
        "lat": 32.48544285714286,
        "lng": -117.03485714285716,
        "city_score": 0.4,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Alberto Bustamante",
        "lat": 32.4386,
        "lng": -116.9661,
        "city_score": 0.9,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia División del Norte",
        "lat": 32.43768333333333,
        "lng": -116.82155,
        "city_score": 0.9,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Sánchez Díaz",
        "lat": 32.48574166666666,
        "lng": -116.88399166666666,
        "city_score": 0.4,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Otay Colonial",
        "lat": 32.468,
        "lng": -116.8041,
        "city_score": 0.8,
        "city_size": 0.9,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa del Real VII",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.0,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Valle Dorado",
        "lat": 32.433260000000004,
        "lng": -116.87776999999998,
        "city_score": 0.7,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Santa Rosa",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.2,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Cañón Primavera",
        "lat": 32.4248,
        "lng": -116.8983,
        "city_score": 0.4,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Baja Malibú",
        "lat": 32.425200000000004,
        "lng": -117.094875,
        "city_score": 0.5,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Portezuelos",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.9,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Divina Providencia",
        "lat": 32.4724,
        "lng": -116.93590000000002,
        "city_score": 0.5,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Palma Real",
        "lat": 32.391549999999995,
        "lng": -116.95765,
        "city_score": 0.7,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Las Huertas 4a Sección",
        "lat": 32.505406666666666,
        "lng": -116.76182,
        "city_score": 0.9,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa del Sol V",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.3,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Rincón Toscano",
        "lat": 32.47284285714286,
        "lng": -117.00107142857144,
        "city_score": 0.6,
        "city_size": 0.8,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Anexa Divina Providencia",
        "lat": 32.4724,
        "lng": -116.93590000000002,
        "city_score": 0.1,
        "city_size": 0.1,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Colinas de Cortés",
        "lat": 32.37,
        "lng": -116.6345,
        "city_score": 0.1,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia 18 de Marzo",
        "lat": 32.42765,
        "lng": -116.89255,
        "city_score": 1.0,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Maestros Universitarios",
        "lat": 32.4089,
        "lng": -116.9436,
        "city_score": 0.0,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Patrimonial Benito Juárez",
        "lat": 32.4345,
        "lng": -116.9469,
        "city_score": 0.9,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Otay Constituyentes",
        "lat": 32.4089,
        "lng": -116.9436,
        "city_score": 0.4,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia El Florido IV",
        "lat": 32.05833333333333,
        "lng": -116.678175,
        "city_score": 0.6,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Ampliación Reforma",
        "lat": 32.406580000000005,
        "lng": -116.74652,
        "city_score": 0.5,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa del Real X",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.7,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Meseta del Chema",
        "lat": 32.405,
        "lng": -116.79970000000002,
        "city_score": 0.1,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Colinas San Rafael",
        "lat": 32.433260000000004,
        "lng": -116.87776999999998,
        "city_score": 1.0,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Melchor Ocampo",
        "lat": 32.506625,
        "lng": -116.690575,
        "city_score": 0.0,
        "city_size": 0.0,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Carmen Castillo",
        "lat": 32.37,
        "lng": -116.6345,
        "city_score": 0.6,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia La Remosa",
        "lat": 32.421842857142856,
        "lng": -116.88708571428572,
        "city_score": 0.0,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Otay Jardín",
        "lat": 32.22461428571428,
        "lng": -116.53342857142856,
        "city_score": 1.0,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento San Quintín",
        "lat": 32.46521,
        "lng": -116.87767,
        "city_score": 0.4,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Valle de las Palmas",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.8,
        "city_size": 0.9,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento El Florido Sección Colinas",
        "lat": 32.49058888888889,
        "lng": -116.78061111111111,
        "city_score": 0.4,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia San Jerónimo",
        "lat": 32.48452857142858,
        "lng": -116.96044285714288,
        "city_score": 0.7,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Lomas del Valle",
        "lat": 32.5075,
        "lng": -116.79189999999998,
        "city_score": 0.0,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia La Ciénega Poniente",
        "lat": 32.32389090909091,
        "lng": -116.8769,
        "city_score": 0.3,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Condominio Privada San Miguel",
        "lat": 32.44583333333333,
        "lng": -116.7912,
        "city_score": 0.6,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Unidad habitacional Capistrano INFONAVIT",
        "lat": 32.40472307692308,
        "lng": -116.8058846153846,
        "city_score": 0.3,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Villa Colonial",
        "lat": 32.4317,
        "lng": -116.85684,
        "city_score": 0.7,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia La Isla",
        "lat": 32.4538,
        "lng": -116.9963,
        "city_score": 0.2,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Cañón Miramar",
        "lat": 32.4724,
        "lng": -116.9359,
        "city_score": 0.7,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Cañón el Salado",
        "lat": 32.513459999999995,
        "lng": -116.7722,
        "city_score": 0.9,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Natura Sección Bosques",
        "lat": 32.3915,
        "lng": -116.9576,
        "city_score": 0.6,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia El Florido 2a. Sección",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.1,
        "city_size": 0.1,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento San Carlos",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 1.0,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Puerta de Hierro",
        "lat": 32.5167,
        "lng": -117.0167,
        "city_score": 0.9,
        "city_size": 0.8,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Loma Bonita Norte",
        "lat": 32.48544285714286,
        "lng": -117.03485714285716,
        "city_score": 0.3,
        "city_size": 0.15,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia El Mirador",
        "lat": 32.4742,
        "lng": -116.8065142857143,
        "city_score": 0.0,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Campestre La Gloria",
        "lat": 32.4462,
        "lng": -117.001,
        "city_score": 0.3,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa Bonita",
        "lat": 32.40490714285714,
        "lng": -116.79287857142856,
        "city_score": 0.5,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Real del Monte",
        "lat": 32.40154444444445,
        "lng": -116.83006666666668,
        "city_score": 0.8,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Terrazas del Valle 2a Sección",
        "lat": 32.5075,
        "lng": -116.79189999999998,
        "city_score": 0.3,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Cañón de La Raza",
        "lat": 32.40483636363637,
        "lng": -116.80335454545455,
        "city_score": 0.7,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Electricistas",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.7,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Valle Vista 1a Sección",
        "lat": 32.506625,
        "lng": -116.690575,
        "city_score": 0.9,
        "city_size": 0.85,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Gerónimo Meza",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.5,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento El Águila",
        "lat": 32.419415384615384,
        "lng": -117.02846153846154,
        "city_score": 0.8,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Zona Centro",
        "lat": 32.4179,
        "lng": -116.87213333333334,
        "city_score": 0.2,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Los Naranjos",
        "lat": 32.43026666666666,
        "lng": -116.90063333333332,
        "city_score": 0.3,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Guillen",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.8,
        "city_size": 0.8,
        "description": [
            null
        ]
    },
    {
        "city": "Condominio Mar Vista",
        "lat": 32.4742,
        "lng": -116.8065142857143,
        "city_score": 0.6,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Banus Residencial",
        "lat": 32.43449999999999,
        "lng": -116.9582888888889,
        "city_score": 0.9,
        "city_size": 0.85,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Ceceña",
        "lat": 32.483293333333336,
        "lng": -116.81761333333334,
        "city_score": 0.0,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Burócrata Ruiz Cortines",
        "lat": 32.5167,
        "lng": -116.9833,
        "city_score": 1.0,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia La Ciénega Sur",
        "lat": 32.42765,
        "lng": -116.89255,
        "city_score": 0.8,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Anexa Roma",
        "lat": 32.4345,
        "lng": -116.9469,
        "city_score": 0.4,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Unidad habitacional Presidentes",
        "lat": 32.419415384615384,
        "lng": -117.02846153846154,
        "city_score": 0.0,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Reynoso Parcela 162",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 1.0,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Chapultepec 10a Sección",
        "lat": 32.50418888888888,
        "lng": -116.99482222222224,
        "city_score": 0.1,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Bosques de La Presa",
        "lat": 32.43026666666666,
        "lng": -116.90063333333332,
        "city_score": 0.6,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia FOVISSSTE V",
        "lat": 32.46782,
        "lng": -116.79802,
        "city_score": 0.7,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villas del Río",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.4,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Marrón",
        "lat": 32.496766666666666,
        "lng": -116.79406666666668,
        "city_score": 0.7,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Lomas Misión",
        "lat": 32.4538,
        "lng": -116.9963,
        "city_score": 0.6,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Libertad",
        "lat": 32.5167,
        "lng": -116.9833,
        "city_score": 0.6,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Zona industrial Parque Industrial Misiones de las Californias",
        "lat": 32.3362,
        "lng": -116.7472,
        "city_score": 0.1,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Fundadores",
        "lat": 32.47284285714286,
        "lng": -117.00107142857144,
        "city_score": 0.5,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Cañón del Matadero Este",
        "lat": 32.4742,
        "lng": -116.8065142857143,
        "city_score": 0.9,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Hacienda el Colorado",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.4,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Unidad habitacional Otay Universidad",
        "lat": 32.22461428571428,
        "lng": -116.53342857142856,
        "city_score": 0.3,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Playa Diamante",
        "lat": 32.44551666666667,
        "lng": -116.96688333333334,
        "city_score": 0.7,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Misiones del Pedregal",
        "lat": 32.35883333333333,
        "lng": -116.7714,
        "city_score": 0.6,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Universidad Sur",
        "lat": 32.22461428571428,
        "lng": -116.53342857142856,
        "city_score": 0.2,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Paseos de Guaycura",
        "lat": 32.419415384615384,
        "lng": -117.02846153846154,
        "city_score": 0.7,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Gran Tenochtitlán",
        "lat": 32.4724,
        "lng": -116.9359,
        "city_score": 0.1,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Otay Insurgentes",
        "lat": 32.3362,
        "lng": -116.7472,
        "city_score": 0.1,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Playas de Tijuana Sección Costa",
        "lat": 32.44551666666667,
        "lng": -116.96688333333334,
        "city_score": 0.1,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Agua Caliente Sección Pinos",
        "lat": 32.496766666666666,
        "lng": -116.79406666666668,
        "city_score": 0.9,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Los Olivos",
        "lat": 32.4256,
        "lng": -116.8831,
        "city_score": 0.7,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia La Esmeralda",
        "lat": 32.505406666666666,
        "lng": -116.76182,
        "city_score": 0.8,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Fortín de las Flores Oeste",
        "lat": 32.32389090909091,
        "lng": -116.8769,
        "city_score": 0.3,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Las Abejas",
        "lat": 32.05833333333333,
        "lng": -116.678175,
        "city_score": 0.4,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Residencial Las Cascadas",
        "lat": 32.36538,
        "lng": -116.81364,
        "city_score": 0.0,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Huertas 1a. Sección",
        "lat": 32.513459999999995,
        "lng": -116.7722,
        "city_score": 0.1,
        "city_size": 0.1,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Villa Lomas",
        "lat": 32.4248,
        "lng": -116.89830000000002,
        "city_score": 0.9,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Sonoita",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.9,
        "city_size": 0.95,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Yamille",
        "lat": 32.32389090909091,
        "lng": -116.8769,
        "city_score": 0.3,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Los Laureles",
        "lat": 32.4742,
        "lng": -116.8065142857143,
        "city_score": 0.6,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Ampliación Ejido Lázaro Cárdenas",
        "lat": 32.4252,
        "lng": -116.9955,
        "city_score": 0.6,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Jardines de Las Arboledas",
        "lat": 32.4194,
        "lng": -116.92279999999998,
        "city_score": 0.6,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Nueva Tijuana",
        "lat": 32.468,
        "lng": -116.8041,
        "city_score": 0.2,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Ranchería Rincón del Mediterraneo",
        "lat": 32.49058888888889,
        "lng": -116.78061111111111,
        "city_score": 0.6,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Arboledas de La Mesa",
        "lat": 32.42765,
        "lng": -116.89255,
        "city_score": 0.0,
        "city_size": 0.05,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Anexa Santa Fe",
        "lat": 32.505406666666666,
        "lng": -116.76182,
        "city_score": 0.7,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Buenos Aires Sur",
        "lat": 32.3617,
        "lng": -116.7366,
        "city_score": 0.3,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Lomas de Agua Caliente 1a Sección",
        "lat": 32.48452857142858,
        "lng": -116.96044285714288,
        "city_score": 0.5,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Tepeyac",
        "lat": 32.40490714285714,
        "lng": -116.79287857142856,
        "city_score": 0.6,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Rinconada 2",
        "lat": 32.4089,
        "lng": -116.9436,
        "city_score": 0.7,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia El Niño",
        "lat": 32.5075,
        "lng": -116.79189999999998,
        "city_score": 0.3,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento San Miguel",
        "lat": 32.4391,
        "lng": -116.99188333333336,
        "city_score": 0.0,
        "city_size": 0.05,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Segunda Parte del Soler",
        "lat": 32.4538,
        "lng": -116.9963,
        "city_score": 0.4,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Paseos del Florido",
        "lat": 32.05833333333333,
        "lng": -116.678175,
        "city_score": 0.0,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Las Brisas",
        "lat": 32.44844615384615,
        "lng": -116.87156923076924,
        "city_score": 0.4,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia San Antonio",
        "lat": 32.32389090909091,
        "lng": -116.8769,
        "city_score": 0.1,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Defensores de Baja California",
        "lat": 32.5333,
        "lng": -116.7333,
        "city_score": 0.6,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Pegaso I",
        "lat": 32.5482,
        "lng": -116.7397,
        "city_score": 0.6,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Quintas Campestre El Refugio",
        "lat": 32.4732,
        "lng": -116.8046,
        "city_score": 1.0,
        "city_size": 1.0,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Obrera 1a Sección",
        "lat": 32.4345,
        "lng": -116.9469,
        "city_score": 0.1,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Campestre Murua",
        "lat": 32.4749,
        "lng": -116.7956,
        "city_score": 0.6,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Empleado Postal",
        "lat": 32.5333,
        "lng": -116.7333,
        "city_score": 0.5,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Zona industrial El Florido I",
        "lat": 32.2572,
        "lng": -116.746,
        "city_score": 0.3,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Lomas de La Presa",
        "lat": 32.43026666666666,
        "lng": -116.90063333333332,
        "city_score": 0.1,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Pórticos de San Antonio",
        "lat": 32.4718,
        "lng": -116.86178571428572,
        "city_score": 0.9,
        "city_size": 0.8,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Residencial Villaflores",
        "lat": 32.37725,
        "lng": -116.69665,
        "city_score": 0.3,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Zona industrial Ciudad Industrial",
        "lat": 32.5254,
        "lng": -116.9178,
        "city_score": 0.7,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Cortez",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.9,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Cañadas del Florido 2a. Sección",
        "lat": 32.05833333333333,
        "lng": -116.678175,
        "city_score": 0.3,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia El Prado Este",
        "lat": 32.483293333333336,
        "lng": -116.81761333333334,
        "city_score": 0.1,
        "city_size": 0.15,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Vista Lago",
        "lat": 32.468,
        "lng": -116.8041,
        "city_score": 0.9,
        "city_size": 0.9,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia El Prado",
        "lat": 32.483293333333336,
        "lng": -116.81761333333334,
        "city_score": 0.5,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Xicotencatl Leyva",
        "lat": 32.4523,
        "lng": -116.9682,
        "city_score": 0.8,
        "city_size": 0.8,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Murua Poniente",
        "lat": 32.506625,
        "lng": -116.690575,
        "city_score": 0.3,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Zona industrial Nordika",
        "lat": 32.43449999999999,
        "lng": -116.9582888888889,
        "city_score": 0.6,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Anexa Porvenir",
        "lat": 32.405,
        "lng": -116.79970000000002,
        "city_score": 0.4,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Planicie",
        "lat": 32.329181818181816,
        "lng": -116.68644545454544,
        "city_score": 0.8,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia San Angel",
        "lat": 32.4225,
        "lng": -117.0431,
        "city_score": 0.3,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Anexa Ruiz Cortines",
        "lat": 32.5167,
        "lng": -116.9833,
        "city_score": 0.0,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia El Mirador",
        "lat": 32.329181818181816,
        "lng": -116.68644545454544,
        "city_score": 0.4,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Independencia",
        "lat": 32.450525,
        "lng": -116.721025,
        "city_score": 0.4,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Cumbres del Sol",
        "lat": 32.371833333333335,
        "lng": -116.81466666666668,
        "city_score": 0.9,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Orizaba",
        "lat": 32.431014285714284,
        "lng": -116.90294285714286,
        "city_score": 0.0,
        "city_size": 0.1,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Viñedos Casa Blanca",
        "lat": 32.4875,
        "lng": -116.8267,
        "city_score": 0.3,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Mariano Matamoros (Norte)",
        "lat": 32.47053636363636,
        "lng": -116.8684,
        "city_score": 0.5,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Jardines de las Cruces",
        "lat": 32.350744444444445,
        "lng": -116.8455,
        "city_score": 0.2,
        "city_size": 0.15,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Anexa Miramar",
        "lat": 32.5187,
        "lng": -117.0874,
        "city_score": 0.2,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Jardines de La Mesa",
        "lat": 32.431574999999995,
        "lng": -116.904675,
        "city_score": 0.3,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Alcatraces",
        "lat": 32.4252,
        "lng": -116.9955,
        "city_score": 1.0,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa del Sol III",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.2,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Nido de las Águilas",
        "lat": 32.5482,
        "lng": -116.7397,
        "city_score": 0.6,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Las Colonias",
        "lat": 32.05833333333333,
        "lng": -116.678175,
        "city_score": 0.4,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Zona industrial Los Olivos",
        "lat": 32.44844615384615,
        "lng": -116.87156923076924,
        "city_score": 0.3,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Siena Residencial",
        "lat": 32.4391,
        "lng": -116.99188333333336,
        "city_score": 0.6,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia La Joya Este",
        "lat": 32.44844615384615,
        "lng": -116.87156923076924,
        "city_score": 0.3,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Riberas del Alamar",
        "lat": 32.4667,
        "lng": -116.7769,
        "city_score": 0.7,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Zona industrial Valle del Sur 2",
        "lat": 32.3557,
        "lng": -116.8121,
        "city_score": 0.7,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa del Prado Segunda Sección",
        "lat": 32.433260000000004,
        "lng": -116.87776999999998,
        "city_score": 0.2,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Residencial Los Leones",
        "lat": 32.4462,
        "lng": -117.001,
        "city_score": 0.6,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Las Misiones",
        "lat": 32.419415384615384,
        "lng": -117.02846153846154,
        "city_score": 0.4,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Nueva Esperanza (La Cuesta)",
        "lat": 32.48574166666666,
        "lng": -116.88399166666666,
        "city_score": 0.5,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Verona Residencial",
        "lat": 32.4391,
        "lng": -116.99188333333336,
        "city_score": 0.1,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Vista del Valle",
        "lat": 32.5075,
        "lng": -116.79189999999998,
        "city_score": 0.4,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Chapultepec California",
        "lat": 32.505406666666666,
        "lng": -116.76182,
        "city_score": 0.6,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Bonaterra",
        "lat": 32.466,
        "lng": -116.6881,
        "city_score": 0.3,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Zona industrial Industrial Pacífico III",
        "lat": 32.46521,
        "lng": -116.87767,
        "city_score": 0.5,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Anexa Pro Hogar",
        "lat": 32.3557,
        "lng": -116.8121,
        "city_score": 0.3,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Linda Vista",
        "lat": 32.4041,
        "lng": -116.8198,
        "city_score": 0.4,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Jardines de La Misión",
        "lat": 32.466,
        "lng": -116.6881,
        "city_score": 0.1,
        "city_size": 0.15,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Jardines del Lago",
        "lat": 32.4222,
        "lng": -117.0664,
        "city_score": 0.4,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Unidad habitacional FOVISSSTE II",
        "lat": 32.46782,
        "lng": -116.79802,
        "city_score": 0.8,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia López Leyva",
        "lat": 32.5333,
        "lng": -116.7333,
        "city_score": 0.1,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Ejido Francisco Villa 2a Sección",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.0,
        "city_size": 0.1,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Alemán",
        "lat": 32.466,
        "lng": -116.6881,
        "city_score": 0.4,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Contreras Oeste",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.8,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Playa Blanca",
        "lat": 32.425200000000004,
        "lng": -117.094875,
        "city_score": 0.3,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Soler",
        "lat": 32.4538,
        "lng": -116.9963,
        "city_score": 0.4,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Los Lobos",
        "lat": 32.3617,
        "lng": -116.7366,
        "city_score": 0.4,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia El Pedregal",
        "lat": 32.490966666666665,
        "lng": -116.6942,
        "city_score": 0.7,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Lomas del Pacifico",
        "lat": 32.4345,
        "lng": -116.9469,
        "city_score": 0.8,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Lomas del Río",
        "lat": 32.40490714285714,
        "lng": -116.79287857142856,
        "city_score": 0.4,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Unidad habitacional INFONAVIT Latinos",
        "lat": 32.406580000000005,
        "lng": -116.74652,
        "city_score": 0.6,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Jardines de San Carlos",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.2,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Ejido Chilpancingo",
        "lat": 32.5254,
        "lng": -116.9178,
        "city_score": 0.4,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Llamas Amaya",
        "lat": 32.350744444444445,
        "lng": -116.8455,
        "city_score": 0.8,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Vista Alamar",
        "lat": 32.46782,
        "lng": -116.79802,
        "city_score": 0.4,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Zona industrial Tomas Alva Edison",
        "lat": 32.3915,
        "lng": -116.9576,
        "city_score": 0.1,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Sanchez Taboada II",
        "lat": 32.43768333333333,
        "lng": -116.82155,
        "city_score": 0.9,
        "city_size": 0.8,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Guadalajara (La Mesa)",
        "lat": 32.44844615384615,
        "lng": -116.87156923076924,
        "city_score": 0.5,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Los Santos",
        "lat": 32.490966666666665,
        "lng": -116.6942,
        "city_score": 0.8,
        "city_size": 0.85,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Insurgentes",
        "lat": 32.40483636363637,
        "lng": -116.80335454545455,
        "city_score": 0.1,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Loma Bonita (NA)",
        "lat": 32.4252,
        "lng": -117.0099,
        "city_score": 0.3,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Albatros",
        "lat": 32.4585,
        "lng": -117.0176,
        "city_score": 0.1,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Lomas Virreyes",
        "lat": 32.2572,
        "lng": -116.746,
        "city_score": 0.1,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Paraíso del Río",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.3,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia La Ilusión",
        "lat": 32.3915,
        "lng": -116.9576,
        "city_score": 0.2,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Villa Urrutia",
        "lat": 32.431574999999995,
        "lng": -116.904675,
        "city_score": 0.4,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Zona industrial Los Pinos (Limón)",
        "lat": 32.42765,
        "lng": -116.89255,
        "city_score": 0.1,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Roberto de La Madrid",
        "lat": 32.468,
        "lng": -116.8041,
        "city_score": 0.6,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Condominios Villas California",
        "lat": 32.4462,
        "lng": -117.001,
        "city_score": 0.8,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Manuel Rivera Anaya",
        "lat": 32.46782,
        "lng": -116.79802,
        "city_score": 0.4,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Emiliano Zapata",
        "lat": 32.433260000000004,
        "lng": -116.87776999999998,
        "city_score": 0.5,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Alfonso Corona del Rosal",
        "lat": 32.490966666666665,
        "lng": -116.6942,
        "city_score": 0.8,
        "city_size": 0.9,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Lomas de San Martín",
        "lat": 32.46521,
        "lng": -116.87767,
        "city_score": 0.2,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Valparaíso Residencial",
        "lat": 32.43455,
        "lng": -116.9743,
        "city_score": 0.6,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Otay Jardín II",
        "lat": 32.22461428571428,
        "lng": -116.53342857142856,
        "city_score": 0.9,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa Fontana III",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.8,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia La Campiña",
        "lat": 32.405,
        "lng": -116.79970000000002,
        "city_score": 0.3,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia La Ciénega",
        "lat": 32.42765,
        "lng": -116.89255,
        "city_score": 0.0,
        "city_size": 0.05,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento San Mateo",
        "lat": 32.3,
        "lng": -116.91670000000002,
        "city_score": 0.9,
        "city_size": 0.8,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Playas de Tijuana Sección Monumental",
        "lat": 32.44551666666667,
        "lng": -116.96688333333334,
        "city_score": 0.5,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia José López Portillo",
        "lat": 32.40472307692308,
        "lng": -116.8058846153846,
        "city_score": 0.1,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Francisco Zarco",
        "lat": 32.4647,
        "lng": -117.0425,
        "city_score": 1.0,
        "city_size": 0.8,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Cumbres del Pacífico (Terrazas del Pacífico)",
        "lat": 32.43449999999999,
        "lng": -116.9582888888889,
        "city_score": 0.9,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Michoacán",
        "lat": 32.4225,
        "lng": -117.0431,
        "city_score": 0.3,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Bellas Artes",
        "lat": 32.468,
        "lng": -116.8041,
        "city_score": 0.0,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Lomas del Mirador",
        "lat": 32.4742,
        "lng": -116.8065142857143,
        "city_score": 0.6,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Chamizal",
        "lat": 32.49023333333333,
        "lng": -116.76213333333334,
        "city_score": 0.5,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa del Real IV",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.2,
        "city_size": 0.15,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Loma Dorada Campos",
        "lat": 32.431014285714284,
        "lng": -116.90294285714286,
        "city_score": 0.2,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Isla Mujeres",
        "lat": 32.4718,
        "lng": -116.86178571428572,
        "city_score": 0.3,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Antorcha II",
        "lat": 32.4589,
        "lng": -117.10765,
        "city_score": 0.7,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Zona industrial Industrial Pacífico I",
        "lat": 32.46521,
        "lng": -116.87767,
        "city_score": 0.5,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Urbi Quinta del Cedro Segunda Sección",
        "lat": 32.4536,
        "lng": -117.065,
        "city_score": 0.7,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Ecologista",
        "lat": 32.4724,
        "lng": -116.93590000000002,
        "city_score": 1.0,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Pegaso II",
        "lat": 32.5482,
        "lng": -116.7397,
        "city_score": 0.3,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Unidad habitacional Alba Roja",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.1,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Ampliación Tejamen",
        "lat": 32.40490714285714,
        "lng": -116.79287857142856,
        "city_score": 0.3,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Cañón Centenario",
        "lat": 32.43768333333333,
        "lng": -116.82155,
        "city_score": 0.0,
        "city_size": 0.15,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Laderas de Monterrey",
        "lat": 32.47284285714286,
        "lng": -117.00107142857144,
        "city_score": 0.9,
        "city_size": 0.95,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Chapultepec",
        "lat": 32.50418888888888,
        "lng": -116.99482222222224,
        "city_score": 0.8,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia El Florido 1a. Sección",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.3,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Leonardo Rodriguez Alcaine",
        "lat": 32.4306,
        "lng": -117.025,
        "city_score": 1.0,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Lomas de Tlatelolco",
        "lat": 32.49058888888889,
        "lng": -116.78061111111111,
        "city_score": 0.6,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Industrial Morelos",
        "lat": 32.466,
        "lng": -116.6881,
        "city_score": 0.9,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Real de Loma Bonita",
        "lat": 32.48544285714286,
        "lng": -117.03485714285716,
        "city_score": 0.7,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Colina del Mediterráneo",
        "lat": 32.4538,
        "lng": -116.9963,
        "city_score": 0.5,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Luis Echeverría",
        "lat": 32.48574166666666,
        "lng": -116.88399166666666,
        "city_score": 0.5,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Ciudad Jardín",
        "lat": 32.4345,
        "lng": -116.9469,
        "city_score": 0.6,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Lomas Hipódromo",
        "lat": 32.421842857142856,
        "lng": -116.88708571428572,
        "city_score": 0.0,
        "city_size": 0.1,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Roberto Yahuaca",
        "lat": 32.4041,
        "lng": -116.8198,
        "city_score": 0.5,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia San Antonio del Mar",
        "lat": 32.425200000000004,
        "lng": -117.094875,
        "city_score": 0.4,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Valle Imperial",
        "lat": 32.329181818181816,
        "lng": -116.68644545454544,
        "city_score": 0.8,
        "city_size": 0.8,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Hacienda Casa Grande",
        "lat": 32.2572,
        "lng": -116.746,
        "city_score": 0.2,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Hipódromo Dos",
        "lat": 32.40154444444445,
        "lng": -116.83006666666668,
        "city_score": 0.8,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Unidad habitacional Electricistas",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.2,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Anexa Loma Dorada",
        "lat": 32.431014285714284,
        "lng": -116.90294285714286,
        "city_score": 0.6,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Hidalgo",
        "lat": 32.44583333333333,
        "lng": -116.7912,
        "city_score": 0.6,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Mesa de Otay",
        "lat": 32.468,
        "lng": -116.8041,
        "city_score": 0.0,
        "city_size": 0.1,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Ex Ejido Tampico",
        "lat": 32.35883333333333,
        "lng": -116.7714,
        "city_score": 0.4,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Villa Fontana XVI",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.3,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Aeropuerto Tijuana (Gral. Abelardo L. Rodríguez)",
        "lat": 32.468,
        "lng": -116.8041,
        "city_score": 0.0,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Niño Artillero",
        "lat": 32.40616666666667,
        "lng": -116.75873333333334,
        "city_score": 0.5,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Río Vista",
        "lat": 32.46782,
        "lng": -116.79802,
        "city_score": 0.1,
        "city_size": 0.05,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia El Pedregal Oeste",
        "lat": 32.490966666666665,
        "lng": -116.6942,
        "city_score": 0.7,
        "city_size": 0.85,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Los Altos (Ruíz Valencia)",
        "lat": 32.4538,
        "lng": -116.9963,
        "city_score": 0.5,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Generación 2000",
        "lat": 32.3915,
        "lng": -116.9576,
        "city_score": 0.1,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Quinta Alta",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.7,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Tejamen",
        "lat": 32.40490714285714,
        "lng": -116.79287857142856,
        "city_score": 1.0,
        "city_size": 0.85,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Tecnológico",
        "lat": 32.4749,
        "lng": -116.7956,
        "city_score": 0.5,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Zona Norte",
        "lat": 32.4179,
        "lng": -116.87213333333334,
        "city_score": 0.6,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Delicias",
        "lat": 32.4089,
        "lng": -116.9436,
        "city_score": 0.7,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Las Torres de Matamoros",
        "lat": 32.47053636363636,
        "lng": -116.8684,
        "city_score": 0.9,
        "city_size": 0.85,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Neidhart",
        "lat": 32.50418888888888,
        "lng": -116.99482222222224,
        "city_score": 0.7,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Praderas de la Gloria",
        "lat": 32.4391,
        "lng": -116.99188333333336,
        "city_score": 0.5,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia El Roble Tres R",
        "lat": 32.4732,
        "lng": -116.8046,
        "city_score": 0.9,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Mariano Matamoros (Centro)",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.9,
        "city_size": 0.9,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Durán",
        "lat": 32.40616666666667,
        "lng": -116.75873333333334,
        "city_score": 0.5,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Niños Héroes (La Mesa)",
        "lat": 32.42765,
        "lng": -116.89255,
        "city_score": 0.1,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia El Cortez",
        "lat": 32.42098,
        "lng": -116.97188,
        "city_score": 0.1,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Plazas",
        "lat": 32.4089,
        "lng": -116.9436,
        "city_score": 0.9,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Colinas del Alamar (Torres del Lago)",
        "lat": 32.4222,
        "lng": -117.0664,
        "city_score": 0.6,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Baja Malibú (Sección Playas)",
        "lat": 32.425200000000004,
        "lng": -117.094875,
        "city_score": 0.6,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Santa Rosa (Ciudad)",
        "lat": 32.43723333333333,
        "lng": -116.93746666666668,
        "city_score": 0.0,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia El Peñón",
        "lat": 32.329181818181816,
        "lng": -116.68644545454544,
        "city_score": 0.5,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Unidad habitacional Plaza España",
        "lat": 32.419415384615384,
        "lng": -117.02846153846154,
        "city_score": 0.8,
        "city_size": 0.85,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Moreno 2da. Sección",
        "lat": 32.44844615384615,
        "lng": -116.87156923076924,
        "city_score": 0.1,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Altamira Sur",
        "lat": 32.450525,
        "lng": -116.721025,
        "city_score": 0.3,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Alfa Panamericano",
        "lat": 32.466,
        "lng": -116.6881,
        "city_score": 0.4,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Playas de Tijuana Sección Playas Coronado",
        "lat": 32.44551666666667,
        "lng": -116.96688333333334,
        "city_score": 0.3,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Fortín de las Flores",
        "lat": 32.32389090909091,
        "lng": -116.8769,
        "city_score": 0.3,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Mirador Capistrano",
        "lat": 32.40472307692308,
        "lng": -116.8058846153846,
        "city_score": 0.1,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Oaxaca (Ángel Fernández)",
        "lat": 32.4193,
        "lng": -116.88335,
        "city_score": 0.2,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Equipamiento Colegio Ibero Tijuana",
        "lat": 32.4386,
        "lng": -116.9661,
        "city_score": 0.1,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Privada Catalana",
        "lat": 32.48452857142858,
        "lng": -116.96044285714288,
        "city_score": 0.7,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Natura Sección Amanecer",
        "lat": 32.3915,
        "lng": -116.9576,
        "city_score": 0.8,
        "city_size": 0.8,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Cubillas Sur",
        "lat": 32.333975,
        "lng": -116.8985,
        "city_score": 0.2,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Roberto Curiel",
        "lat": 32.36538,
        "lng": -116.81364,
        "city_score": 0.7,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Bosque de las Araucarias",
        "lat": 32.3362,
        "lng": -116.7472,
        "city_score": 0.3,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Lomas del Refugio",
        "lat": 32.49058888888889,
        "lng": -116.78061111111111,
        "city_score": 0.3,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Las Brisas Norte",
        "lat": 32.44844615384615,
        "lng": -116.87156923076924,
        "city_score": 0.2,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Ejido Chilpancingo",
        "lat": 32.5254,
        "lng": -116.9178,
        "city_score": 0.5,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Santa Mónica",
        "lat": 32.4193,
        "lng": -116.99101428571429,
        "city_score": 0.4,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Los Delfines",
        "lat": 32.4193,
        "lng": -116.99101428571429,
        "city_score": 0.5,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Artesanal",
        "lat": 32.42098,
        "lng": -116.97188,
        "city_score": 0.8,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Luna Park",
        "lat": 32.431014285714284,
        "lng": -116.90294285714286,
        "city_score": 0.1,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Montes Olímpicos",
        "lat": 32.42098,
        "lng": -116.97188,
        "city_score": 0.4,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Francisco Villa",
        "lat": 32.4193,
        "lng": -116.88335,
        "city_score": 0.6,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento El Jibarito",
        "lat": 32.4523,
        "lng": -116.9682,
        "city_score": 0.3,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Ampliación Gabriel Rodriguez",
        "lat": 32.3617,
        "lng": -116.7366,
        "city_score": 0.5,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Unidad habitacional Estadio Potros",
        "lat": 32.40472307692308,
        "lng": -116.8058846153846,
        "city_score": 0.6,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Los Reyes",
        "lat": 32.43026666666666,
        "lng": -116.90063333333332,
        "city_score": 0.1,
        "city_size": 0.15,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia México",
        "lat": 32.445366666666665,
        "lng": -116.732,
        "city_score": 0.2,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Granjas División del Norte",
        "lat": 32.5482,
        "lng": -116.7397,
        "city_score": 0.4,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Cañón Rosales",
        "lat": 32.5187,
        "lng": -117.0874,
        "city_score": 0.3,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Rancho Escondido",
        "lat": 32.5482,
        "lng": -116.7397,
        "city_score": 0.5,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Maurilio Magallón",
        "lat": 32.513459999999995,
        "lng": -116.7722,
        "city_score": 0.3,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Cañón de las Carretas",
        "lat": 32.4252,
        "lng": -117.0099,
        "city_score": 0.4,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Milenio 2000",
        "lat": 32.4585,
        "lng": -117.0176,
        "city_score": 0.0,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia SEPANAL",
        "lat": 32.49023333333333,
        "lng": -116.76213333333334,
        "city_score": 0.5,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Lomas Terrabella",
        "lat": 32.3617,
        "lng": -116.7366,
        "city_score": 0.1,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Valle del Alamar II",
        "lat": 32.5482,
        "lng": -116.7397,
        "city_score": 0.8,
        "city_size": 0.8,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Ampliación Lomas Taurinas",
        "lat": 32.3362,
        "lng": -116.7472,
        "city_score": 1.0,
        "city_size": 0.9,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia El Valle",
        "lat": 32.513459999999995,
        "lng": -116.7722,
        "city_score": 0.3,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Lomas de Agua Caliente 5a Sección",
        "lat": 32.4248,
        "lng": -116.89830000000002,
        "city_score": 0.4,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Viñas del Mar II",
        "lat": 32.4536,
        "lng": -117.065,
        "city_score": 1.0,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Alamar",
        "lat": 32.44583333333333,
        "lng": -116.7912,
        "city_score": 0.4,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia La Pechuga",
        "lat": 32.3362,
        "lng": -116.7472,
        "city_score": 0.9,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Laderas de Otay",
        "lat": 32.22461428571428,
        "lng": -116.53342857142856,
        "city_score": 0.9,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Brisas del Mar",
        "lat": 32.4193,
        "lng": -116.99101428571429,
        "city_score": 0.2,
        "city_size": 0.1,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Monarca",
        "lat": 32.4462,
        "lng": -117.001,
        "city_score": 0.5,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia San José del Alto",
        "lat": 32.490966666666665,
        "lng": -116.6942,
        "city_score": 0.1,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia La Mesa Sur",
        "lat": 32.483293333333336,
        "lng": -116.81761333333334,
        "city_score": 0.1,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Vista Mar Residencial",
        "lat": 32.4983,
        "lng": -117.1207,
        "city_score": 0.1,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento El Laurel II",
        "lat": 32.44438571428571,
        "lng": -116.82194285714286,
        "city_score": 0.2,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Real de San Antonio",
        "lat": 32.4718,
        "lng": -116.86178571428572,
        "city_score": 0.8,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Otay Diamantes",
        "lat": 32.468,
        "lng": -116.8041,
        "city_score": 0.1,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Los Árboles",
        "lat": 32.505406666666666,
        "lng": -116.76182,
        "city_score": 0.9,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Perimetral Norte",
        "lat": 32.468,
        "lng": -116.8041,
        "city_score": 0.6,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Horóscopo",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.9,
        "city_size": 0.9,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Pórticos de Tijuana",
        "lat": 32.419415384615384,
        "lng": -117.02846153846154,
        "city_score": 0.1,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Colinas de San Ángel",
        "lat": 32.40154444444445,
        "lng": -116.83006666666668,
        "city_score": 0.9,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Praderas de La Mesa Sección Valle de las Flores",
        "lat": 32.405,
        "lng": -116.79970000000002,
        "city_score": 0.9,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Lomas Las Huertas",
        "lat": 32.505406666666666,
        "lng": -116.76182,
        "city_score": 0.5,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia La Cuestecita",
        "lat": 32.4306,
        "lng": -117.025,
        "city_score": 0.2,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Lomas de Matamoros",
        "lat": 32.47053636363636,
        "lng": -116.8684,
        "city_score": 0.0,
        "city_size": 0.15,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Los Valles",
        "lat": 32.391549999999995,
        "lng": -116.95765,
        "city_score": 0.8,
        "city_size": 0.85,
        "description": [
            null
        ]
    },
    {
        "city": "Zona industrial Valle del Sur 1",
        "lat": 32.3557,
        "lng": -116.8121,
        "city_score": 0.2,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Fausto González",
        "lat": 32.4252,
        "lng": -117.0099,
        "city_score": 0.7,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Santa Fe",
        "lat": 32.49058888888889,
        "lng": -116.78061111111111,
        "city_score": 0.7,
        "city_size": 0.8,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia San Carlos",
        "lat": 32.40472307692308,
        "lng": -116.8058846153846,
        "city_score": 0.0,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Las Vegas",
        "lat": 32.44844615384615,
        "lng": -116.87156923076924,
        "city_score": 0.5,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Chihuahua La Mesa",
        "lat": 32.32389090909091,
        "lng": -116.8769,
        "city_score": 0.7,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Benton",
        "lat": 32.44844615384615,
        "lng": -116.87156923076924,
        "city_score": 0.6,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia López Mateos",
        "lat": 32.421842857142856,
        "lng": -116.88708571428572,
        "city_score": 0.6,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Baja Malibú (Sección Lomas)",
        "lat": 32.4193,
        "lng": -116.99101428571429,
        "city_score": 0.6,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia El Refugio",
        "lat": 32.44438571428571,
        "lng": -116.82194285714286,
        "city_score": 0.2,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Angélica",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 1.0,
        "city_size": 0.85,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Hacienda San Martín",
        "lat": 32.4252,
        "lng": -116.9955,
        "city_score": 0.5,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Puesta del Sol",
        "lat": 32.44551666666667,
        "lng": -116.96688333333334,
        "city_score": 0.1,
        "city_size": 0.1,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Veracruz",
        "lat": 32.505406666666666,
        "lng": -116.76182,
        "city_score": 0.4,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Jardín Dorado",
        "lat": 32.3617,
        "lng": -116.7366,
        "city_score": 0.6,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Hacienda los Venados",
        "lat": 32.3915,
        "lng": -116.9576,
        "city_score": 0.7,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia El Porvenir",
        "lat": 32.40483636363637,
        "lng": -116.80335454545455,
        "city_score": 1.0,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia El Bosque",
        "lat": 32.4248,
        "lng": -116.89830000000002,
        "city_score": 0.4,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Puerta Plata",
        "lat": 32.3915,
        "lng": -116.9576,
        "city_score": 0.7,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa del Álamo",
        "lat": 32.433260000000004,
        "lng": -116.87776999999998,
        "city_score": 0.7,
        "city_size": 0.8,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Cubillas",
        "lat": 32.333975,
        "lng": -116.8985,
        "city_score": 0.5,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa Fontana XII",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.8,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Sirak M Baloyan",
        "lat": 32.4134,
        "lng": -116.8441,
        "city_score": 0.8,
        "city_size": 0.85,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Las Cumbres",
        "lat": 32.4041,
        "lng": -116.8198,
        "city_score": 1.0,
        "city_size": 0.85,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Granjas el Tecolote",
        "lat": 32.43449999999999,
        "lng": -116.9582888888889,
        "city_score": 0.4,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Mariano Matamoros (Sur)",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.4,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Nueva Aurora Sur",
        "lat": 32.48544285714286,
        "lng": -117.03485714285716,
        "city_score": 0.1,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Luz Juárez",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 1.0,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Libramiento (Zona AO)",
        "lat": 32.405,
        "lng": -116.79970000000002,
        "city_score": 0.2,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villas de Baja California",
        "lat": 32.43026666666666,
        "lng": -116.90063333333332,
        "city_score": 0.9,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Zermeño (Mérida)",
        "lat": 32.42765,
        "lng": -116.89255,
        "city_score": 0.6,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Alicia Carrillo",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.8,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Vista Dorada",
        "lat": 32.4248,
        "lng": -116.89830000000002,
        "city_score": 0.1,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Fuentes del Sol",
        "lat": 32.42258,
        "lng": -117.09744,
        "city_score": 0.9,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Cumbres del Sol",
        "lat": 32.42258,
        "lng": -117.09744,
        "city_score": 1.0,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Manuel Paredes I",
        "lat": 32.4193,
        "lng": -116.88335,
        "city_score": 0.2,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia San Luis",
        "lat": 32.433260000000004,
        "lng": -116.87776999999998,
        "city_score": 0.5,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Loma Blanca",
        "lat": 32.4273,
        "lng": -117.0268,
        "city_score": 0.7,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Niños Héroes Este",
        "lat": 32.42765,
        "lng": -116.89255,
        "city_score": 0.5,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia La Perla Residencial",
        "lat": 32.4475875,
        "lng": -116.9742375,
        "city_score": 0.7,
        "city_size": 0.8,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Cuauhtémoc",
        "lat": 32.4103,
        "lng": -116.836,
        "city_score": 0.5,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Hipódromo Agua Caliente",
        "lat": 32.5167,
        "lng": -117.0167,
        "city_score": 0.9,
        "city_size": 0.8,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Real de La Gloria",
        "lat": 32.4462,
        "lng": -117.001,
        "city_score": 0.9,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Anexa Veracruz",
        "lat": 32.505406666666666,
        "lng": -116.76182,
        "city_score": 0.3,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia El Seminario",
        "lat": 32.405,
        "lng": -116.79970000000002,
        "city_score": 0.7,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Nueva Era",
        "lat": 32.350744444444445,
        "lng": -116.8455,
        "city_score": 0.4,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Colinas de La Cruz",
        "lat": 32.431014285714284,
        "lng": -116.90294285714286,
        "city_score": 0.5,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Viñas del Mar",
        "lat": 32.4536,
        "lng": -117.065,
        "city_score": 0.8,
        "city_size": 0.85,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Kino",
        "lat": 32.40472307692308,
        "lng": -116.8058846153846,
        "city_score": 0.5,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Zona industrial El Florido II",
        "lat": 32.2572,
        "lng": -116.746,
        "city_score": 0.9,
        "city_size": 0.95,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia División los Altos",
        "lat": 32.4538,
        "lng": -116.9963,
        "city_score": 0.6,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Corona Encantada",
        "lat": 32.4724,
        "lng": -116.93590000000002,
        "city_score": 0.2,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Camichin",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 1.0,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento INFONAVIT Lomas del Porvenir",
        "lat": 32.441375,
        "lng": -116.952175,
        "city_score": 0.2,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Huertas 2a. Sección",
        "lat": 32.513459999999995,
        "lng": -116.7722,
        "city_score": 0.9,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Playas de Tijuana Sección Terrazas",
        "lat": 32.44551666666667,
        "lng": -116.96688333333334,
        "city_score": 0.4,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Pinos de Narez",
        "lat": 32.431014285714284,
        "lng": -116.90294285714286,
        "city_score": 0.2,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Los Pirules",
        "lat": 32.37725,
        "lng": -116.69665,
        "city_score": 0.3,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Cañón del Matadero",
        "lat": 32.4724,
        "lng": -116.9359,
        "city_score": 0.2,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Leandro Valle",
        "lat": 32.46521,
        "lng": -116.87767,
        "city_score": 0.8,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Lomas Santa Fe",
        "lat": 32.4536,
        "lng": -117.065,
        "city_score": 0.4,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Condominio Residencial Frontera",
        "lat": 32.468,
        "lng": -116.8041,
        "city_score": 0.9,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Valle Verde",
        "lat": 32.329181818181816,
        "lng": -116.68644545454544,
        "city_score": 0.8,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Empleados Federales",
        "lat": 32.496766666666666,
        "lng": -116.79406666666668,
        "city_score": 0.6,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Bonilla",
        "lat": 32.4252,
        "lng": -116.9955,
        "city_score": 0.7,
        "city_size": 0.85,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Las Huertas 3a Sección",
        "lat": 32.44844615384615,
        "lng": -116.87156923076924,
        "city_score": 0.6,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Miramar",
        "lat": 32.5187,
        "lng": -117.0874,
        "city_score": 0.6,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia 5 y 8 Hectáreas",
        "lat": 32.4345,
        "lng": -116.9469,
        "city_score": 0.5,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Zona industrial La Jolla",
        "lat": 32.4724,
        "lng": -116.93590000000002,
        "city_score": 0.8,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Praderas del Sol",
        "lat": 32.419415384615384,
        "lng": -117.02846153846154,
        "city_score": 0.9,
        "city_size": 0.9,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Campo Koa",
        "lat": 32.4193,
        "lng": -116.99101428571429,
        "city_score": 0.6,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Durango",
        "lat": 32.505406666666666,
        "lng": -116.76182,
        "city_score": 0.3,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Cañón Oasis",
        "lat": 32.4248,
        "lng": -116.89830000000002,
        "city_score": 0.9,
        "city_size": 0.95,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia División del Norte",
        "lat": 32.42765,
        "lng": -116.89255,
        "city_score": 0.6,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Zona industrial Parque Industrial Pacífico IV",
        "lat": 32.43449999999999,
        "lng": -116.9582888888889,
        "city_score": 0.9,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Gutiérrez Ovalle",
        "lat": 32.350744444444445,
        "lng": -116.8455,
        "city_score": 0.4,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia López Oeste",
        "lat": 32.483293333333336,
        "lng": -116.81761333333334,
        "city_score": 0.3,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Guanajuato",
        "lat": 32.505406666666666,
        "lng": -116.76182,
        "city_score": 0.1,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Insurgentes",
        "lat": 32.3362,
        "lng": -116.7472,
        "city_score": 0.8,
        "city_size": 0.8,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Kennedy",
        "lat": 32.5333,
        "lng": -116.7333,
        "city_score": 0.1,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia El Pípila",
        "lat": 32.47053636363636,
        "lng": -116.8684,
        "city_score": 0.2,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Terrazas del Sol",
        "lat": 32.4679,
        "lng": -117.0877,
        "city_score": 0.9,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Vista Hermosa",
        "lat": 32.4222,
        "lng": -117.0664,
        "city_score": 0.8,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Los Olivos Norte",
        "lat": 32.40154444444445,
        "lng": -116.83006666666668,
        "city_score": 0.9,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Xochimilco Solidaridad",
        "lat": 32.46521,
        "lng": -116.87767,
        "city_score": 0.5,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Rincón de Otay",
        "lat": 32.46782,
        "lng": -116.79802,
        "city_score": 0.8,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Baja California",
        "lat": 32.431014285714284,
        "lng": -116.90294285714286,
        "city_score": 0.1,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia México Lindo",
        "lat": 32.431574999999995,
        "lng": -116.904675,
        "city_score": 0.1,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Ramos",
        "lat": 32.513459999999995,
        "lng": -116.7722,
        "city_score": 0.2,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Cañón del Sainz",
        "lat": 32.433260000000004,
        "lng": -116.87776999999998,
        "city_score": 0.2,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Colinas de California",
        "lat": 32.466,
        "lng": -116.6881,
        "city_score": 0.6,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Agua Caliente",
        "lat": 32.5167,
        "lng": -117.0167,
        "city_score": 0.8,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Granja Puesta del Sol",
        "lat": 32.3,
        "lng": -116.91670000000002,
        "city_score": 0.9,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Nueva Aurora",
        "lat": 32.48544285714286,
        "lng": -117.03485714285716,
        "city_score": 0.2,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Sanchez Taboada Produtsa",
        "lat": 32.40616666666667,
        "lng": -116.75873333333334,
        "city_score": 0.7,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Chapultepec Alamar",
        "lat": 32.37725,
        "lng": -116.69665,
        "city_score": 0.8,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento La Escondida",
        "lat": 32.4718,
        "lng": -116.86178571428572,
        "city_score": 0.4,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Los Venados",
        "lat": 32.4194,
        "lng": -116.92279999999998,
        "city_score": 0.7,
        "city_size": 0.8,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Santa Cruz",
        "lat": 32.483293333333336,
        "lng": -116.81761333333334,
        "city_score": 0.7,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Zona industrial Parque Industrial El Florido Sección La Encantada",
        "lat": 32.4256,
        "lng": -116.8831,
        "city_score": 0.5,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Del Río",
        "lat": 32.5333,
        "lng": -116.7333,
        "city_score": 0.6,
        "city_size": 0.8,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Terrazas del Valle",
        "lat": 32.4875,
        "lng": -116.8267,
        "city_score": 0.5,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Alfonso Ballesteros",
        "lat": 32.40490714285714,
        "lng": -116.79287857142856,
        "city_score": 0.5,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Residencial Alameda",
        "lat": 32.431574999999995,
        "lng": -116.904675,
        "city_score": 0.4,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Playas de Tijuana Sección Jardines",
        "lat": 32.4538,
        "lng": -116.9963,
        "city_score": 0.5,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Anexa Buena Vista",
        "lat": 32.5333,
        "lng": -116.7333,
        "city_score": 0.7,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Genaro Vázquez Sección Tres",
        "lat": 32.43449999999999,
        "lng": -116.9582888888889,
        "city_score": 0.2,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia 20 de Noviembre",
        "lat": 32.4424,
        "lng": -116.7405,
        "city_score": 0.5,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Lomas Taurinas",
        "lat": 32.5333,
        "lng": -116.7333,
        "city_score": 0.2,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Xicotencatl Leyva Alemán",
        "lat": 32.4386,
        "lng": -116.9661,
        "city_score": 0.2,
        "city_size": 0.15,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Rodeo",
        "lat": 32.405,
        "lng": -116.79970000000002,
        "city_score": 0.9,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Rancho las Flores 2a Sección",
        "lat": 32.5187,
        "lng": -117.0874,
        "city_score": 1.0,
        "city_size": 0.9,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia La Morita",
        "lat": 32.05833333333333,
        "lng": -116.678175,
        "city_score": 0.7,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Isla Coronado",
        "lat": 32.42258,
        "lng": -117.09744,
        "city_score": 0.3,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Villa Mar",
        "lat": 32.4585,
        "lng": -117.0176,
        "city_score": 0.8,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa Fontana IX",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.3,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Santa Cecilia",
        "lat": 32.4317,
        "lng": -116.85684,
        "city_score": 0.3,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Herradura",
        "lat": 32.4248,
        "lng": -116.89830000000002,
        "city_score": 0.0,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Mar de Cortez",
        "lat": 32.4475875,
        "lng": -116.9742375,
        "city_score": 0.7,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Rancho las Flores 1a Sección",
        "lat": 32.5187,
        "lng": -117.0874,
        "city_score": 0.9,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa Fontana VII",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.7,
        "city_size": 0.85,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa Residencial Santa Fe 2a Sección",
        "lat": 32.4306,
        "lng": -117.025,
        "city_score": 0.0,
        "city_size": 0.1,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia FIDUZET",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.2,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Valle del Rubí Sección Terrazas",
        "lat": 32.3557,
        "lng": -116.8121,
        "city_score": 0.3,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Sanchez Taboada III",
        "lat": 32.40616666666667,
        "lng": -116.75873333333334,
        "city_score": 0.2,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Pueblo Bonito",
        "lat": 32.4248,
        "lng": -116.89830000000002,
        "city_score": 0.7,
        "city_size": 0.8,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Puente La Joya",
        "lat": 32.5651,
        "lng": -116.5175,
        "city_score": 0.1,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Urbiquinta Marsella",
        "lat": 32.41961428571428,
        "lng": -117.03117142857144,
        "city_score": 0.4,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento TECNOMEX",
        "lat": 32.4983,
        "lng": -117.1207,
        "city_score": 0.3,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Ojo de Agua (El Florido)",
        "lat": 32.49058888888889,
        "lng": -116.78061111111111,
        "city_score": 0.2,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Partido del Trabajo",
        "lat": 32.49058888888889,
        "lng": -116.78061111111111,
        "city_score": 0.7,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Unidad habitacional Las Praderas",
        "lat": 32.40472307692308,
        "lng": -116.8058846153846,
        "city_score": 0.8,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Cañón Palmas",
        "lat": 32.431574999999995,
        "lng": -116.904675,
        "city_score": 1.0,
        "city_size": 0.85,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Cumbres del Rubí",
        "lat": 32.40490714285714,
        "lng": -116.79287857142856,
        "city_score": 1.0,
        "city_size": 0.9,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Madero (Cacho)",
        "lat": 32.38305,
        "lng": -116.88515,
        "city_score": 0.3,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Ampliación Lomas de Tlatelolco",
        "lat": 32.49058888888889,
        "lng": -116.78061111111111,
        "city_score": 0.2,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Cerro Colorado 3a Sección",
        "lat": 32.40472307692308,
        "lng": -116.8058846153846,
        "city_score": 0.1,
        "city_size": 0.1,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Jardines de La Gloria",
        "lat": 32.4462,
        "lng": -117.001,
        "city_score": 0.8,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Murua Oriente",
        "lat": 32.44583333333333,
        "lng": -116.7912,
        "city_score": 0.2,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Real de San Francisco",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.1,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa del Real VIII",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.7,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Vista Bella",
        "lat": 32.4718,
        "lng": -116.86178571428572,
        "city_score": 0.7,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Zona industrial Baja Maq. El Águila",
        "lat": 32.419415384615384,
        "lng": -117.02846153846154,
        "city_score": 0.9,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia El Mirador (La Mesa)",
        "lat": 32.40154444444445,
        "lng": -116.83006666666668,
        "city_score": 0.1,
        "city_size": 0.1,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia José Sandoval",
        "lat": 32.483293333333336,
        "lng": -116.81761333333334,
        "city_score": 0.4,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Otay Campestre",
        "lat": 32.46782,
        "lng": -116.79802,
        "city_score": 0.7,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Tierra y Libertad",
        "lat": 32.47053636363636,
        "lng": -116.8684,
        "city_score": 0.4,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Burócrata Hipódromo",
        "lat": 32.421842857142856,
        "lng": -116.88708571428572,
        "city_score": 0.5,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Loma Encantada",
        "lat": 32.43455,
        "lng": -116.9743,
        "city_score": 0.6,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Anexa Simón Bolívar",
        "lat": 32.40490714285714,
        "lng": -116.79287857142856,
        "city_score": 0.8,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa Fontana VI",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.9,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Vista Encantada",
        "lat": 32.4724,
        "lng": -116.93590000000002,
        "city_score": 0.8,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Playas de Tijuana Sección el Dorado",
        "lat": 32.4475875,
        "lng": -116.9742375,
        "city_score": 0.9,
        "city_size": 0.9,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Gas y Anexas",
        "lat": 32.44844615384615,
        "lng": -116.87156923076924,
        "city_score": 0.5,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Lagunitas 3a Sección",
        "lat": 32.44055,
        "lng": -116.84985,
        "city_score": 0.6,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Los Saucillos",
        "lat": 32.405,
        "lng": -116.79970000000002,
        "city_score": 0.2,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento FOVISSSTE Los Volcanes",
        "lat": 32.483293333333336,
        "lng": -116.81761333333334,
        "city_score": 0.7,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Real del Mar",
        "lat": 32.4258,
        "lng": -117.0392,
        "city_score": 0.2,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia El Lago",
        "lat": 32.4222,
        "lng": -117.0664,
        "city_score": 0.3,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa Campestre",
        "lat": 32.466,
        "lng": -116.6881,
        "city_score": 0.5,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Plan de Iguala",
        "lat": 32.513459999999995,
        "lng": -116.7722,
        "city_score": 0.9,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Aeropuerto",
        "lat": 32.4604,
        "lng": -116.90155,
        "city_score": 0.9,
        "city_size": 0.8,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento La Esperanza",
        "lat": 32.40490714285714,
        "lng": -116.79287857142856,
        "city_score": 0.1,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Martínez",
        "lat": 32.431014285714284,
        "lng": -116.90294285714286,
        "city_score": 0.6,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Residencial Barcelona",
        "lat": 32.43449999999999,
        "lng": -116.9582888888889,
        "city_score": 0.5,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Las Torres",
        "lat": 32.5482,
        "lng": -116.7397,
        "city_score": 0.3,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Chapultepec Este",
        "lat": 32.50418888888888,
        "lng": -116.99482222222224,
        "city_score": 0.8,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Constitución del 17",
        "lat": 32.42765,
        "lng": -116.89255,
        "city_score": 0.1,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Sevilla Residencial",
        "lat": 32.2572,
        "lng": -116.746,
        "city_score": 0.6,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Hacienda Agua Caliente",
        "lat": 32.421842857142856,
        "lng": -116.88708571428572,
        "city_score": 0.7,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento El Rubí",
        "lat": 32.4345,
        "lng": -116.9469,
        "city_score": 0.3,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Los Venados Oeste",
        "lat": 32.4194,
        "lng": -116.92279999999998,
        "city_score": 0.4,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Margarita Residencial",
        "lat": 32.5007,
        "lng": -116.8071,
        "city_score": 0.3,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia La Joya",
        "lat": 32.44844615384615,
        "lng": -116.87156923076924,
        "city_score": 0.6,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Colinas de Agua Caliente",
        "lat": 32.421842857142856,
        "lng": -116.88708571428572,
        "city_score": 0.8,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Lomas de San Antonio",
        "lat": 32.42258,
        "lng": -117.09744,
        "city_score": 0.7,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Cerro Colorado I",
        "lat": 32.40472307692308,
        "lng": -116.8058846153846,
        "city_score": 0.7,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Niños Héroes",
        "lat": 32.4193,
        "lng": -116.88335,
        "city_score": 0.9,
        "city_size": 0.95,
        "description": [
            null
        ]
    },
    {
        "city": "Zona industrial Chilpancingo",
        "lat": 32.5254,
        "lng": -116.9178,
        "city_score": 0.7,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Reforma",
        "lat": 32.43768333333333,
        "lng": -116.82155,
        "city_score": 0.0,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Vistas de Palmillas",
        "lat": 32.44438571428571,
        "lng": -116.82194285714286,
        "city_score": 0.9,
        "city_size": 0.8,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia San Bernardo (Terrazas de San Bernardo)",
        "lat": 32.4724,
        "lng": -116.93590000000002,
        "city_score": 0.9,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Pedregal del Matamoros",
        "lat": 32.3617,
        "lng": -116.7366,
        "city_score": 0.0,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Rincón Dorado",
        "lat": 32.3617,
        "lng": -116.7366,
        "city_score": 0.4,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Valle del Sur",
        "lat": 32.3557,
        "lng": -116.8121,
        "city_score": 0.4,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Rinconada 1",
        "lat": 32.4089,
        "lng": -116.9436,
        "city_score": 0.2,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Las Villas Santa Fe",
        "lat": 32.4718,
        "lng": -116.86178571428572,
        "city_score": 0.7,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Cañadas del Florido",
        "lat": 32.05833333333333,
        "lng": -116.678175,
        "city_score": 0.7,
        "city_size": 0.85,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento San Agustin",
        "lat": 32.43455,
        "lng": -116.9743,
        "city_score": 1.0,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento El Palmar",
        "lat": 32.40490714285714,
        "lng": -116.79287857142856,
        "city_score": 0.9,
        "city_size": 0.9,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Rancho La Cima",
        "lat": 32.4345,
        "lng": -116.9469,
        "city_score": 0.3,
        "city_size": 0.15,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Cerro Colorado 2a Sección (Lomas del Colorado)",
        "lat": 32.40472307692308,
        "lng": -116.8058846153846,
        "city_score": 0.5,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Vivienda Magisterial 37",
        "lat": 32.42765,
        "lng": -116.89255,
        "city_score": 0.7,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia La Mesa",
        "lat": 32.483293333333336,
        "lng": -116.81761333333334,
        "city_score": 0.2,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Cañón Rubí",
        "lat": 32.42098,
        "lng": -116.97188,
        "city_score": 0.7,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Pontevedra",
        "lat": 32.5482,
        "lng": -116.7397,
        "city_score": 0.7,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Parque Industrial La Mesa",
        "lat": 32.406580000000005,
        "lng": -116.74652,
        "city_score": 0.4,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Revolución",
        "lat": 32.496766666666666,
        "lng": -116.79406666666668,
        "city_score": 0.8,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Ampliación Guaycura",
        "lat": 32.41961428571428,
        "lng": -117.03117142857144,
        "city_score": 0.7,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Misión de las Américas",
        "lat": 32.419415384615384,
        "lng": -117.02846153846154,
        "city_score": 0.9,
        "city_size": 0.8,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Liberal Lomas del Rubí",
        "lat": 32.36538,
        "lng": -116.81364,
        "city_score": 0.2,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Sonora",
        "lat": 32.40154444444445,
        "lng": -116.83006666666668,
        "city_score": 0.7,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Granjas Princesas del Sol",
        "lat": 32.49058888888889,
        "lng": -116.78061111111111,
        "city_score": 0.2,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Maclovio Rojas",
        "lat": 32.49058888888889,
        "lng": -116.78061111111111,
        "city_score": 1.0,
        "city_size": 0.95,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Los Olivos",
        "lat": 32.4317,
        "lng": -116.85684,
        "city_score": 0.2,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Gerónimo Meza Este",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.2,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Buenos Aires Norte",
        "lat": 32.3617,
        "lng": -116.7366,
        "city_score": 0.3,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Amparo Sánchez",
        "lat": 32.43768333333333,
        "lng": -116.82155,
        "city_score": 0.6,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia El Tecolote",
        "lat": 32.43449999999999,
        "lng": -116.9582888888889,
        "city_score": 0.7,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Ejido Francisco Villa Sur",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.1,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa Residencial del Bosque",
        "lat": 32.329181818181816,
        "lng": -116.68644545454544,
        "city_score": 0.0,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Flores Magón",
        "lat": 32.4523,
        "lng": -116.9682,
        "city_score": 0.4,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Valle Vista 2a Sección",
        "lat": 32.506625,
        "lng": -116.690575,
        "city_score": 0.3,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia La Cueva",
        "lat": 32.3,
        "lng": -116.91670000000002,
        "city_score": 0.9,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Tres M (Pérez)",
        "lat": 32.5075,
        "lng": -116.79189999999998,
        "city_score": 0.2,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Punta del Mar",
        "lat": 32.4619,
        "lng": -117.101,
        "city_score": 0.3,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Azteca",
        "lat": 32.40483636363637,
        "lng": -116.80335454545455,
        "city_score": 0.2,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Unidad habitacional INFONAVIT Loma II",
        "lat": 32.46782,
        "lng": -116.79802,
        "city_score": 0.9,
        "city_size": 0.85,
        "description": [
            null
        ]
    },
    {
        "city": "Unidad habitacional INFONAVIT Patrimonio",
        "lat": 32.44583333333333,
        "lng": -116.7912,
        "city_score": 0.6,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Hacienda las Palomas",
        "lat": 32.421842857142856,
        "lng": -116.88708571428572,
        "city_score": 0.2,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Playas de Tijuana Sección Costa Azul",
        "lat": 32.4538,
        "lng": -116.9963,
        "city_score": 0.1,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Madero Sur",
        "lat": 32.47284285714286,
        "lng": -117.00107142857144,
        "city_score": 0.7,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Río Tijuana 2a. Etapa",
        "lat": 32.32389090909091,
        "lng": -116.8769,
        "city_score": 0.2,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Colinas del Florido",
        "lat": 32.49058888888889,
        "lng": -116.78061111111111,
        "city_score": 0.8,
        "city_size": 0.85,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Anexa Durango",
        "lat": 32.505406666666666,
        "lng": -116.76182,
        "city_score": 0.3,
        "city_size": 0.15,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Colinas del Rey",
        "lat": 32.36538,
        "lng": -116.81364,
        "city_score": 0.2,
        "city_size": 0.15,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Granjas Familiares Unidas",
        "lat": 32.5482,
        "lng": -116.7397,
        "city_score": 0.3,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Anexa Postal",
        "lat": 32.5167,
        "lng": -116.9833,
        "city_score": 0.4,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Zona Urbana Río Tijuana",
        "lat": 32.496766666666666,
        "lng": -116.79406666666668,
        "city_score": 0.7,
        "city_size": 0.8,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Punta Bandera",
        "lat": 32.4619,
        "lng": -117.101,
        "city_score": 0.4,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Hacienda Linda Vista",
        "lat": 32.4538,
        "lng": -116.9963,
        "city_score": 0.6,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Paseos del Vergel",
        "lat": 32.44438571428571,
        "lng": -116.82194285714286,
        "city_score": 0.1,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Jardín de las Bugambilias",
        "lat": 32.513459999999995,
        "lng": -116.7722,
        "city_score": 0.9,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia La Morita 2a Sección",
        "lat": 32.05833333333333,
        "lng": -116.678175,
        "city_score": 0.7,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Playas de Tijuana Sección Costa Hermosa",
        "lat": 32.4538,
        "lng": -116.9963,
        "city_score": 0.8,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Insurgentes",
        "lat": 32.5482,
        "lng": -116.7397,
        "city_score": 0.6,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa Fontana XIII",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 1.0,
        "city_size": 0.85,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Ejido Lázaro Cárdenas",
        "lat": 32.4252,
        "lng": -116.9955,
        "city_score": 0.8,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Corona del Mar",
        "lat": 32.5651,
        "lng": -116.5175,
        "city_score": 0.6,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Condesa",
        "lat": 32.48574166666666,
        "lng": -116.88399166666666,
        "city_score": 0.3,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Lomas Doctores (Chapultepec Doctores)",
        "lat": 32.333975,
        "lng": -116.8985,
        "city_score": 0.8,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Nuevo Progreso",
        "lat": 32.4732,
        "lng": -116.8046,
        "city_score": 0.2,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Manuel Paredes 3a Sección",
        "lat": 32.4345,
        "lng": -116.9469,
        "city_score": 0.7,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Santa Fe",
        "lat": 32.5007,
        "lng": -116.8071,
        "city_score": 0.2,
        "city_size": 0.1,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa del Real III",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.2,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Gertrudis Green",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.3,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Rancho Macías",
        "lat": 32.4724,
        "lng": -116.93590000000002,
        "city_score": 1.0,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Xicoténcatl Dos",
        "lat": 32.4647,
        "lng": -117.0425,
        "city_score": 0.1,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Laderas del Mar",
        "lat": 32.4983,
        "lng": -117.1207,
        "city_score": 0.4,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Xicoténcatl Leyva (OE)",
        "lat": 32.468,
        "lng": -116.8041,
        "city_score": 0.6,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Colas del Matamoros",
        "lat": 32.329181818181816,
        "lng": -116.68644545454544,
        "city_score": 0.2,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Pacifico Campestre",
        "lat": 32.4258,
        "lng": -117.0392,
        "city_score": 0.5,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Parajes del Valle",
        "lat": 32.5007,
        "lng": -116.8071,
        "city_score": 0.8,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Unidad habitacional Plaza San Marcos",
        "lat": 32.419415384615384,
        "lng": -117.02846153846154,
        "city_score": 0.7,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Javier Rojo Gómez",
        "lat": 32.4939,
        "lng": -116.8222,
        "city_score": 0.1,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Vivienda Popular",
        "lat": 32.371833333333335,
        "lng": -116.81466666666668,
        "city_score": 0.9,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Cañón de las Palmeras",
        "lat": 32.441375,
        "lng": -116.952175,
        "city_score": 0.1,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Anexa Sanchez Taboada",
        "lat": 32.37,
        "lng": -116.6345,
        "city_score": 1.0,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Las Lilas",
        "lat": 32.483293333333336,
        "lng": -116.81761333333334,
        "city_score": 0.6,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia El Florido III",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.2,
        "city_size": 0.15,
        "description": [
            null
        ]
    },
    {
        "city": "Unidad habitacional XVIII Ayuntamiento",
        "lat": 32.43449999999999,
        "lng": -116.9582888888889,
        "city_score": 0.9,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villas Otay",
        "lat": 32.3362,
        "lng": -116.7472,
        "city_score": 0.3,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Dimenstein",
        "lat": 32.483293333333336,
        "lng": -116.81761333333334,
        "city_score": 0.3,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Terrazas de La Presa",
        "lat": 32.4516,
        "lng": -116.9109,
        "city_score": 0.4,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Colinas de Chapultepec",
        "lat": 32.48452857142858,
        "lng": -116.96044285714288,
        "city_score": 1.0,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Las Palmeras",
        "lat": 32.441375,
        "lng": -116.952175,
        "city_score": 0.6,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Villegas",
        "lat": 32.350744444444445,
        "lng": -116.8455,
        "city_score": 0.9,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Ribera del Bosque",
        "lat": 32.329181818181816,
        "lng": -116.68644545454544,
        "city_score": 0.7,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Colinas de La Cantera",
        "lat": 32.40616666666667,
        "lng": -116.75873333333334,
        "city_score": 0.7,
        "city_size": 0.8,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Anexa Niños Héroes",
        "lat": 32.42098,
        "lng": -116.97188,
        "city_score": 0.5,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa del Campo",
        "lat": 32.49058888888889,
        "lng": -116.78061111111111,
        "city_score": 0.1,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia IMAQ Tijuana",
        "lat": 32.405,
        "lng": -116.79970000000002,
        "city_score": 0.4,
        "city_size": 0.7,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia López",
        "lat": 32.483293333333336,
        "lng": -116.81761333333334,
        "city_score": 0.5,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Ley del Servicio Civil",
        "lat": 32.42258,
        "lng": -117.09744,
        "city_score": 0.9,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Cañón del Padre",
        "lat": 32.3617,
        "lng": -116.7366,
        "city_score": 0.8,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Tomas Aquino",
        "lat": 32.5333,
        "lng": -116.7333,
        "city_score": 0.3,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia La Esperanza",
        "lat": 32.37,
        "lng": -116.6345,
        "city_score": 0.6,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia El Monte",
        "lat": 32.4679,
        "lng": -117.0877,
        "city_score": 0.2,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Zona industrial Presidentes",
        "lat": 32.419415384615384,
        "lng": -117.02846153846154,
        "city_score": 0.5,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Natura Sección Arboledas",
        "lat": 32.3915,
        "lng": -116.9576,
        "city_score": 0.4,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Moreno",
        "lat": 32.483293333333336,
        "lng": -116.81761333333334,
        "city_score": 0.5,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Coral Beach",
        "lat": 32.4475875,
        "lng": -116.9742375,
        "city_score": 0.2,
        "city_size": 0.15,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Hacienda los Laureles",
        "lat": 32.433260000000004,
        "lng": -116.87776999999998,
        "city_score": 0.8,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Otay Vista",
        "lat": 32.46782,
        "lng": -116.79802,
        "city_score": 0.8,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia El Paraíso",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.9,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Terrazas de San Angel",
        "lat": 32.42258,
        "lng": -117.09744,
        "city_score": 0.9,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Las Villas Tijuana",
        "lat": 32.4391,
        "lng": -116.99188333333336,
        "city_score": 0.6,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Monte Real",
        "lat": 32.40483636363637,
        "lng": -116.80335454545455,
        "city_score": 0.8,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Montecarlo",
        "lat": 32.3617,
        "lng": -116.7366,
        "city_score": 0.1,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Unidad habitacional Cuatro Estrellas",
        "lat": 32.43455,
        "lng": -116.9743,
        "city_score": 0.9,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Zona industrial Lago Sur",
        "lat": 32.4222,
        "lng": -117.0664,
        "city_score": 0.6,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia La Jolla",
        "lat": 32.4462,
        "lng": -117.001,
        "city_score": 0.1,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia El Triunfo",
        "lat": 32.40616666666667,
        "lng": -116.75873333333334,
        "city_score": 0.6,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Villa Fontana XVIII",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.3,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Castro",
        "lat": 32.44844615384615,
        "lng": -116.87156923076924,
        "city_score": 0.8,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Unidad habitacional Militar",
        "lat": 32.350744444444445,
        "lng": -116.8455,
        "city_score": 0.7,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Playas de Tijuana Sección La Riviera",
        "lat": 32.4475875,
        "lng": -116.9742375,
        "city_score": 0.2,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Lomas del Real",
        "lat": 32.4718,
        "lng": -116.86178571428572,
        "city_score": 0.6,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Altiplano",
        "lat": 32.329181818181816,
        "lng": -116.68644545454544,
        "city_score": 0.1,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Guadalajara",
        "lat": 32.47284285714286,
        "lng": -117.00107142857144,
        "city_score": 0.3,
        "city_size": 0.25,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Colinas de La Mesa",
        "lat": 32.431574999999995,
        "lng": -116.904675,
        "city_score": 0.6,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Hacienda del Mar",
        "lat": 32.4193,
        "lng": -116.99101428571429,
        "city_score": 0.3,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Urías",
        "lat": 32.513459999999995,
        "lng": -116.7722,
        "city_score": 0.0,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa del Real II",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.3,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Leos Montoya",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.4,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Jardines de Chapultepec S-E",
        "lat": 32.4248,
        "lng": -116.89830000000002,
        "city_score": 0.6,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Las Flores",
        "lat": 32.46521,
        "lng": -116.87767,
        "city_score": 1.0,
        "city_size": 0.85,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Simón Bolívar",
        "lat": 32.40490714285714,
        "lng": -116.79287857142856,
        "city_score": 0.3,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia INFONAVIT Cachanillas",
        "lat": 32.406580000000005,
        "lng": -116.74652,
        "city_score": 0.6,
        "city_size": 0.35,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Lázaro Cárdenas",
        "lat": 32.4386,
        "lng": -116.9661,
        "city_score": 0.0,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Garita Internacional",
        "lat": 32.468,
        "lng": -116.8041,
        "city_score": 0.7,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Villa Floresta",
        "lat": 32.431014285714284,
        "lng": -116.90294285714286,
        "city_score": 0.9,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Balcón Las Huertas",
        "lat": 32.513459999999995,
        "lng": -116.7722,
        "city_score": 0.7,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Reynoso",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.8,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Puerta del Sol",
        "lat": 32.3617,
        "lng": -116.7366,
        "city_score": 0.7,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Lomas Tijuana",
        "lat": 32.441375,
        "lng": -116.952175,
        "city_score": 0.2,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Monte San Antonio",
        "lat": 32.4345,
        "lng": -116.9469,
        "city_score": 0.6,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Anexa Del Río",
        "lat": 32.5333,
        "lng": -116.7333,
        "city_score": 0.1,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Villa del Sol II",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.3,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia La Villa",
        "lat": 32.505406666666666,
        "lng": -116.76182,
        "city_score": 0.9,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Mi Patrimonio",
        "lat": 32.46521,
        "lng": -116.87767,
        "city_score": 0.0,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Altiplano 5a Sección",
        "lat": 32.329181818181816,
        "lng": -116.68644545454544,
        "city_score": 0.4,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia La Gloria",
        "lat": 32.4462,
        "lng": -117.001,
        "city_score": 0.4,
        "city_size": 0.3,
        "description": [
            null
        ]
    },
    {
        "city": "Zona industrial Alamar II",
        "lat": 32.5482,
        "lng": -116.7397,
        "city_score": 0.4,
        "city_size": 0.2,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Cumbres de Juárez",
        "lat": 32.47284285714286,
        "lng": -117.00107142857144,
        "city_score": 0.8,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Aguaje de La Tuna 1a Sección",
        "lat": 32.48574166666666,
        "lng": -116.88399166666666,
        "city_score": 0.3,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Cañón Azteca",
        "lat": 32.4724,
        "lng": -116.9359,
        "city_score": 0.3,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Otay Galerías",
        "lat": 32.468,
        "lng": -116.8041,
        "city_score": 1.0,
        "city_size": 0.65,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento La Esperanza [Granjas Familiares]",
        "lat": 32.4589,
        "lng": -117.10765,
        "city_score": 0.3,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Anexa Herrera",
        "lat": 32.4345,
        "lng": -116.9469,
        "city_score": 0.8,
        "city_size": 0.6,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Rancho el Águila",
        "lat": 32.419415384615384,
        "lng": -117.02846153846154,
        "city_score": 0.6,
        "city_size": 0.5,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Ampliación Las Américas",
        "lat": 32.419415384615384,
        "lng": -117.02846153846154,
        "city_score": 0.8,
        "city_size": 0.8,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Patrimonio Familiar",
        "lat": 32.350744444444445,
        "lng": -116.8455,
        "city_score": 0.9,
        "city_size": 0.95,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento El Rincón",
        "lat": 32.40490714285714,
        "lng": -116.79287857142856,
        "city_score": 0.7,
        "city_size": 0.75,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Costa Coronado Residencial",
        "lat": 32.4585,
        "lng": -117.0176,
        "city_score": 0.8,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento Lomas de San Pedro",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.2,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Valle del Rubí Sección Lomas",
        "lat": 32.371833333333335,
        "lng": -116.81466666666668,
        "city_score": 0.3,
        "city_size": 0.55,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia INFONAVIT La Mesa",
        "lat": 32.32389090909091,
        "lng": -116.8769,
        "city_score": 0.8,
        "city_size": 0.45,
        "description": [
            null
        ]
    },
    {
        "city": "Fraccionamiento La Perla Bahía",
        "lat": 32.4475875,
        "lng": -116.9742375,
        "city_score": 0.2,
        "city_size": 0.4,
        "description": [
            null
        ]
    },
    {
        "city": "Colonia Pinos del Agüero",
        "lat": 32.513459999999995,
        "lng": -116.7722,
        "city_score": 0.5,
        "city_size": 0.55,
        "description": [
            null
        ]
    }
]



//Highlights sm_stats
export const demoHighlightsData: any = [

    {

        "total_reach": 75347

    },

    {

        "unique_reach": 5125.0

    },

    {

        "total_engagement": 13457.0

    },

    {

        "social_media_score": 84

    },

    {

        "last_data_update": "09/01/2024"

    }

]




type DemoAnysisType = {
    [key: string]: any[]
}

//Stats Chart data post_views
const demoStatsChartData: DemoAnysisType = {
    "Asset 1": [
        {
            "page_id": "163415037006030",
            "m_date": "2023-12-13",
            "engagements_rate": 0.3201612903225806,
            "video_rate": 0.6,
            "posts_rate": 0.04032258064516129
        },
        {
            "page_id": "163415037006030",
            "m_date": "2023-12-14",
            "engagements_rate": 0.08966244725738397,
            "video_rate": 0.16666666666666666,
            "posts_rate": 0.012658227848101266
        },
        {
            "page_id": "163415037006030",
            "m_date": "2023-12-15",
            "engagements_rate": 0.09152439024390245,
            "video_rate": 0.18000000000000002,
            "posts_rate": 0.0030487804878048777
        },
        {
            "page_id": "163415037006030",
            "m_date": "2023-12-16",
            "engagements_rate": 0.16666666666666666,
            "video_rate": 0.3333333333333333,
            "posts_rate": 0.0
        },
        {
            "page_id": "163415037006030",
            "m_date": "2023-12-17",
            "engagements_rate": 0.04674883127921802,
            "video_rate": 0.07692307692307693,
            "posts_rate": 0.016574585635359115
        },
        {
            "page_id": "163415037006030",
            "m_date": "2023-12-18",
            "engagements_rate": 0.05495867768595041,
            "video_rate": 0.08264462809917356,
            "posts_rate": 0.02727272727272727
        },
        {
            "page_id": "163415037006030",
            "m_date": "2023-12-19",
            "engagements_rate": 0.06355555555555556,
            "video_rate": 0.1111111111111111,
            "posts_rate": 0.016
        },
        {
            "page_id": "163415037006030",
            "m_date": "2023-12-20",
            "engagements_rate": 0.005376344086021505,
            "video_rate": 0.0,
            "posts_rate": 0.01075268817204301
        },
        {
            "page_id": "163415037006030",
            "m_date": "2023-12-21",
            "engagements_rate": 0.26376344086021505,
            "video_rate": 0.0,
            "posts_rate": 0.0
        },
        {
            "page_id": "163415037006030",
            "m_date": "2023-12-22",
            "engagements_rate": 0.045376344086005,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "163415037006030",
            "m_date": "2023-12-23",
            "engagements_rate": 0.133763440860215,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "163415037006030",
            "m_date": "2023-12-24",
            "engagements_rate": 0.34763440860215,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "163415037006030",
            "m_date": "2023-12-25",
            "engagements_rate": 0.47763440860215,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "163415037006030",
            "m_date": "2023-12-26",
            "engagements_rate": 0.523763440860215,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "163415037006030",
            "m_date": "2023-12-27",
            "engagements_rate": 0.433763440860215,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "163415037006030",
            "m_date": "2023-12-28",
            "engagements_rate": 0.5737634860215,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "163415037006030",
            "m_date": "2023-12-29",
            "engagements_rate": 0.583763440215,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "163415037006030",
            "m_date": "2023-12-30",
            "engagements_rate": 0.503763440215,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "163415037006030",
            "m_date": "2023-12-31",
            "engagements_rate": 0.43763440215,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "163415037006030",
            "m_date": "2024-01-01",
            "engagements_rate": 0.3263440860215,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "163415037006030",
            "m_date": "2024-01-02",
            "engagements_rate": 0.41763440860215,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "163415037006030",
            "m_date": "2024-01-03",
            "engagements_rate": 0.38763440860215,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "163415037006030",
            "m_date": "2024-01-04",
            "engagements_rate": 0.51763440860215,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "163415037006030",
            "m_date": "2024-01-05",
            "engagements_rate": 0.457634408605,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "163415037006030",
            "m_date": "2024-01-06",
            "engagements_rate": 0.25763440860215,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "163415037006030",
            "m_date": "2024-01-07",
            "engagements_rate": 0.33763440860215,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "163415037006030",
            "m_date": "2024-01-08",
            "engagements_rate": 0.43763440860215,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "163415037006030",
            "m_date": "2024-01-09",
            "engagements_rate": 0.42376344086215,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "163415037006030",
            "m_date": "2024-01-10",
            "engagements_rate": 0.5763440860215,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "163415037006030",
            "m_date": "2024-01-11",
            "engagements_rate": 0.3763440860215,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "163415037006030",
            "m_date": "2024-01-12",
            "engagements_rate": 0.253763440865,
            "video_rate": 0,
            "posts_rate": 0
        }
    ],
    "Asset 2": [
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-13",
            "engagements_rate": 0.53763440865,
            "video_rate": 0.0,
            "posts_rate": 0.0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-14",
            "engagements_rate": 0.115,
            "video_rate": 0.0,
            "posts_rate": 0.0909090909090909
        },
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-15",
            "engagements_rate": 0.243,
            "video_rate": 0.3333333333333333,
            "posts_rate": 0.0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-16",
            "engagements_rate": 0.543,
            "video_rate": 0.0,
            "posts_rate": 0.0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-17",
            "engagements_rate": 0.35132,
            "video_rate": 0.0,
            "posts_rate": 0.0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-18",
            "engagements_rate": 0.531,
            "video_rate": 0.0,
            "posts_rate": 0.037037037037037035
        },
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-19",
            "engagements_rate": 0.2432,
            "video_rate": 0.5,
            "posts_rate": 0.0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-20",
            "engagements_rate": 0.4251,
            "video_rate": 0.0,
            "posts_rate": 0.0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-21",
            "engagements_rate": 0.3526,
            "video_rate": 0.0,
            "posts_rate": 0.0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-22",
            "engagements_rate": 0.1245,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-23",
            "engagements_rate": 0.17,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-24",
            "engagements_rate": 0.24351,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-25",
            "engagements_rate": 0.51423,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-26",
            "engagements_rate": 0.4215,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-27",
            "engagements_rate": 0.5134,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-28",
            "engagements_rate": 0.62541,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-29",
            "engagements_rate": 0.1243,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-30",
            "engagements_rate": 0.5134,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-31",
            "engagements_rate": 0.4235,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2024-01-01",
            "engagements_rate": 0.1425,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2024-01-02",
            "engagements_rate": 0.6354,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2024-01-03",
            "engagements_rate": 0.52341,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2024-01-04",
            "engagements_rate": 0.3254,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2024-01-05",
            "engagements_rate": 0.4350,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2024-01-06",
            "engagements_rate": 0.1422,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2024-01-07",
            "engagements_rate": 0.5241,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2024-01-08",
            "engagements_rate": 0.43215,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2024-01-09",
            "engagements_rate": 0.5311,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2024-01-10",
            "engagements_rate": 0.50412,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2024-01-11",
            "engagements_rate": 0.48351,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2024-01-12",
            "engagements_rate": 0.513520,
            "video_rate": 0,
            "posts_rate": 0
        }
    ],
    "Asset 3": [
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-13",
            "engagements_rate": 0.431,
            "video_rate": 0.0,
            "posts_rate": 0.0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-14",
            "engagements_rate": 0.14725,
            "video_rate": 0.0,
            "posts_rate": 0.0909090909090909
        },
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-15",
            "engagements_rate": 0.21351,
            "video_rate": 0.3333333333333333,
            "posts_rate": 0.0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-16",
            "engagements_rate": 0.1424,
            "video_rate": 0.0,
            "posts_rate": 0.0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-17",
            "engagements_rate": 0.1305,
            "video_rate": 0.0,
            "posts_rate": 0.0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-18",
            "engagements_rate": 0.2531,
            "video_rate": 0.0,
            "posts_rate": 0.037037037037037035
        },
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-19",
            "engagements_rate": 0.10234,
            "video_rate": 0.5,
            "posts_rate": 0.0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-20",
            "engagements_rate": 0.142,
            "video_rate": 0.0,
            "posts_rate": 0.0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-21",
            "engagements_rate": 0.252,
            "video_rate": 0.0,
            "posts_rate": 0.0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-22",
            "engagements_rate": 0.1520,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-23",
            "engagements_rate": 0.352,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-24",
            "engagements_rate": 0.4235,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-25",
            "engagements_rate": 0.412,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-26",
            "engagements_rate": 0.320,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-27",
            "engagements_rate": 0.510,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-28",
            "engagements_rate": 0.364,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-29",
            "engagements_rate": 0.57,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-30",
            "engagements_rate": 0.032,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2023-12-31",
            "engagements_rate": 0.3054,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2024-01-01",
            "engagements_rate": 0.640,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2024-01-02",
            "engagements_rate": 0.504,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2024-01-03",
            "engagements_rate": 0.4063,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2024-01-04",
            "engagements_rate": 0.452,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2024-01-05",
            "engagements_rate": 0.36,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2024-01-06",
            "engagements_rate": 0.31,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2024-01-07",
            "engagements_rate": 0.421,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2024-01-08",
            "engagements_rate": 0.52,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2024-01-09",
            "engagements_rate": 0.34,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2024-01-10",
            "engagements_rate": 0.55,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2024-01-11",
            "engagements_rate": 0.23,
            "video_rate": 0,
            "posts_rate": 0
        },
        {
            "page_id": "184026961666300",
            "m_date": "2024-01-12",
            "engagements_rate": 0.031,
            "video_rate": 0,
            "posts_rate": 0
        }
    ]
}

const getItemDate = (index: number) => {
    const dayInMilliseconds = 1000 * 60 * 60 * 24
    const milliseconds = new Date().getTime()
    const difference = index * dayInMilliseconds
    const date = new Date(milliseconds - difference)
    const days = date.getDate().toString();
    const month = (date.getMonth() + 1).toString();
    const years = date.getFullYear();
    return `${years}-${addZeroForward(month)}-${addZeroForward(days)}`;
};

export const getDemoStatsChartData = () => {
    const obj: any = {}
    Object.keys(demoStatsChartData).forEach(key => {
        let array = demoStatsChartData[key]
        array.reverse()
        array = array.map((p, i) => {
            const newDate = getItemDate(i)
            return {
                ...p,
                m_date: newDate
            }
        })
        array.reverse()
        obj[key] = array
    })
    return obj
}

export const demoPostPreview1 = {
    "page_id": "100059294813638",
    "_post_id": "748272953825858",
    "created_at": "2024-01-11T20:01:00Z",
    "post_message": "Former South Carolina Gov. Nikki Haley derided a defense argument used by former President Donald Trump's lawyer in his presidential immunity court hearing this week. CNN's Jake Tapper asked Haley if she agreed with an argument that a president should have immunity for any conduct, including the ordering of an assassination of a political rival unless that president is impeached and convicted by the Senate for that offense.",
    "attachment_url": "https://www.facebook.com/photo/?fbid=748272953825858&set=pb.100059294813638.-2207520000",
    "attachment_description": "",
    "unique_video_plays": 0,
    "unique_link_clicks": 6,
    "unique_other_clicks": 10,
    "activity_shares": 7,
    "activity_comments": 143,
    "is_inline_created": false,
    "reactions_likes": 49,
    "reactions_angers": 0,
    "reactions_loves": 4,
    "network": "facebook",
    "attachment_type": null,
    "html": "<iframe src=\"https://www.facebook.com/plugins/post.php?width=350&height=500&href=https://www.facebook.com/photo/?fbid=748272953825858&set=pb.100059294813638.-2207520000\" width=\"350\" height=\"500\" style=\"border:none;overflow:hidden\" scrolling=\"no\" frameborder=\"0\" allowfullscreen=\"true\" allow=\"autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share\"></iframe>"
}

export const demoPostPreview2 = {
    "page_id": "100059294813638",
    "_post_id": "748177057168781",
    "created_at": "2024-01-11T03:21:00Z",
    "post_message": "Former New Jersey Gov. Chris Christie announced Wednesday that he is ending his campaign for the 2024 Republican presidential nomination, marking the exit of the most outspoken critic of former President Donald Trump in the GOP primary. https://cnn.it/3RWBVu9",
    "attachment_url": "https://www.facebook.com/photo/?fbid=748177057168781&set=pb.100059294813638.-2207520000",
    "attachment_description": "",
    "unique_video_plays": 0,
    "unique_link_clicks": 6,
    "unique_other_clicks": 10,
    "activity_shares": 18,
    "activity_comments": 297,
    "is_inline_created": false,
    "reactions_likes": 120,
    "reactions_angers": 39,
    "reactions_loves": 8,
    "network": "facebook",
    "attachment_type": null,
    "html": "<iframe src=\"https://www.facebook.com/plugins/post.php?width=350&height=500&href=https://www.facebook.com/photo/?fbid=748177057168781&set=pb.100059294813638.-2207520000\" width=\"350\" height=\"500\" style=\"border:none;overflow:hidden\" scrolling=\"no\" frameborder=\"0\" allowfullscreen=\"true\" allow=\"autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share\"></iframe>"
}


export const demoPostPreview3 = {
    "page_id": "100059294813638",
    "_post_id": "745027770817043",
    "created_at": "2024-01-5T19:29:00Z",
    "post_message": "Florida Gov. Ron DeSantis said if he were president, he would eliminate the Internal Revenue Service (IRS) and instead create a flat tax rate, as opposed to a federal income tax. \"I think that would be the ideal tax system to be able to do,\" he said during a CNN town hall, though he clarified to the audience that he would only enact that plan if it meant individuals would pay lower taxes. https://cnn.it/3NTx5N0",
    "attachment_url": "https://www.facebook.com/photo/?fbid=745027770817043&set=pb.100059294813638.-2207520000",
    "attachment_description": "",
    "unique_video_plays": 0,
    "unique_link_clicks": 6,
    "unique_other_clicks": 10,
    "activity_shares": 14,
    "activity_comments": 214,
    "is_inline_created": false,
    "reactions_likes": 149,
    "reactions_angers": 0,
    "reactions_loves": 11,
    "network": "facebook",
    "attachment_type": null,
    "html": "<iframe src=\"https://www.facebook.com/plugins/post.php?width=350&height=500&href=https://www.facebook.com/photo/?fbid=745027770817043&set=pb.100059294813638.-2207520000\" width=\"350\" height=\"500\" style=\"border:none;overflow:hidden\" scrolling=\"no\" frameborder=\"0\" allowfullscreen=\"true\" allow=\"autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share\"></iframe>"
}

export const demoPostsList = [demoPostPreview1, demoPostPreview2, demoPostPreview3]


//Opponents data
export type OpponentsDemoDataKey = "donald trump" | "joe biden" | "robert kennedy"

type OpponentsDemoDataType = { [key in OpponentsDemoDataKey]: any }


export const opponentsDemoData: OpponentsDemoDataType = {
    "donald trump": {
        "budget": {
            "currency": "USD",
            "total": 384338.5,
            "last_month": 165958,
            "chart": [
                {
                    "month": "Oct",
                    "value": 125272
                },
                {
                    "month": "Nov",
                    "value": 71155.5
                },
                {
                    "month": "Dec",
                    "value": 142327.5
                },
                {
                    "month": "Jan",
                    "value": 45583.5
                }
            ]
        },
        "number_of_posts": {
            "total": 1023,
            "last_month": 584,
            "chart": [
                {
                    "month": "Oct",
                    "value": 156
                },
                {
                    "month": "Nov",
                    "value": 189
                },
                {
                    "month": "Dec",
                    "value": 345
                },
                {
                    "month": "Jan",
                    "value": 333
                }
            ]
        },
        "reach": {
            "total": 16085488.5,
            "last_month": 9035208,
            "chart": [
                {
                    "month": "Oct",
                    "value": 3408422
                },
                {
                    "month": "Nov",
                    "value": 2667905.5
                },
                {
                    "month": "Dec",
                    "value": 7383827.5
                },
                {
                    "month": "Jan",
                    "value": 2625333.5
                }
            ]
        },
        "geo_target_groups": {
            "New Hampshire": 14582704,
            "New York": 3486306,
            "Nebraska": 4521665,
            "Texas": 7282910,
            "Nevada": 6899673,
            "California": 9259876,
            "Florida": 34026121,
            "Illinois": 5291889,
            "Iowa": 130772952,
            "Maine": 4934053,
            "Massachusetts": 20724397
        },
        "demographic_target_groups": {
            "unknown": {
                "65+": 474317,
                "18-24": 414678,
                "25-34": 311011,
                "55-64": 431198,
                "45-54": 453079,
                "35-44": 420074
            },
            "female": {
                "65+": 26224271,
                "18-24": 7962201,
                "45-54": 17065689,
                "25-34": 11528574,
                "35-44": 15464951,
                "55-64": 22855123
            },
            "male": {
                "65+": 27938255,
                "18-24": 22951249,
                "45-54": 32281531,
                "25-34": 30330904,
                "55-64": 34840957,
                "35-44": 32166886
            }
        }
    },


    "joe biden": {
        "budget": {
            "currency": "USD",
            "total": 1790393,
            "last_month": 885526,
            "chart": [
                {
                    "month": "Oct",
                    "value": 95823
                },
                {
                    "month": "Nov",
                    "value": 447986.5
                },
                {
                    "month": "Dec",
                    "value": 962567.5
                },
                {
                    "month": "Jan",
                    "value": 284016
                }
            ]
        },
        "number_of_posts": {
            "total": 1914,
            "last_month": 648,
            "chart": [
                {
                    "month": "Oct",
                    "value": 454
                },
                {
                    "month": "Nov",
                    "value": 527
                },
                {
                    "month": "Dec",
                    "value": 765
                },
                {
                    "month": "Jan",
                    "value": 168
                }
            ]
        },
        "reach": {
            "total": 53466044,
            "last_month": 32292176,
            "chart": [
                {
                    "month": "Oct",
                    "value": 2651273
                },
                {
                    "month": "Nov",
                    "value": 10551237
                },
                {
                    "month": "Dec",
                    "value": 32616618
                },
                {
                    "month": "Jan",
                    "value": 7646916
                }
            ]
        },
        "geo_target_groups": {
            "Pennsylvania": 47469911,
            "Nevada": 10765305,
            "New Jersey": 30211696,
            "New Mexico": 10520793,
            "New York": 69816155,
            "North Carolina": 30859110,
            "Ohio": 33851060,
            "Oregon": 24884972,
            "Minnesota": 22426004,
            "South Carolina": 10153465,
            "Tennessee": 15150619,
            "Texas": 55172966,
            "Virginia": 28836182,
            "Washington": 40861732,
            "Wisconsin": 26273348,
            "Missouri": 18388613,
            "Michigan": 36798513,
            "Florida": 64642804,
            "Arizona": 27693027,
            "California": 147199615,
            "Colorado": 24475212,
            "Connecticut": 16969814,
            "Georgia": 20836062,
            "Massachusetts": 32494493,
            "Illinois": 37913984,
            "Indiana": 16254177,
            "Iowa": 10771254,
            "Kentucky": 11992963,
            "Maryland": 22530738
        },
        "demographic_target_groups": {
            "unknown": {
                "45-54": 1623062,
                "55-64": 3093127,
                "65+": 7226716,
                "25-34": 864980,
                "35-44": 1179650,
                "18-24": 246908
            },
            "female": {
                "25-34": 14763421,
                "18-24": 4628454,
                "65+": 376444401,
                "55-64": 133552269,
                "45-54": 50838654,
                "35-44": 25624717
            },
            "male": {
                "35-44": 33808528,
                "65+": 219874135,
                "55-64": 101857747,
                "45-54": 50962405,
                "25-34": 21942706,
                "18-24": 6548770
            }
        }
    },

    "robert kennedy": {
        "budget": {
            "currency": "USD",
            "total": 235546.5,
            "last_month": 195205,
            "chart": [
                {
                    "month": "Nov",
                    "value": 4435.5
                },
                {
                    "month": "Dec",
                    "value": 224925
                },
                {
                    "month": "Jan",
                    "value": 6186
                }
            ]
        },
        "number_of_posts": {
            "total": 307,
            "last_month": 190,
            "chart": [
                {
                    "month": "Nov",
                    "value": 29
                },
                {
                    "month": "Dec",
                    "value": 250
                },
                {
                    "month": "Jan",
                    "value": 28
                }
            ]
        },
        "reach": {
            "total": 11490847.5,
            "last_month": 9088906,
            "chart": [
                {
                    "month": "Nov",
                    "value": 163485.5
                },
                {
                    "month": "Dec",
                    "value": 10953876
                },
                {
                    "month": "Jan",
                    "value": 373486
                }
            ]
        },
        "geo_target_groups": {
            "New Jersey": 6383436,
            "New York": 12700405,
            "North Carolina": 7855259,
            "Ohio": 7054972,
            "Oklahoma": 2543382,
            "Oregon": 4771870,
            "Pennsylvania": 8923854,
            "South Carolina": 3092070,
            "Tennessee": 5231301,
            "Texas": 12843378,
            "Utah": 9133476,
            "Virginia": 5327685,
            "Washington": 6940631,
            "Wisconsin": 4443045,
            "Idaho": 2452332,
            "Arizona": 11168161,
            "California": 27698279,
            "Colorado": 5719240,
            "Connecticut": 3132680,
            "Florida": 13597054,
            "Georgia": 7446441,
            "Hawaii": 2990348,
            "Illinois": 7056126,
            "Missouri": 5301987,
            "Indiana": 4689631,
            "Iowa": 2687055,
            "Kansas": 2740694,
            "Kentucky": 2930800,
            "Maryland": 2725202,
            "Massachusetts": 6803994,
            "Michigan": 7168803,
            "Minnesota": 4156372
        },
        "demographic_target_groups": {
            "female": {
                "35-44": 13206030,
                "25-34": 7487072,
                "55-64": 24048060,
                "45-54": 16014152,
                "65+": 29378732,
                "18-24": 1550826
            },
            "male": {
                "55-64": 27282964,
                "65+": 25915762,
                "25-34": 29236857,
                "45-54": 22915173,
                "35-44": 26709864,
                "18-24": 16525000
            },
            "unknown": {
                "55-64": 712802,
                "45-54": 461366,
                "25-34": 418818,
                "35-44": 534138,
                "65+": 653283,
                "18-24": 357612
            }
        }
    }



}




export const opponentsDemoGTrends: IGTrends = {
    "donald trump": {
        interest_over_time: {
            "2023-10-17": 27,
            "2023-10-18": 29,
            "2023-10-19": 29,
            "2023-10-20": 29,
            "2023-10-21": 25,
            "2023-10-22": 25,
            "2023-10-23": 26,
            "2023-10-24": 30,
            "2023-10-25": 33,
            "2023-10-26": 30,
            "2023-10-27": 28,
            "2023-10-28": 27,
            "2023-10-29": 25,
            "2023-10-30": 27,
            "2023-10-31": 29,
            "2023-11-01": 35,
            "2023-11-02": 39,
            "2023-11-03": 30,
            "2023-11-04": 24,
            "2023-11-05": 24,
            "2023-11-06": 41,
            "2023-11-07": 43,
            "2023-11-08": 35,
            "2023-11-09": 38,
            "2023-11-10": 29,
            "2023-11-11": 24,
            "2023-11-12": 30,
            "2023-11-13": 39,
            "2023-11-14": 37,
            "2023-11-15": 30,
            "2023-11-16": 27,
            "2023-11-17": 28,
            "2023-11-18": 25,
            "2023-11-19": 25,
            "2023-11-20": 33,
            "2023-11-21": 29,
            "2023-11-22": 24,
            "2023-11-23": 25,
            "2023-11-24": 26,
            "2023-11-25": 23,
            "2023-11-26": 25,
            "2023-11-27": 23,
            "2023-11-28": 26,
            "2023-11-29": 27,
            "2023-11-30": 26,
            "2023-12-01": 25,
            "2023-12-02": 24,
            "2023-12-03": 22,
            "2023-12-04": 25,
            "2023-12-05": 26,
            "2023-12-06": 30,
            "2023-12-07": 32,
            "2023-12-08": 28,
            "2023-12-09": 24,
            "2023-12-10": 26,
            "2023-12-11": 26,
            "2023-12-12": 26,
            "2023-12-13": 27,
            "2023-12-14": 26,
            "2023-12-15": 26,
            "2023-12-16": 27,
            "2023-12-17": 28,
            "2023-12-18": 25,
            "2023-12-19": 32,
            "2023-12-20": 69,
            "2023-12-21": 39,
            "2023-12-22": 32,
            "2023-12-23": 32,
            "2023-12-24": 33,
            "2023-12-25": 34,
            "2023-12-26": 30,
            "2023-12-27": 31,
            "2023-12-28": 31,
            "2023-12-29": 44,
            "2023-12-30": 31,
            "2023-12-31": 30,
            "2024-01-01": 33,
            "2024-01-02": 31,
            "2024-01-03": 31,
            "2024-01-04": 43,
            "2024-01-05": 39,
            "2024-01-06": 43,
            "2024-01-07": 35,
            "2024-01-08": 33,
            "2024-01-09": 37,
            "2024-01-10": 41,
            "2024-01-11": 46,
            "2024-01-12": 38,
            "2024-01-13": 36,
            "2024-01-14": 37,
            "2024-01-15": 44,
            "2024-01-16": 100,
            "2024-01-17": 46
        }
    },
    "joe biden": {
        interest_over_time: {
            "2023-10-17": 33,
            "2023-10-18": 57,
            "2023-10-19": 47,
            "2023-10-20": 52,
            "2023-10-21": 30,
            "2023-10-22": 28,
            "2023-10-23": 28,
            "2023-10-24": 30,
            "2023-10-25": 26,
            "2023-10-26": 27,
            "2023-10-27": 25,
            "2023-10-28": 22,
            "2023-10-29": 23,
            "2023-10-30": 23,
            "2023-10-31": 21,
            "2023-11-01": 23,
            "2023-11-02": 24,
            "2023-11-03": 23,
            "2023-11-04": 19,
            "2023-11-05": 20,
            "2023-11-06": 24,
            "2023-11-07": 23,
            "2023-11-08": 24,
            "2023-11-09": 26,
            "2023-11-10": 22,
            "2023-11-11": 20,
            "2023-11-12": 22,
            "2023-11-13": 23,
            "2023-11-14": 27,
            "2023-11-15": 30,
            "2023-11-16": 35,
            "2023-11-17": 27,
            "2023-11-18": 22,
            "2023-11-19": 23,
            "2023-11-20": 39,
            "2023-11-21": 45,
            "2023-11-22": 27,
            "2023-11-23": 27,
            "2023-11-24": 21,
            "2023-11-25": 18,
            "2023-11-26": 18,
            "2023-11-27": 17,
            "2023-11-28": 20,
            "2023-11-29": 21,
            "2023-11-30": 19,
            "2023-12-01": 20,
            "2023-12-02": 15,
            "2023-12-03": 16,
            "2023-12-04": 18,
            "2023-12-05": 19,
            "2023-12-06": 22,
            "2023-12-07": 21,
            "2023-12-08": 30,
            "2023-12-09": 24,
            "2023-12-10": 20,
            "2023-12-11": 19,
            "2023-12-12": 20,
            "2023-12-13": 26,
            "2023-12-14": 50,
            "2023-12-15": 43,
            "2023-12-16": 21,
            "2023-12-17": 18,
            "2023-12-18": 27,
            "2023-12-19": 22,
            "2023-12-20": 23,
            "2023-12-21": 21,
            "2023-12-22": 24,
            "2023-12-23": 21,
            "2023-12-24": 20,
            "2023-12-25": 20,
            "2023-12-26": 17,
            "2023-12-27": 18,
            "2023-12-28": 18,
            "2023-12-29": 19,
            "2023-12-30": 20,
            "2023-12-31": 19,
            "2024-01-01": 24,
            "2024-01-02": 18,
            "2024-01-03": 18,
            "2024-01-04": 21,
            "2024-01-05": 26,
            "2024-01-06": 29,
            "2024-01-07": 23,
            "2024-01-08": 24,
            "2024-01-09": 22,
            "2024-01-10": 22,
            "2024-01-11": 25,
            "2024-01-12": 27,
            "2024-01-13": 26,
            "2024-01-14": 23,
            "2024-01-15": 24,
            "2024-01-16": 36,
            "2024-01-17": 21
        }
    },
    "robert kennedy": {
        interest_over_time: {
            "2023-10-17": 5,
            "2023-10-18": 5,
            "2023-10-19": 5,
            "2023-10-20": 4,
            "2023-10-21": 3,
            "2023-10-22": 3,
            "2023-10-23": 3,
            "2023-10-24": 4,
            "2023-10-25": 4,
            "2023-10-26": 5,
            "2023-10-27": 5,
            "2023-10-28": 4,
            "2023-10-29": 3,
            "2023-10-30": 4,
            "2023-10-31": 4,
            "2023-11-01": 4,
            "2023-11-02": 4,
            "2023-11-03": 5,
            "2023-11-04": 5,
            "2023-11-05": 4,
            "2023-11-06": 5,
            "2023-11-07": 8,
            "2023-11-08": 8,
            "2023-11-09": 6,
            "2023-11-10": 5,
            "2023-11-11": 5,
            "2023-11-12": 5,
            "2023-11-13": 6,
            "2023-11-14": 5,
            "2023-11-15": 6,
            "2023-11-16": 6,
            "2023-11-17": 6,
            "2023-11-18": 6,
            "2023-11-19": 7,
            "2023-11-20": 6,
            "2023-11-21": 5,
            "2023-11-22": 9,
            "2023-11-23": 6,
            "2023-11-24": 6,
            "2023-11-25": 5,
            "2023-11-26": 5,
            "2023-11-27": 4,
            "2023-11-28": 4,
            "2023-11-29": 4,
            "2023-11-30": 4,
            "2023-12-01": 4,
            "2023-12-02": 3,
            "2023-12-03": 4,
            "2023-12-04": 4,
            "2023-12-05": 4,
            "2023-12-06": 6,
            "2023-12-07": 5,
            "2023-12-08": 5,
            "2023-12-09": 4,
            "2023-12-10": 4,
            "2023-12-11": 4,
            "2023-12-12": 4,
            "2023-12-13": 4,
            "2023-12-14": 4,
            "2023-12-15": 4,
            "2023-12-16": 4,
            "2023-12-17": 3,
            "2023-12-18": 3,
            "2023-12-19": 3,
            "2023-12-20": 4,
            "2023-12-21": 4,
            "2023-12-22": 3,
            "2023-12-23": 3,
            "2023-12-24": 3,
            "2023-12-25": 3,
            "2023-12-26": 4,
            "2023-12-27": 3,
            "2023-12-28": 3,
            "2023-12-29": 4,
            "2023-12-30": 3,
            "2023-12-31": 4,
            "2024-01-01": 4,
            "2024-01-02": 4,
            "2024-01-03": 5,
            "2024-01-04": 6,
            "2024-01-05": 5,
            "2024-01-06": 5,
            "2024-01-07": 5,
            "2024-01-08": 4,
            "2024-01-09": 4,
            "2024-01-10": 4,
            "2024-01-11": 4,
            "2024-01-12": 4,
            "2024-01-13": 4,
            "2024-01-14": 4,
            "2024-01-15": 4,
            "2024-01-16": 5,
            "2024-01-17": 3
        }
    }
}



//Election map points
export const demoElectionMapPoints = [
    {
        "City": "Colonia Kino",
        "lng": -116.8058846153846,
        "lat": 32.40472307692308,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Los Altos (Ruíz Valencia)",
        "lng": -116.9963,
        "lat": 32.4538,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Colinas del Florido",
        "lng": -116.78061111111111,
        "lat": 32.49058888888889,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Jardines del Lago",
        "lng": -117.0664,
        "lat": 32.4222,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia INFONAVIT La Mesa",
        "lng": -116.8769,
        "lat": 32.32389090909091,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia El Triunfo",
        "lng": -116.75873333333334,
        "lat": 32.40616666666667,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia La Morita 2a Sección",
        "lng": -116.678175,
        "lat": 32.05833333333333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Condesa",
        "lng": -116.88399166666666,
        "lat": 32.48574166666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia De los Maestros",
        "lng": -116.88399166666666,
        "lat": 32.48574166666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Lomas del Pacifico",
        "lng": -116.9469,
        "lat": 32.4345,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Zona industrial Valle Bonito",
        "lng": -116.8831,
        "lat": 32.4256,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Otay Galerías",
        "lng": -116.8041,
        "lat": 32.468,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Los Venados",
        "lng": -116.92279999999998,
        "lat": 32.4194,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Plazas",
        "lng": -116.9436,
        "lat": 32.4089,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Insurgentes",
        "lng": -116.7397,
        "lat": 32.5482,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia La Joya",
        "lng": -116.87156923076924,
        "lat": 32.44844615384615,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Quinta Versalles",
        "lng": -117.025,
        "lat": 32.4306,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Javier Rojo Gómez",
        "lng": -116.8222,
        "lat": 32.4939,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Valle del Rubí Sección Terrazas",
        "lng": -116.8121,
        "lat": 32.3557,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Anexa Magisterial",
        "lng": -116.7397,
        "lat": 32.5482,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Valle Dorado",
        "lng": -116.87776999999998,
        "lat": 32.433260000000004,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Calete",
        "lng": -116.9505,
        "lat": 32.362,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Los Naranjos",
        "lng": -116.90063333333332,
        "lat": 32.43026666666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Puente La Joya",
        "lng": -116.5175,
        "lat": 32.5651,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Lomas de Matamoros",
        "lng": -116.8684,
        "lat": 32.47053636363636,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Plan de Barranquitas",
        "lng": -116.79406666666668,
        "lat": 32.496766666666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Hacienda del Mar",
        "lng": -116.99101428571429,
        "lat": 32.4193,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Cañón Azteca",
        "lng": -116.9359,
        "lat": 32.4724,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia La Pechuga",
        "lng": -116.7472,
        "lat": 32.3362,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Camino Real",
        "lng": -116.83006666666668,
        "lat": 32.40154444444445,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Hipódromo",
        "lng": -116.99482222222224,
        "lat": 32.50418888888888,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia La Jolla",
        "lng": -117.001,
        "lat": 32.4462,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Emiliano Zapata",
        "lng": -116.87776999999998,
        "lat": 32.433260000000004,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Colinas del Sol",
        "lng": -117.0425,
        "lat": 32.4647,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Zona industrial Industrial Pacífico III",
        "lng": -116.87767,
        "lat": 32.46521,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Unidad habitacional INFONAVIT Loma II",
        "lng": -116.79802,
        "lat": 32.46782,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Azcona",
        "lng": -116.721025,
        "lat": 32.450525,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Rinconada de Otay",
        "lng": -116.9436,
        "lat": 32.4089,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Colinas de la Presa",
        "lng": -116.90063333333332,
        "lat": 32.43026666666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Quintas Campestre El Refugio",
        "lng": -116.8046,
        "lat": 32.4732,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Ojo de Agua (El Florido)",
        "lng": -116.78061111111111,
        "lat": 32.49058888888889,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Lagunitas 3a Sección",
        "lng": -116.84985,
        "lat": 32.44055,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Electricistas",
        "lng": -116.70433333333332,
        "lat": 32.313233333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Terrazas del Sol",
        "lng": -117.0877,
        "lat": 32.4679,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Jalisco",
        "lng": -116.7722,
        "lat": 32.513459999999995,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Contreras Oeste",
        "lng": -116.70433333333332,
        "lat": 32.313233333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Equipamiento Colegio Ibero Tijuana",
        "lng": -116.9661,
        "lat": 32.4386,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Reacomodo Obras Publicas",
        "lng": -117.0099,
        "lat": 32.4252,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Loma Encantada",
        "lng": -116.9743,
        "lat": 32.43455,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Meseta del Chema",
        "lng": -116.79970000000002,
        "lat": 32.405,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Unidad habitacional Otay Universidad",
        "lng": -116.53342857142856,
        "lat": 32.22461428571428,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Loma Bonita (NA)",
        "lng": -117.0099,
        "lat": 32.4252,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Pórticos del Lago",
        "lng": -117.03117142857144,
        "lat": 32.41961428571428,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa del Real II",
        "lng": -116.74276296296296,
        "lat": 32.36484074074074,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia La Ilusión",
        "lng": -116.9576,
        "lat": 32.3915,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Río Tijuana 2a. Etapa",
        "lng": -116.8769,
        "lat": 32.32389090909091,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Misiones del Pedregal",
        "lng": -116.7714,
        "lat": 32.35883333333333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Defensores de Baja California",
        "lng": -116.7333,
        "lat": 32.5333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Bugambilias (Jacarandas)",
        "lng": -117.0664,
        "lat": 32.4222,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Colinas de La Mesa",
        "lng": -116.904675,
        "lat": 32.431574999999995,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Gerónimo Meza",
        "lng": -116.70433333333332,
        "lat": 32.313233333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa Fontana IV",
        "lng": -116.8684,
        "lat": 32.47053636363636,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Las Huertas 4a Sección",
        "lng": -116.76182,
        "lat": 32.505406666666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Lomas de San Martín",
        "lng": -116.87767,
        "lat": 32.46521,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Lomas Las Huertas",
        "lng": -116.76182,
        "lat": 32.505406666666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Margarita Residencial",
        "lng": -116.8071,
        "lat": 32.5007,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Luna Park",
        "lng": -116.90294285714286,
        "lat": 32.431014285714284,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Privada Hacienda Córdoba",
        "lng": -116.7997,
        "lat": 32.405,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Privada Catalana",
        "lng": -116.96044285714288,
        "lat": 32.48452857142858,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Santa Elena",
        "lng": -116.8769,
        "lat": 32.32389090909091,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa Fontana IX",
        "lng": -116.74276296296296,
        "lat": 32.36484074074074,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Urías",
        "lng": -116.7722,
        "lat": 32.513459999999995,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Alfa Panamericano",
        "lng": -116.6881,
        "lat": 32.466,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia López Oeste",
        "lng": -116.81761333333334,
        "lat": 32.483293333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Baja California",
        "lng": -116.90294285714286,
        "lat": 32.431014285714284,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Costa Coronado Residencial",
        "lng": -117.0176,
        "lat": 32.4585,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento La Perla Bahía",
        "lng": -116.9742375,
        "lat": 32.4475875,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Lomas Hipódromo",
        "lng": -116.88708571428572,
        "lat": 32.421842857142856,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Zermeño (Mérida)",
        "lng": -116.89255,
        "lat": 32.42765,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Los Saucillos",
        "lng": -116.79970000000002,
        "lat": 32.405,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Puerta Plata",
        "lng": -116.9576,
        "lat": 32.3915,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Real de San Francisco",
        "lng": -116.7997,
        "lat": 32.405,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Unidad habitacional Estadio Potros",
        "lng": -116.8058846153846,
        "lat": 32.40472307692308,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Industrial Morelos",
        "lng": -116.6881,
        "lat": 32.466,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Residencial Agua Caliente",
        "lng": -116.85684,
        "lat": 32.4317,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Escolar Agua Caliente",
        "lng": -116.79406666666668,
        "lat": 32.496766666666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Unidad habitacional Militar",
        "lng": -116.8455,
        "lat": 32.350744444444445,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia El Pedregal",
        "lng": -116.6942,
        "lat": 32.490966666666665,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Alfonso Garzón",
        "lng": -116.7333,
        "lat": 32.5333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Balcón Las Huertas",
        "lng": -116.7722,
        "lat": 32.513459999999995,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Rincón Toscano",
        "lng": -117.00107142857144,
        "lat": 32.47284285714286,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa Fontana III",
        "lng": -116.74276296296296,
        "lat": 32.36484074074074,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Cañadas del Florido",
        "lng": -116.678175,
        "lat": 32.05833333333333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Tres M (Pérez)",
        "lng": -116.79189999999998,
        "lat": 32.5075,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Nido de las Águilas",
        "lng": -116.7397,
        "lat": 32.5482,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Lomas de Agua Caliente 5a Sección",
        "lng": -116.89830000000002,
        "lat": 32.4248,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia La Cuestecita",
        "lng": -117.025,
        "lat": 32.4306,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Las Torres",
        "lng": -116.7397,
        "lat": 32.5482,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia El Chicote",
        "lng": -116.9955,
        "lat": 32.4252,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia El Cortez",
        "lng": -116.97188,
        "lat": 32.42098,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Roberto Yahuaca",
        "lng": -116.8198,
        "lat": 32.4041,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Residencial Los Abedules",
        "lng": -116.746,
        "lat": 32.2572,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Valparaíso Residencial",
        "lng": -116.9743,
        "lat": 32.43455,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Valle del Pedregal",
        "lng": -116.79287857142856,
        "lat": 32.40490714285714,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Terrazas de San Angel",
        "lng": -117.09744,
        "lat": 32.42258,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Condominio Real de La Frontera",
        "lng": -116.9178,
        "lat": 32.5254,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Gerónimo Meza Este",
        "lng": -116.70433333333332,
        "lat": 32.313233333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia El Niño",
        "lng": -116.79189999999998,
        "lat": 32.5075,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento FOVISSSTE Los Volcanes",
        "lng": -116.81761333333334,
        "lat": 32.483293333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Villa Mar",
        "lng": -117.0176,
        "lat": 32.4585,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Simón Bolívar",
        "lng": -116.79287857142856,
        "lat": 32.40490714285714,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Monte Bello",
        "lng": -116.83006666666668,
        "lat": 32.40154444444445,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia El Progreso",
        "lng": -116.88335,
        "lat": 32.4193,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Rancho las Flores 2a Sección",
        "lng": -117.0874,
        "lat": 32.5187,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Terrazas del Valle 2a Sección",
        "lng": -116.79189999999998,
        "lat": 32.5075,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Laderas de Otay",
        "lng": -116.53342857142856,
        "lat": 32.22461428571428,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Mirador Capistrano",
        "lng": -116.8058846153846,
        "lat": 32.40472307692308,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Alcalá",
        "lng": -116.70433333333332,
        "lat": 32.313233333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Kennedy",
        "lng": -116.7333,
        "lat": 32.5333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Genaro Vázquez Sección Tres",
        "lng": -116.9582888888889,
        "lat": 32.43449999999999,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Vista Alamar",
        "lng": -116.79802,
        "lat": 32.46782,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia El Peñón",
        "lng": -116.68644545454544,
        "lat": 32.329181818181816,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Arboledas",
        "lng": -116.89255,
        "lat": 32.42765,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Alicia Carrillo",
        "lng": -116.70433333333332,
        "lat": 32.313233333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Las Fuentes",
        "lng": -116.76182,
        "lat": 32.505406666666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia La Remosa",
        "lng": -116.88708571428572,
        "lat": 32.421842857142856,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Playa Diamante",
        "lng": -116.96688333333334,
        "lat": 32.44551666666667,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Lomas del Valle",
        "lng": -116.79189999999998,
        "lat": 32.5075,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Ampliación Guaycura",
        "lng": -117.03117142857144,
        "lat": 32.41961428571428,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia El Pípila",
        "lng": -116.8684,
        "lat": 32.47053636363636,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Anexa 20 de Noviembre",
        "lng": -116.7405,
        "lat": 32.4424,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Arboledas de La Mesa",
        "lng": -116.89255,
        "lat": 32.42765,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Del Río",
        "lng": -116.7333,
        "lat": 32.5333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Lomas del Refugio",
        "lng": -116.78061111111111,
        "lat": 32.49058888888889,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Libramiento (Zona AO)",
        "lng": -116.79970000000002,
        "lat": 32.405,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia El Prado Este",
        "lng": -116.81761333333334,
        "lat": 32.483293333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Patrimonio Alamar",
        "lng": -116.7912,
        "lat": 32.44583333333333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Otay Diamantes",
        "lng": -116.8041,
        "lat": 32.468,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa Residencial del Bosque",
        "lng": -116.68644545454544,
        "lat": 32.329181818181816,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Hábitat Piedras Blancas",
        "lng": -116.8831,
        "lat": 32.4256,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Anexa Niños Héroes",
        "lng": -116.97188,
        "lat": 32.42098,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Residencial La Esmeralda",
        "lng": -116.88399166666666,
        "lat": 32.48574166666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento La Esperanza [Granjas Familiares]",
        "lng": -117.10765,
        "lat": 32.4589,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Vista Hermosa",
        "lng": -117.0664,
        "lat": 32.4222,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Las Brisas Norte",
        "lng": -116.87156923076924,
        "lat": 32.44844615384615,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Valle Vista 2a Sección",
        "lng": -116.690575,
        "lat": 32.506625,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Unidad habitacional Capistrano INFONAVIT",
        "lng": -116.8058846153846,
        "lat": 32.40472307692308,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento La Muralla",
        "lng": -116.82194285714286,
        "lat": 32.44438571428571,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Natura Sección Vistas del Sol",
        "lng": -116.9576,
        "lat": 32.3915,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Jardines del Rubí",
        "lng": -116.8121,
        "lat": 32.3557,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Herradura Sur",
        "lng": -116.8983,
        "lat": 32.4248,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Pórticos de Tijuana",
        "lng": -117.02846153846154,
        "lat": 32.419415384615384,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Ribera del Bosque",
        "lng": -116.68644545454544,
        "lat": 32.329181818181816,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Cumbres del Sol",
        "lng": -116.81466666666668,
        "lat": 32.371833333333335,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Guadalajara (La Mesa)",
        "lng": -116.87156923076924,
        "lat": 32.44844615384615,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento El Florido Sección Colinas",
        "lng": -116.78061111111111,
        "lat": 32.49058888888889,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Neidhart",
        "lng": -116.99482222222224,
        "lat": 32.50418888888888,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Anexa Roma",
        "lng": -116.9469,
        "lat": 32.4345,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Zona militar 28 Batallón de Infantería",
        "lng": -116.8455,
        "lat": 32.350744444444445,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Terrazas de La Presa",
        "lng": -116.9109,
        "lat": 32.4516,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia El Mirador",
        "lng": -116.8065142857143,
        "lat": 32.4742,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Ley del Servicio Civil",
        "lng": -117.09744,
        "lat": 32.42258,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Colinas de la Presa Sección Montebello",
        "lng": -116.90063333333332,
        "lat": 32.43026666666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Otay Vista",
        "lng": -116.79802,
        "lat": 32.46782,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Anexa Santa Fe",
        "lng": -116.76182,
        "lat": 32.505406666666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Anexa Del Río",
        "lng": -116.7333,
        "lat": 32.5333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Jardines de La Gloria",
        "lng": -117.001,
        "lat": 32.4462,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento El Rincón",
        "lng": -116.79287857142856,
        "lat": 32.40490714285714,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Santa Fe",
        "lng": -116.78061111111111,
        "lat": 32.49058888888889,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Lomas Doctores (Chapultepec Doctores)",
        "lng": -116.8985,
        "lat": 32.333975,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento INFONAVIT Lomas del Porvenir",
        "lng": -116.952175,
        "lat": 32.441375,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa del Real VIII",
        "lng": -116.74276296296296,
        "lat": 32.36484074074074,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Salvatierra",
        "lng": -116.91670000000002,
        "lat": 32.3,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Mariano Matamoros (Centro)",
        "lng": -116.7997,
        "lat": 32.405,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Los Venados Oeste",
        "lng": -116.92279999999998,
        "lat": 32.4194,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Unión",
        "lng": -116.93746666666668,
        "lat": 32.43723333333333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Murua Poniente",
        "lng": -116.690575,
        "lat": 32.506625,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Las Plazas",
        "lng": -116.88399166666666,
        "lat": 32.48574166666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Cuauhtémoc",
        "lng": -116.79406666666668,
        "lat": 32.496766666666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Zona industrial El Florido I",
        "lng": -116.746,
        "lat": 32.2572,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Buenos Aires Sur",
        "lng": -116.7366,
        "lat": 32.3617,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Otay Constituyentes",
        "lng": -116.9436,
        "lat": 32.4089,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Parajes del Valle",
        "lng": -116.8071,
        "lat": 32.5007,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Zona industrial Valle del Sur 1",
        "lng": -116.8121,
        "lat": 32.3557,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Plaza Otay",
        "lng": -116.79802,
        "lat": 32.46782,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Lomas Tijuana",
        "lng": -116.952175,
        "lat": 32.441375,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia El Florido III",
        "lng": -116.7997,
        "lat": 32.405,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Pedregal del Matamoros",
        "lng": -116.7366,
        "lat": 32.3617,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Contreras",
        "lng": -116.70433333333332,
        "lat": 32.313233333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Dávila",
        "lng": -116.9505,
        "lat": 32.362,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Agua Caliente Sección Pinos",
        "lng": -116.79406666666668,
        "lat": 32.496766666666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Artesanal",
        "lng": -116.97188,
        "lat": 32.42098,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento San Quintín",
        "lng": -116.87767,
        "lat": 32.46521,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Chapultepec 9a Sección",
        "lng": -116.99482222222224,
        "lat": 32.50418888888888,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia La Esperanza",
        "lng": -116.6345,
        "lat": 32.37,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa del Prado",
        "lng": -116.87776999999998,
        "lat": 32.433260000000004,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Vista Dorada",
        "lng": -116.89830000000002,
        "lat": 32.4248,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia José Sandoval",
        "lng": -116.81761333333334,
        "lat": 32.483293333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Vista del Valle",
        "lng": -116.79189999999998,
        "lat": 32.5075,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Baja Malibú (Sección Lomas)",
        "lng": -116.99101428571429,
        "lat": 32.4193,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Patrimonio Familiar",
        "lng": -116.8455,
        "lat": 32.350744444444445,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Colinas del Alamar (Torres del Lago)",
        "lng": -117.0664,
        "lat": 32.4222,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Angélica",
        "lng": -116.70433333333332,
        "lat": 32.313233333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa del Real III",
        "lng": -116.74276296296296,
        "lat": 32.36484074074074,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Zona industrial Industrial Pacífico II",
        "lng": -116.9582888888889,
        "lat": 32.43449999999999,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Viñas del Mar II",
        "lng": -117.065,
        "lat": 32.4536,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Real de La Gloria",
        "lng": -117.001,
        "lat": 32.4462,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Valle del Sur",
        "lng": -116.8121,
        "lat": 32.3557,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Real del Monte",
        "lng": -116.83006666666668,
        "lat": 32.40154444444445,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Santa Fe",
        "lng": -116.76182,
        "lat": 32.505406666666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia 10 de Mayo",
        "lng": -116.7397,
        "lat": 32.5482,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Unidad habitacional Presidentes",
        "lng": -117.02846153846154,
        "lat": 32.419415384615384,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Zona industrial Parque Industrial Pacífico IV",
        "lng": -116.9582888888889,
        "lat": 32.43449999999999,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa Fontana VII",
        "lng": -116.74276296296296,
        "lat": 32.36484074074074,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Villa Urrutia",
        "lng": -116.904675,
        "lat": 32.431574999999995,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Playa Blanca",
        "lng": -117.094875,
        "lat": 32.425200000000004,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Chapultepec Este",
        "lng": -116.99482222222224,
        "lat": 32.50418888888888,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia San Angel",
        "lng": -117.0431,
        "lat": 32.4225,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Playas de Tijuana Sección Jardines del Sol",
        "lng": -116.9742375,
        "lat": 32.4475875,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia I Ayuntamiento",
        "lng": -116.9469,
        "lat": 32.4345,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Herrera",
        "lng": -116.93746666666668,
        "lat": 32.43723333333333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Altamira Sur",
        "lng": -116.721025,
        "lat": 32.450525,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Playas de Tijuana Sección Costa Hermosa",
        "lng": -116.9963,
        "lat": 32.4538,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa del Sol V",
        "lng": -116.74276296296296,
        "lat": 32.36484074074074,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Jardín de las Bugambilias",
        "lng": -116.7722,
        "lat": 32.513459999999995,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Paseos del Vergel",
        "lng": -116.82194285714286,
        "lat": 32.44438571428571,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Ampliación Tejamen",
        "lng": -116.79287857142856,
        "lat": 32.40490714285714,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Tepeyac",
        "lng": -116.79287857142856,
        "lat": 32.40490714285714,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento El Palmar",
        "lng": -116.79287857142856,
        "lat": 32.40490714285714,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Pórticos de La Mesa",
        "lng": -116.79970000000002,
        "lat": 32.405,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Las Villas Santa Fe",
        "lng": -116.86178571428572,
        "lat": 32.4718,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Perimetral Norte",
        "lng": -116.8041,
        "lat": 32.468,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Gabilondo",
        "lng": -116.9505,
        "lat": 32.362,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Anexa Porvenir",
        "lng": -116.79970000000002,
        "lat": 32.405,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Cortez",
        "lng": -116.70433333333332,
        "lat": 32.313233333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Paseos del Pacífico",
        "lng": -116.87767,
        "lat": 32.46521,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Otay Jardín II",
        "lng": -116.53342857142856,
        "lat": 32.22461428571428,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento La Esperanza",
        "lng": -116.79287857142856,
        "lat": 32.40490714285714,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Hacienda las Delicias III",
        "lng": -116.9576,
        "lat": 32.3915,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Cañón Miramar",
        "lng": -116.9359,
        "lat": 32.4724,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Guadalupe Victoria",
        "lng": -116.7714,
        "lat": 32.35883333333333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Praderas de La Mesa Sección Valle de las Flores",
        "lng": -116.79970000000002,
        "lat": 32.405,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia 3 de Octubre",
        "lng": -116.904675,
        "lat": 32.431574999999995,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Lomas de La Presa",
        "lng": -116.90063333333332,
        "lat": 32.43026666666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia 18 de Marzo",
        "lng": -116.89255,
        "lat": 32.42765,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Playas de Tijuana Sección La Riviera",
        "lng": -116.9742375,
        "lat": 32.4475875,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Zona industrial Los Pinos (Limón)",
        "lng": -116.89255,
        "lat": 32.42765,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Las Huertas 5a Sección",
        "lng": -116.90294285714286,
        "lat": 32.431014285714284,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia La Esmeralda",
        "lng": -116.76182,
        "lat": 32.505406666666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Leonardo Rodriguez Alcaine",
        "lng": -117.025,
        "lat": 32.4306,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Rincón Dorado",
        "lng": -116.7366,
        "lat": 32.3617,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Mesa de Otay",
        "lng": -116.8041,
        "lat": 32.468,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Insurgentes",
        "lng": -116.79970000000002,
        "lat": 32.405,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Las Flores",
        "lng": -116.87767,
        "lat": 32.46521,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Generación 2000",
        "lng": -116.9576,
        "lat": 32.3915,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa del Campo",
        "lng": -116.78061111111111,
        "lat": 32.49058888888889,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia El Roble Tres R",
        "lng": -116.8046,
        "lat": 32.4732,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Linda Vista",
        "lng": -116.8198,
        "lat": 32.4041,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Chula Vista",
        "lng": -116.8985,
        "lat": 32.333975,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Herradura",
        "lng": -116.89830000000002,
        "lat": 32.4248,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Gas y Anexas",
        "lng": -116.87156923076924,
        "lat": 32.44844615384615,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Ignacio Zaragoza",
        "lng": -116.53342857142856,
        "lat": 32.22461428571428,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Constitución del 17",
        "lng": -116.89255,
        "lat": 32.42765,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Zona Norte",
        "lng": -116.87213333333334,
        "lat": 32.4179,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Pontevedra",
        "lng": -116.7397,
        "lat": 32.5482,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Genaro Vázquez",
        "lng": -116.9582888888889,
        "lat": 32.43449999999999,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Quinta Alta",
        "lng": -116.70433333333332,
        "lat": 32.313233333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Murua Oriente",
        "lng": -116.7912,
        "lat": 32.44583333333333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Héroes de Independencia",
        "lng": -116.8684,
        "lat": 32.47053636363636,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Los Lobos",
        "lng": -116.7366,
        "lat": 32.3617,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia El Tecolote",
        "lng": -116.9582888888889,
        "lat": 32.43449999999999,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Leonardo Rodriguez Alcaine",
        "lng": -116.9742375,
        "lat": 32.4475875,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Ejido Francisco Villa",
        "lng": -116.7997,
        "lat": 32.405,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Valle Vista 1a Sección",
        "lng": -116.690575,
        "lat": 32.506625,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa Fontana X",
        "lng": -116.8684,
        "lat": 32.47053636363636,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Cerro II",
        "lng": -116.8058846153846,
        "lat": 32.40472307692308,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Unidad habitacional Plaza España",
        "lng": -117.02846153846154,
        "lat": 32.419415384615384,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Cañón Centenario",
        "lng": -116.82155,
        "lat": 32.43768333333333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Empleado Postal",
        "lng": -116.7333,
        "lat": 32.5333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Morelos",
        "lng": -116.732,
        "lat": 32.445366666666665,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Xicotencatl Leyva",
        "lng": -116.9682,
        "lat": 32.4523,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Jardín Dorado",
        "lng": -116.7366,
        "lat": 32.3617,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Colinas de La Cantera",
        "lng": -116.75873333333334,
        "lat": 32.40616666666667,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento El Rubí",
        "lng": -116.9469,
        "lat": 32.4345,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Las Brisas",
        "lng": -116.87156923076924,
        "lat": 32.44844615384615,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Verona Residencial",
        "lng": -116.99188333333336,
        "lat": 32.4391,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia México Lindo",
        "lng": -116.904675,
        "lat": 32.431574999999995,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Hacienda Linda Vista",
        "lng": -116.9963,
        "lat": 32.4538,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Valle del Alamar II",
        "lng": -116.7397,
        "lat": 32.5482,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Alberto Bustamante",
        "lng": -116.9661,
        "lat": 32.4386,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Cañón de las Rosas",
        "lng": -116.9359,
        "lat": 32.4724,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Los Ángeles",
        "lng": -116.81761333333334,
        "lat": 32.483293333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Flores Magón",
        "lng": -116.9682,
        "lat": 32.4523,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Zona industrial Ciudad Industrial",
        "lng": -116.9178,
        "lat": 32.5254,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Cañón del Matadero",
        "lng": -116.9359,
        "lat": 32.4724,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Los Reyes",
        "lng": -116.90063333333332,
        "lat": 32.43026666666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento La Cúspide",
        "lng": -117.1207,
        "lat": 32.4983,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Fernández",
        "lng": -116.7769,
        "lat": 32.4667,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Los Olivos Norte",
        "lng": -116.83006666666668,
        "lat": 32.40154444444445,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Sanchez Taboada IV",
        "lng": -116.75873333333334,
        "lat": 32.40616666666667,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Natura Sección Bosques",
        "lng": -116.9576,
        "lat": 32.3915,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villas de Baja California",
        "lng": -116.90063333333332,
        "lat": 32.43026666666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Francisco Zarco",
        "lng": -117.0425,
        "lat": 32.4647,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Alfredo Ames",
        "lng": -116.9955,
        "lat": 32.4252,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Cuauhtémoc",
        "lng": -116.836,
        "lat": 32.4103,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Hipódromo Agua Caliente",
        "lng": -117.0167,
        "lat": 32.5167,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Residencial Los Leones",
        "lng": -117.001,
        "lat": 32.4462,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Coral Beach",
        "lng": -116.9742375,
        "lat": 32.4475875,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Cerro Colorado",
        "lng": -116.8058846153846,
        "lat": 32.40472307692308,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Anexa Veracruz",
        "lng": -116.76182,
        "lat": 32.505406666666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Horóscopo",
        "lng": -116.7997,
        "lat": 32.405,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Zona industrial Fideicomiso el Florido",
        "lng": -116.678175,
        "lat": 32.05833333333333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa del Sol IV",
        "lng": -116.74276296296296,
        "lat": 32.36484074074074,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Unidad habitacional Cuatro Estrellas",
        "lng": -116.9743,
        "lat": 32.43455,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Condominio Residencial Frontera",
        "lng": -116.8041,
        "lat": 32.468,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Llamas Amaya",
        "lng": -116.8455,
        "lat": 32.350744444444445,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia El Prado",
        "lng": -116.81761333333334,
        "lat": 32.483293333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Zona industrial Baja Maq. El Águila",
        "lng": -117.02846153846154,
        "lat": 32.419415384615384,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Equipamiento Campo de Golf",
        "lng": -116.99482222222224,
        "lat": 32.50418888888888,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento TECNOMEX",
        "lng": -117.1207,
        "lat": 32.4983,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa del Prado Segunda Sección",
        "lng": -116.87776999999998,
        "lat": 32.433260000000004,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Huertas 1a. Sección",
        "lng": -116.7722,
        "lat": 32.513459999999995,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Misión del Sol",
        "lng": -116.9963,
        "lat": 32.4538,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa Fontana II",
        "lng": -116.74276296296296,
        "lat": 32.36484074074074,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Los Álamos",
        "lng": -116.69665,
        "lat": 32.37725,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Las Vegas",
        "lng": -116.87156923076924,
        "lat": 32.44844615384615,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Rubio",
        "lng": -116.7722,
        "lat": 32.513459999999995,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia La Villa",
        "lng": -116.76182,
        "lat": 32.505406666666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Cañón el Salado",
        "lng": -116.7722,
        "lat": 32.513459999999995,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Laderas del Mar",
        "lng": -117.1207,
        "lat": 32.4983,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Independencia",
        "lng": -116.721025,
        "lat": 32.450525,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Punta Bandera",
        "lng": -117.101,
        "lat": 32.4619,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Pinos de Narez",
        "lng": -116.90294285714286,
        "lat": 32.431014285714284,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Vista Bella",
        "lng": -116.86178571428572,
        "lat": 32.4718,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Benton",
        "lng": -116.87156923076924,
        "lat": 32.44844615384615,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Anáhuac",
        "lng": -116.81761333333334,
        "lat": 32.483293333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Marrón",
        "lng": -116.79406666666668,
        "lat": 32.496766666666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Jardines de las Cruces",
        "lng": -116.8455,
        "lat": 32.350744444444445,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Alamar",
        "lng": -116.7912,
        "lat": 32.44583333333333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Praderas del Sol",
        "lng": -117.02846153846154,
        "lat": 32.419415384615384,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Paseo Santa María",
        "lng": -116.678175,
        "lat": 32.05833333333333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia San Antonio",
        "lng": -116.8769,
        "lat": 32.32389090909091,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia 20 de Noviembre",
        "lng": -116.7405,
        "lat": 32.4424,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Anexa Internacional",
        "lng": -116.88399166666666,
        "lat": 32.48574166666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Nuevo Progreso",
        "lng": -116.8046,
        "lat": 32.4732,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Monte Real",
        "lng": -116.80335454545455,
        "lat": 32.40483636363637,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Zona industrial Internacional Tijuana",
        "lng": -117.0087,
        "lat": 32.4776,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Lomas Taurinas",
        "lng": -116.7333,
        "lat": 32.5333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia El Olivar",
        "lng": -116.92279999999998,
        "lat": 32.4194,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Vistas de Palmillas",
        "lng": -116.82194285714286,
        "lat": 32.44438571428571,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Oaxaca (Ángel Fernández)",
        "lng": -116.88335,
        "lat": 32.4193,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Mariano Matamoros (Sur)",
        "lng": -116.7997,
        "lat": 32.405,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Altamira",
        "lng": -116.8198,
        "lat": 32.4041,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Villa Lomas",
        "lng": -116.89830000000002,
        "lat": 32.4248,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Residencial La Esperanza",
        "lng": -116.88399166666666,
        "lat": 32.48574166666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Campos",
        "lng": -116.90294285714286,
        "lat": 32.431014285714284,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Zona industrial Tomas Alva Edison",
        "lng": -116.9576,
        "lat": 32.3915,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Riberas del Alamar",
        "lng": -116.7769,
        "lat": 32.4667,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Villa Cruz",
        "lng": -116.80335454545455,
        "lat": 32.40483636363637,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Guillen",
        "lng": -116.70433333333332,
        "lat": 32.313233333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Agua Caliente",
        "lng": -117.0167,
        "lat": 32.5167,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Puesta del Sol",
        "lng": -116.96688333333334,
        "lat": 32.44551666666667,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Hidalgo",
        "lng": -116.7912,
        "lat": 32.44583333333333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Campestre La Gloria",
        "lng": -117.001,
        "lat": 32.4462,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Lomas de Agua Caliente 1a Sección",
        "lng": -116.96044285714288,
        "lat": 32.48452857142858,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Condominios Villas California",
        "lng": -117.001,
        "lat": 32.4462,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Lomas Villas",
        "lng": -116.79287857142856,
        "lat": 32.40490714285714,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Nueva Esperanza (La Cuesta)",
        "lng": -116.88399166666666,
        "lat": 32.48574166666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Pórticos de San Antonio",
        "lng": -116.86178571428572,
        "lat": 32.4718,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Albatros",
        "lng": -117.0176,
        "lat": 32.4585,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Las Misiones",
        "lng": -117.02846153846154,
        "lat": 32.419415384615384,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Fausto González",
        "lng": -117.0099,
        "lat": 32.4252,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Chapultepec 10a Sección",
        "lng": -116.99482222222224,
        "lat": 32.50418888888888,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia El Seminario",
        "lng": -116.79970000000002,
        "lat": 32.405,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa del Sol I",
        "lng": -116.74276296296296,
        "lat": 32.36484074074074,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Altabrisa",
        "lng": -116.7472,
        "lat": 32.3362,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Xochimilco Solidaridad",
        "lng": -116.87767,
        "lat": 32.46521,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Rincón de Otay",
        "lng": -116.79802,
        "lat": 32.46782,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Zona industrial Chilpancingo",
        "lng": -116.9178,
        "lat": 32.5254,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Carmen Castillo",
        "lng": -116.6345,
        "lat": 32.37,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Jardines de Las Arboledas",
        "lng": -116.92279999999998,
        "lat": 32.4194,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Internacional",
        "lng": -116.88399166666666,
        "lat": 32.48574166666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Sonora",
        "lng": -116.83006666666668,
        "lat": 32.40154444444445,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Aviación",
        "lng": -116.79406666666668,
        "lat": 32.496766666666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Zona industrial Nordika",
        "lng": -116.9582888888889,
        "lat": 32.43449999999999,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Rancho La Cima",
        "lng": -116.9469,
        "lat": 32.4345,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia El Realito",
        "lng": -116.8831,
        "lat": 32.4256,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Cerro Colorado 2a Sección (Lomas del Colorado)",
        "lng": -116.8058846153846,
        "lat": 32.40472307692308,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Parque Industrial La Mesa",
        "lng": -116.74652,
        "lat": 32.406580000000005,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Amparo Sánchez",
        "lng": -116.82155,
        "lat": 32.43768333333333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento El Jibarito",
        "lng": -116.9682,
        "lat": 32.4523,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Playas de Tijuana Sección Monumental",
        "lng": -116.96688333333334,
        "lat": 32.44551666666667,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia FOVISSSTE V",
        "lng": -116.79802,
        "lat": 32.46782,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia El Florido 2a. Sección",
        "lng": -116.7997,
        "lat": 32.405,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Buenos Aires Norte",
        "lng": -116.7366,
        "lat": 32.3617,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Colinas del Rey",
        "lng": -116.81364,
        "lat": 32.36538,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Rancho el Grande",
        "lng": -116.96044285714288,
        "lat": 32.48452857142858,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Nueva Aurora",
        "lng": -117.03485714285716,
        "lat": 32.48544285714286,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Granjas Familiares Unidas",
        "lng": -116.7397,
        "lat": 32.5482,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Lomas del Río",
        "lng": -116.79287857142856,
        "lat": 32.40490714285714,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Isla Coronado",
        "lng": -117.09744,
        "lat": 32.42258,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Maclovio Rojas",
        "lng": -116.78061111111111,
        "lat": 32.49058888888889,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Tomas Aquino",
        "lng": -116.7333,
        "lat": 32.5333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Ejido Francisco Villa Sur",
        "lng": -116.7997,
        "lat": 32.405,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Puerta del Río",
        "lng": -116.7997,
        "lat": 32.405,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Hacienda las Palomas",
        "lng": -116.88708571428572,
        "lat": 32.421842857142856,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Aguaje de La Tuna 1a Sección",
        "lng": -116.88399166666666,
        "lat": 32.48574166666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Anexa Miramar",
        "lng": -117.0874,
        "lat": 32.5187,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Revolución",
        "lng": -116.79406666666668,
        "lat": 32.496766666666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Condominio Mar Vista",
        "lng": -116.8065142857143,
        "lat": 32.4742,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Burócrata Ruiz Cortines",
        "lng": -116.9833,
        "lat": 32.5167,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Los Laureles",
        "lng": -116.8065142857143,
        "lat": 32.4742,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Vista Lago",
        "lng": -116.8041,
        "lat": 32.468,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Natura Sección Amanecer",
        "lng": -116.9576,
        "lat": 32.3915,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Laderas de Monterrey",
        "lng": -117.00107142857144,
        "lat": 32.47284285714286,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Chapultepec Alamar",
        "lng": -116.69665,
        "lat": 32.37725,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Garita Otay",
        "lng": -116.8041,
        "lat": 32.468,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Los Españoles",
        "lng": -116.6942,
        "lat": 32.490966666666665,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Las Californias",
        "lng": -116.90155,
        "lat": 32.4604,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Los Árboles",
        "lng": -116.76182,
        "lat": 32.505406666666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Jardines de Agua Caliente",
        "lng": -116.85684,
        "lat": 32.4317,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Lomas Conjunto Residencial",
        "lng": -116.7722,
        "lat": 32.513459999999995,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Mineral de Santa Fe",
        "lng": -116.7333,
        "lat": 32.5333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Residencial Villaflores",
        "lng": -116.69665,
        "lat": 32.37725,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Chapultepec 8a Sección",
        "lng": -116.99482222222224,
        "lat": 32.50418888888888,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Campo Koa",
        "lng": -116.99101428571429,
        "lat": 32.4193,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia La Ciénega Poniente",
        "lng": -116.8769,
        "lat": 32.32389090909091,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Vista Azul",
        "lng": -117.10765,
        "lat": 32.4589,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Valle Imperial",
        "lng": -116.68644545454544,
        "lat": 32.329181818181816,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Condominio Privada San Miguel",
        "lng": -116.7912,
        "lat": 32.44583333333333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Ampliación Las Américas",
        "lng": -117.02846153846154,
        "lat": 32.419415384615384,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Ejido Francisco Villa 2a Sección",
        "lng": -116.7997,
        "lat": 32.405,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia INFONAVIT Cachanillas",
        "lng": -116.74652,
        "lat": 32.406580000000005,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Lomas Virreyes",
        "lng": -116.746,
        "lat": 32.2572,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Colinas de Chapultepec",
        "lng": -116.96044285714288,
        "lat": 32.48452857142858,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia San Carlos",
        "lng": -116.8058846153846,
        "lat": 32.40472307692308,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa Residencial Santa Fe 5a Sección",
        "lng": -117.025,
        "lat": 32.4306,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Villa Colonial",
        "lng": -116.85684,
        "lat": 32.4317,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Castro Green",
        "lng": -116.90294285714286,
        "lat": 32.431014285714284,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Rancho el Águila",
        "lng": -117.02846153846154,
        "lat": 32.419415384615384,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Lomas de San Pedro",
        "lng": -116.7997,
        "lat": 32.405,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Praderas de La Mesa",
        "lng": -116.80335454545455,
        "lat": 32.40483636363637,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa Residencial Santa Fe 3a Sección",
        "lng": -116.9955,
        "lat": 32.4252,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Pinos del Agüero",
        "lng": -116.7722,
        "lat": 32.513459999999995,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Estrella del Pacífico",
        "lng": -116.99188333333336,
        "lat": 32.4391,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Ramos Sur",
        "lng": -116.7722,
        "lat": 32.513459999999995,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Xicoténcatl Dos",
        "lng": -117.0425,
        "lat": 32.4647,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Rancho Rivera",
        "lng": -116.7769,
        "lat": 32.4667,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Las Colonias",
        "lng": -116.678175,
        "lat": 32.05833333333333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia San Antonio del Mar",
        "lng": -117.094875,
        "lat": 32.425200000000004,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Cubillas",
        "lng": -116.8985,
        "lat": 32.333975,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Monte San Antonio",
        "lng": -116.9469,
        "lat": 32.4345,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Unidad habitacional INFONAVIT Latinos",
        "lng": -116.74652,
        "lat": 32.406580000000005,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Nueva Tijuana",
        "lng": -116.8041,
        "lat": 32.468,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Lomas Santa Fe",
        "lng": -117.065,
        "lat": 32.4536,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Hacienda Agua Caliente",
        "lng": -116.88708571428572,
        "lat": 32.421842857142856,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Ampliación Salvatierra",
        "lng": -116.91670000000002,
        "lat": 32.3,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Miramar",
        "lng": -117.0874,
        "lat": 32.5187,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Melchor Ocampo",
        "lng": -116.690575,
        "lat": 32.506625,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Lomas del Mirador",
        "lng": -116.8065142857143,
        "lat": 32.4742,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Francisco Villa",
        "lng": -116.88335,
        "lat": 32.4193,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Cañón de las Carretas",
        "lng": -117.0099,
        "lat": 32.4252,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Santa Cecilia",
        "lng": -116.85684,
        "lat": 32.4317,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Juárez",
        "lng": -116.88515,
        "lat": 32.38305,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Ecologista",
        "lng": -116.93590000000002,
        "lat": 32.4724,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa Fontana V",
        "lng": -116.8684,
        "lat": 32.47053636363636,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia El Paraíso",
        "lng": -116.70433333333332,
        "lat": 32.313233333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Cañón Tampico",
        "lng": -116.8065142857143,
        "lat": 32.4742,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Los Valles",
        "lng": -116.95765,
        "lat": 32.391549999999995,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia El Ranchito",
        "lng": -116.904675,
        "lat": 32.431574999999995,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Las Palmas",
        "lng": -116.70433333333332,
        "lat": 32.313233333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia San Antonio Oeste",
        "lng": -116.8769,
        "lat": 32.32389090909091,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Centro Comercial Otay",
        "lng": -116.7472,
        "lat": 32.3362,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Cañón Primavera",
        "lng": -116.8983,
        "lat": 32.4248,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Aguaje de La Tuna 2a Sección",
        "lng": -116.88399166666666,
        "lat": 32.48574166666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Las Villas Tijuana",
        "lng": -116.99188333333336,
        "lat": 32.4391,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia El Monte",
        "lng": -117.0877,
        "lat": 32.4679,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Misión de las Californias",
        "lng": -116.7366,
        "lat": 32.3617,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Cañón de La Pedrera",
        "lng": -116.8983,
        "lat": 32.4248,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Alcatraces",
        "lng": -116.9955,
        "lat": 32.4252,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Niños Héroes (La Mesa)",
        "lng": -116.89255,
        "lat": 32.42765,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Conjunto Residencial Cataviña",
        "lng": -116.96044285714288,
        "lat": 32.48452857142858,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Hacienda los Venados",
        "lng": -116.9576,
        "lat": 32.3915,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Playas de Tijuana Sección Playas Coronado",
        "lng": -116.96688333333334,
        "lat": 32.44551666666667,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia La Campiña",
        "lng": -116.79970000000002,
        "lat": 32.405,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Real del Mar",
        "lng": -117.0392,
        "lat": 32.4258,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Castillo",
        "lng": -116.6881,
        "lat": 32.466,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia El Valle",
        "lng": -116.7722,
        "lat": 32.513459999999995,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia López Lucio",
        "lng": -116.70433333333332,
        "lat": 32.313233333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Rancho las Flores 1a Sección",
        "lng": -117.0874,
        "lat": 32.5187,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Anexo los Laureles",
        "lng": -116.8065142857143,
        "lat": 32.4742,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Paseos del Florido",
        "lng": -116.678175,
        "lat": 32.05833333333333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento San Agustin",
        "lng": -116.9743,
        "lat": 32.43455,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Leos Montoya",
        "lng": -116.70433333333332,
        "lat": 32.313233333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Florido Viejo",
        "lng": -116.78061111111111,
        "lat": 32.49058888888889,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia La Mesa",
        "lng": -116.81761333333334,
        "lat": 32.483293333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Lagunitas",
        "lng": -116.84985,
        "lat": 32.44055,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Guaycura",
        "lng": -117.0664,
        "lat": 32.4222,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Hacienda Las Delicias",
        "lng": -116.9576,
        "lat": 32.3915,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa del Real X",
        "lng": -116.74276296296296,
        "lat": 32.36484074074074,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Villa de Alcázar",
        "lng": -116.92279999999998,
        "lat": 32.4194,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia División del Norte",
        "lng": -116.89255,
        "lat": 32.42765,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia San Jerónimo",
        "lng": -116.96044285714288,
        "lat": 32.48452857142858,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa Bonita",
        "lng": -116.79287857142856,
        "lat": 32.40490714285714,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Colinas San Rafael",
        "lng": -116.87776999999998,
        "lat": 32.433260000000004,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Manuel Rivera Anaya",
        "lng": -116.79802,
        "lat": 32.46782,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Chihuahua",
        "lng": -116.88335,
        "lat": 32.4193,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Lomas de Tlatelolco",
        "lng": -116.78061111111111,
        "lat": 32.49058888888889,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Emperadores",
        "lng": -116.76182,
        "lat": 32.505406666666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Zona industrial Valle Sur",
        "lng": -117.03485714285716,
        "lat": 32.48544285714286,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Hidalgo",
        "lng": -116.732,
        "lat": 32.445366666666665,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa Residencial Santa Fe 1a Sección",
        "lng": -116.99188333333336,
        "lat": 32.4391,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Jardines de La Misión",
        "lng": -116.6881,
        "lat": 32.466,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Residencial Las Cascadas",
        "lng": -116.81364,
        "lat": 32.36538,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Ampliación Reforma",
        "lng": -116.74652,
        "lat": 32.406580000000005,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Lomas de Agua Caliente",
        "lng": -117.0167,
        "lat": 32.5167,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia México",
        "lng": -116.732,
        "lat": 32.445366666666665,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Tecnológico",
        "lng": -116.7956,
        "lat": 32.4749,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Presa Rodriguez",
        "lng": -116.9109,
        "lat": 32.4516,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Michoacán",
        "lng": -117.0431,
        "lat": 32.4225,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Insurgentes",
        "lng": -116.80335454545455,
        "lat": 32.40483636363637,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Puerta del Sol",
        "lng": -116.7366,
        "lat": 32.3617,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Cumbres de Juárez",
        "lng": -117.00107142857144,
        "lat": 32.47284285714286,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Unidad habitacional FOVISSSTE II",
        "lng": -116.79802,
        "lat": 32.46782,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Zona industrial Los Olivos",
        "lng": -116.87156923076924,
        "lat": 32.44844615384615,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Jardines de San Carlos",
        "lng": -116.70433333333332,
        "lat": 32.313233333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Tejamen",
        "lng": -116.79287857142856,
        "lat": 32.40490714285714,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Brisa Marina",
        "lng": -116.91670000000002,
        "lat": 32.3,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Cañón del Matadero Este",
        "lng": -116.8065142857143,
        "lat": 32.4742,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Milenio 2000",
        "lng": -117.0176,
        "lat": 32.4585,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Residencial Isla Cedros",
        "lng": -116.86178571428572,
        "lat": 32.4718,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa del Real VI",
        "lng": -116.74276296296296,
        "lat": 32.36484074074074,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa del Real I",
        "lng": -116.74276296296296,
        "lat": 32.36484074074074,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Hacienda del Pacifico",
        "lng": -116.87767,
        "lat": 32.46521,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Maestros Universitarios",
        "lng": -116.9436,
        "lat": 32.4089,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Hacienda las Flores",
        "lng": -116.9743,
        "lat": 32.43455,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Nueva Aurora Sur",
        "lng": -117.03485714285716,
        "lat": 32.48544285714286,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Vista Encantada",
        "lng": -116.93590000000002,
        "lat": 32.4724,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Hacienda Santa María",
        "lng": -116.678175,
        "lat": 32.05833333333333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Unidad habitacional Plaza San Marcos",
        "lng": -117.02846153846154,
        "lat": 32.419415384615384,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Lázaro Cárdenas",
        "lng": -116.9661,
        "lat": 32.4386,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia María Medina",
        "lng": -116.82155,
        "lat": 32.43768333333333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa del Real VII",
        "lng": -116.74276296296296,
        "lat": 32.36484074074074,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Terrazas del Valle",
        "lng": -116.8267,
        "lat": 32.4875,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Loma Dorada",
        "lng": -117.03117142857144,
        "lat": 32.41961428571428,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia INFONAVIT Lomas Verdes",
        "lng": -116.90294285714286,
        "lat": 32.431014285714284,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Granjas División del Norte",
        "lng": -116.7397,
        "lat": 32.5482,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Camino Viejo",
        "lng": -116.92279999999998,
        "lat": 32.4194,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Manuel Paredes II",
        "lng": -116.9469,
        "lat": 32.4345,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Sección Campestre",
        "lng": -116.99101428571429,
        "lat": 32.4193,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Madero Sur",
        "lng": -117.00107142857144,
        "lat": 32.47284285714286,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Banus Residencial",
        "lng": -116.9582888888889,
        "lat": 32.43449999999999,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Playas de Tijuana Sección Jardines",
        "lng": -116.9963,
        "lat": 32.4538,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Zona industrial Lago Sur",
        "lng": -117.0664,
        "lat": 32.4222,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Hacienda las Fuentes",
        "lng": -116.678175,
        "lat": 32.05833333333333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Hacienda los Laureles",
        "lng": -116.87776999999998,
        "lat": 32.433260000000004,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Los Arenales A",
        "lng": -116.7769,
        "lat": 32.4667,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Colinas de Cortés",
        "lng": -116.6345,
        "lat": 32.37,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Siena Residencial",
        "lng": -116.99188333333336,
        "lat": 32.4391,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Chapultepec California",
        "lng": -116.76182,
        "lat": 32.505406666666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia El Bosque",
        "lng": -116.89830000000002,
        "lat": 32.4248,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Modesto Ponce",
        "lng": -116.91670000000002,
        "lat": 32.3,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Hacienda San Martín",
        "lng": -116.9955,
        "lat": 32.4252,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Panamericano",
        "lng": -116.6881,
        "lat": 32.466,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Rinconada 2",
        "lng": -116.9436,
        "lat": 32.4089,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Terrazas La Morita",
        "lng": -116.82194285714286,
        "lat": 32.44438571428571,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Playas de Tijuana Sección Terrazas",
        "lng": -116.96688333333334,
        "lat": 32.44551666666667,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Zona industrial Parque Industrial Misiones de las Californias",
        "lng": -116.7472,
        "lat": 32.3362,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento La Escondida",
        "lng": -116.86178571428572,
        "lat": 32.4718,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia El Mirador (La Mesa)",
        "lng": -116.83006666666668,
        "lat": 32.40154444444445,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Lomas de La Amistad",
        "lng": -116.74652,
        "lat": 32.406580000000005,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Yamille",
        "lng": -116.8769,
        "lat": 32.32389090909091,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Bellas Artes",
        "lng": -116.8041,
        "lat": 32.468,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Divina Providencia",
        "lng": -116.93590000000002,
        "lat": 32.4724,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento San Antonio Club Hípico y de Golf",
        "lng": -117.0392,
        "lat": 32.4258,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa Fontana VI",
        "lng": -116.74276296296296,
        "lat": 32.36484074074074,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Ramírez",
        "lng": -116.87156923076924,
        "lat": 32.44844615384615,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Palma Real",
        "lng": -116.95765,
        "lat": 32.391549999999995,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia La Mesa Sur",
        "lng": -116.81761333333334,
        "lat": 32.483293333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Bosques de La Presa",
        "lng": -116.90063333333332,
        "lat": 32.43026666666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Plan de Iguala",
        "lng": -116.7722,
        "lat": 32.513459999999995,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia División los Altos",
        "lng": -116.9963,
        "lat": 32.4538,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Baja Malibú",
        "lng": -117.094875,
        "lat": 32.425200000000004,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Arenales B",
        "lng": -116.7769,
        "lat": 32.4667,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Liberal Lomas del Rubí",
        "lng": -116.81364,
        "lat": 32.36538,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Misión de las Américas",
        "lng": -117.02846153846154,
        "lat": 32.419415384615384,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Baja Malibú (Sección Playas)",
        "lng": -117.094875,
        "lat": 32.425200000000004,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Otay Campestre",
        "lng": -116.79802,
        "lat": 32.46782,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Roberto de La Madrid",
        "lng": -116.8041,
        "lat": 32.468,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Manuel Paredes I",
        "lng": -116.88335,
        "lat": 32.4193,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia La Cueva",
        "lng": -116.91670000000002,
        "lat": 32.3,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Ampliación Lomas de Tlatelolco",
        "lng": -116.78061111111111,
        "lat": 32.49058888888889,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Lomas del Pedregal",
        "lng": -116.78061111111111,
        "lat": 32.49058888888889,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Valle de las Palmas",
        "lng": -116.7997,
        "lat": 32.405,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Tona",
        "lng": -116.9109,
        "lat": 32.4516,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia La Sierra",
        "lng": -116.81364,
        "lat": 32.36538,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento El Águila",
        "lng": -117.02846153846154,
        "lat": 32.419415384615384,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Las Lilas",
        "lng": -116.81761333333334,
        "lat": 32.483293333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Costa Dorada",
        "lng": -116.99188333333336,
        "lat": 32.4391,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Granjas el Tecolote",
        "lng": -116.9582888888889,
        "lat": 32.43449999999999,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Buena Vista",
        "lng": -116.76213333333334,
        "lat": 32.49023333333333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Mesetas del Guaycura",
        "lng": -117.03117142857144,
        "lat": 32.41961428571428,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Villa Floresta",
        "lng": -116.90294285714286,
        "lat": 32.431014285714284,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Alfonso Ballesteros",
        "lng": -116.79287857142856,
        "lat": 32.40490714285714,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Playas de Tijuana Sección Triangulo de Oro",
        "lng": -116.9963,
        "lat": 32.4538,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Lomas Misión",
        "lng": -116.9963,
        "lat": 32.4538,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Anexa Postal",
        "lng": -116.9833,
        "lat": 32.5167,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Azteca",
        "lng": -116.80335454545455,
        "lat": 32.40483636363637,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa Fontana VIII",
        "lng": -116.8684,
        "lat": 32.47053636363636,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Granjas Buenos Aires Sección La Palma",
        "lng": -116.9576,
        "lat": 32.3915,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Cañón Palmas",
        "lng": -116.904675,
        "lat": 32.431574999999995,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Insurgentes",
        "lng": -116.7472,
        "lat": 32.3362,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Rubí Aguadores",
        "lng": -116.9469,
        "lat": 32.4345,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Mi Patrimonio",
        "lng": -116.87767,
        "lat": 32.46521,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa Fontana I",
        "lng": -116.74276296296296,
        "lat": 32.36484074074074,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Paseos de Guaycura",
        "lng": -117.02846153846154,
        "lat": 32.419415384615384,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Zona industrial Presidentes",
        "lng": -117.02846153846154,
        "lat": 32.419415384615384,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Sanchez Taboada Produtsa",
        "lng": -116.75873333333334,
        "lat": 32.40616666666667,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Otay Jardín",
        "lng": -116.53342857142856,
        "lat": 32.22461428571428,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villas del Dorado",
        "lng": -116.7997,
        "lat": 32.405,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Valle del Rubí Sección Lomas",
        "lng": -116.81466666666668,
        "lat": 32.371833333333335,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento San Mateo",
        "lng": -116.91670000000002,
        "lat": 32.3,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Unidad habitacional XVIII Ayuntamiento",
        "lng": -116.9582888888889,
        "lat": 32.43449999999999,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Cañón de las Palmeras",
        "lng": -116.952175,
        "lat": 32.441375,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Roma",
        "lng": -116.8198,
        "lat": 32.4041,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Pegaso I",
        "lng": -116.7397,
        "lat": 32.5482,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Las Abejas",
        "lng": -116.678175,
        "lat": 32.05833333333333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Unidad habitacional INFONAVIT Patrimonio",
        "lng": -116.7912,
        "lat": 32.44583333333333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Niños Héroes",
        "lng": -116.88335,
        "lat": 32.4193,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Cañón Rubí",
        "lng": -116.97188,
        "lat": 32.42098,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Jardines de Chapultepec",
        "lng": -116.96044285714288,
        "lat": 32.48452857142858,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa Residencial Santa Fe 2a Sección",
        "lng": -117.025,
        "lat": 32.4306,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Lomas del Real",
        "lng": -116.86178571428572,
        "lat": 32.4718,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Las Palmeras",
        "lng": -116.952175,
        "lat": 32.441375,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Cañadas del Florido 2a. Sección",
        "lng": -116.678175,
        "lat": 32.05833333333333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Obrera 1a Sección",
        "lng": -116.9469,
        "lat": 32.4345,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa Fontana XI",
        "lng": -116.8684,
        "lat": 32.47053636363636,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Gutiérrez Ovalle",
        "lng": -116.8455,
        "lat": 32.350744444444445,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Lomas de San Antonio",
        "lng": -117.09744,
        "lat": 32.42258,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa del Real XI",
        "lng": -116.74276296296296,
        "lat": 32.36484074074074,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia FIDUZET",
        "lng": -116.74276296296296,
        "lat": 32.36484074074074,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Universidad Sur",
        "lng": -116.53342857142856,
        "lat": 32.22461428571428,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Río Vista",
        "lng": -116.79802,
        "lat": 32.46782,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Tierra y Libertad",
        "lng": -116.8684,
        "lat": 32.47053636363636,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Felipa Velázquez",
        "lng": -116.836,
        "lat": 32.4103,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Residencial San Marino",
        "lng": -117.0392,
        "lat": 32.4258,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Valle Redondo",
        "lng": -116.8071,
        "lat": 32.5007,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Lomas del Mar",
        "lng": -117.065,
        "lat": 32.4536,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia La Escondida",
        "lng": -116.70433333333332,
        "lat": 32.313233333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Cumbres del Pacífico (Terrazas del Pacífico)",
        "lng": -116.9582888888889,
        "lat": 32.43449999999999,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Ignacio Ramírez",
        "lng": -116.79287857142856,
        "lat": 32.40490714285714,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia San José del Alto",
        "lng": -116.6942,
        "lat": 32.490966666666665,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Luis Echeverría",
        "lng": -116.88399166666666,
        "lat": 32.48574166666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Granjas Princesas del Sol",
        "lng": -116.78061111111111,
        "lat": 32.49058888888889,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Leandro Valle",
        "lng": -116.87767,
        "lat": 32.46521,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Las Cumbres",
        "lng": -116.8198,
        "lat": 32.4041,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Libertad",
        "lng": -116.9833,
        "lat": 32.5167,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Loma Bonita",
        "lng": -116.7366,
        "lat": 32.3617,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Unidad habitacional Las Praderas",
        "lng": -116.8058846153846,
        "lat": 32.40472307692308,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Guanajuato",
        "lng": -116.76182,
        "lat": 32.505406666666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa del Sol III",
        "lng": -116.74276296296296,
        "lat": 32.36484074074074,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Xicotencatl Leyva Alemán",
        "lng": -116.9661,
        "lat": 32.4386,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Cerro Colorado I",
        "lng": -116.8058846153846,
        "lat": 32.40472307692308,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia El Florido IV",
        "lng": -116.678175,
        "lat": 32.05833333333333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa Fontana XIV",
        "lng": -116.74276296296296,
        "lat": 32.36484074074074,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Viñedos Casa Blanca",
        "lng": -116.8267,
        "lat": 32.4875,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Obrera 2a Sección",
        "lng": -116.9469,
        "lat": 32.4345,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Cañón del Matadero Norte",
        "lng": -116.9963,
        "lat": 32.4538,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Reforma",
        "lng": -116.82155,
        "lat": 32.43768333333333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Natura Sección Arboledas",
        "lng": -116.9576,
        "lat": 32.3915,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Madero (Cacho)",
        "lng": -116.88515,
        "lat": 32.38305,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Rancho Macías",
        "lng": -116.93590000000002,
        "lat": 32.4724,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Ejido Lázaro Cárdenas",
        "lng": -116.9955,
        "lat": 32.4252,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Lomas Terrabella",
        "lng": -116.7366,
        "lat": 32.3617,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Durán",
        "lng": -116.75873333333334,
        "lat": 32.40616666666667,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Alemán",
        "lng": -116.6881,
        "lat": 32.466,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Reynoso",
        "lng": -116.70433333333332,
        "lat": 32.313233333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Monarca",
        "lng": -117.001,
        "lat": 32.4462,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia La Morita",
        "lng": -116.678175,
        "lat": 32.05833333333333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Gertrudis Green",
        "lng": -116.70433333333332,
        "lat": 32.313233333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Maurilio Magallón",
        "lng": -116.7722,
        "lat": 32.513459999999995,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Magisterial",
        "lng": -116.7397,
        "lat": 32.5482,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa Fontana XIII",
        "lng": -116.74276296296296,
        "lat": 32.36484074074074,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Puerta de Hierro",
        "lng": -117.0167,
        "lat": 32.5167,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Lázaro Cárdenas 3ra Mesa",
        "lng": -116.9661,
        "lat": 32.4386,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia José López Portillo",
        "lng": -116.8058846153846,
        "lat": 32.40472307692308,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Colina del Mediterráneo",
        "lng": -116.9963,
        "lat": 32.4538,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia San Luis",
        "lng": -116.87776999999998,
        "lat": 32.433260000000004,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Montecarlo",
        "lng": -116.7366,
        "lat": 32.3617,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Anexa Sanchez Taboada",
        "lng": -116.6345,
        "lat": 32.37,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Niños Héroes Este",
        "lng": -116.89255,
        "lat": 32.42765,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Cerro Colorado 3a Sección",
        "lng": -116.8058846153846,
        "lat": 32.40472307692308,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Los Santos",
        "lng": -116.6942,
        "lat": 32.490966666666665,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Cañón de La Pedrera Este",
        "lng": -116.8983,
        "lat": 32.4248,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Anexa Durango",
        "lng": -116.76182,
        "lat": 32.505406666666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Ampliación Sanchez Taboada",
        "lng": -116.75873333333334,
        "lat": 32.40616666666667,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Hacienda el Colorado",
        "lng": -116.7997,
        "lat": 32.405,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Loma Dorada Campos",
        "lng": -116.90294285714286,
        "lat": 32.431014285714284,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Ejido Chilpancingo",
        "lng": -116.9178,
        "lat": 32.5254,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Manuel Paredes 3a Sección",
        "lng": -116.9469,
        "lat": 32.4345,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Los Olivos",
        "lng": -116.8831,
        "lat": 32.4256,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Rincón Colonial Chapultepec",
        "lng": -116.99482222222224,
        "lat": 32.50418888888888,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Pedregal de Santa Julia",
        "lng": -117.03485714285716,
        "lat": 32.48544285714286,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia La Gloria",
        "lng": -117.001,
        "lat": 32.4462,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Real de Loma Bonita",
        "lng": -117.03485714285716,
        "lat": 32.48544285714286,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Unidad habitacional FOVISSSTE",
        "lng": -116.9436,
        "lat": 32.4089,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Mar de Cortez",
        "lng": -116.9742375,
        "lat": 32.4475875,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Durango",
        "lng": -116.76182,
        "lat": 32.505406666666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia El Refugio",
        "lng": -116.82194285714286,
        "lat": 32.44438571428571,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia El Florido 1a. Sección",
        "lng": -116.7997,
        "lat": 32.405,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Las Huertas 3a Sección",
        "lng": -116.87156923076924,
        "lat": 32.44844615384615,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia El Mirador",
        "lng": -116.68644545454544,
        "lat": 32.329181818181816,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Ejido Matamoros",
        "lng": -116.68644545454544,
        "lat": 32.329181818181816,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Unidad habitacional Electricistas",
        "lng": -116.70433333333332,
        "lat": 32.313233333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Pueblo Bonito",
        "lng": -116.89830000000002,
        "lat": 32.4248,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Anexa Loma Dorada",
        "lng": -116.90294285714286,
        "lat": 32.431014285714284,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Colima",
        "lng": -116.75873333333334,
        "lat": 32.40616666666667,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Camichin",
        "lng": -116.70433333333332,
        "lat": 32.313233333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento San Miguel",
        "lng": -116.99188333333336,
        "lat": 32.4391,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Aeropuerto Tijuana (Gral. Abelardo L. Rodríguez)",
        "lng": -116.8041,
        "lat": 32.468,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Los Delfines",
        "lng": -116.99101428571429,
        "lat": 32.4193,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Las Torres de Matamoros",
        "lng": -116.8684,
        "lat": 32.47053636363636,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia La Fuente del Valle",
        "lng": -116.79189999999998,
        "lat": 32.5075,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Cañón del Sainz",
        "lng": -116.87776999999998,
        "lat": 32.433260000000004,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Ojo de Agua",
        "lng": -116.78061111111111,
        "lat": 32.49058888888889,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Hacienda Casa Grande",
        "lng": -116.746,
        "lat": 32.2572,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Fortín de las Flores",
        "lng": -116.8769,
        "lat": 32.32389090909091,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Gran Tenochtitlán",
        "lng": -116.9359,
        "lat": 32.4724,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Bosque de las Araucarias",
        "lng": -116.7472,
        "lat": 32.3362,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Anexa Divina Providencia",
        "lng": -116.93590000000002,
        "lat": 32.4724,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Unidad habitacional INDECO Universidad",
        "lng": -116.53342857142856,
        "lat": 32.22461428571428,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Planetario",
        "lng": -116.89830000000002,
        "lat": 32.4248,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Villa Fontana XVI",
        "lng": -116.74276296296296,
        "lat": 32.36484074074074,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Zona industrial El Florido II",
        "lng": -116.746,
        "lat": 32.2572,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Granjas Familiares de Matamoros",
        "lng": -116.7366,
        "lat": 32.3617,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Rancho Escondido",
        "lng": -116.7397,
        "lat": 32.5482,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Empleados Federales",
        "lng": -116.79406666666668,
        "lat": 32.496766666666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Mariano Matamoros (Norte)",
        "lng": -116.8684,
        "lat": 32.47053636363636,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Santa Anita",
        "lng": -116.83006666666668,
        "lat": 32.40154444444445,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Zona industrial Industrial Pacífico I",
        "lng": -116.87767,
        "lat": 32.46521,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Residencial El Fuerte",
        "lng": -117.03117142857144,
        "lat": 32.41961428571428,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia 5 y 8 Hectáreas",
        "lng": -116.9469,
        "lat": 32.4345,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Zona Este",
        "lng": -116.87213333333334,
        "lat": 32.4179,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Vista Mar Residencial",
        "lng": -117.1207,
        "lat": 32.4983,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Obrera 3a Sección",
        "lng": -116.9469,
        "lat": 32.4345,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Colinas de San Ángel",
        "lng": -116.83006666666668,
        "lat": 32.40154444444445,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Aeropuerto",
        "lng": -116.90155,
        "lat": 32.4604,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Sánchez Díaz",
        "lng": -116.88399166666666,
        "lat": 32.48574166666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Rancho Santa Cruz",
        "lng": -116.87776999999998,
        "lat": 32.433260000000004,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Santa Rosa (Ciudad)",
        "lng": -116.93746666666668,
        "lat": 32.43723333333333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia López Mateos",
        "lng": -116.88708571428572,
        "lat": 32.421842857142856,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa del Álamo",
        "lng": -116.87776999999998,
        "lat": 32.433260000000004,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Zona Centro",
        "lng": -116.87213333333334,
        "lat": 32.4179,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Altiplano",
        "lng": -116.68644545454544,
        "lat": 32.329181818181816,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Orizaba",
        "lng": -116.90294285714286,
        "lat": 32.431014285714284,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Jardines de La Mesa",
        "lng": -116.904675,
        "lat": 32.431574999999995,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia La Isla",
        "lng": -116.9963,
        "lat": 32.4538,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia San Bernardo (Terrazas de San Bernardo)",
        "lng": -116.93590000000002,
        "lat": 32.4724,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Luz Juárez",
        "lng": -116.70433333333332,
        "lat": 32.313233333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Mar Vista",
        "lng": -116.9661,
        "lat": 32.4386,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Colinas de Agua Caliente",
        "lng": -116.88708571428572,
        "lat": 32.421842857142856,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Isla Mujeres",
        "lng": -116.86178571428572,
        "lat": 32.4718,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Cumbres del Sol",
        "lng": -117.09744,
        "lat": 32.42258,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Camino Verde (Cañada Verde)",
        "lng": -116.836,
        "lat": 32.4103,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Ramos",
        "lng": -116.7722,
        "lat": 32.513459999999995,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Loma Blanca",
        "lng": -117.0268,
        "lat": 32.4273,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Niño Artillero",
        "lng": -116.75873333333334,
        "lat": 32.40616666666667,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia El Pedregal Oeste",
        "lng": -116.6942,
        "lat": 32.490966666666665,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Rinconada 1",
        "lng": -116.9436,
        "lat": 32.4089,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Moreno 2da. Sección",
        "lng": -116.87156923076924,
        "lat": 32.44844615384615,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Cañón Oasis",
        "lng": -116.89830000000002,
        "lat": 32.4248,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Fundadores",
        "lng": -117.00107142857144,
        "lat": 32.47284285714286,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Zona industrial Valle del Sur 2",
        "lng": -116.8121,
        "lat": 32.3557,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Campestre Murua",
        "lng": -116.7956,
        "lat": 32.4749,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Ceceña",
        "lng": -116.81761333333334,
        "lat": 32.483293333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Sanchez Taboada II",
        "lng": -116.82155,
        "lat": 32.43768333333333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Bonilla",
        "lng": -116.9955,
        "lat": 32.4252,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Los Girasoles",
        "lng": -116.8046,
        "lat": 32.4732,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Planicie",
        "lng": -116.68644545454544,
        "lat": 32.329181818181816,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa Fontana XII",
        "lng": -116.74276296296296,
        "lat": 32.36484074074074,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa del Sol II",
        "lng": -116.74276296296296,
        "lat": 32.36484074074074,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia División del Norte",
        "lng": -116.82155,
        "lat": 32.43768333333333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Vivienda Popular",
        "lng": -116.81466666666668,
        "lat": 32.371833333333335,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Vista del Río",
        "lng": -116.7997,
        "lat": 32.405,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Jardines de Chapultepec S-E",
        "lng": -116.89830000000002,
        "lat": 32.4248,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Garita Internacional",
        "lng": -116.8041,
        "lat": 32.468,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Hacienda Acueducto",
        "lng": -116.70433333333332,
        "lat": 32.313233333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Cañón del Padre",
        "lng": -116.7366,
        "lat": 32.3617,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Residencial Alameda",
        "lng": -116.904675,
        "lat": 32.431574999999995,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villas Otay",
        "lng": -116.7472,
        "lat": 32.3362,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Kino II",
        "lng": -116.8058846153846,
        "lat": 32.40472307692308,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Monterrey",
        "lng": -117.00107142857144,
        "lat": 32.47284285714286,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Colinas de California",
        "lng": -116.6881,
        "lat": 32.466,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Playas de Tijuana Sección Costa Azul",
        "lng": -116.9963,
        "lat": 32.4538,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Nueva Era",
        "lng": -116.8455,
        "lat": 32.350744444444445,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Urbi Quinta del Cedro Segunda Sección",
        "lng": -117.065,
        "lat": 32.4536,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Cumbres del Rubí",
        "lng": -116.79287857142856,
        "lat": 32.40490714285714,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Anexa Herrera",
        "lng": -116.9469,
        "lat": 32.4345,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento San Carlos",
        "lng": -116.70433333333332,
        "lat": 32.313233333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Granja Puesta del Sol",
        "lng": -116.91670000000002,
        "lat": 32.3,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Hipódromo Dos",
        "lng": -116.83006666666668,
        "lat": 32.40154444444445,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Anexa Simón Bolívar",
        "lng": -116.79287857142856,
        "lat": 32.40490714285714,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia La Ciénega",
        "lng": -116.89255,
        "lat": 32.42765,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Partido del Trabajo",
        "lng": -116.78061111111111,
        "lat": 32.49058888888889,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Ex Ejido Tampico",
        "lng": -116.7714,
        "lat": 32.35883333333333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia SEPANAL",
        "lng": -116.76213333333334,
        "lat": 32.49023333333333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Brisas del Mar",
        "lng": -116.99101428571429,
        "lat": 32.4193,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Cuesta Blanca",
        "lng": -117.0268,
        "lat": 32.4273,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Sonoita",
        "lng": -116.70433333333332,
        "lat": 32.313233333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Sanchez Taboada III",
        "lng": -116.75873333333334,
        "lat": 32.40616666666667,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Cañón de La Raza",
        "lng": -116.80335454545455,
        "lat": 32.40483636363637,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Chihuahua La Mesa",
        "lng": -116.8769,
        "lat": 32.32389090909091,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Fuentes del Sol",
        "lng": -117.09744,
        "lat": 32.42258,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Guerrero",
        "lng": -116.721025,
        "lat": 32.450525,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Roberto Curiel",
        "lng": -116.81364,
        "lat": 32.36538,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Sevilla Residencial",
        "lng": -116.746,
        "lat": 32.2572,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento García",
        "lng": -116.92279999999998,
        "lat": 32.4194,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Fortín de las Flores Oeste",
        "lng": -116.8769,
        "lat": 32.32389090909091,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Santa Rosa",
        "lng": -116.70433333333332,
        "lat": 32.313233333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Burócrata Hipódromo",
        "lng": -116.88708571428572,
        "lat": 32.421842857142856,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Playas de Tijuana Sección el Dorado",
        "lng": -116.9742375,
        "lat": 32.4475875,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa Campestre",
        "lng": -116.6881,
        "lat": 32.466,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia IMAQ Tijuana",
        "lng": -116.79970000000002,
        "lat": 32.405,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Urbi Quinta del Cedro",
        "lng": -117.065,
        "lat": 32.4536,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Praderas de la Gloria",
        "lng": -116.99188333333336,
        "lat": 32.4391,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Chapultepec",
        "lng": -116.99482222222224,
        "lat": 32.50418888888888,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Santa Cruz",
        "lng": -116.81761333333334,
        "lat": 32.483293333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Residencial Barcelona",
        "lng": -116.9582888888889,
        "lat": 32.43449999999999,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento El Laurel I",
        "lng": -116.82194285714286,
        "lat": 32.44438571428571,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Portezuelos",
        "lng": -116.7997,
        "lat": 32.405,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Zona Urbana Río Tijuana",
        "lng": -116.79406666666668,
        "lat": 32.496766666666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Altiplano 5a Sección",
        "lng": -116.68644545454544,
        "lat": 32.329181818181816,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Los Pirules",
        "lng": -116.69665,
        "lat": 32.37725,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Corona Encantada",
        "lng": -116.93590000000002,
        "lat": 32.4724,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Anexa Buena Vista",
        "lng": -116.7333,
        "lat": 32.5333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Río Tijuana 3a Etapa",
        "lng": -116.7997,
        "lat": 32.405,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Colinas de La Cruz",
        "lng": -116.90294285714286,
        "lat": 32.431014285714284,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Alfonso Corona del Rosal",
        "lng": -116.6942,
        "lat": 32.490966666666665,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Las Américas",
        "lng": -117.02846153846154,
        "lat": 32.419415384615384,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Zona industrial Parque Industrial El Florido Sección La Encantada",
        "lng": -116.8831,
        "lat": 32.4256,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Ampliación Ejido Lázaro Cárdenas",
        "lng": -116.9955,
        "lat": 32.4252,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Dimenstein",
        "lng": -116.81761333333334,
        "lat": 32.483293333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Ranchería Rincón del Mediterraneo",
        "lng": -116.78061111111111,
        "lat": 32.49058888888889,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Centro Urbano 70-76",
        "lng": -116.7333,
        "lat": 32.5333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Segunda Parte del Soler",
        "lng": -116.9963,
        "lat": 32.4538,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Unidad habitacional Fidel Velázquez",
        "lng": -116.80335454545455,
        "lat": 32.40483636363637,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Anexa Ruiz Cortines",
        "lng": -116.9833,
        "lat": 32.5167,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Cañón Rosales",
        "lng": -117.0874,
        "lat": 32.5187,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa del Real V",
        "lng": -116.74276296296296,
        "lat": 32.36484074074074,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villa del Real IV",
        "lng": -116.74276296296296,
        "lat": 32.36484074074074,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Vivienda Magisterial 37",
        "lng": -116.89255,
        "lat": 32.42765,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento La Rioja Residencial",
        "lng": -116.87767,
        "lat": 32.46521,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Zona industrial La Jolla",
        "lng": -116.93590000000002,
        "lat": 32.4724,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Villa Fontana XVIII",
        "lng": -116.74276296296296,
        "lat": 32.36484074074074,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Cubillas Sur",
        "lng": -116.8985,
        "lat": 32.333975,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Ampliación Gabriel Rodriguez",
        "lng": -116.7366,
        "lat": 32.3617,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Martínez",
        "lng": -116.90294285714286,
        "lat": 32.431014285714284,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Las 2 Palmas",
        "lng": -117.0268,
        "lat": 32.4273,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Otay Insurgentes",
        "lng": -116.7472,
        "lat": 32.3362,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Moreno",
        "lng": -116.81761333333334,
        "lat": 32.483293333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Loma Bonita Norte",
        "lng": -117.03485714285716,
        "lat": 32.48544285714286,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia La Perla Residencial",
        "lng": -116.9742375,
        "lat": 32.4475875,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Urbiquinta Marsella",
        "lng": -117.03117142857144,
        "lat": 32.41961428571428,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Zona industrial Alamar II",
        "lng": -116.7397,
        "lat": 32.5482,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Rancho 3 Piedras (La Ladrillera)",
        "lng": -116.79189999999998,
        "lat": 32.5075,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Agraristas",
        "lng": -116.80335454545455,
        "lat": 32.40483636363637,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Vaim",
        "lng": -116.8769,
        "lat": 32.32389090909091,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Pegaso II",
        "lng": -116.7397,
        "lat": 32.5482,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Nuevo Milenio",
        "lng": -117.03485714285716,
        "lat": 32.48544285714286,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Ciudad Jardín",
        "lng": -116.9469,
        "lat": 32.4345,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Corona del Mar",
        "lng": -116.5175,
        "lat": 32.5651,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Reynoso Parcela 162",
        "lng": -116.70433333333332,
        "lat": 32.313233333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Santa Fe",
        "lng": -116.8071,
        "lat": 32.5007,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia El Lago",
        "lng": -117.0664,
        "lat": 32.4222,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia El Porvenir",
        "lng": -116.80335454545455,
        "lat": 32.40483636363637,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Colas del Matamoros",
        "lng": -116.68644545454544,
        "lat": 32.329181818181816,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Montes Olímpicos",
        "lng": -116.97188,
        "lat": 32.42098,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Viñas del Mar",
        "lng": -117.065,
        "lat": 32.4536,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Sirak M Baloyan",
        "lng": -116.8441,
        "lat": 32.4134,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Ampliación Lomas Taurinas",
        "lng": -116.7472,
        "lat": 32.3362,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Patria Nueva",
        "lng": -117.03117142857144,
        "lat": 32.41961428571428,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia La Ciénega Sur",
        "lng": -116.89255,
        "lat": 32.42765,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia América",
        "lng": -116.9505,
        "lat": 32.362,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento El Laurel II",
        "lng": -116.82194285714286,
        "lat": 32.44438571428571,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia López Leyva",
        "lng": -116.7333,
        "lat": 32.5333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Magaña",
        "lng": -116.70433333333332,
        "lat": 32.313233333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Patrimonial Benito Juárez",
        "lng": -116.9469,
        "lat": 32.4345,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Veracruz",
        "lng": -116.76182,
        "lat": 32.505406666666666,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Villegas",
        "lng": -116.8455,
        "lat": 32.350744444444445,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Pacifico Campestre",
        "lng": -117.0392,
        "lat": 32.4258,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Punta del Mar",
        "lng": -117.101,
        "lat": 32.4619,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Chamizal",
        "lng": -116.76213333333334,
        "lat": 32.49023333333333,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Los Olivos",
        "lng": -116.85684,
        "lat": 32.4317,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Huertas 2a. Sección",
        "lng": -116.7722,
        "lat": 32.513459999999995,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Ejido Chilpancingo",
        "lng": -116.9178,
        "lat": 32.5254,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Otay Colonial",
        "lng": -116.8041,
        "lat": 32.468,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Rodeo",
        "lng": -116.79970000000002,
        "lat": 32.405,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Xicoténcatl Leyva (OE)",
        "lng": -116.8041,
        "lat": 32.468,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Villas del Río",
        "lng": -116.7997,
        "lat": 32.405,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia López",
        "lng": -116.81761333333334,
        "lat": 32.483293333333336,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Castro",
        "lng": -116.87156923076924,
        "lat": 32.44844615384615,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Santa Paula",
        "lng": -116.79287857142856,
        "lat": 32.40490714285714,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Ampliación Loma Bonita",
        "lng": -116.7366,
        "lat": 32.3617,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Paraíso del Río",
        "lng": -116.7997,
        "lat": 32.405,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Guadalajara",
        "lng": -117.00107142857144,
        "lat": 32.47284285714286,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Santa Mónica",
        "lng": -116.99101428571429,
        "lat": 32.4193,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Playas de Tijuana Sección Costa",
        "lng": -116.96688333333334,
        "lat": 32.44551666666667,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Fraccionamiento Bonaterra",
        "lng": -116.6881,
        "lat": 32.466,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Antorcha II",
        "lng": -117.10765,
        "lat": 32.4589,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia La Joya Este",
        "lng": -116.87156923076924,
        "lat": 32.44844615384615,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Anexa Pro Hogar",
        "lng": -116.8121,
        "lat": 32.3557,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Soler",
        "lng": -116.9963,
        "lat": 32.4538,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Playas de Tijuana Sección Costa de Oro",
        "lng": -116.9963,
        "lat": 32.4538,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Delicias",
        "lng": -116.9436,
        "lat": 32.4089,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Unidad habitacional Alba Roja",
        "lng": -116.7997,
        "lat": 32.405,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Valle Verde",
        "lng": -116.68644545454544,
        "lat": 32.329181818181816,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Lomas de Agua Caliente 6a Sección (Lomas Altas)",
        "lng": -116.89830000000002,
        "lat": 32.4248,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    },
    {
        "City": "Colonia Real de San Antonio",
        "lng": -116.86178571428572,
        "lat": 32.4718,
        "area_size": 1,
        "area_color": 0.8,
        "pin_color": 1,
        "Total Eligible Voters": 1
    }
]

export const demoElectionMapLevel = [
    {
        "city": "Colonia Centro Urbano 70-76",
        "lat": 32.5333,
        "lng": -116.7333,
        "city_score": 0.3,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Fraccionamiento Residencial Los Abedules",
        "lat": 32.2572,
        "lng": -116.746,
        "city_score": 0.1,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia Ramos Sur",
        "lat": 32.513459999999995,
        "lng": -116.7722,
        "city_score": 0.3,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia La Sierra",
        "lat": 32.36538,
        "lng": -116.81364,
        "city_score": 0.3,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Planetario",
        "lat": 32.4248,
        "lng": -116.89830000000002,
        "city_score": 0.7,
        "city_size": 0.85,
        "description": [
            null
        ],
        "_size": 0.85
    },
    {
        "city": "Colonia Terrazas La Morita",
        "lat": 32.44438571428571,
        "lng": -116.82194285714286,
        "city_score": 0.4,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Fraccionamiento Vista del Río",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.4,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Misión de las Californias",
        "lat": 32.3617,
        "lng": -116.7366,
        "city_score": 1,
        "city_size": 0.8,
        "description": [
            null
        ],
        "_size": 0.8
    },
    {
        "city": "Colonia Ejido Francisco Villa",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.6,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Fraccionamiento Villa Fontana VIII",
        "lat": 32.47053636363636,
        "lng": -116.8684,
        "city_score": 0.3,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Fraccionamiento Puerta del Río",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.4,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Zona militar 28 Batallón de Infantería",
        "lat": 32.350744444444445,
        "lng": -116.8455,
        "city_score": 0.7,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Colonia De los Maestros",
        "lat": 32.48574166666666,
        "lng": -116.88399166666666,
        "city_score": 0.7,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Colonia Centro Comercial Otay",
        "lat": 32.3362,
        "lng": -116.7472,
        "city_score": 0.5,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Fraccionamiento Colinas de la Presa",
        "lat": 32.43026666666666,
        "lng": -116.90063333333332,
        "city_score": 0.2,
        "city_size": 0.15,
        "description": [
            null
        ],
        "_size": 0.15
    },
    {
        "city": "Colonia Rincón Colonial Chapultepec",
        "lat": 32.50418888888888,
        "lng": -116.99482222222224,
        "city_score": 0.9,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Colonia Ramírez",
        "lat": 32.44844615384615,
        "lng": -116.87156923076924,
        "city_score": 0.7,
        "city_size": 0.85,
        "description": [
            null
        ],
        "_size": 0.85
    },
    {
        "city": "Fraccionamiento San Antonio Club Hípico y de Golf",
        "lat": 32.4258,
        "lng": -117.0392,
        "city_score": 0.6,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia Monterrey",
        "lat": 32.47284285714286,
        "lng": -117.00107142857144,
        "city_score": 0.2,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia Sanchez Taboada IV",
        "lat": 32.40616666666667,
        "lng": -116.75873333333334,
        "city_score": 0.6,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Fraccionamiento García",
        "lat": 32.4194,
        "lng": -116.92279999999998,
        "city_score": 0.7,
        "city_size": 0.85,
        "description": [
            null
        ],
        "_size": 0.85
    },
    {
        "city": "Colonia Unión",
        "lat": 32.43723333333333,
        "lng": -116.93746666666668,
        "city_score": 0.4,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Fraccionamiento Santa Anita",
        "lat": 32.40154444444445,
        "lng": -116.83006666666668,
        "city_score": 0.9,
        "city_size": 0.8,
        "description": [
            null
        ],
        "_size": 0.8
    },
    {
        "city": "Condominio Real de La Frontera",
        "lat": 32.5254,
        "lng": -116.9178,
        "city_score": 0.4,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Fraccionamiento Insurgentes",
        "lat": 32.405,
        "lng": -116.79970000000002,
        "city_score": 0.8,
        "city_size": 0.8,
        "description": [
            null
        ],
        "_size": 0.8
    },
    {
        "city": "Fraccionamiento Lomas del Pedregal",
        "lat": 32.49058888888889,
        "lng": -116.78061111111111,
        "city_score": 0.1,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Fraccionamiento Campos",
        "lat": 32.431014285714284,
        "lng": -116.90294285714286,
        "city_score": 0,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Guadalupe Victoria",
        "lat": 32.35883333333333,
        "lng": -116.7714,
        "city_score": 0.6,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Patria Nueva",
        "lat": 32.41961428571428,
        "lng": -117.03117142857144,
        "city_score": 0.1,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Colonia Presa Rodriguez",
        "lat": 32.4516,
        "lng": -116.9109,
        "city_score": 0,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Cañón de La Pedrera Este",
        "lat": 32.4248,
        "lng": -116.8983,
        "city_score": 0.2,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Jardines de Chapultepec",
        "lat": 32.48452857142858,
        "lng": -116.96044285714288,
        "city_score": 0.5,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Fraccionamiento Bugambilias (Jacarandas)",
        "lat": 32.4222,
        "lng": -117.0664,
        "city_score": 0.3,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Pórticos del Lago",
        "lat": 32.41961428571428,
        "lng": -117.03117142857144,
        "city_score": 0.1,
        "city_size": 0.15,
        "description": [
            null
        ],
        "_size": 0.15
    },
    {
        "city": "Colonia Anexa Magisterial",
        "lat": 32.5482,
        "lng": -116.7397,
        "city_score": 0.2,
        "city_size": 0.15,
        "description": [
            null
        ],
        "_size": 0.15
    },
    {
        "city": "Colonia Rancho Rivera",
        "lat": 32.4667,
        "lng": -116.7769,
        "city_score": 0.4,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia Los Españoles",
        "lat": 32.490966666666665,
        "lng": -116.6942,
        "city_score": 0.6,
        "city_size": 0.8,
        "description": [
            null
        ],
        "_size": 0.8
    },
    {
        "city": "Zona industrial Fideicomiso el Florido",
        "lat": 32.05833333333333,
        "lng": -116.678175,
        "city_score": 0.3,
        "city_size": 0.15,
        "description": [
            null
        ],
        "_size": 0.15
    },
    {
        "city": "Colonia Kino II",
        "lat": 32.40472307692308,
        "lng": -116.8058846153846,
        "city_score": 0.9,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Fraccionamiento Residencial La Esperanza",
        "lat": 32.48574166666666,
        "lng": -116.88399166666666,
        "city_score": 0.3,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia Cañón Tampico",
        "lat": 32.4742,
        "lng": -116.8065142857143,
        "city_score": 0.7,
        "city_size": 0.8,
        "description": [
            null
        ],
        "_size": 0.8
    },
    {
        "city": "Fraccionamiento Villa Residencial Santa Fe 5a Sección",
        "lat": 32.4306,
        "lng": -117.025,
        "city_score": 0.7,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Jalisco",
        "lat": 32.513459999999995,
        "lng": -116.7722,
        "city_score": 0.2,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia Anexa 20 de Noviembre",
        "lat": 32.4424,
        "lng": -116.7405,
        "city_score": 0.8,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Vaim",
        "lat": 32.32389090909091,
        "lng": -116.8769,
        "city_score": 0.4,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia Las Huertas 5a Sección",
        "lat": 32.431014285714284,
        "lng": -116.90294285714286,
        "city_score": 0.7,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Fraccionamiento Paseo Santa María",
        "lat": 32.05833333333333,
        "lng": -116.678175,
        "city_score": 0,
        "city_size": 0.05,
        "description": [
            null
        ],
        "_size": 0.05
    },
    {
        "city": "Colonia San Antonio Oeste",
        "lat": 32.32389090909091,
        "lng": -116.8769,
        "city_score": 0.7,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia El Chicote",
        "lat": 32.4252,
        "lng": -116.9955,
        "city_score": 0.1,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Colonia Mar Vista",
        "lat": 32.4386,
        "lng": -116.9661,
        "city_score": 0.4,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia María Medina",
        "lat": 32.43768333333333,
        "lng": -116.82155,
        "city_score": 0.7,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Equipamiento Campo de Golf",
        "lat": 32.50418888888888,
        "lng": -116.99482222222224,
        "city_score": 1,
        "city_size": 1,
        "description": [
            null
        ],
        "_size": 1
    },
    {
        "city": "Fraccionamiento Las Américas",
        "lat": 32.419415384615384,
        "lng": -117.02846153846154,
        "city_score": 0.3,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Fraccionamiento Villa Fontana II",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Fraccionamiento Villa del Sol I",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.2,
        "city_size": 0.1,
        "description": [
            null
        ],
        "_size": 0.1
    },
    {
        "city": "Fraccionamiento Paseos del Pacífico",
        "lat": 32.46521,
        "lng": -116.87767,
        "city_score": 0.3,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Los Girasoles",
        "lat": 32.4732,
        "lng": -116.8046,
        "city_score": 0.7,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Camino Real",
        "lat": 32.40154444444445,
        "lng": -116.83006666666668,
        "city_score": 0.6,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia Magaña",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.8,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Arboledas",
        "lat": 32.42765,
        "lng": -116.89255,
        "city_score": 0.6,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Costa Dorada",
        "lat": 32.4391,
        "lng": -116.99188333333336,
        "city_score": 1,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Fraccionamiento Hacienda las Fuentes",
        "lat": 32.05833333333333,
        "lng": -116.678175,
        "city_score": 0.9,
        "city_size": 0.85,
        "description": [
            null
        ],
        "_size": 0.85
    },
    {
        "city": "Colonia Los Álamos",
        "lat": 32.37725,
        "lng": -116.69665,
        "city_score": 0.4,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Fraccionamiento Villa del Real XI",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 1,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Leonardo Rodriguez Alcaine",
        "lat": 32.4475875,
        "lng": -116.9742375,
        "city_score": 0.7,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia Los Arenales A",
        "lat": 32.4667,
        "lng": -116.7769,
        "city_score": 0.7,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Magisterial",
        "lat": 32.5482,
        "lng": -116.7397,
        "city_score": 0.5,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Valle Redondo",
        "lat": 32.5007,
        "lng": -116.8071,
        "city_score": 0.9,
        "city_size": 0.85,
        "description": [
            null
        ],
        "_size": 0.85
    },
    {
        "city": "Colonia Ejido Matamoros",
        "lat": 32.329181818181816,
        "lng": -116.68644545454544,
        "city_score": 0.9,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Colima",
        "lat": 32.40616666666667,
        "lng": -116.75873333333334,
        "city_score": 0.7,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Colonia Alfredo Ames",
        "lat": 32.4252,
        "lng": -116.9955,
        "city_score": 0.4,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Fraccionamiento Santa Paula",
        "lat": 32.40490714285714,
        "lng": -116.79287857142856,
        "city_score": 0.8,
        "city_size": 0.9,
        "description": [
            null
        ],
        "_size": 0.9
    },
    {
        "city": "Colonia Azcona",
        "lat": 32.450525,
        "lng": -116.721025,
        "city_score": 0.4,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Fraccionamiento Colinas del Sol",
        "lat": 32.4647,
        "lng": -117.0425,
        "city_score": 0.5,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia Herrera",
        "lat": 32.43723333333333,
        "lng": -116.93746666666668,
        "city_score": 0.2,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia Patrimonio Alamar",
        "lat": 32.44583333333333,
        "lng": -116.7912,
        "city_score": 0.8,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Fraccionamiento Villa del Real V",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.6,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Obrera 2a Sección",
        "lat": 32.4345,
        "lng": -116.9469,
        "city_score": 0.6,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Fraccionamiento Villa Fontana XI",
        "lat": 32.47053636363636,
        "lng": -116.8684,
        "city_score": 0.8,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Colonia Arenales B",
        "lat": 32.4667,
        "lng": -116.7769,
        "city_score": 1,
        "city_size": 1,
        "description": [
            null
        ],
        "_size": 1
    },
    {
        "city": "Colonia Santa Fe",
        "lat": 32.505406666666666,
        "lng": -116.76182,
        "city_score": 0,
        "city_size": 0,
        "description": [
            null
        ],
        "_size": 0
    },
    {
        "city": "Colonia Anexa Internacional",
        "lat": 32.48574166666666,
        "lng": -116.88399166666666,
        "city_score": 0.8,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Colonia Las Fuentes",
        "lat": 32.505406666666666,
        "lng": -116.76182,
        "city_score": 0.4,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia Obrera 3a Sección",
        "lat": 32.4345,
        "lng": -116.9469,
        "city_score": 0.1,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Colonia Contreras",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.4,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Colonia Tona",
        "lat": 32.4516,
        "lng": -116.9109,
        "city_score": 0.2,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Hacienda las Flores",
        "lat": 32.43455,
        "lng": -116.9743,
        "city_score": 0,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia Anexo los Laureles",
        "lat": 32.4742,
        "lng": -116.8065142857143,
        "city_score": 0.7,
        "city_size": 0.8,
        "description": [
            null
        ],
        "_size": 0.8
    },
    {
        "city": "Colonia Manuel Paredes II",
        "lat": 32.4345,
        "lng": -116.9469,
        "city_score": 0.2,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Felipa Velázquez",
        "lat": 32.4103,
        "lng": -116.836,
        "city_score": 0.8,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Colonia Reacomodo Obras Publicas",
        "lat": 32.4252,
        "lng": -117.0099,
        "city_score": 0.8,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Lomas de Agua Caliente",
        "lat": 32.5167,
        "lng": -117.0167,
        "city_score": 0.9,
        "city_size": 0.9,
        "description": [
            null
        ],
        "_size": 0.9
    },
    {
        "city": "Unidad habitacional Fidel Velázquez",
        "lat": 32.40483636363637,
        "lng": -116.80335454545455,
        "city_score": 0.4,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Fraccionamiento Villa del Real I",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.7,
        "city_size": 0.8,
        "description": [
            null
        ],
        "_size": 0.8
    },
    {
        "city": "Colonia Granjas Buenos Aires Sección La Palma",
        "lat": 32.3915,
        "lng": -116.9576,
        "city_score": 0.5,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia Morelos",
        "lat": 32.445366666666665,
        "lng": -116.732,
        "city_score": 0.8,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Colonia Lomas de Agua Caliente 6a Sección (Lomas Altas)",
        "lat": 32.4248,
        "lng": -116.89830000000002,
        "city_score": 0.3,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Panamericano",
        "lat": 32.466,
        "lng": -116.6881,
        "city_score": 1,
        "city_size": 1,
        "description": [
            null
        ],
        "_size": 1
    },
    {
        "city": "Colonia Florido Viejo",
        "lat": 32.49058888888889,
        "lng": -116.78061111111111,
        "city_score": 0.2,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Colonia Alcalá",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.1,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Hacienda del Pacifico",
        "lat": 32.46521,
        "lng": -116.87767,
        "city_score": 0.1,
        "city_size": 0.1,
        "description": [
            null
        ],
        "_size": 0.1
    },
    {
        "city": "Colonia Altabrisa",
        "lat": 32.3362,
        "lng": -116.7472,
        "city_score": 0.3,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Fraccionamiento Hacienda las Delicias III",
        "lat": 32.3915,
        "lng": -116.9576,
        "city_score": 0.9,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Colonia Garita Otay",
        "lat": 32.468,
        "lng": -116.8041,
        "city_score": 0.7,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Dávila",
        "lat": 32.362,
        "lng": -116.9505,
        "city_score": 1,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Zona industrial Valle Bonito",
        "lat": 32.4256,
        "lng": -116.8831,
        "city_score": 0.9,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Camino Verde (Cañada Verde)",
        "lat": 32.4103,
        "lng": -116.836,
        "city_score": 0.5,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Fraccionamiento Residencial El Fuerte",
        "lat": 32.41961428571428,
        "lng": -117.03117142857144,
        "city_score": 0.9,
        "city_size": 0.8,
        "description": [
            null
        ],
        "_size": 0.8
    },
    {
        "city": "Colonia I Ayuntamiento",
        "lat": 32.4345,
        "lng": -116.9469,
        "city_score": 0.7,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia Salvatierra",
        "lat": 32.3,
        "lng": -116.91670000000002,
        "city_score": 0,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia El Realito",
        "lat": 32.4256,
        "lng": -116.8831,
        "city_score": 0.6,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Las 2 Palmas",
        "lat": 32.4273,
        "lng": -117.0268,
        "city_score": 0.7,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Rinconada de Otay",
        "lat": 32.4089,
        "lng": -116.9436,
        "city_score": 0.8,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Fraccionamiento Villa Fontana IV",
        "lat": 32.47053636363636,
        "lng": -116.8684,
        "city_score": 0.3,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia Plan de Barranquitas",
        "lat": 32.496766666666666,
        "lng": -116.79406666666668,
        "city_score": 0.9,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Lagunitas",
        "lat": 32.44055,
        "lng": -116.84985,
        "city_score": 0.3,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Fraccionamiento El Laurel I",
        "lat": 32.44438571428571,
        "lng": -116.82194285714286,
        "city_score": 0.3,
        "city_size": 0.15,
        "description": [
            null
        ],
        "_size": 0.15
    },
    {
        "city": "Colonia Calete",
        "lat": 32.362,
        "lng": -116.9505,
        "city_score": 0.9,
        "city_size": 0.95,
        "description": [
            null
        ],
        "_size": 0.95
    },
    {
        "city": "Fraccionamiento Residencial Agua Caliente",
        "lat": 32.4317,
        "lng": -116.85684,
        "city_score": 0.8,
        "city_size": 0.8,
        "description": [
            null
        ],
        "_size": 0.8
    },
    {
        "city": "Fraccionamiento Colinas de la Presa Sección Montebello",
        "lat": 32.43026666666666,
        "lng": -116.90063333333332,
        "city_score": 0.6,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Playas de Tijuana Sección Jardines del Sol",
        "lat": 32.4475875,
        "lng": -116.9742375,
        "city_score": 0,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Praderas de La Mesa",
        "lat": 32.40483636363637,
        "lng": -116.80335454545455,
        "city_score": 0.9,
        "city_size": 0.85,
        "description": [
            null
        ],
        "_size": 0.85
    },
    {
        "city": "Colonia Granjas Familiares de Matamoros",
        "lat": 32.3617,
        "lng": -116.7366,
        "city_score": 0.2,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Fraccionamiento Villa Fontana V",
        "lat": 32.47053636363636,
        "lng": -116.8684,
        "city_score": 0.2,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Playas de Tijuana Sección Triangulo de Oro",
        "lat": 32.4538,
        "lng": -116.9963,
        "city_score": 0.4,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Misión del Sol",
        "lat": 32.4538,
        "lng": -116.9963,
        "city_score": 0.2,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Fraccionamiento Cuesta Blanca",
        "lat": 32.4273,
        "lng": -117.0268,
        "city_score": 0.3,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Las Palmas",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.2,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia Villa Cruz",
        "lat": 32.40483636363637,
        "lng": -116.80335454545455,
        "city_score": 0.2,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Cuauhtémoc",
        "lat": 32.496766666666666,
        "lng": -116.79406666666668,
        "city_score": 0.2,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Fraccionamiento Rubí Aguadores",
        "lat": 32.4345,
        "lng": -116.9469,
        "city_score": 0.8,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia Jardines de Agua Caliente",
        "lat": 32.4317,
        "lng": -116.85684,
        "city_score": 0.3,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Fraccionamiento Hacienda Las Delicias",
        "lat": 32.3915,
        "lng": -116.9576,
        "city_score": 0.9,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Cañón de las Rosas",
        "lat": 32.4724,
        "lng": -116.9359,
        "city_score": 0.7,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Santa Elena",
        "lat": 32.32389090909091,
        "lng": -116.8769,
        "city_score": 0.5,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Chapultepec 8a Sección",
        "lat": 32.50418888888888,
        "lng": -116.99482222222224,
        "city_score": 0.1,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Fraccionamiento Camino Viejo",
        "lat": 32.4194,
        "lng": -116.92279999999998,
        "city_score": 0.8,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Playas de Tijuana Sección Costa de Oro",
        "lat": 32.4538,
        "lng": -116.9963,
        "city_score": 0.9,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Fraccionamiento Villa Fontana X",
        "lat": 32.47053636363636,
        "lng": -116.8684,
        "city_score": 0,
        "city_size": 0.1,
        "description": [
            null
        ],
        "_size": 0.1
    },
    {
        "city": "Colonia Rancho 3 Piedras (La Ladrillera)",
        "lat": 32.5075,
        "lng": -116.79189999999998,
        "city_score": 0.9,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia Nuevo Milenio",
        "lat": 32.48544285714286,
        "lng": -117.03485714285716,
        "city_score": 0.6,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Fraccionamiento Natura Sección Vistas del Sol",
        "lat": 32.3915,
        "lng": -116.9576,
        "city_score": 0.2,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Fraccionamiento Vista Azul",
        "lat": 32.4589,
        "lng": -117.10765,
        "city_score": 0.6,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia Aviación",
        "lat": 32.496766666666666,
        "lng": -116.79406666666668,
        "city_score": 0.4,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Fraccionamiento Sección Campestre",
        "lat": 32.4193,
        "lng": -116.99101428571429,
        "city_score": 0.3,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Zona industrial Valle Sur",
        "lat": 32.48544285714286,
        "lng": -117.03485714285716,
        "city_score": 0.5,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Ampliación Salvatierra",
        "lat": 32.3,
        "lng": -116.91670000000002,
        "city_score": 0.9,
        "city_size": 0.9,
        "description": [
            null
        ],
        "_size": 0.9
    },
    {
        "city": "Fraccionamiento Estrella del Pacífico",
        "lat": 32.4391,
        "lng": -116.99188333333336,
        "city_score": 0.1,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Ignacio Zaragoza",
        "lat": 32.22461428571428,
        "lng": -116.53342857142856,
        "city_score": 0.3,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Colonia 10 de Mayo",
        "lat": 32.5482,
        "lng": -116.7397,
        "city_score": 0.2,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Fraccionamiento Hábitat Piedras Blancas",
        "lat": 32.4256,
        "lng": -116.8831,
        "city_score": 0.6,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Cerro II",
        "lat": 32.40472307692308,
        "lng": -116.8058846153846,
        "city_score": 0.3,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Altamira",
        "lat": 32.4041,
        "lng": -116.8198,
        "city_score": 0,
        "city_size": 0.05,
        "description": [
            null
        ],
        "_size": 0.05
    },
    {
        "city": "Colonia Lázaro Cárdenas 3ra Mesa",
        "lat": 32.4386,
        "lng": -116.9661,
        "city_score": 0.2,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Jardines del Rubí",
        "lat": 32.3557,
        "lng": -116.8121,
        "city_score": 0.4,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia Chihuahua",
        "lat": 32.4193,
        "lng": -116.88335,
        "city_score": 0.9,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Fraccionamiento La Cúspide",
        "lat": 32.4983,
        "lng": -117.1207,
        "city_score": 0.2,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Héroes de Independencia",
        "lat": 32.47053636363636,
        "lng": -116.8684,
        "city_score": 0.8,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia Pórticos de La Mesa",
        "lat": 32.405,
        "lng": -116.79970000000002,
        "city_score": 0.4,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Fraccionamiento Villa del Real VI",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.8,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Rubio",
        "lat": 32.513459999999995,
        "lng": -116.7722,
        "city_score": 0.9,
        "city_size": 0.9,
        "description": [
            null
        ],
        "_size": 0.9
    },
    {
        "city": "Fraccionamiento La Muralla",
        "lat": 32.44438571428571,
        "lng": -116.82194285714286,
        "city_score": 0.2,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia Ojo de Agua",
        "lat": 32.49058888888889,
        "lng": -116.78061111111111,
        "city_score": 0.6,
        "city_size": 0.8,
        "description": [
            null
        ],
        "_size": 0.8
    },
    {
        "city": "Fraccionamiento Loma Dorada",
        "lat": 32.41961428571428,
        "lng": -117.03117142857144,
        "city_score": 0.4,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Lomas de La Amistad",
        "lat": 32.406580000000005,
        "lng": -116.74652,
        "city_score": 0.5,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Hidalgo",
        "lat": 32.445366666666665,
        "lng": -116.732,
        "city_score": 0.6,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia Fernández",
        "lat": 32.4667,
        "lng": -116.7769,
        "city_score": 0.7,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Fraccionamiento Anáhuac",
        "lat": 32.483293333333336,
        "lng": -116.81761333333334,
        "city_score": 0.9,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Los Ángeles",
        "lat": 32.483293333333336,
        "lng": -116.81761333333334,
        "city_score": 0.3,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Fraccionamiento La Rioja Residencial",
        "lat": 32.46521,
        "lng": -116.87767,
        "city_score": 0.9,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Colonia Mesetas del Guaycura",
        "lat": 32.41961428571428,
        "lng": -117.03117142857144,
        "city_score": 0.8,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Rancho Santa Cruz",
        "lat": 32.433260000000004,
        "lng": -116.87776999999998,
        "city_score": 0.8,
        "city_size": 0.8,
        "description": [
            null
        ],
        "_size": 0.8
    },
    {
        "city": "Fraccionamiento Quinta Versalles",
        "lat": 32.4306,
        "lng": -117.025,
        "city_score": 0.1,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia Rancho el Grande",
        "lat": 32.48452857142858,
        "lng": -116.96044285714288,
        "city_score": 0.2,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia Guerrero",
        "lat": 32.450525,
        "lng": -116.721025,
        "city_score": 0.9,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Colonia La Fuente del Valle",
        "lat": 32.5075,
        "lng": -116.79189999999998,
        "city_score": 0.4,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia 3 de Octubre",
        "lat": 32.431574999999995,
        "lng": -116.904675,
        "city_score": 0.5,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Fraccionamiento Villas del Dorado",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Fraccionamiento Villa Residencial Santa Fe 1a Sección",
        "lat": 32.4391,
        "lng": -116.99188333333336,
        "city_score": 0.6,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia El Ranchito",
        "lat": 32.431574999999995,
        "lng": -116.904675,
        "city_score": 0.4,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Fraccionamiento Conjunto Residencial Cataviña",
        "lat": 32.48452857142858,
        "lng": -116.96044285714288,
        "city_score": 0.2,
        "city_size": 0.15,
        "description": [
            null
        ],
        "_size": 0.15
    },
    {
        "city": "Colonia Agraristas",
        "lat": 32.40483636363637,
        "lng": -116.80335454545455,
        "city_score": 0.2,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia Alfonso Garzón",
        "lat": 32.5333,
        "lng": -116.7333,
        "city_score": 0.6,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Genaro Vázquez",
        "lat": 32.43449999999999,
        "lng": -116.9582888888889,
        "city_score": 1,
        "city_size": 0.95,
        "description": [
            null
        ],
        "_size": 0.95
    },
    {
        "city": "Colonia Juárez",
        "lat": 32.38305,
        "lng": -116.88515,
        "city_score": 0.9,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Unidad habitacional INDECO Universidad",
        "lat": 32.22461428571428,
        "lng": -116.53342857142856,
        "city_score": 0,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Fraccionamiento Las Plazas",
        "lat": 32.48574166666666,
        "lng": -116.88399166666666,
        "city_score": 0.9,
        "city_size": 0.9,
        "description": [
            null
        ],
        "_size": 0.9
    },
    {
        "city": "Fraccionamiento Villa del Prado",
        "lat": 32.433260000000004,
        "lng": -116.87776999999998,
        "city_score": 0.2,
        "city_size": 0.15,
        "description": [
            null
        ],
        "_size": 0.15
    },
    {
        "city": "Fraccionamiento Lomas del Mar",
        "lat": 32.4536,
        "lng": -117.065,
        "city_score": 0.7,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Las Californias",
        "lat": 32.4604,
        "lng": -116.90155,
        "city_score": 0.6,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia Río Tijuana 3a Etapa",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.9,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Colonia Buena Vista",
        "lat": 32.49023333333333,
        "lng": -116.76213333333334,
        "city_score": 0.5,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Colonia Gabilondo",
        "lat": 32.362,
        "lng": -116.9505,
        "city_score": 0.2,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Residencial La Esmeralda",
        "lat": 32.48574166666666,
        "lng": -116.88399166666666,
        "city_score": 0.2,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Fraccionamiento Privada Hacienda Córdoba",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.4,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Guaycura",
        "lat": 32.4222,
        "lng": -117.0664,
        "city_score": 0,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Fraccionamiento Villa Fontana XIV",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.6,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Colonia Ignacio Ramírez",
        "lat": 32.40490714285714,
        "lng": -116.79287857142856,
        "city_score": 1,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Fraccionamiento Villa del Sol IV",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.6,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Fraccionamiento Hacienda Santa María",
        "lat": 32.05833333333333,
        "lng": -116.678175,
        "city_score": 0.9,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia El Olivar",
        "lat": 32.4194,
        "lng": -116.92279999999998,
        "city_score": 0.9,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Lomas Villas",
        "lat": 32.40490714285714,
        "lng": -116.79287857142856,
        "city_score": 0.9,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia INFONAVIT Lomas Verdes",
        "lat": 32.431014285714284,
        "lng": -116.90294285714286,
        "city_score": 0.7,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Emperadores",
        "lat": 32.505406666666666,
        "lng": -116.76182,
        "city_score": 0.1,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Colonia Ampliación Sanchez Taboada",
        "lat": 32.40616666666667,
        "lng": -116.75873333333334,
        "city_score": 0.3,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Lomas Conjunto Residencial",
        "lat": 32.513459999999995,
        "lng": -116.7722,
        "city_score": 0.5,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Roma",
        "lat": 32.4041,
        "lng": -116.8198,
        "city_score": 1,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Herradura Sur",
        "lat": 32.4248,
        "lng": -116.8983,
        "city_score": 0.7,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia Aguaje de La Tuna 2a Sección",
        "lat": 32.48574166666666,
        "lng": -116.88399166666666,
        "city_score": 0.9,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Colonia Ampliación Loma Bonita",
        "lat": 32.3617,
        "lng": -116.7366,
        "city_score": 0.4,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia América",
        "lat": 32.362,
        "lng": -116.9505,
        "city_score": 0.9,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Unidad habitacional FOVISSSTE",
        "lat": 32.4089,
        "lng": -116.9436,
        "city_score": 0.4,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Plaza Otay",
        "lat": 32.46782,
        "lng": -116.79802,
        "city_score": 0.2,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Fraccionamiento Villa Fontana I",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.9,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Fraccionamiento Valle del Pedregal",
        "lat": 32.40490714285714,
        "lng": -116.79287857142856,
        "city_score": 0.7,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Escolar Agua Caliente",
        "lat": 32.496766666666666,
        "lng": -116.79406666666668,
        "city_score": 0.7,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Zona industrial Industrial Pacífico II",
        "lat": 32.43449999999999,
        "lng": -116.9582888888889,
        "city_score": 0.1,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Mineral de Santa Fe",
        "lat": 32.5333,
        "lng": -116.7333,
        "city_score": 0.3,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Castro Green",
        "lat": 32.431014285714284,
        "lng": -116.90294285714286,
        "city_score": 0.1,
        "city_size": 0.15,
        "description": [
            null
        ],
        "_size": 0.15
    },
    {
        "city": "Fraccionamiento Urbi Quinta del Cedro",
        "lat": 32.4536,
        "lng": -117.065,
        "city_score": 0.8,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Fraccionamiento Residencial San Marino",
        "lat": 32.4258,
        "lng": -117.0392,
        "city_score": 0.4,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Fraccionamiento Brisa Marina",
        "lat": 32.3,
        "lng": -116.91670000000002,
        "city_score": 1,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Colonia Internacional",
        "lat": 32.48574166666666,
        "lng": -116.88399166666666,
        "city_score": 0.1,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Monte Bello",
        "lat": 32.40154444444445,
        "lng": -116.83006666666668,
        "city_score": 0.2,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia López Lucio",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.7,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia El Progreso",
        "lat": 32.4193,
        "lng": -116.88335,
        "city_score": 0.9,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Colonia La Escondida",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.2,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia Zona Este",
        "lat": 32.4179,
        "lng": -116.87213333333334,
        "city_score": 0.6,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Cañón de La Pedrera",
        "lat": 32.4248,
        "lng": -116.8983,
        "city_score": 0.3,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Fraccionamiento Villa Residencial Santa Fe 3a Sección",
        "lat": 32.4252,
        "lng": -116.9955,
        "city_score": 0.5,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia Villa de Alcázar",
        "lat": 32.4194,
        "lng": -116.92279999999998,
        "city_score": 0.7,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Modesto Ponce",
        "lat": 32.3,
        "lng": -116.91670000000002,
        "city_score": 0.2,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Fraccionamiento Chapultepec 9a Sección",
        "lat": 32.50418888888888,
        "lng": -116.99482222222224,
        "city_score": 0.9,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia Chula Vista",
        "lat": 32.333975,
        "lng": -116.8985,
        "city_score": 0.6,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Colonia Hipódromo",
        "lat": 32.50418888888888,
        "lng": -116.99482222222224,
        "city_score": 0.5,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Castillo",
        "lat": 32.466,
        "lng": -116.6881,
        "city_score": 0.6,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Loma Bonita",
        "lat": 32.3617,
        "lng": -116.7366,
        "city_score": 0.1,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Fraccionamiento Cañón del Matadero Norte",
        "lat": 32.4538,
        "lng": -116.9963,
        "city_score": 0.5,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Zona industrial Internacional Tijuana",
        "lat": 32.4776,
        "lng": -117.0087,
        "city_score": 0.5,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Fraccionamiento Hacienda Acueducto",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.8,
        "city_size": 0.9,
        "description": [
            null
        ],
        "_size": 0.9
    },
    {
        "city": "Colonia Cerro Colorado",
        "lat": 32.40472307692308,
        "lng": -116.8058846153846,
        "city_score": 0.8,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Fraccionamiento Residencial Isla Cedros",
        "lat": 32.4718,
        "lng": -116.86178571428572,
        "city_score": 0.1,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Pedregal de Santa Julia",
        "lat": 32.48544285714286,
        "lng": -117.03485714285716,
        "city_score": 0.4,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia Alberto Bustamante",
        "lat": 32.4386,
        "lng": -116.9661,
        "city_score": 0.9,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia División del Norte",
        "lat": 32.43768333333333,
        "lng": -116.82155,
        "city_score": 0.9,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia Sánchez Díaz",
        "lat": 32.48574166666666,
        "lng": -116.88399166666666,
        "city_score": 0.4,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Fraccionamiento Otay Colonial",
        "lat": 32.468,
        "lng": -116.8041,
        "city_score": 0.8,
        "city_size": 0.9,
        "description": [
            null
        ],
        "_size": 0.9
    },
    {
        "city": "Fraccionamiento Villa del Real VII",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Fraccionamiento Valle Dorado",
        "lat": 32.433260000000004,
        "lng": -116.87776999999998,
        "city_score": 0.7,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Colonia Santa Rosa",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.2,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Cañón Primavera",
        "lat": 32.4248,
        "lng": -116.8983,
        "city_score": 0.4,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia Baja Malibú",
        "lat": 32.425200000000004,
        "lng": -117.094875,
        "city_score": 0.5,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Portezuelos",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.9,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Divina Providencia",
        "lat": 32.4724,
        "lng": -116.93590000000002,
        "city_score": 0.5,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Fraccionamiento Palma Real",
        "lat": 32.391549999999995,
        "lng": -116.95765,
        "city_score": 0.7,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Las Huertas 4a Sección",
        "lat": 32.505406666666666,
        "lng": -116.76182,
        "city_score": 0.9,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Fraccionamiento Villa del Sol V",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.3,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Fraccionamiento Rincón Toscano",
        "lat": 32.47284285714286,
        "lng": -117.00107142857144,
        "city_score": 0.6,
        "city_size": 0.8,
        "description": [
            null
        ],
        "_size": 0.8
    },
    {
        "city": "Colonia Anexa Divina Providencia",
        "lat": 32.4724,
        "lng": -116.93590000000002,
        "city_score": 0.1,
        "city_size": 0.1,
        "description": [
            null
        ],
        "_size": 0.1
    },
    {
        "city": "Colonia Colinas de Cortés",
        "lat": 32.37,
        "lng": -116.6345,
        "city_score": 0.1,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia 18 de Marzo",
        "lat": 32.42765,
        "lng": -116.89255,
        "city_score": 1,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Maestros Universitarios",
        "lat": 32.4089,
        "lng": -116.9436,
        "city_score": 0,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Patrimonial Benito Juárez",
        "lat": 32.4345,
        "lng": -116.9469,
        "city_score": 0.9,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia Otay Constituyentes",
        "lat": 32.4089,
        "lng": -116.9436,
        "city_score": 0.4,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia El Florido IV",
        "lat": 32.05833333333333,
        "lng": -116.678175,
        "city_score": 0.6,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Ampliación Reforma",
        "lat": 32.406580000000005,
        "lng": -116.74652,
        "city_score": 0.5,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Fraccionamiento Villa del Real X",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.7,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia Meseta del Chema",
        "lat": 32.405,
        "lng": -116.79970000000002,
        "city_score": 0.1,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Colinas San Rafael",
        "lat": 32.433260000000004,
        "lng": -116.87776999999998,
        "city_score": 1,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia Melchor Ocampo",
        "lat": 32.506625,
        "lng": -116.690575,
        "city_score": 0,
        "city_size": 0,
        "description": [
            null
        ],
        "_size": 0
    },
    {
        "city": "Colonia Carmen Castillo",
        "lat": 32.37,
        "lng": -116.6345,
        "city_score": 0.6,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia La Remosa",
        "lat": 32.421842857142856,
        "lng": -116.88708571428572,
        "city_score": 0,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Colonia Otay Jardín",
        "lat": 32.22461428571428,
        "lng": -116.53342857142856,
        "city_score": 1,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Fraccionamiento San Quintín",
        "lat": 32.46521,
        "lng": -116.87767,
        "city_score": 0.4,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Fraccionamiento Valle de las Palmas",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.8,
        "city_size": 0.9,
        "description": [
            null
        ],
        "_size": 0.9
    },
    {
        "city": "Fraccionamiento El Florido Sección Colinas",
        "lat": 32.49058888888889,
        "lng": -116.78061111111111,
        "city_score": 0.4,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia San Jerónimo",
        "lat": 32.48452857142858,
        "lng": -116.96044285714288,
        "city_score": 0.7,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Colonia Lomas del Valle",
        "lat": 32.5075,
        "lng": -116.79189999999998,
        "city_score": 0,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia La Ciénega Poniente",
        "lat": 32.32389090909091,
        "lng": -116.8769,
        "city_score": 0.3,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Condominio Privada San Miguel",
        "lat": 32.44583333333333,
        "lng": -116.7912,
        "city_score": 0.6,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Unidad habitacional Capistrano INFONAVIT",
        "lat": 32.40472307692308,
        "lng": -116.8058846153846,
        "city_score": 0.3,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Villa Colonial",
        "lat": 32.4317,
        "lng": -116.85684,
        "city_score": 0.7,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia La Isla",
        "lat": 32.4538,
        "lng": -116.9963,
        "city_score": 0.2,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Cañón Miramar",
        "lat": 32.4724,
        "lng": -116.9359,
        "city_score": 0.7,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Colonia Cañón el Salado",
        "lat": 32.513459999999995,
        "lng": -116.7722,
        "city_score": 0.9,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Fraccionamiento Natura Sección Bosques",
        "lat": 32.3915,
        "lng": -116.9576,
        "city_score": 0.6,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Colonia El Florido 2a. Sección",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.1,
        "city_size": 0.1,
        "description": [
            null
        ],
        "_size": 0.1
    },
    {
        "city": "Fraccionamiento San Carlos",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 1,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Colonia Puerta de Hierro",
        "lat": 32.5167,
        "lng": -117.0167,
        "city_score": 0.9,
        "city_size": 0.8,
        "description": [
            null
        ],
        "_size": 0.8
    },
    {
        "city": "Colonia Loma Bonita Norte",
        "lat": 32.48544285714286,
        "lng": -117.03485714285716,
        "city_score": 0.3,
        "city_size": 0.15,
        "description": [
            null
        ],
        "_size": 0.15
    },
    {
        "city": "Colonia El Mirador",
        "lat": 32.4742,
        "lng": -116.8065142857143,
        "city_score": 0,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Colonia Campestre La Gloria",
        "lat": 32.4462,
        "lng": -117.001,
        "city_score": 0.3,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Fraccionamiento Villa Bonita",
        "lat": 32.40490714285714,
        "lng": -116.79287857142856,
        "city_score": 0.5,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Real del Monte",
        "lat": 32.40154444444445,
        "lng": -116.83006666666668,
        "city_score": 0.8,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Terrazas del Valle 2a Sección",
        "lat": 32.5075,
        "lng": -116.79189999999998,
        "city_score": 0.3,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia Cañón de La Raza",
        "lat": 32.40483636363637,
        "lng": -116.80335454545455,
        "city_score": 0.7,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Fraccionamiento Electricistas",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.7,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Colonia Valle Vista 1a Sección",
        "lat": 32.506625,
        "lng": -116.690575,
        "city_score": 0.9,
        "city_size": 0.85,
        "description": [
            null
        ],
        "_size": 0.85
    },
    {
        "city": "Colonia Gerónimo Meza",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.5,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Fraccionamiento El Águila",
        "lat": 32.419415384615384,
        "lng": -117.02846153846154,
        "city_score": 0.8,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia Zona Centro",
        "lat": 32.4179,
        "lng": -116.87213333333334,
        "city_score": 0.2,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Los Naranjos",
        "lat": 32.43026666666666,
        "lng": -116.90063333333332,
        "city_score": 0.3,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Guillen",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.8,
        "city_size": 0.8,
        "description": [
            null
        ],
        "_size": 0.8
    },
    {
        "city": "Condominio Mar Vista",
        "lat": 32.4742,
        "lng": -116.8065142857143,
        "city_score": 0.6,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Fraccionamiento Banus Residencial",
        "lat": 32.43449999999999,
        "lng": -116.9582888888889,
        "city_score": 0.9,
        "city_size": 0.85,
        "description": [
            null
        ],
        "_size": 0.85
    },
    {
        "city": "Colonia Ceceña",
        "lat": 32.483293333333336,
        "lng": -116.81761333333334,
        "city_score": 0,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Burócrata Ruiz Cortines",
        "lat": 32.5167,
        "lng": -116.9833,
        "city_score": 1,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia La Ciénega Sur",
        "lat": 32.42765,
        "lng": -116.89255,
        "city_score": 0.8,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Anexa Roma",
        "lat": 32.4345,
        "lng": -116.9469,
        "city_score": 0.4,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Unidad habitacional Presidentes",
        "lat": 32.419415384615384,
        "lng": -117.02846153846154,
        "city_score": 0,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia Reynoso Parcela 162",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 1,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Fraccionamiento Chapultepec 10a Sección",
        "lat": 32.50418888888888,
        "lng": -116.99482222222224,
        "city_score": 0.1,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Fraccionamiento Bosques de La Presa",
        "lat": 32.43026666666666,
        "lng": -116.90063333333332,
        "city_score": 0.6,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia FOVISSSTE V",
        "lat": 32.46782,
        "lng": -116.79802,
        "city_score": 0.7,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Fraccionamiento Villas del Río",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.4,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia Marrón",
        "lat": 32.496766666666666,
        "lng": -116.79406666666668,
        "city_score": 0.7,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Colonia Lomas Misión",
        "lat": 32.4538,
        "lng": -116.9963,
        "city_score": 0.6,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia Libertad",
        "lat": 32.5167,
        "lng": -116.9833,
        "city_score": 0.6,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Zona industrial Parque Industrial Misiones de las Californias",
        "lat": 32.3362,
        "lng": -116.7472,
        "city_score": 0.1,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia Fundadores",
        "lat": 32.47284285714286,
        "lng": -117.00107142857144,
        "city_score": 0.5,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Cañón del Matadero Este",
        "lat": 32.4742,
        "lng": -116.8065142857143,
        "city_score": 0.9,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Hacienda el Colorado",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.4,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Unidad habitacional Otay Universidad",
        "lat": 32.22461428571428,
        "lng": -116.53342857142856,
        "city_score": 0.3,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Fraccionamiento Playa Diamante",
        "lat": 32.44551666666667,
        "lng": -116.96688333333334,
        "city_score": 0.7,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Colonia Misiones del Pedregal",
        "lat": 32.35883333333333,
        "lng": -116.7714,
        "city_score": 0.6,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Universidad Sur",
        "lat": 32.22461428571428,
        "lng": -116.53342857142856,
        "city_score": 0.2,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia Paseos de Guaycura",
        "lat": 32.419415384615384,
        "lng": -117.02846153846154,
        "city_score": 0.7,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Gran Tenochtitlán",
        "lat": 32.4724,
        "lng": -116.9359,
        "city_score": 0.1,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia Otay Insurgentes",
        "lat": 32.3362,
        "lng": -116.7472,
        "city_score": 0.1,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Playas de Tijuana Sección Costa",
        "lat": 32.44551666666667,
        "lng": -116.96688333333334,
        "city_score": 0.1,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia Agua Caliente Sección Pinos",
        "lat": 32.496766666666666,
        "lng": -116.79406666666668,
        "city_score": 0.9,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia Los Olivos",
        "lat": 32.4256,
        "lng": -116.8831,
        "city_score": 0.7,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia La Esmeralda",
        "lat": 32.505406666666666,
        "lng": -116.76182,
        "city_score": 0.8,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia Fortín de las Flores Oeste",
        "lat": 32.32389090909091,
        "lng": -116.8769,
        "city_score": 0.3,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia Las Abejas",
        "lat": 32.05833333333333,
        "lng": -116.678175,
        "city_score": 0.4,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Residencial Las Cascadas",
        "lat": 32.36538,
        "lng": -116.81364,
        "city_score": 0,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia Huertas 1a. Sección",
        "lat": 32.513459999999995,
        "lng": -116.7722,
        "city_score": 0.1,
        "city_size": 0.1,
        "description": [
            null
        ],
        "_size": 0.1
    },
    {
        "city": "Colonia Villa Lomas",
        "lat": 32.4248,
        "lng": -116.89830000000002,
        "city_score": 0.9,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Sonoita",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.9,
        "city_size": 0.95,
        "description": [
            null
        ],
        "_size": 0.95
    },
    {
        "city": "Colonia Yamille",
        "lat": 32.32389090909091,
        "lng": -116.8769,
        "city_score": 0.3,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Los Laureles",
        "lat": 32.4742,
        "lng": -116.8065142857143,
        "city_score": 0.6,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Colonia Ampliación Ejido Lázaro Cárdenas",
        "lat": 32.4252,
        "lng": -116.9955,
        "city_score": 0.6,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Jardines de Las Arboledas",
        "lat": 32.4194,
        "lng": -116.92279999999998,
        "city_score": 0.6,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Nueva Tijuana",
        "lat": 32.468,
        "lng": -116.8041,
        "city_score": 0.2,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Ranchería Rincón del Mediterraneo",
        "lat": 32.49058888888889,
        "lng": -116.78061111111111,
        "city_score": 0.6,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Arboledas de La Mesa",
        "lat": 32.42765,
        "lng": -116.89255,
        "city_score": 0,
        "city_size": 0.05,
        "description": [
            null
        ],
        "_size": 0.05
    },
    {
        "city": "Colonia Anexa Santa Fe",
        "lat": 32.505406666666666,
        "lng": -116.76182,
        "city_score": 0.7,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Colonia Buenos Aires Sur",
        "lat": 32.3617,
        "lng": -116.7366,
        "city_score": 0.3,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Lomas de Agua Caliente 1a Sección",
        "lat": 32.48452857142858,
        "lng": -116.96044285714288,
        "city_score": 0.5,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia Tepeyac",
        "lat": 32.40490714285714,
        "lng": -116.79287857142856,
        "city_score": 0.6,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Rinconada 2",
        "lat": 32.4089,
        "lng": -116.9436,
        "city_score": 0.7,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia El Niño",
        "lat": 32.5075,
        "lng": -116.79189999999998,
        "city_score": 0.3,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Fraccionamiento San Miguel",
        "lat": 32.4391,
        "lng": -116.99188333333336,
        "city_score": 0,
        "city_size": 0.05,
        "description": [
            null
        ],
        "_size": 0.05
    },
    {
        "city": "Fraccionamiento Segunda Parte del Soler",
        "lat": 32.4538,
        "lng": -116.9963,
        "city_score": 0.4,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Fraccionamiento Paseos del Florido",
        "lat": 32.05833333333333,
        "lng": -116.678175,
        "city_score": 0,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia Las Brisas",
        "lat": 32.44844615384615,
        "lng": -116.87156923076924,
        "city_score": 0.4,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia San Antonio",
        "lat": 32.32389090909091,
        "lng": -116.8769,
        "city_score": 0.1,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Colonia Defensores de Baja California",
        "lat": 32.5333,
        "lng": -116.7333,
        "city_score": 0.6,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Pegaso I",
        "lat": 32.5482,
        "lng": -116.7397,
        "city_score": 0.6,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia Quintas Campestre El Refugio",
        "lat": 32.4732,
        "lng": -116.8046,
        "city_score": 1,
        "city_size": 1,
        "description": [
            null
        ],
        "_size": 1
    },
    {
        "city": "Colonia Obrera 1a Sección",
        "lat": 32.4345,
        "lng": -116.9469,
        "city_score": 0.1,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Campestre Murua",
        "lat": 32.4749,
        "lng": -116.7956,
        "city_score": 0.6,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Empleado Postal",
        "lat": 32.5333,
        "lng": -116.7333,
        "city_score": 0.5,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Zona industrial El Florido I",
        "lat": 32.2572,
        "lng": -116.746,
        "city_score": 0.3,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Fraccionamiento Lomas de La Presa",
        "lat": 32.43026666666666,
        "lng": -116.90063333333332,
        "city_score": 0.1,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia Pórticos de San Antonio",
        "lat": 32.4718,
        "lng": -116.86178571428572,
        "city_score": 0.9,
        "city_size": 0.8,
        "description": [
            null
        ],
        "_size": 0.8
    },
    {
        "city": "Fraccionamiento Residencial Villaflores",
        "lat": 32.37725,
        "lng": -116.69665,
        "city_score": 0.3,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Zona industrial Ciudad Industrial",
        "lat": 32.5254,
        "lng": -116.9178,
        "city_score": 0.7,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Cortez",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.9,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Fraccionamiento Cañadas del Florido 2a. Sección",
        "lat": 32.05833333333333,
        "lng": -116.678175,
        "city_score": 0.3,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Colonia El Prado Este",
        "lat": 32.483293333333336,
        "lng": -116.81761333333334,
        "city_score": 0.1,
        "city_size": 0.15,
        "description": [
            null
        ],
        "_size": 0.15
    },
    {
        "city": "Fraccionamiento Vista Lago",
        "lat": 32.468,
        "lng": -116.8041,
        "city_score": 0.9,
        "city_size": 0.9,
        "description": [
            null
        ],
        "_size": 0.9
    },
    {
        "city": "Colonia El Prado",
        "lat": 32.483293333333336,
        "lng": -116.81761333333334,
        "city_score": 0.5,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia Xicotencatl Leyva",
        "lat": 32.4523,
        "lng": -116.9682,
        "city_score": 0.8,
        "city_size": 0.8,
        "description": [
            null
        ],
        "_size": 0.8
    },
    {
        "city": "Colonia Murua Poniente",
        "lat": 32.506625,
        "lng": -116.690575,
        "city_score": 0.3,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Zona industrial Nordika",
        "lat": 32.43449999999999,
        "lng": -116.9582888888889,
        "city_score": 0.6,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Anexa Porvenir",
        "lat": 32.405,
        "lng": -116.79970000000002,
        "city_score": 0.4,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia Planicie",
        "lat": 32.329181818181816,
        "lng": -116.68644545454544,
        "city_score": 0.8,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Colonia San Angel",
        "lat": 32.4225,
        "lng": -117.0431,
        "city_score": 0.3,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Colonia Anexa Ruiz Cortines",
        "lat": 32.5167,
        "lng": -116.9833,
        "city_score": 0,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia El Mirador",
        "lat": 32.329181818181816,
        "lng": -116.68644545454544,
        "city_score": 0.4,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia Independencia",
        "lat": 32.450525,
        "lng": -116.721025,
        "city_score": 0.4,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Fraccionamiento Cumbres del Sol",
        "lat": 32.371833333333335,
        "lng": -116.81466666666668,
        "city_score": 0.9,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Orizaba",
        "lat": 32.431014285714284,
        "lng": -116.90294285714286,
        "city_score": 0,
        "city_size": 0.1,
        "description": [
            null
        ],
        "_size": 0.1
    },
    {
        "city": "Colonia Viñedos Casa Blanca",
        "lat": 32.4875,
        "lng": -116.8267,
        "city_score": 0.3,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Colonia Mariano Matamoros (Norte)",
        "lat": 32.47053636363636,
        "lng": -116.8684,
        "city_score": 0.5,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Jardines de las Cruces",
        "lat": 32.350744444444445,
        "lng": -116.8455,
        "city_score": 0.2,
        "city_size": 0.15,
        "description": [
            null
        ],
        "_size": 0.15
    },
    {
        "city": "Colonia Anexa Miramar",
        "lat": 32.5187,
        "lng": -117.0874,
        "city_score": 0.2,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Fraccionamiento Jardines de La Mesa",
        "lat": 32.431574999999995,
        "lng": -116.904675,
        "city_score": 0.3,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Fraccionamiento Alcatraces",
        "lat": 32.4252,
        "lng": -116.9955,
        "city_score": 1,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Fraccionamiento Villa del Sol III",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.2,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia Nido de las Águilas",
        "lat": 32.5482,
        "lng": -116.7397,
        "city_score": 0.6,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Las Colonias",
        "lat": 32.05833333333333,
        "lng": -116.678175,
        "city_score": 0.4,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Zona industrial Los Olivos",
        "lat": 32.44844615384615,
        "lng": -116.87156923076924,
        "city_score": 0.3,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Fraccionamiento Siena Residencial",
        "lat": 32.4391,
        "lng": -116.99188333333336,
        "city_score": 0.6,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Colonia La Joya Este",
        "lat": 32.44844615384615,
        "lng": -116.87156923076924,
        "city_score": 0.3,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia Riberas del Alamar",
        "lat": 32.4667,
        "lng": -116.7769,
        "city_score": 0.7,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Zona industrial Valle del Sur 2",
        "lat": 32.3557,
        "lng": -116.8121,
        "city_score": 0.7,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Fraccionamiento Villa del Prado Segunda Sección",
        "lat": 32.433260000000004,
        "lng": -116.87776999999998,
        "city_score": 0.2,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Fraccionamiento Residencial Los Leones",
        "lat": 32.4462,
        "lng": -117.001,
        "city_score": 0.6,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia Las Misiones",
        "lat": 32.419415384615384,
        "lng": -117.02846153846154,
        "city_score": 0.4,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Nueva Esperanza (La Cuesta)",
        "lat": 32.48574166666666,
        "lng": -116.88399166666666,
        "city_score": 0.5,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Fraccionamiento Verona Residencial",
        "lat": 32.4391,
        "lng": -116.99188333333336,
        "city_score": 0.1,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Vista del Valle",
        "lat": 32.5075,
        "lng": -116.79189999999998,
        "city_score": 0.4,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia Chapultepec California",
        "lat": 32.505406666666666,
        "lng": -116.76182,
        "city_score": 0.6,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Fraccionamiento Bonaterra",
        "lat": 32.466,
        "lng": -116.6881,
        "city_score": 0.3,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Zona industrial Industrial Pacífico III",
        "lat": 32.46521,
        "lng": -116.87767,
        "city_score": 0.5,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia Anexa Pro Hogar",
        "lat": 32.3557,
        "lng": -116.8121,
        "city_score": 0.3,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia Linda Vista",
        "lat": 32.4041,
        "lng": -116.8198,
        "city_score": 0.4,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Fraccionamiento Jardines de La Misión",
        "lat": 32.466,
        "lng": -116.6881,
        "city_score": 0.1,
        "city_size": 0.15,
        "description": [
            null
        ],
        "_size": 0.15
    },
    {
        "city": "Fraccionamiento Jardines del Lago",
        "lat": 32.4222,
        "lng": -117.0664,
        "city_score": 0.4,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Unidad habitacional FOVISSSTE II",
        "lat": 32.46782,
        "lng": -116.79802,
        "city_score": 0.8,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia López Leyva",
        "lat": 32.5333,
        "lng": -116.7333,
        "city_score": 0.1,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Colonia Ejido Francisco Villa 2a Sección",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0,
        "city_size": 0.1,
        "description": [
            null
        ],
        "_size": 0.1
    },
    {
        "city": "Colonia Alemán",
        "lat": 32.466,
        "lng": -116.6881,
        "city_score": 0.4,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Contreras Oeste",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.8,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Fraccionamiento Playa Blanca",
        "lat": 32.425200000000004,
        "lng": -117.094875,
        "city_score": 0.3,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia Soler",
        "lat": 32.4538,
        "lng": -116.9963,
        "city_score": 0.4,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Los Lobos",
        "lat": 32.3617,
        "lng": -116.7366,
        "city_score": 0.4,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia El Pedregal",
        "lat": 32.490966666666665,
        "lng": -116.6942,
        "city_score": 0.7,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Colonia Lomas del Pacifico",
        "lat": 32.4345,
        "lng": -116.9469,
        "city_score": 0.8,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Lomas del Río",
        "lat": 32.40490714285714,
        "lng": -116.79287857142856,
        "city_score": 0.4,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Unidad habitacional INFONAVIT Latinos",
        "lat": 32.406580000000005,
        "lng": -116.74652,
        "city_score": 0.6,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia Jardines de San Carlos",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.2,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Colonia Ejido Chilpancingo",
        "lat": 32.5254,
        "lng": -116.9178,
        "city_score": 0.4,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia Llamas Amaya",
        "lat": 32.350744444444445,
        "lng": -116.8455,
        "city_score": 0.8,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Colonia Vista Alamar",
        "lat": 32.46782,
        "lng": -116.79802,
        "city_score": 0.4,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Zona industrial Tomas Alva Edison",
        "lat": 32.3915,
        "lng": -116.9576,
        "city_score": 0.1,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia Sanchez Taboada II",
        "lat": 32.43768333333333,
        "lng": -116.82155,
        "city_score": 0.9,
        "city_size": 0.8,
        "description": [
            null
        ],
        "_size": 0.8
    },
    {
        "city": "Fraccionamiento Guadalajara (La Mesa)",
        "lat": 32.44844615384615,
        "lng": -116.87156923076924,
        "city_score": 0.5,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Los Santos",
        "lat": 32.490966666666665,
        "lng": -116.6942,
        "city_score": 0.8,
        "city_size": 0.85,
        "description": [
            null
        ],
        "_size": 0.85
    },
    {
        "city": "Fraccionamiento Insurgentes",
        "lat": 32.40483636363637,
        "lng": -116.80335454545455,
        "city_score": 0.1,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Colonia Loma Bonita (NA)",
        "lat": 32.4252,
        "lng": -117.0099,
        "city_score": 0.3,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia Albatros",
        "lat": 32.4585,
        "lng": -117.0176,
        "city_score": 0.1,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Lomas Virreyes",
        "lat": 32.2572,
        "lng": -116.746,
        "city_score": 0.1,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Fraccionamiento Paraíso del Río",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.3,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia La Ilusión",
        "lat": 32.3915,
        "lng": -116.9576,
        "city_score": 0.2,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Villa Urrutia",
        "lat": 32.431574999999995,
        "lng": -116.904675,
        "city_score": 0.4,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Zona industrial Los Pinos (Limón)",
        "lat": 32.42765,
        "lng": -116.89255,
        "city_score": 0.1,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia Roberto de La Madrid",
        "lat": 32.468,
        "lng": -116.8041,
        "city_score": 0.6,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Fraccionamiento Condominios Villas California",
        "lat": 32.4462,
        "lng": -117.001,
        "city_score": 0.8,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia Manuel Rivera Anaya",
        "lat": 32.46782,
        "lng": -116.79802,
        "city_score": 0.4,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia Emiliano Zapata",
        "lat": 32.433260000000004,
        "lng": -116.87776999999998,
        "city_score": 0.5,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Alfonso Corona del Rosal",
        "lat": 32.490966666666665,
        "lng": -116.6942,
        "city_score": 0.8,
        "city_size": 0.9,
        "description": [
            null
        ],
        "_size": 0.9
    },
    {
        "city": "Fraccionamiento Lomas de San Martín",
        "lat": 32.46521,
        "lng": -116.87767,
        "city_score": 0.2,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Fraccionamiento Valparaíso Residencial",
        "lat": 32.43455,
        "lng": -116.9743,
        "city_score": 0.6,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia Otay Jardín II",
        "lat": 32.22461428571428,
        "lng": -116.53342857142856,
        "city_score": 0.9,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Fraccionamiento Villa Fontana III",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.8,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Colonia La Campiña",
        "lat": 32.405,
        "lng": -116.79970000000002,
        "city_score": 0.3,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia La Ciénega",
        "lat": 32.42765,
        "lng": -116.89255,
        "city_score": 0,
        "city_size": 0.05,
        "description": [
            null
        ],
        "_size": 0.05
    },
    {
        "city": "Fraccionamiento San Mateo",
        "lat": 32.3,
        "lng": -116.91670000000002,
        "city_score": 0.9,
        "city_size": 0.8,
        "description": [
            null
        ],
        "_size": 0.8
    },
    {
        "city": "Fraccionamiento Playas de Tijuana Sección Monumental",
        "lat": 32.44551666666667,
        "lng": -116.96688333333334,
        "city_score": 0.5,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia José López Portillo",
        "lat": 32.40472307692308,
        "lng": -116.8058846153846,
        "city_score": 0.1,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Colonia Francisco Zarco",
        "lat": 32.4647,
        "lng": -117.0425,
        "city_score": 1,
        "city_size": 0.8,
        "description": [
            null
        ],
        "_size": 0.8
    },
    {
        "city": "Fraccionamiento Cumbres del Pacífico (Terrazas del Pacífico)",
        "lat": 32.43449999999999,
        "lng": -116.9582888888889,
        "city_score": 0.9,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Fraccionamiento Michoacán",
        "lat": 32.4225,
        "lng": -117.0431,
        "city_score": 0.3,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Fraccionamiento Bellas Artes",
        "lat": 32.468,
        "lng": -116.8041,
        "city_score": 0,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia Lomas del Mirador",
        "lat": 32.4742,
        "lng": -116.8065142857143,
        "city_score": 0.6,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia Chamizal",
        "lat": 32.49023333333333,
        "lng": -116.76213333333334,
        "city_score": 0.5,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Fraccionamiento Villa del Real IV",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.2,
        "city_size": 0.15,
        "description": [
            null
        ],
        "_size": 0.15
    },
    {
        "city": "Colonia Loma Dorada Campos",
        "lat": 32.431014285714284,
        "lng": -116.90294285714286,
        "city_score": 0.2,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Fraccionamiento Isla Mujeres",
        "lat": 32.4718,
        "lng": -116.86178571428572,
        "city_score": 0.3,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Antorcha II",
        "lat": 32.4589,
        "lng": -117.10765,
        "city_score": 0.7,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Zona industrial Industrial Pacífico I",
        "lat": 32.46521,
        "lng": -116.87767,
        "city_score": 0.5,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Fraccionamiento Urbi Quinta del Cedro Segunda Sección",
        "lat": 32.4536,
        "lng": -117.065,
        "city_score": 0.7,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Ecologista",
        "lat": 32.4724,
        "lng": -116.93590000000002,
        "city_score": 1,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Colonia Pegaso II",
        "lat": 32.5482,
        "lng": -116.7397,
        "city_score": 0.3,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Unidad habitacional Alba Roja",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.1,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Ampliación Tejamen",
        "lat": 32.40490714285714,
        "lng": -116.79287857142856,
        "city_score": 0.3,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Cañón Centenario",
        "lat": 32.43768333333333,
        "lng": -116.82155,
        "city_score": 0,
        "city_size": 0.15,
        "description": [
            null
        ],
        "_size": 0.15
    },
    {
        "city": "Colonia Laderas de Monterrey",
        "lat": 32.47284285714286,
        "lng": -117.00107142857144,
        "city_score": 0.9,
        "city_size": 0.95,
        "description": [
            null
        ],
        "_size": 0.95
    },
    {
        "city": "Colonia Chapultepec",
        "lat": 32.50418888888888,
        "lng": -116.99482222222224,
        "city_score": 0.8,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia El Florido 1a. Sección",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.3,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia Leonardo Rodriguez Alcaine",
        "lat": 32.4306,
        "lng": -117.025,
        "city_score": 1,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Lomas de Tlatelolco",
        "lat": 32.49058888888889,
        "lng": -116.78061111111111,
        "city_score": 0.6,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Fraccionamiento Industrial Morelos",
        "lat": 32.466,
        "lng": -116.6881,
        "city_score": 0.9,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Fraccionamiento Real de Loma Bonita",
        "lat": 32.48544285714286,
        "lng": -117.03485714285716,
        "city_score": 0.7,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Colina del Mediterráneo",
        "lat": 32.4538,
        "lng": -116.9963,
        "city_score": 0.5,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Luis Echeverría",
        "lat": 32.48574166666666,
        "lng": -116.88399166666666,
        "city_score": 0.5,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Ciudad Jardín",
        "lat": 32.4345,
        "lng": -116.9469,
        "city_score": 0.6,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Lomas Hipódromo",
        "lat": 32.421842857142856,
        "lng": -116.88708571428572,
        "city_score": 0,
        "city_size": 0.1,
        "description": [
            null
        ],
        "_size": 0.1
    },
    {
        "city": "Colonia Roberto Yahuaca",
        "lat": 32.4041,
        "lng": -116.8198,
        "city_score": 0.5,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia San Antonio del Mar",
        "lat": 32.425200000000004,
        "lng": -117.094875,
        "city_score": 0.4,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Fraccionamiento Valle Imperial",
        "lat": 32.329181818181816,
        "lng": -116.68644545454544,
        "city_score": 0.8,
        "city_size": 0.8,
        "description": [
            null
        ],
        "_size": 0.8
    },
    {
        "city": "Fraccionamiento Hacienda Casa Grande",
        "lat": 32.2572,
        "lng": -116.746,
        "city_score": 0.2,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Colonia Hipódromo Dos",
        "lat": 32.40154444444445,
        "lng": -116.83006666666668,
        "city_score": 0.8,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Unidad habitacional Electricistas",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.2,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Anexa Loma Dorada",
        "lat": 32.431014285714284,
        "lng": -116.90294285714286,
        "city_score": 0.6,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Hidalgo",
        "lat": 32.44583333333333,
        "lng": -116.7912,
        "city_score": 0.6,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia Mesa de Otay",
        "lat": 32.468,
        "lng": -116.8041,
        "city_score": 0,
        "city_size": 0.1,
        "description": [
            null
        ],
        "_size": 0.1
    },
    {
        "city": "Colonia Ex Ejido Tampico",
        "lat": 32.35883333333333,
        "lng": -116.7714,
        "city_score": 0.4,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Villa Fontana XVI",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.3,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Aeropuerto Tijuana (Gral. Abelardo L. Rodríguez)",
        "lat": 32.468,
        "lng": -116.8041,
        "city_score": 0,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Colonia Niño Artillero",
        "lat": 32.40616666666667,
        "lng": -116.75873333333334,
        "city_score": 0.5,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia Río Vista",
        "lat": 32.46782,
        "lng": -116.79802,
        "city_score": 0.1,
        "city_size": 0.05,
        "description": [
            null
        ],
        "_size": 0.05
    },
    {
        "city": "Colonia El Pedregal Oeste",
        "lat": 32.490966666666665,
        "lng": -116.6942,
        "city_score": 0.7,
        "city_size": 0.85,
        "description": [
            null
        ],
        "_size": 0.85
    },
    {
        "city": "Colonia Los Altos (Ruíz Valencia)",
        "lat": 32.4538,
        "lng": -116.9963,
        "city_score": 0.5,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia Generación 2000",
        "lat": 32.3915,
        "lng": -116.9576,
        "city_score": 0.1,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia Quinta Alta",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.7,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Tejamen",
        "lat": 32.40490714285714,
        "lng": -116.79287857142856,
        "city_score": 1,
        "city_size": 0.85,
        "description": [
            null
        ],
        "_size": 0.85
    },
    {
        "city": "Colonia Tecnológico",
        "lat": 32.4749,
        "lng": -116.7956,
        "city_score": 0.5,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Zona Norte",
        "lat": 32.4179,
        "lng": -116.87213333333334,
        "city_score": 0.6,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Delicias",
        "lat": 32.4089,
        "lng": -116.9436,
        "city_score": 0.7,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia Las Torres de Matamoros",
        "lat": 32.47053636363636,
        "lng": -116.8684,
        "city_score": 0.9,
        "city_size": 0.85,
        "description": [
            null
        ],
        "_size": 0.85
    },
    {
        "city": "Colonia Neidhart",
        "lat": 32.50418888888888,
        "lng": -116.99482222222224,
        "city_score": 0.7,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Fraccionamiento Praderas de la Gloria",
        "lat": 32.4391,
        "lng": -116.99188333333336,
        "city_score": 0.5,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia El Roble Tres R",
        "lat": 32.4732,
        "lng": -116.8046,
        "city_score": 0.9,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Colonia Mariano Matamoros (Centro)",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.9,
        "city_size": 0.9,
        "description": [
            null
        ],
        "_size": 0.9
    },
    {
        "city": "Colonia Durán",
        "lat": 32.40616666666667,
        "lng": -116.75873333333334,
        "city_score": 0.5,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Niños Héroes (La Mesa)",
        "lat": 32.42765,
        "lng": -116.89255,
        "city_score": 0.1,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Colonia El Cortez",
        "lat": 32.42098,
        "lng": -116.97188,
        "city_score": 0.1,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia Plazas",
        "lat": 32.4089,
        "lng": -116.9436,
        "city_score": 0.9,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Colinas del Alamar (Torres del Lago)",
        "lat": 32.4222,
        "lng": -117.0664,
        "city_score": 0.6,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Fraccionamiento Baja Malibú (Sección Playas)",
        "lat": 32.425200000000004,
        "lng": -117.094875,
        "city_score": 0.6,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia Santa Rosa (Ciudad)",
        "lat": 32.43723333333333,
        "lng": -116.93746666666668,
        "city_score": 0,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia El Peñón",
        "lat": 32.329181818181816,
        "lng": -116.68644545454544,
        "city_score": 0.5,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Unidad habitacional Plaza España",
        "lat": 32.419415384615384,
        "lng": -117.02846153846154,
        "city_score": 0.8,
        "city_size": 0.85,
        "description": [
            null
        ],
        "_size": 0.85
    },
    {
        "city": "Colonia Moreno 2da. Sección",
        "lat": 32.44844615384615,
        "lng": -116.87156923076924,
        "city_score": 0.1,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Colonia Altamira Sur",
        "lat": 32.450525,
        "lng": -116.721025,
        "city_score": 0.3,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia Alfa Panamericano",
        "lat": 32.466,
        "lng": -116.6881,
        "city_score": 0.4,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia Playas de Tijuana Sección Playas Coronado",
        "lat": 32.44551666666667,
        "lng": -116.96688333333334,
        "city_score": 0.3,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia Fortín de las Flores",
        "lat": 32.32389090909091,
        "lng": -116.8769,
        "city_score": 0.3,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Mirador Capistrano",
        "lat": 32.40472307692308,
        "lng": -116.8058846153846,
        "city_score": 0.1,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Oaxaca (Ángel Fernández)",
        "lat": 32.4193,
        "lng": -116.88335,
        "city_score": 0.2,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Equipamiento Colegio Ibero Tijuana",
        "lat": 32.4386,
        "lng": -116.9661,
        "city_score": 0.1,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Privada Catalana",
        "lat": 32.48452857142858,
        "lng": -116.96044285714288,
        "city_score": 0.7,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Fraccionamiento Natura Sección Amanecer",
        "lat": 32.3915,
        "lng": -116.9576,
        "city_score": 0.8,
        "city_size": 0.8,
        "description": [
            null
        ],
        "_size": 0.8
    },
    {
        "city": "Colonia Cubillas Sur",
        "lat": 32.333975,
        "lng": -116.8985,
        "city_score": 0.2,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia Roberto Curiel",
        "lat": 32.36538,
        "lng": -116.81364,
        "city_score": 0.7,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Bosque de las Araucarias",
        "lat": 32.3362,
        "lng": -116.7472,
        "city_score": 0.3,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Fraccionamiento Lomas del Refugio",
        "lat": 32.49058888888889,
        "lng": -116.78061111111111,
        "city_score": 0.3,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia Las Brisas Norte",
        "lat": 32.44844615384615,
        "lng": -116.87156923076924,
        "city_score": 0.2,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia Ejido Chilpancingo",
        "lat": 32.5254,
        "lng": -116.9178,
        "city_score": 0.5,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Santa Mónica",
        "lat": 32.4193,
        "lng": -116.99101428571429,
        "city_score": 0.4,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Fraccionamiento Los Delfines",
        "lat": 32.4193,
        "lng": -116.99101428571429,
        "city_score": 0.5,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia Artesanal",
        "lat": 32.42098,
        "lng": -116.97188,
        "city_score": 0.8,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Colonia Luna Park",
        "lat": 32.431014285714284,
        "lng": -116.90294285714286,
        "city_score": 0.1,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia Montes Olímpicos",
        "lat": 32.42098,
        "lng": -116.97188,
        "city_score": 0.4,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia Francisco Villa",
        "lat": 32.4193,
        "lng": -116.88335,
        "city_score": 0.6,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Fraccionamiento El Jibarito",
        "lat": 32.4523,
        "lng": -116.9682,
        "city_score": 0.3,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Ampliación Gabriel Rodriguez",
        "lat": 32.3617,
        "lng": -116.7366,
        "city_score": 0.5,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Unidad habitacional Estadio Potros",
        "lat": 32.40472307692308,
        "lng": -116.8058846153846,
        "city_score": 0.6,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Colonia Los Reyes",
        "lat": 32.43026666666666,
        "lng": -116.90063333333332,
        "city_score": 0.1,
        "city_size": 0.15,
        "description": [
            null
        ],
        "_size": 0.15
    },
    {
        "city": "Colonia México",
        "lat": 32.445366666666665,
        "lng": -116.732,
        "city_score": 0.2,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Granjas División del Norte",
        "lat": 32.5482,
        "lng": -116.7397,
        "city_score": 0.4,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia Cañón Rosales",
        "lat": 32.5187,
        "lng": -117.0874,
        "city_score": 0.3,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Rancho Escondido",
        "lat": 32.5482,
        "lng": -116.7397,
        "city_score": 0.5,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia Maurilio Magallón",
        "lat": 32.513459999999995,
        "lng": -116.7722,
        "city_score": 0.3,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia Cañón de las Carretas",
        "lat": 32.4252,
        "lng": -117.0099,
        "city_score": 0.4,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Milenio 2000",
        "lat": 32.4585,
        "lng": -117.0176,
        "city_score": 0,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia SEPANAL",
        "lat": 32.49023333333333,
        "lng": -116.76213333333334,
        "city_score": 0.5,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Fraccionamiento Lomas Terrabella",
        "lat": 32.3617,
        "lng": -116.7366,
        "city_score": 0.1,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Fraccionamiento Valle del Alamar II",
        "lat": 32.5482,
        "lng": -116.7397,
        "city_score": 0.8,
        "city_size": 0.8,
        "description": [
            null
        ],
        "_size": 0.8
    },
    {
        "city": "Colonia Ampliación Lomas Taurinas",
        "lat": 32.3362,
        "lng": -116.7472,
        "city_score": 1,
        "city_size": 0.9,
        "description": [
            null
        ],
        "_size": 0.9
    },
    {
        "city": "Colonia El Valle",
        "lat": 32.513459999999995,
        "lng": -116.7722,
        "city_score": 0.3,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia Lomas de Agua Caliente 5a Sección",
        "lat": 32.4248,
        "lng": -116.89830000000002,
        "city_score": 0.4,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Fraccionamiento Viñas del Mar II",
        "lat": 32.4536,
        "lng": -117.065,
        "city_score": 1,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Alamar",
        "lat": 32.44583333333333,
        "lng": -116.7912,
        "city_score": 0.4,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia La Pechuga",
        "lat": 32.3362,
        "lng": -116.7472,
        "city_score": 0.9,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Colonia Laderas de Otay",
        "lat": 32.22461428571428,
        "lng": -116.53342857142856,
        "city_score": 0.9,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia Brisas del Mar",
        "lat": 32.4193,
        "lng": -116.99101428571429,
        "city_score": 0.2,
        "city_size": 0.1,
        "description": [
            null
        ],
        "_size": 0.1
    },
    {
        "city": "Colonia Monarca",
        "lat": 32.4462,
        "lng": -117.001,
        "city_score": 0.5,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia San José del Alto",
        "lat": 32.490966666666665,
        "lng": -116.6942,
        "city_score": 0.1,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia La Mesa Sur",
        "lat": 32.483293333333336,
        "lng": -116.81761333333334,
        "city_score": 0.1,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Fraccionamiento Vista Mar Residencial",
        "lat": 32.4983,
        "lng": -117.1207,
        "city_score": 0.1,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Fraccionamiento El Laurel II",
        "lat": 32.44438571428571,
        "lng": -116.82194285714286,
        "city_score": 0.2,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Real de San Antonio",
        "lat": 32.4718,
        "lng": -116.86178571428572,
        "city_score": 0.8,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Otay Diamantes",
        "lat": 32.468,
        "lng": -116.8041,
        "city_score": 0.1,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Los Árboles",
        "lat": 32.505406666666666,
        "lng": -116.76182,
        "city_score": 0.9,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Perimetral Norte",
        "lat": 32.468,
        "lng": -116.8041,
        "city_score": 0.6,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Horóscopo",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.9,
        "city_size": 0.9,
        "description": [
            null
        ],
        "_size": 0.9
    },
    {
        "city": "Fraccionamiento Pórticos de Tijuana",
        "lat": 32.419415384615384,
        "lng": -117.02846153846154,
        "city_score": 0.1,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Fraccionamiento Colinas de San Ángel",
        "lat": 32.40154444444445,
        "lng": -116.83006666666668,
        "city_score": 0.9,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Fraccionamiento Praderas de La Mesa Sección Valle de las Flores",
        "lat": 32.405,
        "lng": -116.79970000000002,
        "city_score": 0.9,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Fraccionamiento Lomas Las Huertas",
        "lat": 32.505406666666666,
        "lng": -116.76182,
        "city_score": 0.5,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Colonia La Cuestecita",
        "lat": 32.4306,
        "lng": -117.025,
        "city_score": 0.2,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia Lomas de Matamoros",
        "lat": 32.47053636363636,
        "lng": -116.8684,
        "city_score": 0,
        "city_size": 0.15,
        "description": [
            null
        ],
        "_size": 0.15
    },
    {
        "city": "Fraccionamiento Los Valles",
        "lat": 32.391549999999995,
        "lng": -116.95765,
        "city_score": 0.8,
        "city_size": 0.85,
        "description": [
            null
        ],
        "_size": 0.85
    },
    {
        "city": "Zona industrial Valle del Sur 1",
        "lat": 32.3557,
        "lng": -116.8121,
        "city_score": 0.2,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Fausto González",
        "lat": 32.4252,
        "lng": -117.0099,
        "city_score": 0.7,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Santa Fe",
        "lat": 32.49058888888889,
        "lng": -116.78061111111111,
        "city_score": 0.7,
        "city_size": 0.8,
        "description": [
            null
        ],
        "_size": 0.8
    },
    {
        "city": "Colonia San Carlos",
        "lat": 32.40472307692308,
        "lng": -116.8058846153846,
        "city_score": 0,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia Las Vegas",
        "lat": 32.44844615384615,
        "lng": -116.87156923076924,
        "city_score": 0.5,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Chihuahua La Mesa",
        "lat": 32.32389090909091,
        "lng": -116.8769,
        "city_score": 0.7,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Benton",
        "lat": 32.44844615384615,
        "lng": -116.87156923076924,
        "city_score": 0.6,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia López Mateos",
        "lat": 32.421842857142856,
        "lng": -116.88708571428572,
        "city_score": 0.6,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Fraccionamiento Baja Malibú (Sección Lomas)",
        "lat": 32.4193,
        "lng": -116.99101428571429,
        "city_score": 0.6,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia El Refugio",
        "lat": 32.44438571428571,
        "lng": -116.82194285714286,
        "city_score": 0.2,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Angélica",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 1,
        "city_size": 0.85,
        "description": [
            null
        ],
        "_size": 0.85
    },
    {
        "city": "Colonia Hacienda San Martín",
        "lat": 32.4252,
        "lng": -116.9955,
        "city_score": 0.5,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Fraccionamiento Puesta del Sol",
        "lat": 32.44551666666667,
        "lng": -116.96688333333334,
        "city_score": 0.1,
        "city_size": 0.1,
        "description": [
            null
        ],
        "_size": 0.1
    },
    {
        "city": "Colonia Veracruz",
        "lat": 32.505406666666666,
        "lng": -116.76182,
        "city_score": 0.4,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Jardín Dorado",
        "lat": 32.3617,
        "lng": -116.7366,
        "city_score": 0.6,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Fraccionamiento Hacienda los Venados",
        "lat": 32.3915,
        "lng": -116.9576,
        "city_score": 0.7,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia El Porvenir",
        "lat": 32.40483636363637,
        "lng": -116.80335454545455,
        "city_score": 1,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia El Bosque",
        "lat": 32.4248,
        "lng": -116.89830000000002,
        "city_score": 0.4,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Fraccionamiento Puerta Plata",
        "lat": 32.3915,
        "lng": -116.9576,
        "city_score": 0.7,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Fraccionamiento Villa del Álamo",
        "lat": 32.433260000000004,
        "lng": -116.87776999999998,
        "city_score": 0.7,
        "city_size": 0.8,
        "description": [
            null
        ],
        "_size": 0.8
    },
    {
        "city": "Colonia Cubillas",
        "lat": 32.333975,
        "lng": -116.8985,
        "city_score": 0.5,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Fraccionamiento Villa Fontana XII",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.8,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia Sirak M Baloyan",
        "lat": 32.4134,
        "lng": -116.8441,
        "city_score": 0.8,
        "city_size": 0.85,
        "description": [
            null
        ],
        "_size": 0.85
    },
    {
        "city": "Colonia Las Cumbres",
        "lat": 32.4041,
        "lng": -116.8198,
        "city_score": 1,
        "city_size": 0.85,
        "description": [
            null
        ],
        "_size": 0.85
    },
    {
        "city": "Colonia Granjas el Tecolote",
        "lat": 32.43449999999999,
        "lng": -116.9582888888889,
        "city_score": 0.4,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia Mariano Matamoros (Sur)",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.4,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Nueva Aurora Sur",
        "lat": 32.48544285714286,
        "lng": -117.03485714285716,
        "city_score": 0.1,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Colonia Luz Juárez",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 1,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Colonia Libramiento (Zona AO)",
        "lat": 32.405,
        "lng": -116.79970000000002,
        "city_score": 0.2,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Fraccionamiento Villas de Baja California",
        "lat": 32.43026666666666,
        "lng": -116.90063333333332,
        "city_score": 0.9,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Zermeño (Mérida)",
        "lat": 32.42765,
        "lng": -116.89255,
        "city_score": 0.6,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia Alicia Carrillo",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.8,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Fraccionamiento Vista Dorada",
        "lat": 32.4248,
        "lng": -116.89830000000002,
        "city_score": 0.1,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Fraccionamiento Fuentes del Sol",
        "lat": 32.42258,
        "lng": -117.09744,
        "city_score": 0.9,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Colonia Cumbres del Sol",
        "lat": 32.42258,
        "lng": -117.09744,
        "city_score": 1,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Colonia Manuel Paredes I",
        "lat": 32.4193,
        "lng": -116.88335,
        "city_score": 0.2,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia San Luis",
        "lat": 32.433260000000004,
        "lng": -116.87776999999998,
        "city_score": 0.5,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Fraccionamiento Loma Blanca",
        "lat": 32.4273,
        "lng": -117.0268,
        "city_score": 0.7,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Niños Héroes Este",
        "lat": 32.42765,
        "lng": -116.89255,
        "city_score": 0.5,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia La Perla Residencial",
        "lat": 32.4475875,
        "lng": -116.9742375,
        "city_score": 0.7,
        "city_size": 0.8,
        "description": [
            null
        ],
        "_size": 0.8
    },
    {
        "city": "Colonia Cuauhtémoc",
        "lat": 32.4103,
        "lng": -116.836,
        "city_score": 0.5,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Hipódromo Agua Caliente",
        "lat": 32.5167,
        "lng": -117.0167,
        "city_score": 0.9,
        "city_size": 0.8,
        "description": [
            null
        ],
        "_size": 0.8
    },
    {
        "city": "Colonia Real de La Gloria",
        "lat": 32.4462,
        "lng": -117.001,
        "city_score": 0.9,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Colonia Anexa Veracruz",
        "lat": 32.505406666666666,
        "lng": -116.76182,
        "city_score": 0.3,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia El Seminario",
        "lat": 32.405,
        "lng": -116.79970000000002,
        "city_score": 0.7,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Nueva Era",
        "lat": 32.350744444444445,
        "lng": -116.8455,
        "city_score": 0.4,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia Colinas de La Cruz",
        "lat": 32.431014285714284,
        "lng": -116.90294285714286,
        "city_score": 0.5,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Fraccionamiento Viñas del Mar",
        "lat": 32.4536,
        "lng": -117.065,
        "city_score": 0.8,
        "city_size": 0.85,
        "description": [
            null
        ],
        "_size": 0.85
    },
    {
        "city": "Colonia Kino",
        "lat": 32.40472307692308,
        "lng": -116.8058846153846,
        "city_score": 0.5,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Zona industrial El Florido II",
        "lat": 32.2572,
        "lng": -116.746,
        "city_score": 0.9,
        "city_size": 0.95,
        "description": [
            null
        ],
        "_size": 0.95
    },
    {
        "city": "Colonia División los Altos",
        "lat": 32.4538,
        "lng": -116.9963,
        "city_score": 0.6,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Colonia Corona Encantada",
        "lat": 32.4724,
        "lng": -116.93590000000002,
        "city_score": 0.2,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia Camichin",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 1,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Fraccionamiento INFONAVIT Lomas del Porvenir",
        "lat": 32.441375,
        "lng": -116.952175,
        "city_score": 0.2,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia Huertas 2a. Sección",
        "lat": 32.513459999999995,
        "lng": -116.7722,
        "city_score": 0.9,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Playas de Tijuana Sección Terrazas",
        "lat": 32.44551666666667,
        "lng": -116.96688333333334,
        "city_score": 0.4,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Pinos de Narez",
        "lat": 32.431014285714284,
        "lng": -116.90294285714286,
        "city_score": 0.2,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Los Pirules",
        "lat": 32.37725,
        "lng": -116.69665,
        "city_score": 0.3,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Cañón del Matadero",
        "lat": 32.4724,
        "lng": -116.9359,
        "city_score": 0.2,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Leandro Valle",
        "lat": 32.46521,
        "lng": -116.87767,
        "city_score": 0.8,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Fraccionamiento Lomas Santa Fe",
        "lat": 32.4536,
        "lng": -117.065,
        "city_score": 0.4,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Condominio Residencial Frontera",
        "lat": 32.468,
        "lng": -116.8041,
        "city_score": 0.9,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Valle Verde",
        "lat": 32.329181818181816,
        "lng": -116.68644545454544,
        "city_score": 0.8,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Colonia Empleados Federales",
        "lat": 32.496766666666666,
        "lng": -116.79406666666668,
        "city_score": 0.6,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Bonilla",
        "lat": 32.4252,
        "lng": -116.9955,
        "city_score": 0.7,
        "city_size": 0.85,
        "description": [
            null
        ],
        "_size": 0.85
    },
    {
        "city": "Colonia Las Huertas 3a Sección",
        "lat": 32.44844615384615,
        "lng": -116.87156923076924,
        "city_score": 0.6,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Miramar",
        "lat": 32.5187,
        "lng": -117.0874,
        "city_score": 0.6,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia 5 y 8 Hectáreas",
        "lat": 32.4345,
        "lng": -116.9469,
        "city_score": 0.5,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Zona industrial La Jolla",
        "lat": 32.4724,
        "lng": -116.93590000000002,
        "city_score": 0.8,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Colonia Praderas del Sol",
        "lat": 32.419415384615384,
        "lng": -117.02846153846154,
        "city_score": 0.9,
        "city_size": 0.9,
        "description": [
            null
        ],
        "_size": 0.9
    },
    {
        "city": "Colonia Campo Koa",
        "lat": 32.4193,
        "lng": -116.99101428571429,
        "city_score": 0.6,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Durango",
        "lat": 32.505406666666666,
        "lng": -116.76182,
        "city_score": 0.3,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia Cañón Oasis",
        "lat": 32.4248,
        "lng": -116.89830000000002,
        "city_score": 0.9,
        "city_size": 0.95,
        "description": [
            null
        ],
        "_size": 0.95
    },
    {
        "city": "Colonia División del Norte",
        "lat": 32.42765,
        "lng": -116.89255,
        "city_score": 0.6,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Zona industrial Parque Industrial Pacífico IV",
        "lat": 32.43449999999999,
        "lng": -116.9582888888889,
        "city_score": 0.9,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Gutiérrez Ovalle",
        "lat": 32.350744444444445,
        "lng": -116.8455,
        "city_score": 0.4,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia López Oeste",
        "lat": 32.483293333333336,
        "lng": -116.81761333333334,
        "city_score": 0.3,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Guanajuato",
        "lat": 32.505406666666666,
        "lng": -116.76182,
        "city_score": 0.1,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Insurgentes",
        "lat": 32.3362,
        "lng": -116.7472,
        "city_score": 0.8,
        "city_size": 0.8,
        "description": [
            null
        ],
        "_size": 0.8
    },
    {
        "city": "Colonia Kennedy",
        "lat": 32.5333,
        "lng": -116.7333,
        "city_score": 0.1,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Colonia El Pípila",
        "lat": 32.47053636363636,
        "lng": -116.8684,
        "city_score": 0.2,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia Terrazas del Sol",
        "lat": 32.4679,
        "lng": -117.0877,
        "city_score": 0.9,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Fraccionamiento Vista Hermosa",
        "lat": 32.4222,
        "lng": -117.0664,
        "city_score": 0.8,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Colonia Los Olivos Norte",
        "lat": 32.40154444444445,
        "lng": -116.83006666666668,
        "city_score": 0.9,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Xochimilco Solidaridad",
        "lat": 32.46521,
        "lng": -116.87767,
        "city_score": 0.5,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Fraccionamiento Rincón de Otay",
        "lat": 32.46782,
        "lng": -116.79802,
        "city_score": 0.8,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia Baja California",
        "lat": 32.431014285714284,
        "lng": -116.90294285714286,
        "city_score": 0.1,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Colonia México Lindo",
        "lat": 32.431574999999995,
        "lng": -116.904675,
        "city_score": 0.1,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia Ramos",
        "lat": 32.513459999999995,
        "lng": -116.7722,
        "city_score": 0.2,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Cañón del Sainz",
        "lat": 32.433260000000004,
        "lng": -116.87776999999998,
        "city_score": 0.2,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Fraccionamiento Colinas de California",
        "lat": 32.466,
        "lng": -116.6881,
        "city_score": 0.6,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Agua Caliente",
        "lat": 32.5167,
        "lng": -117.0167,
        "city_score": 0.8,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Granja Puesta del Sol",
        "lat": 32.3,
        "lng": -116.91670000000002,
        "city_score": 0.9,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Nueva Aurora",
        "lat": 32.48544285714286,
        "lng": -117.03485714285716,
        "city_score": 0.2,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia Sanchez Taboada Produtsa",
        "lat": 32.40616666666667,
        "lng": -116.75873333333334,
        "city_score": 0.7,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Colonia Chapultepec Alamar",
        "lat": 32.37725,
        "lng": -116.69665,
        "city_score": 0.8,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Fraccionamiento La Escondida",
        "lat": 32.4718,
        "lng": -116.86178571428572,
        "city_score": 0.4,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Los Venados",
        "lat": 32.4194,
        "lng": -116.92279999999998,
        "city_score": 0.7,
        "city_size": 0.8,
        "description": [
            null
        ],
        "_size": 0.8
    },
    {
        "city": "Colonia Santa Cruz",
        "lat": 32.483293333333336,
        "lng": -116.81761333333334,
        "city_score": 0.7,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Zona industrial Parque Industrial El Florido Sección La Encantada",
        "lat": 32.4256,
        "lng": -116.8831,
        "city_score": 0.5,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Del Río",
        "lat": 32.5333,
        "lng": -116.7333,
        "city_score": 0.6,
        "city_size": 0.8,
        "description": [
            null
        ],
        "_size": 0.8
    },
    {
        "city": "Colonia Terrazas del Valle",
        "lat": 32.4875,
        "lng": -116.8267,
        "city_score": 0.5,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Alfonso Ballesteros",
        "lat": 32.40490714285714,
        "lng": -116.79287857142856,
        "city_score": 0.5,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Fraccionamiento Residencial Alameda",
        "lat": 32.431574999999995,
        "lng": -116.904675,
        "city_score": 0.4,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Fraccionamiento Playas de Tijuana Sección Jardines",
        "lat": 32.4538,
        "lng": -116.9963,
        "city_score": 0.5,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia Anexa Buena Vista",
        "lat": 32.5333,
        "lng": -116.7333,
        "city_score": 0.7,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Colonia Genaro Vázquez Sección Tres",
        "lat": 32.43449999999999,
        "lng": -116.9582888888889,
        "city_score": 0.2,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Colonia 20 de Noviembre",
        "lat": 32.4424,
        "lng": -116.7405,
        "city_score": 0.5,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia Lomas Taurinas",
        "lat": 32.5333,
        "lng": -116.7333,
        "city_score": 0.2,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Xicotencatl Leyva Alemán",
        "lat": 32.4386,
        "lng": -116.9661,
        "city_score": 0.2,
        "city_size": 0.15,
        "description": [
            null
        ],
        "_size": 0.15
    },
    {
        "city": "Colonia Rodeo",
        "lat": 32.405,
        "lng": -116.79970000000002,
        "city_score": 0.9,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Colonia Rancho las Flores 2a Sección",
        "lat": 32.5187,
        "lng": -117.0874,
        "city_score": 1,
        "city_size": 0.9,
        "description": [
            null
        ],
        "_size": 0.9
    },
    {
        "city": "Colonia La Morita",
        "lat": 32.05833333333333,
        "lng": -116.678175,
        "city_score": 0.7,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Fraccionamiento Isla Coronado",
        "lat": 32.42258,
        "lng": -117.09744,
        "city_score": 0.3,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Colonia Villa Mar",
        "lat": 32.4585,
        "lng": -117.0176,
        "city_score": 0.8,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Fraccionamiento Villa Fontana IX",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.3,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia Santa Cecilia",
        "lat": 32.4317,
        "lng": -116.85684,
        "city_score": 0.3,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia Herradura",
        "lat": 32.4248,
        "lng": -116.89830000000002,
        "city_score": 0,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Fraccionamiento Mar de Cortez",
        "lat": 32.4475875,
        "lng": -116.9742375,
        "city_score": 0.7,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia Rancho las Flores 1a Sección",
        "lat": 32.5187,
        "lng": -117.0874,
        "city_score": 0.9,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Fraccionamiento Villa Fontana VII",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.7,
        "city_size": 0.85,
        "description": [
            null
        ],
        "_size": 0.85
    },
    {
        "city": "Fraccionamiento Villa Residencial Santa Fe 2a Sección",
        "lat": 32.4306,
        "lng": -117.025,
        "city_score": 0,
        "city_size": 0.1,
        "description": [
            null
        ],
        "_size": 0.1
    },
    {
        "city": "Colonia FIDUZET",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.2,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Valle del Rubí Sección Terrazas",
        "lat": 32.3557,
        "lng": -116.8121,
        "city_score": 0.3,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Sanchez Taboada III",
        "lat": 32.40616666666667,
        "lng": -116.75873333333334,
        "city_score": 0.2,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Pueblo Bonito",
        "lat": 32.4248,
        "lng": -116.89830000000002,
        "city_score": 0.7,
        "city_size": 0.8,
        "description": [
            null
        ],
        "_size": 0.8
    },
    {
        "city": "Colonia Puente La Joya",
        "lat": 32.5651,
        "lng": -116.5175,
        "city_score": 0.1,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Fraccionamiento Urbiquinta Marsella",
        "lat": 32.41961428571428,
        "lng": -117.03117142857144,
        "city_score": 0.4,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Fraccionamiento TECNOMEX",
        "lat": 32.4983,
        "lng": -117.1207,
        "city_score": 0.3,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Colonia Ojo de Agua (El Florido)",
        "lat": 32.49058888888889,
        "lng": -116.78061111111111,
        "city_score": 0.2,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Partido del Trabajo",
        "lat": 32.49058888888889,
        "lng": -116.78061111111111,
        "city_score": 0.7,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Unidad habitacional Las Praderas",
        "lat": 32.40472307692308,
        "lng": -116.8058846153846,
        "city_score": 0.8,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Cañón Palmas",
        "lat": 32.431574999999995,
        "lng": -116.904675,
        "city_score": 1,
        "city_size": 0.85,
        "description": [
            null
        ],
        "_size": 0.85
    },
    {
        "city": "Colonia Cumbres del Rubí",
        "lat": 32.40490714285714,
        "lng": -116.79287857142856,
        "city_score": 1,
        "city_size": 0.9,
        "description": [
            null
        ],
        "_size": 0.9
    },
    {
        "city": "Colonia Madero (Cacho)",
        "lat": 32.38305,
        "lng": -116.88515,
        "city_score": 0.3,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Ampliación Lomas de Tlatelolco",
        "lat": 32.49058888888889,
        "lng": -116.78061111111111,
        "city_score": 0.2,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Cerro Colorado 3a Sección",
        "lat": 32.40472307692308,
        "lng": -116.8058846153846,
        "city_score": 0.1,
        "city_size": 0.1,
        "description": [
            null
        ],
        "_size": 0.1
    },
    {
        "city": "Colonia Jardines de La Gloria",
        "lat": 32.4462,
        "lng": -117.001,
        "city_score": 0.8,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Murua Oriente",
        "lat": 32.44583333333333,
        "lng": -116.7912,
        "city_score": 0.2,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Fraccionamiento Real de San Francisco",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.1,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Fraccionamiento Villa del Real VIII",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.7,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Vista Bella",
        "lat": 32.4718,
        "lng": -116.86178571428572,
        "city_score": 0.7,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Zona industrial Baja Maq. El Águila",
        "lat": 32.419415384615384,
        "lng": -117.02846153846154,
        "city_score": 0.9,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia El Mirador (La Mesa)",
        "lat": 32.40154444444445,
        "lng": -116.83006666666668,
        "city_score": 0.1,
        "city_size": 0.1,
        "description": [
            null
        ],
        "_size": 0.1
    },
    {
        "city": "Colonia José Sandoval",
        "lat": 32.483293333333336,
        "lng": -116.81761333333334,
        "city_score": 0.4,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia Otay Campestre",
        "lat": 32.46782,
        "lng": -116.79802,
        "city_score": 0.7,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Tierra y Libertad",
        "lat": 32.47053636363636,
        "lng": -116.8684,
        "city_score": 0.4,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Burócrata Hipódromo",
        "lat": 32.421842857142856,
        "lng": -116.88708571428572,
        "city_score": 0.5,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia Loma Encantada",
        "lat": 32.43455,
        "lng": -116.9743,
        "city_score": 0.6,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia Anexa Simón Bolívar",
        "lat": 32.40490714285714,
        "lng": -116.79287857142856,
        "city_score": 0.8,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Fraccionamiento Villa Fontana VI",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.9,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia Vista Encantada",
        "lat": 32.4724,
        "lng": -116.93590000000002,
        "city_score": 0.8,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Colonia Playas de Tijuana Sección el Dorado",
        "lat": 32.4475875,
        "lng": -116.9742375,
        "city_score": 0.9,
        "city_size": 0.9,
        "description": [
            null
        ],
        "_size": 0.9
    },
    {
        "city": "Colonia Gas y Anexas",
        "lat": 32.44844615384615,
        "lng": -116.87156923076924,
        "city_score": 0.5,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Lagunitas 3a Sección",
        "lat": 32.44055,
        "lng": -116.84985,
        "city_score": 0.6,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Los Saucillos",
        "lat": 32.405,
        "lng": -116.79970000000002,
        "city_score": 0.2,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Fraccionamiento FOVISSSTE Los Volcanes",
        "lat": 32.483293333333336,
        "lng": -116.81761333333334,
        "city_score": 0.7,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Colonia Real del Mar",
        "lat": 32.4258,
        "lng": -117.0392,
        "city_score": 0.2,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia El Lago",
        "lat": 32.4222,
        "lng": -117.0664,
        "city_score": 0.3,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Fraccionamiento Villa Campestre",
        "lat": 32.466,
        "lng": -116.6881,
        "city_score": 0.5,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Plan de Iguala",
        "lat": 32.513459999999995,
        "lng": -116.7722,
        "city_score": 0.9,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Aeropuerto",
        "lat": 32.4604,
        "lng": -116.90155,
        "city_score": 0.9,
        "city_size": 0.8,
        "description": [
            null
        ],
        "_size": 0.8
    },
    {
        "city": "Fraccionamiento La Esperanza",
        "lat": 32.40490714285714,
        "lng": -116.79287857142856,
        "city_score": 0.1,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia Martínez",
        "lat": 32.431014285714284,
        "lng": -116.90294285714286,
        "city_score": 0.6,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Fraccionamiento Residencial Barcelona",
        "lat": 32.43449999999999,
        "lng": -116.9582888888889,
        "city_score": 0.5,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Las Torres",
        "lat": 32.5482,
        "lng": -116.7397,
        "city_score": 0.3,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Chapultepec Este",
        "lat": 32.50418888888888,
        "lng": -116.99482222222224,
        "city_score": 0.8,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Constitución del 17",
        "lat": 32.42765,
        "lng": -116.89255,
        "city_score": 0.1,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Fraccionamiento Sevilla Residencial",
        "lat": 32.2572,
        "lng": -116.746,
        "city_score": 0.6,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Colonia Hacienda Agua Caliente",
        "lat": 32.421842857142856,
        "lng": -116.88708571428572,
        "city_score": 0.7,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Fraccionamiento El Rubí",
        "lat": 32.4345,
        "lng": -116.9469,
        "city_score": 0.3,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Los Venados Oeste",
        "lat": 32.4194,
        "lng": -116.92279999999998,
        "city_score": 0.4,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Fraccionamiento Margarita Residencial",
        "lat": 32.5007,
        "lng": -116.8071,
        "city_score": 0.3,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Colonia La Joya",
        "lat": 32.44844615384615,
        "lng": -116.87156923076924,
        "city_score": 0.6,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Colonia Colinas de Agua Caliente",
        "lat": 32.421842857142856,
        "lng": -116.88708571428572,
        "city_score": 0.8,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia Lomas de San Antonio",
        "lat": 32.42258,
        "lng": -117.09744,
        "city_score": 0.7,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Cerro Colorado I",
        "lat": 32.40472307692308,
        "lng": -116.8058846153846,
        "city_score": 0.7,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia Niños Héroes",
        "lat": 32.4193,
        "lng": -116.88335,
        "city_score": 0.9,
        "city_size": 0.95,
        "description": [
            null
        ],
        "_size": 0.95
    },
    {
        "city": "Zona industrial Chilpancingo",
        "lat": 32.5254,
        "lng": -116.9178,
        "city_score": 0.7,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Reforma",
        "lat": 32.43768333333333,
        "lng": -116.82155,
        "city_score": 0,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Fraccionamiento Vistas de Palmillas",
        "lat": 32.44438571428571,
        "lng": -116.82194285714286,
        "city_score": 0.9,
        "city_size": 0.8,
        "description": [
            null
        ],
        "_size": 0.8
    },
    {
        "city": "Colonia San Bernardo (Terrazas de San Bernardo)",
        "lat": 32.4724,
        "lng": -116.93590000000002,
        "city_score": 0.9,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Pedregal del Matamoros",
        "lat": 32.3617,
        "lng": -116.7366,
        "city_score": 0,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Rincón Dorado",
        "lat": 32.3617,
        "lng": -116.7366,
        "city_score": 0.4,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Fraccionamiento Valle del Sur",
        "lat": 32.3557,
        "lng": -116.8121,
        "city_score": 0.4,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Rinconada 1",
        "lat": 32.4089,
        "lng": -116.9436,
        "city_score": 0.2,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Fraccionamiento Las Villas Santa Fe",
        "lat": 32.4718,
        "lng": -116.86178571428572,
        "city_score": 0.7,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Fraccionamiento Cañadas del Florido",
        "lat": 32.05833333333333,
        "lng": -116.678175,
        "city_score": 0.7,
        "city_size": 0.85,
        "description": [
            null
        ],
        "_size": 0.85
    },
    {
        "city": "Fraccionamiento San Agustin",
        "lat": 32.43455,
        "lng": -116.9743,
        "city_score": 1,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Fraccionamiento El Palmar",
        "lat": 32.40490714285714,
        "lng": -116.79287857142856,
        "city_score": 0.9,
        "city_size": 0.9,
        "description": [
            null
        ],
        "_size": 0.9
    },
    {
        "city": "Colonia Rancho La Cima",
        "lat": 32.4345,
        "lng": -116.9469,
        "city_score": 0.3,
        "city_size": 0.15,
        "description": [
            null
        ],
        "_size": 0.15
    },
    {
        "city": "Colonia Cerro Colorado 2a Sección (Lomas del Colorado)",
        "lat": 32.40472307692308,
        "lng": -116.8058846153846,
        "city_score": 0.5,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Colonia Vivienda Magisterial 37",
        "lat": 32.42765,
        "lng": -116.89255,
        "city_score": 0.7,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia La Mesa",
        "lat": 32.483293333333336,
        "lng": -116.81761333333334,
        "city_score": 0.2,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Cañón Rubí",
        "lat": 32.42098,
        "lng": -116.97188,
        "city_score": 0.7,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Fraccionamiento Pontevedra",
        "lat": 32.5482,
        "lng": -116.7397,
        "city_score": 0.7,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Parque Industrial La Mesa",
        "lat": 32.406580000000005,
        "lng": -116.74652,
        "city_score": 0.4,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia Revolución",
        "lat": 32.496766666666666,
        "lng": -116.79406666666668,
        "city_score": 0.8,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Ampliación Guaycura",
        "lat": 32.41961428571428,
        "lng": -117.03117142857144,
        "city_score": 0.7,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Fraccionamiento Misión de las Américas",
        "lat": 32.419415384615384,
        "lng": -117.02846153846154,
        "city_score": 0.9,
        "city_size": 0.8,
        "description": [
            null
        ],
        "_size": 0.8
    },
    {
        "city": "Fraccionamiento Liberal Lomas del Rubí",
        "lat": 32.36538,
        "lng": -116.81364,
        "city_score": 0.2,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia Sonora",
        "lat": 32.40154444444445,
        "lng": -116.83006666666668,
        "city_score": 0.7,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Colonia Granjas Princesas del Sol",
        "lat": 32.49058888888889,
        "lng": -116.78061111111111,
        "city_score": 0.2,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia Maclovio Rojas",
        "lat": 32.49058888888889,
        "lng": -116.78061111111111,
        "city_score": 1,
        "city_size": 0.95,
        "description": [
            null
        ],
        "_size": 0.95
    },
    {
        "city": "Colonia Los Olivos",
        "lat": 32.4317,
        "lng": -116.85684,
        "city_score": 0.2,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia Gerónimo Meza Este",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.2,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia Buenos Aires Norte",
        "lat": 32.3617,
        "lng": -116.7366,
        "city_score": 0.3,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Amparo Sánchez",
        "lat": 32.43768333333333,
        "lng": -116.82155,
        "city_score": 0.6,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia El Tecolote",
        "lat": 32.43449999999999,
        "lng": -116.9582888888889,
        "city_score": 0.7,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Colonia Ejido Francisco Villa Sur",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.1,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Fraccionamiento Villa Residencial del Bosque",
        "lat": 32.329181818181816,
        "lng": -116.68644545454544,
        "city_score": 0,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Flores Magón",
        "lat": 32.4523,
        "lng": -116.9682,
        "city_score": 0.4,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Valle Vista 2a Sección",
        "lat": 32.506625,
        "lng": -116.690575,
        "city_score": 0.3,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Colonia La Cueva",
        "lat": 32.3,
        "lng": -116.91670000000002,
        "city_score": 0.9,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Tres M (Pérez)",
        "lat": 32.5075,
        "lng": -116.79189999999998,
        "city_score": 0.2,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Fraccionamiento Punta del Mar",
        "lat": 32.4619,
        "lng": -117.101,
        "city_score": 0.3,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Fraccionamiento Azteca",
        "lat": 32.40483636363637,
        "lng": -116.80335454545455,
        "city_score": 0.2,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Unidad habitacional INFONAVIT Loma II",
        "lat": 32.46782,
        "lng": -116.79802,
        "city_score": 0.9,
        "city_size": 0.85,
        "description": [
            null
        ],
        "_size": 0.85
    },
    {
        "city": "Unidad habitacional INFONAVIT Patrimonio",
        "lat": 32.44583333333333,
        "lng": -116.7912,
        "city_score": 0.6,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Hacienda las Palomas",
        "lat": 32.421842857142856,
        "lng": -116.88708571428572,
        "city_score": 0.2,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Playas de Tijuana Sección Costa Azul",
        "lat": 32.4538,
        "lng": -116.9963,
        "city_score": 0.1,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Madero Sur",
        "lat": 32.47284285714286,
        "lng": -117.00107142857144,
        "city_score": 0.7,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Río Tijuana 2a. Etapa",
        "lat": 32.32389090909091,
        "lng": -116.8769,
        "city_score": 0.2,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Colinas del Florido",
        "lat": 32.49058888888889,
        "lng": -116.78061111111111,
        "city_score": 0.8,
        "city_size": 0.85,
        "description": [
            null
        ],
        "_size": 0.85
    },
    {
        "city": "Colonia Anexa Durango",
        "lat": 32.505406666666666,
        "lng": -116.76182,
        "city_score": 0.3,
        "city_size": 0.15,
        "description": [
            null
        ],
        "_size": 0.15
    },
    {
        "city": "Colonia Colinas del Rey",
        "lat": 32.36538,
        "lng": -116.81364,
        "city_score": 0.2,
        "city_size": 0.15,
        "description": [
            null
        ],
        "_size": 0.15
    },
    {
        "city": "Colonia Granjas Familiares Unidas",
        "lat": 32.5482,
        "lng": -116.7397,
        "city_score": 0.3,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Anexa Postal",
        "lat": 32.5167,
        "lng": -116.9833,
        "city_score": 0.4,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia Zona Urbana Río Tijuana",
        "lat": 32.496766666666666,
        "lng": -116.79406666666668,
        "city_score": 0.7,
        "city_size": 0.8,
        "description": [
            null
        ],
        "_size": 0.8
    },
    {
        "city": "Fraccionamiento Punta Bandera",
        "lat": 32.4619,
        "lng": -117.101,
        "city_score": 0.4,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Fraccionamiento Hacienda Linda Vista",
        "lat": 32.4538,
        "lng": -116.9963,
        "city_score": 0.6,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Fraccionamiento Paseos del Vergel",
        "lat": 32.44438571428571,
        "lng": -116.82194285714286,
        "city_score": 0.1,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Fraccionamiento Jardín de las Bugambilias",
        "lat": 32.513459999999995,
        "lng": -116.7722,
        "city_score": 0.9,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia La Morita 2a Sección",
        "lat": 32.05833333333333,
        "lng": -116.678175,
        "city_score": 0.7,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Playas de Tijuana Sección Costa Hermosa",
        "lat": 32.4538,
        "lng": -116.9963,
        "city_score": 0.8,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia Insurgentes",
        "lat": 32.5482,
        "lng": -116.7397,
        "city_score": 0.6,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Fraccionamiento Villa Fontana XIII",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 1,
        "city_size": 0.85,
        "description": [
            null
        ],
        "_size": 0.85
    },
    {
        "city": "Colonia Ejido Lázaro Cárdenas",
        "lat": 32.4252,
        "lng": -116.9955,
        "city_score": 0.8,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Corona del Mar",
        "lat": 32.5651,
        "lng": -116.5175,
        "city_score": 0.6,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Fraccionamiento Condesa",
        "lat": 32.48574166666666,
        "lng": -116.88399166666666,
        "city_score": 0.3,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Lomas Doctores (Chapultepec Doctores)",
        "lat": 32.333975,
        "lng": -116.8985,
        "city_score": 0.8,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Colonia Nuevo Progreso",
        "lat": 32.4732,
        "lng": -116.8046,
        "city_score": 0.2,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Manuel Paredes 3a Sección",
        "lat": 32.4345,
        "lng": -116.9469,
        "city_score": 0.7,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Santa Fe",
        "lat": 32.5007,
        "lng": -116.8071,
        "city_score": 0.2,
        "city_size": 0.1,
        "description": [
            null
        ],
        "_size": 0.1
    },
    {
        "city": "Fraccionamiento Villa del Real III",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.2,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Gertrudis Green",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.3,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia Rancho Macías",
        "lat": 32.4724,
        "lng": -116.93590000000002,
        "city_score": 1,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Xicoténcatl Dos",
        "lat": 32.4647,
        "lng": -117.0425,
        "city_score": 0.1,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Fraccionamiento Laderas del Mar",
        "lat": 32.4983,
        "lng": -117.1207,
        "city_score": 0.4,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia Xicoténcatl Leyva (OE)",
        "lat": 32.468,
        "lng": -116.8041,
        "city_score": 0.6,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia Colas del Matamoros",
        "lat": 32.329181818181816,
        "lng": -116.68644545454544,
        "city_score": 0.2,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Fraccionamiento Pacifico Campestre",
        "lat": 32.4258,
        "lng": -117.0392,
        "city_score": 0.5,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Fraccionamiento Parajes del Valle",
        "lat": 32.5007,
        "lng": -116.8071,
        "city_score": 0.8,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Unidad habitacional Plaza San Marcos",
        "lat": 32.419415384615384,
        "lng": -117.02846153846154,
        "city_score": 0.7,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Javier Rojo Gómez",
        "lat": 32.4939,
        "lng": -116.8222,
        "city_score": 0.1,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia Vivienda Popular",
        "lat": 32.371833333333335,
        "lng": -116.81466666666668,
        "city_score": 0.9,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Cañón de las Palmeras",
        "lat": 32.441375,
        "lng": -116.952175,
        "city_score": 0.1,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Anexa Sanchez Taboada",
        "lat": 32.37,
        "lng": -116.6345,
        "city_score": 1,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Las Lilas",
        "lat": 32.483293333333336,
        "lng": -116.81761333333334,
        "city_score": 0.6,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia El Florido III",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.2,
        "city_size": 0.15,
        "description": [
            null
        ],
        "_size": 0.15
    },
    {
        "city": "Unidad habitacional XVIII Ayuntamiento",
        "lat": 32.43449999999999,
        "lng": -116.9582888888889,
        "city_score": 0.9,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Fraccionamiento Villas Otay",
        "lat": 32.3362,
        "lng": -116.7472,
        "city_score": 0.3,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Dimenstein",
        "lat": 32.483293333333336,
        "lng": -116.81761333333334,
        "city_score": 0.3,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Terrazas de La Presa",
        "lat": 32.4516,
        "lng": -116.9109,
        "city_score": 0.4,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Fraccionamiento Colinas de Chapultepec",
        "lat": 32.48452857142858,
        "lng": -116.96044285714288,
        "city_score": 1,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia Las Palmeras",
        "lat": 32.441375,
        "lng": -116.952175,
        "city_score": 0.6,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Villegas",
        "lat": 32.350744444444445,
        "lng": -116.8455,
        "city_score": 0.9,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Fraccionamiento Ribera del Bosque",
        "lat": 32.329181818181816,
        "lng": -116.68644545454544,
        "city_score": 0.7,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Colonia Colinas de La Cantera",
        "lat": 32.40616666666667,
        "lng": -116.75873333333334,
        "city_score": 0.7,
        "city_size": 0.8,
        "description": [
            null
        ],
        "_size": 0.8
    },
    {
        "city": "Colonia Anexa Niños Héroes",
        "lat": 32.42098,
        "lng": -116.97188,
        "city_score": 0.5,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Fraccionamiento Villa del Campo",
        "lat": 32.49058888888889,
        "lng": -116.78061111111111,
        "city_score": 0.1,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia IMAQ Tijuana",
        "lat": 32.405,
        "lng": -116.79970000000002,
        "city_score": 0.4,
        "city_size": 0.7,
        "description": [
            null
        ],
        "_size": 0.7
    },
    {
        "city": "Colonia López",
        "lat": 32.483293333333336,
        "lng": -116.81761333333334,
        "city_score": 0.5,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Colonia Ley del Servicio Civil",
        "lat": 32.42258,
        "lng": -117.09744,
        "city_score": 0.9,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Cañón del Padre",
        "lat": 32.3617,
        "lng": -116.7366,
        "city_score": 0.8,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Tomas Aquino",
        "lat": 32.5333,
        "lng": -116.7333,
        "city_score": 0.3,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia La Esperanza",
        "lat": 32.37,
        "lng": -116.6345,
        "city_score": 0.6,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia El Monte",
        "lat": 32.4679,
        "lng": -117.0877,
        "city_score": 0.2,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Zona industrial Presidentes",
        "lat": 32.419415384615384,
        "lng": -117.02846153846154,
        "city_score": 0.5,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Fraccionamiento Natura Sección Arboledas",
        "lat": 32.3915,
        "lng": -116.9576,
        "city_score": 0.4,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia Moreno",
        "lat": 32.483293333333336,
        "lng": -116.81761333333334,
        "city_score": 0.5,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Fraccionamiento Coral Beach",
        "lat": 32.4475875,
        "lng": -116.9742375,
        "city_score": 0.2,
        "city_size": 0.15,
        "description": [
            null
        ],
        "_size": 0.15
    },
    {
        "city": "Fraccionamiento Hacienda los Laureles",
        "lat": 32.433260000000004,
        "lng": -116.87776999999998,
        "city_score": 0.8,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Fraccionamiento Otay Vista",
        "lat": 32.46782,
        "lng": -116.79802,
        "city_score": 0.8,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Colonia El Paraíso",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.9,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Terrazas de San Angel",
        "lat": 32.42258,
        "lng": -117.09744,
        "city_score": 0.9,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Las Villas Tijuana",
        "lat": 32.4391,
        "lng": -116.99188333333336,
        "city_score": 0.6,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Fraccionamiento Monte Real",
        "lat": 32.40483636363637,
        "lng": -116.80335454545455,
        "city_score": 0.8,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Fraccionamiento Montecarlo",
        "lat": 32.3617,
        "lng": -116.7366,
        "city_score": 0.1,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Unidad habitacional Cuatro Estrellas",
        "lat": 32.43455,
        "lng": -116.9743,
        "city_score": 0.9,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Zona industrial Lago Sur",
        "lat": 32.4222,
        "lng": -117.0664,
        "city_score": 0.6,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia La Jolla",
        "lat": 32.4462,
        "lng": -117.001,
        "city_score": 0.1,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia El Triunfo",
        "lat": 32.40616666666667,
        "lng": -116.75873333333334,
        "city_score": 0.6,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Villa Fontana XVIII",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.3,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Castro",
        "lat": 32.44844615384615,
        "lng": -116.87156923076924,
        "city_score": 0.8,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Unidad habitacional Militar",
        "lat": 32.350744444444445,
        "lng": -116.8455,
        "city_score": 0.7,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Playas de Tijuana Sección La Riviera",
        "lat": 32.4475875,
        "lng": -116.9742375,
        "city_score": 0.2,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Fraccionamiento Lomas del Real",
        "lat": 32.4718,
        "lng": -116.86178571428572,
        "city_score": 0.6,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Altiplano",
        "lat": 32.329181818181816,
        "lng": -116.68644545454544,
        "city_score": 0.1,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Colonia Guadalajara",
        "lat": 32.47284285714286,
        "lng": -117.00107142857144,
        "city_score": 0.3,
        "city_size": 0.25,
        "description": [
            null
        ],
        "_size": 0.25
    },
    {
        "city": "Colonia Colinas de La Mesa",
        "lat": 32.431574999999995,
        "lng": -116.904675,
        "city_score": 0.6,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Hacienda del Mar",
        "lat": 32.4193,
        "lng": -116.99101428571429,
        "city_score": 0.3,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Urías",
        "lat": 32.513459999999995,
        "lng": -116.7722,
        "city_score": 0,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Fraccionamiento Villa del Real II",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.3,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia Leos Montoya",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.4,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Jardines de Chapultepec S-E",
        "lat": 32.4248,
        "lng": -116.89830000000002,
        "city_score": 0.6,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Fraccionamiento Las Flores",
        "lat": 32.46521,
        "lng": -116.87767,
        "city_score": 1,
        "city_size": 0.85,
        "description": [
            null
        ],
        "_size": 0.85
    },
    {
        "city": "Colonia Simón Bolívar",
        "lat": 32.40490714285714,
        "lng": -116.79287857142856,
        "city_score": 0.3,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia INFONAVIT Cachanillas",
        "lat": 32.406580000000005,
        "lng": -116.74652,
        "city_score": 0.6,
        "city_size": 0.35,
        "description": [
            null
        ],
        "_size": 0.35
    },
    {
        "city": "Colonia Lázaro Cárdenas",
        "lat": 32.4386,
        "lng": -116.9661,
        "city_score": 0,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Colonia Garita Internacional",
        "lat": 32.468,
        "lng": -116.8041,
        "city_score": 0.7,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Colonia Villa Floresta",
        "lat": 32.431014285714284,
        "lng": -116.90294285714286,
        "city_score": 0.9,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia Balcón Las Huertas",
        "lat": 32.513459999999995,
        "lng": -116.7722,
        "city_score": 0.7,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Colonia Reynoso",
        "lat": 32.313233333333336,
        "lng": -116.70433333333332,
        "city_score": 0.8,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia Puerta del Sol",
        "lat": 32.3617,
        "lng": -116.7366,
        "city_score": 0.7,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Lomas Tijuana",
        "lat": 32.441375,
        "lng": -116.952175,
        "city_score": 0.2,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Colonia Monte San Antonio",
        "lat": 32.4345,
        "lng": -116.9469,
        "city_score": 0.6,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Anexa Del Río",
        "lat": 32.5333,
        "lng": -116.7333,
        "city_score": 0.1,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Fraccionamiento Villa del Sol II",
        "lat": 32.36484074074074,
        "lng": -116.74276296296296,
        "city_score": 0.3,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia La Villa",
        "lat": 32.505406666666666,
        "lng": -116.76182,
        "city_score": 0.9,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Mi Patrimonio",
        "lat": 32.46521,
        "lng": -116.87767,
        "city_score": 0,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Colonia Altiplano 5a Sección",
        "lat": 32.329181818181816,
        "lng": -116.68644545454544,
        "city_score": 0.4,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia La Gloria",
        "lat": 32.4462,
        "lng": -117.001,
        "city_score": 0.4,
        "city_size": 0.3,
        "description": [
            null
        ],
        "_size": 0.3
    },
    {
        "city": "Zona industrial Alamar II",
        "lat": 32.5482,
        "lng": -116.7397,
        "city_score": 0.4,
        "city_size": 0.2,
        "description": [
            null
        ],
        "_size": 0.2
    },
    {
        "city": "Colonia Cumbres de Juárez",
        "lat": 32.47284285714286,
        "lng": -117.00107142857144,
        "city_score": 0.8,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Aguaje de La Tuna 1a Sección",
        "lat": 32.48574166666666,
        "lng": -116.88399166666666,
        "city_score": 0.3,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Cañón Azteca",
        "lat": 32.4724,
        "lng": -116.9359,
        "city_score": 0.3,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia Otay Galerías",
        "lat": 32.468,
        "lng": -116.8041,
        "city_score": 1,
        "city_size": 0.65,
        "description": [
            null
        ],
        "_size": 0.65
    },
    {
        "city": "Fraccionamiento La Esperanza [Granjas Familiares]",
        "lat": 32.4589,
        "lng": -117.10765,
        "city_score": 0.3,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Anexa Herrera",
        "lat": 32.4345,
        "lng": -116.9469,
        "city_score": 0.8,
        "city_size": 0.6,
        "description": [
            null
        ],
        "_size": 0.6
    },
    {
        "city": "Colonia Rancho el Águila",
        "lat": 32.419415384615384,
        "lng": -117.02846153846154,
        "city_score": 0.6,
        "city_size": 0.5,
        "description": [
            null
        ],
        "_size": 0.5
    },
    {
        "city": "Colonia Ampliación Las Américas",
        "lat": 32.419415384615384,
        "lng": -117.02846153846154,
        "city_score": 0.8,
        "city_size": 0.8,
        "description": [
            null
        ],
        "_size": 0.8
    },
    {
        "city": "Colonia Patrimonio Familiar",
        "lat": 32.350744444444445,
        "lng": -116.8455,
        "city_score": 0.9,
        "city_size": 0.95,
        "description": [
            null
        ],
        "_size": 0.95
    },
    {
        "city": "Fraccionamiento El Rincón",
        "lat": 32.40490714285714,
        "lng": -116.79287857142856,
        "city_score": 0.7,
        "city_size": 0.75,
        "description": [
            null
        ],
        "_size": 0.75
    },
    {
        "city": "Fraccionamiento Costa Coronado Residencial",
        "lat": 32.4585,
        "lng": -117.0176,
        "city_score": 0.8,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Fraccionamiento Lomas de San Pedro",
        "lat": 32.405,
        "lng": -116.7997,
        "city_score": 0.2,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Colonia Valle del Rubí Sección Lomas",
        "lat": 32.371833333333335,
        "lng": -116.81466666666668,
        "city_score": 0.3,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    },
    {
        "city": "Colonia INFONAVIT La Mesa",
        "lat": 32.32389090909091,
        "lng": -116.8769,
        "city_score": 0.8,
        "city_size": 0.45,
        "description": [
            null
        ],
        "_size": 0.45
    },
    {
        "city": "Fraccionamiento La Perla Bahía",
        "lat": 32.4475875,
        "lng": -116.9742375,
        "city_score": 0.2,
        "city_size": 0.4,
        "description": [
            null
        ],
        "_size": 0.4
    },
    {
        "city": "Colonia Pinos del Agüero",
        "lat": 32.513459999999995,
        "lng": -116.7722,
        "city_score": 0.5,
        "city_size": 0.55,
        "description": [
            null
        ],
        "_size": 0.55
    }
]


export const demoElectionTable = {
    "table": [
        {
            "Election District": "District A",
            "Total Eligible Voters": 853,
            "Already voted": 414,
            "Total voting percentage": 0.485,
            "Total Supports": 194,
            "Supporters Already Voted": 76,
            "Supporters voting percentage": 0.392,
            "Expected model voters": 0
        },
        {
            "Election District": "District B",
            "Total Eligible Voters": 1227,
            "Already voted": 602,
            "Total voting percentage": 0.491,
            "Total Supports": 253,
            "Supporters Already Voted": 116,
            "Supporters voting percentage": 0.458,
            "Expected model voters": 0
        },
        {
            "Election District": "District C",
            "Total Eligible Voters": 899,
            "Already voted": 402,
            "Total voting percentage": 0.447,
            "Total Supports": 164,
            "Supporters Already Voted": 72,
            "Supporters voting percentage": 0.439,
            "Expected model voters": 0
        },
        {
            "Election District": "District D",
            "Total Eligible Voters": 1285,
            "Already voted": 593,
            "Total voting percentage": 0.461,
            "Total Supports": 254,
            "Supporters Already Voted": 109,
            "Supporters voting percentage": 0.429,
            "Expected model voters": 0
        },
        {
            "Election District": "District E",
            "Total Eligible Voters": 773,
            "Already voted": 404,
            "Total voting percentage": 0.523,
            "Total Supports": 165,
            "Supporters Already Voted": 83,
            "Supporters voting percentage": 0.503,
            "Expected model voters": 0
        },
        {
            "Election District": "Not Set",
            "Total Eligible Voters": 5,
            "Already voted": 2,
            "Total voting percentage": 0.4,
            "Total Supports": 2,
            "Supporters Already Voted": 1,
            "Supporters voting percentage": 0.5,
            "Expected model voters": 0
        }
    ],
    "count": 6
}


//Election KPI
export const demoElectionKPI = {
    expected: 142542,
    voted_for: 131074,
    voters: 255546,
    voters_per: 77.9
}


export const electionDemoGender = [
    {
        "gender": "Female",
        "age_group": "18-30",
        "count": 19547
    },
    {
        "gender": "Male",
        "age_group": "18-30",
        "count": 22458
    },
    {
        "gender": "Female",
        "age_group": "30-40",
        "count": 21258
    },
    {
        "gender": "Male",
        "age_group": "30-40",
        "count": 32079
    },
    {
        "gender": "Female",
        "age_group": "40-50",
        "count": 20796
    },
    {
        "gender": "Male",
        "age_group": "40-50",
        "count": 25648
    },
    {
        "gender": "Female",
        "age_group": "50-65",
        "count": 19586
    },
    {
        "gender": "Male",
        "age_group": "50-65",
        "count": 21589
    },
    {
        "gender": "Female",
        "age_group": "65+",
        "count": 18852
    },
    {
        "gender": "Male",
        "age_group": "65+",
        "count": 27968
    }
]

export const demoElectionVotingRate = {
    all_bingo: 131074,
    voting_rate: 78
}



//Sentimentor pdf
export const sentimentorPdfData: any = {
    "total_amount": 509827,
    "keywords": [
        "14/88",
        "1989-ben létrejött nacionalista ifjúsági szervezet erős antiszemita felhangokkal",
        "acabado a todos [los judíos]",
        "Achse des Widerstands",
        "acte de ura",
        "adolf",
        "Adolf",
        "Adolf Hitler",
        "adolf hitlert éltet",
        "afs antisemiter",
        "afs antisemitiska",
        "afs antisemitism",
        "afs antisionistiska",
        "afs apartheid",
        "afs barbari",
        "afs bilderberg",
        "afs bilderberggruppen",
        "afs djurskydd",
        "afs folkmord",
        "afs förintelseförnekare",
        "afs förintelsen",
        "afs globalister",
        "afs globalisterna",
        "afs globalisternas",
        "afs globalistiska",
        "afs graffitti",
        "afs intressen",
        "afs israel",
        "afs israeliska",
        "afs judarna",
        "afs judarnas",
        "afs judisk",
        "afs judiska",
        "afs klotter",
        "afs kontrollerar",
        "afs sedvänja",
        "afs sionism",
        "afs sionister",
        "afs sionisterna",
        "afs sionistiska",
        "afs soros",
        "ágoston tibor",
        "akkor ez az ezer ember a nemzet",
        "aljazeera",
        "allah akbar",
        "allahu akbar",
        "államvédelmi hatóság vezető anticion",
        "államvédelmi hatóság&vezető&anticion",
        "államvédelmi hatóság vezető antiszemit",
        "államvédelmi hatóság&vezető&antiszemit",
        "államvédelmi hatóság&vezető&holokauszt",
        "államvédelmi hatóság vezető izrael",
        "államvédelmi hatóság&vezető&izrael",
        "államvédelmi hatóság&vezető& náci",
        "államvédelmi hatóságvezető náci",
        "államvédelmi hatóság vezető zsidó",
        "államvédelmi hatóság&vezető&zsidó",
        "all-polish youth",
        "Al-Najjar Hospital",
        "alternativ för sverige",
        "anexionarse el territorio palestino",
        "anit-israel",
        "Anne Frank",
        "Annexion",
        "anonymous.kollektiv&anticion",
        "anonymous.kollektiv&antiszemit",
        "anonymous.kollektiv&holokauszt",
        "anonymous.kollektiv izrael",
        "anonymous.kollektiv&izrael",
        "anonymous.kollektiv náci",
        "anonymous.kollektiv& náci",
        "anonymous.kollektiv&zsidó",
        "anonymousnews.ru anticion",
        "anonymousnews.ru&anticion",
        "anonymousnews.ru antiszemit",
        "anonymousnews.ru&antiszemit",
        "anonymousnews.ru holokauszt",
        "anonymousnews.ru&holokauszt",
        "anonymousnews.ru izrael",
        "anonymousnews.ru&izrael",
        "anonymousnews.ru náci",
        "anonymousnews.ru& náci",
        "anonymousnews.ru&zsidó",
        "anticionizmus",
        "antievreiesc",
        "ANTIFA",
        "antifascist",
        "antifasiszta",
        "antiglobalisternas",
        "anti-israel",
        "antimagyarizmus",
        "antisemit",
        "antisemit*",
        "anti-Semite",
        "antisémite",
        "antisemiter",
        "antisemiters",
        "Antisemiti*",
        "antisemitisk",
        "antisemitiska",
        "antisemitism",
        "antisémitisme",
        "antisemitismens",
        "antisemitismkortet",
        "Antisemitismus",
        "antisemitkortet",
        "antision*",
        "antisionism",
        "antisionism är inte antisemitism",
        "antisionister",
        "antisionisternas",
        "antisionistiska",
        "antiszemit*",
        "antiszemita",
        "antiszemitizmus",
        "antiszemitizmus ",
        "Antizionis*",
        "antizionism",
        "anti-zionist",
        "apartheid ",
        "apartheidállam",
        "apartheid Izrael",
        "apartheid regime",
        "apáti istván",
        "Arbeitslager",
        "arische Staaten",
        "Arische Staaten",
        "aron verständig",
        "aryaistaten",
        "asedio del israel",
        "Asesinos de Cristo",
        "(Ashke)Nazis",
        "askhaNAZI",
        "asss",
        "auschwitz",
        "Auschwitz",
        "Auschwitz hazugság",
        "Auserwähltes Volk",
        "Austrofaschismus",
        "authoritär",
        "auto",
        "ávh vezető anticion",
        "ávh&vezető&anticion",
        "ávh vezető antiszemit",
        "ávh&vezető&antiszemit",
        "ávh&vezető&holokauszt",
        "ávh vezető izrael",
        "ávh&vezető&izrael",
        "ávh&vezető& náci",
        "ávhvezető náci",
        "ávh vezető zsidó",
        "ávh&vezető&zsidó",
        "bábujait égetette anticion",
        "bábujait égetette&anticion",
        "bábujait égetette antiszemit",
        "bábujait égetette&antiszemit",
        "bábujait égetette&holokauszt",
        "bábujait égetette izrael",
        "bábujait égetette&izrael",
        "bábujait égetette& náci",
        "bábujait égetette zsidó",
        "bábujait égetette&zsidó",
        "baise feuj",
        "baise juif",
        "baise sionistes",
        "banqueros judíos",
        "BanTheADL",
        "barbari antisemiter",
        "barbari antisemitiska",
        "barbari antisemitism",
        "barbari antisionistiska",
        "barbari apartheid",
        "barbari barbari",
        "barbari barbarisk",
        "barbari bilderberg",
        "barbari bilderberggruppen",
        "barbaric Jewish Kosher slaughter",
        "barbari djurskydd",
        "barbari folkmord",
        "barbari förintelseförnekare",
        "barbari förintelsen",
        "barbari globalister",
        "barbari globalisterna",
        "barbari globalisternas",
        "barbari globalistiska",
        "barbari graffitti",
        "barbari intressen",
        "barbari israel",
        "barbari israeliska",
        "barbari judar",
        "barbari judarna",
        "barbari judarnas",
        "barbari judendomen",
        "barbari judisk",
        "barbari judiska",
        "barbari klotter",
        "barbari kontrollerar",
        "barbari sedvänja",
        "barbari sionism",
        "barbari sionister",
        "barbari sionisterna",
        "barbari sionistiska",
        "barbariska antisemiter",
        "barbariska antisemitiska",
        "barbariska antisemitism",
        "barbariska antisionistiska",
        "barbariska barbari",
        "barbariska barbarisk",
        "barbariska bilderberg",
        "barbariska bilderberggruppen",
        "barbariska djurskydd",
        "barbariska folkmord",
        "barbariska förintelseförnekare",
        "barbariska förintelsen",
        "barbariska globalister",
        "barbariska globalisternas",
        "barbariska globalistiska",
        "barbariska gruppstrategi",
        "barbariska intressen",
        "barbariska israel",
        "barbariska israeliska",
        "barbariska judar",
        "barbariska judarna",
        "barbariska judarnas",
        "barbariska judendomen",
        "barbariska judisk",
        "barbariska judiska",
        "barbariska klotter",
        "barbariska kontrollerar",
        "barbarisk antisemitism",
        "barbarisk antisionistiska",
        "barbariska sedvänja",
        "barbariska sionism",
        "barbariska sionister",
        "barbariska sionisterna",
        "barbariska sionistiska",
        "barbariska soros",
        "barbariska vedergällning",
        "barbarisk barbari",
        "barbarisk barbarisk",
        "barbarisk bilderberg",
        "barbarisk bilderberggruppen",
        "barbarisk djurskydd",
        "barbarisk folkmord",
        "barbarisk förintelseförnekare",
        "barbarisk förintelsen",
        "barbarisk globalister",
        "barbarisk globalisterna",
        "barbarisk globalisternas",
        "barbarisk globalistiska",
        "barbarisk graffitti",
        "barbarisk gruppstrategi",
        "barbarisk israel",
        "barbarisk israeliska",
        "barbarisk judar",
        "barbarisk judarna",
        "barbarisk judendomen",
        "barbarisk judisk",
        "barbarisk klotter",
        "barbarisk kontrollerar",
        "barbarisk sedvänja",
        "barbarisk sionism",
        "barbarisk sionister",
        "barbarisk sionisterna",
        "barbarisk sionistiska",
        "barbarisk soros",
        "barbarisk vedergällning",
        "barbari soros",
        "barbari vedergällning",
        "bárdossy lászló emlék- és baráti társaság",
        "bárdossy társaság",
        "Barikád",
        "basil hararah",
        "becsület légió",
        "becsület – más néven: kitörés – napj",
        "befolyás anticion",
        "befolyás&anticion",
        "befolyás antiszemit",
        "befolyás&antiszemit",
        "befolyás&holokauszt",
        "befolyás izrael",
        "befolyás&izrael",
        "befolyás zsidó",
        "befolyás&zsidó",
        "beleköp cipő",
        "beleköp&cipő",
        "bencsik jános anticion",
        "bencsik jános&anticion",
        "bencsik jános antiszemit",
        "bencsik jános&antiszemit",
        "bencsik jános holokauszt",
        "bencsik jános&holokauszt",
        "bencsik jános izrael",
        "bencsik jános&izrael",
        "bencsik jános& náci",
        "bencsik jános zsidó",
        "bencsik jános&zsidó",
        "Benjamin Netanjahu",
        "betyársereg",
        "BIbi",
        "biboldó bérenc",
        "biboldó-bérenc",
        "bibsi",
        "bilderberggruppen",
        "bilderberggruppens",
        "Bin Laden freedom fighter.",
        "Bin Laden luchador por la libertad",
        "Björn Höcke",
        "B közép",
        "Blood and Honour",
        "blood libel",
        "bojkott antisemiter",
        "bojkott antisemitiska",
        "bojkott antisemitism",
        "bojkott antisionistiska",
        "bojkott apartheid",
        "bojkott barbari",
        "bojkott barbarisk",
        "bojkott bilderberg",
        "bojkott bilderberggruppen",
        "bojkott djurskydd",
        "bojkott folkmord",
        "bojkott globalister",
        "bojkott globalisterna",
        "bojkott globalisternas",
        "bojkott globalistiska",
        "bojkott graffitti",
        "bojkott gruppstrategi",
        "bojkott intressen",
        "bojkott israel",
        "bojkott israeliska",
        "bojkott judar",
        "bojkott judarna",
        "bojkott judisk",
        "bojkott judiska",
        "bojkott klotter",
        "bojkott kontrollerar",
        "bojkott sedvänja",
        "bojkott sionism",
        "bojkott soros",
        "bojkott vedergällning",
        "börzsöny akciócsoport",
        "bosszú népe",
        "boycott juifs",
        "Branau",
        "Budaházy",
        "budai lóránt",
        "budapesti szolidaritás palesztin",
        "büdös zsidó",
        "bűnpártoló",
        "bussy",
        "cabal",
        "CausachunPalestina",
        "ceasefire in gaza",
        "cerdos judios",
        "cese el fuego ahora",
        "ceu radical student collective",
        "chestiunea evreiască",
        "chewish",
        "chien juif",
        "chienne juive",
        "Chivo expiatorio",
        "cimitir evreiesc",
        "Cion",
        "Cion bölcsei",
        "cionista hatalom",
        "cionista hazugság",
        "cionista milliárdos",
        "cionista népirtás",
        "cionista összeesküvés",
        "cion náci",
        "cion náci ",
        "cion-náci zsidó",
        "cionzsidó",
        "cipő&köp",
        "Ciszjordánia",
        "colonial apartheid state",
        "colonialist enterprise",
        "colonization",
        "colonizer",
        "contra el sionismo",
        "Corneliu Zelea Codreanu",
        "covid-náci",
        "cripto jews",
        "Croix gammée",
        "csak a kéményen át",
        "cuiburi legionare",
        "Damn Jews",
        "daniel friberg",
        "dávid csillag fest",
        "dávid&csillag&fest",
        "dávid&csillag&firkál",
        "dávid csillag karcol",
        "dávid&csillag&karcol",
        "dávid-csillagot festettek",
        "dávid csillag rajzol",
        "dávid&csillag&rajzol",
        "david irving",
        "david lega",
        "davidsstjärna",
        "davidsstjärna antisemitiska",
        "davidsstjärna antisemitism",
        "davidsstjärna antisionistiska",
        "davidsstjärna apartheid",
        "davidsstjärna barbarisk",
        "davidsstjärna bilderberg",
        "davidsstjärna bilderberggruppen",
        "davidsstjärna djurskydd",
        "davidsstjärna folkmord",
        "davidsstjärna förintelseförnekare",
        "davidsstjärna förintelsen",
        "davidsstjärna globalister",
        "davidsstjärna globalisterna",
        "davidsstjärna globalisternas",
        "davidsstjärna graffitti",
        "davidsstjärna gruppstrategi",
        "davidsstjärna intressen",
        "davidsstjärna israel",
        "davidsstjärna israeliska",
        "davidsstjärna judisk",
        "davidsstjärna klotter",
        "davidsstjärna kontrollerar",
        "davidsstjärnan",
        "davidsstjärna sedvänja",
        "davidsstjärna sionister",
        "davidsstjärna sionisterna",
        "davidsstjärna sionistiska",
        "davidsstjärna vedergällning",
        "david stern",
        "David Stern",
        "death camp",
        "death to israel",
        "DeathtoIsrael",
        "Death to the Jews",
        "decolonize palestine",
        "dehumanisiertes Volk",
        "Demasiados judíos por aquí",
        "demoniocracia",
        "deportation",
        "Desde el Río hasta el Mar",
        "dieudo",
        "DirtyJew",
        "dirty jews",
        "dócs dávid anticion",
        "dócs dávid&anticion",
        "dócs dávid antiszemit",
        "dócs dávid&antiszemit",
        "dócs dávid holokauszt",
        "dócs dávid&holokauszt",
        "dócs dávid izrael",
        "dócs dávid&izrael",
        "dócs dávid náci",
        "dócs dávid& náci",
        "dócs dávid zsidó",
        "dócs dávid&zsidó",
        "donáth györgy",
        "dragons celestes",
        "druck18",
        "drukker anticion",
        "drukker&anticion",
        "drukker&antiszemit",
        "drukker&holokauszt",
        "drukker izrael",
        "drukker&izrael",
        "drukker náci",
        "drukker& náci",
        "drukker zsidó",
        "drukker&zsidó",
        "duna parti bronzcipő",
        "dúró dóra anticion",
        "dúró dóra&anticion",
        "dúró dóra antiszemit",
        "dúró dóra&antiszemit",
        "dúró dóra holokauszt",
        "dúró dóra&holokauszt",
        "dúró dóra izrael",
        "dúró dóra&izrael",
        "dúró dóra& náci",
        "dúró dóra zsidó",
        "dúró dóra&zsidó",
        "dzsihád",
        "ébredjetek",
        "educatie antisemita",
        "eeee1111",
        "egészséges fejbőr",
        "egészséges fejbőr&anticion",
        "egészséges fejbőr antiszemit",
        "egészséges fejbőr&antiszemit",
        "egészséges fejbőr&holokauszt",
        "egészséges fejbőr izrael",
        "egészséges fejbőr&izrael",
        "egészséges fejbőr náci",
        "egészséges fejbőr& náci",
        "egészséges fejbőr zsidó",
        "egészséges fejbőr&zsidó",
        "egri skinhead mozgalom",
        "Egységes Magyarországi Izraelita Hitközség",
        "éjjeli menedék anticion",
        "éjjeli menedék&anticion",
        "éjjeli menedék antiszemit",
        "éjjeli menedék&antiszemit",
        "éjjeli menedék&holokauszt",
        "éjjeli menedék izrael",
        "éjjeli menedék&izrael",
        "éjjeli menedék& náci",
        "element străin",
        "élet menete",
        "eliberarea palestinei",
        "élite de banqueros",
        "élite de banqueros judío",
        "élite global",
        "elnyomó Izrael",
        "elnyomott palesztin",
        "el río hasta el mar palestina libre será",
        "El sionismo es racismo",
        "EMIH",
        "emlékmű tört anticion",
        "emlékmű&tört&anticion",
        "emlékmű&tört&antiszemit",
        "emlékmű tört holokauszt",
        "emlékmű&tört&holokauszt",
        "emlékmű tört izrael",
        "emlékmű&tört&izrael",
        "emlékmű&tört& náci",
        "emlékműtört náci",
        "emlékmű&tört&zsidó",
        "End Israeli Apartheid",
        "end israel occupation",
        "Endlösung",
        "Endlösung der Judenfrage",
        "EndWhiteGenocide",
        "erős erzsébet",
        "érpatak anticion",
        "érpatak&anticion",
        "érpatak&holokauszt",
        "érpataki modell anticion",
        "érpataki modell&anticion",
        "érpataki modell antiszemit",
        "érpataki modell&antiszemit",
        "érpataki modell&holokauszt",
        "érpataki modell izrael",
        "érpataki modell&izrael",
        "érpataki modell náci",
        "érpataki modell& náci",
        "érpataki modell országos hálózat anticion",
        "érpataki modell országos hálózat antiszemit",
        "érpataki modell országos hálózat&antiszemit",
        "érpataki modell országos hálózat&holokauszt",
        "érpataki modell országos hálózat izrael",
        "érpataki modell országos hálózat náci",
        "érpataki modell országos hálózat& náci",
        "érpataki modell&zsidó",
        "érpatak izrael",
        "érpatak&izrael",
        "érpatak náci",
        "érpatak& náci",
        "érpatak zsidó",
        "érpatak&zsidó",
        "északi ellenállás",
        "ethnically cleansing",
        "ethnic cleansing",
        "Ethnic cleansing",
        "ethnostate",
        "etnikai önvédel",
        "etnikai önvédő",
        "etnikai tisztogatás ",
        "etnonationalistiska",
        "evil zionist pig",
        "evil zionists",
        "évvel a ii. világháború befejezése után anticion",
        "évvel a ii. világháború befejezése után&anticion",
        "évvel a ii. világháború befejezése után antiszemit",
        "évvel a ii. világháború befejezése után&antiszemit",
        "évvel a ii. világháború befejezése után holokauszt",
        "évvel a ii. világháború befejezése után&holokauszt",
        "évvel a ii. világháború befejezése után izrael",
        "évvel a ii. világháború befejezése után&izrael",
        "évvel a ii. világháború befejezése után náci",
        "évvel a ii. világháború befejezése után& náci",
        "évvel a ii. világháború befejezése után zsidó",
        "évvel a ii. világháború befejezése után&zsidó",
        "EXPULSAR A LOS JUDIOS",
        "expulsión del territorio de los palestinos",
        "fake jews",
        "false flag",
        "Faschist",
        "fascism",
        "fasizmus",
        "fehér európai rassz",
        "felkelés",
        "felvásárlás anticion",
        "felvásárlás&anticion",
        "felvásárlás antiszemit",
        "felvásárlás&antiszemit",
        "felvásárlás&holokauszt",
        "felvásárlás izrael",
        "felvásárlás&izrael",
        "felvásárlás& náci",
        "felvásárlás zsidó",
        "felvásárlás&zsidó",
        "festékszóró anticion",
        "festékszóró&anticion",
        "festékszóró antiszemit",
        "festékszóró&antiszemit",
        "festékszóró&holokauszt",
        "festékszóró izrael",
        "festékszóró&izrael",
        "festékszóró& náci",
        "festékszóró zsidó",
        "festékszóró&zsidó",
        "feuj",
        "f*** feuj",
        "filthy jews",
        "finánctőke",
        "f***ing Jews",
        "f*** juifs",
        "folkförrädare antisemiter",
        "folkförrädare antisemitiska",
        "folkförrädare antisemitism",
        "folkförrädare antisionistiska",
        "folkförrädare apartheid",
        "folkförrädare barbari",
        "folkförrädare barbarisk",
        "folkförrädare bilderberg",
        "folkförrädare bilderberggruppen",
        "folkförrädare djurskydd",
        "folkförrädare folkmord",
        "folkförrädare förintelseförnekare",
        "folkförrädare globalister",
        "folkförrädare globalisterna",
        "folkförrädare globalisternas",
        "folkförrädare globalistiska",
        "folkförrädare graffitti",
        "folkförrädare gruppstrategi",
        "folkförrädare intressen",
        "folkförrädare israel",
        "folkförrädare israeliska",
        "folkförrädare judarna",
        "folkförrädare judarnas",
        "folkförrädare judiska",
        "folkförrädare klotter",
        "folkförrädare kontrollerar",
        "folkförrädare sedvänja",
        "folkförrädare sionism",
        "folkförrädare sionister",
        "folkförrädare sionisterna",
        "folkförrädare sionistiska",
        "folkförrädare soros",
        "folkförrädare vedergällning",
        "folkmördare",
        "förintelseförnekare",
        "förintelseindustrin",
        "förintelseindustrins",
        "förintelseläger",
        "från floden till havet",
        "freedom fighter",
        "Freedom for Palestine",
        "free gaza",
        "free gaza ",
        "free palestine",
        "free Palestine",
        "Frölich Róbert",
        "from the river to the sea",
        "From the river to the sea",
        "From the River to the Sea",
        "from the river to the sea Palestine will be free",
        "fuck feuj",
        "fuck sionistes",
        "fuck white jews",
        "Fuckzionism",
        "független március",
        "független palesztin állam",
        "future terrorist",
        "garda de fier",
        "gas chamber",
        "gaseen a los judíos",
        "gas the jews",
        "gas the Jews",
        "gaza",
        "Gaza",
        "Gáza",
        "gaza death camp",
        "gaza genocide",
        "Gaza Genocide",
        "Gaza Holocaust",
        " Gáza hősei",
        "gázai népírtás",
        "gázai övezet",
        " Gázai övezet",
        "gaza is an open-air prison",
        "gaza is under attack",
        "gaza open-air prison",
        "gazdasági és politikai térnyerése anticion",
        "gazdasági és politikai térnyerése&anticion",
        "gazdasági és politikai térnyerése antiszemit",
        "gazdasági és politikai térnyerése&antiszemit",
        "gazdasági és politikai térnyerése holokauszt",
        "gazdasági és politikai térnyerése&holokauszt",
        "gazdasági és politikai térnyerése izrael",
        "gazdasági és politikai térnyerése&izrael",
        "gazdasági és politikai térnyerése náci",
        "gazdasági és politikai térnyerése& náci",
        "gazdasági és politikai térnyerése zsidó",
        "gazdasági és politikai térnyerése&zsidó",
        "gázkamrában a helyük",
        "gázkamraszökevény",
        "géczy gábor",
        "gede testvérek",
        "Geert Wilders",
        "genocid",
        "genocide in gaza",
        "genocidejoe",
        "genocidio en gaza",
        "genocidio israelí",
        "genocídium",
        "genocídium ",
        "genocídium izrael",
        "Genozidium",
        "Gigi Hadid",
        "Gil Ofarim",
        "globalistas judios",
        "globalisternas",
        "globalistiska antisemitiska",
        "globalistiska antisemitism",
        "globalistiska antisionistiska",
        "globalistiska barbari",
        "globalistiska barbarisk",
        "globalistiska bilderberg",
        "globalistiska djurskydd",
        "globalistiska folkmord",
        "globalistiska förintelseförnekare",
        "globalistiska förintelsen",
        "globalistiska globalisterna",
        "globalistiska globalisternas",
        "globalistiska gruppstrategi",
        "globalistiska intressen",
        "globalistiska israel",
        "globalistiska israeliska",
        "globalistiska judar",
        "globalistiska judarna",
        "globalistiska judarnas",
        "globalistiska judendomen",
        "globalistiska judisk",
        "globalistiska judiska",
        "globalistiska klotter",
        "globalistiska sedvänja",
        "globalistiska sionism",
        "globalistiska sionister",
        "globalistiska sionisterna",
        "globalistiska sionistiska",
        "globalize the intifada",
        "Globalize the intifada",
        "glory to our martyrs",
        "Glory to our martyrs",
        "glory to the martyrs",
        "goddamn jews",
        "Gój",
        "gój motorosok",
        "gójok",
        "gójvadászat",
        "Go to hell isr@el",
        "goyim cattle",
        "győrkös istván",
        "gyűlöletbeszéd",
        "gyűlöletbeszéd&anticion",
        "gyűlöletbeszéd antiszemit",
        "gyűlöletbeszéd&antiszemit",
        "gyűlöletbeszéd holokauszt",
        "gyűlöletbeszéd&holokauszt",
        "gyűlöletbeszéd izrael",
        "gyűlöletbeszéd&izrael",
        "gyűlöletbeszéd& náci",
        "gyűlöletbeszéd zsidó",
        "gyűlöletbeszéd&zsidó",
        "gyűlölet cselekmény",
        "gyűlöletre uszítás",
        "háborús bűn",
        "ha egy nemzet gyávává vált, és csak ezer ember maradt",
        "Hakenzkreuz",
        "hakkors",
        "hamas",
        "Hamas",
        "Hamas freedomfighters",
        "Hamas is right",
        "Hamas luchador por la libertad",
        "Hamas not a terrorist",
        "HAMASZ",
        "hamid zafar antisemiter",
        "hamid zafar antisemitiska",
        "hamid zafar antisemitism",
        "hamid zafar antisionistiska",
        "hamid zafar apartheid",
        "hamid zafar barbari",
        "hamid zafar barbarisk",
        "hamid zafar bilderberg",
        "hamid zafar bilderberggruppen",
        "hamid zafar djurskydd",
        "hamid zafar förintelseförnekare",
        "hamid zafar globalister",
        "hamid zafar globalisterna",
        "hamid zafar globalisternas",
        "hamid zafar globalistiska",
        "hamid zafar graffitti",
        "hamid zafar gruppstrategi",
        "hamid zafar israel",
        "hamid zafar israeliska",
        "hamid zafar judar",
        "hamid zafar judarnas",
        "hamid zafar judendomen",
        "hamid zafar judisk",
        "hamid zafar judiska",
        "hamid zafar klotter",
        "hamid zafar kontrollerar",
        "hamid zafar sedvänja",
        "hamid zafar sionism",
        "hamid zafar sionister",
        "hamid zafar sionisterna",
        "hamid zafar sionistiska",
        "hamid zafar soros",
        "hamid zafar vedergällning",
        "hanuka gabi",
        "hanukalevél",
        "hanukás lev",
        "harald damsleth",
        "HaShatan",
        "hassmotivierte Vorfalle",
        "Hassrede",
        "hatbrott",
        "hatbrott antisemiter",
        "hatbrott antisemitiska",
        "hatbrott antisemitism",
        "hatbrott antisionistiska",
        "hatbrott barbari",
        "hatbrott barbarisk",
        "hatbrott bilderberg",
        "hatbrott bilderberggruppen",
        "hatbrott djurskydd",
        "hatbrott folkmord",
        "hatbrott förintelseförnekare",
        "hatbrott förintelsen",
        "hatbrott globalister",
        "hatbrott globalistiska",
        "hatbrott israel",
        "hatbrott israeliska",
        "hatbrott judar",
        "hatbrott judarna",
        "hatbrott judendomen",
        "hatbrott judisk",
        "hatbrott klotter",
        "hatbrott kontrollerar",
        "hatbrott sedvänja",
        "hatbrott sionism",
        "hatbrott sionister",
        "hatbrott sionistiska",
        "hatbrott soros",
        "hatbrott vedergällning",
        "háttérhatalmi érdek",
        "háttérhatalom",
        "Háttérhatalom",
        "hatvannégy vármegye ifjúsági mozgalom anticion",
        "hatvannégy vármegye ifjúsági mozgalom&anticion",
        "hatvannégy vármegye ifjúsági mozgalom antiszemit",
        "hatvannégy vármegye ifjúsági mozgalom&antiszemit",
        "hatvannégy vármegye ifjúsági mozgalom holokauszt",
        "hatvannégy vármegye ifjúsági mozgalom&holokauszt",
        "hatvannégy vármegye ifjúsági mozgalom izrael",
        "hatvannégy vármegye ifjúsági mozgalom&izrael",
        "hatvannégy vármegye ifjúsági mozgalom náci",
        "hatvannégy vármegye ifjúsági mozgalom& náci",
        "hatvannégy vármegye ifjúsági mozgalom zsidó",
        "hatvannégy vármegye ifjúsági mozgalom&zsidó",
        "hatvannégy vármegye mozgalom anticion",
        "hatvannégy vármegye mozgalom&anticion",
        "hatvannégy vármegye mozgalom antiszemit",
        "hatvannégy vármegye mozgalom&antiszemit",
        "hatvannégy vármegye mozgalom holokauszt",
        "hatvannégy vármegye mozgalom&holokauszt",
        "hatvannégy vármegye mozgalom izrael",
        "hatvannégy vármegye mozgalom&izrael",
        "hatvannégy vármegye mozgalom& náci",
        "hatvannégy vármegye mozgalom zsidó",
        "hatvannégy vármegye mozgalom&zsidó",
        "hazafias magyarok szövetsége",
        "hazatérés temploma",
        "hegedűs loránt anticion",
        "hegedűs loránt&anticion",
        "hegedűs loránt&antiszemit",
        "hegedűs loránt holokauszt",
        "hegedűs loránt&holokauszt",
        "hegedűs loránt izrael",
        "hegedűs loránt&izrael",
        "hegedűs loránt náci",
        "hegedűs loránt& náci",
        "hegedűs loránt zsidó",
        "hegedűs loránt&zsidó",
        "hets mot folkgrupp",
        "hilltop youth",
        "hitler",
        "Hitler",
        "Hitler judíos malditos",
        "hitler juif",
        "hitlert éltet",
        "hitlertől származó mondat",
        "hitler was right",
        "holkamu",
        "hollo-kamu",
        "hollókamu",
        "holoagymosás",
        "holocaust",
        "Holocaust",
        "HolocaustoPalestino",
        "holocough",
        "holohoax",
        "Holohoax Tales",
        "holokacsa",
        "holokamu",
        "holokauszt business",
        "holokauszt gyaláz",
        "holokauszt&gyaláz",
        "holokausztipar",
        "holokausztot a zsidók találták",
        "holokauszt relativ",
        "holokauszt&relativ",
        "holokauszt szkeptikus",
        "holokauszt&szkeptikus",
        "holokauszttagadás",
        "holokuauszttagad",
        "holománia",
        "holovallás",
        "hóman bálint-szoboravató",
        "Horia Sima",
        "horst mahler",
        "horthy mellszobra anticion",
        "horthy mellszobra izrael",
        "horthy mellszobra náci",
        "Horthy Miklós",
        "horthy miklós emlékére",
        "horthyzmus anticion",
        "horthyzmus&anticion",
        "horthyzmus antiszemit",
        "horthyzmus&antiszemit",
        "horthyzmus holokauszt",
        "horthyzmus&holokauszt",
        "horthyzmus izrael",
        "horthyzmus&izrael",
        "horthyzmus náci",
        "horthyzmus& náci",
        "horthyzmus zsidó",
        "horthyzmus&zsidó",
        "Hospital bombing",
        "hummus are not terrorists",
        "hungaria skins",
        "hungária skins",
        "hungarista",
        "idegenellenesség",
        "Idegengyűlölő",
        "idegen hatalom anticion",
        "idegen hatalom&anticion",
        "idegen hatalom antiszemit",
        "idegen hatalom&antiszemit",
        "idegen hatalom&holokauszt",
        "idegen hatalom izrael",
        "idegen hatalom&izrael",
        "idegen hatalom náci",
        "idegen hatalom& náci",
        "idegen hatalom zsidó",
        "idegen hatalom&zsidó",
        "idegenrendészeti eljárás anticion",
        "idegenrendészeti eljárás&anticion",
        "idegenrendészeti eljárás antiszemit",
        "idegenrendészeti eljárás&antiszemit",
        "idegenrendészeti eljárás&holokauszt",
        "idegenrendészeti eljárás izrael",
        "idegenrendészeti eljárás&izrael",
        "idegenrendészeti eljárás náci",
        "idegenrendészeti eljárás& náci",
        "idegenrendészeti eljárás zsidó",
        "idegenrendészeti eljárás&zsidó",
        "identitärer antisemiter",
        "identitärer antisemitiska",
        "identitärer antisemitism",
        "identitärer apartheid",
        "identitärer barbari",
        "identitärer barbarisk",
        "identitärer bilderberggruppen",
        "identitärer djurskydd",
        "identitärer folkmord",
        "identitärer förintelseförnekare",
        "identitärer förintelsen",
        "identitärer globalister",
        "identitärer globalisterna",
        "identitärer globalisternas",
        "identitärer intressen",
        "identitärer israel",
        "identitärer israeliska",
        "identitärer judarna",
        "identitärer judarnas",
        "identitärer judendomen",
        "identitärer judisk",
        "identitärer judiska",
        "identitärer klotter",
        "identitärer sedvänja",
        "identitärer sionism",
        "identitärer sionister",
        "identitärer sionisterna",
        "identitärer sionistiska",
        "identitärer soros",
        "identitärer vedergällning",
        "identitárius egyetemisták szövetség",
        "identitesz",
        "idiș",
        "Ierusalim",
        "Illuminatis Sionismo Judios ",
        "i’m also semite",
        "înfrățirea zion",
        "instigare la ura",
        "intifada",
        "intifada revolution",
        "intifada revolution ",
        "invasor sionista",
        "invázió",
        "invázió anticion",
        "invázió&anticion",
        "invázió antiszemit",
        "invázió&antiszemit",
        "invázió&holokauszt",
        "invázió izrael",
        "invázió&izrael",
        "invázió náci",
        "invázió& náci",
        "invázió zsidó",
        "invázió&zsidó",
        "irtani",
        "ISIS",
        "Islam and animal cruelty",
        "Islamic terror kosher creation",
        "ismeretlenek megrongál anticion",
        "ismeretlenek megrongál&anticion",
        "ismeretlenek megrongál antiszemit",
        "ismeretlenek megrongál&antiszemit",
        "ismeretlenek megrongál&holokauszt",
        "ismeretlenek megrongál izrael",
        "ismeretlenek megrongál&izrael",
        "ismeretlenek megrongál& náci",
        "isnotreal",
        "Israel",
        "Israël",
        "israel antisemiter",
        "israel antisemitiska",
        "israel antisemitism",
        "israel antisionistiska",
        "israel apartheid",
        "Israel apartheid",
        "Israel Apartheid",
        "Israel Apartheid Israel",
        "Israel Apartheid State",
        "israel barbari",
        "israel barbarisk",
        "israel bilderberg",
        "israel bilderberggruppen",
        "israel djurskydd",
        "israel dog",
        "israel folkmord",
        "israel förintelseförnekare",
        "israel förintelsen",
        "Israel genocidio",
        "israel globalister",
        "israel globalisterna",
        "israel globalisternas",
        "israel globalistiska",
        "israel graffitti",
        "israel gruppstrategi",
        "israeli flag",
        "israel intressen",
        "israeli oppression",
        "israelisk antisemitiska",
        "israelisk antisemitism",
        "israelisk antisionistiska",
        "israelisk barbari",
        "israelisk barbarisk",
        "israelisk bilderberg",
        "israelisk bilderberggruppen",
        "israelisk djurskydd",
        "israelisk folkmord",
        "israelisk förintelseförnekare",
        "israelisk förintelsen",
        "israelisk globalister",
        "israelisk globalisterna",
        "israelisk globalisternas",
        "israelisk graffitti",
        "israelisk gruppstrategi",
        "israelisk israel",
        "israelisk israeliska",
        "israelisk judar",
        "israelisk judarnas",
        "israelisk judendomen",
        "israelisk klotter",
        "israelisk kontrollerar",
        "israelisk sedvänja",
        "israelisk sionism",
        "israelisk sionister",
        "israelisk soros",
        "israelisk vedergällning",
        "israel israel",
        "israel israeliska",
        "israeliții",
        "israel judar",
        "israel judarna",
        "israel judarnas",
        "israel judendomen",
        "israel judisk",
        "israel judiska",
        "israel klotter",
        "israel kontrollerar",
        "israelllobbyn",
        "Israel pinkwashing",
        "israel sedvänja",
        "israel sionism",
        "israel sionister",
        "israel sionisterna",
        "israel sionistiska",
        "israel soros",
        "israel terrorist state",
        "Israel terrorist state",
        "israel vedergällning",
        "Israhe!!",
        "Israhe!! ",
        "israhell",
        "istengyilkos",
        "iszlám dzsihád",
        "iszlamista",
        "iszlamista dzsihád",
        "iudeofob",
        "iudeu",
        "Izrael",
        "izrael agresszív",
        "izrael&apartheid",
        "Izrael apartheidállam",
        "Izrael ellenes",
        "izrael-ellenesség",
        "izrael fajelmélet",
        "izrael&fajelmélet",
        "izraeli apartheid",
        "izraeli bombázás",
        "izraeli genocídium",
        "izraeli megszállás",
        "izraeli megszállók",
        "izraeli népirtás",
        "izraeli terrorállam",
        "izraeli terroristák",
        "izraeli ügynök",
        "izraeli zászló",
        "izrael&kap¶ncs",
        "izrael kap parancs",
        "izrael megszállás",
        "izrael&megszállás",
        "izrael nemzetbiztonsági kockázat",
        "izrael&nemzetbiztonsági kockázat",
        "izrael számba venni",
        "izrael&számba venni",
        "J-3-W",
        "J3W",
        "jákobként emlegett",
        "jákobozták",
        "jákob péter",
        "jasbir puar",
        "Jázaros ",
        "Jesus is Palestinian",
        "JesuswasaPalestinian",
        "Jewish a$$",
        "jewishprivilege",
        "Jewish rats",
        "jewish supremacy",
        "JewJitzu",
        "jew money",
        "jews",
        "jews are not zionists",
        "Jews are running Hollywood",
        "jews control the world",
        "Jews fooled me again",
        "jews get a taste",
        "jews hatred",
        "jews organ harvesting",
        "jewtube",
        "jew world order",
        "jidan",
        "jobbik",
        "jobbik&antiszemit",
        "jobbik&holokauszt",
        "jobbik náci",
        "jobbik& náci",
        "jobbik zsidó",
        "jobbik&zsidó",
        "jön izrael",
        "joo globalist",
        "Jooz own our media",
        "judapest",
        "judar antisemiter",
        "judar antisemitiska",
        "judar antisemitism",
        "judar antisionistiska",
        "judar apartheid",
        "judar barbari",
        "judar barbarisk",
        "judar bilderberg",
        "judar bilderberggruppen",
        "judar folkmord",
        "judar förintelsen",
        "judar globalister",
        "judar globalisterna",
        "judar globalistiska",
        "judar graffitti",
        "judar intressen",
        "judar israel",
        "judar israeliska",
        "judar judar",
        "judar judarna",
        "judar judarnas",
        "judar judendomen",
        "judar judisk",
        "judar judiska",
        "judar klotter",
        "judar kontrollerar",
        "judars antisemiter",
        "judars antisemitiska",
        "judars antisemitism",
        "judars antisionistiska",
        "judars barbari",
        "judars barbarisk",
        "judars bilderberggruppen",
        "judars djurskydd",
        "judar sedvänja",
        "judars folkmord",
        "judars förintelseförnekare",
        "judars globalister",
        "judars globalisterna",
        "judars globalistiska",
        "judars graffitti",
        "judars gruppstrategi",
        "judars intressen",
        "judar sionism",
        "judar sionister",
        "judar sionisterna",
        "judar sionistiska",
        "judars israel",
        "judars israeliska",
        "judars judar",
        "judars judarna",
        "judars judarnas",
        "judars judendomen",
        "judars judisk",
        "judars judiska",
        "judars klotter",
        "judars kontrollerar",
        "judar soros",
        "judars sedvänja",
        "judars sionism",
        "judars sionister",
        "judars sionisterna",
        "judars sionistiska",
        "judar vedergällning",
        "jude",
        "judehatet",
        "judeo",
        "judeo-bolsevik",
        "judeo-bolsevizmus",
        "judeutrotning",
        "judiada",
        "Jüdin",
        "JUDIOllywood",
        "judío nazi",
        "judíos basuras humanas",
        "judíos contra musulmanes",
        "judíos controlan la prensa",
        "judíos desgraciados ",
        "judíos dominan el mundo",
        " judíos están fuera de control ",
        "judíos están fuera de control ",
        "judios iluminati reptilianos",
        "judíos invadiendo Gaza",
        "judíos son nazi",
        "judíos son terroristas",
        "Jüdische Verschwörung",
        "judiska apartheid",
        "judiska barbari",
        "judiska barbarisk",
        "judiska bilderberg",
        "judiska bilderberggruppen",
        "judiska folkmord",
        "judiska förintelseförnekare",
        "judiska globalister",
        "judiska globalisterna",
        "judiska globalisternas",
        "judiska globalistiska",
        "judiska graffitti",
        "judiska gruppstrategi",
        "judiska intressen",
        "judiska israel",
        "judiska judar",
        "judiska judarnas",
        "judiska judendomen",
        "judiska judisk",
        "judiska judiska",
        "judiska klotter",
        "judiska kontrollerar",
        "judisk antisemiter",
        "judisk antisemitiska",
        "judiska sedvänja",
        "judiska sionism",
        "judiska sionisterna",
        "judiska soros",
        "judiska vedergällning",
        "judisk barbari",
        "judisk barbarisk",
        "judisk bilderberg",
        "judisk bilderberggruppen",
        "judisk djurskydd",
        "judisk folkmord",
        "judisk globalister",
        "judisk globalisterna",
        "judisk globalisternas",
        "judisk globalistiska",
        "judisk graffitti",
        "judisk gruppstrategi",
        "judisk intressen",
        "judisk israel",
        "judisk judar",
        "judisk judarnas",
        "judisk judisk",
        "judisk judiska",
        "judisk klotter",
        "judisk kontrollerar",
        "judisk sionism",
        "judisk sionister",
        "judisk vedergällning",
        "Juice",
        "juif",
        "juifs",
        "juive",
        "kaftános-pajeszos-kalapos",
        "kampós orr",
        "Kanye West",
        "karlendít",
        "karlendítés anticion",
        "karlendítés&anticion",
        "karlendítés antiszemit",
        "karlendítés&antiszemit",
        "karlendítés&holokauszt",
        "karlendítés izrael",
        "karlendítés&izrael",
        "karlendítés náci",
        "karlendítés& náci",
        "karlendítés zsidó",
        "karlendítés&zsidó",
        "kart lendít",
        "karvalyorrú",
        "karvalytőke",
        "kashrut",
        "Keep the world clean",
        "Keep the world Kosher",
        "kegyeletsértés&holokauszt",
        "keménymag anticion",
        "keménymag&anticion",
        "keménymag antiszemit",
        "keménymag&antiszemit",
        "keménymag holokauszt",
        "keménymag&holokauszt",
        "keménymag izrael",
        "keménymag&izrael",
        "keménymag náci",
        "keménymag& náci",
        "keménymag zsidó",
        "keménymag&zsidó",
        "készpénzre váltani a holokauszt",
        "kétállami",
        "kétállami megoldás",
        "kevin macdonald",
        "Khaybar",
        " Khaybar Jews",
        "Khaybar Khaybar Ya Yahud, Jaish Muhammad Sauf Ya’ud",
        "khazarer",
        "kiirtani",
        "kike",
        "kilobbiz anticion",
        "kilobbiz&anticion",
        "kilobbiz antiszemit",
        "kilobbiz&antiszemit",
        "kilobbiz holokauszt",
        "kilobbiz&holokauszt",
        "kilobbiz izrael",
        "kilobbiz&izrael",
        "kilobbiz& náci",
        "kilobbiz zsidó",
        "kilobbiz&zsidó",
        "kitörés évforduló",
        "kitörés hőse",
        "kiválasztot nép",
        "kiválasztott nép",
        "klánokba szerveződő",
        "kölcsön kohn",
        "kölcsön&kohn",
        "kommunista zsidó",
        "kónyi-kiss botond anticion",
        "kónyi-kiss botond&anticion",
        "kónyi-kiss botond&antiszemit",
        "kónyi-kiss botond&holokauszt",
        "kónyi-kiss botond izrael",
        "kónyi-kiss botond&izrael",
        "kónyi-kiss botond náci",
        "kónyi-kiss botond& náci",
        "kónyi-kiss botond zsidó",
        "kónyi-kiss botond&zsidó",
        "köp&bronzcipő",
        "köp duna cipő",
        "köp&duna&cipő",
        "köp emlékmű",
        "köp&emlékmű",
        "koronavírus zsidó",
        "koscher",
        "koscher antisemiter",
        "koscher antisemitism",
        "koscher antisionistiska",
        "koscher apartheid",
        "koscher barbarisk",
        "koscher bilderberggruppen",
        "koscher djurskydd",
        "koscher folkmord",
        "koscher förintelseförnekare",
        "koscher globalister",
        "koscher globalisterna",
        "koscher globalisternas",
        "koscher globalistiska",
        "koscher graffitti",
        "koscher intressen",
        "koscher israel",
        "koscher israeliska",
        "koscher judar",
        "koscher judarna",
        "koscher judarnas",
        "koscher judendomen",
        "koscher judisk",
        "koscher judiska",
        "koscher klotter",
        "koscher kontrollerar",
        "koscher sedvänja",
        "koscher sionism",
        "koscher sionister",
        "koscherslakt antisemiter",
        "koscherslakt antisemitism",
        "koscherslakt antisionistiska",
        "koscherslakt barbari",
        "koscherslakt barbarisk",
        "koscherslakt bilderberg",
        "koscherslakt bilderberggruppen",
        "koscherslakt folkmord",
        "koscherslakt förintelsen",
        "koscherslakt globalisterna",
        "koscherslakt globalisternas",
        "koscherslakt globalistiska",
        "koscherslakt gruppstrategi",
        "koscherslakt israel",
        "koscherslakt israeliska",
        "koscherslakt judarna",
        "koscherslakt judarnas",
        "koscherslakt judendomen",
        "koscherslakt judisk",
        "koscherslakt judiska",
        "koscherslakt klotter",
        "koscherslakt kontrollerar",
        "koscherslakt sedvänja",
        "koscherslakt sionism",
        "koscherslakt sionister",
        "koscherslakt sionisterna",
        "koscherslakt sionistiska",
        "koscherslakt soros",
        "koscherslakt vedergällning",
        "koscher soros",
        "koscher vedergällning",
        "kosher",
        "kosher animal abuse",
        "kosher antisemiter",
        "kosher antisemitiska",
        "kosher antisemitism",
        "kosher apartheid",
        "kosher barbari",
        "kosher barbarisk",
        "kosher bilderberg",
        "kosher bilderberggruppen",
        "kosher folkmord",
        "kosher globalister",
        "kosher globalisterna",
        "kosher globalisternas",
        "kosher globalistiska",
        "kosher graffitti",
        "kosher gruppstrategi",
        "kosher intressen",
        "kosher israel",
        "kosher judar",
        "kosher judarna",
        "kosher judarnas",
        "kosher judendomen",
        "kosher judisk",
        "kosher judiska",
        "kosher kontrollerar",
        "kosher sedvänja",
        "kosher sionism",
        "kosher sionister",
        "kosher sionistiska",
        "kosher vedergällning",
        "Köves",
        "kritikkulturen",
        "kulcsár gergely anticion",
        "kulcsár gergely&anticion",
        "kulcsár gergely antiszemit",
        "kulcsár gergely&holokauszt",
        "kulcsár gergely izrael",
        "kulcsár gergely&izrael",
        "kulcsár gergely náci",
        "kulcsár gergely& náci",
        "kulcsár gergely zsidó",
        "külföldi helytartó anticion",
        "külföldi helytartó&anticion",
        "külföldi helytartó antiszemit",
        "külföldi helytartó&antiszemit",
        "külföldi helytartó holokauszt",
        "külföldi helytartó&holokauszt",
        "külföldi helytartó izrael",
        "külföldi helytartó&izrael",
        "külföldi helytartó náci",
        "külföldi helytartó& náci",
        "külföldi helytartó zsidó",
        "külföldi helytartó&zsidó",
        "kurucinfo",
        "la extinción del pueblo judío",
        "la limpieza étnica de palestinos",
        "la Nakba de Gaza",
        "lantos jános",
        "la ocupación de Palestina",
        "lászló attila anticion",
        "lászló attila&anticion",
        "lászló attila antiszemit",
        "lászló attila&antiszemit",
        "lászló attila holokauszt",
        "lászló attila&holokauszt",
        "lászló attila izrael",
        "lászló attila&izrael",
        "lászló attila náci",
        "lászló attila& náci",
        "lászló attila zsidó",
        "lászló attila&zsidó",
        "lászló balázs anticion",
        "lászló balázs&anticion",
        "lászló balázs antiszemit",
        "lászló balázs&antiszemit",
        "lászló balázs holokauszt",
        "lászló balázs&holokauszt",
        "lászló balázs izrael",
        "lászló balázs&izrael",
        "lászló balázs náci",
        "lászló balázs& náci",
        "lászló balázs zsidó",
        "lászló balázs&zsidó",
        "legio hungaria",
        "légi támadás, csapás",
        "lenhard balázs",
        "liberális patkány",
        "liberális&patkány",
        "lobbi&anticion",
        "lobbi antiszemit",
        "lobbi&antiszemit",
        "lobbi holokauszt",
        "lobbi&holokauszt",
        "lobbi izrael",
        "lobbi&izrael",
        "lobbi náci",
        "lobbi& náci",
        "lobbi zsidó",
        "lobbi&zsidó",
        "Lobby judío",
        "lonsdale",
        "Lonsdale",
        "los cráneo de judíos",
        "los judíos controlan",
        "Los judíos son hijos de Satán",
        "luptător palestinian",
        "luptător palestinian ",
        "mag-csoportosulás",
        "mag-mozgalom",
        "magvasi adrián",
        "magyar élet mozgalom",
        "magyar élet pártja",
        "magyar gárda",
        "magyar gárd antiszemit",
        "magyar gárd&antiszemit",
        "magyar gárd holokauszt",
        "magyar gárd izrael",
        "magyar gárd náci",
        "magyar gárd zsidó",
        "magyar hajnal",
        "magyar nemzet egészét teszik felelőssé&anticion",
        "magyar nemzet egészét teszik felelőssé antiszemit",
        "magyar nemzet egészét teszik felelőssé&antiszemit",
        "magyar nemzet egészét teszik felelőssé&holokauszt",
        "magyar nemzet egészét teszik felelőssé izrael",
        "magyar nemzet egészét teszik felelőssé&izrael",
        "magyar nemzet egészét teszik felelőssé náci",
        "magyar nemzet egészét teszik felelőssé& náci",
        "magyar nemzet egészét teszik felelőssé zsidó",
        "magyar nemzet egészét teszik felelőssé&zsidó",
        "magyar nemzeti akciócsoport",
        "magyar nemzeti arcvonal",
        "magyar önvédelmi mozgalom",
        "magyarország izrael szabad préd",
        "magyarország&izrael&szabad préd",
        "mahmoud darwish",
        "Malditos asesino judíos",
        "Malditos judios",
        "malditos judios hitler",
        "malvado apartheid judío",
        "masacrar por judíos ",
        "Mauthaussen",
        "MAZSIHISZ",
        "megrongálódott anticion",
        "megrongálódott&anticion",
        "megrongálódott antiszemit",
        "megrongálódott&antiszemit",
        "megrongálódott&holokauszt",
        "megrongálódott izrael",
        "megrongálódott&izrael",
        "megrongálódott náci",
        "megrongálódott& náci",
        "megrongálódott zsidó",
        "megrongálódott&zsidó",
        "megszálló",
        "megszállt",
        "megszállt területek",
        "meine ehre heißt treue",
        "mein Kampf",
        "Meinungsfreiheit Palaestina",
        "méltósága ellen&anticion",
        "méltósága ellen antiszemit",
        "méltósága ellen&antiszemit",
        "méltósága ellen holokauszt",
        "méltósága ellen&holokauszt",
        "méltósága ellen izrael",
        "méltósága ellen&izrael",
        "méltósága ellen& náci",
        "méltósága ellen zsidó",
        "méltósága ellen&zsidó",
        "menekülttábor",
        "metélt",
        "metéltek",
        "mia",
        "Mia",
        "MIÉP",
        "Mi Hazánk",
        "mi hazánk anticion",
        "mi hazánk&anticion",
        "mi hazánk antiszemit",
        "mi hazánk&antiszemit",
        "mi hazánk holokauszt",
        "mi hazánk&holokauszt",
        "MI Hazánk Ifjai",
        "mi hazánk ifjai anticion",
        "mi hazánk ifjai&anticion",
        "mi hazánk ifjai antiszemit",
        "mi hazánk ifjai&antiszemit",
        "mi hazánk ifjai holokauszt",
        "mi hazánk ifjai&holokauszt",
        "mi hazánk ifjai izrael",
        "mi hazánk ifjai&izrael",
        "mi hazánk ifjai náci",
        "mi hazánk ifjai& náci",
        "mi hazánk ifjai zsidó",
        "mi hazánk ifjai&zsidó",
        "mi hazánk izrael",
        "mi hazánk&izrael",
        "Mi Hazánk Mozgalom",
        "mi hazánk mozgalom anticion",
        "mi hazánk mozgalom&anticion",
        "mi hazánk mozgalom antiszemit",
        "mi hazánk mozgalom&antiszemit",
        "mi hazánk mozgalom holokauszt",
        "mi hazánk mozgalom&holokauszt",
        "mi hazánk mozgalom izrael",
        "mi hazánk mozgalom&izrael",
        "mi hazánk mozgalom náci",
        "mi hazánk mozgalom& náci",
        "mi hazánk mozgalom zsidó",
        "mi hazánk mozgalom&zsidó",
        "mi hazánk náci",
        "mi hazánk& náci",
        "mi hazánk zsidó",
        "mi hazánk&zsidó",
        "mişcarea identitară creştină",
        "MLSZ",
        "mlsz anticion",
        "mlsz antiszemit",
        "mlsz holokauszt",
        "mlsz izrael",
        "mlsz náci",
        "mlsz zsidó",
        "mocskolód anticion",
        "mocskolód&anticion",
        "mocskolód antiszemit",
        "mocskolód&antiszemit",
        "mocskolód&holokauszt",
        "mocskolód izrael",
        "mocskolód&izrael",
        "mocskolód náci",
        "mocskolód& náci",
        "mocskolód zsidó",
        "mocskolód&zsidó",
        "mocskos zsidó",
        "mocskos zsidók",
        "molnár f. árpád",
        "molnár oszkár",
        "náci",
        "náci eszméket hirdet",
        "náci szimbólum",
        "náci üzenet",
        "nagytőke",
        "nakba &anticion",
        "nakba anticion",
        "nakba &antiszemit",
        "nakba antiszemit",
        "nakba day",
        "nakba &holokauszt",
        "nakba holokauszt",
        "nakba &izrael",
        "nakba izrael",
        "nakba &jeruzsálem",
        "nakba jeruzsálem",
        "nakba  náci",
        "nakba & náci",
        "nakba &palesztin",
        "nakba palesztin",
        "nakba &zsidó",
        "nakba zsidó",
        "narizón",
        "Nationalsozialis*",
        "nazi",
        "Nazi f**king IDF",
        "nazistiska",
        "nemes balázs",
        "német megszállás",
        "nem tartja jogfosztásnak anticion",
        "nem tartja jogfosztásnak&anticion",
        "nem tartja jogfosztásnak antiszemit",
        "nem tartja jogfosztásnak&antiszemit",
        "nem tartja jogfosztásnak&holokauszt",
        "nem tartja jogfosztásnak izrael",
        "nem tartja jogfosztásnak&izrael",
        "nem tartja jogfosztásnak& náci",
        "nem tartja jogfosztásnak zsidó",
        "nem tartja jogfosztásnak&zsidó",
        "nemzeti arcvonal",
        "nemzeti felszabadito mozgalom",
        "nemzeti felszabadító mozgalom",
        "nemzeti hadsereg",
        "nemzeti ifjak egyesület",
        "nemzeti radikális holokauszt",
        "nemzeti radikális&holokauszt",
        "nemzeti radikális izrael",
        "nemzeti radikális&izrael",
        "nemzeti radikális náci",
        "nemzeti radikális& náci",
        "nemzeti radikális tábor",
        "nemzeti radikális zsidó",
        "nemzeti radikális&zsidó",
        "nemzeti radikalizmus anticion",
        "nemzeti radikalizmus&anticion",
        "nemzeti radikalizmus antiszemit",
        "nemzeti radikalizmus&antiszemit",
        "nemzeti radikalizmus&holokauszt",
        "nemzeti radikalizmus izrael",
        "nemzeti radikalizmus&izrael",
        "nemzeti radikalizmus náci",
        "nemzeti radikalizmus& náci",
        "nemzeti radikalizmus zsidó",
        "nemzeti radikalizmus&zsidó",
        "nemzetiszocializmus",
        "nemzetközi nagytők anticion",
        "nemzetközi nagytők&anticion",
        "nemzetközi nagytők antiszemit",
        "nemzetközi nagytők&antiszemit",
        "nemzetközi nagytők holokauszt",
        "nemzetközi nagytők&holokauszt",
        "nemzetközi nagytők izrael",
        "nemzetközi nagytők&izrael",
        "nemzetközi nagytők náci",
        "nemzetközi nagytők& náci",
        "nemzetközi nagytők zsidó",
        "nemzetközi nagytők&zsidó",
        "nemzetrontó",
        "nemzettudat",
        "nemzetvédő anticion",
        "nemzetvédő&anticion",
        "nemzetvédő antiszemit",
        "nemzetvédő holokauszt",
        "nemzetvédő izrael",
        "nemzetvédő& náci",
        "nemzetvédő zsidó",
        "neocons*",
        "neo-nazi",
        "neonazi",
        "neo-Nazi",
        "népírtás",
        "népírtó",
        "Netanjahu",
        "Netanyahu",
        "nez sale juif",
        "nez sale juive",
        "nique feuj",
        "nique juifs",
        "nique sionistes",
        "nmr",
        "No-go zones",
        "no jew is safe",
        "no jews allowed",
        "nordiska motståndsrörelsen",
        "nordisk styrka",
        "nosebook",
        "no two states",
        "noua dreapta",
        "novák előd",
        "novák előd anticion",
        "novák előd&anticion",
        "novák előd&antiszemit",
        "novák előd&holokauszt",
        "novák előd izrael",
        "novák előd&izrael",
        "novák előd náci",
        "novák előd& náci",
        "novák előd zsidó",
        "novák előd&zsidó",
        "NSR",
        "nuevo orden mudial",
        "numerus clausus",
        "nyilas",
        "nyilvános tagadás anticion",
        "nyilvános tagadás antiszemit",
        "nyilvános tagadás&antiszemit",
        "nyilvános tagadás holokauszt",
        "nyilvános tagadás&holokauszt",
        "nyilvános tagadás izrael",
        "nyilvános tagadás&izrael",
        "nyilvános tagadás náci",
        "nyilvános tagadás& náci",
        "nyilvános tagadás zsidó",
        "nyilvános tagadás&zsidó",
        "nynazism",
        "o1g",
        "O1G",
        "Objekt 21",
        "ockupation antisemiter",
        "ockupation antisemitiska",
        "ockupation antisemitism",
        "ockupation barbari",
        "ockupation barbarisk",
        "ockupation bilderberggruppen",
        "ockupation djurskydd",
        "ockupationen antisemiter",
        "ockupationen antisemitiska",
        "ockupationen antisemitism",
        "ockupationen antisionistiska",
        "ockupationen apartheid",
        "ockupationen barbari",
        "ockupationen barbarisk",
        "ockupationen bilderberggruppen",
        "ockupationen djurskydd",
        "ockupationen förintelseförnekare",
        "ockupationen globalister",
        "ockupationen globalistiska",
        "ockupationen graffitti",
        "ockupationen gruppstrategi",
        "ockupationen intressen",
        "ockupationen israel",
        "ockupationen israeliska",
        "ockupationen judar",
        "ockupationen judarna",
        "ockupationen judarnas",
        "ockupationen judisk",
        "ockupationen judiska",
        "ockupationen kontrollerar",
        "ockupationen sedvänja",
        "ockupationen sionism",
        "ockupationen sionister",
        "ockupationen vedergällning",
        "ockupation folkmord",
        "ockupation globalister",
        "ockupation globalisterna",
        "ockupation globalisternas",
        "ockupation globalistiska",
        "ockupation graffitti",
        "ockupation gruppstrategi",
        "ockupation intressen",
        "ockupation israel",
        "ockupation israeliska",
        "ockupation judar",
        "ockupation judarna",
        "ockupation judiska",
        "ockupation klotter",
        "ockupation kontrollerar",
        "ockupation sedvänja",
        "ockupation sionism",
        "ockupation sionisterna",
        "ockupationsmakten",
        "ockupation vedergällning",
        "omskärelse",
        "omskärelse antisemitism",
        "omskärelse antisionistiska",
        "omskärelse barbarisk",
        "omskärelse bilderberg",
        "omskärelse bilderberggruppen",
        "omskärelse djurskydd",
        "omskärelse folkmord",
        "omskärelse förintelseförnekare",
        "omskärelse globalister",
        "omskärelse globalisterna",
        "omskärelse globalisternas",
        "omskärelse globalistiska",
        "omskärelse graffitti",
        "omskärelse israel",
        "omskärelse israeliska",
        "omskärelse judar",
        "omskärelse klotter",
        "omskärelse kontrollerar",
        "omskärelse sionism",
        "omskärelse sionister",
        "omskärelse sionistiska",
        "omskärelse soros",
        "omskärelse vedergällning",
        "önkényuralmi",
        "oppt ucc",
        "oppt ucc 1-308",
        "orban antisemiter",
        "orban antisemitiska",
        "orban antisemitism",
        "orban bilderberg",
        "orban bilderberggruppen",
        "orban folkmord",
        "orban globalisterna",
        "orban globalistiska",
        "orban graffitti",
        "orban gruppstrategi",
        "orbánia",
        "orban intressen",
        "orban israel",
        "orban israeliska",
        "orban judarna",
        "orban judarnas",
        "orban judendomen",
        "orban judisk",
        "orban klotter",
        "orban sedvänja",
        "orban sionister",
        "orban sionistiska",
        "orban soros",
        "orban vedergällning",
        "Orbán Viktor zsidó",
        "orosz mihály zoltán",
        "országrabló",
        "összlengyel ifjúság",
        "österreichische Legion",
        "Ostmark",
        "őszi nemzeti ellenállás anticion",
        "őszi nemzeti ellenállás&anticion",
        "őszi nemzeti ellenállás antiszemit",
        "őszi nemzeti ellenállás&antiszemit",
        "őszi nemzeti ellenállás holokauszt",
        "őszi nemzeti ellenállás&holokauszt",
        "őszi nemzeti ellenállás izrael",
        "őszi nemzeti ellenállás&izrael",
        "őszi nemzeti ellenállás náci",
        "őszi nemzeti ellenállás& náci",
        "őszi nemzeti ellenállás zsidó",
        "őszi nemzeti ellenállás&zsidó",
        "ovreii",
        "pakusza zoltán anticion",
        "pakusza zoltán&anticion",
        "pakusza zoltán antiszemit",
        "pakusza zoltán&antiszemit",
        "pakusza zoltán holokauszt",
        "pakusza zoltán&holokauszt",
        "pakusza zoltán izrael",
        "pakusza zoltán&izrael",
        "pakusza zoltán náci",
        "pakusza zoltán& náci",
        "pakusza zoltán zsidó",
        "pakusza zoltán&zsidó",
        "palestinagrupperna",
        "palestinalibre",
        "palestinian",
        "palestinieni",
        "palestinier antisemiter",
        "palestinier antisemitiska",
        "palestinier antisemitism",
        "palestinier antisionistiska",
        "palestinier barbari",
        "palestinier barbarisk",
        "palestinier bilderberg",
        "palestinier bilderberggruppen",
        "palestinier folkmord",
        "palestinier förintelseförnekare",
        "palestinier förintelsen",
        "palestinier globalister",
        "palestinier globalisterna",
        "palestinier globalisternas",
        "palestinier globalistiska",
        "palestinier graffitti",
        "palestinier gruppstrategi",
        "palestinier intressen",
        "palestinier israel",
        "palestinier israeliska",
        "palestinier judar",
        "palestinier judarna",
        "palestinier judisk",
        "palestinier klotter",
        "palestinier kontrollerar",
        "palestiniernas antisemiter",
        "palestiniernas antisemitiska",
        "palestiniernas antisemitism",
        "palestiniernas antisionistiska",
        "palestiniernas barbari",
        "palestiniernas barbarisk",
        "palestiniernas bilderberg",
        "palestiniernas bilderberggruppen",
        "palestiniernas djurskydd",
        "palestiniernas folkmord",
        "palestiniernas förintelseförnekare",
        "palestiniernas globalister",
        "palestiniernas globalisterna",
        "palestiniernas globalisternas",
        "palestiniernas graffitti",
        "palestiniernas gruppstrategi",
        "palestiniernas intressen",
        "palestiniernas israel",
        "palestiniernas israeliska",
        "palestiniernas judar",
        "palestiniernas judarna",
        "palestiniernas judarnas",
        "palestiniernas judendomen",
        "palestiniernas judisk",
        "palestiniernas judiska",
        "palestiniernas klotter",
        "palestiniernas kontrollerar",
        "palestiniernas sedvänja",
        "palestiniernas sionism",
        "palestiniernas sionister",
        "palestiniernas sionistiska",
        "palestiniernas soros",
        "palestiniernas vedergällning",
        "palestinier sedvänja",
        "palestinier sionism",
        "palestinier sionister",
        "palestinier soros",
        "palestinier vedergällning",
        "palestinsk*",
        "palesztin",
        "Palesztina",
        "palesztina bekebelez",
        "palesztin áldoz",
        "palesztin áldozat",
        "palesztin éltető",
        "palesztin gyásznap",
        "palesztin hősők",
        "palesztin irtás ",
        "palesztin&kitelepítés",
        "palesztín mártír",
        "palesztin népirtás",
        "palesztin népírtás",
        "palesztinokat irtották",
        "palesztin szabadságharc",
        "palesztin szabadságharcos",
        "parazita",
        "paraziták",
        "patkány ",
        "patkány anticion",
        "patkány&anticion",
        "patkány antiszemit",
        "patkány&antiszemit",
        "patkány holokauszt",
        "patkány&holokauszt",
        "patkány invázió",
        "patkány izrael",
        "patkány&izrael",
        "patkány& náci",
        "patkányok honfoglalása",
        "patkány zsidó",
        "patkány&zsidó",
        "patrióta sportegyesület",
        "pax hungaric",
        "Pax Hungarica Mozgalom",
        "pénzvilág anticion",
        "pénzvilág&anticion",
        "pénzvilág antiszemit",
        "pénzvilág&antiszemit",
        "pénzvilág&holokauszt",
        "pénzvilág izrael",
        "pénzvilág&izrael",
        "pénzvilág náci",
        "pénzvilág& náci",
        "pénzvilág zsidó",
        "pénzvilág&zsidó",
        "peuple élu",
        "PFLP",
        "pinches judíos",
        "pócs jános&anticion",
        "pócs jános antiszemit",
        "pócs jános&antiszemit",
        "pócs jános&holokauszt",
        "pócs jános izrael",
        "pócs jános&izrael",
        "pócs jános náci",
        "pócs jános& náci",
        "pócs jános zsidó",
        "pócs jános&zsidó",
        "política colonial",
        "pongrácz andrás",
        "Popular Front for the Liberation of Palestine",
        "póráz anticion",
        "póráz&anticion",
        "póráz antiszemit",
        "póráz&antiszemit",
        "póráz&holokauszt",
        "póráz izrael",
        "póráz&izrael",
        "póráz náci",
        "póráz& náci",
        "póráz zsidó",
        "póráz&zsidó",
        "Pörzse Sándor",
        "pray for palestine",
        "progenocidal",
        "prohászka ottokár szobr",
        "pronazistiska",
        "Propaganda control Israel",
        "propaganda judía",
        " protocols of the elders of Zion",
        "PUBG out of the Jews",
        "PUBG with the Jews",
        "Punisher skull",
        "QAnon",
        "quenelle dieudonné",
        "rabbi",
        "radical student collective",
        "radikális",
        "radikalizálódás anticion",
        "radikalizálódás&anticion",
        "radikalizálódás antiszemit",
        "radikalizálódás&antiszemit",
        "radikalizálódás&holokauszt",
        "radikalizálódás izrael",
        "radikalizálódás&izrael",
        "radikalizálódás  náci",
        "radikalizálódás& náci",
        "radikalizálódás zsidó",
        "radio islam",
        "rákosi-rendszer vezető anticion",
        "rákosi-rendszer&vezető&anticion",
        "rákosi-rendszer vezető antiszemit",
        "rákosi-rendszer&vezető&antiszemit",
        "rákosi-rendszer&vezető&holokauszt",
        "rákosi-rendszer&vezető&izrael",
        "rákosi-rendszer vezető  náci",
        "rákosi-rendszer&vezető& náci",
        "rákosi-rendszer vezető zsidó",
        "rákosi-rendszer&vezető&zsidó",
        "rakpart anticion",
        "rakpart&anticion",
        "rakpart antiszemit",
        "rakpart&antiszemit",
        "rakpart&holokauszt",
        "rakpart izrael",
        "rakpart&izrael",
        "rakpart  náci",
        "rakpart& náci",
        "rakparton felállított vascipő",
        "rakpart zsidó",
        "rakpart&zsidó",
        "rasblandning antisemiter",
        "rasblandning antisemitiska",
        "rasblandning antisemitism",
        "rasblandning apartheid",
        "rasblandning barbari",
        "rasblandning barbarisk",
        "rasblandning bilderberg",
        "rasblandning bilderberggruppen",
        "rasblandning djurskydd",
        "rasblandning folkmord",
        "rasblandning förintelseförnekare",
        "rasblandning globalister",
        "rasblandning globalisterna",
        "rasblandning globalisternas",
        "rasblandning globalistiska",
        "rasblandning graffitti",
        "rasblandning gruppstrategi",
        "rasblandning intressen",
        "rasblandning israel",
        "rasblandning israeliska",
        "rasblandning judar",
        "rasblandning judarna",
        "rasblandning judarnas",
        "rasblandning judendomen",
        "rasblandning judisk",
        "rasblandning judiska",
        "rasblandning klotter",
        "rasblandning kontrollerar",
        "rasblandning sionister",
        "rasblandning sionisterna",
        "rasblandning sionistiska",
        "rasblandning soros",
        "rasblandning vedergällning",
        "rasideologisk",
        "rasism",
        "rasrena antisemiter",
        "rasrena antisemitiska",
        "rasrena antisemitism",
        "rasrena antisionistiska",
        "rasrena apartheid",
        "rasrena barbari",
        "rasrena barbarisk",
        "rasrena bilderberg",
        "rasrena bilderberggruppen",
        "rasrena djurskydd",
        "rasrena folkmord",
        "rasrena förintelseförnekare",
        "rasrena globalister",
        "rasrena globalisterna",
        "rasrena globalisternas",
        "rasrena globalistiska",
        "rasrena graffitti",
        "rasrena gruppstrategi",
        "rasrena intressen",
        "rasrena israel",
        "rasrena israeliska",
        "rasrena judar",
        "rasrena judarnas",
        "rasrena judendomen",
        "rasrena judisk",
        "rasrena judiska",
        "rasrena klotter",
        "rasrena kontrollerar",
        "rasrena sedvänja",
        "rasrena sionism",
        "rasrena sionisterna",
        "rasrena sionistiska",
        "rasrena soros",
        "rasrena vedergällning",
        "rasrent antisemiter",
        "rasrent antisemitiska",
        "rasrent antisemitism",
        "rasrent antisionistiska",
        "rasrent apartheid",
        "rasrent barbari",
        "rasrent barbarisk",
        "rasrent bilderberggruppen",
        "rasrent djurskydd",
        "rasrent folkmord",
        "rasrent förintelseförnekare",
        "rasrent förintelsen",
        "rasrent globalister",
        "rasrent globalisterna",
        "rasrent globalisternas",
        "rasrent globalistiska",
        "rasrent graffitti",
        "rasrent gruppstrategi",
        "rasrent intressen",
        "rasrent israel",
        "rasrent israeliska",
        "rasrent judar",
        "rasrent judarna",
        "rasrent judarnas",
        "rasrent judendomen",
        "rasrent judisk",
        "rasrent judiska",
        "rasrent klotter",
        "rasrent kontrollerar",
        "rasrent sedvänja",
        "rasrent sionisterna",
        "rasrent sionistiska",
        "rasrent vedergällning",
        "rassist",
        "rassz- és nemzettudat",
        "rassztudat",
        "real devout jews",
        "real jewish people",
        "Rechtsrock",
        "rektor hamid antisemitism",
        "rektor hamid antisionistiska",
        "rektor hamid apartheid",
        "rektor hamid barbari",
        "rektor hamid bilderberg",
        "rektor hamid bilderberggruppen",
        "rektor hamid djurskydd",
        "rektor hamid folkmord",
        "rektor hamid förintelseförnekare",
        "rektor hamid globalister",
        "rektor hamid globalisterna",
        "rektor hamid globalisternas",
        "rektor hamid globalistiska",
        "rektor hamid gruppstrategi",
        "rektor hamid israel",
        "rektor hamid judar",
        "rektor hamid judendomen",
        "rektor hamid judiska",
        "rektor hamid klotter",
        "rektor hamid kontrollerar",
        "rektor hamid sionism",
        "rektor hamid sionister",
        "rektor hamid sionisterna",
        "rektor hamid sionistiska",
        "rektor hamid soros",
        "rektor hamid vedergällning",
        "rend és igazságosság",
        "rend és tisztesség",
        "Resistance is justified when Palestine is occupied",
        "robert winnicki",
        "Roger Waters",
        "rohadt zsidó",
        "romantikus erőszak anticion",
        "romantikus erőszak&anticion",
        "romantikus erőszak&antiszemit",
        "romantikus erőszak&holokauszt",
        "romantikus erőszak izrael",
        "romantikus erőszak&izrael",
        "romantikus erőszak& náci",
        "romantikus erőszak&zsidó",
        "rongálás anticion",
        "rongálás&anticion",
        "rongálás antiszemit",
        "rongálás&antiszemit",
        "rongálás&holokauszt",
        "rongálás izrael",
        "rongálás&izrael",
        "rongálás& náci",
        "rongálás zsidó",
        "rongálás&zsidó",
        "róth manó",
        "rotschild",
        "rotschildok",
        "Rotschildok",
        "roy néven anticion",
        "roy néven&anticion",
        "roy néven antiszemit",
        "roy néven&antiszemit",
        "roy néven&holokauszt",
        "roy néven izrael",
        "roy néven&izrael",
        "roy néven náci",
        "roy néven& náci",
        "roy néven zsidó",
        "roy néven&zsidó",
        "rózsadombi paktum",
        "s-a jidovit",
        "salamon nevű kereszténydemokrata ember",
        "sale feuj",
        "sale juif",
        "sales juifs",
        "saleté juive",
        "saloperie juive",
        "sarnyai vivien",
        "satanic Talmud",
        "sátáni liberalizmus",
        "scheer-komjáthy ádám",
        "schneider tamás anticion",
        "schneider tamás&anticion",
        "schneider tamás antiszemit",
        "schneider tamás&antiszemit",
        "schneider tamás holokauszt",
        "schneider tamás&holokauszt",
        "schneider tamás izrael",
        "schneider tamás&izrael",
        "schneider tamás náci",
        "schneider tamás& náci",
        "schneider tamás zsidó",
        "schneider tamás&zsidó",
        "sefarzi",
        "se jidoveste",
        "semiter",
        "settler colonialism Israel",
        "settlers",
        "sheeny",
        "Sheeny",
        "sheny",
        "Shoa",
        "Shoah",
        "sieg heil",
        "si jetait un juif",
        "siklósi beatrix",
        "sionis*",
        "sionisme",
        "sionismo es racismo",
        "sionismo = nazismo",
        "sionismo organizado",
        "sioniste",
        "sioniste sale",
        "skinheadmozgalom",
        "skinheadvezér",
        "Slomó",
        "sneider tamás anticion",
        "sneider tamás&anticion",
        "sneider tamás antiszemit",
        "sneider tamás&antiszemit",
        "sneider tamás&holokauszt",
        "sneider tamás izrael",
        "sneider tamás&izrael",
        "sneider tamás náci",
        "sneider tamás zsidó",
        "Soldatenring",
        "Solymosi Eszter",
        "solyom",
        "Sonderfall Otto",
        "Soros György",
        "soros györgy-kampány anticion",
        "soros györgy-kampány&anticion",
        "soros györgy-kampány antiszemit",
        "soros györgy-kampány&antiszemit",
        "soros györgy-kampány holokauszt",
        "soros györgy-kampány&holokauszt",
        "soros györgy-kampány izrael",
        "soros györgy-kampány&izrael",
        "soros györgy-kampány náci",
        "soros györgy-kampány& náci",
        "soros györgy-kampány zsidó",
        "soros györgy-kampány&zsidó",
        "soros-hálózat anticion",
        "soros-hálózat&anticion",
        "soros-hálózat antiszemit",
        "soros-hálózat&antiszemit",
        "soros-hálózat holokauszt",
        "soros-hálózat&holokauszt",
        "soros-hálózat izrael",
        "soros-hálózat&izrael",
        "soros-hálózat& náci",
        "soros-hálózat zsidó",
        "soros-hálózat&zsidó",
        "soros-plakát&anticion",
        "soros-plakát antiszemit",
        "soros-plakát&antiszemit",
        "soros-plakát&holokauszt",
        "soros-plakát izrael",
        "soros-plakát&izrael",
        "soros-plakát náci",
        "soros-plakát& náci",
        "soros-plakát zsidó",
        "soros-plakát&zsidó",
        "soros-terv&anticion",
        "soros-terv antiszemit",
        "soros-terv&antiszemit",
        "soros-terv&holokauszt",
        "soros-terv izrael",
        "soros-terv&izrael",
        "soros-terv& náci",
        "soros-terv zsidó",
        "soros-terv&zsidó",
        "stand up to the jews",
        "stat apartheid",
        "stfu israel",
        "stop being jews",
        "sverigedemokraterna antisemiter",
        "sverigedemokraterna antisemitiska",
        "sverigedemokraterna antisemitism",
        "sverigedemokraterna antisionistiska",
        "sverigedemokraterna apartheid",
        "sverigedemokraterna barbari",
        "sverigedemokraterna barbarisk",
        "sverigedemokraterna bilderberg",
        "sverigedemokraterna bilderberggruppen",
        "sverigedemokraterna djurskydd",
        "sverigedemokraterna förintelseförnekare",
        "sverigedemokraterna förintelsen",
        "sverigedemokraterna globalister",
        "sverigedemokraterna globalisterna",
        "sverigedemokraterna globalisternas",
        "sverigedemokraterna gruppstrategi",
        "sverigedemokraterna intressen",
        "sverigedemokraterna israel",
        "sverigedemokraterna israeliska",
        "sverigedemokraterna judar",
        "sverigedemokraterna judarna",
        "sverigedemokraterna judarnas",
        "sverigedemokraterna judendomen",
        "sverigedemokraterna judisk",
        "sverigedemokraterna judiska",
        "sverigedemokraterna klotter",
        "sverigedemokraterna kontrollerar",
        "sverigedemokraterna sedvänja",
        "sverigedemokraterna sionism",
        "sverigedemokraterna sionister",
        "sverigedemokraterna sionisterna",
        "sverigedemokraterna sionistiska",
        "sverigedemokraterna soros",
        "sverigedemokraterna vedergällning",
        "sverigedemokraterrna antisemiter",
        "sverigedemokraterrna antisemitiska",
        "sverigedemokraterrna antisionistiska",
        "sverigedemokraterrna apartheid",
        "sverigedemokraterrna barbari",
        "sverigedemokraterrna barbarisk",
        "sverigedemokraterrna bilderberg",
        "sverigedemokraterrna bilderberggruppen",
        "sverigedemokraterrna djurskydd",
        "sverigedemokraterrna folkmord",
        "sverigedemokraterrna förintelseförnekare",
        "sverigedemokraterrna förintelsen",
        "sverigedemokraterrna globalister",
        "sverigedemokraterrna globalisterna",
        "sverigedemokraterrna globalisternas",
        "sverigedemokraterrna globalistiska",
        "sverigedemokraterrna graffitti",
        "sverigedemokraterrna gruppstrategi",
        "sverigedemokraterrna intressen",
        "sverigedemokraterrna israel",
        "sverigedemokraterrna israeliska",
        "sverigedemokraterrna judar",
        "sverigedemokraterrna judarna",
        "sverigedemokraterrna judarnas",
        "sverigedemokraterrna judendomen",
        "sverigedemokraterrna judisk",
        "sverigedemokraterrna klotter",
        "sverigedemokraterrna kontrollerar",
        "sverigedemokraterrna sedvänja",
        "sverigedemokraterrna sionism",
        "sverigedemokraterrna sionister",
        "sverigedemokraterrna sionisterna",
        "sverigedemokraterrna sionistiska",
        "sverigedemokraterrna soros",
        "sverigedemokraterrna vedergällning",
        "synagogue",
        "synagogue of Satan",
        "Synagogue of Satan",
        "szabadi istván anticion",
        "szabadi istván&anticion",
        "szabadi istván&antiszemit",
        "szabadi istván&holokauszt",
        "szabadi istván izrael",
        "szabadi istván&izrael",
        "szabadi istván náci",
        "szabadi istván& náci",
        "szabadi istván zsidó",
        "szabadi istván&zsidó",
        "szabadkőműves összeesküvés",
        "szabadkőműves zsidó",
        "szabad Palesztina",
        "szabad palesztinát",
        "szabadság",
        "szabadság harcos",
        "szabadság-harcos",
        "szabadságot Palesztinának",
        "szabad szellem alapítvány",
        "szakály sándor anticion",
        "szakály sándor&anticion",
        "szakály sándor antiszemit",
        "szakály sándor&antiszemit",
        "szakály sándor holokauszt",
        "szakály sándor&holokauszt",
        "szakály sándor izrael",
        "szakály sándor&izrael",
        "szakály sándor náci",
        "szakály sándor& náci",
        "szakály sándor zsidó",
        "szakály sándor&zsidó",
        "szalai kálmán",
        "Szálasi Ferenc",
        "szálasi-idézet",
        "szávay istván",
        "Szebb jövőt",
        "szélsőjobb",
        "szélsőséges",
        "szentmis bárdosi",
        "szentmis&bárdosi",
        "szentmis bárdossy",
        "szentmis&bárdossy",
        "takaró mihály anticion",
        "takaró mihály&anticion",
        "takaró mihály antiszemit",
        "takaró mihály&antiszemit",
        "takaró mihály holokauszt",
        "takaró mihály&holokauszt",
        "takaró mihály izrael",
        "takaró mihály&izrael",
        "takaró mihály náci",
        "takaró mihály zsidó",
        "takaró mihály&zsidó",
        "Talmud",
        "Talmud matrix",
        "tanácsköztársaság anticion",
        "tanácsköztársaság&anticion",
        "tanácsköztársaság antiszemit",
        "tanácsköztársaság&antiszemit",
        "tanácsköztársaság holokauszt",
        "tanácsköztársaság&holokauszt",
        "tanácsköztársaság izrael",
        "tanácsköztársaság&izrael",
        "tanácsköztársaság náci",
        "tanácsköztársaság& náci",
        "tanácsköztársaság vezető anticion",
        "tanácsköztársaság&vezető&anticion",
        "tanácsköztársaság vezető antiszemit",
        "tanácsköztársaság&vezető&antiszemit",
        "tanácsköztársaság vezető holokauszt",
        "tanácsköztársaság&vezető&holokauszt",
        "tanácsköztársaság&vezető&izrael",
        "tanácsköztársaság&vezető& náci",
        "tanácsköztársaságvezető náci",
        "tanácsköztársaság&vezető&zsidó",
        "tanácsköztársaság zsidó",
        "tanácsköztársaság&zsidó",
        "Tätervolk",
        "Tel Aviv",
        "telepes",
        "telepesek",
        "tengertől tengerig tengely",
        "teritorii ocupate",
        "teritorii ocupate ",
        "térnyerés&anticion",
        "térnyerés&antiszemit",
        "térnyerés&holokauszt",
        "térnyerés izrael",
        "térnyerés&izrael",
        "térnyerés náci",
        "térnyerés& náci",
        "térnyerés zsidó",
        "térnyerés&zsidó",
        "terorist evreu",
        "terorist evreu ",
        "terrorállam",
        "terrorállam anticion",
        "terrorállam&anticion",
        "terrorállam antiszemit",
        "terrorállam&antiszemit",
        "terrorállam holokauszt",
        "terrorállam&holokauszt",
        "terrorállam izrael",
        "terrorállam&izrael",
        "terrorállam& náci",
        "terrorállam zsidó",
        "terrorállam&zsidó",
        "terrorista állam",
        "terrorista sionista",
        "Terror staat",
        "Terror Stadt Israel",
        "test",
        "test1",
        "test2",
        "test3",
        "testword",
        "tett és védelem",
        "Tett és Védelem Alapítvány",
        "tev",
        "TEV",
        "the elders of Zion",
        "The Goyim Know",
        "the kosher sandwich",
        "TheNoticing",
        "the real plague",
        "the struggle for Al-AQSA",
        "(((They))) [the Jews]",
        "this is what jews do",
        "tiszaeszlár",
        "tiszaeszlári per",
        "tiszta jog párt",
        "titkolt ellenállás",
        "toroczkai lászló anticion",
        "toroczkai lászló&anticion",
        "toroczkai lászló antiszemit",
        "toroczkai lászló&antiszemit",
        "toroczkai lászló holokauszt",
        "toroczkai lászló&holokauszt",
        "toroczkai lászló izrael",
        "toroczkai lászló&izrael",
        "toroczkai lászló náci",
        "toroczkai lászló& náci",
        "toroczkai lászló zsidó",
        "toroczkai lászló&zsidó",
        "turned jews into Nazis",
        "Tyirityán Zsolt",
        "új hajnal lovagrend",
        "újhorthyzmus anticion",
        "újhorthyzmus&anticion",
        "újhorthyzmus antiszemit",
        "újhorthyzmus&antiszemit",
        "újhorthyzmus&holokauszt",
        "újhorthyzmus izrael",
        "újhorthyzmus&izrael",
        "újhorthyzmus& náci",
        "újhorthyzmus zsidó",
        "újhorthyzmus&zsidó",
        "újnyilas anticion",
        "újnyilas&anticion",
        "újnyilas antiszemit",
        "újnyilas&antiszemit",
        "újnyilas&holokauszt",
        "újnyilas izrael",
        "újnyilas&izrael",
        "újnyilas mozgalom anticion",
        "újnyilas mozgalom&anticion",
        "újnyilas mozgalom antiszemit",
        "újnyilas mozgalom&antiszemit",
        "újnyilas mozgalom&holokauszt",
        "újnyilas mozgalom izrael",
        "újnyilas mozgalom&izrael",
        "újnyilas mozgalom náci",
        "újnyilas mozgalom& náci",
        "újnyilas mozgalom zsidó",
        "újnyilas mozgalom&zsidó",
        "újnyilas náci",
        "újnyilas& náci",
        "újnyilas zsidó",
        "újnyilas&zsidó",
        "ujváry gábor anticion",
        "ujváry gábor&anticion",
        "ujváry gábor antiszemit",
        "ujváry gábor&antiszemit",
        "ujváry gábor&holokauszt",
        "ujváry gábor izrael",
        "ujváry gábor&izrael",
        "ujváry gábor náci",
        "ujváry gábor& náci",
        "ujváry gábor zsidó",
        "ujváry gábor&zsidó",
        "új világrend",
        "ungern antisemitiska",
        "ungern antisemitism",
        "ungern antisionistiska",
        "ungern apartheid",
        "ungern barbari",
        "ungern bilderberg",
        "ungern bilderberggruppen",
        "ungern djurskydd",
        "ungern folkmord",
        "ungern förintelseförnekare",
        "ungern förintelsen",
        "ungern globalister",
        "ungern globalisterna",
        "ungern globalisternas",
        "ungern globalistiska",
        "ungern graffitti",
        "ungern gruppstrategi",
        "ungern intressen",
        "ungern israel",
        "ungern israeliska",
        "ungern judar",
        "ungern judendomen",
        "ungern judiska",
        "ungern klotter",
        "ungern kontrollerar",
        "ungern sedvänja",
        "ungern sionisterna",
        "ungern sionistiska",
        "ungern vedergällning",
        "United slaves of Israhell",
        "USrael",
        "vádolta izrael államot",
        "vádolva a zsidó államot",
        "vandalism",
        "varga-bíró tamás anticion",
        "varga-bíró tamás&anticion",
        "varga-bíró tamás&antiszemit",
        "varga-bíró tamás&holokauszt",
        "varga-bíró tamás izrael",
        "varga-bíró tamás&izrael",
        "varga-bíró tamás& náci",
        "varga-bíró tamás zsidó",
        "varga-bíró tamás&zsidó",
        "városi nemzeti szövetség",
        "vascipő&duna",
        "vecsési nemzeti szövetség",
        "vedergällning antisemiter",
        "vedergällning antisemitiska",
        "vedergällning antisemitism",
        "vedergällning antisionistiska",
        "vedergällning apartheid",
        "vedergällning barbari",
        "vedergällning barbarisk",
        "vedergällning bilderberg",
        "vedergällning bilderberggruppen",
        "vedergällning djurskydd",
        "vedergällning folkmord",
        "vedergällning förintelseförnekare",
        "vedergällning globalisterna",
        "vedergällning globalisternas",
        "vedergällning globalistiska",
        "vedergällning intressen",
        "vedergällning israel",
        "vedergällning israeliska",
        "vedergällning judar",
        "vedergällning judarna",
        "vedergällning judarnas",
        "vedergällning judisk",
        "vedergällning judiska",
        "vedergällning klotter",
        "vedergällning kontrollerar",
        "vedergällning sedvänja",
        "vedergällning sionism",
        "vedergällning sionister",
        "vedergällning sionisterna",
        "vedergällning sionistiska",
        "vedergällning soros",
        "vedergällning vedergällning",
        "vérbíró",
        "vérbírók",
        "vér és becsület egyesület",
        "veritas anticion",
        "veritas&anticion",
        "veritas antiszemit",
        "veritas&antiszemit",
        "veritas holokauszt",
        "veritas&holokauszt",
        "veritas izrael",
        "veritas&izrael",
        "veritas náci",
        "veritas& náci",
        "veritas történetkutató intézet anticion",
        "veritas történetkutató intézet&anticion",
        "veritas történetkutató intézet antiszemit",
        "veritas történetkutató intézet&antiszemit",
        "veritas történetkutató intézet&holokauszt",
        "veritas történetkutató intézet izrael",
        "veritas történetkutató intézet&izrael",
        "veritas történetkutató intézet náci",
        "veritas történetkutató intézet& náci",
        "veritas történetkutató intézet zsidó",
        "veritas történetkutató intézet&zsidó",
        "veritas zsidó",
        "veritas&zsidó",
        "Verschwörungstheorien",
        "vérvád",
        "vezetői zsidók",
        "victime palestiniene",
        "világkormány anticion",
        "világkormány&anticion",
        "világkormány antiszemit",
        "világkormány&antiszemit",
        "világkormány holokauszt",
        "világkormány&holokauszt",
        "világkormány izrael",
        "világkormány&izrael",
        "világkormány náci",
        "világkormány& náci",
        "világkormányzás",
        "világkormány zsidó",
        "világkormány&zsidó",
        "világrend",
        "viva al antisemitismo",
        "voleur juif",
        "Völkermord",
        "vörös mocsok anticion",
        "vörös mocsok&anticion",
        "vörös mocsok antiszemit",
        "vörös mocsok&antiszemit",
        "vörös mocsok holokauszt",
        "vörös mocsok&holokauszt",
        "vörös mocsok izrael",
        "vörös mocsok&izrael",
        "vörös mocsok náci",
        "vörös mocsok& náci",
        "vörös mocsok zsidó",
        "vörös mocsok&zsidó",
        "vörös rongyokba",
        "waffen-ss-t éltette",
        "wakeupneo",
        "wedoPUBGtotheJews",
        "weisse Wölfe",
        "white power",
        "white pro-israel",
        "White Supremacy",
        "Wilhelm Marr",
        "xenofóbia",
        "xenofobie",
        "Ye",
        "You killed Jesus",
        "youpins",
        "zagyva györgy gyula&anticion",
        "zagyva györgy gyula&antiszemit",
        "zagyva györgy gyula holokauszt",
        "zagyva györgy gyula&holokauszt",
        "zagyva györgy gyula izrael",
        "zagyva györgy gyula&izrael",
        "zagyva györgy gyula náci",
        "zagyva györgy gyula&zsidó",
        "zetényi csukás ferenc",
        "zio depravity",
        "zionazi",
        "zionazism",
        "zionis*",
        "zionism is nazism",
        "Zionism is Nazism",
        "Zionism is racism",
        "zionismisterroism",
        "Zionism is the New Nazism",
        "zionist globalist",
        "zionist globalist ",
        "zionist israhell",
        "Zionist Jewish Media",
        "ziOniSt jUicE",
        "ziOniSt jUicE ",
        "Zionist Occupied Government",
        "zionist occupiers",
        "Zionist occupiers",
        "zionist propaganda",
        "zionist scum",
        "Zionists out of Palestine",
        "zionists real terrorists",
        "zionist worst than nazis",
        "zio scums",
        "z. kárpát dániel anticion",
        "z. kárpát dániel&anticion",
        "z. kárpát dániel antiszemit",
        "z. kárpát dániel&antiszemit",
        "z. kárpát dániel holokauszt",
        "z. kárpát dániel&holokauszt",
        "z. kárpát dániel izrael",
        "z. kárpát dániel&izrael",
        "z. kárpát dániel& náci",
        "z. kárpát dániel zsidó",
        "z. kárpát dániel&zsidó",
        "ZOG",
        "zsici",
        "zsidesz",
        "zsidó",
        "zsidó ",
        "zsidó állam bojkott",
        "zsidó ávh-sok",
        "zsidóbérenc",
        "zsidóbűnözés",
        "zsidóellen*",
        "zsidóellenes",
        "zsidóellenesség",
        "zsidógyűlöl*",
        "zsidógyülőlő",
        "zsidó harapófogó",
        "zsidó hegemónia",
        "zsidók dunába",
        "zsidók felvásárol",
        "zsidók gyilkosok",
        "zsidóknak asszisztál",
        "zsidó megmondó",
        "zsidó nagytők",
        "zsidó népirtás",
        "zsidó összeesküvés",
        "zsidópóráz",
        "zsidó tempó",
        "zsidó terror",
        "zsidó terrorista",
        "zsidó terrorszervezet",
        "zsidó tőke",
        "zsidó tömeggyilkos",
        "zsidóüldöz*",
        "zsidózik",
        "zsidózó",
        "zvastica"
    ],
    "segments": [
        "Austria",
        "English",
        "French",
        "Germany",
        "Hungarian 2",
        "Hungary",
        "Magyar2",
        "Romania",
        "Spanish",
        "Sweden",
        null
    ],
    "unique_authors": 252771,
    "category_by_platform": {
        "facebook": {
            "Anti-Israel": {
                "count": 17,
                "perc": 0.000033344644359753405
            },
            "Anti-Judaism": {
                "count": 2,
                "perc": 0.000003922899336441577
            },
            "Classical Antisemitism ": {
                "count": 2,
                "perc": 0.000003922899336441577
            },
            "Conspiracy Theories": {
                "count": 4,
                "perc": 0.000007845798672883154
            },
            "Structural Antisemitism ": {
                "count": 1,
                "perc": 0.0000019614496682207886
            }
        },
        "twitter": {
            "Anti-Israel": {
                "count": 29,
                "perc": 0.00005688204037840287
            },
            "Anti-Judaism": {
                "count": 7,
                "perc": 0.00001373014767754552
            },
            "Classical Antisemitism ": {
                "count": 3,
                "perc": 0.000005884349004662366
            },
            "Conspiracy Theories": {
                "count": 1,
                "perc": 0.0000019614496682207886
            }
        }
    },
    "platform_by_category": {
        "Anti-Israel": {
            "facebook": {
                "count": 17,
                "perc": 0.000033344644359753405
            },
            "twitter": {
                "count": 29,
                "perc": 0.00005688204037840287
            }
        },
        "Anti-Judaism": {
            "facebook": {
                "count": 2,
                "perc": 0.000003922899336441577
            },
            "twitter": {
                "count": 7,
                "perc": 0.00001373014767754552
            }
        },
        "Classical Antisemitism ": {
            "facebook": {
                "count": 2,
                "perc": 0.000003922899336441577
            },
            "twitter": {
                "count": 3,
                "perc": 0.000005884349004662366
            }
        },
        "Conspiracy Theories": {
            "facebook": {
                "count": 4,
                "perc": 0.000007845798672883154
            },
            "twitter": {
                "count": 1,
                "perc": 0.0000019614496682207886
            }
        },
        "Structural Antisemitism ": {
            "facebook": {
                "count": 1,
                "perc": 0.0000019614496682207886
            }
        }
    },
    "comparison": {
        "facebook": {
            "current_period": 105004,
            "previous_period": 93325,
            "perc": 12.51
        },
        "instagram": {
            "current_period": 1634,
            "previous_period": 1636,
            "perc": -0.12
        },
        "twitter": {
            "current_period": 202750,
            "previous_period": 176432,
            "perc": 14.92
        }
    },
    "age_gender_analysis": {
        "27-35": {
            "male": 211230,
            "N/A": 134821,
            "female": 22347
        },
        "13-26": {
            "N/A": 112799,
            "male": 27736,
            "female": 7660
        },
        "N/A": {
            "N/A": 53843
        },
        "unable to determine": {
            "N/A": 6117
        },
        "36-45": {
            "male": 5634
        },
        "45-55": {
            "male": 4183
        }
    },
    "activity_for_country": {
        "N/A": {
            "num_posts": 74845,
            "percentage_change": 35.57
        },
        "United States": {
            "num_posts": 29238,
            "percentage_change": 37.15
        },
        "Hungary": {
            "num_posts": 9954,
            "percentage_change": 157.41
        },
        "France": {
            "num_posts": 7563,
            "percentage_change": 80.03
        },
        "Germany": {
            "num_posts": 7053,
            "percentage_change": 475.76
        }
    },
    "category_analysis": {
        "Anti-Israel": {
            "count": 46,
            "perc": 0.00009022668473815627
        },
        "Anti-Judaism": {
            "count": 9,
            "perc": 0.000017653047013987096
        },
        "Classical Antisemitism ": {
            "count": 5,
            "perc": 0.000009807248341103943
        },
        "Conspiracy Theories": {
            "count": 5,
            "perc": 0.000009807248341103943
        },
        "Structural Antisemitism ": {
            "count": 1,
            "perc": 0.0000019614496682207886
        }
    },
    "top_words": {
        "facebook": [
            {
                "word": "Gaza",
                "perc": 0.026609842008070584
            },
            {
                "word": "ethnic cleansing",
                "perc": 0.025695061897271047
            },
            {
                "word": "Hamas",
                "perc": 0.024382737158881063
            }
        ],
        "instagram": [
            {
                "word": "palestinian",
                "perc": 0.054333764553686936
            },
            {
                "word": "Gaza",
                "perc": 0.05304010349288486
            },
            {
                "word": "jews",
                "perc": 0.03648124191461837
            }
        ],
        "tiktok": [
            {
                "word": "genocide in gaza",
                "perc": 0.5
            },
            {
                "word": "ethnically cleansing",
                "perc": 0.16666666666666666
            },
            {
                "word": "hummus are not terrorists",
                "perc": 0.16666666666666666
            }
        ],
        "twitter": [
            {
                "word": "Gaza",
                "perc": 0.017558882425860588
            },
            {
                "word": "ethnic cleansing",
                "perc": 0.01486221035567846
            },
            {
                "word": "Hamas",
                "perc": 0.012932201773624488
            }
        ],
        "youtube": [
            {
                "word": "israelisk globalisternas",
                "perc": 0.002708867978329056
            },
            {
                "word": "folkförrädare sedvänja",
                "perc": 0.0026375819788993443
            },
            {
                "word": "afs israel",
                "perc": 0.0026375819788993443
            },
            {
                "word": "szentmis&bárdossy",
                "perc": 0.0025662959794696323
            }
        ]
    },
    "cloud": [
        {
            "word": "Israel",
            "color": "#F06543",
            "size": 1
        },
        {
            "word": "genocide",
            "color": "#F06543",
            "size": 0.5868185751370061
        },
        {
            "word": "freepalestine",
            "color": "#F06543",
            "size": 0.5710989327949235
        },
        {
            "word": "gaza",
            "color": "#F06543",
            "size": 0.5520623017017594
        },
        {
            "word": "Palestine",
            "color": "#F06543",
            "size": 0.3775598500144217
        },
        {
            "word": "Hamas",
            "color": "#F06543",
            "size": 0.37496394577444475
        },
        {
            "word": "israel",
            "color": "#F06543",
            "size": 0.3658782809345255
        },
        {
            "word": "Jews",
            "color": "#F06543",
            "size": 0.36414767810787424
        },
        {
            "word": "palestine",
            "color": "#F06543",
            "size": 0.33948658782809343
        },
        {
            "word": "gazagenocide",
            "color": "#F06543",
            "size": 0.3275165849437554
        },
        {
            "word": "South Africa",
            "color": "#F06543",
            "size": 0.1968560715315835
        },
        {
            "word": "Palestinians",
            "color": "#F06543",
            "size": 0.19339486587828095
        },
        {
            "word": "ceasefirenow",
            "color": "#F06543",
            "size": 0.17810787424286126
        },
        {
            "word": "gazaunderattack",
            "color": "#F06543",
            "size": 0.16253244880299972
        },
        {
            "word": "antisemitism",
            "color": "#F06543",
            "size": 0.1603691952696856
        },
        {
            "word": "endisraelsgenocide",
            "color": "#F06543",
            "size": 0.15935967695413902
        },
        {
            "word": "Zionist",
            "color": "#F06543",
            "size": 0.13801557542543985
        },
        {
            "word": "Zionists",
            "color": "#F06543",
            "size": 0.13628497259878858
        },
        {
            "word": "freegaza",
            "color": "#F06543",
            "size": 0.12388231900778772
        },
        {
            "word": "Izrael",
            "color": "#F06543",
            "size": 0.11897894433227574
        },
        {
            "word": "fromtherivertothesea",
            "color": "#F06543",
            "size": 0.11724834150562446
        },
        {
            "word": "hamas",
            "color": "#F06543",
            "size": 0.11710412460340353
        },
        {
            "word": "Zionism",
            "color": "#F06543",
            "size": 0.11695990770118257
        },
        {
            "word": "icj",
            "color": "#F06543",
            "size": 0.11695990770118257
        },
        {
            "word": "ethniccleansing",
            "color": "#F06543",
            "size": 0.11494087107008942
        },
        {
            "word": "war",
            "color": "#F06543",
            "size": 0.11075858090568215
        },
        {
            "word": "ceasefire",
            "color": "#F06543",
            "size": 0.1077300259590424
        },
        {
            "word": "Netanyahu",
            "color": "#F06543",
            "size": 0.10758580905682145
        },
        {
            "word": "yemen",
            "color": "#F06543",
            "size": 0.10383616959907702
        },
        {
            "word": "stopgenocide",
            "color": "#F06543",
            "size": 0.09994231323911162
        },
        {
            "word": "southafrica",
            "color": "#F06543",
            "size": 0.09777905970579752
        },
        {
            "word": "jerusalem",
            "color": "#F06543",
            "size": 0.09648110758580905
        },
        {
            "word": "endisraeliapartheid",
            "color": "#F06543",
            "size": 0.09576002307470435
        },
        {
            "word": "zionismisterrorism",
            "color": "#F06543",
            "size": 0.09547158927026247
        },
        {
            "word": "terrorist",
            "color": "#F06543",
            "size": 0.0951831554658206
        },
        {
            "word": "Jewish",
            "color": "#F06543",
            "size": 0.0951831554658206
        },
        {
            "word": "gazaholocaust",
            "color": "#F06543",
            "size": 0.09402942024805307
        },
        {
            "word": "Hitler",
            "color": "#F06543",
            "size": 0.0922988174214018
        },
        {
            "word": "ceasefireingazanow",
            "color": "#F06543",
            "size": 0.09042399769252957
        },
        {
            "word": "genocidio",
            "color": "#F06543",
            "size": 0.09013556388808769
        },
        {
            "word": "israeliapartheid",
            "color": "#F06543",
            "size": 0.08970291318142486
        },
        {
            "word": "Palestinian",
            "color": "#F06543",
            "size": 0.08681857513700605
        },
        {
            "word": "propaganda",
            "color": "#F06543",
            "size": 0.08537640611479666
        },
        {
            "word": "occupation",
            "color": "#F06543",
            "size": 0.08364580328814537
        },
        {
            "word": "freedom",
            "color": "#F06543",
            "size": 0.08364580328814537
        },
        {
            "word": "palestinalibre",
            "color": "#F06543",
            "size": 0.08306893567926162
        },
        {
            "word": "israelioccupation",
            "color": "#F06543",
            "size": 0.08119411595038939
        },
        {
            "word": "Yemen",
            "color": "#F06543",
            "size": 0.08076146524372657
        },
        {
            "word": "warcrimesingaza",
            "color": "#F06543",
            "size": 0.07989616383040092
        },
        {
            "word": "Holocaust",
            "color": "#F06543",
            "size": 0.07975194692817998
        },
        {
            "word": "israelterroriststate",
            "color": "#F06543",
            "size": 0.07917507931929622
        },
        {
            "word": "Jesus",
            "color": "#F06543",
            "size": 0.07903086241707528
        },
        {
            "word": "Israeli",
            "color": "#F06543",
            "size": 0.07859821171041247
        },
        {
            "word": "alaqsa",
            "color": "#F06543",
            "size": 0.07715604268820306
        },
        {
            "word": "jews",
            "color": "#F06543",
            "size": 0.07701182578598212
        },
        {
            "word": "free",
            "color": "#F06543",
            "size": 0.07297375252379579
        },
        {
            "word": "idfterrorist",
            "color": "#F06543",
            "size": 0.07210845111047015
        },
        {
            "word": "zionismisnazism",
            "color": "#F06543",
            "size": 0.0698009806749351
        },
        {
            "word": "usa",
            "color": "#F06543",
            "size": 0.06951254687049323
        },
        {
            "word": "palestinewillbefree",
            "color": "#F06543",
            "size": 0.06893567926160946
        },
        {
            "word": "savepalestine",
            "color": "#F06543",
            "size": 0.067637727141621
        },
        {
            "word": "zionistterror",
            "color": "#F06543",
            "size": 0.06720507643495818
        },
        {
            "word": "zionist",
            "color": "#F06543",
            "size": 0.06720507643495818
        },
        {
            "word": "people",
            "color": "#F06543",
            "size": 0.06518603980386502
        },
        {
            "word": "israelicrime",
            "color": "#F06543",
            "size": 0.06518603980386502
        },
        {
            "word": "warcrimes",
            "color": "#F06543",
            "size": 0.06460917219498125
        },
        {
            "word": "humanityforall",
            "color": "#F06543",
            "size": 0.0644649552927603
        },
        {
            "word": "netanyahuwarcriminal",
            "color": "#F06543",
            "size": 0.06417652148831843
        },
        {
            "word": "forthesakeofgod",
            "color": "#F06543",
            "size": 0.06388808768387655
        },
        {
            "word": "endisraelgenocide",
            "color": "#F06543",
            "size": 0.06388808768387655
        }
    ]}