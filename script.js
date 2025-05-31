// Create custom cursor
const cursor = document.createElement("div");
cursor.classList.add("custom-cursor");
document.body.appendChild(cursor);

// Create cursor trail
const trails = [];
for (let i = 0; i < 10; i++) {
  const trail = document.createElement("div");
  trail.classList.add("cursor-trail");
  document.body.appendChild(trail);
  trails.push({
    element: trail,
    position: { x: -100, y: -100 },
    delay: i * 3,
  });
}

// Track mouse position
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

// Update cursor trail
function updateCursorTrail() {
  trails.forEach((trail, index) => {
    setTimeout(() => {
      trail.position.x = mouseX;
      trail.position.y = mouseY;
      trail.element.style.transform = `translate(${trail.position.x}px, ${trail.position.y}px)`;
      trail.element.style.opacity = 1 - index * 0.1;
    }, trail.delay);
  });
  requestAnimationFrame(updateCursorTrail);
}

updateCursorTrail();

// Create floating particles
function createParticles() {
  const particlesContainer = document.querySelector(".particles");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // Random properties
    const size = Math.random() * 3 + 2;
    const posX = Math.random() * 1000;
    const posY = Math.random() * 1000;
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;

    particlesContainer.appendChild(particle);
  }
}

// Parallax effect for background shapes
function initParallax() {
  const shapes = document.querySelectorAll(".shape");

  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    shapes.forEach((shape, index) => {
      const moveX = (mouseX - 0.5) * 20 * (index + 1);
      const moveY = (mouseY - 0.5) * 20 * (index + 1);

      shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });
}

// Three.js Background Animation - Advanced Tech Scene
function initThreeBackground() {
  const canvas = document.getElementById("three-canvas");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Create a tech sphere
  const sphereGeometry = new THREE.SphereGeometry(15, 32, 32);
  const sphereMaterial = new THREE.MeshPhongMaterial({
    color: 0x8a2be2,
    wireframe: true,
    transparent: true,
    opacity: 0.2,
    shininess: 100,
  });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  scene.add(sphere);

  // Add inner tech sphere
  const innerSphereGeometry = new THREE.SphereGeometry(10, 24, 24);
  const innerSphereMaterial = new THREE.MeshPhongMaterial({
    color: 0x00c896,
    wireframe: true,
    transparent: true,
    opacity: 30,
    shininess: 100,
  });
  const innerSphere = new THREE.Mesh(innerSphereGeometry, innerSphereMaterial);
  scene.add(innerSphere);

  // Create floating tech components
  const components = [];
  const componentGeometry = new THREE.TetrahedronGeometry(2, 0);
  const componentMaterial = new THREE.MeshPhongMaterial({
    color: 0xff6b6b,
    shininess: 100,
    transparent: false,
    opacity: 0.8,
    
  });

  // Create multiple floating components
  for (let i = 0; i < 10; i++) {
    const component = new THREE.Mesh(componentGeometry, componentMaterial);

    // Random position around the sphere
    const radius = 20 + Math.random() * 10;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;

    component.position.x = radius * Math.sin(phi) * Math.cos(theta);
    component.position.y = radius * Math.sin(phi) * Math.sin(theta);
    component.position.z = radius * Math.cos(phi);

    // Random rotation
    component.rotation.x = Math.random() * Math.PI;
    component.rotation.y = Math.random() * Math.PI;
    component.rotation.z = Math.random() * Math.PI;

    // Store original position for animation
    component.userData = {
      originalX: component.position.x,
      originalY: component.position.y,
      originalZ: component.position.z,
      speed: 0.0001 + Math.random() * 0.002,
    };

    scene.add(component);
    components.push(component);
  }

  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0x00c896, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xff6b6b, 1);
  pointLight.position.set(-5, -5, 5);
  scene.add(pointLight);

  camera.position.z = 40;

  // Mouse movement effect
  let targetX = 0;
  let targetY = 0;
  let actualX = 0;
  let actualY = 0;

  document.addEventListener("mousemove", (e) => {
    // Normalize mouse position to [-1,1]
    targetX = (e.clientX / window.innerWidth) * 2 - 1;
    targetY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // Animation
  function animate() {
    requestAnimationFrame(animate);

    // Smoothly interpolate camera position
    actualX += (targetX * 10 - actualX) * 0.05;
    actualY += (targetY * 10 - actualY) * 0.05;

    // Update camera position
    camera.position.x = actualX;
    camera.position.y = actualY;
    camera.lookAt(scene.position);

    // Rotate spheres
    sphere.rotation.x += 0.001;
    sphere.rotation.y += 0.0015;
    innerSphere.rotation.x -= 0.0007;
    innerSphere.rotation.y -= 0.001;

    // Move floating components
    const time = Date.now() * 0.001;

    components.forEach((component) => {
      // Oscillate position
      component.position.x =
        component.userData.originalX +
        Math.sin(time * component.userData.speed) * 2;
      component.position.y =
        component.userData.originalY +
        Math.cos(time * component.userData.speed * 1.2) * 2;
      component.position.z =
        component.userData.originalZ +
        Math.sin(time * component.userData.speed * 0.8) * 2;

      // Rotate component
      component.rotation.x += 0.01;
      component.rotation.y += 0.01;
    });

    renderer.render(scene, camera);
  }

  // Handle window resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  animate();
}

// Three.js Cube Animation for About Section
function initCubeAnimation() {
  const container = document.getElementById("cube-container");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });

  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Create a complex tech object
  const group = new THREE.Group();

  // Main cube
  const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  const cubeMaterial = new THREE.MeshPhongMaterial({
    color: 0x8a2be2,
    wireframe: true,
    transparent: true,
    opacity: 0.8,
    shininess: 100,
  });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  group.add(cube);

  // Inner sphere
  const sphereGeometry = new THREE.SphereGeometry(1.5, 16, 16);
  const sphereMaterial = new THREE.MeshPhongMaterial({
    color: 0x00c896,
    wireframe: true,
    transparent: true,
    opacity: 0.9,
    shininess: 100,
  });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  group.add(sphere);

  // Floating components
  const componentGeometry = new THREE.TetrahedronGeometry(0.8, 0);
  const componentMaterial = new THREE.MeshPhongMaterial({
    color: 0xff6b6b,
    shininess: 100,
    transparent: true,
    opacity: 0.9,
  });

  const positions = [
    [3, 0, 0],
    [-3, 0, 0],
    [0, 3, 0],
    [0, -3, 0],
    [0, 0, 3],
    [0, 0, -3],
    [2, 2, 2],
    [-2, -2, -2],
    [2, -2, 2],
    [-2, 2, -2],
    [-2, 2, 2],
    [2, -2, -2],
  ];

  positions.forEach((pos) => {
    const component = new THREE.Mesh(componentGeometry, componentMaterial);
    component.position.set(pos[0], pos[1], pos[2]);
    group.add(component);
  });

  scene.add(group);

  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight1 = new THREE.DirectionalLight(0x00c896, 1);
  directionalLight1.position.set(5, 5, 5);
  scene.add(directionalLight1);

  const directionalLight2 = new THREE.DirectionalLight(0xff6b6b, 1);
  directionalLight2.position.set(-5, -5, 5);
  scene.add(directionalLight2);

  camera.position.z = 10;

  // Mouse movement effect
  let targetRotationX = 0;
  let targetRotationY = 0;
  let actualRotationX = 0;
  let actualRotationY = 0;

  container.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / container.clientWidth;
    const y = (e.clientY - rect.top) / container.clientHeight;

    targetRotationX = (y - 0.5) * 0.5;
    targetRotationY = (x - 0.5) * 0.5;
  });

  // Animation
  function animate() {
    requestAnimationFrame(animate);

    // Smoothly interpolate rotation
    actualRotationX += (targetRotationX - actualRotationX) * 0.05;
    actualRotationY += (targetRotationY - actualRotationY) * 0.05;

    // Rotate group
    group.rotation.x = actualRotationX;
    group.rotation.y = actualRotationY;

    // Rotate individual components
    group.children.forEach((child, index) => {
      if (index > 1) {
        // Skip the main cube and sphere
        child.rotation.x += 0.01 * (index % 3 === 0 ? 1 : -1);
        child.rotation.y += 0.01 * (index % 2 === 0 ? 1 : -1);
      }
    });

    renderer.render(scene, camera);
  }

  // Handle window resize
  window.addEventListener("resize", () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  animate();
}

// Header scroll effect
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Mobile menu toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.innerHTML = navLinks.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';

  // Animate menu items when opening
  if (navLinks.classList.contains("active")) {
    const items = document.querySelectorAll(".nav-links li");
    items.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = 1;
        item.style.transform = "translateX(0)";
      }, 100 * index);
    });
  }
});

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Form submission
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // In a real application, you would send the form data to a server here
  // For this example, we'll just show an alert
  alert("Thank you for your message! I will get back to you soon.");
  contactForm.reset();
});

// Scroll animations
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Add animated class to section elements
      if (entry.target.classList.contains("about-img")) {
        entry.target.classList.add("animated");
      }
      if (entry.target.classList.contains("about-text")) {
        entry.target.classList.add("animated");
      }
      if (entry.target.classList.contains("section-title")) {
        entry.target.classList.add("animated");
      }
      if (entry.target.classList.contains("skill-card")) {
        setTimeout(() => {
          entry.target.classList.add("animated");
        }, 100 * Array.from(entry.target.parentElement.children).indexOf(entry.target));
      }
      if (entry.target.classList.contains("project-card")) {
        setTimeout(() => {
          entry.target.classList.add("animated");
        }, 150 * Array.from(entry.target.parentElement.children).indexOf(entry.target));
      }
      if (entry.target.classList.contains("timeline-item")) {
        setTimeout(() => {
          entry.target.classList.add("animated");
        }, 200 * Array.from(entry.target.parentElement.children).indexOf(entry.target));
      }
      if (entry.target.classList.contains("timeline")) {
        entry.target.classList.add("animated");
      }
      if (entry.target.classList.contains("contact-info")) {
        entry.target.classList.add("animated");
      }
      if (entry.target.classList.contains("contact-form")) {
        entry.target.classList.add("animated");
      }

      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements
document.querySelectorAll(".about-img").forEach((el) => observer.observe(el));
document.querySelectorAll(".about-text").forEach((el) => observer.observe(el));
document
  .querySelectorAll(".section-title")
  .forEach((el) => observer.observe(el));
document.querySelectorAll(".skill-card").forEach((el) => observer.observe(el));
document
  .querySelectorAll(".project-card")
  .forEach((el) => observer.observe(el));
document
  .querySelectorAll(".timeline-item")
  .forEach((el) => observer.observe(el));
document.querySelectorAll(".timeline").forEach((el) => observer.observe(el));
document
  .querySelectorAll(".contact-info")
  .forEach((el) => observer.observe(el));
document
  .querySelectorAll(".contact-form")
  .forEach((el) => observer.observe(el));

// Initialize animations after page load
window.addEventListener("load", () => {
  createParticles();
  initParallax();
  initThreeBackground();
  initCubeAnimation();
});
