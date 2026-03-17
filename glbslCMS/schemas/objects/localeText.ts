import {defineType} from 'sanity'

export default defineType({
  title: 'Localized Text',
  name: 'localeText',
  type: 'object',
  fields: [
    {
      title: 'English',
      name: 'en',
      type: 'text',
    },
    {
      title: 'Nepali',
      name: 'ne',
      type: 'text',
    }
  ]
})