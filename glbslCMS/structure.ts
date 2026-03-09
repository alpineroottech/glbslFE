import {type StructureBuilder} from 'sanity/structure'
import {
  CogIcon,
  UsersIcon,
  DocumentTextIcon,
  CreditCardIcon,
  BlockContentIcon,
  ImagesIcon,
  StarIcon,
  TagIcon,
  TransferIcon,
  HeartIcon,
  ComponentIcon,
} from '@sanity/icons'

// Singleton document types that should not allow "Create new"
const singletonTypes = new Set([
  'aboutUsSetting',
  'memberWelfareService',
  'organizationStructure',
  'remittanceService',
])

// Helper to create a singleton list item
function singletonListItem(
  S: StructureBuilder,
  typeName: string,
  title: string,
  icon?: React.ComponentType
) {
  return S.listItem()
    .title(title)
    .icon(icon)
    .child(S.document().schemaType(typeName).documentId(typeName))
}

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // === SITE SETTINGS ===
      S.divider(),
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Site Settings')
            .items([
              singletonListItem(S, 'aboutUsSetting', 'About Us', BlockContentIcon),
              singletonListItem(S, 'organizationStructure', 'Organization Structure', ComponentIcon),
            ])
        ),

      S.divider(),

      // === HERO & DISPLAY ===
      S.listItem()
        .title('Hero Images')
        .icon(ImagesIcon)
        .child(S.documentTypeList('heroImage').title('Hero Images')),

      S.divider(),

      // === PEOPLE & COMMITTEES ===
      S.listItem()
        .title('People & Committees')
        .icon(UsersIcon)
        .child(
          S.list()
            .title('People & Committees')
            .items([
              S.listItem()
                .title('People')
                .icon(UsersIcon)
                .child(S.documentTypeList('person').title('People')),
              S.listItem()
                .title('Committees')
                .icon(UsersIcon)
                .child(S.documentTypeList('committee').title('Committees')),
            ])
        ),

      // === FINANCIAL PRODUCTS ===
      S.listItem()
        .title('Financial Products')
        .icon(CreditCardIcon)
        .child(
          S.list()
            .title('Financial Products')
            .items([
              S.listItem()
                .title('Loan Products')
                .icon(CreditCardIcon)
                .child(S.documentTypeList('loanProduct').title('Loan Products')),
              S.listItem()
                .title('Savings Products')
                .icon(CreditCardIcon)
                .child(S.documentTypeList('savingsProduct').title('Savings Products')),
            ])
        ),

      // === SERVICES ===
      S.listItem()
        .title('Services')
        .icon(TagIcon)
        .child(
          S.list()
            .title('Services')
            .items([
              S.listItem()
                .title('Service Categories')
                .icon(TagIcon)
                .child(S.documentTypeList('serviceCategory').title('Service Categories')),
              singletonListItem(S, 'memberWelfareService', 'Member Welfare Service', HeartIcon),
              singletonListItem(S, 'remittanceService', 'Remittance Service', TransferIcon),
            ])
        ),

      // === NOTICES ===
      S.listItem()
        .title('Notices')
        .icon(DocumentTextIcon)
        .child(S.documentTypeList('notice').title('Notices')),

      // === REPORTS ===
      S.listItem()
        .title('Reports')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('Reports')
            .items([
              S.listItem()
                .title('All Reports')
                .icon(DocumentTextIcon)
                .child(S.documentTypeList('report').title('Reports')),
              S.listItem()
                .title('Report Categories')
                .icon(TagIcon)
                .child(S.documentTypeList('reportCategory').title('Report Categories')),
            ])
        ),

      // === TESTIMONIALS ===
      S.listItem()
        .title('Testimonials')
        .icon(StarIcon)
        .child(S.documentTypeList('testimonial').title('Testimonials')),
    ])

// Filter out singletons from the default "New document" menu
export const singletonActions = (prev: string[], context: {schemaType: string}) => {
  if (singletonTypes.has(context.schemaType)) {
    return prev.filter((action) => action !== 'delete')
  }
  return prev
}

export const newDocumentOptions = (prev: {templateId: string}[]) => {
  return prev.filter((template) => !singletonTypes.has(template.templateId))
}
