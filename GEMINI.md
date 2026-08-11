# Blog Writing Rules (Google SEO & Yoga Nomads Layout Compliance)

Whenever you generate, edit, or optimize blog articles for `wanderwithakhi.com`, you must follow these official guidelines derived from the **Google Search Essentials: SEO Starter Guide** and the **Yoga Nomads Editorial Format**:

---

## 1. Editorial Layout & Formatting (Yoga Nomads Style)
To maintain visual consistency and reader engagement, every new and edited article must use the following structure:

1.  **Introduction & Quick Tip Callout**:
    -   Begin the article with a brief 1-2 paragraph introduction.
    -   Immediately follow this with a blockquote callout:
        `> **Quick Tip:** [A concise 1-2 sentence summary of the post's core advice or focal point].`
2.  **At-A-Glance Reference Table**:
    -   Place a 2-column or 3-column quick-reference table near the top of the post to summarize key information for quick readers.
3.  **Numbered H3 Subheadings**:
    -   When listing destinations, practices, or tips, use H3 headers formatted as:
        `### #1- [Title Name]`
        `### #2- [Title Name]`
4.  **Visual Elements**:
    -   Integrate high-quality, descriptive images below major subheadings to break up text density and illustrate concepts visually.

---

## 2. Title Links & Meta Descriptions
-   **Page Title**: Write a unique, descriptive `<title>` tag for each page. Limit to 50–60 characters. Format as: `[Descriptive Title] | wanderwithakhi`.
-   **Meta Description**: Provide a compelling summary (120–150 characters) that encourages users to click. Avoid duplicating the page title.

---

## 3. Structured Heading Hierarchies
-   **Single H1**: Each page must have exactly one `<h1>` containing the primary title.
-   **Nested Subheadings**: Use a sequential heading hierarchy to organize sections:
    -   `# [H1 Page Title]` (For page title)
    -   `## [H2 Section Header]` (For major topics)
    -   `### [H3 Subsection Header]` (For detailed subtopics under H2)
-   Never skip heading levels (e.g., do not place an `###` immediately after an `<h1>`).

---

## 4. Descriptive Link Anchor Text (Critical)
-   **No Generic Text**: Never use generic link text such as "click here", "read more", "this article", or raw URLs.
-   **Contextual Anchors**: Write descriptive, natural anchor text that explains exactly what the linked page is about.
    -   *Correct*: "For detailed steps, review our [Constructive Rest Pose somatic release guide](/essays/mindfulness/constructive-rest-pose-somatic)."
    -   *Incorrect*: "For detailed steps, click [here](/essays/mindfulness/constructive-rest-pose-somatic)."

---

## 5. Image Optimizations (Google Images Indexing)
-   **Descriptive Filenames**: Use short, lowercase, hyphen-separated filenames describing the image contents (e.g. `/images/agonda_yoga.jpg`). Avoid generic strings like `image_1.jpg`.
-   **Semantic Alt Text**: Every image must have a descriptive, concise `alt` attribute. Describe the visual content clearly for accessibility and search crawlers.

---

## 6. Structured Data Schema (AEO & Rich Snippets)
-   **Structured FAQs**: Define any article FAQs in the frontmatter `faqs` array rather than writing them as markdown text in the body.
-   The template will automatically render the FAQ list and inject the corresponding `FAQPage` JSON-LD schema into the page head.

---

## 7. Internal and External Interlinking
-   **Internal Links**: Cross-link newly written articles with at least 2 relevant older guides. Go back to older articles and add an internal link pointing to the new post.
-   **External Links**: Include at least 2 outbound links to high-authority official resources (like government tourism portals or clinical research databases) to build trust.
