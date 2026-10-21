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
const articlesContainer = document.getElementById('articles-container');

// Try multiple APIs for robustness
const apiEndpoints = [
    {
        url: `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&count=10`,
        type: 'json'
    },
    {
        url: `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`,
        type: 'xml'
    },
    {
        url: `https://corsproxy.io/?${encodeURIComponent(rssUrl)}`,
        type: 'xml'
    }
];

let currentEndpoint = 0;

function fetchArticles() {
    if (currentEndpoint >= apiEndpoints.length) {
        showFallbackMessage();
        return;
    }

    const endpoint = apiEndpoints[currentEndpoint];
    const isJson = endpoint.type === 'json';

    console.log(`Trying API ${currentEndpoint + 1}: ${endpoint.url.substring(0, 50)}...`);

    fetch(endpoint.url)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return isJson ? response.json() : response.text();
        })
        .then(data => {
            let items = [];

            if (isJson && data.status === 'ok' && data.items) {
                items = data.items;
            } else if (!isJson && typeof data === 'string') {
                // Parse XML RSS feed
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(data, 'text/xml');

                if (xmlDoc.getElementsByTagName('parsererror').length === 0) {
                    const entries = xmlDoc.getElementsByTagName('item');
                    items = Array.from(entries).slice(0, 10).map(item => ({
                        title: item.getElementsByTagName('title')[0]?.textContent || 'Untitled',
                        link: item.getElementsByTagName('link')[0]?.textContent || '#',
                        pubDate: item.getElementsByTagName('pubDate')[0]?.textContent || '',
                        description: item.getElementsByTagName('description')[0]?.textContent || '',
                        content: item.getElementsByTagName('content:encoded')[0]?.textContent || ''
                    }));
                }
            }

            if (items.length > 0) {
                displayArticles(items);
            } else {
                currentEndpoint++;
                fetchArticles();
            }
        })
        .catch(error => {
            console.error(`API ${currentEndpoint + 1} failed:`, error);
            currentEndpoint++;
            fetchArticles();
        });
}

function displayArticles(items) {
    articlesContainer.innerHTML = '';

    items.forEach(item => {
        const pubDate = new Date(item.pubDate);
        const formattedDate = pubDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Extract image
        let imageUrl = null;
        const contentToSearch = item.content || item.description || '';
        if (contentToSearch) {
            const imgMatch = contentToSearch.match(/<img[^>]+src="([^">]+)"/);
            if (imgMatch) imageUrl = imgMatch[1];
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
                ${imageUrl ? `<img src="${imageUrl}" alt="${item.title}" onerror="this.style.display='none'; this.parentElement.style.background='linear-gradient(135deg, #667eea 0%, #764ba2 100%)'"/>` : ''}<span ${imageUrl ? 'style="display:none"' : ''}>📝</span>
            </div>
            <div class="article-content">
                <div class="article-date">${formattedDate}</div>
                <h3 class="article-title">${item.title}</h3>
                <p class="article-description">${description || 'Read the full article on Medium'}</p>
                <span class="read-more">Read Article</span>
            </div>
        `;

        articlesContainer.appendChild(articleCard);
    });
}

function showFallbackMessage() {
    articlesContainer.innerHTML = `
        <div class="error">
            <p><strong>Currently unable to load articles</strong></p>
            <p>Visit your <a href="https://medium.com/@${mediumUsername}" target="_blank" style="color: #0066cc; text-decoration: underline;">Medium profile</a> to see all your published articles.</p>
            <p style="font-size: 0.85rem; margin-top: 10px;">The article feed is temporarily unavailable. Please try refreshing the page.</p>
        </div>
    `;
}

// Start fetching
fetchArticles();
