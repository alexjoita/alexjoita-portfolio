
# [<img src="readme-assets/logo.png"> Alex Joita](https://alexjoita.com/) — Portfolio

Personal portfolio site of **Alex Joita**, Web Developer — built with **React** and **Bootstrap 5**.

![alt tag1](readme-assets/promo.png)

Key features:
- Lightweight and fully responsive.
- Adapts perfectly to mobile screens.
- Multi-language support (EN, ES, FR, IT, RO).
- Dark and light theme options.
- Sections for experience, education, skills, and portfolio projects.
- Built with **Vite**.
- Contact form powered by **EmailJS** — no backend needed.

## [Live Site](https://alexjoita.com/)

The portfolio is live at **[alexjoita.com](https://alexjoita.com/)**.

### 1. Base layout
The layout uses a fixed central view with a left sidebar, adjusting perfectly across various monitor resolutions, from 4:3 to ultra-wide.

![alt tag1](readme-assets/demo.png)

### 2. Desktop
The main view transitions smoothly when a new page is selected from the sidebar, giving a page-flipping effect. The sidebar is also toggleable, allowing the content area to expand for a larger viewing space.

![alt tag1](readme-assets/desktop.png)

### 3. Mobile
On mobile, the layout groups the portfolio sections into categories and transforms into a tabbed interface with a bottom navigation.

![alt tag1](readme-assets/mobile.png)

## Local development

1. Clone the repo:
```
git clone https://github.com/alexjoita/alexjoita-portfolio.git
```

2. Install dependencies:
```
npm install
```

3. Run in dev mode:
```
npm run dev
```

4. Build for production:
```
npm run build
```
The compiled files will be placed in the `dist` folder.

## Project structure

- `public/data` — JSON files with all portfolio text content and configuration (sections, strings, settings).
- `public/images` — All images used across the site.
- `src/components` — React components, organized by category (articles, generic, modals, nav, etc.).
- `src/styles/_variables.scss` — Theme colors (dark/light palettes).

Editing the JSON files in `public/data/sections` and swapping images in `public/images` is enough to change the site's content — no component changes needed for text/content updates.

## Deployment

This site is deployed to a shared host (cPanel) at the domain root, with SPA rewrites handled by [htaccess](htaccess) (copied to `public_html/.htaccess`). `vite.config.js` sets `base: 'https://alexjoita.com/'` accordingly.

If you fork this for your own domain hosted at the root, set `base: '/'` in `vite.config.js`. If hosting under a sub-path (e.g. GitHub Pages project site), set `base` to that sub-path instead.

## Credits

This project started from the **[react-portfolio-template](https://github.com/ryanbalieiro/react-portfolio-template)** by **[Ryan Balieiro](https://ryanbalieiro.com/)**, and has been customized with personal content, images, and configuration.

Built on top of:
- **[React](https://reactjs.org/)** and **[Bootstrap](https://getbootstrap.com/)**.
- **Font Awesome** — icon library.
- **Smooth Scrollbar** — custom scrollbar plugin.
- **Swiper** — touch slider library.
- **EmailJS** — client-side email delivery for the contact form.

## License

Code released under the [MIT](LICENSE) license.
