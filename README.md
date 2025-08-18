# Portfolio — Sahabaj Alam

A small static portfolio (HTML/CSS/JS) for Sahabaj Alam. The site is built with plain HTML and custom CSS, uses Tailwind via CDN, Font Awesome icons and Google Fonts. It's meant to be served as static files (GitHub Pages, Netlify, any static host).

## Repository contents

- `index.html` — Main landing page: hero, interactive chat-style assistant, featured projects, skills, certifications, contact and footer.
- `projects.html` — Projects listing / gallery (featured + grid of project cards).
- `articles.html` and `blog.html` — Articles / blog listing pages and featured posts.
- `styles.css` — Custom stylesheet with utility classes, layout and component styles.
- `script.js` — Front-end JavaScript: navigation, chat interface, animations, ripple effects and small UI utilities.
- `assets/` — Static assets used by the pages (currently `claude-color.svg`, `claude-highres.svg`).

Files are standalone and reference external CDNs for Tailwind, Font Awesome and Google Fonts so there is no build step required.

## Quick preview (local)

The fastest way to preview is to open `index.html` in your browser. For a local HTTP server (recommended for correct asset loading), run from PowerShell in this folder:

```powershell
cd /d d:\VSCODE\htmlonlyport
# If you have Python 3 installed
python -m http.server 8000
# then open http://localhost:8000
```

Or use VS Code Live Server extension to preview with auto-reload.

## What to edit

- Update text, links and contact info directly inside the HTML files (`index.html`, `projects.html`, `articles.html`, `blog.html`).
- Replace images in `assets/` and update image src attributes.
- Styles live in `styles.css` — small tweaks can be made there. `script.js` contains UI behavior (chat responses, navigation, animations).

Tip: the site uses CDN-hosted Tailwind and Font Awesome, so editing markup to use Tailwind utility classes is supported without a build step.

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. In the repo settings → Pages, set Source to the `main` branch and folder `/ (root)`.
3. After a few minutes your site will be available at `https://<USERNAME>.github.io/<REPO>/`.

If you prefer a user site (example `https://<USERNAME>.github.io/`), name the repo `<USERNAME>.github.io` and push to `main`.

## Contact & license

Contact: sahabajalam@yahoo.com

This repository currently does not include a license file. Add a `LICENSE` if you want to state reuse terms (MIT is common for portfolios).

---

If you'd like, I can also:
- Add a simple GitHub Actions workflow to deploy to GitHub Pages.
- Replace hardcoded demo text/images with a JSON-driven content file and a small build script.
