const { GoogleGenerativeAI } = require('@google/generative-ai');
const { createClient } = require('@sanity/client');

// Initialize Sanity Write Client
// Requires environment variables: SANITY_API_WRITE_TOKEN
const sanityWriteClient = createClient({
  projectId: 'y729p0ml',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

// Predefined Editorial Calendar Topics
const TOPICS = [
  {
    title: "Agonda Beach Yoga and Stays: The Conscious Traveler's South Goa Sanctuary",
    category: "Guides",
    location: "Agonda, South Goa, India",
    section: "travel",
    duration: "11 min read",
    prompt: "Write an SEO, AEO, and GEO optimized slow travel guide about Agonda Beach, South Goa. Highlight yoga shalas, beach drop-ins, vegan cafes (like Mandala Cafe), and quiet beach solitude away from party zones. Include clear lists, Q&As for Google snippets, and somatic grounding tips."
  },
  {
    title: "Finding Quiet Beach Solitude in South Goa: A Somatic Guide to Patnem and Cola",
    category: "Diaries",
    location: "Patnem & Cola, Goa, India",
    section: "travel",
    duration: "13 min read",
    prompt: "Write a slow-living diary about Cola Beach and Patnem Beach in South Goa. Focus on somatic resourcing, ocean grounding, escaping commercial crowds, and sensory integration walks on the sand. Include direct reflections, bulleted summaries, and Q&A blocks."
  },
  {
    title: "Goa Nomad Guide: Best Cafes, Co-Working Stays, and Quiet Communities",
    category: "Guides",
    location: "Mandrem, Goa, India",
    section: "travel",
    duration: "12 min read",
    prompt: "Write a guide for digital nomads wanting to live and work slowly in Goa. Cover best quiet cafes with reliable Wi-Fi, co-living options, Mandrem community atmospheres, and balancing screen time with beach meditation."
  },
  {
    title: "Vata-Pacifying Breathwork: Restoring Digestive Rhythm After Long Flights",
    category: "Yoga",
    section: "mindfulness",
    duration: "9 min read",
    prompt: "Detail how air travel aggravates the Vata (air/ether) element, causing jetlag, nervous system stress, and digestive blockups. Provide a clear 10-minute alternate-nostril breathing (Nadi Shodhana) routine to ground the body."
  },
  {
    title: "Constructive Rest Pose: The Ultimate Somatic Transit Recovery Routine",
    category: "Somatic",
    section: "mindfulness",
    duration: "8 min read",
    prompt: "Provide an in-depth somatic guide explaining the Constructive Rest Pose (CRP). Describe its benefits for deep psoas muscle release, spine decompression after long travels, and settling the nervous system."
  },
  {
    title: "Vegan Goa: A Slow Guide to Plant-Based Eating on the Coast",
    category: "Plant-Based",
    section: "wellness",
    duration: "10 min read",
    prompt: "Write a culinary guide exploring organic, plant-based, and vegan eating in Goa. Focus on local, sustainable ingredients, slow juice bars, and mindful eating practices."
  },
  {
    title: "A 14-Day Goa Wellness Itinerary: Somatic Resourcing on the Coast",
    category: "Guides",
    location: "Goa, India",
    section: "travel",
    duration: "14 min read",
    prompt: "Write an in-depth 14-day wellness itinerary for slow travel in Goa. Combine Ayurvedic massage sessions, quiet beach mornings, somatic integration walks, and ocean swimming."
  },
  {
    title: "Mandrem Slow Beach Stays: Finding Peace in North Goa",
    category: "Guides",
    location: "Mandrem, North Goa, India",
    section: "travel",
    duration: "11 min read",
    prompt: "Write a slow-travel guide about Mandrem Beach, North Goa. Detail organic farms, beach sunset meditations, and finding quiet spaces in the north."
  },
  {
    title: "The Quiet Side of Anjuna: Heritage Stays, Back lanes, and Slow Cafes",
    category: "Diaries",
    location: "Anjuna, North Goa, India",
    section: "travel",
    duration: "10 min read",
    prompt: "Write a diary about discovering the quiet, hidden back lanes of Anjuna. Cover heritage Indo-Portuguese homes, local bakers, garden yoga shalas, and escaping the party strip."
  },
  {
    title: "Palolem at Sunrise: Sunrise Kayaking, Quiet Strolls, and Morning Meditation",
    category: "Diaries",
    location: "Palolem, South Goa, India",
    section: "travel",
    duration: "10 min read",
    prompt: "Write a slow travel diary about experiencing Palolem Beach at sunrise. Cover early morning bay paddling, soft sands, birdwatching, and morning breathing shalas."
  },
  {
    title: "Galgibaga Beach: Turtles, Solitude, and Pine-Fringed Wilderness",
    category: "Guides",
    location: "Galgibaga, South Goa, India",
    section: "travel",
    duration: "12 min read",
    prompt: "Write a nature guide about Galgibaga Beach. Cover the Olive Ridley turtle nesting season, walk in pine forests, silence, and simple local fish curries."
  },
  {
    title: "Drifting in Divar Island: Old Portuguese Homes, River Silence, and Slow Trails",
    category: "Diaries",
    location: "Divar Island, Goa, India",
    section: "travel",
    duration: "10 min read",
    prompt: "Write a slow diary about exploring Divar Island. Detail crossing the Mandovi river on ferries, silent countryside roads, heritage chapels, and slow cycling paths."
  },
  {
    title: "Chasing Moss: A Slow Travel Guide to Kyoto's Ancient Temple Gardens",
    category: "Guides",
    location: "Kyoto, Japan",
    section: "travel",
    duration: "10 min read",
    prompt: "Write a guide to finding slow-living spaces in Kyoto's ancient temple gardens, visiting Saiho-ji (Moss Temple), tea ceremony sessions, and walking meditation."
  },
  {
    title: "Body Scan Meditation on the Sand: Grounding Your Nervous System by the Ocean",
    category: "Somatic",
    section: "mindfulness",
    duration: "10 min read",
    prompt: "Offer a step-by-step body scan meditation protocol specifically for slow beach settings. Detail how the feel of warm sand and sound of ocean tides can anchor our somatic nervous system."
  },
  {
    title: "Walking Meditation: Decelerating Your Pace in Forest Trails and Shorelines",
    category: "Somatic",
    section: "mindfulness",
    duration: "9 min read",
    prompt: "Write a guide to walking meditation. Explain the slow, heel-to-toe stride cadence and how to remain mindfully anchored in forest walks and beach strolls."
  },
  {
    title: "Digital Nomad Burnout: Somatic Practices to Unplug and Reclaim Presence",
    category: "Somatic",
    section: "mindfulness",
    duration: "12 min read",
    prompt: "Detail how remote work travel fatigue accumulates in our nervous system. Provide somatic practices (eye release, spine decompressions, device boundaries) to recover."
  },
  {
    title: "Vagus Nerve Stimulation for Stress Relief: Simple Exercises for the Road",
    category: "Somatic",
    section: "mindfulness",
    duration: "10 min read",
    prompt: "Offer simple vagus nerve stimulation exercises suitable for travelers. Detail ear massages, low humming (Bhramari Pranayama), and cold water face splashing to soothe travel nerves."
  },
  {
    title: "Journaling on the Road: Reflective Prompts for Navigating Travel Transitions",
    category: "Somatic",
    section: "mindfulness",
    duration: "8 min read",
    prompt: "Provide a list of reflective journal prompts for travelers navigating geographic shifts, transition fatigue, and setting daily intentions."
  },
  {
    title: "Loving-Kindness (Metta) Meditation: Cultivating Connection with New Cultures",
    category: "Somatic",
    section: "mindfulness",
    duration: "10 min read",
    prompt: "Write an instructional guide on Loving-Kindness meditation. Detail how to cultivate connection with new local communities, guides, and hosts while traveling."
  },
  {
    title: "Sensory Grounding (5-4-3-2-1 Technique) in Busy Airport Terminals",
    category: "Somatic",
    section: "mindfulness",
    duration: "9 min read",
    prompt: "Explain how to practice the 5-4-3-2-1 sensory grounding technique in highly saturated airport terminals to manage transit panic and remain alert."
  },
  {
    title: "Yin Yoga for Hips: Releasing Emotional Cargo After Long Stays in Seats",
    category: "Yoga",
    section: "mindfulness",
    duration: "11 min read",
    prompt: "Explain how long flights lock up hips and store somatic stress. Detail pigeon poses, butterfly poses, and long-hold yin yoga stretches to release tension."
  },
  {
    title: "Morning Dinacharya: Establishing Ayurvedic Daily Routines on the Road",
    category: "Slow Living",
    section: "wellness",
    duration: "11 min read",
    prompt: "Provide an Ayurvedic guide to morning Dinacharya routines while traveling. Cover tongue scraping, warm oil rubs, and drinking warm solar water to balance travel Vata."
  },
  {
    title: "Mindful Eating: How to Practice Presence with Local Coastal Cuisines",
    category: "Slow Living",
    section: "wellness",
    duration: "10 min read",
    prompt: "Explain how to practice mindful eating when exploring local cuisines. Detail flavor tracking, chewing slow, gut-brain connection, and appreciating coastal spices."
  },
  {
    title: "Ayurvedic Travel Toolkit: Herbal Teas, Essential Oils, and Somatic Support",
    category: "Slow Living",
    section: "wellness",
    duration: "10 min read",
    prompt: "Provide a guide to creating a portable Ayurvedic travel toolkit. Cover ginger capsules, lavender essential oil, tulsi tea bags, and somatic grounding anchors."
  },
  {
    title: "Plant-Based Nutrition on the Road: Navigating Menus and Local Markets",
    category: "Plant-Based",
    section: "wellness",
    duration: "12 min read",
    prompt: "Offer a guide to plant-based nutrition while traveling. Explain how to find whole foods, source local fresh fruits, and eat clean, fiber-rich meals on the move."
  },
  {
    title: "Digital Detox Guide: Establishing Tech-Free Zones During Your Stays",
    category: "Slow Living",
    section: "wellness",
    duration: "10 min read",
    prompt: "Offer step-by-step guide to staging digital detox blocks while traveling. Detail sunset screen locks, paper notebook journals, and airplane mode habits."
  },
  {
    title: "Herbal Tea Rituals: Connecting with Herbs for Grounding and Sleep",
    category: "Slow Living",
    section: "wellness",
    duration: "10 min read",
    prompt: "Write a guide to slow tea rituals. Focus on chamomile, peppermint, and tulsi tea prep to wind down, ground nerves, and improve sleep on the road."
  },
  {
    title: "Minimalism on the Road: Packing Outwardly to Declutter Inwardly",
    category: "Slow Living",
    section: "wellness",
    duration: "10 min read",
    prompt: "Write a guide to minimalist packing. Explain how clearing physical baggage acts as a somatic release, decluttering the mind and easing transition stress."
  },
  {
    title: "Forest Bathing (Shinrin-Yoku): The Science of Grounding in Indian Forests",
    category: "Slow Living",
    section: "wellness",
    duration: "10 min read",
    prompt: "Explain the science of Shinrin-Yoku (Forest Bathing). Focus on phytoncides, reducing stress hormones, and grounding walks in spice gardens and silent trails."
  },
  {
    title: "Vegan Travel Hacks: Finding Local, Whole-Food Stays in India",
    category: "Plant-Based",
    section: "wellness",
    duration: "10 min read",
    prompt: "Offer vegan travel hacks for India. Cover translating dairy-free requests (sans ghee/dahi), identifying rich legume options, and finding vegan eco-hotels."
  },
  {
    title: "Somatic Boundaries: Saying No to Over-Scheduled Travel Plans",
    category: "Slow Living",
    section: "wellness",
    duration: "10 min read",
    prompt: "Explain the importance of somatic boundaries. Focus on listening to physical fatigue signals, pacing your itinerary, and saying no to over-packed sightseeing schedules."
  }
];

// Helper to convert Markdown paragraphs to Sanity Portable Text blocks
function markdownToPortableText(markdown) {
  const lines = markdown.split('\n\n');
  const blocks = [];

  for (const paragraph of lines) {
    const trimmed = paragraph.trim();
    if (!trimmed) continue;

    // Heading 2
    if (trimmed.startsWith('## ')) {
      blocks.push({
        _type: 'block',
        style: 'h2',
        markDefs: [],
        children: [{ _type: 'span', text: trimmed.replace('## ', '') }]
      });
    }
    // Heading 3
    else if (trimmed.startsWith('### ')) {
      blocks.push({
        _type: 'block',
        style: 'h3',
        markDefs: [],
        children: [{ _type: 'span', text: trimmed.replace('### ', '') }]
      });
    }
    // Blockquote
    else if (trimmed.startsWith('> ')) {
      blocks.push({
        _type: 'block',
        style: 'blockquote',
        markDefs: [],
        children: [{ _type: 'span', text: trimmed.replace('> ', '') }]
      });
    }
    // Bullet list
    else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const items = trimmed.split('\n');
      for (const item of items) {
        const itemText = item.replace(/^[-*]\s+/, '');
        blocks.push({
          _type: 'block',
          style: 'normal',
          listItem: 'bullet',
          level: 1,
          markDefs: [],
          children: [{ _type: 'span', text: itemText }]
        });
      }
    }
    // Ordered list
    else if (/^\d+\.\s+/.test(trimmed)) {
      const items = trimmed.split('\n');
      for (const item of items) {
        const itemText = item.replace(/^\d+\.\s+/, '');
        blocks.push({
          _type: 'block',
          style: 'normal',
          listItem: 'number',
          level: 1,
          markDefs: [],
          children: [{ _type: 'span', text: itemText }]
        });
      }
    }
    // Paragraph
    else {
      blocks.push({
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', text: trimmed }]
      });
    }
  }

  return blocks;
}

// Convert title to URL slug
function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function run() {
  const isTest = process.argv.includes('--test');

  if (!process.env.GEMINI_API_KEY && !isTest) {
    console.error('Error: GEMINI_API_KEY is not defined.');
    process.exit(1);
  }
  if (!process.env.SANITY_API_WRITE_TOKEN && !isTest) {
    console.error('Error: SANITY_API_WRITE_TOKEN is not defined.');
    process.exit(1);
  }

  console.log('Fetching existing articles from Sanity to prevent duplicates...');
  let existingTitles = [];
  try {
    const query = `*[_type == "post"] { title }`;
    const posts = await sanityWriteClient.fetch(query);
    existingTitles = posts.map(p => p.title.toLowerCase());
  } catch (e) {
    console.warn('[Sanity] could not fetch existing posts, proceeding with default calendar:', e.message);
  }

  // Find next un-published topic
  let selectedTopic = TOPICS.find(t => !existingTitles.includes(t.title.toLowerCase()));

  // Fallback: If all default topics are published, dynamically brainstorm a new one
  if (!selectedTopic) {
    console.log('All predefined calendar topics have been posted! Brainstorming a new niche topic...');
    selectedTopic = {
      title: "Silent Retreats in India: A Beginner's Guide to Silence",
      category: "Guides",
      section: "mindfulness",
      duration: "10 min read",
      prompt: "Write a slow-living guide about silent retreats in India. Explain what Vata grounding means, how silence helps recover from digital overload, and somatic breathing techniques during isolation."
    };
  }

  console.log(`Selected Topic: "${selectedTopic.title}"`);
  console.log('Calling Gemini API to write optimized article...');

  // Initialize Gemini AI client
  // Using standard system prompt instructions for SEO, AEO, and GEO optimization
  const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'test-key');
  let articleBodyMarkdown = '';
  let metaDescription = '';

  if (isTest) {
    console.log('[Test Run] Skipping Gemini call, writing placeholder content.');
    articleBodyMarkdown = `## Grounding and Slow Stays\n\nThis is a test article body.\n\n- Bullet item A\n- Bullet item B\n\n> This is a quote block.`;
    metaDescription = 'This is a test description.';
  } else {
    try {
      const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const promptText = `
        You are Antigravity, a professional SEO, AEO, and GEO copywriter writing for "wanderwithakhi" - a premium slow-living travel and somatic mindfulness blog.
        
        Write a 1500+ word article on this topic:
        "${selectedTopic.title}"
        
        Prompt details: "${selectedTopic.prompt}"
        
        Structuring Guidelines:
        1. Write in markdown. Use ## for major headings and ### for subheadings.
        2. Incorporate an Answer Engine (AEO) Q&A section at the end (e.g. "Frequently Asked Questions") to secure Google Featured Snippets.
        3. Make it GEO optimized (Generative Engine Optimization) by mentioning specific local spots, coordinates, and citing slow-living philosophies.
        4. Focus on deep somatic, grounding, and slow-living tones.
        5. DO NOT output the title, meta-description or Frontmatter in the body response. ONLY output the body prose markdown starting from the first paragraph or H2.
      `;
      
      const response = await model.generateContent(promptText);
      articleBodyMarkdown = response.response.text();

      // Generate meta description
      const metaResponse = await model.generateContent(`Summarize this article in a single high-engagement SEO meta description under 150 characters: "${selectedTopic.title}"`);
      metaDescription = metaResponse.response.text().trim();
    } catch (e) {
      console.error('Gemini API execution failed:', e);
      process.exit(1);
    }
  }

  // Parse markdown into Sanity blocks
  const bodyBlocks = markdownToPortableText(articleBodyMarkdown);

  const document = {
    _type: 'post',
    title: selectedTopic.title,
    slug: {
      _type: 'slug',
      current: slugify(selectedTopic.title),
    },
    section: selectedTopic.section,
    category: selectedTopic.category,
    location: selectedTopic.location || '',
    publishDate: new Date().toISOString().split('T')[0],
    duration: selectedTopic.duration,
    description: metaDescription,
    body: bodyBlocks
  };

  if (isTest) {
    console.log('[Test Run] Generated Document:\n', JSON.stringify(document, null, 2));
    console.log('Test complete!');
    return;
  }

  console.log('Publishing article to Sanity dataset...');
  try {
    const res = await sanityWriteClient.create(document);
    console.log(`Successfully created document ID: ${res._id}`);
  } catch (e) {
    console.error('Failed to write document to Sanity:', e);
    process.exit(1);
  }
}

run();
