document.addEventListener('DOMContentLoaded', () => {

  // 1. Deprecated Hero Terminal Logic Removed
  // 2. Intersection Observer for Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Trigger when 15% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Find all animated elements within the intersecting section
        const animatedChildren = entry.target.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
        animatedChildren.forEach(el => {
          el.classList.add('is-visible');
        });
        // observer.unobserve(entry.target); // Uncomment to animate only once
      } else {
        // Remove class if you want them to animate again when scrolling up
        const animatedChildren = entry.target.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
        animatedChildren.forEach(el => {
          el.classList.remove('is-visible');
        });
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll('.observe-section').forEach(section => {
    observer.observe(section);
  });


  // 3. Side Navigation Active State
  const navDots = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');

  const navObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // 50% must be visible
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        // Remove active class from all
        navDots.forEach(dot => dot.classList.remove('active'));
        // Add active class to corresponding dot
        const activeDot = document.querySelector(`.nav-link[data-target="${id}"]`);
        if (activeDot) {
          activeDot.classList.add('active');
        }
      }
    });
  }, navObserverOptions);

  sections.forEach(section => {
    navObserver.observe(section);
  });

  // 4. Skills 3D Sphere (TagCloud)
  const skillContainer = '.skill-sphere';
  const skillTexts = [
    '<div class="skill-item"><i class="devicon-html5-plain colored"></i><span>HTML</span></div>',
    '<div class="skill-item"><i class="devicon-css3-plain colored"></i><span>CSS</span></div>',
    '<div class="skill-item"><i class="devicon-javascript-plain colored"></i><span>JavaScript</span></div>',
    '<div class="skill-item"><i class="devicon-react-original colored"></i><span>React</span></div>',
    '<div class="skill-item"><i class="devicon-nextjs-plain"></i><span>Next.js</span></div>',
    '<div class="skill-item"><i class="devicon-nodejs-plain colored"></i><span>Node.js</span></div>',
    '<div class="skill-item"><i class="devicon-python-plain colored"></i><span>Python</span></div>',
    '<div class="skill-item"><i class="devicon-postgresql-plain colored"></i><span>PostgreSQL</span></div>',
    '<div class="skill-item"><i class="devicon-mongodb-plain colored"></i><span>MongoDB</span></div>',
    '<div class="skill-item"><i class="devicon-docker-plain colored"></i><span>Docker</span></div>',
    '<div class="skill-item"><i class="devicon-amazonwebservices-plain-wordmark colored"></i><span>AWS</span></div>',
    '<div class="skill-item"><i class="devicon-git-plain colored"></i><span>Git</span></div>',
    '<div class="skill-item"><i class="devicon-figma-plain colored"></i><span>Figma</span></div>',
    '<div class="skill-item"><i class="devicon-tailwindcss-plain colored"></i><span>Tailwind</span></div>',
    '<div class="skill-item"><i class="devicon-bash-plain"></i><span>Bash</span></div>'
  ];

  const skillOptions = {
    radius: window.innerWidth < 768 ? 160 : 300,
    maxSpeed: 'normal',
    initSpeed: 'normal',
    direction: 135,
    keep: true,
    useHTML: true
  };

  if (document.querySelector(skillContainer)) {
    TagCloud(skillContainer, skillTexts, skillOptions);

    // Workaround: TagCloud JS renders string as text, so we map it to innerHTML
    // Use setTimeout to ensure DOM elements are created before parsing
    setTimeout(() => {
      const items = document.querySelectorAll('.tagcloud--item');
      items.forEach(item => {
        item.innerHTML = item.innerText;
      });

      // Ensure colors apply properly for non-colored icons
      document.querySelectorAll('.devicon-nextjs-plain, .devicon-bash-plain').forEach(icon => {
        icon.style.color = '#fff';
      });

      // Force AWS icon to be pure white using a CSS filter
      document.querySelectorAll('.devicon-amazonwebservices-plain-wordmark').forEach(icon => {
        icon.style.filter = 'brightness(0) invert(1)';
      });
    }, 100);

    // Drag to rotate logic
    const dragOverlay = document.querySelector('.skill-drag-overlay');
    let isDragging = false;

    if (dragOverlay) {
      dragOverlay.addEventListener('mousedown', () => { isDragging = true; });
      window.addEventListener('mouseup', () => { isDragging = false; });

      // Touch support for mobile dragging
      dragOverlay.addEventListener('touchstart', () => { isDragging = true; }, { passive: true });
      window.addEventListener('touchend', () => { isDragging = false; });

      // Forward mouse movements to the sphere only when dragging
      const handleDrag = (clientX, clientY) => {
        if (isDragging) {
          const fakeEvent = new MouseEvent('mousemove', {
            clientX: clientX,
            clientY: clientY,
            bubbles: true
          });
          document.querySelector(skillContainer).dispatchEvent(fakeEvent);
        }
      };

      dragOverlay.addEventListener('mousemove', (e) => handleDrag(e.clientX, e.clientY));
      dragOverlay.addEventListener('touchmove', (e) => handleDrag(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
    }
  }
});
