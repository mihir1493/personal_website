# Portfolio Website

A modern, responsive portfolio website with beautiful animations, built for GitHub Pages deployment.

## Features

- ✨ Smooth animations and transitions
- 📱 Fully responsive design
- 🎨 Clean, modern aesthetic
- 🚀 Upcoming Projects section with deadline tracking
- 💼 Latest Work showcase with interactive project modals
- 🔍 Project detail popups with descriptions and links
- 📧 Contact form (opens email client)
- 🔗 LinkedIn & Medium integration

## Setup Instructions

### 1. Add Your Content

Update the placeholders in `index.html`:
- **[Your Name]** - Replace with your actual name
- **[Your Role/Tagline]** - Add your professional title/tagline
- **Skills section** - Update the 3 skill cards with your expertise
- **Upcoming Projects** - Add project details and deadlines
- **Latest Work** - Add project images (the cards are clickable and will open modals)
- **LinkedIn URL** - Update the LinkedIn link in the contact section
- **Medium URL** - Update the Medium link in the contact section
- **Hero Image** - Replace the placeholder with your photo/animated gif

Update project details in `script.js`:
- Locate the `projectData` object (around line 89)
- For each project (1-6), update:
  - `title`: Your project name
  - `category`: Project type/category
  - `description`: Detailed project description
  - `tags`: Technologies used (array of strings)
  - `link`: Live project URL (or leave as '#' if not available)
  - `image`: Image description (or replace with actual image path)

### 2. Add Your Photo

For the hero section:
1. Add your photo or animated gif to the project folder
2. Replace the `.image-placeholder` div in the hero section with:
   ```html
   <img src="your-photo.jpg" alt="Your Name">
   ```

### 3. Update Project Images

Replace the `.image-placeholder` divs with actual images:
```html
<img src="project-image.jpg" alt="Project Name">
```

### 4. Deploy to GitHub Pages

1. Create a new repository on GitHub
2. Initialize git and push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Portfolio website"
   git branch -M main
   git remote add origin https://github.com/yourusername/yourrepo.git
   git push -u origin main
   ```

3. Enable GitHub Pages:
   - Go to repository Settings
   - Navigate to "Pages" section
   - Under "Source", select "main" branch
   - Click "Save"
   - Your site will be live at: `https://yourusername.github.io/yourrepo/`

### 5. Custom Domain (Optional)

If you want to use your custom domain:
1. In your repository, create a file named `CNAME` (no extension)
2. Add your domain name to the file (e.g., `yourdomain.com`)
3. Configure your domain's DNS settings:
   - Add an A record pointing to GitHub's IP addresses:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - Or add a CNAME record pointing to `yourusername.github.io`

## File Structure

```
Portfolio/
├── index.html          # Main HTML structure
├── styles.css          # All styles and animations
├── script.js           # Interactive functionality
└── README.md          # This file
```

## Customization

### Colors
Main colors used in the design (edit in `styles.css`):
- Primary: `#009379` (teal)
- Background: `#ffffff` (white)
- Text: `#2d2d2d` (dark gray)
- Accent 1: `#ffd285` (gold)
- Accent 2: `#f6dce9` (pink)

### Fonts
The site uses Google Fonts - Epilogue. To change fonts, update the link in `index.html` and the font-family in `styles.css`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Feel free to use this template for your personal portfolio.
