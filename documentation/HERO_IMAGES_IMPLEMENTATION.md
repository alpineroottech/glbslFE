# Hero Images Carousel - Strapi CMS Integration

## Overview
The homepage hero section carousel now dynamically fetches images from Strapi CMS instead of using hardcoded image paths.

## Implementation Details

### 1. Strapi Service (`src/services/strapi.ts`)
Added a new service to fetch hero images from the CMS:

```typescript
export const heroImagesService = {
  getHeroImages: async () => {
    try {
      const locale = getLocale();
      const res = await api.get(`/api/hero-images?locale=${locale}&populate=*&sort=order:asc`);
      return res.data.data || [];
    } catch (error) {
      console.error('Error fetching hero images:', error);
      return [];
    }
  }
};
```

**Features:**
- Locale-aware (fetches based on selected language: EN/NE)
- Sorted by `order` field (ascending)
- Populates all relations (including image field)
- Error handling with fallback to empty array

### 2. HeroSection Component (`src/Components/HeroSection/HeroSection.tsx`)
Updated to fetch and display dynamic images while preserving the original design.

**Key Changes:**
- Added React state management (useState, useEffect)
- Fetches images on component mount and language change
- Loading state with spinner
- Fallback to original static images if CMS returns no data
- Preserves all existing styling and animations

**Data Flow:**
1. Component mounts → Fetches hero images from Strapi
2. Maps Strapi response to extract image URLs
3. Transforms relative URLs to absolute using `getStrapiMediaUrl()`
4. Displays images in Swiper carousel
5. Falls back to static images if no CMS data available

### 3. Fallback Mechanism
If Strapi CMS has no hero images configured, the carousel automatically falls back to the original static images:
- `/images/home-1/hero-bg.jpg`
- `/images/home-1/hero-bg2.jpg`

This ensures the site never breaks even if CMS is not configured.

## Strapi CMS Setup Required

### Step 1: Create Hero Image Content Type
In Strapi Admin Panel:

1. **Go to Content-Type Builder** (Left sidebar)
2. **Create New Collection Type**
   - Display name: `Hero Image`
   - Singular: `hero-image`
   - Plural: `hero-images`

3. **Add Fields:**

   a. **Image Field** (required)
   - Type: Media
   - Name: `image`
   - Type: Single media
   - Allowed types: Images only
   - Required: Yes

   b. **Order Field** (required)
   - Type: Number
   - Name: `order`
   - Number format: Integer
   - Default value: 0
   - Required: Yes
   - Description: "Display order in carousel (lower numbers appear first)"

4. **Advanced Settings:**
   - Enable **Internationalization (i18n)**: Yes (for EN/NE support)
   - Enable **Draft & Publish**: Optional (recommended)

5. **Save** and restart Strapi server

### Step 2: Configure Permissions
1. Go to **Settings → Roles → Public**
2. Under **Permissions** → **Hero-image**:
   - Enable `find` (to fetch all hero images)
   - Enable `findOne` (optional, for single image fetch)
3. **Save**

### Step 3: Add Hero Images
1. Go to **Content Manager → Hero Images**
2. Click **Create new entry**
3. For each hero image:
   - Upload image (recommended: 1920x950px, optimized for web)
   - Set order (e.g., 1, 2, 3, 4)
   - Select locale (EN or NE)
   - Save and Publish

**Recommended Setup:**
- Minimum: 3-4 hero images
- Image dimensions: 1920x950px or similar wide aspect ratio
- File format: JPG (optimized) or WebP for better performance
- File size: Keep under 500KB per image for fast loading

### Step 4: Localization
If using bilingual (EN/NE) support:
1. Create hero images for English (en)
2. For each entry, click **Locales** dropdown
3. Add Nepali (ne) version with the same or different image
4. Save and Publish both versions

## Testing

### 1. Browser Console
Open browser console (F12) and check for:
```javascript
// Should see logs like:
🚀 Making API request to: http://localhost:1337/api/hero-images?locale=en&populate=*&sort=order:asc
✅ API response received: 200 {...}
Fetched hero images: [{id: 1, image: {...}, order: 1}, ...]
```

### 2. Network Tab
Check the Network tab for:
- API call to `/api/hero-images`
- Image downloads from Strapi media URL

### 3. Visual Check
- Hero carousel should display at top of homepage
- Images should auto-rotate every 10 seconds
- Navigation arrows should work
- Pagination dots should appear at bottom
- Images should cover full width and height

### 4. Language Toggle
- Switch between EN ⇄ NE in navbar
- Carousel should refetch images for selected locale
- Check console for new API call

## Troubleshooting

### Images Not Showing
**Check:**
1. Strapi server is running (http://localhost:1337)
2. Hero images are published (not in draft state)
3. Public permissions are set correctly
4. Images are uploaded and associated with entries
5. Browser console for error messages

**Common Issues:**
- **404 Error:** Content type not created or wrong URL
- **403 Forbidden:** Permissions not set correctly
- **Empty array:** No published entries in CMS
- **Missing images:** Image field not populated

### Fallback Images Show Instead of CMS Images
This means:
- No hero images found in Strapi (empty response)
- Check if entries are created and published
- Verify locale matches (en/ne)

### Images Not Updating on Language Switch
- Check browser console for API call on language change
- Verify both EN and NE versions are created in Strapi
- Clear browser cache and reload

## Performance Considerations

1. **Image Optimization:**
   - Use optimized images (compressed JPG/WebP)
   - Target file size: 200-500KB per image
   - Recommended dimensions: 1920x950px

2. **Lazy Loading:**
   - Currently loads all images upfront (Swiper requirement)
   - Consider implementing progressive loading for many images

3. **Caching:**
   - Browser caches images automatically
   - Strapi media URLs are stable (don't change unless re-uploaded)

4. **CDN (Production):**
   - Consider using DigitalOcean Spaces or Cloudflare for image hosting
   - Configure Strapi to use CDN for media URLs

## API Endpoint

**Endpoint:** `GET /api/hero-images`

**Query Parameters:**
- `locale`: Language code (en/ne)
- `populate`: `*` (populate all relations)
- `sort`: `order:asc` (sort by order field)

**Response Format:**
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "order": 1,
        "image": {
          "data": {
            "attributes": {
              "url": "/uploads/hero_1_abc123.jpg"
            }
          }
        },
        "locale": "en"
      }
    }
  ]
}
```

## Future Enhancements

1. **Caption/Title Support:**
   - Add text fields for hero captions
   - Display overlay text on images

2. **Call-to-Action Buttons:**
   - Add link and button text fields
   - Display CTA buttons on hero slides

3. **Video Support:**
   - Allow video uploads as hero media
   - Autoplay video backgrounds

4. **Mobile Images:**
   - Add separate mobile-optimized images
   - Responsive image loading

## Files Modified

1. `src/services/strapi.ts` - Added heroImagesService
2. `src/Components/HeroSection/HeroSection.tsx` - Integrated dynamic data fetching

## Commit Message
```
feat: Integrate hero carousel with Strapi CMS

- Add heroImagesService to fetch images from CMS
- Update HeroSection component with dynamic data
- Implement loading state and error handling
- Add fallback to static images if CMS not configured
- Support bilingual image fetching (EN/NE)
- Preserve original design and styling
```

## Notes

- Original styling and carousel behavior preserved
- Backward compatible (works with or without CMS data)
- No breaking changes to existing functionality
- Console logging included for debugging (can be removed in production)
