import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'country',
  title: 'Countries & Regions',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Country Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug / URL Path',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'continent',
      title: 'Continent',
      type: 'string',
      options: {
        list: [
          { title: 'Asia', value: 'asia' },
          { title: 'Europe', value: 'europe' },
          { title: 'Americas', value: 'americas' },
          { title: 'Africa', value: 'africa' },
        ],
        layout: 'dropdown',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image / Banner',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Introduction Description',
      type: 'text',
      rows: 4,
      description: 'A brief introductory paragraph summarizing travel in this country.',
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'continent',
      media: 'coverImage',
    },
  },
});
