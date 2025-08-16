console.log('Scroll animations script loaded');

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded');
  
  // Create an intersection observer with more aggressive settings
  const observer = new IntersectionObserver((entries) => {
    console.log('Intersection observer callback triggered');
    
    entries.forEach(entry => {
      console.log('Element:', entry.target, 'isIntersecting:', entry.isIntersecting);
      
      if (entry.isIntersecting) {
        console.log('Adding animate class to:', entry.target);
        entry.target.classList.add('animate');
        
        // Optional: Unobserve after animation starts to improve performance
        // observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05, // Trigger when 5% of the element is visible
    rootMargin: '0px 0px -10% 0px' // 10% margin at bottom
  });

  // Select all elements that should be animated
  const elements = document.querySelectorAll(
    '.market-card, .segment-card, .innovation-card, ' +
    '.news-card, .image-container, .text-content, ' +
    '.section-container > *'
  );
  
  console.log('Found', elements.length, 'elements to observe');
  
  // Observe each element
  elements.forEach((el, index) => {
    console.log('Observing element:', el);
    // Add a small delay for staggered effect
    el.style.setProperty('--delay', `${index * 0.05}s`);
    observer.observe(el);
  });
  
  // Force check on load in case elements are already in view
  const checkElements = () => {
    console.log('Manually checking elements in viewport');
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const isVisible = (
        rect.top <= (window.innerHeight * 0.9) && 
        rect.bottom >= (window.innerHeight * 0.1)
      );
      if (isVisible) {
        console.log('Element already in view:', el);
        el.classList.add('animate');
      }
    });
  };
  
  // Run check after a short delay to ensure styles are applied
  setTimeout(checkElements, 500);
  
  // Also check on window resize
  window.addEventListener('resize', checkElements);
  
  // And on scroll (as a fallback)
  window.addEventListener('scroll', () => {
    requestAnimationFrame(checkElements);
  });
});
