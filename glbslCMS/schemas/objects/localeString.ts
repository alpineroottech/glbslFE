import {defineType} from 'sanity'

export default defineType({
  title: 'Localized String',
  name: 'localeString',
  type: 'object',
  fields: [
    {
      title: 'English',
      name: 'en',
      type: 'string',
    },
    {
      title: 'Nepali',
      name: 'ne',
      type: 'string',
    }
  ]
})