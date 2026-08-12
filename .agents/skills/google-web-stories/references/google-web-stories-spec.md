# Google Web Stories — Full Technical Reference

Source: https://developers.google.com/search/docs/appearance/enable-web-stories

---

## What Google Says About Web Stories

Web Stories are a visual storytelling format that allows creators to host their own content
and link to their own pages while being eligible for display across Google surfaces:

- **Google Search** — appears as a visual carousel
- **Google Discover** — appears as tap-through cards in the feed
- **Google Images** — appears as story panels
- **Google App** — featured in the Discover tab

---

## Technical Requirements (from Google)

### 1. Valid AMP HTML

Every Web Story must be a valid AMP page. The HTML file must include:

```html
<!doctype html>
<html ⚡>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <link rel="canonical" href="https://wanderwithakhi.com/stories/[slug].html">
  <meta name="description" content="...">
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script async custom-element="amp-story"
    src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
  <style amp-boilerplate>
    body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;
    -moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;
    -ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;
    animation:-amp-start 8s steps(1,end) 0s 1 normal both}
    @-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
    @-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
    @-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
    @-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
    @keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
  </style>
  <noscript>
    <style amp-boilerplate>
      body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}
    </style>
  </noscript>
</head>
<body>
  <amp-story
    standalone
    title="STORY TITLE"
    publisher="Akhilesh Gowda"
    publisher-logo-src="https://wanderwithakhi.com/images/logo-96x96.png"
    poster-portrait-src="https://wanderwithakhi.com/images/stories/[slug]-poster.jpg"
  >

    <!-- Pages / Slides go here -->

    <amp-story-bookend src="https://wanderwithakhi.com/stories/[slug]-bookend.json"
      layout="nodisplay">
    </amp-story-bookend>

  </amp-story>
</body>
</html>
```

---

### 2. Poster Image (Required for Discover)

Google uses the poster image as the preview thumbnail in Discover and Search.

| Attribute | Requirement |
|---|---|
| `poster-portrait-src` | **Required**. Portrait orientation (3:4 ratio minimum) |
| `poster-square-src` | Optional. Square (1:1) |
| `poster-landscape-src` | Optional. Landscape (4:3) |
| Minimum portrait size | 640 × 853 px |
| Recommended size | 1080 × 1920 px (9:16) |
| Format | JPEG or WebP |

---

### 3. Publisher Logo

| Attribute | Requirement |
|---|---|
| `publisher-logo-src` | **Required** |
| Format | PNG (transparent background preferred) |
| Size | 96 × 96 px minimum (square) |
| Background | Light/white recommended |

---

### 4. Page / Slide Structure

Each slide is an `<amp-story-page>` element:

```html
<amp-story-page id="cover">
  <!-- Layer 1: Background (fill template = full bleed) -->
  <amp-story-grid-layer template="fill">
    <amp-img
      src="https://wanderwithakhi.com/images/stories/[slug]-cover.jpg"
      width="720"
      height="1280"
      layout="responsive"
      alt="Descriptive alt text — wanderwithakhi">
    </amp-img>
  </amp-story-grid-layer>

  <!-- Layer 2: Text content (thirds template = top/middle/bottom zones) -->
  <amp-story-grid-layer template="thirds">
    <div class="title-wrapper" grid-area="lower-third">
      <h1>Story Title</h1>
      <p>Subtitle</p>
    </div>
  </amp-story-grid-layer>
</amp-story-page>
```

**Grid layer templates:**
- `fill` — single element fills entire layer
- `vertical` — children stacked vertically
- `horizontal` — children side by side
- `thirds` — divides into top-third, middle, lower-third

---

### 5. Bookend (Last Slide — Recommended)

The bookend is the final "end card" Google recommends to drive traffic back:

**bookend JSON file** (`public/stories/[slug]-bookend.json`):
```json
{
  "@context": "https://amp.dev/documentation/components/amp-story-bookend",
  "@type": "Bookend",
  "shareProviders": ["twitter", "facebook", "whatsapp", "email"],
  "components": [
    {
      "type": "heading",
      "text": "Read more on wanderwithakhi.com"
    },
    {
      "type": "small",
      "title": "Full article: [Story Title]",
      "url": "https://wanderwithakhi.com/essays/[category]/[slug]",
      "image": "https://wanderwithakhi.com/images/stories/[slug]-poster.jpg"
    },
    {
      "type": "small",
      "title": "Browse all stories",
      "url": "https://wanderwithakhi.com/stories",
      "image": "https://wanderwithakhi.com/images/stories/cover-engineer-seeker.jpg"
    }
  ]
}
```

---

### 6. Accessibility & Alt Text

Every `<amp-img>` in a Web Story must have a descriptive `alt` attribute.

Format for wanderwithakhi:
```
[What is in the image], [location/context], [brand keyword]
```

Example:
```html
alt="Sunrise yoga practice inside a Mysore shala, traditional Indian yoga, wanderwithakhi"
```

---

### 7. Text Rules

| Rule | Limit |
|---|---|
| Maximum text per page | 200 characters |
| Safe zone for text | Keep within center 80% of screen width |
| Font size minimum | 24px |
| Lines per page | Max 4–5 lines |
| Must be legible | Text must contrast with background |

---

### 8. Story-Level SEO Metadata

```html
<!-- Schema.org structured data for Web Story -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Story Title",
  "description": "Story description max 160 chars",
  "image": "https://wanderwithakhi.com/images/stories/[slug]-poster.jpg",
  "author": {
    "@type": "Person",
    "name": "Akhilesh Gowda",
    "url": "https://wanderwithakhi.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "wanderwithakhi",
    "logo": {
      "@type": "ImageObject",
      "url": "https://wanderwithakhi.com/images/logo-96x96.png"
    }
  },
  "datePublished": "YYYY-MM-DD",
  "mainEntityOfPage": "https://wanderwithakhi.com/stories/[slug].html"
}
</script>
```

---

### 9. What Google Does NOT Allow in Web Stories

| Not Allowed | Reason |
|---|---|
| Stories with only text | Must have visual media (images/video) |
| Incomplete stories (< 5 pages) | Too short to be indexed |
| Static images only (no story format) | Must use AMP story format |
| Paywalls or login walls | Must be fully accessible |
| Excessive text ads | Stories monetised mainly via affiliate links |
| Duplicate poster images across stories | Each story needs unique poster |
| Missing `rel="canonical"` | Required for deduplication |

---

### 10. Search Console Monitoring

After submission, track performance in:

- **Search Console → Search Results** → filter by "Web Stories"
- **Enhancements → Web Stories** → shows validation errors
- **URL Inspection** → check indexing status

Key metrics to watch:
- Impressions in Discover
- Clicks from Discover to wanderwithakhi.com
- Average slide completion rate (via Google Analytics events)

---

## Full AMP Story Template (Copy-Paste Ready)

```html
<!doctype html>
<html ⚡>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>STORY TITLE | wanderwithakhi</title>
  <meta name="description" content="STORY DESCRIPTION MAX 160 CHARS">
  <link rel="canonical" href="https://wanderwithakhi.com/stories/SLUG.html">
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script async custom-element="amp-story"
    src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
  <noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "STORY TITLE",
    "description": "STORY DESCRIPTION",
    "image": "https://wanderwithakhi.com/images/stories/SLUG-poster.jpg",
    "author": {"@type": "Person", "name": "Akhilesh Gowda"},
    "publisher": {
      "@type": "Organization",
      "name": "wanderwithakhi",
      "logo": {"@type": "ImageObject", "url": "https://wanderwithakhi.com/images/logo-96x96.png"}
    },
    "datePublished": "YYYY-MM-DD",
    "mainEntityOfPage": "https://wanderwithakhi.com/stories/SLUG.html"
  }
  </script>
  <style amp-custom>
    amp-story { font-family: 'Cormorant Garamond', Georgia, serif; }
    h1 { font-size: 2rem; color: #fff; font-weight: 800; line-height: 1.1; }
    p  { font-size: 1rem; color: rgba(255,255,255,0.85); line-height: 1.5; }
    .bottom-layer { padding: 1.5rem; background: linear-gradient(transparent, rgba(0,0,0,0.75)); }
    .tag { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.1em;
           background: #C87A53; color: white; padding: 0.2rem 0.6rem; border-radius: 4px; }
    .quote { font-style: italic; border-left: 3px solid #C87A53; padding-left: 1rem; }
  </style>
</head>
<body>
  <amp-story
    standalone
    title="STORY TITLE"
    publisher="Akhilesh Gowda"
    publisher-logo-src="https://wanderwithakhi.com/images/logo-96x96.png"
    poster-portrait-src="https://wanderwithakhi.com/images/stories/SLUG-poster.jpg"
  >

    <!-- SLIDE 1: COVER -->
    <amp-story-page id="cover">
      <amp-story-grid-layer template="fill">
        <amp-img src="https://wanderwithakhi.com/images/stories/SLUG-cover.jpg"
          width="720" height="1280" layout="responsive"
          alt="ALT TEXT — wanderwithakhi">
        </amp-img>
      </amp-story-grid-layer>
      <amp-story-grid-layer template="vertical" class="bottom-layer">
        <span class="tag">CATEGORY</span>
        <h1>STORY TITLE</h1>
        <p>Subtitle — wanderwithakhi.com</p>
      </amp-story-grid-layer>
    </amp-story-page>

    <!-- SLIDE 2: HOOK -->
    <amp-story-page id="hook">
      <amp-story-grid-layer template="fill">
        <amp-img src="https://wanderwithakhi.com/images/stories/SLUG-slide2.jpg"
          width="720" height="1280" layout="responsive"
          alt="ALT TEXT — wanderwithakhi">
        </amp-img>
      </amp-story-grid-layer>
      <amp-story-grid-layer template="vertical" class="bottom-layer">
        <p>HOOK TEXT — MAX 200 CHARACTERS</p>
      </amp-story-grid-layer>
    </amp-story-page>

    <!-- SLIDES 3–6: VALUE SLIDES (duplicate pattern) -->

    <!-- SLIDE 7: SEEKER'S QUOTE -->
    <amp-story-page id="quote">
      <amp-story-grid-layer template="fill">
        <amp-img src="https://wanderwithakhi.com/images/stories/SLUG-quote.jpg"
          width="720" height="1280" layout="responsive"
          alt="Spiritual quote slide — wanderwithakhi">
        </amp-img>
      </amp-story-grid-layer>
      <amp-story-grid-layer template="vertical" class="bottom-layer">
        <p class="quote">"AKHILESH'S SEEKER NOTE QUOTE"</p>
        <p>— Akhilesh Gowda, wanderwithakhi</p>
      </amp-story-grid-layer>
    </amp-story-page>

    <!-- SLIDE 8: CTA -->
    <amp-story-page id="cta">
      <amp-story-grid-layer template="fill">
        <amp-img src="https://wanderwithakhi.com/images/stories/SLUG-cta.jpg"
          width="720" height="1280" layout="responsive"
          alt="Read the full guide at wanderwithakhi.com">
        </amp-img>
      </amp-story-grid-layer>
      <amp-story-grid-layer template="vertical" class="bottom-layer">
        <h1>Read the full guide</h1>
        <p>wanderwithakhi.com/essays/CATEGORY/SLUG</p>
        <a href="https://wanderwithakhi.com/essays/CATEGORY/SLUG">
          <button>Read Now →</button>
        </a>
      </amp-story-grid-layer>
    </amp-story-page>

    <!-- BOOKEND -->
    <amp-story-bookend
      src="https://wanderwithakhi.com/stories/SLUG-bookend.json"
      layout="nodisplay">
    </amp-story-bookend>

  </amp-story>
</body>
</html>
```
