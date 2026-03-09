import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'memberWelfareService',
  title: 'Member Welfare Service',
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
      name: 'title',
      title: 'Title',
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
      name: 'welfareServices',
      title: 'Welfare Services',
      type: 'array',
      of: [{type: 'serviceFeature'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title || 'Member Welfare Service',
      }
    },
  },
})
