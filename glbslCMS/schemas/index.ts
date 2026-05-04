// Schema index - exports all document and object types

// Object types (reusable components)
import committeeMember from './objects/committeeMember'
import serviceFeature from './objects/serviceFeature'

// Singleton document types
import aboutUsSetting from './documents/aboutUsSetting'
import memberWelfareService from './documents/memberWelfareService'
import organizationStructure from './documents/organizationStructure'
import remittanceService from './documents/remittanceService'

// Collection document types
import baseRateEntry from './documents/baseRateEntry'
import branch from './documents/branch'
import committee from './documents/committee'
import heroImage from './documents/heroImage'
import loanProduct from './documents/loanProduct'
import notice from './documents/notice'
import person from './documents/person'
import report from './documents/report'
import reportCategory from './documents/reportCategory'
import savingsProduct from './documents/savingsProduct'
import serviceCategory from './documents/serviceCategory'
import testimonial from './documents/testimonial'

export const schemaTypes = [
  // Objects
  committeeMember,
  serviceFeature,

  // Singletons
  aboutUsSetting,
  memberWelfareService,
  organizationStructure,
  remittanceService,

  // Collections
  baseRateEntry,
  branch,
  committee,
  heroImage,
  loanProduct,
  notice,
  person,
  report,
  reportCategory,
  savingsProduct,
  serviceCategory,
  testimonial,
]
