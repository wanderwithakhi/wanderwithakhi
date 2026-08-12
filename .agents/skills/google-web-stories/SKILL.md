---
name: google-web-stories
description: >-
  Use this skill when the user asks to create, build, structure, validate, or
  publish Google Web Stories for the wanderwithakhi.com Astro website.
  Activate when the user mentions "web story", "AMP story", "Google Discover story",
  or wants to convert a blog post into a visual tap-through story format.
  This skill covers AMP HTML structure, Google's technical requirements, SEO metadata,
  poster image rules, canonical linking, sitemaps, Search Console submission,
  and the MakeStories.io workflow for custom non-WordPress websites.
---

# Google Web Stories — Build Skill

A complete runbook for creating Google-compliant Web Stories for wanderwithakhi.com.
Reference the full technical spec at [google-web-stories-spec.md](./references/google-web-stories-spec.md).

---

## Quick Context: What are Web Stories?

- Tap-through visual stories (like Instagram Stories) that appear in **Google Search, Google Discover, and Google Images**
- Built in **AMP HTML** format — a strict subset of HTML
- Each story lives at its own URL: `wanderwithakhi.com/stories/[story-slug].html`
- Published files go in `public/stories/` in the Astro project (Astro serves `public/` as static assets)

---

## Workflow for wanderwithakhi.com

### Step 1 — Map Blog Post to Story Structure

Each blog post converts to one Web Story with this slide structure:

| Slide | Type | Content Rule |
|---|---|---|
| 1 | Cover | Title + full-bleed image. Max 70 chars title. |
| 2 | Hook | Opening question or bold statement. Max 200 chars. |
| 3–6 | Value | One key point per slide. Max 200 chars text. |
| 7 | Quote | Akhilesh's Seeker's Note quote |
| 8 | CTA | "Read full guide at wanderwithakhi.com" + URL |

### Step 2 — Google's Required Metadata (every story MUST have)

```html
<!-- Inside <head> of each .html story file -->
<title>Story Title | wanderwithakhi</title>
<meta name="description" content="Max 160 chars description">
<link rel="canonical" href="https://wanderwithakhi.com/stories/[slug].html">

<!-- AMP boilerplate (required) -->
<script async src="https://cdn.ampproject.org/v0.js"></script>
<script async custom-element="amp-story"
  src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>

<!-- Publisher metadata (required by Google) -->
<amp-story
  standalone
  title="Story Title"
  publisher="Akhilesh Gowda"
  publisher-logo-src="https://wanderwithakhi.com/images/logo-96x96.png"
  poster-portrait-src="https://wanderwithakhi.com/images/stories/[slug]-poster.jpg"
>
```

### Step 3 — Poster Image Rules (CRITICAL for Google Discover)

Google WILL NOT show the story in Discover without a valid poster image:

| Rule | Requirement |
|---|---|
| Format | JPEG or PNG |
| Minimum size | 640 × 853 px (portrait, 3:4 ratio) |
| Recommended | 1080 × 1920 px (9:16) |
| File location | `public/images/stories/[slug]-poster.jpg` |
| URL in story | `https://wanderwithakhi.com/images/stories/[slug]-poster.jpg` |
| Must show | Recognizable preview of story content |

### Step 4 — Publisher Logo Rules

| Rule | Requirement |
|---|---|
| Format | PNG with transparent background |
| Size | 96 × 96 px (square) |
| File location | `public/images/logo-96x96.png` |
| URL | `https://wanderwithakhi.com/images/logo-96x96.png` |

### Step 5 — AMP Story Page Structure (per slide)

```html
<amp-story-page id="slide-1">
  <amp-story-grid-layer template="fill">
    <!-- Full-bleed background image -->
    <amp-img src="https://wanderwithakhi.com/images/stories/[slug]-slide1.jpg"
      width="720" height="1280" layout="responsive"
      alt="Descriptive alt text for this slide — wanderwithakhi">
    </amp-img>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="vertical" class="bottom-layer">
    <h1>Story Title</h1>
    <p>Subtitle or tagline</p>
  </amp-story-grid-layer>
</amp-story-page>
```

### Step 6 — File Placement in Astro Project

```
wanderwithakhi/
  └── public/
        ├── images/
        │     ├── logo-96x96.png              ← publisher logo
        │     └── stories/
        │           ├── [slug]-poster.jpg     ← Google Discover poster
        │           └── [slug]-slide1.jpg     ← per-slide images
        └── stories/
              └── [slug].html                 ← the AMP story file
```

Story is live at: `wanderwithakhi.com/stories/[slug].html`

### Step 7 — Sitemap Entry (add to sitemap.xml)

```xml
<url>
  <loc>https://wanderwithakhi.com/stories/[slug].html</loc>
  <lastmod>YYYY-MM-DD</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

### Step 8 — Google Search Console Submission

1. Open [Google Search Console](https://search.google.com/search-console)
2. Go to **URL Inspection**
3. Paste: `https://wanderwithakhi.com/stories/[slug].html`
4. Click **Request Indexing**
5. Repeat for every new story

### Step 9 — Validation

Before submitting to Google, validate the AMP file:
- Online: https://search.google.com/test/amp
- Command: `npx amphtml-validator public/stories/[slug].html`

Common errors to check:
- Missing `<link rel="canonical">`
- Poster image below minimum size
- Publisher logo not square or too small
- Text exceeding safe zone (keep text within center 80% of screen)

---

## MakeStories.io Workflow (Recommended for wanderwithakhi)

Since wanderwithakhi.com uses Astro (not WordPress):

1. **Design** story at [makestories.io](https://makestories.io)
2. Fill **SEO fields**: Publisher = "Akhilesh Gowda", Canonical URL = full story URL
3. **Export** → Download AMP HTML file
4. **Place** the `.html` file in `public/stories/`
5. **Place** poster image in `public/images/stories/`
6. **Git push** → Vercel deploys automatically
7. **Submit** URL to Google Search Console

---

## Content Rules from Google (MUST follow)

| Rule | Detail |
|---|---|
| Minimum slides | 5 pages per story |
| Maximum text per slide | 200 characters |
| Stories must be standalone | No login walls or paywalls |
| Each story needs unique URL | Do not duplicate story URLs |
| Affiliate links | Allowed but must not be the primary purpose |
| Auto-advance | Optional; if used, minimum 3 seconds per slide |
| Links to full article | Strongly recommended on the last slide |

---

## Brand Defaults for wanderwithakhi Stories

| Setting | Value |
|---|---|
| Publisher name | Akhilesh Gowda |
| Publisher logo URL | `https://wanderwithakhi.com/images/logo-96x96.png` |
| Base canonical URL | `https://wanderwithakhi.com/stories/` |
| Default story language | `en` |
| Story directory (Astro) | `public/stories/` |
| Poster directory | `public/images/stories/` |
| Stories index page | `https://wanderwithakhi.com/stories` |

---

## Priority Blog Posts → Stories (wanderwithakhi)

| Priority | Blog Slug | Story Slug |
|---|---|---|
| 1 | `engineer-to-seeker-yoga-journey` | `engineer-to-seeker` |
| 2 | `agonda-beach-yoga` | `agonda-beach` |
| 3 | `vata-pacifying-breathwork` | `breathwork-for-flyers` |
| 4 | `ayurveda-travel-tips` | `ayurvedic-travel-rules` |
| 5 | `what-is-slow-living` | `what-is-slow-living` |

See full reference spec: [google-web-stories-spec.md](./references/google-web-stories-spec.md)
