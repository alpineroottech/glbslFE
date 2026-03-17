import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {languageFilter} from '@sanity/language-filter'
import {schemaTypes} from './schemas'
import {structure, newDocumentOptions} from './structure'

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
    languageFilter({
      supportedLanguages: [
        {id: 'en', title: 'English'},
        {id: 'ne', title: 'Nepali'},
      ],
      defaultLanguages: ['en'],
      documentTypes: ['aboutUsSetting', 'memberWelfareService', 'organizationStructure', 'remittanceService', 'committee', 'loanProduct', 'notice', 'person', 'report', 'reportCategory', 'savingsProduct', 'serviceCategory', 'testimonial'],
      filterField: (enclosingType, member, selectedLanguageIds) => {
        // Only filter these specific field types
        if (!['localeString', 'localeText', 'localeBlock'].includes(enclosingType.name)) {
          return true
        }
        return selectedLanguageIds.includes(member.name)
      },
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
