# Search Feature Implementation

## Overview
A comprehensive, bilingual search feature has been implemented for the GLBSL Frontend application. The search functionality provides intelligent fuzzy matching with support for both English and Nepali languages.

## Features

### 1. **Intelligent Search Algorithm**
- **Fuzzy Matching**: Uses Levenshtein distance algorithm for finding nearest matches
- **Multi-field Search**: Searches across titles, keywords, and categories
- **Relevance Scoring**: Results are scored (0-100%) based on relevance
- **Smart Ranking**: Results sorted by relevance score with top 10 displayed
- **Threshold Filtering**: Only shows results with >30% relevance score

### 2. **Bilingual Support**
- **English & Nepali**: Searches in both languages simultaneously
- **Language-aware Results**: Displays results in the user's selected language
- **Locale-specific Keywords**: Separate keyword lists for each language

### 3. **User Experience**
- **Real-time Search**: Results update as you type (300ms debounce)
- **Dropdown Suggestions**: Results appear in a beautiful dropdown below search bar
- **Click-to-Navigate**: Click any result to navigate to that page
- **Clear Button**: Easy one-click clear functionality
- **Loading States**: Visual feedback while searching
- **No Results Message**: Helpful message when no matches found

### 4. **Search Coverage**
The search indexes all major sections of the website:
- **About Section**: About Us, Board of Directors, Management Team, Corporate Team, Committee, Organization Structure
- **Services**: All Services, Loan Services, Savings Services, Remittance Services, Member Welfare
- **Branches**: Branch locations and offices
- **Reports**: All Reports, Quarterly Reports, Annual Reports, AGM Minutes, Base Rate, Staff Training, Governance Reports
- **Notices**: Important notices and announcements
- **Career**: Career Notices, Job Applications, Application Forms
- **Online**: EMI Calculator, Interest Calculator, Apply for Loan
- **Gunaso**: Register Complaints (Internal & NRB)
- **Contact**: Contact information and forms

### 5. **Responsive Design**
- **Desktop**: Search bar integrated into the header navbar
- **Mobile**: Search bar appears when mobile menu is opened
- **Dark Mode**: Full support for dark mode with appropriate styling
- **Adaptive Layout**: Adjusts to different screen sizes

## Technical Implementation

### Architecture
```
src/
├── contexts/
│   └── SearchContext.tsx          # Search state management & fuzzy matching logic
├── Shared/
│   └── SearchBar/
│       ├── SearchBar.tsx          # Search UI component
│       └── index.ts               # Export helper
└── utils/
    └── translations.ts            # Search-related translations added
```

### Key Components

#### SearchContext.tsx
- Provides global search state management
- Implements Levenshtein distance algorithm for fuzzy matching
- Manages search index with all routes and keywords
- Calculates relevance scores
- Debounces search queries (300ms delay)

#### SearchBar.tsx
- Search input with clear button
- Dropdown results display
- Click-outside-to-close functionality
- Loading and empty states
- Responsive mobile/desktop variants

### Search Index Structure
```typescript
interface SearchResult {
  id: string;              // Unique identifier
  title: string;           // English title
  titleNe: string;         // Nepali title
  path: string;            // Route path
  category: string;        // English category
  categoryNe: string;      // Nepali category
  keywords: string[];      // English keywords
  keywordsNe: string[];    // Nepali keywords
  score?: number;          // Relevance score (calculated)
}
```

### Fuzzy Matching Algorithm
The search uses the **Levenshtein Distance** algorithm to calculate similarity:
1. Compares search query with titles, keywords, and categories
2. Calculates edit distance (insertions, deletions, substitutions)
3. Converts distance to similarity percentage (0-100%)
4. Boosts scores for exact/partial substring matches
5. Filters results by minimum threshold (30%)
6. Sorts by relevance score (highest first)

## Usage

### For Users
1. Click on the search bar in the header (desktop) or open mobile menu (mobile)
2. Type your search query (minimum 2 characters)
3. View instant results in the dropdown
4. Click any result to navigate to that page
5. Use the clear button (×) to reset search

### Search Examples
- **English**: "loan", "board", "report", "calculator", "complaint"
- **Nepali**: "ऋण", "बोर्ड", "प्रतिवेदन", "क्यालकुलेटर", "गुनासो"
- **Partial matches**: "direc" → "Board of Directors"
- **Fuzzy matches**: "comittee" → "Committee" (handles typos)

## Customization

### Adding New Search Items
To add new pages to search index, edit `src/contexts/SearchContext.tsx`:

```typescript
const searchIndex: SearchResult[] = [
  // ... existing items
  {
    id: 'new-page',
    title: 'New Page Title',
    titleNe: 'नयाँ पृष्ठ शीर्षक',
    path: '/new-page',
    category: 'Category',
    categoryNe: 'श्रेणी',
    keywords: ['keyword1', 'keyword2', 'alias'],
    keywordsNe: ['कुञ्जी शब्द१', 'कुञ्जी शब्द२']
  }
];
```

### Adjusting Search Sensitivity
In `SearchContext.tsx`, modify these parameters:
- **Minimum query length**: Line with `query.trim().length < 2`
- **Relevance threshold**: Line with `.filter(result => result.score && result.score > 30)`
- **Max results**: Line with `.slice(0, 10)`
- **Debounce delay**: Line with `setTimeout(..., 300)`

### Styling Customization
Search bar styles are in:
- `src/Shared/SearchBar/SearchBar.tsx` (component-level Tailwind classes)
- `src/index.css` (custom CSS classes at the bottom)

## Performance Considerations
- **Debounced Input**: 300ms delay prevents excessive calculations
- **Memoization**: Search index is static (loaded once)
- **Limited Results**: Only top 10 results displayed
- **Lazy Rendering**: Dropdown only renders when needed
- **Efficient Algorithm**: O(n*m) complexity where n=query length, m=target length

## Accessibility
- **Keyboard Navigation**: Full keyboard support (planned for future enhancement)
- **ARIA Labels**: "Clear search" button has aria-label
- **Focus Management**: Input maintains focus on clear
- **Screen Reader Friendly**: Semantic HTML structure

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2015+ JavaScript features
- CSS Grid and Flexbox
- Requires JavaScript enabled

## Future Enhancements
- [ ] Keyboard arrow navigation through results
- [ ] Search history/recent searches
- [ ] Voice search integration
- [ ] Advanced filters (by category, date, etc.)
- [ ] Search analytics tracking
- [ ] Highlight matching text in results
- [ ] Search suggestions (autocomplete)
- [ ] Cache frequently searched terms

## Troubleshooting

### Search not working
1. Check if `SearchProvider` is wrapping the app in `main.tsx`
2. Verify search bar is imported in `Navbar.tsx`
3. Check browser console for errors

### Results not appearing
1. Verify search index contains the expected items
2. Check minimum character threshold (default: 2)
3. Ensure relevance threshold is not too high (default: 30%)

### Language switching issues
1. Confirm `LanguageContext` is properly initialized
2. Check localStorage for 'language' key
3. Verify translations exist for search terms

## Credits
- **Levenshtein Distance Algorithm**: Edit distance calculation
- **React Context API**: State management
- **Tailwind CSS**: Styling
- **React Icons**: Search icons (BiSearch, IoMdClose, MdKeyboardArrowRight)

## License
Part of the GLBSL Frontend project. See project root for license information.
