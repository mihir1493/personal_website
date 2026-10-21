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
const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&count=10`;

const articlesContainer = document.getElementById('articles-container');

fetch(apiUrl, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    }
})
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Medium API Response:', data);

        if (data.status === 'ok' && data.items && data.items.length > 0) {
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
                let description = item.description || item.content || '';
                description = description.replace(/<[^>]*>/g, '').substring(0, 150).trim();

                const articleCard = document.createElement('a');
                articleCard.href = item.link;
                articleCard.target = '_blank';
                articleCard.rel = 'noopener noreferrer';
                articleCard.className = 'article-card';

                articleCard.innerHTML = `
                    <div class="article-image">
                        ${imageUrl ? `<img src="${imageUrl}" alt="${item.title}" onerror="this.parentElement.style.background='linear-gradient(135deg, #667eea 0%, #764ba2 100%)'; this.style.display='none'"/>` : ''}<span ${imageUrl ? 'style="display:none"' : ''}>📝</span>
                    </div>
                    <div class="article-content">
                        <div class="article-date">${formattedDate}</div>
                        <h3 class="article-title">${item.title}</h3>
                        <p class="article-description">${description || 'Click to read the full article on Medium'}</p>
                        <span class="read-more">Read Article</span>
                    </div>
                `;

                articlesContainer.appendChild(articleCard);
            });
        } else {
            articlesContainer.innerHTML = `
                <div class="error">
                    <p><strong>No articles published yet!</strong></p>
                    <p>Start writing on <a href="https://medium.com/@${mediumUsername}" target="_blank" style="color: #0066cc; text-decoration: underline;">Medium</a> and your articles will automatically appear here.</p>
                </div>
            `;
        }
    })
    .catch(error => {
        console.error('Error fetching articles:', error);
        articlesContainer.innerHTML = `
            <div class="error">
                <p><strong>Currently unable to load articles</strong></p>
                <p>Visit your <a href="https://medium.com/@${mediumUsername}" target="_blank" style="color: #0066cc; text-decoration: underline;">Medium profile</a> to see all your published articles.</p>
                <p style="font-size: 0.85rem; margin-top: 10px;">If this issue persists, please try refreshing the page.</p>
            </div>
        `;
    });
