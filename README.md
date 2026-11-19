# Department Activity Showcase

An elegant, responsive activity showcase website built with plain HTML, CSS and JavaScript. Designed for GitHub Pages.

## Files

- `index.html` — page structure
- `style.css` — responsive visual design
- `script.js` — category filters, search, statistics and activity detail pop-up
- `data/activities.json` — the activity records used by the website

## Add your actual activities

Edit `data/activities.json`. Each item supports:

```json
{
  "title": "Activity title",
  "category": "Workshop",
  "date": "19 November 2026",
  "year": "2026",
  "description": "A short description of the activity.",
  "outcome": "What participants learned or achieved.",
  "image": "images/workshop-photo.jpg",
  "alt": "Short description of the photo"
}
```

Add photographs to the `images/` folder and use paths such as `images/workshop-photo.jpg`. Keep image filenames lowercase and use hyphens instead of spaces. Replace all sample entries and sample statistics with verified information before publishing.

## Preview locally

Because the page loads `data/activities.json` with `fetch`, open it using a local server rather than double-clicking `index.html`.

With Python installed:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish with GitHub Pages

1. Create a GitHub repository, for example `department-activity-showcase`.
2. Upload all files and folders from this project to the repository root (keep `index.html` at the root).
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch **main** and folder **/(root)**, then click **Save**.
6. After deployment completes, GitHub shows the website URL in the Pages section. It usually follows `https://YOUR-USERNAME.github.io/department-activity-showcase/`.

## Before you publish

- Replace every sample record with the real workbook data.
- Add approved event photographs; get permission before publishing identifiable student photos.
- Check dates, spellings, names and outcomes.
- Do not publish personal student data, private phone numbers or other confidential details.
