// ========== CONFIGURATION ==========
const CONFIG = {
  whatsappThreshold: 400,
  observerThreshold: 0.1,
  observerRootMargin: "0px 0px -50px 0px",
  navOffset: 80
};

// ========== ANNÉE FOOTER ==========
const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// ========== MENU TOGGLE ==========
const navToggle = document.querySelector(".nav__toggle");
const navMenu = document.querySelector(".nav__menu");
const navClose = document.querySelector(".nav__close");
const navLinks = document.querySelectorAll(".nav__menu a");

// Fonction pour fermer le menu
function closeMenu() {
  navToggle?.classList.remove("active");
  navMenu?.classList.remove("active");
  navToggle?.setAttribute("aria-expanded", "false");
}

// Fonction pour ouvrir/fermer le menu
function toggleMenu() {
  const isActive = navToggle?.classList.toggle("active");
  navMenu?.classList.toggle("active");
  navToggle?.setAttribute("aria-expanded", isActive ? "true" : "false");
}

// Ouvrir/Fermer au clic sur le bouton
navToggle?.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleMenu();
});

// Fermer via le bouton X
navClose?.addEventListener("click", closeMenu);

// Fermer en cliquant sur un lien du menu
navLinks.forEach(link => {
  link.addEventListener("click", closeMenu);
});

// Fermer en cliquant en dehors du menu
document.addEventListener("click", (e) => {
  if (!e.target.closest(".nav__menu-wrapper") && navMenu?.classList.contains("active")) {
    closeMenu();
  }
});

// Fermer avec la touche ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navMenu?.classList.contains("active")) {
    closeMenu();
  }
});

// ========== WHATSAPP VISIBILITY ==========
const whatsapp = document.querySelector(".whatsapp");
let ticking = false;

function updateWhatsAppVisibility() {
  if (window.scrollY > CONFIG.whatsappThreshold) {
    whatsapp?.classList.add("visible");
  } else {
    whatsapp?.classList.remove("visible");
  }
  ticking = false;
}

// Optimisation avec requestAnimationFrame
window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateWhatsAppVisibility();
    });
    ticking = true;
  }
}, { passive: true });

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    
    // Ignorer les liens vides ou juste "#"
    if (!href || href === "#") return;
    
    e.preventDefault();
    
    const target = document.querySelector(href);
    if (target) {
      const targetPosition = target.offsetTop - CONFIG.navOffset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
      
      // Fermer le menu mobile si ouvert
      closeMenu();
      
      // Focus sur l'élément cible pour l'accessibilité
      target.setAttribute("tabindex", "-1");
      target.focus();
      target.removeAttribute("tabindex");
    }
  });
});

// ========== FADE IN ON SCROLL (INTERSECTION OBSERVER) ==========
const observerOptions = {
  threshold: CONFIG.observerThreshold,
  rootMargin: CONFIG.observerRootMargin
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      // Arrêter d'observer une fois l'animation faite
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Appliquer aux éléments avec animation
const animatedElements = document.querySelectorAll(".vm__item, .project, .service, .architect__photo, .architect__content");
animatedElements.forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  fadeObserver.observe(el);
});

// ========== NAVBAR SCROLL EFFECT (OPTIONNEL) ==========
const nav = document.querySelector(".nav");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  
  // Ajouter une classe quand on scroll
  if (currentScroll > 50) {
    nav?.classList.add("scrolled");
  } else {
    nav?.classList.remove("scrolled");
  }
  
  lastScroll = currentScroll;
}, { passive: true });

// ========== LAZY LOADING IMAGES (FALLBACK) ==========
// Pour les navigateurs qui ne supportent pas loading="lazy"
if ('loading' in HTMLImageElement.prototype === false) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// ========== PERFORMANCE: PRECONNECT TO EXTERNAL RESOURCES ==========
// Déjà fait dans le HTML, mais on peut ajouter dynamiquement si nécessaire

// ========== CONSOLE MESSAGE ==========
if (process.env.NODE_ENV !== 'production') {
  console.log(
    "%c🏛️ AMINI ARCHITECTS",
    "font-size: 20px; font-weight: bold; color: #000000; font-family: Montserrat, sans-serif;"
  );
  console.log(
    "%cArchitecture Contemporaine — Tanger, Maroc",
    "font-size: 12px; color: #808080; font-family: Montserrat, sans-serif;"
  );
}

// ========== ERROR HANDLING ==========
window.addEventListener('error', (e) => {
  console.error('Une erreur est survenue:', e.message);
  // Vous pouvez envoyer l'erreur à un service de monitoring ici
});

// ========== FORM VALIDATION (SI VOUS AJOUTEZ DES FORMULAIRES) ==========
// Exemple à adapter selon vos besoins
/*
const forms = document.querySelectorAll('form');
forms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Validation et envoi
  });
});
*/