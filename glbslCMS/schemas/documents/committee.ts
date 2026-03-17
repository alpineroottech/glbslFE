import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'committee',
  title: 'Committee',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
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
