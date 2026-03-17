import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'aboutUsSetting',
  title: 'About Us Setting',
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
      name: 'mission',
      title: 'Mission',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'vision',
      title: 'Vision',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'goal',
      title: 'Goal',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'aboutUsDescription',
      title: 'About Us Description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'aboutUsImage',
      title: 'About Us Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'About Us Setting',
      }
    },
  },
})
