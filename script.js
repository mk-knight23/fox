// Modern Theme Toggle with prefers-color-scheme support
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to system preference
const getPreferredTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) return savedTheme;

  // Use modern matchMedia API for system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const setTheme = (theme) => {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  // Update meta theme-color for mobile browsers
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', theme === 'dark' ? '#0f172a' : '#ffffff');
  }
};

const savedTheme = getPreferredTheme();
setTheme(savedTheme);

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});

themeToggle?.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
});

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.querySelector('.nav-links');

mobileToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('active');
  mobileToggle.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks?.classList.remove('active');
    mobileToggle?.classList.remove('active');
  });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Animated Counter
const animateCounter = (element, target, duration = 2000) => {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current).toLocaleString();
    }
  }, 16);
};

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Animate counters when visible
      if (entry.target.classList.contains('stat-number')) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        animateCounter(entry.target, target);
      }
      
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements
document.querySelectorAll('.feature-card, .stat-number').forEach(el => {
  observer.observe(el);
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
      item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
      faqItem.classList.add('active');
    }
  });
});

// AI Chat Assistant
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatContainer = document.getElementById('chatContainer');

const fitnessResponses = {
  workout: "For beginners, I recommend starting with 3-4 days per week of full-body workouts. Focus on compound movements like squats, push-ups, and rows. Each session should last 45-60 minutes.",
  nutrition: "A balanced diet should include lean proteins, complex carbs, healthy fats, and plenty of vegetables. Aim for 0.8-1g of protein per pound of body weight if you're training regularly.",
  weight: "Sustainable weight loss is about 1-2 pounds per week. Combine a moderate calorie deficit (300-500 calories) with regular exercise and strength training to preserve muscle mass.",
  muscle: "To build muscle, focus on progressive overload, eating in a slight calorie surplus, getting 0.8-1g protein per lb of body weight, and ensuring adequate rest between workouts.",
  cardio: "Mix steady-state cardio (30-45 min) with HIIT sessions (15-20 min). Aim for 150 minutes of moderate cardio or 75 minutes of vigorous cardio per week for general health.",
  default: "I can help you with workout plans, nutrition advice, weight loss tips, muscle building strategies, and cardio recommendations. What would you like to know more about?"
};

const addMessage = (text, isUser = false) => {
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${isUser ? 'user' : 'bot'}`;
  messageDiv.innerHTML = `
    <div class="message-avatar">${isUser ? '👤' : '🤖'}</div>
    <div class="message-content">
      <p>${text}</p>
    </div>
  `;
  chatContainer?.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
};

const getAIResponse = (input) => {
  const lowerInput = input.toLowerCase();
  
  for (const [key, response] of Object.entries(fitnessResponses)) {
    if (lowerInput.includes(key)) {
      return response;
    }
  }
  
  return fitnessResponses.default;
};

const sendMessage = () => {
  const message = chatInput?.value.trim();
  if (!message) return;
  
  addMessage(message, true);
  chatInput.value = '';
  
  setTimeout(() => {
    const response = getAIResponse(message);
    addMessage(response);
  }, 500);
};

chatSend?.addEventListener('click', sendMessage);
chatInput?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Parallax Effect on Hero
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    heroContent.style.opacity = 1 - (scrolled / 600);
  }
});

// Add hover effect to cards
document.querySelectorAll('.feature-card, .program-card, .pricing-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Performance optimizations
document.addEventListener('DOMContentLoaded', () => {
  // Preload critical resources
  const preloadResources = [
    'css/bootstrap.min.css',
    'js/jquery.min.js',
    'js/bootstrap.bundle.min.js'
  ];

  preloadResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = resource.endsWith('.css') ? 'style' : 'script';
    document.head.appendChild(link);
  });
});

// Loading Animation with improved performance
window.addEventListener('load', () => {
  // Use requestAnimationFrame for smoother animations
  requestAnimationFrame(() => {
    document.body.style.opacity = '0';
    requestAnimationFrame(() => {
      document.body.style.transition = 'opacity 0.5s ease';
      document.body.style.opacity = '1';
    });
  });
});

// Accessibility improvements
document.addEventListener('keydown', (e) => {
  // Close mobile menu with Escape key
  if (e.key === 'Escape') {
    const navLinks = document.querySelector('.nav-links');
    const mobileToggle = document.getElementById('mobileToggle');
    if (navLinks?.classList.contains('active')) {
      navLinks.classList.remove('active');
      mobileToggle?.classList.remove('active');
    }
  }
});

// Add reduced motion support
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Disable animations for users who prefer reduced motion
  document.documentElement.style.setProperty('--scroll-behavior', 'auto');
  document.body.style.setProperty('transition', 'none');
}

// Modern fetch API usage (for future enhancements)
// const loadFitnessData = async () => {
//   try {
//     const response = await fetch('/api/fitness-data');
//     const data = await response.json();
//     // Process data
//   } catch (error) {
//     console.error('Failed to load fitness data:', error);
//   }
// };

// Web Vitals monitoring (for performance tracking)
// const reportWebVitals = (metric) => {
//   console.log(metric);
// };

// if ('web-vitals' in window) {
//   import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
//     getCLS(reportWebVitals);
//     getFID(reportWebVitals);
//     getFCP(reportWebVitals);
//     getLCP(reportWebVitals);
//     getTTFB(reportWebVitals);
//   });
// }

console.log('🚀 FitForge loaded successfully with modern features!');
