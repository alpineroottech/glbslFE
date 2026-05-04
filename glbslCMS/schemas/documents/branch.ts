import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'branch',
  title: 'Branch',
  type: 'document',
  fields: [
    defineField({
      name: 'sn',
      title: 'Serial Number',
      type: 'number',
      validation: (rule) => rule.required().integer().positive(),
    }),
    defineField({
      name: 'name',
      title: 'Branch Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'district',
      title: 'District',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'municipality',
      title: 'Municipality / Rural Municipality',
      type: 'string',
    }),
    defineField({
      name: 'ward',
      title: 'Ward No.',
      type: 'number',
      validation: (rule) => rule.integer().positive(),
    }),
    defineField({
      name: 'locality',
      title: 'Locality / Tole',
      type: 'string',
    }),
    defineField({
      name: 'contactPerson',
      title: 'Contact Person (Branch Manager)',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'managerImage',
      title: 'Branch Manager Image',
      type: 'image',
      description: 'Upload the branch manager photo here when available.',
      options: {hotspot: true},
    }),
  ],
  orderings: [
    {
      title: 'Serial Number',
      name: 'snAsc',
      by: [{field: 'sn', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      district: 'district',
      sn: 'sn',
      media: 'managerImage',
    },
    prepare({title, district, sn, media}) {
      return {
        title: `${sn ? `#${sn} ` : ''}${title || 'Branch'}`,
        subtitle: district || '',
        media,
      }
    },
  },
})
