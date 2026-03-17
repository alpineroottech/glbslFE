import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'committee',
  title: 'Committee',
  type: 'document',
  fields: [
defineField({
      name: 'name',
      title: 'Name',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeBlock',
    }),
    defineField({
      name: 'members',
      title: 'Members',
      type: 'array',
      of: [{type: 'committeeMember'}],
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})
