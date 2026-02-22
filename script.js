document.addEventListener('DOMContentLoaded', () => {

    // 1. Typing effect for Hero Terminal
    const terminalLines = [
        "Starting portfolioOS...",
        "Loading dependencies...",
        "Resolving modules: Webpack, React, UI/UX",
        "Compiling assets... Done.",
        "System Ready.",
        "> Welcome to my interactive portfolio!"
    ];

    const terminalContainer = document.getElementById('hero-terminal');
    let lineIndex = 0;

    function typeLine() {
        if (lineIndex < terminalLines.length) {
            const p = document.createElement('p');
            // Style the prompt prefix differently
            if (terminalLines[lineIndex].startsWith(">")) {
                p.innerHTML = `<span style="color: var(--accent-green)">></span> ${terminalLines[lineIndex].substring(1)}`;
            } else {
                p.innerHTML = `<span style="color: var(--text-muted)">[sys]</span> <span style="color: var(--text-primary)">${terminalLines[lineIndex]}</span>`;
            }
            
            p.style.marginBottom = '0.5rem';
            terminalContainer.appendChild(p);

            lineIndex++;
            setTimeout(typeLine, Math.random() * 400 + 200); // Random delay between 200ms and 600ms
        } else {
            // Add a blinking cursor at the end
            const cursor = document.createElement('p');
            cursor.innerHTML = `<span style="color: var(--accent-green)">guest@dev</span>:~$ <span class="blink">_</span>`;
            terminalContainer.appendChild(cursor);
            
            // Add CSS for blinking cursor dynamically or assume it's in style.css
            const style = document.createElement('style');
            style.innerHTML = `
                .blink {
                    animation: blink-animation 1s steps(2, start) infinite;
                }
                @keyframes blink-animation {
                    to { visibility: hidden; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Start typing effect slightly after load
    setTimeout(typeLine, 500);


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

    // Handle initialization button click
    const initBtn = document.getElementById('init-btn');
    if (initBtn) {
        initBtn.addEventListener('click', () => {
             terminalContainer.innerHTML = '';
             lineIndex = 0;
             typeLine();
             // Scroll down to projects after a bit
             setTimeout(() => {
                document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
             }, 3000);
        });
    }
});
