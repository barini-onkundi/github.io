# Remote sensing & GeoLLM portfolio

A static website with no build step: upload the files to GitHub and it's live.

## What's inside
| Page | What it does |
|---|---|
| `index.html` | Home: spinning Sentinel-2 globe with project markers, projects, about and skills, experience timeline, education, searchable publications, contact |
| `projects/geovqa.html` | **Ask the image**: chat with a GeoLLM; answers draw boxes on satellite imagery |
| `projects/change.html` | **What changed?**: swipe between Sentinel-2 years, then generate a change report |
| `projects/embeddings.html` | **Search in words**: explore image–text embeddings and run text-to-image search |
| `projects/agent.html` | **Geospatial agent**: watch an LLM plan and call GIS tools step by step |

## Edit your details: one file
Open **`data/profile.js`** and change your name, bio, jobs, education, publications, links and project list.

- **Add a publication:** upload the PDF into `publications/`, then copy one `{ ... }` block in the `publications` list and edit it.
- **CV:** replace `cv.pdf` with your own (same name).
- **Demo content:** answers, numbers and tables in the project pages are placeholders. Search each page for "Placeholder" and replace them with your real results.

## Deploy to GitHub Pages (browser only, no git needed)
1. On github.com, click **+ → New repository**. Name it exactly `yourusername.github.io`, make it **Public**, and click **Create**.
2. Click **uploading an existing file**, drag in **everything inside** this folder (not the folder itself), and click **Commit changes**.
3. Go to **Settings → Pages**. Under *Source* choose **Deploy from a branch**, pick branch **main** and folder **/ (root)**, then click **Save**.
4. After 1–2 minutes your site is live at `https://yourusername.github.io`.

To update the site later, open a file on github.com, click the pencil icon, edit, and commit. The site refreshes in about a minute.

## Preview on your computer
Double-click `index.html`, or for the most accurate preview run `python -m http.server` in this folder and open http://localhost:8000.

## Make the demos live (later)
- **Your model:** host a Gradio/FastAPI endpoint (for example on Hugging Face Spaces) and replace `askModel()` in `geovqa.html` or `planFor()` in `agent.html` with a `fetch()` call.
- **Your embeddings:** export `{x, y, cls, caption}` from Python and replace `POINTS` in `embeddings.html`.
- **Your own rasters:** host Cloud-Optimized GeoTIFFs or PMTiles and add them as MapLibre sources.

## Credits
MapLibre GL JS and Plotly.js are bundled in `lib/`. Imagery: Esri World Imagery; Sentinel-2 cloudless by EOX IT Services GmbH (contains modified Copernicus Sentinel data; 2018+ mosaics are CC BY-NC-SA 4.0, fine for a non-commercial portfolio).
