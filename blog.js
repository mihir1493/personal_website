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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// Fetch Medium Articles
const mediumUsername = 'mshinde1';
const rssUrl = `https://medium.com/feed/@${mediumUsername}`;
const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

const articlesContainer = document.getElementById('articles-container');

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        if (data.items && data.items.length > 0) {
            articlesContainer.innerHTML = '';

            data.items.forEach(item => {
                const pubDate = new Date(item.pubDate);
                const formattedDate = pubDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                // Extract image from content if available
                let imageUrl = null;
                if (item.content) {
                    const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
                    if (imgMatch && imgMatch[1]) {
                        imageUrl = imgMatch[1];
                    }
                }

                // Clean description
                let description = item.description || '';
                description = description.replace(/<[^>]*>/g, '').substring(0, 150);

                const articleCard = document.createElement('a');
                articleCard.href = item.link;
                articleCard.target = '_blank';
                articleCard.rel = 'noopener noreferrer';
                articleCard.className = 'article-card';

                articleCard.innerHTML = `
                    <div class="article-image">
                        ${imageUrl ? `<img src="${imageUrl}" alt="${item.title}" />` : '<span>📝</span>'}
                    </div>
                    <div class="article-content">
                        <div class="article-date">${formattedDate}</div>
                        <h3 class="article-title">${item.title}</h3>
                        <p class="article-description">${description}</p>
                        <span class="read-more">Read Article</span>
                    </div>
                `;

                articlesContainer.appendChild(articleCard);
            });
        } else {
            articlesContainer.innerHTML = '<div class="error">No articles found. Please check the Medium username.</div>';
        }
    })
    .catch(error => {
        console.error('Error fetching articles:', error);
        articlesContainer.innerHTML = '<div class="error">Error loading articles. Please try again later.</div>';
    });
