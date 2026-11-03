# Remote Sensing & GeoLLM Portfolio

A Quarto website, deployed to GitHub Pages automatically.

## Run locally
1. Install Quarto: https://quarto.org/docs/get-started/
2. `quarto preview` opens a live preview at localhost.

## Deploy (one-time setup)
1. Create a repo named **`barini-onkundi.github.io`** on GitHub (or any repo name, which gives `YOUR-USERNAME.github.io/repo-name`).
2. Push this folder:
   ```bash
   git init && git add . && git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/barini-onkundi/barini-onkundi.github.io.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Wait about 2 minutes (check the **Actions** tab). The site is live at `https://barini-onkundi.github.io`.

Every push to `main` redeploys automatically.

## Add a project
Copy `_templates/project-template.qmd` to `projects/<name>/index.qmd`, add a thumbnail, and push.

## Upgrade path
- **Python/Jupyter maps:** add `.ipynb` files in `projects/` (leafmap, geemap, plotly). Run `quarto render` locally and commit `_freeze/`.
- **Big rasters:** host COGs/PMTiles on Hugging Face or Source Cooperative, and load them in MapLibre.
- **Live GeoLLM demos:** put a Gradio app on Hugging Face Spaces and embed it with an iframe.
- **Custom domain:** Settings → Pages → Custom domain.
