import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLanguage } from './LanguageContext';
import { aboutService, servicesService } from '../services/strapi';

// @refresh reset

export interface SearchResult {
  id: string;
  title: string;
  titleNe: string;
  path: string;
  category: string;
  categoryNe: string;
  keywords: string[];
  keywordsNe: string[];
  score?: number;
  content?: string; // Added for actual page content
  contentNe?: string; // Added for actual page content in Nepali
}

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: SearchResult[];
  isSearching: boolean;
  performSearch: (query: string) => void;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Comprehensive search index with all routes and content
const searchIndex: SearchResult[] = [
  // Home
  {
    id: 'home',
    title: 'Home',
    titleNe: 'गृहपृष्ठ',
    path: '/',
    category: 'Main',
    categoryNe: 'मुख्य',
    keywords: ['home', 'main', 'gurans', 'microfinance', 'laghubitta'],
    keywordsNe: ['गृहपृष्ठ', 'मुख्य', 'गुराँस', 'लघुवित्त']
  },
  
  // About Section
  {
    id: 'about',
    title: 'About Us',
    titleNe: 'हाम्रो बारेमा',
    path: '/about',
    category: 'About',
    categoryNe: 'हाम्रो बारेमा',
    keywords: ['about', 'about us', 'company', 'organization', 'information'],
    keywordsNe: ['बारेमा', 'हाम्रो', 'संस्था', 'जानकारी']
  },
  {
    id: 'board-directors',
    title: 'Board of Directors',
    titleNe: 'निर्देशक बोर्ड',
    path: '/board-of-directors',
    category: 'About',
    categoryNe: 'हाम्रो बारेमा',
    keywords: ['board', 'directors', 'leadership', 'management', 'executive', 'chairman', 'vice chairman', 'members', 'governance'],
    keywordsNe: ['बोर्ड', 'निर्देशक', 'नेतृत्व', 'व्यवस्थापन', 'अध्यक्ष', 'उपाध्यक्ष', 'सदस्य']
  },
  {
    id: 'management-team',
    title: 'Management Team',
    titleNe: 'व्यवस्थापन टीम',
    path: '/management-team',
    category: 'About',
    categoryNe: 'हाम्रो बारेमा',
    keywords: ['management', 'team', 'staff', 'employees', 'personnel', 'ceo', 'manager', 'officer', 'administration'],
    keywordsNe: ['व्यवस्थापन', 'टीम', 'कर्मचारी', 'प्रबन्धक']
  },
  {
    id: 'corporate-team',
    title: 'Corporate Team',
    titleNe: 'कर्पोरेट टीम',
    path: '/corporate-team',
    category: 'About',
    categoryNe: 'हाम्रो बारेमा',
    keywords: ['corporate', 'team', 'staff', 'office', 'employees', 'corporate staff', 'support'],
    keywordsNe: ['कर्पोरेट', 'टीम', 'कार्यालय', 'कर्मचारी']
  },
  {
    id: 'committee',
    title: 'Committee',
    titleNe: 'समिति',
    path: '/committee',
    category: 'About',
    categoryNe: 'हाम्रो बारेमा',
    keywords: ['committee', 'members', 'board', 'group', 'audit', 'risk', 'monitoring', 'supervision'],
    keywordsNe: ['समिति', 'सदस्य', 'बोर्ड', 'लेखा परीक्षण', 'निगरानी']
  },
  {
    id: 'organization-structure',
    title: 'Organization Structure',
    titleNe: 'संगठन संरचना',
    path: '/organization-structure',
    category: 'About',
    categoryNe: 'हाम्रो बारेमा',
    keywords: ['organization', 'structure', 'hierarchy', 'chart', 'organizational'],
    keywordsNe: ['संगठन', 'संरचना', 'चार्ट']
  },
  
  // Services Section
  {
    id: 'services',
    title: 'All Services',
    titleNe: 'सबै सेवाहरू',
    path: '/services',
    category: 'Services',
    categoryNe: 'सेवाहरू',
    keywords: ['services', 'all services', 'products', 'offerings'],
    keywordsNe: ['सेवा', 'सेवाहरू', 'उत्पादन']
  },
  {
    id: 'loan-services',
    title: 'Loan Services',
    titleNe: 'ऋण सेवाहरू',
    path: '/services/loan',
    category: 'Services',
    categoryNe: 'सेवाहरू',
    keywords: ['loan', 'lending', 'credit', 'finance', 'borrow', 'mortgage', 'agriculture', 'business', 'personal', 'home', 'education', 'vehicle', 'micro', 'sme', 'working capital'],
    keywordsNe: ['ऋण', 'कर्जा', 'लोन', 'ऋण सेवा', 'कृषि', 'व्यापार', 'व्यक्तिगत', 'घर', 'शिक्षा', 'गाडी']
  },
  {
    id: 'savings-services',
    title: 'Savings Services',
    titleNe: 'बचत सेवाहरू',
    path: '/services/savings',
    category: 'Services',
    categoryNe: 'सेवाहरू',
    keywords: ['savings', 'deposit', 'account', 'save', 'fixed deposit', 'fd', 'recurring', 'current', 'regular', 'saving account', 'interest', 'investment'],
    keywordsNe: ['बचत', 'खाता', 'निक्षेप', 'स्थायी', 'ब्याज', 'लगानी']
  },
  {
    id: 'remittance-services',
    title: 'Remittance Services',
    titleNe: 'रेमिट्यान्स सेवाहरू',
    path: '/services/remittance',
    category: 'Services',
    categoryNe: 'सेवाहरू',
    keywords: ['remittance', 'transfer', 'money transfer', 'send money', 'international', 'domestic', 'ime', 'prabhu', 'western union', 'money gram', 'cash', 'payment'],
    keywordsNe: ['रेमिट्यान्स', 'पैसा पठाउने', 'स्थानान्तरण', 'आइएमई', 'प्रभु']
  },
  {
    id: 'member-welfare',
    title: 'Member Welfare',
    titleNe: 'सदस्य कल्याण',
    path: '/services/member-welfare',
    category: 'Services',
    categoryNe: 'सेवाहरू',
    keywords: ['member', 'welfare', 'benefits', 'care', 'support', 'insurance', 'health', 'medical', 'scholarship', 'death', 'accident', 'protection'],
    keywordsNe: ['सदस्य', 'कल्याण', 'लाभ', 'सहायता', 'बीमा', 'स्वास्थ्य', 'छात्रवृत्ति']
  },
  
  // Branches
  {
    id: 'branches',
    title: 'Branches',
    titleNe: 'शाखाहरू',
    path: '/branches',
    category: 'Branches',
    categoryNe: 'शाखाहरू',
    keywords: ['branches', 'office', 'locations', 'branch office', 'nearby', 'address', 'contact', 'phone', 'map', 'kathmandu', 'pokhara', 'chitwan', 'province', 'bagmati', 'gandaki'],
    keywordsNe: ['शाखा', 'शाखाहरू', 'कार्यालय', 'स्थान', 'ठेगाना', 'सम्पर्क', 'काठमाडौं', 'पोखरा', 'चितवन', 'प्रदेश']
  },
  
  // Reports Section
  {
    id: 'reports-all',
    title: 'All Reports',
    titleNe: 'सबै प्रतिवेदनहरू',
    path: '/reports',
    category: 'Reports',
    categoryNe: 'प्रतिवेदनहरू',
    keywords: ['reports', 'all reports', 'documents', 'publications'],
    keywordsNe: ['प्रतिवेदन', 'प्रतिवेदनहरू', 'कागजात']
  },
  {
    id: 'quarterly-report',
    title: 'Quarterly Report',
    titleNe: 'त्रैमासिक प्रतिवेदन',
    path: '/reports/quarterly-report',
    category: 'Reports',
    categoryNe: 'प्रतिवेदनहरू',
    keywords: ['quarterly', 'report', 'financial', 'quarterly report', 'q1', 'q2', 'q3', 'q4', 'three months', 'performance'],
    keywordsNe: ['त्रैमासिक', 'प्रतिवेदन', 'वित्तीय', 'तीन महिना']
  },
  {
    id: 'annual-report',
    title: 'Annual Report',
    titleNe: 'वार्षिक प्रतिवेदन',
    path: '/reports/annual-report',
    category: 'Reports',
    categoryNe: 'प्रतिवेदनहरू',
    keywords: ['annual', 'report', 'yearly', 'annual report', 'year'],
    keywordsNe: ['वार्षिक', 'प्रतिवेदन', 'वर्षको']
  },
  {
    id: 'agm-minutes',
    title: 'AGM Minutes',
    titleNe: 'साधारण सभाको मिनेट',
    path: '/reports/agm-minutes',
    category: 'Reports',
    categoryNe: 'प्रतिवेदनहरू',
    keywords: ['agm', 'minutes', 'meeting', 'general meeting', 'annual general meeting'],
    keywordsNe: ['साधारण सभा', 'मिनेट', 'बैठक']
  },
  {
    id: 'base-rate',
    title: 'Base Rate',
    titleNe: 'आधार दर',
    path: '/reports/base-rate',
    category: 'Reports',
    categoryNe: 'प्रतिवेदनहरू',
    keywords: ['base', 'rate', 'interest rate', 'lending rate', 'rates'],
    keywordsNe: ['आधार', 'दर', 'ब्याज', 'ब्याजदर']
  },
  {
    id: 'staff-training',
    title: 'Staff Training',
    titleNe: 'कर्मचारी तालिम',
    path: '/reports/staff-training',
    category: 'Reports',
    categoryNe: 'प्रतिवेदनहरू',
    keywords: ['staff', 'training', 'development', 'employee training'],
    keywordsNe: ['कर्मचारी', 'तालिम', 'प्रशिक्षण']
  },
  {
    id: 'governance-report',
    title: 'Governance Report',
    titleNe: 'शासन प्रतिवेदन',
    path: '/reports/governance-report',
    category: 'Reports',
    categoryNe: 'प्रतिवेदनहरू',
    keywords: ['governance', 'report', 'corporate governance', 'compliance'],
    keywordsNe: ['शासन', 'प्रतिवेदन', 'अनुपालन']
  },
  
  // Notices
  {
    id: 'notices',
    title: 'Notices',
    titleNe: 'सूचनाहरू',
    path: '/reports/notices',
    category: 'Notices',
    categoryNe: 'सूचनाहरू',
    keywords: ['notices', 'announcements', 'news', 'updates', 'information'],
    keywordsNe: ['सूचना', 'सूचनाहरू', 'समाचार', 'जानकारी']
  },
  
  // Career Section
  {
    id: 'career-notices',
    title: 'Career Notices',
    titleNe: 'करियर सूचनाहरू',
    path: '/career/notices',
    category: 'Career',
    categoryNe: 'करियर',
    keywords: ['career', 'job', 'vacancy', 'employment', 'hiring', 'recruitment'],
    keywordsNe: ['करियर', 'जागिर', 'रोजगार', 'भर्ना']
  },
  {
    id: 'apply-job',
    title: 'Apply for Job',
    titleNe: 'जागिरको लागि आवेदन',
    path: '/career/apply',
    category: 'Career',
    categoryNe: 'करियर',
    keywords: ['apply', 'job application', 'employment', 'career', 'application'],
    keywordsNe: ['आवेदन', 'जागिर', 'रोजगार']
  },
  {
    id: 'application-form',
    title: 'Application Form',
    titleNe: 'आवेदन फारम',
    path: '/career/application-form',
    category: 'Career',
    categoryNe: 'करियर',
    keywords: ['application', 'form', 'apply', 'job form'],
    keywordsNe: ['आवेदन', 'फारम', 'आवेदन पत्र']
  },
  
  // Online Section
  {
    id: 'emi-calculator',
    title: 'EMI Calculator',
    titleNe: 'EMI क्यालकुलेटर',
    path: '/online/emi-calculator',
    category: 'Online',
    categoryNe: 'अनलाइन',
    keywords: ['emi', 'calculator', 'loan calculator', 'installment', 'monthly payment', 'calculate', 'interest', 'principal', 'tenure', 'amount'],
    keywordsNe: ['EMI', 'क्यालकुलेटर', 'मासिक किस्ता', 'गणना', 'ब्याज']
  },
  {
    id: 'interest-calculator',
    title: 'Interest Calculator',
    titleNe: 'ब्याज क्यालकुलेटर',
    path: '/online/interest-calculator',
    category: 'Online',
    categoryNe: 'अनलाइन',
    keywords: ['interest', 'calculator', 'rate', 'calculation', 'simple', 'compound', 'savings', 'deposit', 'calculate interest'],
    keywordsNe: ['ब्याज', 'क्यालकुलेटर', 'गणना', 'साधारण', 'चक्रवृद्धि']
  },
  {
    id: 'apply-loan',
    title: 'Apply for Loan',
    titleNe: 'ऋणको लागि आवेदन',
    path: '/online/apply-for-loan',
    category: 'Online',
    categoryNe: 'अनलाइन',
    keywords: ['loan', 'apply', 'loan application', 'borrow', 'credit'],
    keywordsNe: ['ऋण', 'आवेदन', 'कर्जा']
  },
  
  // Gunaso Section
  {
    id: 'complaint',
    title: 'Register a Complaint',
    titleNe: 'गुनासो दर्ता गर्नुहोस्',
    path: '/gunaso/register-complaint',
    category: 'Gunaso',
    categoryNe: 'गुनासो',
    keywords: ['complaint', 'grievance', 'issue', 'problem', 'feedback', 'register', 'report', 'dispute', 'concern'],
    keywordsNe: ['गुनासो', 'समस्या', 'उजुरी', 'दर्ता', 'रिपोर्ट']
  },
  {
    id: 'complaint-nrb',
    title: 'Register a Complaint to NRB',
    titleNe: 'NRB मा गुनासो दर्ता गर्नुहोस्',
    path: '/gunaso/register-complaint-nrb',
    category: 'Gunaso',
    categoryNe: 'गुनासो',
    keywords: ['complaint', 'nrb', 'nepal rastra bank', 'bank complaint'],
    keywordsNe: ['गुनासो', 'NRB', 'नेपाल राष्ट्र बैंक']
  },
  
  // Contact
  {
    id: 'contact',
    title: 'Contact',
    titleNe: 'सम्पर्क',
    path: '/contact',
    category: 'Contact',
    categoryNe: 'सम्पर्क',
    keywords: ['contact', 'reach us', 'get in touch', 'contact us', 'phone', 'email', 'address', 'location', 'call', 'message', 'support', 'help'],
    keywordsNe: ['सम्पर्क', 'फोन', 'इमेल', 'ठेगाना', 'सहायता']
  }
];

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [dynamicSearchIndex, setDynamicSearchIndex] = useState<SearchResult[]>(searchIndex);
  const { language } = useLanguage();

  // Fetch dynamic content from Sanity and update search index
  useEffect(() => {
    const fetchDynamicContent = async () => {
      try {
        // Fetch board members
        const boardMembers = await aboutService.getBoardMembers();
        const boardMemberNames = boardMembers.map((member: any) => {
          const name = member.name || '';
          const position = member.position || '';
          return `${name} ${position}`.toLowerCase();
        }).filter((name: string) => name.trim());

        // Fetch management team
        const managementTeam = await aboutService.getManagementTeam();
        const managementNames = managementTeam.map((member: any) => {
          const name = member.name || '';
          const position = member.position || '';
          return `${name} ${position}`.toLowerCase();
        }).filter((name: string) => name.trim());

        // Fetch corporate team
        const corporateTeam = await aboutService.getCorporateTeam();
        const corporateNames = corporateTeam.map((member: any) => {
          const name = member.name || '';
          const position = member.position || '';
          return `${name} ${position}`.toLowerCase();
        }).filter((name: string) => name.trim());

        // Fetch loan products
        const loanProducts = await servicesService.getLoanProducts();
        const loanNames = loanProducts.map((product: any) => {
          return (product.name || '').toLowerCase();
        }).filter((name: string) => name.trim());

        // Fetch savings products
        const savingsProducts = await servicesService.getSavingsProducts();
        const savingsNames = savingsProducts.map((product: any) => {
          return (product.name || '').toLowerCase();
        }).filter((name: string) => name.trim());

        // Update search index with dynamic content
        const updatedIndex = searchIndex.map(item => {
          if (item.id === 'board-directors') {
            return {
              ...item,
              keywords: [...item.keywords, ...boardMemberNames],
              content: boardMemberNames.join(' ')
            };
          }
          if (item.id === 'management-team') {
            return {
              ...item,
              keywords: [...item.keywords, ...managementNames],
              content: managementNames.join(' ')
            };
          }
          if (item.id === 'corporate-team') {
            return {
              ...item,
              keywords: [...item.keywords, ...corporateNames],
              content: corporateNames.join(' ')
            };
          }
          if (item.id === 'loan-services') {
            return {
              ...item,
              keywords: [...item.keywords, ...loanNames],
              content: loanNames.join(' ')
            };
          }
          if (item.id === 'savings-services') {
            return {
              ...item,
              keywords: [...item.keywords, ...savingsNames],
              content: savingsNames.join(' ')
            };
          }
          return item;
        });

        setDynamicSearchIndex(updatedIndex);
      } catch (error) {
        console.error('Error fetching dynamic content for search:', error);
        // Keep using static index if fetch fails
        setDynamicSearchIndex(searchIndex);
      }
    };

    fetchDynamicContent();
  }, [language]); // Refetch when language changes

  // Levenshtein distance for fuzzy matching
  const levenshteinDistance = (str1: string, str2: string): number => {
    const track = Array(str2.length + 1).fill(null).map(() =>
      Array(str1.length + 1).fill(null)
    );
    
    for (let i = 0; i <= str1.length; i += 1) {
      track[0][i] = i;
    }
    
    for (let j = 0; j <= str2.length; j += 1) {
      track[j][0] = j;
    }
    
    for (let j = 1; j <= str2.length; j += 1) {
      for (let i = 1; i <= str1.length; i += 1) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        track[j][i] = Math.min(
          track[j][i - 1] + 1, // deletion
          track[j - 1][i] + 1, // insertion
          track[j - 1][i - 1] + indicator // substitution
        );
      }
    }
    
    return track[str2.length][str1.length];
  };

  // Calculate similarity score (0-100)
  const calculateSimilarity = (query: string, target: string): number => {
    const distance = levenshteinDistance(query.toLowerCase(), target.toLowerCase());
    const maxLength = Math.max(query.length, target.length);
    if (maxLength === 0) return 100;
    return Math.round((1 - distance / maxLength) * 100);
  };

  // Perform search with fuzzy matching
  const performSearch = (query: string) => {
    if (!query || query.trim().length < 2) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const normalizedQuery = query.toLowerCase().trim();
    
    const results = dynamicSearchIndex.map((item: SearchResult) => {
      let maxScore = 0;
      
      // Search in title
      const titleToSearch = language === 'ne' ? item.titleNe : item.title;
      const titleScore = calculateSimilarity(normalizedQuery, titleToSearch);
      maxScore = Math.max(maxScore, titleScore);
      
      // Check if query is contained in title (boost score)
      if (titleToSearch.toLowerCase().includes(normalizedQuery)) {
        maxScore = Math.max(maxScore, 90);
      }
      
      // Search in keywords
      const keywordsToSearch = language === 'ne' ? item.keywordsNe : item.keywords;
      keywordsToSearch.forEach((keyword: string) => {
        const keywordScore = calculateSimilarity(normalizedQuery, keyword);
        maxScore = Math.max(maxScore, keywordScore);
        
        // Exact or partial keyword match (boost score)
        if (keyword.toLowerCase().includes(normalizedQuery) || 
            normalizedQuery.includes(keyword.toLowerCase())) {
          maxScore = Math.max(maxScore, 85);
        }
      });

      // Search in content (actual page content like names)
      if (item.content) {
        const contentToSearch = language === 'ne' ? (item.contentNe || item.content) : item.content;
        if (contentToSearch.toLowerCase().includes(normalizedQuery)) {
          maxScore = Math.max(maxScore, 88); // High score for content match
        }
        
        // Word-by-word fuzzy matching in content
        const contentWords = contentToSearch.toLowerCase().split(/\s+/);
        contentWords.forEach((word: string) => {
          if (word.length > 2) { // Skip very short words
            const wordScore = calculateSimilarity(normalizedQuery, word);
            if (wordScore > 70) {
              maxScore = Math.max(maxScore, wordScore);
            }
          }
        });
      }
      
      // Search in category
      const categoryToSearch = language === 'ne' ? item.categoryNe : item.category;
      const categoryScore = calculateSimilarity(normalizedQuery, categoryToSearch);
      maxScore = Math.max(maxScore, categoryScore * 0.7); // Category match is less important
      
      return {
        ...item,
        score: maxScore
      };
    })
    .filter((result: SearchResult) => result.score && result.score > 30) // Threshold for relevance
    .sort((a: SearchResult, b: SearchResult) => (b.score || 0) - (a.score || 0))
    .slice(0, 10); // Top 10 results

    setSearchResults(results);
    setIsSearching(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  };

  // Debounce search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        performSearch(searchQuery);
      } else {
        setSearchResults([]);
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, language]);

  const value: SearchContextType = {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    performSearch,
    clearSearch
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
