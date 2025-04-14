document.addEventListener('DOMContentLoaded', function() {
    const multiImages = document.querySelectorAll('.multi-image img');
    
    multiImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            const popup = document.createElement('div');
            popup.className = 'popup-image';
            popup.innerHTML = `
                <span class="close">&times;</span>
                <img src="${img.src}" alt="${img.alt}">
                <div class="prev">❮</div>
                <div class="next">❯</div>
            `;
            
            document.body.appendChild(popup);
            
            let currentIndex = index;
            const images = Array.from(multiImages);
            
            const closeBtn = popup.querySelector('.close');
            const prevBtn = popup.querySelector('.prev');
            const nextBtn = popup.querySelector('.next');
            const popupImg = popup.querySelector('img');
            
            closeBtn.onclick = () => popup.remove();
            
            prevBtn.onclick = () => {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                popupImg.src = images[currentIndex].src;
                popupImg.alt = images[currentIndex].alt;
            };
            
            nextBtn.onclick = () => {
                currentIndex = (currentIndex + 1) % images.length;
                popupImg.src = images[currentIndex].src;
                popupImg.alt = images[currentIndex].alt;
            };
        });
    });
    const galleries = document.querySelectorAll('.gallery');
    
    galleries.forEach(gallery => {
        const overlay = gallery.querySelector('.gallery-overlay');
        const images = gallery.querySelectorAll('img');
        
        overlay.addEventListener('click', () => {
            const popup = document.createElement('div');
            popup.className = 'popup-image';
            popup.innerHTML = `
                <span>&times;</span>
                <img src="${images[0].src}" alt="${images[0].alt}">
                <div class="prev">❮</div>
                <div class="next">❯</div>
            `;
            
            document.body.appendChild(popup);
            popup.style.display = 'block';
            
            let currentIndex = 0;
            const closeBtn = popup.querySelector('span');
            const prevBtn = popup.querySelector('.prev');
            const nextBtn = popup.querySelector('.next');
            const popupImg = popup.querySelector('img');
            
            closeBtn.onclick = () => {
                popup.remove();
            };
            
            prevBtn.onclick = () => {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                popupImg.src = images[currentIndex].src;
                popupImg.alt = images[currentIndex].alt;
            };
            
            nextBtn.onclick = () => {
                currentIndex = (currentIndex + 1) % images.length;
                popupImg.src = images[currentIndex].src;
                popupImg.alt = images[currentIndex].alt;
            };
        });
    });

        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const navItems = document.querySelectorAll('.nav-links a'); // Select all nav links

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    
        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!event.target.closest('.navbar')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });

        // Close menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');

            }
        });

        // Close menu when a nav link is clicked (works for #fragment links too)
        navItems.forEach(link => {
            link.addEventListener('click', () => {
                setTimeout(() => {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }, 0); // Delay ensures the link navigation happens before closing
            });
        });


        const cards = document.querySelectorAll(".experience-card");
    let highestZIndex = 1; // Track highest z-index
    const experienceSection = document.querySelector(".experience");
    
    // Check if we're on a mobile device or small screen
    function isMobileView() {
        return window.innerWidth < 1024;
    }
    
    function setupCards() {
        // If on desktop (>1024px), use absolute positioning with draggable cards
        if (!isMobileView()) {
            // Predefined starting positions (x, y)
            const positions = [
                { x: 381 - 300, y: 197 },
                { x: 663 - 300, y: 370 },
                { x: 527 - 300, y: 621 },
                { x: 1031 - 350, y: 184 },
                { x: 910 - 300, y: 525 }
            ];
            
            // Set the height for the experience section
            experienceSection.style.height = "1000px";
            
            // Calculate the center offset to position the entire formation in the center
            const experienceSectionWidth = experienceSection.offsetWidth;
            const formationWidth = 1200; // Approximate width of the card formation
            const centerOffset = Math.max(0, (experienceSectionWidth - formationWidth) / 2);
            
            cards.forEach((card, index) => {
                // Remove any grid styling
                card.style.position = "absolute";
                
                let posX = positions[index]?.x || Math.random() * 400;
                let posY = positions[index]?.y || Math.random() * 400;
                
                // Add the center offset to position the formation in the center
                posX = posX + centerOffset;
                
                card.style.left = `${posX}px`;
                card.style.top = `${posY}px`;
                
                const titleBar = card.querySelector(".macos-title-bar");
                
                titleBar.addEventListener("mousedown", (e) => {
                    let shiftX = e.clientX - card.getBoundingClientRect().left;
                    let shiftY = e.clientY - card.getBoundingClientRect().top;
                    
                    // Bring the current card to the top
                    highestZIndex++;
                    card.style.zIndex = highestZIndex;
                    
                    function moveAt(clientX, clientY) {
                        let section = document.querySelector(".experience");
                        let sectionRect = section.getBoundingClientRect();
                        
                        let newX = clientX - shiftX - sectionRect.left;
                        let newY = clientY - shiftY - sectionRect.top;
                        
                        // Keep card within section bounds
                        newX = Math.max(0, Math.min(newX, sectionRect.width - card.offsetWidth));
                        newY = Math.max(0, Math.min(newY, sectionRect.height - card.offsetHeight));
                        
                        card.style.left = `${newX}px`;
                        card.style.top = `${newY}px`;
                    }
                    
                    function onMouseMove(event) {
                        moveAt(event.clientX, event.clientY);
                    }
                    
                    document.addEventListener("mousemove", onMouseMove);
                    document.addEventListener("mouseup", () => {
                        document.removeEventListener("mousemove", onMouseMove);
                    }, { once: true });
                });
                
                titleBar.ondragstart = () => false;
            });
        } else {
            // For mobile views, use grid layout instead
            experienceSection.style.height = "auto";
            
            // Remove absolute positioning and apply grid styles
            cards.forEach(card => {
                card.style.position = "";
                card.style.left = "";
                card.style.top = "";
                card.style.zIndex = "";
                card.style.width = "";
            });
            
            // Remove event listeners for mobile view
            cards.forEach(card => {
                const titleBar = card.querySelector(".macos-title-bar");
                titleBar.style.cursor = "default";
                
                // Clone the element to remove all event listeners
                const newTitleBar = titleBar.cloneNode(true);
                titleBar.parentNode.replaceChild(newTitleBar, titleBar);
            });
        }
    }
    
    // Initial setup
    setupCards();
    
    // Update on window resize
    window.addEventListener("resize", setupCards);
    });