import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Essays & Articles',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug / URL Path',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'section',
      title: 'Website Section',
      type: 'string',
      options: {
        list: [
          { title: 'The Outside (Travel)', value: 'travel' },
          { title: 'The Inside (Mindfulness)', value: 'mindfulness' },
          { title: 'Wellness (Slow Living)', value: 'wellness' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category Tag',
      type: 'string',
      description: 'e.g. Guides, Diaries, Yoga, Slow Living, Plant-Based',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location (Only for Travel)',
      type: 'string',
      description: 'e.g. Mysore, India',
      hidden: ({ document }) => document?.section !== 'travel',
    }),
    defineField({
      name: 'country',
      title: 'Country (Only for Travel)',
      type: 'reference',
      to: [{ type: 'country' }],
      description: 'Link this article to a specific country landing page.',
      hidden: ({ document }) => document?.section !== 'travel',
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'date',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Read Duration',
      type: 'string',
      description: 'e.g. 7 min read',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'body',
      title: 'Body Content (Rich Text)',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text (SEO)',
              validation: Rule => Rule.required(),
            }
          ]
        }
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs (For Search Engine Rich Snippets)',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'FAQ Question & Answer',
          fields: [
            { name: 'question', type: 'string', title: 'Question' },
            { name: 'answer', type: 'text', title: 'Answer' }
          ]
        }
      ]
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
});
