# Sahak Vardanyan - Personal CV Website

A modern, Apple-style personal website that showcases your professional profile, skills, and portfolio. The design is clean, minimal, and optimized for both web viewing and print/PDF export.

## Features

- **Apple-style Design**: Clean typography, subtle animations, and modern aesthetics
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Print/PDF Optimized**: Clean print styles for CV export
- **Interactive Portfolio**: Filterable portfolio section with smooth animations
- **Smooth Animations**: Subtle scroll animations and hover effects
- **Modern Tech Stack**: Pure HTML, CSS, and JavaScript (no frameworks)

## File Structure

```
cv/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Customization

### Updating Personal Information

1. **Contact Information**: Update email, LinkedIn, and GitHub links in the contact section
2. **Portfolio Items**: Add new projects to the portfolio grid in `index.html`
3. **Skills**: Modify the skills section to reflect your current expertise
4. **Experience**: Update the timeline with your latest positions

### Styling

The CSS uses CSS custom properties (variables) for easy theming:

```css
:root {
    --color-primary: #007AFF;    /* Primary brand color */
    --color-secondary: #5856D6;  /* Secondary accent color */
    --font-family: 'Inter', ...; /* Typography */
    /* ... more variables */
}
```

### Adding New Portfolio Items

1. Add a new `.portfolio-item` div in the portfolio grid
2. Set the `data-category` attribute for filtering
3. Update the portfolio filter buttons if needed

Example:
```html
<div class="portfolio-item" data-category="corporate">
    <div class="portfolio-image">
        <div class="portfolio-placeholder">
            <span class="portfolio-icon">🏢</span>
        </div>
    </div>
    <div class="portfolio-content">
        <h3 class="portfolio-title">Your Project</h3>
        <p class="portfolio-description">Project description</p>
        <div class="portfolio-tags">
            <span class="portfolio-tag">React</span>
            <span class="portfolio-tag">Node.js</span>
        </div>
    </div>
</div>
```

## Deployment

### Local Development
1. Open `index.html` in your browser
2. Or use a local server: `python -m http.server 8000`

### Hosting Options
- **GitHub Pages**: Push to a GitHub repository and enable Pages
- **Netlify**: Drag and drop the folder to Netlify
- **Vercel**: Connect your GitHub repository
- **Any static hosting**: Upload the files to any web server

## Print/PDF Export

The website is optimized for print with special CSS media queries:

1. **Browser Print**: Use Ctrl+P (Cmd+P on Mac) to print
2. **PDF Export**: Use "Save as PDF" in your browser's print dialog
3. **Print Preview**: Check the layout before printing

The print version removes:
- Navigation menu
- Hero visual elements
- Interactive buttons
- Background colors and shadows

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Performance

- **Lightweight**: No external dependencies except Google Fonts
- **Fast Loading**: Optimized CSS and JavaScript
- **Mobile Optimized**: Responsive design with touch-friendly interactions

## License

This project is open source and available under the MIT License.

---

**Need help?** Feel free to customize this template to match your personal brand and style preferences.
