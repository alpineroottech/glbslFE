import {defineType, defineField} from 'sanity'

const NEPALI_MONTHS = [
  {title: 'Baisakh (बैशाख)', value: 'Baisakh'},
  {title: 'Jestha (जेठ)', value: 'Jestha'},
  {title: 'Ashadh (आषाढ)', value: 'Ashadh'},
  {title: 'Shrawan (श्रावण)', value: 'Shrawan'},
  {title: 'Bhadra (भाद्र)', value: 'Bhadra'},
  {title: 'Ashwin (आश्विन)', value: 'Ashwin'},
  {title: 'Kartik (कार्तिक)', value: 'Kartik'},
  {title: 'Mangsir (मंसिर)', value: 'Mangsir'},
  {title: 'Poush (पुष)', value: 'Poush'},
  {title: 'Magh (माघ)', value: 'Magh'},
  {title: 'Falgun (फाल्गुण)', value: 'Falgun'},
  {title: 'Chaitra (चैत्र)', value: 'Chaitra'},
]

export default defineType({
  name: 'baseRateEntry',
  title: 'Base Rate Entry',
  type: 'document',
  fields: [
    defineField({
      name: 'nepaliYear',
      title: 'Nepali Year (BS)',
      type: 'number',
      validation: (rule) => rule.required().min(2060).max(2110).integer(),
    }),
    defineField({
      name: 'nepaliMonth',
      title: 'Nepali Month',
      type: 'string',
      options: {list: NEPALI_MONTHS},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'monthlyBaseRate',
      title: 'Monthly Base Rate (%)',
      type: 'string',
      description: 'Enter the rate value, e.g. "14.06%"',
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Year & Month (Newest)',
      name: 'yearMonthDesc',
      by: [
        {field: 'nepaliYear', direction: 'desc'},
        {field: 'nepaliMonth', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {
      year: 'nepaliYear',
      month: 'nepaliMonth',
      rate: 'monthlyBaseRate',
    },
    prepare({year, month, rate}) {
      return {
        title: `${year} ${month}`,
        subtitle: rate ? `Base Rate: ${rate}` : '',
      }
    },
  },
})
