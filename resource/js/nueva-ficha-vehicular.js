// Función para cargar una ficha vehicular
function cargarFichaVehicular(contenedor) {
    fetch('resource/components/ficha-vehicular.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar la ficha vehicular');
            }
            return response.text();
        })
        .then(data => {
            contenedor.innerHTML = data;
        })
        .catch(error => {
            console.error('Error:', error);
            contenedor.innerHTML = '<p>Error al cargar la ficha vehicular</p>';
        });
}

// Función para agregar nueva ficha
function agregarNuevaFicha() {
    console.log("AgregarNuevaFicha() ejecutada");
    
    // Crear un nuevo elemento section con clase a4
    const nuevaFicha = document.createElement('section');
    nuevaFicha.className = 'paper';
    
    // Agregar la nueva ficha al contenedor principal (.content-printable)
    const contenedorPrincipal = document.querySelector('.a4');
    contenedorPrincipal.prepend(nuevaFicha);
    
    // Cargar el contenido de ficha-vehicular.html dentro de la nueva ficha
    cargarFichaVehicular(nuevaFicha);
}

// Función para imprimir todas las fichas
function print2(element) {
    var elem= document.getElementById(element);
    var contenido = elem.innerHTML;
     var contenidoOriginal= document.body.innerHTML;
     document.body.style.gridTemplateColumns = '1fr';

     document.body.innerHTML = contenido;

    window.print();

     document.body.innerHTML = contenidoOriginal;
}

function print(elementId) {
    // Obtener el elemento
    var elem = document.getElementById(elementId);
    if (!elem) {
        console.error('Elemento no encontrado');
        alert("No se ha detectado el documento a imprimir");
        return;
    }

    // Crear un iframe oculto
    var iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    iframe.style.opacity = '0';
    iframe.style.pointerEvents = 'none';
    document.body.appendChild(iframe);

    // Obtener el contenido del elemento
    var content = elem.innerHTML;

    // Obtener todos los estilos de la página original
    var styles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'));
    var styleLinks = '';
    styles.forEach(function(style) {
        if (style.tagName === 'LINK') {
            styleLinks += '<link rel="stylesheet" href="' + style.href + '">';
        } else {
            styleLinks += '<style>' + style.innerHTML + '</style>';
        }
    });

    // Escribir el contenido en el iframe
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(`
        <html>
            <head>
                <title>Imprimir</title>
                ${styleLinks}
            </head>
            <body style="grid-template-columns:1fr;">
                ${content}
            </body>
        </html>
    `);
    iframeDoc.close();

    // Esperar a que los estilos se carguen (especialmente para hojas externas)
    iframe.onload = function() {
        // Llamar a la impresión en el iframe
        iframe.contentWindow.focus();
        iframe.contentWindow.print();

        // Remover el iframe después de un tiempo (cuando se cierre el diálogo de impresión)
        setTimeout(function() {
            document.body.removeChild(iframe);
        }, 1000);
    };

    // Si no hay hojas de estilo externas, el onload puede no dispararse, así que lo forzamos
    iframe.onload();
}

// Configuración inicial y eventos
document.addEventListener('DOMContentLoaded', function() {
    // Verificar que existe al menos un elemento .a4
    const A4 = document.querySelector('#a4');
    if (A4) {
        cargarFichaVehicular(A4);
    }
});