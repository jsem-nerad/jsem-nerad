function initImageComparison() {
    const comparisonSliders = document.querySelectorAll('.image-comparison-slider');
    
    comparisonSliders.forEach(slider => {
      const container = slider.querySelector('.comparison-container');
      const modifiedImage = slider.querySelector('.image-modified');
      const sliderHandle = slider.querySelector('.slider-handle');
      const sliderLine = slider.querySelector('.slider-line');
      const labels = slider.querySelectorAll('.comparison-label');
      
      let isDragging = false;
      
      positionSlider(50);
      
      const allImages = slider.querySelectorAll('img');
      let imagesLoaded = 0;
      
      allImages.forEach(img => {
        if (img.complete) {
          imageLoaded();
        } else {
          img.addEventListener('load', imageLoaded);
          img.addEventListener('error', imageLoaded);
        }
      });
      
      function imageLoaded() {
        imagesLoaded++;
        if (imagesLoaded === allImages.length) {
          setupSlider();
        }
      }
      
      function setupSlider() {
        sliderHandle.addEventListener('mousedown', startDrag);
        sliderHandle.addEventListener('touchstart', startDrag);
        
        container.addEventListener('mousemove', drag);
        container.addEventListener('touchmove', drag);
        
        window.addEventListener('mouseup', endDrag);
        window.addEventListener('touchend', endDrag);
        
        container.addEventListener('click', function(e) {
          if (e.target !== sliderHandle) {
            const rect = container.getBoundingClientRect();
            const position = ((e.clientX - rect.left) / rect.width) * 100;
            positionSlider(position);
          }
        });
        
        container.addEventListener('mouseenter', function() {
          labels.forEach(label => {
            label.style.opacity = '1';
          });
        });
        
        container.addEventListener('mouseleave', function() {
          if (!isDragging) {
            labels.forEach(label => {
              label.style.opacity = '0.7';
            });
          }
        });
      }
      
      function startDrag(e) {
        e.preventDefault();
        isDragging = true;
        container.style.cursor = 'ew-resize';
        document.body.style.userSelect = 'none';
        
        labels.forEach(label => {
          label.style.opacity = '1';
        });
      }
      
      function drag(e) {
        if (!isDragging) return;
        
        const rect = container.getBoundingClientRect();
        let clientX;
        
        if (e.type === 'touchmove') {
          clientX = e.touches[0].clientX;
        } else {
          clientX = e.clientX;
        }
        
        const position = ((clientX - rect.left) / rect.width) * 100;
        positionSlider(position);
      }
      
      function endDrag() {
        if (!isDragging) return;
        
        isDragging = false;
        container.style.cursor = 'default';
        document.body.style.userSelect = '';
        
        container.dispatchEvent(new Event('mouseleave'));
      }
      
      function positionSlider(position) {
        position = Math.max(0, Math.min(position, 100));
        
        modifiedImage.style.width = `${position}%`;
        
        sliderHandle.style.left = `${position}%`;
        sliderLine.style.left = `${position}%`;
        
        const originalLabel = slider.querySelector('.original-label');
        const modifiedLabel = slider.querySelector('.modified-label');
        
        if (position > 85) {
          originalLabel.style.opacity = '0';
        } else {
          originalLabel.style.opacity = '1';
        }
        
        if (position < 15) {
          modifiedLabel.style.opacity = '0';
        } else {
          modifiedLabel.style.opacity = '1';
        }
      }
    });
  }