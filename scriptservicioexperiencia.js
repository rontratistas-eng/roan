document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.service-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Activar botón
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            cards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hide');
                    card.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('imgFull');
    const captionText = document.getElementById('caption');
    const cards = document.querySelectorAll('.service-card');

    cards.forEach(card => {
        card.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('h3').innerText;
            
            modal.style.display = "flex";
            setTimeout(() => modal.classList.add('active'), 10);
            modalImg.src = img.src;
            captionText.innerHTML = title;
        });
    });

    // Cerrar al hacer clic en la X o fuera de la imagen
    modal.onclick = function() {
        modal.classList.remove('active');
        setTimeout(() => modal.style.display = "none", 300);
    };
});
