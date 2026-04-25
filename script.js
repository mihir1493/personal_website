// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Create mailto link with form data
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoLink = `mailto:mshinde1410@gmail.com?subject=${subject}&body=${body}`;

    // Open default email client
    window.location.href = mailtoLink;

    // Optional: Reset form after submission
    contactForm.reset();
});

// Smooth scroll for navigation links
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.skill-card, .upcoming-card, .work-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Project Modal Functionality
const modal = document.getElementById('projectModal');
const modalOverlay = modal.querySelector('.modal-overlay');
const modalClose = modal.querySelector('.modal-close');
const workCards = document.querySelectorAll('.work-card');

// Project data - Update this with your actual project details
const projectData = {
    1: {
        title: 'Emap Violation Tool',
        category: 'Retail 3P Reporting',
        description: 'A simple tool to flag 3P across ecommerce websites Issue: Unauthorized 3rd-party resellers buy products in bulk (often from Costco, Sam’s Club, or regional distributors) and then resell them on Amazon, eBay, Walmart.com, etc. undercutting official pricing and damaging brand equity.',
        tags: ['Python', 'Computer Vision', 'NLP'],
        link: 'https://github.com/mihir1493/emap_violation_tool', // Add actual project URL here or leave as '#' if not available
        image: 'assets/emap-violation.svg'
    },
    2: {
        title: 'Drought Prediction',
        category: 'Forecasting Pipeline',
        description: 'This project aims to develop a low-cost and easily accessible forecasting model for Oklahoma drought prediction and severity estimation',
        tags: ['Forecasting', 'Data Analysis', 'Machine Learning'],
        link: 'https://github.com/mihir1493/Oklahoma-Drought-Prediction',
        image: 'assets/drought-prediction.svg'
    },
    3: {
        title: 'TubeNest',
        category: 'AI Chrome Plugin',
        description: 'TubeNest is a powerful Chrome extension that helps you save and organize YouTube videos effortlessly.',
        tags: ['LLM Integration', 'React', 'Typescript'],
        link: 'https://chromewebstore.google.com/detail/pkajmpfaahlhfolejpjfnobjnceaofmf?utm_source=item-share-cb',
        image: 'assets/tubenest.svg'
    },
    4: {
        title: 'AB Testing',
        category: 'JB Notebooks & Experimentation',
        description: 'Experimentation and Validation Notebooks for Reference',
        tags: ['Causal Inference', 'MMM', 'Bayesian Elasticity'],
        link: 'https://github.com/mihir1493/AB-Testing',
        image: 'assets/ab-testing.svg'
    },
    5: {
        title: 'Price Optimization',
        category: 'Retail Price',
        description: 'Bayesian Elasticity Estimation & DML',
        tags: ['Retail', 'Price Optimisation', 'Bayesian'],
        link: 'https://github.com/mihir1493/AB-Testing/blob/main/causal/bayesian_elasticity_estimation.ipynb',
        image: 'assets/pricing-optimization.svg'
    },
    6: {
        title: 'Deep Learning',
        category: 'Neural Network',
        description: 'Repo for all NN and Forecasting stuff',
        tags: ['RNN', 'CNN'],
        link: 'https://github.com/mihir1493/Deep-Learning',
        image: 'assets/deep-learning.svg'
    }
};

// Open modal when clicking a project card
workCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        const project = projectData[projectId];

        if (project) {
            // Update modal content
            document.getElementById('modalTitle').textContent = project.title;
            document.getElementById('modalCategory').textContent = project.category;
            document.getElementById('modalDescription').textContent = project.description;

            // Update modal image
            const modalImageContainer = document.getElementById('modalImage');
            modalImageContainer.innerHTML = `<img src="${project.image}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover;"/>`;

            // Update tags
            const tagsContainer = document.getElementById('modalTags');
            tagsContainer.innerHTML = project.tags.map(tag =>
                `<span class="tag">${tag}</span>`
            ).join('');

            // Update link
            const modalLink = document.getElementById('modalLink');
            modalLink.href = project.link;

            // Add click handler to ensure navigation works
            modalLink.onclick = (e) => {
                e.stopPropagation();
                if (project.link && project.link !== '#') {
                    window.open(project.link, '_blank');
                }
                return false;
            };

            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal function
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal when clicking close button
modalClose.addEventListener('click', closeModal);

// Close modal when clicking overlay (but not content)
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// Prevent modal content clicks from closing the modal
document.querySelector('.modal-content').addEventListener('click', (e) => {
    e.stopPropagation();
});

// Close modal when pressing Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});
