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

// Helper to create a list of documents, filtering out the translated (Nepali) versions
// so they don't clutter the main list. Users will access translations via the Document UI.
function i18nDocumentList(
  S: StructureBuilder,
  typeName: string,
  title: string,
  icon?: React.ComponentType
) {
  return S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.documentList()
        .id(typeName)
        .title(title)
        .schemaType(typeName)
        .filter('_type == $type && language != "ne"')
        .params({ type: typeName })
    )
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
              i18nDocumentList(S, 'person', 'People', UsersIcon),
              i18nDocumentList(S, 'committee', 'Committees', UsersIcon),
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
              i18nDocumentList(S, 'loanProduct', 'Loan Products', CreditCardIcon),
              i18nDocumentList(S, 'savingsProduct', 'Savings Products', CreditCardIcon),
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
              i18nDocumentList(S, 'serviceCategory', 'Service Categories', TagIcon),
              singletonListItem(S, 'memberWelfareService', 'Member Welfare Service', HeartIcon),
              singletonListItem(S, 'remittanceService', 'Remittance Service', TransferIcon),
            ])
        ),

      // === NOTICES ===
      i18nDocumentList(S, 'notice', 'Notices', DocumentTextIcon),

      // === REPORTS ===
      S.listItem()
        .title('Reports')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('Reports')
            .items([
              i18nDocumentList(S, 'report', 'All Reports', DocumentTextIcon),
              i18nDocumentList(S, 'reportCategory', 'Report Categories', TagIcon),
            ])
        ),

      // === TESTIMONIALS ===
      i18nDocumentList(S, 'testimonial', 'Testimonials', StarIcon),
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
