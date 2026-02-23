# GitHub Pages Deployment

## Quick Fixes Applied

1. **`.nojekyll`** – Added to disable Jekyll processing. GitHub Pages uses Jekyll by default, which can hide or alter files. This ensures your static files are served as-is.

2. **`.gitignore`** – Ensures `node_modules` and other dev files are not deployed, keeping the site fast and lean.

## Deployment Checklist

- [ ] **Commit and push** the `.nojekyll` file to your repo
- [ ] **Verify lib folder** – Ensure `lib/` (jquery, bootstrap, owlcarousel, lightbox, etc.) is committed to the repo
- [ ] **GitHub Pages settings** – Repo → Settings → Pages → Source: `main` branch, `/ (root)` folder
- [ ] **Wait 1–2 minutes** after push for GitHub Pages to rebuild
- [ ] **Hard refresh** (Ctrl+Shift+R or Cmd+Shift+R) in the browser to clear cache

## If It Still Looks Wrong

1. **Check the browser console** (F12 → Console) for 404 or failed load errors
2. **Confirm repo structure** – `index.html`, `css/`, `js/`, `images/`, `lib/` should all be at the repo root
3. **Project site URL** – `https://username.github.io/repo-name/` (replace with your repo name)
