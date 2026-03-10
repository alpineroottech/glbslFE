import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {documentInternationalization} from '@sanity/document-internationalization'
import {schemaTypes} from './schemas'
import {structure, newDocumentOptions} from './structure'

// All document types that support i18n (everything except heroImage)
const i18nDocumentTypes = [
  'aboutUsSetting',
  'memberWelfareService',
  'organizationStructure',
  'remittanceService',
  'committee',
  'loanProduct',
  'notice',
  'person',
  'report',
  'reportCategory',
  'savingsProduct',
  'serviceCategory',
  'testimonial',
]

export default defineConfig({
  name: 'gurans-cms',
  title: 'Gurans Laghubitta CMS',
  basePath: '/studio',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'v41axjo7',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
    documentInternationalization({
      supportedLanguages: [
        {id: 'en', title: 'English'},
        {id: 'ne', title: 'Nepali (नेपाली)'},
      ],
      schemaTypes: i18nDocumentTypes,
    }),
  ],

  schema: {
    types: schemaTypes,
    templates: (prev) => {
      // Filter out singleton types from "New document" options
      const singletonTypes = new Set([
        'aboutUsSetting',
        'memberWelfareService',
        'organizationStructure',
        'remittanceService',
      ])
      return prev.filter((template) => !singletonTypes.has(template.id))
    },
  },
})
