import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'savingsProduct',
  title: 'Savings Product',
  type: 'document',
  fields: [
defineField({
      name: 'name',
      title: 'Name',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'interestRate',
      title: 'Interest Rate',
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
      interestRate: 'interestRate',
    },
    prepare({title, interestRate}) {
      return {
        title,
        subtitle: interestRate ? `Rate: ${interestRate}` : '',
      }
    },
  },
})
