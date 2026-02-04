document.addEventListener('DOMContentLoaded', function () {
    // function onQrConfClick(element) {
    //     console.log('Elemento clickeado:', element);
    //     alert('Click');
        
    // }
    
    // document.addEventListener('click', function (e) {
    //     const qr = e.target.closest('.qr_conf');
    //     if (!qr) return;
    
    //     onQrConfClick(qr);
    // });

    document.getElementById('qr-active').addEventListener('click', function() {
        const qrElements = document.querySelectorAll('.qr_conf');
        const button = this;
        
        // Alternar clase en cada elemento
        qrElements.forEach(element => {
            element.classList.toggle('nodisplay');
        });
        
        // Opcional: Cambiar texto del botón
        const isHidden = qrElements[0] && qrElements[0].classList.contains('nodisplay');
        button.textContent = isHidden ? 'Mostrar QR' : 'Ocultar QR';
    });
});
    