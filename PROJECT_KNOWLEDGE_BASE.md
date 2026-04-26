# 📚 GLBSL FRONTEND - COMPREHENSIVE PROJECT KNOWLEDGE BASE

**Last Updated:** April 26, 2026  
**Project Name:** Gurans Laghubitta Bittiya Sanstha Ltd. (GLBSL) Frontend  
**Status:** Production-Ready with Critical Security Improvements Pending

---

## TABLE OF CONTENTS

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture & Design Patterns](#architecture--design-patterns)
4. [Project Structure](#project-structure)
5. [Key Implementations](#key-implementations)
6. [Functionalities](#functionalities)
7. [Integration Details](#integration-details)
8. [Current Status & What Has Been Done](#current-status--what-has-been-done)
9. [Critical Issues & Fixes Required](#critical-issues--fixes-required)
10. [High Priority Issues](#high-priority-issues)
11. [Development Guidelines](#development-guidelines)
12. [Deployment & Environment Setup](#deployment--environment-setup)
13. [Important Conventions & Patterns](#important-conventions--patterns)
14. [Troubleshooting & Common Issues](#troubleshooting--common-issues)

---

## PROJECT OVERVIEW

### What is GLBSL?
**Gurans Laghubitta Bittiya Sanstha Limited** is a Nepalese microfinance institution. The frontend website presents their financial services, organizational information, reports, notices, and career opportunities to the public.

### Website Purpose
- Showcase financial products (loans, savings, remittance, member welfare)
- Publish organizational information (board members, management, structure)
- Distribute reports and notices
- Provide online loan application and complaint registration
- Display branch locations across Nepal
- Offer calculators for EMI and interest

### Key Features
- ✅ Bilingual support (English/Nepali) with full content localization
- ✅ Responsive design (mobile-first, all devices)
- ✅ Dark mode support
- ✅ Search functionality with fuzzy matching
- ✅ Email integration for form submissions
- ✅ PDF/document viewer for reports
- ✅ Dynamic content from Sanity CMS
- ✅ SEO-optimized pages
- ✅ Embedded Sanity Studio for content management

### Organization
- **Client:** Gurans Bank Management
- **Deployment:** Vercel (Frontend), DigitalOcean (Sanity CMS Backend)
- **Domain:** guranslaghubitta.com.np
- **CMS:** Sanity v3 (hosted separately)
- **Email Service:** Resend (serverless)

---

## TECHNOLOGY STACK

### Frontend Framework
| Component | Technology | Version |
|-----------|-----------|---------|
| **Framework** | React | 18.2.0 |
| **Language** | TypeScript | Latest |
| **Build Tool** | Vite | 7.1.3 |
| **CSS Framework** | Tailwind CSS | 3.3.6 |
| **CSS Components** | Flowbite | 0.6.0 |
| **Routing** | React Router DOM | 6.15.0 |
| **State Management** | React Context API | N/A |
| **Animation** | AOS (Animate On Scroll) | 3.0.0-beta.6 |
| **Forms** | Formik + Yup | 2.4.6 / 1.7.0 |
| **Carousels** | Swiper | 10.2.0 |
| **Icons** | React Icons | 4.11.0 |
| **Modal/Alert** | SweetAlert2 | 11.9.0 |
| **Select Dropdown** | React Select | 5.8.0 |
| **Helmet** | React Helmet Async | 1.3.0 |

### Backend & CMS
| Component | Technology | Details |
|-----------|-----------|---------|
| **CMS** | Sanity v3 | Headless CMS with embedded studio |
| **Sanity Client** | @sanity/client | 7.16.0 |
| **Image URL Builder** | @sanity/image-url | 2.0.3 |
| **Internationalization** | @sanity/document-internationalization | 3.3.3 |
| **Query Language** | GROQ | Sanity native query language |

### Deployment & Serverless
| Component | Platform | Purpose |
|-----------|----------|---------|
| **Frontend Hosting** | Vercel | React app deployment |
| **Email API** | Resend | Send form submission emails |
| **Serverless Functions** | Vercel Functions | `/api/send-email.ts` |
| **CMS Backend** | DigitalOcean App Platform | Sanity CMS hosting |
| **Database** | Sanity Hosted | CMS data storage |

### Development Tools
| Tool | Purpose |
|------|---------|
| ESLint | Code linting & quality |
| PostCSS | CSS processing for Tailwind |
| Autoprefixer | CSS vendor prefixes |
| TypeScript | Type safety & development |

### Package Management & Version Control
- **Package Manager:** npm (v9+)
- **Node Version:** 20.0.0+ (checked in `check-node` script)
- **Version Control:** Git (GitHub hosted)

---

## ARCHITECTURE & DESIGN PATTERNS

### Overall Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Vercel)                    │
│  ┌─────────────────────────────────────────────────┐   │
│  │ React + TypeScript + Vite                       │   │
│  │ ┌──────────────┐  ┌──────────────┐            │   │
│  │ │ UI Components│  │   Contexts   │            │   │
│  │ │ (React)      │  │ (State Mgmt) │            │   │
│  │ └──────────────┘  └──────────────┘            │   │
│  │         ↓              ↓                        │   │
│  │ ┌──────────────────────────────┐              │   │
│  │ │   Service Layer              │              │   │
│  │ │  (src/services/strapi.ts)    │              │   │
│  │ │  - GROQ queries              │              │   │
│  │ │  - Data transformation       │              │   │
│  │ └──────────────────────────────┘              │   │
│  │         ↓                                      │   │
│  │ ┌──────────────────────────────┐              │   │
│  │ │   Sanity Client              │              │   │
│  │ │  (@sanity/client)            │              │   │
│  │ └──────────────────────────────┘              │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
         ↓                              ↓
┌──────────────────────┐      ┌──────────────────────┐
│  Sanity CMS          │      │  Resend Email        │
│  (DigitalOcean)      │      │  (Serverless API)    │
│  - Content Types     │      │  - Form Emails       │
│  - Media Assets      │      │  - Admin Alerts      │
│  - Localization      │      └──────────────────────┘
└──────────────────────┘
```

### Component Architecture

#### Three-Tier Component Structure

1. **Page Components** (in `/Pages`)
   - Top-level route components
   - Manage page-level state
   - Coordinate data fetching
   - Handle layout and structure

2. **Feature Components** (in `/Components` & `/Pages/InnerPage`)
   - Reusable within feature sections
   - Self-contained business logic
   - Own state management when needed
   - Example: `Reports`, `Testimonial`, `HeroSection`

3. **Shared Components** (in `/Shared`)
   - Global reusable UI elements
   - No business logic
   - Example: `Navbar`, `Footer`, `BreadCrumb`, `SearchBar`

### State Management Pattern

```typescript
// LanguageContext - Global language state
Context → localStorage → useLanguage() hook → All components

// SearchContext - Global search state
Static Index + Dynamic Content → useSearch() hook → SearchBar & Navigation

// Component State - Local state per component
useState() → useEffect() dependencies → data fetching
```

### Data Flow

```
User Action (Language Toggle/Navigation)
    ↓
Context Update (LanguageContext/SearchContext)
    ↓
useEffect Triggers (dependency array includes context)
    ↓
Service Function Called (strapi.ts methods)
    ↓
GROQ Query Executed
    ↓
Sanity CMS Response
    ↓
Data Transformation (mappers, helpers)
    ↓
Component State Updated (setState)
    ↓
Component Re-render with new data
```

### Key Design Patterns Used

#### 1. **Custom Hooks Pattern**
```typescript
// useLanguage - Access language context anywhere
const { language, setLanguage, t } = useLanguage();

// useSearch - Access search context
const { searchQuery, searchResults } = useSearch();
```

#### 2. **Provider Pattern**
```typescript
// main.tsx
<LanguageProvider>
  <SearchProvider>
    <RouterProvider router={router} />
  </SearchProvider>
</LanguageProvider>
```

#### 3. **Service Layer Pattern**
```typescript
// Centralized API calls in src/services/strapi.ts
export const aboutService = {
  getAboutUs: async () => { /* GROQ query */ },
  getBoardMembers: async () => { /* GROQ query */ },
  // ... more methods
};
```

#### 4. **Lazy Loading Pattern**
```typescript
// Routes using React.lazy() for code splitting
const StudioPage = React.lazy(() => import('../Pages/Studio/StudioPage'));
```

#### 5. **Error Boundary Needed** (NOT IMPLEMENTED - CRITICAL)
- Should wrap App component
- Catch React component errors
- Prevent full app crash

---

## PROJECT STRUCTURE

```
glbslFE/
├── public/                       # Static assets
│   ├── _redirects               # Vercel redirects config
│   ├── fav-icon/                # Favicon & icon assets
│   ├── images/                  # Hero, home, section images
│   │   ├── home-1/              # Homepage images
│   │   └── inner/               # Inner page images
│   └── food.menu.json          # (unused)
│
├── src/                          # Main application source
│   ├── main.tsx                 # Entry point with providers
│   ├── index.css                # Global styles
│   ├── vite-env.d.ts            # Vite type definitions
│
│   ├── Router/
│   │   └── Router.tsx           # All route definitions
│
│   ├── Main/
│   │   └── Main.tsx             # Main layout wrapper (Navbar, Footer, etc)
│
│   ├── Pages/                   # Page components (route-level)
│   │   ├── Home1/               # Homepage
│   │   ├── About/               # About section pages
│   │   │   ├── AboutUs.tsx
│   │   │   ├── BoardOfDirectors.tsx
│   │   │   ├── ManagementTeam.tsx
│   │   │   ├── CorporateTeam.tsx
│   │   │   ├── Committee.tsx
│   │   │   └── OrganizationStructure.tsx
│   │   ├── Services/            # Services section pages
│   │   │   └── services/
│   │   ├── InnerPage/           # Inner pages
│   │   │   ├── Contact.tsx
│   │   │   ├── Reports/         # Report pages (Quarterly, Annual, etc)
│   │   │   ├── Career/          # Job pages (Apply, Notices)
│   │   │   ├── Online/          # Online tools (EMI, Interest Calc)
│   │   │   ├── Gunaso/          # Complaint registration
│   │   │   └── ReportsPage.tsx
│   │   ├── Branches/            # Branches listing page
│   │   │   ├── BranchesPage.tsx
│   │   │   ├── components/      # Branch-specific components
│   │   │   └── data/
│   │   │       └── index.ts     # Static branch data (36 branches)
│   │   └── Studio/              # Sanity Studio page
│   │
│   ├── Components/              # Reusable feature components
│   │   ├── HeroSection/         # Homepage hero carousel
│   │   ├── Offers/              # Officer/official roles section
│   │   ├── Reports/             # Reports display component
│   │   ├── Testimonial/         # Customer testimonials carousel
│   │   ├── Facilities/          # Features/facilities section
│   │   ├── Rooms/               # Services/products section
│   │   ├── CallDoAction/        # CTA section
│   │   ├── Brand/               # Brand section
│   │   ├── NoticePopup/         # Popup notice modal
│   │   └── TeclientRevew/       # (unused)
│
│   ├── Shared/                  # Global shared components
│   │   ├── Navbar/              # Top navigation
│   │   ├── Footer/              # Footer
│   │   ├── SearchBar/           # Search functionality
│   │   ├── Helmet/              # SEO meta tags
│   │   ├── ErrorPage/           # 404/error page
│   │   └── GoToTop.tsx          # Scroll to top button
│
│   ├── contexts/                # React Context providers
│   │   ├── LanguageContext.tsx  # Language state (EN/NE)
│   │   └── SearchContext.tsx    # Search state & indexing
│
│   ├── services/                # API & data fetching
│   │   └── strapi.ts            # Sanity service layer (all GROQ queries)
│
│   ├── lib/                     # Utility libraries & configs
│   │   └── sanity.ts            # Sanity client initialization
│
│   ├── utils/                   # Helper functions
│   │   ├── translations.ts      # All EN/NE translations
│   │   ├── strapiHelpers.ts     # Data transformation helpers
│   │   ├── validation.ts        # Form & data validation
│   │   ├── navLink.ts           # Navigation utilities
│   │   └── maps.ts              # Map-related utilities
│
│   ├── types/                   # TypeScript type definitions
│   │   ├── index.ts             # Global types
│   │   └── language.ts          # Language types
│
│   ├── BreadCrumb/              # Breadcrumb navigation component
│   │   └── BreadCrumb.tsx
│
│   └── ScrollToTop.tsx          # Auto scroll on route change
│
├── api/                         # Vercel serverless functions
│   └── send-email.ts            # Email API endpoint
│
├── glbslCMS/                    # Sanity Studio directory
│   ├── sanity.config.ts         # Studio configuration
│   └── schemaTypes/             # Content type definitions
│
├── Configuration Files
│   ├── .env.example             # Environment template
│   ├── .env                     # Actual env vars (git ignored)
│   ├── .eslintrc.cjs            # ESLint configuration
│   ├── .gitignore               # Git ignore rules
│   ├── vercel.json              # Vercel deployment config
│   ├── vite.config.ts           # Vite build configuration
│   ├── tsconfig.json            # TypeScript configuration
│   ├── tailwind.config.js       # Tailwind customization
│   ├── postcss.config.js        # PostCSS plugins
│   ├── package.json             # Dependencies & scripts
│   └── package-lock.json        # Dependency lock file
│
├── Documentation
│   ├── README.md                # Project README
│   ├── COMPREHENSIVE_AUDIT_REPORT.md  # Full security/quality audit
│   ├── PROJECT_KNOWLEDGE_BASE.md      # This file
│   └── documentation/
│       ├── CHANGELOG.md
│       ├── SYSTEM_READY_GUIDE.md
│       ├── LOCAL_TESTING_GUIDE.md
│       ├── EMAIL_INTEGRATION_SETUP.md
│       ├── PRODUCTION_FIXES.md
│       └── ... (other docs)
│
└── dist/                        # Production build output (git ignored)
```

---

## KEY IMPLEMENTATIONS

### 1. **Language Context & Internationalization**

**File:** `src/contexts/LanguageContext.tsx`

**How it works:**
```typescript
// Provides language state globally
{
  language: 'en' | 'ne',
  setLanguage: (lang: Language) => void,
  t: (key: string) => string  // Translation function
}
```

**Key Features:**
- Persists language choice to localStorage
- Sets document `lang` attribute for accessibility
- Triggers component re-renders via dependency arrays
- Translation keys stored in `src/utils/translations.ts`

**Implementation Pattern:**
```typescript
// In any component
const { language, t } = useLanguage();

// All CMS fetches automatically use current language
useEffect(() => {
  const fetchData = async () => {
    // Service automatically calls getLocale() which reads localStorage
    const data = await aboutService.getBoardMembers();
    setData(data);
  };
  fetchData();
}, [language]); // ✅ CRITICAL: Include language dependency
```

### 2. **Sanity CMS Integration**

**File:** `src/lib/sanity.ts`

**Configuration:**
```typescript
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'v41axjo7';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-03-08',
  useCdn: true  // CDN caching enabled (1-5 min delay)
});
```

**Service Layer:** `src/services/strapi.ts`

Contains all GROQ queries organized by domain:

```typescript
// About Service
aboutService.getAboutUs()           // Mission, vision, goals
aboutService.getBoardMembers()      // Board directors
aboutService.getManagementTeam()    // Management staff
aboutService.getCommittees()        // Committee structure

// Services
servicesService.getLoanProducts()   // Loan details & rates
servicesService.getSavingsProducts()// Savings schemes
servicesService.getRemittanceService() // Remittance info

// Reports & Notices
reportsService.getAllReports()      // Published reports
noticesService.getAllNotices()      // Public notices

// Other
branchesService.getBranches()       // Branch locations
testimonialsService.getTestimonials() // Customer testimonials
```

**Locale Strategy:**
- All queries filter by `language` parameter
- `getLocale()` function reads from localStorage
- Falls back to 'en' if not set
- Components trigger refetch on language toggle via useEffect dependency

### 3. **Email Integration (Resend)**

**File:** `api/send-email.ts`

**Architecture:**
- Serverless Vercel Function at `/api/send-email`
- Receives POST requests with form data
- Generates HTML email templates
- Sends via Resend API
- Supports 3 form types: contact, loan application, complaint

**Form Types:**
```typescript
// Contact Form
POST /api/send-email
{ formType: 'contact', data: { name, email, phone, subject, message } }

// Loan Application
POST /api/send-email
{ formType: 'loan', data: { fullName, email, loanAmount, branchOffice, ... } }

// Complaint Registration
POST /api/send-email
{ formType: 'complaint', data: { fullName, mobileNumber, complaint, ... } }
```

**Email Template Features:**
- HTML formatted with inline CSS
- Bilingual support (English/Nepali)
- Secure HTML escaping (escapeHtml function)
- Professional bank branding

**Current Issues:**
- ❌ No input validation
- ❌ No rate limiting
- ❌ No CSRF protection
- ❌ Incomplete HTML escaping
- ⚠️ Recipient email hardcoded to `info@rootalpine.com`

### 4. **Search Functionality**

**Files:**
- `src/contexts/SearchContext.tsx` - Search logic & indexing
- `src/Shared/SearchBar/SearchBar.tsx` - UI component

**Features:**
- 29 pages indexed in 2 languages
- Fuzzy matching using Levenshtein distance algorithm
- Real-time search-as-you-type
- Relevance scoring (0-100%)
- Mobile-responsive dropdown

**Search Index:**
Static index in SearchContext + Dynamic content from Sanity:
- Board members, management, corporate teams
- Loan products, savings products
- Reports, notices, branches
- Career opportunities, committees

**Implementation Pattern:**
```typescript
// Levenshtein distance algorithm calculates match relevance
// Searches across title, keywords, and content
// Results sorted by relevance score
// Debounced 300ms to prevent excessive processing
```

### 5. **Form Submission Pattern**

**Example:** `src/Pages/InnerPage/Contact.tsx`

**Standard Form Flow:**
```typescript
// 1. State management
const [formData, setFormData] = useState({ /* fields */ });
const [isSubmitting, setIsSubmitting] = useState(false);

// 2. Input change handler
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};

// 3. Form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'contact',
        data: { ...formData, language }
      })
    });
    
    if (!response.ok) throw new Error('Failed to send');
    
    // Success handling
    Swal.fire({ icon: 'success', ... });
    setFormData({ /* reset */ });
  } catch (error) {
    console.error(error);
    Swal.fire({ icon: 'error', ... });
  } finally {
    setIsSubmitting(false);
  }
};
```

**Issues with current implementation:**
- ❌ No client-side validation
- ⚠️ No form reset on validation error
- ⚠️ No request timeout handling
- ⚠️ No rate limiting per user
- ⚠️ No file upload validation

### 6. **Responsive Design & Styling**

**Tailwind CSS Configuration:**
- Custom breakpoints: esm:480px, sm:576px, lg:992px, xl:1200px, 2xl:1400px
- Custom colors: khaki, lightBlack, normalBlack, lightGray, gray
- Dark mode: `dark:` class prefix throughout
- Fonts: font-Garamond (headings), font-Lora (body), font-Nepali (Nepali text)

**Component Styling Pattern:**
```tsx
<div className="
  // Base styles
  bg-white dark:bg-normalBlack
  text-lightBlack dark:text-white
  
  // Responsive sizes
  px-5 sm:px-8 lg:px-10 2xl:px-20
  py-10 lg:py-20 2xl:py-[120px]
  
  // Flexbox layout
  flex items-center justify-between
  gap-5 lg:gap-10
  
  // Responsive grid
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  
  // Animations
  transition-all duration-300
  hover:opacity-90
">
```

### 7. **Data Fetching & State Management Pattern**

**Standard useEffect Pattern (for all data-driven pages):**
```typescript
const [data, setData] = useState<DataType[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const { language } = useLanguage(); // CRITICAL for language-aware fetching

useEffect(() => {
  const fetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await serviceMethod();
      setData(result);
    } catch (err) {
      console.error(err);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };
  fetch();
}, [language]); // ✅ ALWAYS include language dependency

// Render states
if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage message={error} />;
if (!data.length) return <EmptyState />;
return <DataDisplay data={data} />;
```

---

## FUNCTIONALITIES

### ✅ IMPLEMENTED & WORKING

#### Content Management
- [x] Bilingual content (EN/NE) from Sanity CMS
- [x] Language toggle with persistence
- [x] Automatic content refetch on language change
- [x] Rich text rendering from Sanity
- [x] Media asset serving with URL optimization
- [x] Dynamic page generation from CMS

#### About Section
- [x] About Us page (Mission, Vision, Values)
- [x] Board of Directors page
- [x] Management Team page
- [x] Corporate Team page
- [x] Committee structure display
- [x] Organization structure with hierarchy

#### Services Section
- [x] Loan Services (products table with rates)
- [x] Savings Services
- [x] Remittance Services
- [x] Member Welfare Services
- [x] EMI Calculator (loan calculator)
- [x] Interest Calculator
- [x] Loan Application form
- [x] Service details pages

#### Reports & Notices
- [x] Quarterly Reports display
- [x] Annual Reports display
- [x] AGM Minutes display
- [x] Base Rate information
- [x] Staff Training reports
- [x] Governance reports
- [x] Public Notices display
- [x] Notice categorization (urgent, general, etc)
- [x] PDF preview/viewer for documents

#### Career Section
- [x] Career Notices page
- [x] Job Application form
- [x] Application Form page (complex multi-step)
- [x] File upload handling

#### User Features
- [x] Contact Form (with Resend integration)
- [x] Complaint Registration form
- [x] Branch Location page (36 branches)
- [x] Search functionality (29 pages)
- [x] Dark/Light mode toggle
- [x] Responsive mobile design
- [x] Scroll animations (AOS)
- [x] Email notifications on form submission

#### Technical Features
- [x] SEO meta tags (Helmet)
- [x] Breadcrumb navigation
- [x] Error pages (404)
- [x] Loading states
- [x] Embedded Sanity Studio (`/studio`)
- [x] Lazy route loading
- [x] Environment-based configuration

### ⚠️ PARTIALLY WORKING / RISKY

- ⚠️ **Form Validation:** No client-side validation (relying on user honesty)
- ⚠️ **Error Handling:** Inconsistent patterns (Swal vs state vs console)
- ⚠️ **Testimonials:** Missing language dependency (stale content)
- ⚠️ **Search:** Full content indexed (may expose sensitive paths)
- ⚠️ **Email Submission:** No rate limiting (potential spam/abuse)
- ⚠️ **File Upload:** No size/type validation
- ⚠️ **Security Headers:** Minimal CSRF/XSS protection

### ❌ NOT IMPLEMENTED / BROKEN

- [ ] **Form Validation Library** - Formik/Yup installed but unused
- [ ] **Error Boundary** - React crash not handled
- [ ] **Structured Logging** - No error tracking service (Sentry, LogRocket)
- [ ] **Rate Limiting** - Forms can be spammed
- [ ] **Input Sanitization** - HTML/JS injection risk
- [ ] **CSRF Protection** - Forms vulnerable to forged requests
- [ ] **Request Timeout** - No timeout on API calls
- [ ] **Request Deduplication** - Multiple simultaneous requests possible
- [ ] **Service Worker** - No offline support
- [ ] **Analytics** - No usage tracking implemented
- [ ] **A/B Testing** - No feature flags
- [ ] **Integration Tests** - No test suite
- [ ] **Accessibility** - Not WCAG 2.1 AA compliant

---

## INTEGRATION DETAILS

### Sanity CMS Integration

**CMS URL:** 
- Local: `http://localhost:1337`
- Production: `https://gurans-cms-dlm49.ondigitalocean.app`

**Content Types:**

#### Single Types (settings/configuration):
- `aboutUsSetting` - Organization info (mission, vision, goal, description)
- `organizationStructure` - Org chart and structure
- `remittanceService` - Remittance service details
- `memberWelfareService` - Member welfare program info

#### Collections (repeating content):
- `person` - Team members, board directors (personType: enum filtering)
- `committee` - Committee structure with members
- `loanProduct` - Loan types with rates
- `savingsProduct` - Savings schemes with rates
- `report` - Financial reports (quarterly, annual, AGM)
- `notice` - Public notices (career, general, urgent)
- `branches` - Branch locations (currently hardcoded)
- `testimonial` - Customer testimonials
- `heroImages` - Homepage hero carousel images

**Localization Strategy:**
- All content types have `language` field
- Queries filter by language: `*[_type == "person" && language == $lang]`
- Components trigger refetch when language changes
- Fallback to 'en' if translations missing

**Image Handling:**
```typescript
// Sanity image objects processed with:
urlFor(imageObject)
  .auto('format')    // Auto format selection (WebP, JPG)
  .quality(80)       // 80% quality for optimization
  .url()
```

### Email Integration (Resend)

**API Key Storage:**
- ✅ Stored in Vercel dashboard environment variables
- ✅ NOT in `.env` file (security best practice)
- ❌ No key rotation policy

**Email Configuration:**
```typescript
const resend = new Resend(process.env.RESEND_API_KEY);

// Sends from: Gurans Bank Website <noreply@glbsl.com.np>
// Recipient: info@rootalpine.com (hardcoded - should be configurable)
```

**Supported Form Types:**
1. **Contact Form** - Customer inquiries
2. **Loan Application** - Loan requests
3. **Complaint Registration** - User complaints

**Template Features:**
- Professional HTML with inline CSS
- Bilingual content support
- Recipient form data in formatted table
- Timestamp in Kathmandu timezone
- Styled with bank branding (khaki/green)

### GitHub Integration

**Repository:**
- Connected to GitHub for version control
- Deployment triggers on push to main branch
- Commit history tracked

**Current Status:**
- Last commit included security fixes and language dependency updates
- `.env` and sensitive files properly ignored
- Build artifacts not versioned

---

## CURRENT STATUS & WHAT HAS BEEN DONE

### Session History & Completed Work

#### Previous Session Work (Immediate Past)
1. **Fixed Language Toggle Bug:**
   - Issue: Toggling EN ↔ NE didn't refresh CMS API queries
   - Solution: Added `[language]` dependency to useEffect hooks
   - Files Modified: All major page components
   - Status: ✅ FIXED

2. **Restored Environment Configuration:**
   - Issue: Missing `.env` file caused API key lookup failures
   - Solution: Created `.env` from `.env.example` template
   - Files Modified: `.env` (git-ignored, tracked separately)
   - Status: ✅ FIXED

3. **Verified Build Process:**
   - Executed `npm run build` successfully
   - Build output: ~1m 1s completion time
   - No fatal Vite/Rollup errors
   - Output: `/dist` directory ready for deployment
   - Status: ✅ VERIFIED

4. **Security Audit (npm audit):**
   - Ran `npm audit` and identified 52 vulnerabilities
   - Ran `npm audit fix` to patch non-breaking issues
   - Result: 38 vulnerabilities remain (require major version upgrades)
   - Critical: Swiper v10 prototype pollution (cannot fix without v11, unavailable)
   - Status: ⚠️ PARTIALLY MITIGATED

5. **ESLint Configuration Issue:**
   - Issue: `npm run lint` fails with "@typescript-eslint/recommended" not found
   - Root Cause: Version mismatch in `.eslintrc.cjs`
   - Status: ⚠️ KNOWN ISSUE (not critical to functionality)

### What Has Been Accomplished in Full Project Lifecycle

✅ **Architecture & Setup**
- Established React + TypeScript + Vite foundation
- Configured Tailwind CSS + Flowbite
- Set up React Router with nested route structure
- Implemented Context API for state management
- Integrated Sanity CMS with GROQ queries

✅ **Core Features Implemented**
- Bilingual support (EN/Nepali) with full localization
- Language persistence via localStorage
- Sanity CMS integration with dynamic content
- Email integration via Resend serverless functions
- Search functionality with fuzzy matching (29 pages indexed)
- Responsive design across all devices
- Dark mode support
- Scroll animations (AOS)

✅ **Content Management**
- 50+ page components built and connected
- Complex data fetching patterns implemented
- Form submissions (Contact, Loan, Complaint, Job Application)
- PDF viewer for reports
- Carousels (Hero, Testimonials, Reports)

✅ **Production Deployment Setup**
- Vercel deployment configured
- Serverless email function setup
- Production environment variables configured
- Build optimization (though minification disabled)
- Security headers configured in vercel.json

✅ **Documentation Created**
- Comprehensive Audit Report (250+ items cataloged)
- Setup guides and changelogs
- Feature documentation
- Troubleshooting guides

---

## CRITICAL ISSUES & FIXES REQUIRED

### 🔴 CRITICAL (Security Risk - Fix Immediately)

#### Issue #1: XSS Vulnerability in Email Templates
**Severity:** CRITICAL  
**File:** `api/send-email.ts`  
**Problem:**
- `escapeHtml()` function incomplete (missing backticks, forward slashes)
- User input injected into email HTML without full escaping
- Can execute arbitrary HTML/JavaScript in email templates

**Fix:**
```typescript
// Replace current escapeHtml with complete version:
const escapeHtml = (str: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#47;',
    '`': '&#96;',
  };
  return String(str).replace(/[&<>"'`/]/g, (char) => map[char]);
};

// Update all data fields to use escapeHtml:
<tr><td>Loan Amount:</td><td>${escapeHtml(data.loanAmount)}</td></tr>
```

#### Issue #2: No CSRF Protection
**Severity:** CRITICAL  
**File:** `api/send-email.ts`  
**Problem:**
- Forms can be forged from malicious websites
- No CSRF token validation
- No origin checking

**Fix:**
```typescript
// Add CORS & CSRF validation to send-email.ts:
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS check
  const origin = req.headers.origin || req.headers.referer;
  const allowedOrigins = [
    'https://guranslaghubitta.com.np',
    'https://www.guranslaghubitta.com.np'
  ];
  
  if (!origin || !allowedOrigins.some(allowed => origin.includes(allowed))) {
    return res.status(403).json({ error: 'CORS policy violation' });
  }

  // Add CSRF token validation (requires frontend change too)
  const token = req.headers['x-csrf-token'];
  if (!token || !isValidToken(token)) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }

  // ... rest of handler
}
```

#### Issue #3: Exposed Sanity Project ID
**Severity:** CRITICAL  
**File:** `src/lib/sanity.ts`  
**Problem:**
- Hardcoded fallback: `const projectId = ... || 'v41axjo7'`
- Exposes project ID if environment variable missing
- Allows unauthorized CMS queries

**Fix:**
```typescript
// Remove fallback, throw error instead
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
if (!projectId) {
  throw new Error(
    'VITE_SANITY_PROJECT_ID environment variable is missing. ' +
    'Check .env file and Vercel deployment settings.'
  );
}

const dataset = import.meta.env.VITE_SANITY_DATASET;
if (!dataset) {
  throw new Error(
    'VITE_SANITY_DATASET environment variable is missing.'
  );
}
```

#### Issue #4: Missing Form Validation
**Severity:** CRITICAL  
**Files:** All form pages (Contact, Loan, Complaint, Job Application)  
**Problem:**
- No client-side validation before API submission
- Email fields not validated
- Phone numbers not validated
- No character limits enforced
- SQL injection-like attacks possible

**Fix - Implement Formik + Yup (already installed):**
```typescript
// Example: src/Pages/InnerPage/Contact.tsx
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address'),
  phone: Yup.string()
    .matches(/^[0-9+\-().\s]+$/, 'Invalid phone number')
    .required('Phone is required'),
  subject: Yup.string()
    .required('Subject is required')
    .max(100, 'Subject cannot exceed 100 characters'),
  message: Yup.string()
    .required('Message is required')
    .max(1000, 'Message cannot exceed 1000 characters')
});

// Use Formik wrapper
<Formik
  initialValues={{ name: '', email: '', phone: '', subject: '', message: '' }}
  validationSchema={validationSchema}
  onSubmit={async (values) => {
    // Only proceeds if all validations pass
    await handleSubmit(values);
  }}
>
  {({ isSubmitting, isValid }) => (
    <Form>
      <Field name="name" placeholder="Your Name" />
      <ErrorMessage name="name" component="div" className="text-red-500" />
      
      {/* ... other fields */}
      
      <button type="submit" disabled={!isValid || isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send'}
      </button>
    </Form>
  )}
</Formik>
```

#### Issue #5: Testimonial Component Missing Language Dependency
**Severity:** CRITICAL  
**File:** `src/Components/Testimonial/Testimonial.tsx` (Line 56)  
**Problem:**
- useEffect missing `language` dependency
- Component doesn't refetch testimonials on language toggle
- Displays stale English testimonials even after switching to Nepali

**Fix:**
```typescript
// BEFORE (BROKEN):
useEffect(() => {
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const data = await testimonialsService.getTestimonials();
      setTestimonials(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch testimonials:', err);
      setError('Failed to load testimonials. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  fetchTestimonials();
}, []); // ❌ MISSING language dependency

// AFTER (FIXED):
useEffect(() => {
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const data = await testimonialsService.getTestimonials();
      setTestimonials(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch testimonials:', err);
      setError('Failed to load testimonials. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  fetchTestimonials();
}, [language]); // ✅ Added language dependency
```

#### Issue #6: No Input Sanitization
**Severity:** CRITICAL  
**Files:** All form components  
**Problem:**
- User input displayed without sanitization
- Risk of DOM-based XSS attacks
- HTML entities not properly escaped in output

**Fix - Install and use DOMPurify:**
```bash
npm install dompurify
npm install --save-dev @types/dompurify
```

```typescript
import DOMPurify from 'dompurify';

// Sanitize user input before display
const sanitizeInput = (dirty: string): string => {
  return DOMPurify.sanitize(dirty, { 
    ALLOWED_TAGS: [],  // No HTML tags allowed
    ALLOWED_ATTR: [] 
  });
};

// Use when displaying form data
<p>{sanitizeInput(formData.userMessage)}</p>
```

#### Issue #7: No Error Boundary Component
**Severity:** CRITICAL  
**Impact:** Single component error crashes entire app  
**Solution:** Wrap app with Error Boundary

**Implementation:**
```typescript
// src/components/ErrorBoundary.tsx
import React from 'react';

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to monitoring service
    console.error('Error caught by boundary:', error);
    console.error('Component stack:', errorInfo.componentStack);
    
    // In production, send to error tracking service (Sentry, etc.)
    if (window.Sentry) {
      window.Sentry.captureException(error, { extra: errorInfo });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-50 dark:bg-normalBlack">
          <div className="text-center p-8">
            <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We're sorry for the inconvenience. Please refresh the page or try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

// In src/main.tsx, wrap the entire app:
<ErrorBoundary>
  <HelmetProvider context={helmetContext}>
    <LanguageProvider>
      <SearchProvider>
        <RouterProvider router={router} />
      </SearchProvider>
    </LanguageProvider>
  </HelmetProvider>
</ErrorBoundary>
```

---

## HIGH PRIORITY ISSUES

### 🟠 HIGH PRIORITY (Fix This Sprint)

#### Issue #8: ~40 Instances of `any` Type (Weak Type Safety)
**Severity:** HIGH  
**Files:** ~15 components  
**Problem:** TypeScript `any` type bypasses all type checking

**Examples:**
```typescript
// UNSAFE:
const [members, setMembers] = useState<any[]>([]);
const [structure, setStructure] = useState<any>(null);

// SAFE:
const [members, setMembers] = useState<TeamMember[]>([]);
const [structure, setStructure] = useState<OrganizationStructure | null>(null);
```

**Fix - Create comprehensive types:**
```typescript
// src/types/sanity.ts
export interface TeamMember {
  _id: string;
  _type: 'person';
  name: string;
  position: string;
  email?: string;
  phone?: string;
  image?: SanityImage;
  personType: 'boardMember' | 'managementTeam' | 'corporateTeam';
  language: 'en' | 'ne';
  order?: number;
}

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

export interface AboutUsContent {
  _id: string;
  mission: PortableTextBlock[];
  vision: PortableTextBlock[];
  goal: PortableTextBlock[];
  language: 'en' | 'ne';
}

// ... define all data types
```

#### Issue #9: Inconsistent Error Handling
**Severity:** HIGH  
**Problem:** Different error patterns across components
- Some use `Swal.fire()`
- Some use `setError()` state
- Some use `console.error()`
- Some don't handle at all

**Fix - Create unified error handler:**
```typescript
// src/utils/errorHandler.ts
import Swal from 'sweetalert2';

export const handleError = (
  error: unknown,
  context?: string,
  fallbackMessage: string = 'An error occurred'
) => {
  const message = error instanceof Error ? error.message : fallbackMessage;

  console.error(`[${context || 'Error'}]`, message);

  // Show user-friendly alert
  if (typeof window !== 'undefined') {
    Swal.fire({
      icon: 'error',
      title: 'Oops!',
      text: fallbackMessage,
      confirmButtonColor: '#1a3a1a',
      allowOutsideClick: false
    });
  }

  // Log to external service in production
  if (window.logErrorService) {
    window.logErrorService.captureException(error, { context });
  }
};

// Usage in components:
try {
  const data = await fetchData();
} catch (error) {
  handleError(error, 'DataFetch', 'Failed to load data');
}
```

#### Issue #10: No Request Rate Limiting
**Severity:** HIGH  
**Problem:** Forms can be submitted repeatedly, enabling spam attacks
**Fix:**
```typescript
// src/hooks/useRateLimitedSubmit.ts
export const useRateLimitedSubmit = (cooldownMs: number = 3000) => {
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
  const [isOnCooldown, setIsOnCooldown] = useState(false);

  const canSubmit = (): boolean => {
    const now = Date.now();
    return now - lastSubmitTime >= cooldownMs;
  };

  const markSubmitted = (): void => {
    setLastSubmitTime(Date.now());
    setIsOnCooldown(true);
    setTimeout(() => setIsOnCooldown(false), cooldownMs);
  };

  return { canSubmit, isOnCooldown, markSubmitted };
};

// Usage:
const { canSubmit, isOnCooldown, markSubmitted } = useRateLimitedSubmit(5000);

const handleSubmit = async (e: React.FormEvent) => {
  if (!canSubmit()) {
    Swal.fire({ icon: 'warning', text: 'Please wait before submitting again' });
    return;
  }
  
  markSubmitted();
  // ... proceed with submission
};

// Disable button during cooldown
<button disabled={isOnCooldown || isSubmitting}>
  {isOnCooldown ? `Wait ${remainingSeconds}s` : 'Submit'}
</button>
```

#### Issue #11: No Structured Error Logging
**Severity:** HIGH  
**Problem:**
- Production errors not tracked
- No error context captured
- Debugging impossible from logs
- Security incidents unnoticed

**Fix - Implement Sentry or equivalent:**
```bash
npm install @sentry/react
```

```typescript
// src/lib/sentry.ts
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0,
  beforeSend(event) {
    // Don't send events in development
    if (import.meta.env.MODE === 'development') {
      return null;
    }
    return event;
  }
});

// Usage:
try {
  // code
} catch (error) {
  Sentry.captureException(error, {
    tags: { section: 'dashboard' },
    level: 'error'
  });
}
```

#### Issue #12: Console.log Statements in Production
**Severity:** MEDIUM-HIGH  
**Problem:**
- Verbose logging throughout codebase
- Potential sensitive data exposure
- Performance impact from logging

**Audit Results:** Found in 25+ files  
**Fix - Remove or use proper logger:**

```bash
# Find all console.log:
grep -r "console\." src/

# Remove production logs, keep only critical errors
# Replace console.log with structured logger in production
```

#### Issue #13: Missing Accessibility (WCAG 2.1)
**Severity:** HIGH  
**Issues:**
- No skip navigation link
- Form labels not properly associated
- Color contrast issues (khaki on white)
- No keyboard navigation for carousels
- Missing ARIA labels
- No focus management in modals

**WCAG Compliance Score:** 3/10 (Non-compliant)

**Quick Fixes:**
```tsx
// 1. Add skip link at top of Main.tsx:
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>

// 2. Properly associate form labels:
// BEFORE (INCORRECT):
<input type="email" placeholder="Email" />

// AFTER (CORRECT):
<label htmlFor="email">Email Address</label>
<input id="email" type="email" required aria-required="true" />

// 3. Add ARIA labels to icons:
<button aria-label="Open navigation menu">
  <FaBars />
</button>

// 4. Add aria-live for dynamic content:
<div aria-live="polite" aria-atomic="true">
  {successMessage}
</div>
```

#### Issue #14: Search Functionality Indexes Full Content
**Severity:** MEDIUM-HIGH  
**Problem:**
- Full page content indexed
- May expose sensitive paths or data
- Search results show internal structure

**Fix - Limit indexed fields:**
```typescript
// Update SearchContext to only index public content
const searchIndex: SearchResult[] = [
  {
    id: 'home',
    title: 'Home',
    titleNe: 'गृहपृष्ठ',
    path: '/',
    category: 'Main',
    // Don't index: sensitive internal paths, admin URLs, etc.
  },
  // ... only public pages
];
```

---

## MEDIUM PRIORITY ISSUES

### 🟡 MEDIUM PRIORITY (Next Sprint)

#### Issue #15: No Loading Skeleton Components
- Generic "Loading..." text used instead of skeleton screens
- Poor UX perception of speed
- **Fix:** Create reusable skeleton component

#### Issue #16: Disabled Minification in Production
- File: `vite.config.ts` → `minify: false`
- Increases bundle size by 30-40%
- **Fix:** Enable minification for production

```typescript
build: {
  minify: import.meta.env.MODE === 'production' ? 'terser' : false,
}
```

#### Issue #17: Unoptimized Images
- No WebP fallback
- No lazy loading on offscreen images
- Large file sizes

#### Issue #18: No Code Splitting Beyond Router
- All components bundled together
- Improves initial load time

#### Issue #19: Swiper v10 Known Vulnerabilities
- Prototype pollution CVE (unfixable without v11)
- Monitor for v11 release

#### Issue #20: NPM Audit: 38 Remaining Vulnerabilities
- 24 moderate, 13 high, 1 critical
- Most require major version upgrades
- **Status:** Monitor for updates

---

## DEVELOPMENT GUIDELINES

### Must-Follow Coding Standards

1. **Variable Naming**
   - Use descriptive, clear names
   - Avoid single letters except for loops
   - ✅ `const fetchedTeamMembers = ...`
   - ❌ `const tm = ...` or `const data = ...`

2. **TypeScript Usage**
   - Define interfaces for all data types
   - Avoid `any` type at all costs
   - Use strict mode features
   - Define return types on functions

3. **Code Simplicity**
   - Prefer simple solutions over complex ones
   - Break complex functions into smaller ones
   - Avoid nested ternaries and deep nesting

4. **Comments**
   - Only add comments for "why", not "what"
   - Code should be self-documenting
   - ✅ `// Fetch testimonials on language change`
   - ❌ `// Set testimonials state`

5. **Security**
   - Always validate and sanitize inputs
   - Use environment variables for secrets
   - Never hardcode API keys or credentials
   - Escape all user input in HTML

6. **Error Handling**
   - Always include try-catch blocks
   - Handle both success and error states
   - Show meaningful error messages
   - Log errors for debugging

7. **Component Structure**
   - Keep components focused and small
   - Extract reusable logic to hooks
   - Organize related state together
   - Use descriptive prop names

8. **Git Commits**
   - Commit after each working feature
   - Write clear, descriptive commit messages
   - Don't stop until app runs error-free
   - Always recheck code before committing

### File Naming Conventions

```
Components:     ComponentName.tsx
Utilities:      utility-name.ts
Types:          types.ts or typename.ts
Hooks:          useHookName.ts
Contexts:       ContextName.tsx (PascalCase for context)
Services:       serviceName.ts
Styles:         component.module.css or use Tailwind
```

### React Patterns to Follow

#### Custom Hook Pattern (for reusable logic)
```typescript
// src/hooks/useLanguageContent.ts
export const useLanguageContent = () => {
  const { language } = useLanguage();
  const [data, setData] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const result = await fetchContent();
        setData(result);
      } catch (err) {
        setError('Failed to load content');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [language]);

  return { data, loading, error };
};
```

#### Context Provider Pattern
```typescript
// Create context
const MyContext = createContext<MyContextType | undefined>(undefined);

// Provider component
export const MyProvider = ({ children }) => {
  const [value, setValue] = useState(...);
  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
};

// Custom hook for easy access
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within MyProvider');
  }
  return context;
};
```

#### Form Handling Pattern
```typescript
// Use Formik for complex forms
<Formik
  initialValues={initialValues}
  validationSchema={validationSchema}
  onSubmit={handleSubmit}
>
  {({ values, errors, touched, isSubmitting, isValid }) => (
    <Form>
      <Field name="email" type="email" />
      <ErrorMessage name="email" component="div" className="error" />
      <button type="submit" disabled={!isValid || isSubmitting}>
        Submit
      </button>
    </Form>
  )}
</Formik>
```

---

## DEPLOYMENT & ENVIRONMENT SETUP

### Environment Variables

**Required Variables (in `.env`):**
```
VITE_SANITY_PROJECT_ID=v41axjo7
VITE_SANITY_DATASET=production
```

**Optional Variables:**
```
VITE_SENTRY_DSN=      # For error tracking (Sentry)
VITE_API_URL=         # Backend API URL
VITE_APP_ENV=         # dev, staging, production
```

**Secrets (in Vercel Dashboard - NEVER in .env):**
```
RESEND_API_KEY        # Email API key
SENTRY_AUTH_TOKEN     # Error tracking auth
```

### Vercel Deployment

**Configuration File:** `vercel.json`

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "same-origin" }
      ]
    }
  ]
}
```

**Deployment Steps:**
1. Push code to GitHub main branch
2. Vercel automatically triggers deployment
3. Build runs: `npm run build`
4. Output: `/dist` directory deployed
5. Environment variables applied
6. Serverless functions deployed (`/api/*`)

**Build Command:** `vite build`  
**Output Directory:** `dist`  
**Framework:** React

### Local Development Setup

```bash
# 1. Clone repository
git clone <repo-url>
cd glbslFE

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env
# Edit .env with actual values

# 4. Start development server
npm run dev
# App runs on http://localhost:3000

# 5. Access Sanity Studio
# Navigate to http://localhost:3000/studio

# 6. Build for production
npm run build

# 7. Preview production build
npm run preview
```

### Production Fixes & Considerations

**Known Issues:**
- Sanity CDN may have 1-5 minute cache delay
- Image optimization could be improved
- Bundle size could be reduced by 30%
- Some npm vulnerabilities unfixable (major version upgrades needed)

**Monitoring:**
- Set up error tracking (Sentry)
- Monitor performance (Vercel Analytics)
- Track uptime (UptimeRobot or similar)
- Monitor API response times

---

## IMPORTANT CONVENTIONS & PATTERNS

### Language Handling (CRITICAL)

**Every data-fetching component MUST include language dependency:**

```typescript
const { language } = useLanguage();

useEffect(() => {
  const fetchData = async () => {
    // Service automatically uses current language
    const data = await serviceMethod();
    setData(data);
  };
  fetchData();
}, [language]); // ✅ REQUIRED for bilingual content

// WITHOUT this, users see stale content when switching languages
```

### Sanity Data Access Pattern

**Always use service layer, never direct client queries:**

```typescript
// ✅ CORRECT:
const data = await aboutService.getBoardMembers();

// ❌ WRONG:
const data = await client.fetch('*[_type == "person"]');

// Service automatically:
// - Filters by language
// - Handles error cases
// - Transforms data
// - Caches if needed
```

### Image URL Handling

**Always transform Sanity images with urlFor():**

```typescript
// ✅ CORRECT:
const imageUrl = getStrapiMediaUrl(sanityImageObject);

// ❌ WRONG:
const imageUrl = sanityImageObject.url; // Raw URL, no optimization

// getStrapiMediaUrl() handles:
// - Auto format selection (WebP, JPG)
// - 80% quality optimization
// - Proper error handling
```

### Error Display Pattern

```typescript
// Consistent user feedback
try {
  // operation
} catch (error) {
  const message = error instanceof Error 
    ? error.message 
    : 'An unexpected error occurred';
  
  setError(message); // or use Swal.fire()
  console.error('Context:', error);
}

// Display to user:
{error && <div className="text-red-500">{error}</div>}
```

### Loading State Pattern

```typescript
// Always provide loading feedback
if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage message={error} />;
if (!data?.length) return <EmptyState />;
return <Content data={data} />;
```

---

## TROUBLESHOOTING & COMMON ISSUES

### "Language doesn't change content"

**Cause:** Missing `[language]` dependency in useEffect  
**Solution:** Add `language` to dependency array:

```typescript
useEffect(() => {
  // fetch code
}, [language]); // ← Add this
```

### "Build fails with 'Cannot find module'"

**Cause:** Missing node_modules or package not installed  
**Solution:**
```bash
npm install
npm run build
```

### "Sanity studio not loading"

**Cause:** Project ID or dataset not configured  
**Solution:**
1. Check `.env` file exists and has correct values
2. Verify `VITE_SANITY_PROJECT_ID` and `VITE_SANITY_DATASET`
3. Restart dev server: `npm run dev`

### "Email not sending"

**Cause:** Resend API key not set  
**Solution:**
1. Add `RESEND_API_KEY` to Vercel dashboard (NOT .env)
2. Check email recipient in `api/send-email.ts`
3. Verify API function deployed: `https://site/api/send-email`

### "Images not loading"

**Cause:** Image URL transformation issue  
**Solution:**
```typescript
// Check if getStrapiMediaUrl() being used
const url = getStrapiMediaUrl(imageObject);
if (!url) console.error('Image URL missing');
```

### "ESLint fails: '@typescript-eslint/recommended' not found"

**Cause:** Version mismatch  
**Status:** Known issue, doesn't affect functionality  
**Workaround:** Manually run linting on specific files

### "Slow page loads"

**Cause:** Multiple factors
- Large images not optimized
- No code splitting
- Minification disabled
- CMS queries not parallel

**Solutions:**
1. Compress images (use WebP)
2. Enable code splitting
3. Enable minification in production
4. Parallel fetch queries with Promise.all()

---

## QUICK REFERENCE CHECKLIST

### Before Starting Work
- [ ] Pull latest code: `git pull`
- [ ] Install dependencies: `npm install`
- [ ] Create/verify `.env` file
- [ ] Run dev server: `npm run dev`
- [ ] Test in both languages (EN/NE)

### During Development
- [ ] Follow naming conventions
- [ ] Add proper TypeScript types
- [ ] Include error handling
- [ ] Test responsive design
- [ ] Check dark mode support
- [ ] Sanitize user inputs
- [ ] Add `[language]` to useEffect dependencies (if fetching CMS content)

### Before Committing
- [ ] Test all changes locally
- [ ] Run linting: `npm run lint`
- [ ] Build production: `npm run build`
- [ ] Check for console errors
- [ ] Test in incognito mode
- [ ] Write clear commit message
- [ ] Commit: `git add . && git commit -m "message"`

### Production Deployment
- [ ] All tests passing
- [ ] Environment variables set in Vercel
- [ ] Build completes without errors
- [ ] Preview deployment successful
- [ ] Monitor for errors post-deployment

---

## CONCLUSION

This knowledge base serves as a comprehensive reference for the GLBSL Frontend project. It encompasses:

✅ **Complete project architecture** and technology stack  
✅ **All implemented features** and current functionality  
✅ **Integration details** for Sanity CMS and Resend email  
✅ **Critical security issues** that require immediate fixing  
✅ **High/medium priority improvements** for future sprints  
✅ **Development guidelines** and coding standards  
✅ **Deployment procedures** and environment setup  
✅ **Troubleshooting** and common issues with solutions  

### Key Takeaways:

1. **Security First:** Fix the 8 critical issues before deploying
2. **Type Safety:** Replace `any` types with proper interfaces
3. **Language Handling:** Always include `[language]` in useEffect dependencies
4. **Form Validation:** Implement Formik + Yup for all forms
5. **Error Management:** Create unified error handling and logging
6. **Testing:** Conduct thorough testing before committing

### For Next Sessions:

- Start by reviewing the **CRITICAL ISSUES** section
- Implement fixes in priority order
- Run all tests locally before deploying
- Update this document as new learnings emerge
- Maintain consistent code quality standards

**Last Updated:** April 26, 2026  
**Project Health:** 6.5/10 (Production-ready with security improvements needed)  
**Next Action:** Implement critical security fixes

---

**End of Project Knowledge Base Document**
