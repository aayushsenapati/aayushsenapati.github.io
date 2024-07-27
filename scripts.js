// Three.js background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('background'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Create a group to hold all objects
const group = new THREE.Group();
scene.add(group);

// Create particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCnt = 5000;
const posArray = new Float32Array(particlesCnt * 3);

for (let i = 0; i < particlesCnt * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: 0x00fff9,
    blending: THREE.AdditiveBlending,
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
group.add(particlesMesh);

// Add some larger, glowing particles
const glowGeometry = new THREE.SphereGeometry(0.05, 32, 32);
const glowMaterial = new THREE.MeshBasicMaterial({ color: 0xff00c1 });

for (let i = 0; i < 20; i++) {
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.set(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5
    );
    group.add(glow);
}

camera.position.z = 2;

// Mouse movement effect
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX / window.innerWidth - 0.5;
    mouseY = event.clientY / window.innerHeight - 0.5;
});

function animate() {
    requestAnimationFrame(animate);

    group.rotation.y += 0.002;
    group.rotation.x += 0.001;

    group.rotation.y += mouseX * 0.01;
    group.rotation.x += -mouseY * 0.01;

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Parallax effect
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    document.body.style.backgroundPositionY = `${scrollY * 0.5}px`;
});

// Dynamic subtitle
const subtitles = [
    "Software Developer",
    "C/C++ Enthusiast",
    "Golang Expert",
    "Web3 Developer"
];

let currentSubtitle = 0;
const subtitleElement = document.getElementById('dynamic-subtitle');

function changeSubtitle() {
    subtitleElement.textContent = subtitles[currentSubtitle];
    currentSubtitle = (currentSubtitle + 1) % subtitles.length;
}

setInterval(changeSubtitle, 3000);
changeSubtitle(); // Initial call
