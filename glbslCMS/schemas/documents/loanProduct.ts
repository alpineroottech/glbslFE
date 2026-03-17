import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'loanProduct',
  title: 'Loan Product',
  type: 'document',
  fields: [
defineField({
      name: 'name',
      title: 'Name',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'volume',
      title: 'Volume',
      type: 'string',
    }),
    defineField({
      name: 'rate',
      title: 'Rate',
      type: 'string',
    }),
    defineField({
      name: 'serviceCharge',
      title: 'Service Charge',
      type: 'string',
    }),
    defineField({
      name: 'term',
      title: 'Term',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      rate: 'rate',
    },
    prepare({title, rate}) {
      return {
        title,
        subtitle: rate ? `Rate: ${rate}` : '',
      }
    },
  },
})
