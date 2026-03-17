import { sanityFetch, urlFor } from '../lib/sanity';

// ── Locale helper ──────────────────────────────────────────────────
const ALLOWED_LOCALES = ['en', 'ne'];
const getLocale = () => {
  const lang = localStorage.getItem('language');
  return lang && ALLOWED_LOCALES.includes(lang) ? lang : 'en';
};

// ── Image URL helper (replaces getStrapiMediaUrl) ──────────────────
// Accepts either a Sanity image object or a plain URL string.
export const getStrapiMediaUrl = (source?: any): string => {
  if (!source) return '';
  if (typeof source === 'string') {
    if (source.startsWith('http')) return source;
    return '';
  }
  // Sanity image object
  return urlFor(source).auto('format').quality(80).url();
};

// ── GROQ query fragments ──────────────────────────────────────────
const PERSON_FIELDS = `
  _id,
  "name": coalesce(name[$lang], name.en),
  "position": coalesce(position[$lang], position.en),
  "department": coalesce(department[$lang], department.en),
  "bio": coalesce(bio[$lang], bio.en),
  email,
  phone,
  image,
  order,
  personType
`;

const REPORT_FIELDS = `
  _id,
  "title": coalesce(title[$lang], title.en),
  "slug": slug.current,
  "description": coalesce(description[$lang], description.en),
  reportType,
  publishDate,
  fiscalYear,
  quarter,
  fileSource,
  uploadedFile { asset->{ url } },
  fileId,
  fileName,
  featured,
  isActive,
  order,
  tags,
  "seoTitle": coalesce(seoTitle[$lang], seoTitle.en),
  "seoDescription": coalesce(seoDescription[$lang], seoDescription.en)
`;

const NOTICE_FIELDS = `
  _id,
  "title": coalesce(title[$lang], title.en),
  "slug": slug.current,
  "content": coalesce(content[$lang], content.en),
  noticeType,
  publishDate,
  expiryDate,
  isUrgent,
  priority,
  isActive,
  noticeImage,
  fileSource,
  uploadedFile { asset->{ url } },
  attachmentFileId,
  attachmentFileName,
  attachmentFileSize,
  viewCount,
  tags,
  displayPopup,
  "seoTitle": coalesce(seoTitle[$lang], seoTitle.en),
  "seoDescription": coalesce(seoDescription[$lang], seoDescription.en)
`;

// ── About Service ─────────────────────────────────────────────────
export const aboutService = {
  getAboutUs: async () => {
    const lang = getLocale();
    return sanityFetch<any>(
      `*[_type == "aboutUsSetting" ][0] {
        "mission": coalesce(mission[$lang], mission.en), "vision": coalesce(vision[$lang], vision.en), "goal": coalesce(goal[$lang], goal.en), "aboutUsDescription": coalesce(aboutUsDescription[$lang], aboutUsDescription.en), aboutUsImage
      }`,
      { lang },
    );
  },

  getBoardMembers: async () => {
    const lang = getLocale();
    return sanityFetch<any[]>(
      `*[_type == "person" && personType == "boardMember"] | order(order asc) { ${PERSON_FIELDS} }`,
      { lang },
    );
  },

  getManagementTeam: async () => {
    const lang = getLocale();
    return sanityFetch<any[]>(
      `*[_type == "person" && personType == "managementTeam"] | order(order asc) { ${PERSON_FIELDS} }`,
      { lang },
    );
  },

  getCorporateTeam: async () => {
    const lang = getLocale();
    return sanityFetch<any[]>(
      `*[_type == "person" && personType == "corporateTeam"] | order(order asc) { ${PERSON_FIELDS} }`,
      { lang },
    );
  },

  getCommitteeMembers: async () => {
    const lang = getLocale();
    return sanityFetch<any[]>(
      `*[_type == "person" && personType == "committeeMember"] | order(order asc) { ${PERSON_FIELDS} }`,
      { lang },
    );
  },

  getCommittees: async () => {
    const lang = getLocale();
    return sanityFetch<any[]>(
      `*[_type == "committee" ] {
        _id,
        "name": coalesce(name[$lang], name.en),
        "description": coalesce(description[$lang], description.en),
        members[] {
          _key,
          committeePosition,
          roleDescription,
          order,
          person-> {
            _id, "name": coalesce(name[$lang], name.en), "position": coalesce(position[$lang], position.en), "department": coalesce(department[$lang], department.en), image, email, phone
          }
        }
      }`,
      { lang },
    );
  },

  getMonitoringSupervision: async () => {
    const lang = getLocale();
    return sanityFetch<any[]>(
      `*[_type == "person" && personType == "monitoringSupervision"] | order(order asc) { ${PERSON_FIELDS} }`,
      { lang },
    );
  },

  getOrganizationStructure: async () => {
    const lang = getLocale();
    return sanityFetch<any>(
      `*[_type == "organizationStructure" ][0] {
        "title": coalesce(title[$lang], title.en), "description": coalesce(description[$lang], description.en), structureImage
      }`,
      { lang },
    );
  },

  getInformationOfficer: async () => {
    const lang = getLocale();
    const results = await sanityFetch<any[]>(
      `*[_type == "person" && personType == "informationOfficer"] | order(order asc) [0..0] { ${PERSON_FIELDS} }`,
      { lang },
    );
    return results?.[0] || null;
  },

  getComplianceOfficer: async () => {
    const lang = getLocale();
    const results = await sanityFetch<any[]>(
      `*[_type == "person" && personType == "complianceOfficer"] | order(order asc) [0..0] { ${PERSON_FIELDS} }`,
      { lang },
    );
    return results?.[0] || null;
  },

  getComplaintOfficer: async () => {
    const lang = getLocale();
    const results = await sanityFetch<any[]>(
      `*[_type == "person" && personType == "complaintOfficer"] | order(order asc) [0..0] { ${PERSON_FIELDS} }`,
      { lang },
    );
    return results?.[0] || null;
  },
};

// ── Services Service ──────────────────────────────────────────────
export const servicesService = {
  getLoanProducts: async () => {
    const lang = getLocale();
    return sanityFetch<any[]>(
      `*[_type == "loanProduct" ] | order(order asc) {
        _id, "name": coalesce(name[$lang], name.en), volume, rate, serviceCharge, term, order
      }`,
      { lang },
    );
  },

  getSavingsProducts: async () => {
    const lang = getLocale();
    return sanityFetch<any[]>(
      `*[_type == "savingsProduct" ] | order(order asc) {
        _id, "name": coalesce(name[$lang], name.en), interestRate, order
      }`,
      { lang },
    );
  },

  getRemittanceService: async () => {
    const lang = getLocale();
    return sanityFetch<any>(
      `*[_type == "remittanceService" ][0] {
        "title": coalesce(title[$lang], title.en), "description": coalesce(description[$lang], description.en), images,
        features[] { _key, "title": coalesce(title[$lang], title.en), "description": coalesce(description[$lang], description.en), icon }
      }`,
      { lang },
    );
  },

  getMemberWelfareService: async () => {
    const lang = getLocale();
    return sanityFetch<any>(
      `*[_type == "memberWelfareService" ][0] {
        "title": coalesce(title[$lang], title.en), "description": coalesce(description[$lang], description.en),
        welfareServices[] { _key, "title": coalesce(title[$lang], title.en), "description": coalesce(description[$lang], description.en), icon }
      }`,
      { lang },
    );
  },

  getServiceCategories: async () => {
    const lang = getLocale();
    return sanityFetch<any[]>(
      `*[_type == "serviceCategory" ] | order(order asc) {
        _id, "title": coalesce(title[$lang], title.en), "slug": slug.current, "description": coalesce(description[$lang], description.en), icon, order
      }`,
      { lang },
    );
  },
};

// ── Reports Service ───────────────────────────────────────────────
export const reportsService = {
  getAllReports: async () => {
    try {
      const lang = getLocale();
      const data = await sanityFetch<any[]>(
        `*[_type == "report" && isActive == true] | order(featured desc, publishDate desc) { ${REPORT_FIELDS} }`,
        { lang },
      );
      return { data: data || [] };
    } catch (error) {
      console.error('Error fetching all reports:', error);
      return { data: [] };
    }
  },

  getReportsByCategory: async (categorySlug: string) => {
    try {
      const lang = getLocale();
      const data = await sanityFetch<any[]>(
        `*[_type == "report" && isActive == true && references(*[_type == "reportCategory" && slug.current == $categorySlug]._id)] | order(publishDate desc) { ${REPORT_FIELDS} }`,
        { lang, categorySlug },
      );
      return { data: data || [] };
    } catch (error) {
      console.error('Error fetching reports by category:', error);
      return { data: [] };
    }
  },

  getReportsByType: async (reportType: string) => {
    try {
      const lang = getLocale();
      const data = await sanityFetch<any[]>(
        `*[_type == "report" && isActive == true && reportType == $reportType] | order(publishDate desc) { ${REPORT_FIELDS} }`,
        { lang, reportType },
      );
      return { data: data || [] };
    } catch (error) {
      console.error(`Error fetching reports by type ${reportType}:`, error);
      return { data: [] };
    }
  },

  getFeaturedReports: async () => {
    try {
      const lang = getLocale();
      const data = await sanityFetch<any[]>(
        `*[_type == "report" && isActive == true && featured == true] | order(publishDate desc) { ${REPORT_FIELDS} }`,
        { lang },
      );
      return { data: data || [] };
    } catch (error) {
      console.error('Error fetching featured reports:', error);
      return { data: [] };
    }
  },

  getReport: async (slug: string) => {
    try {
      const lang = getLocale();
      return sanityFetch<any>(
        `*[_type == "report" && slug.current == $slug][0] { ${REPORT_FIELDS} }`,
        { lang, slug },
      );
    } catch (error) {
      console.error('Error fetching report:', error);
      return null;
    }
  },
};

// ── Notices Service ───────────────────────────────────────────────
export const noticesService = {
  getNotices: async () => {
    try {
      const lang = getLocale();
      const data = await sanityFetch<any[]>(
        `*[_type == "notice" && isActive == true] | order(publishDate desc) { ${NOTICE_FIELDS} }`,
        { lang },
      );
      return { data: data || [] };
    } catch (error) {
      console.error('Error fetching notices:', error);
      return { data: [] };
    }
  },

  getNoticesByType: async (noticeType: string) => {
    try {
      const lang = getLocale();
      const data = await sanityFetch<any[]>(
        `*[_type == "notice" && noticeType == $noticeType && isActive == true] | order(publishDate desc) { ${NOTICE_FIELDS} }`,
        { lang, noticeType },
      );
      return { data: data || [] };
    } catch (error) {
      console.error('Error fetching notices by type:', error);
      return { data: [] };
    }
  },

  getUrgentNotices: async () => {
    try {
      const lang = getLocale();
      const data = await sanityFetch<any[]>(
        `*[_type == "notice" && isUrgent == true && isActive == true] | order(publishDate desc) { ${NOTICE_FIELDS} }`,
        { lang },
      );
      return { data: data || [] };
    } catch (error) {
      console.error('Error fetching urgent notices:', error);
      return { data: [] };
    }
  },

  getNotice: async (slug: string) => {
    try {
      const lang = getLocale();
      return sanityFetch<any>(
        `*[_type == "notice" && slug.current == $slug][0] { ${NOTICE_FIELDS} }`,
        { lang, slug },
      );
    } catch (error) {
      console.error('Error fetching notice:', error);
      return null;
    }
  },

  getPopupNotices: async () => {
    try {
      const lang = getLocale();
      return sanityFetch<any[]>(
        `*[_type == "notice" && displayPopup == true && isActive == true] | order(publishDate desc) { ${NOTICE_FIELDS} }`,
        { lang },
      );
    } catch (error) {
      console.error('Error fetching popup notices:', error);
      return [];
    }
  },
};

// ── Hero Images Service ───────────────────────────────────────────
export const heroImagesService = {
  getHeroImages: async () => {
    try {
      return sanityFetch<any[]>(
        `*[_type == "heroImage" && isActive == true] | order(order asc) {
          _id, "title": coalesce(title[$lang], title.en), image, altText, caption, order
        }`,
      );
    } catch (error) {
      console.error('Error fetching hero images:', error);
      return [];
    }
  },
};

// ── Testimonials Service ──────────────────────────────────────────
export const testimonialsService = {
  getTestimonials: async () => {
    try {
      const lang = getLocale();
      return sanityFetch<any[]>(
        `*[_type == "testimonial" && isActive == true] | order(order asc) {
          _id, "name": coalesce(name[$lang], name.en), "position": coalesce(position[$lang], position.en), organization, image, testimonial, order
        }`,
        { lang },
      );
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return [];
    }
  },
};

// ── Google Drive helpers (unchanged — still used for reports/notices) ─
export const googleDriveHelpers = {
  getViewUrl: (fileId: string) =>
    `https://drive.google.com/file/d/${fileId}/preview`,

  getDownloadUrl: (fileId: string) =>
    `https://drive.google.com/uc?export=download&id=${fileId}`,

  getThumbnailUrl: (fileId: string, size: string = 'w400') =>
    `https://drive.google.com/thumbnail?id=${fileId}&sz=${size}`,

  openInNewTab: (fileId: string) => {
    window.open(`https://drive.google.com/file/d/${fileId}/view`, '_blank');
  },

  downloadFile: async (fileId: string, fileName: string, trackingCallback?: () => void) => {
    if (trackingCallback) trackingCallback();
    const link = document.createElement('a');
    link.href = googleDriveHelpers.getDownloadUrl(fileId);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};
