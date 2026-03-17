import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'person',
  title: 'Person',
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
      name: 'position',
      title: 'Position',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'personType',
      title: 'Person Type',
      type: 'string',
      options: {
        list: [
          {title: 'Board Member', value: 'boardMember'},
          {title: 'Management Team', value: 'managementTeam'},
          {title: 'Corporate Team', value: 'corporateTeam'},
          {title: 'Committee Member', value: 'committeeMember'},
          {title: 'Monitoring & Supervision', value: 'monitoringSupervision'},
          {title: 'Information Officer', value: 'informationOfficer'},
          {title: 'Compliance Officer', value: 'complianceOfficer'},
          {title: 'Complaint Officer', value: 'complaintOfficer'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
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
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
      personType: 'personType',
      media: 'image',
    },
    prepare({title, subtitle, personType, media}) {
      return {
        title,
        subtitle: `${subtitle || ''} (${personType || ''})`,
        media,
      }
    },
  },
})
