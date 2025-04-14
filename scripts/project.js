document.addEventListener('DOMContentLoaded', function() {
    // Create image modal
    createImageModal();
    
    // Setup expandable sections
    setupExpandables();
    
    // Initialize reading progress bar
    initProgressBar();
    
    // Handle mobile navigation
    setupMobileNav();
});

// Create and handle image modal functionality
function createImageModal() {
    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const modalImg = document.createElement('img');
    modalContent.appendChild(modalImg);
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close';
    closeBtn.innerHTML = '×';
    
    modal.appendChild(modalContent);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
    
    // Get all gallery images
    const galleryImages = document.querySelectorAll('.media-item img');
    
    // Add click event to each gallery image
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            modalImg.src = this.src;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal when clicking close button or outside the image
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Setup expandable content sections
function setupExpandables() {
    const expandables = document.querySelectorAll('.expandable');
    
    expandables.forEach(expandable => {
      const header = expandable.querySelector('.expandable-header');
      
      // Set initial ARIA attributes
      header.setAttribute('aria-expanded', 'false');
      header.setAttribute('role', 'button');
      header.setAttribute('tabindex', '0');
      
      // Toggle on click
      header.addEventListener('click', function() {
        toggleExpandable(expandable);
      });
      
      // Add keyboard support
      header.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleExpandable(expandable);
        }
      });
    });
  }
  
  function toggleExpandable(expandable) {
    const isExpanded = expandable.classList.contains('active');
    const header = expandable.querySelector('.expandable-header');
    
    // Toggle active state
    expandable.classList.toggle('active');
    
    // Update ARIA attributes
    header.setAttribute('aria-expanded', !isExpanded);
  }

// Initialize reading progress bar
function initProgressBar() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.appendChild(progressBar);
    
    // Update progress bar width on scroll
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        progressBar.style.width = scrolled + '%';
    });
}

// Setup mobile navigation
function setupMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
}
