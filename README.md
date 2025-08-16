# Portfolio — Sahabaj Alam

A simple, static portfolio site built with plain HTML, Tailwind CSS (via CDN), and Font Awesome icons. This repo contains the personal portfolio pages (home, projects, articles) and assets ready to be hosted on GitHub Pages or any static file host.

## What you'll find here

- `index.html` — Main landing page (hero, projects preview, articles preview, contact, footer).
- `projects.html` — Full projects listing page.
- `articles.html` — Articles / blog listing page.
- `styles.css` — Project-specific custom styles.
- `script.js` / `bscripts.js` — Client-side JavaScript used by the pages.
- `bindex.html` — (backup / alternative index if present)

## Quick preview (local)

You can preview the site by opening `index.html` in your browser. For a more accurate local server environment (recommended), run a small static server from PowerShell:

```powershell
cd /d d:\VSCODE\htmlonlyport
# Python 3 built-in HTTP server (available if Python is installed)
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Or use the VS Code Live Server extension to preview and auto-refresh while editing.

## Deploy to GitHub Pages

1. Create a GitHub repo and push this folder (or use your existing `portfolio` repo).
2. In the repo on GitHub, go to Settings → Pages and set the Source to `main` branch and `/ (root)` folder, then Save.
3. The site will publish shortly at `https://<USERNAME>.github.io/<REPO>/`.

Notes:

- If you want the repo to serve at `https://<USERNAME>.github.io/` (user site), name the repo `<USERNAME>.github.io` and push to `main`.
- `index.html` is served as the root document. To link directly to other pages use `projects.html` or `articles.html`.

## Edit content

- Update personal details, social links and email inside `index.html`, `projects.html` and `articles.html`.
- Replace images and text as needed. Most styles use Tailwind classes and some custom rules in `styles.css`.

## License & contact

This repo is free to reuse. Add a license file if you want a formal license (for example, `LICENSE` with MIT). For questions or help, contact: `sahabajalam@yahoo.com`.

---

If you want, I can also:
- Add a small GitHub Actions workflow to auto-deploy on push to `main`.
- Create a `CNAME` file or add analytics/tracking snippets.
