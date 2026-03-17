import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'organizationStructure',
  title: 'Organization Structure',
  type: 'document',
  fields: [
defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeBlock',
    }),
    defineField({
      name: 'structureImage',
      title: 'Structure Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title || 'Organization Structure',
      }
    },
  },
})
