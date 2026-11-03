/* ================================================================
   EDIT THIS FILE TO UPDATE YOUR WHOLE SITE.
   Everything on the home page (name, bio, jobs, education,
   publications, projects list, links) comes from here.
   Keep the quotes and commas. Text in "..." is safe to change.
   ================================================================ */

window.PROFILE = {
  name: "Your Name",
  role: "Remote sensing scientist working on geospatial AI",
  tagline:
    "I teach machines to read satellite imagery — and to answer questions about the planet in plain language.",
  location: "Nairobi, Kenya",
  email: "barini@jkuat.ac.ke",          // shown as a contact button; leave "" to hide
  cv: "cv.pdf",                      // upload cv.pdf to the main folder, or leave "" to hide
  links: {
    github: "https://github.com/barini-onkundi",
    scholar: "https://scholar.google.com/",
    linkedin: "https://www.linkedin.com/",
    orcid: ""                        // leave "" to hide any link
  },

  about: [
    "I work where Earth observation meets language models: building GeoLLMs that can describe a Sentinel-2 scene, explain what changed between two dates, and plan multi-step geospatial analyses from a single question.",
    "Before that I spent years on the classic remote sensing toolkit — land-cover classification, time-series analysis and field validation — which keeps my models honest about what pixels can and can't tell you."
  ],

  skills: {
    "Earth observation": ["Sentinel-1/2", "Landsat", "PlanetScope", "SAR", "Time series"],
    "GeoAI": ["Vision-language models", "Prithvi / SatMAE", "RAG for geodata", "LLM agents", "PyTorch"],
    "Geospatial stack": ["Google Earth Engine", "GDAL / rasterio", "xarray", "PostGIS", "QGIS"],
    "Web & MLOps": ["MapLibre", "COG / STAC", "Docker", "Hugging Face", "FastAPI"]
  },

  /* ---------- EMPLOYMENT (newest first) ---------- */
  experience: [
    {
      title: "Remote Sensing Scientist",
      org: "Organization name",
      place: "Nairobi, Kenya",
      start: "2024",
      end: "Present",
      points: [
        "Lead development of a vision-language model for crop and land-cover questions over East Africa.",
        "Built a STAC + COG pipeline serving 10 TB of Sentinel-2 imagery to analysts."
      ]
    },
    {
      title: "GIS & Remote Sensing Analyst",
      org: "Organization name",
      place: "City, Country",
      start: "2021",
      end: "2024",
      points: [
        "Produced national land-cover maps (overall accuracy 89%) with Earth Engine and random forests.",
        "Trained 40+ government staff on Sentinel-2 analysis."
      ]
    },
    {
      title: "Research Assistant",
      org: "University name",
      place: "City, Country",
      start: "2019",
      end: "2021",
      points: ["Flood mapping from Sentinel-1 SAR for disaster response."]
    }
  ],

  /* ---------- EDUCATION (newest first) ---------- */
  education: [
    { degree: "PhD / MSc in Remote Sensing", org: "University name", start: "2021", end: "2025",
      note: "Thesis: Geospatial language models for Earth observation" },
    { degree: "BSc in Geomatic Engineering", org: "University name", start: "2015", end: "2019", note: "" }
  ],

  /* ---------- PUBLICATIONS ----------
     To add a paper:
       1. Upload the PDF into the "publications" folder (optional).
       2. Copy one { ... } block below, paste it, and edit it.
     type: "journal" | "conference" | "preprint" | "thesis" | "other"
     selected: true  → also shown under "Selected" filter
     Leave pdf, doi, code or bibtex as "" if you don't have them.          */
  publications: [
    {
      title: "Example: Grounding geospatial language models in multispectral imagery",
      authors: "Your Name, Co-Author A, Co-Author B",
      venue: "Remote Sensing of Environment",
      year: 2026,
      type: "journal",
      selected: true,
      pdf: "publications/example-paper.pdf",
      doi: "",
      code: "",
      abstract:
        "Replace this with your abstract. It appears when a visitor expands the entry.",
      bibtex: "@article{name2026grounding,\n  title={Grounding geospatial language models in multispectral imagery},\n  author={Name, Your and A, Co-Author and B, Co-Author},\n  journal={Remote Sensing of Environment},\n  year={2026}\n}"
    },
    {
      title: "Example: Zero-shot change captioning with vision-language models",
      authors: "Your Name, Co-Author C",
      venue: "IGARSS 2025",
      year: 2025,
      type: "conference",
      selected: true,
      pdf: "",
      doi: "",
      code: "https://github.com/barini-onkundi",
      abstract: "Replace with your abstract.",
      bibtex: ""
    },
    {
      title: "Example: An agent for multi-step geospatial analysis",
      authors: "Co-Author D, Your Name",
      venue: "arXiv",
      year: 2025,
      type: "preprint",
      selected: false,
      pdf: "",
      doi: "",
      code: "",
      abstract: "",
      bibtex: ""
    }
  ],

  /* ---------- PROJECTS ----------
     Each project has its own page in the "projects" folder.
     lon/lat put a marker on the globe on the home page.            */
  projects: [
    {
      title: "Ask the image",
      summary: "Visual question answering on high-resolution imagery: ask about a scene and see the model point to the answer.",
      page: "projects/geovqa.html",
      thumb: "assets/img/geovqa.svg",
      tags: ["GeoLLM", "VQA", "Grounding"],
      lon: 36.82, lat: -1.29, site: "Nairobi"
    },
    {
      title: "What changed?",
      summary: "Swipe between Sentinel-2 years and read a model-written change report for the GERD reservoir in Ethiopia.",
      page: "projects/change.html",
      thumb: "assets/img/change.svg",
      tags: ["GeoLLM", "Change detection", "Sentinel-2"],
      lon: 35.09, lat: 11.21, site: "Blue Nile, Ethiopia"
    },
    {
      title: "Search the archive in words",
      summary: "Explore image–text embeddings of 1,800 image chips and retrieve scenes with a text query.",
      page: "projects/embeddings.html",
      thumb: "assets/img/embeddings.svg",
      tags: ["GeoLLM", "Embeddings", "Retrieval"],
      lon: 8.68, lat: 50.11, site: "EuroSAT-style chips"
    },
    {
      title: "A geospatial agent",
      summary: "Type an analysis question and watch an LLM agent plan, call GIS tools and build the map step by step.",
      page: "projects/agent.html",
      thumb: "assets/img/agent.svg",
      tags: ["GeoLLM", "Agents", "Tool use"],
      lon: 34.76, lat: -0.09, site: "Kisumu"
    }
  ]
};
