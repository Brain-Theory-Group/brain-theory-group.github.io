# BTG @ PKNU — Lab website

Static site for the Brain Theory Group, Dept. of Scientific Computing, Pukyong National University.
No build step. Plain HTML + CSS + a small JS file for the EN/KO toggle.

## Deploy to GitHub Pages

1. Create a repository (e.g. `btg-pknu.github.io` for a root URL, or any name for `<user>.github.io/<repo>/`).
2. Upload **the contents of this folder** (not the folder itself) to the repository root.
3. Settings → Pages → Source: *Deploy from a branch* → Branch: `main` / `(root)` → Save.
4. After 1–2 minutes the site is live.

## Structure

```
index.html          Home
Research.html       Research pillars
Publications.html   Journals, book chapters, patents
People.html         PI and members
Teaching.html       Courses by year
Contact.html        Address, email, map
site.css            Shared nav / footer / page-head styles
colors_and_type.css Design tokens (colors, type, spacing)
i18n.js             EN/KO toggle + email link assembly
assets/             Logo, portraits
fonts/              Fraunces, Inter, JetBrains Mono (woff2)
.nojekyll           Tells GitHub Pages to serve files as-is
```

## Editing

- Text: each element has `data-en` and `data-ko`. Edit both.
- After editing `i18n.js`, bump the `?v=` number in the `<script src="i18n.js?v=...">` tag on every page.
- File names are case-sensitive on GitHub Pages.
