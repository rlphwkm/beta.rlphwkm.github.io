// script.js
document.addEventListener("DOMContentLoaded", function () {
    const backgroundMusic = document.getElementById('background-music');
    const launchSound = document.getElementById('launch-sound');
    const hoverSound = document.getElementById('hover-sound');
    const clickSound = document.getElementById('click-sound');

    backgroundMusic.volume = 0.50; // Adjusts background music level
    launchSound.volume = 0.50; // adjusts launch sound level

    // Variable to track if the background music has been played
    let backgroundMusicPlayed = false;

    // Add a listener for a user interaction to play the launch sound
    document.body.addEventListener('click', function () {
        // Play launch sound only once on the first click
        if (!backgroundMusicPlayed) {
            launchSound.play().then(() => {
                // Wait for 3 seconds before starting the background music
                setTimeout(() => {
                    backgroundMusic.loop = true; // Ensure it loops
                    backgroundMusic.play(); // Play background music
                }, 4000); // Wait 4000 ms (4 seconds)
                backgroundMusicPlayed = true; // Set flag to true to avoid replaying
            }).catch(error => {
                console.error("Error playing launch sound:", error);
            });
        }
    });

    // Play hover sound when hovering over cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0; // Reset sound to start
            hoverSound.play().catch(error => {
                console.error("Error playing hover sound:", error);
            });
        });

        card.addEventListener('click', () => {
            clickSound.currentTime = 0; // Reset sound to start
            clickSound.play().catch(error => {
                console.error("Error playing click sound:", error);
            });
        });
    });
});

// Function to reset particle properties
function resetParticle(particle) {
    const edge = Math.floor(Math.random() * 4);
    let startX, startY, endX, endY;
    
    switch(edge) {
        case 0:
            startX = Math.random() * window.innerWidth;
            startY = -20;
            break;
        case 1:
            startX = window.innerWidth + 20;
            startY = Math.random() * window.innerHeight;
            break;
        case 2:
            startX = Math.random() * window.innerWidth;
            startY = window.innerHeight + 20;
            break;
        case 3:
            startX = -20;
            startY = Math.random() * window.innerHeight;
            break;
    }
    
    endX = startX + (Math.random() - 0.5) * window.innerWidth * 2;
    endY = startY + (Math.random() - 0.5) * window.innerHeight * 2;
    
    particle.style.setProperty('--start-x', `${startX}px`);
    particle.style.setProperty('--start-y', `${startY}px`);
    particle.style.setProperty('--end-x', `${endX}px`);
    particle.style.setProperty('--end-y', `${endY}px`);
    
    const duration = Math.random() * 10 + 10;
    particle.style.setProperty('--float-duration', `${duration}s`);
    particle.style.animationDelay = `${Math.random() * -20}s`;
}

// Function to create particles
function createParticles() {
    const existingContainer = document.querySelector('.particles');
    if (existingContainer) {
        existingContainer.remove();
    }

    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    const particleCount = 75;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 6 + 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        resetParticle(particle);
        particles.push(particle);
        particlesContainer.appendChild(particle);
    }

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const radius = 100;

        particles.forEach(particle => {
            const rect = particle.getBoundingClientRect();
            const dx = mouseX - (rect.left + rect.width / 2);
            const dy = mouseY - (rect.top + rect.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < radius) {
                const angle = Math.atan2(dy, dx);
                const force = (radius - distance) / radius;
                const moveX = Math.cos(angle) * force * 10;
                const moveY = Math.sin(angle) * force * 10;
                
                particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        });
    });
}

// Function to update particle styles based on color scheme
function updateParticlesColorScheme() {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const particles = document.querySelectorAll('.particle');

    particles.forEach(particle => {
        particle.classList.toggle('light-theme', !isDarkMode);
    });
}

// Initialize particle creation and color scheme
document.addEventListener('DOMContentLoaded', async () => {
    try {
        createParticles();
        updateParticlesColorScheme(); // Set initial color scheme for particles

        // Watch for changes in the preferred color scheme
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateParticlesColorScheme);

        const widgetManager = new WidgetManager();
        const body = document.body;
        const widgets = document.querySelectorAll('.widget');

        // Add random notifications for demo purposes
        setInterval(() => {
            const randomWidget = widgets[Math.floor(Math.random() * widgets.length)];
            if (!randomWidget.classList.contains('disabled') && !randomWidget.classList.contains('notification')) {
                widgetManager.toggleNotification(randomWidget);
                setTimeout(() => widgetManager.toggleNotification(randomWidget), 5000);
            }
        }, 10000);

    } catch (error) {
        console.error('Failed to initialize application:', error);
    }
});
