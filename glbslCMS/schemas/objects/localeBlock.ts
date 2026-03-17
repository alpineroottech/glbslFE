import {defineType} from 'sanity'

export default defineType({
  title: 'Localized Rich Text',
  name: 'localeBlock',
  type: 'object',
  fields: [
    {
      title: 'English',
      name: 'en',
      type: 'array',
      of: [{type: 'block'}]
    },
    {
      title: 'Nepali',
      name: 'ne',
      type: 'array',
      of: [{type: 'block'}]
    }
  ]
})