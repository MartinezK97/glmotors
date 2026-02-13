// Función para manejar fechas con configuración personalizada
function manejarInputFecha(input) {
    const valor = input.value;
    if (!valor) return;
    
    const [anio, mesNumero, dia] = valor.split('-');
    
    const meses = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    
    const mesNombre = meses[parseInt(mesNumero) - 1] || '';
    
    // Obtener configuración desde atributos data-*
    const config = {
        dia: input.dataset.relDia || 'day',
        mes: input.dataset.relMes || 'month',
        anio: input.dataset.relAnio || 'year'
    };
    
    // Actualizar spans según configuración
    const spanDia = document.getElementById(config.dia);
    const spanMes = document.getElementById(config.mes);
    const spanAnio = document.getElementById(config.anio);
    
    if (spanDia) spanDia.textContent = dia;
    if (spanMes) spanMes.textContent = mesNombre;
    if (spanAnio) spanAnio.textContent = anio;
}

// Event delegation única para todos los inputs
document.addEventListener('input', function(event) {
    const input = event.target;
    
    // Inputs normales con clase .input-data
    if (input.classList.contains('input-data') && input.type !== 'date') {
        const targetId = input.getAttribute('rel');
        const targetSpan = document.getElementById(targetId);
        if (targetSpan) {
            targetSpan.textContent = input.value;
        }
    }
    
    // Inputs de fecha (con o sin clase .input-data)
    if (input.type === 'date') {
        manejarInputFecha(input);
    }
});

// Inicialización completa
document.addEventListener('DOMContentLoaded', function() {
    // Inputs normales
    document.querySelectorAll('.input-data:not([type="date"])').forEach(input => {
        if (input.value) {
            const targetId = input.getAttribute('rel');
            const targetSpan = document.getElementById(targetId);
            if (targetSpan) {
                targetSpan.textContent = input.value;
            }
        }
    });
    
    // Inputs de fecha
    document.querySelectorAll('input[type="date"]').forEach(input => {
        if (input.value) {
            manejarInputFecha(input);
        }
    });
});