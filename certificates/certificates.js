document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('certificate-modal');
    const modalImg = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeBtn = document.querySelector('.close-modal');
    
    const viewBtns = document.querySelectorAll('.view-btn');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.certificate-card');
            const img = card.querySelector('img');
            const title = card.querySelector('h3').textContent;
            const description = card.querySelector('.certificate-description').textContent;
            
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; 
            
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);
        });
    });
    
    function closeModal() {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    
    
});
