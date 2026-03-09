import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'committeeMember',
  title: 'Committee Member',
  type: 'object',
  fields: [
    defineField({
      name: 'person',
      title: 'Person',
      type: 'reference',
      to: [{type: 'person'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'committeePosition',
      title: 'Committee Position',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'roleDescription',
      title: 'Role Description',
      type: 'text',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      personName: 'person.name',
      position: 'committeePosition',
      media: 'person.image',
    },
    prepare({personName, position, media}) {
      return {
        title: personName || 'No person selected',
        subtitle: position,
        media,
      }
    },
  },
})
