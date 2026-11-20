
class Guardia {
    constructor(id, sector, valorHora, cuposDisponibles) {
        this.id = id;
        this.sector = sector;
        this.valorHora = valorHora;
        this.cuposDisponibles = cuposDisponibles;
    }

    asignarCupo(cantidad) {
        if (cantidad <= 0 || isNaN(cantidad)) {
            console.warn(`⚠️ Cantidad inválida para el sector ${this.sector}.`);
            return false;
        }
        if (cantidad > this.cuposDisponibles) {
            console.warn(`❌ No hay suficientes cupos en ${this.sector}. Disponibles: ${this.cuposDisponibles}`);
            return false;
        }
        this.cuposDisponibles -= cantidad;
        console.log(`✅ Se asignaron ${cantidad} cupo(s) en ${this.sector}. Cupos restantes: ${this.cuposDisponibles}`);
        return true;
    }

    calcularLiquidacion(horas) {
        let subtotal = this.valorHora * horas;
        if (horas > 24) {
            subtotal *= 1.1;
            console.log(`⭐ Plus del 10% aplicado en ${this.sector} por superar las 24 horas.`);
        }
        return subtotal;
    }
}

const guardiaDiurna = new Guardia(1, "Guardia Diurna", 6500, 5);
const guardiaNocturna = new Guardia(2, "Guardia Nocturna / Feriado", 8500, 4);
const guardiaRefuerzo = new Guardia(3, "Guardia de Refuerzo", 7500, 6);

const guardiasDisponibles = [guardiaDiurna, guardiaNocturna, guardiaRefuerzo];

console.log("🩺 Iniciando simulador con Clases y Objetos...");
guardiaDiurna.asignarCupo(1);
console.log("Simulación 12h Guardia Diurna: $" + guardiaDiurna.calcularLiquidacion(12));
console.log("Simulación 26h Guardia Nocturna: $" + guardiaNocturna.calcularLiquidacion(26));

const sectoresActivos = ["Clínica Médica", "Pediatría", "Guardia General", "Quirófano", "Neonatología"];
sectoresActivos.push("Traumatología");
sectoresActivos.unshift("Terapia Intensiva");
const sectorEliminado = sectoresActivos.pop();
console.log(`Se ha eliminado el elemento: ${sectorEliminado}`);

const buscado = prompt("¿Qué sector querés consultar? (Ej: Pediatría, Quirófano)");
if (buscado && sectoresActivos.includes(buscado)) {
    console.log(`✅ "${buscado}" está en la posición ${sectoresActivos.indexOf(buscado)}.`);
} else {
    console.log(`❌ "${buscado}" no figura en la lista de sectores.`);
}

sectoresActivos.splice(2, 1, "Emergentología");

function pedirHoras(nombreSector) {
    let horas = Number(prompt(`Ingresá la cantidad de horas para ${nombreSector}:`));
    while (isNaN(horas) || horas <= 0) {
        alert("Ingresá un número mayor a 0.");
        horas = Number(prompt(`Ingresá nuevamente las horas para ${nombreSector}:`));
    }
    return horas;
}

const mostrarResumenParcial = (sector, horas, monto) => {
    const mensaje = `Sector: ${sector} | Horas: ${horas} | Subtotal: $${monto}`;
    console.log("📋 " + mensaje);
    alert(mensaje);
};

function listarSectores(lista) {
    console.log("--- Sectores habilitados ---");
    for (const item of lista) {
        console.log(`Sector: ${item}`);
    }
}

listarSectores(sectoresActivos);

let totalGeneral = 0;
let seguirSimulando = true;

alert("Bienvenido al simulador de guardias con Programación Orientada a Objetos.");

while (seguirSimulando) {
    let opcion = prompt(
        "Elegí una guardia (1, 2 o 3) o escribí 'ESC' para salir:\n" +
        "1 - Guardia Diurna ($6500/h)\n" +
        "2 - Guardia Nocturna / Feriado ($8500/h)\n" +
        "3 - Guardia de Refuerzo ($7500/h)"
    );

    if (opcion === null || opcion.toUpperCase() === "ESC") {
        seguirSimulando = false;
        break;
    }

    const indice = Number(opcion) - 1;
    if (isNaN(indice) || indice < 0 || indice >= guardiasDisponibles.length) {
        alert("⚠️ Opción no válida. Elegí 1, 2, 3 o ESC.");
        continue;
    }

    const guardiaSeleccionada = guardiasDisponibles[indice];
    const horasCargadas = pedirHoras(guardiaSeleccionada.sector);
    const montoTurno = guardiaSeleccionada.calcularLiquidacion(horasCargadas);

    guardiaSeleccionada.asignarCupo(1);
    mostrarResumenParcial(guardiaSeleccionada.sector, horasCargadas, montoTurno);
    totalGeneral += montoTurno;

    const respuesta = prompt("¿Querés cargar otra guardia? Escribí 'NO' para terminar.");
    if (respuesta && respuesta.toUpperCase() === "NO") {
        seguirSimulando = false;
    }
}

console.log("========================================");
console.log(`💵 Total acumulado a liquidar: $${totalGeneral}`);
console.log("========================================");
alert(`Simulación finalizada.\nTotal acumulado: $${totalGeneral}`);