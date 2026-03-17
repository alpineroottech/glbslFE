import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'reportCategory',
  title: 'Report Category',
  type: 'document',
  fields: [
defineField({
      name: 'name',
      title: 'Name',
      type: 'localeString',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeText',
      validation: (rule) => rule.max(500),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      validation: (rule) => rule.max(50),
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      validation: (rule) => rule.max(7),
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      isActive: 'isActive',
    },
    prepare({title, isActive}) {
      return {
        title,
        subtitle: isActive ? 'Active' : 'Inactive',
      }
    },
  },
})
