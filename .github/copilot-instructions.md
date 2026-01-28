# টাঙ্গাইল ডাক্তার তালিকা - AI Coding Agent Instructions

## Project Overview
A Bengali-language doctor directory website for Tangail district hospitals and clinics. Three view modes: card grid, category-based, and data table. Pure HTML/CSS/JavaScript with client-side filtering using AJAX.

## Architecture & Data Flow

### Core Data Structure (`data.json`)
```json
{
  "id": 2,
  "name": "ডাঃ মোঃ সাইফুল ইসলাম (স্বপন)",
  "qualification": "এমবিবিএস (ঢাকা)<br><br>...",
  "specialty": "সার্জন ও গাইনী চিকিৎসক",
  "schedule": "প্রতিদিনঃ<br>সকাল ৮টা - দুপুর ২টা...",
  "hospital": "শামছুল হক<br>মেমরিয়াল হসপিটাল",
  "contact": "61573<br>01819132643"
}
```
- **380+ doctor records** with Bengali text and HTML `<br>` tags
- Column names were migrated from `wdtcolumn*` to semantic names
- All text processing must handle `<br>` tags (case-insensitive)

### Three View Implementations

1. **`index.html`** - Card grid with live search + dual filters
   - Uses `script.js` and `styles.css`
   - Real-time search with 300ms debounce
   - Category + hospital dual filtering

2. **`table.html`** - Single filter table view
   - Standalone file with embedded styles/scripts
   - Hospital-only filter (no duplicates via Set)
   - Horizontal scroll on mobile

3. **`category-page.html`** - Category cards → table drill-down
   - Self-contained with category grouping logic
   - 15 predefined categories with keyword matching
   - Click card → show filtered table → back button

## Critical Patterns

### Category System (15 Fixed Categories)
All views use the **same 15-category taxonomy** defined in `script.js`:
```javascript
const mainCategories = [
  { name: 'প্রসূতি ও স্ত্রীরোগ বিশেষজ্ঞ', keywords: ['প্রসূতি', 'স্ত্রী', 'গাইনী', 'গাইনি', 'অবস'] },
  { name: 'সার্জারি বিশেষজ্ঞ', keywords: ['সার্জন', 'সার্জারি', ...] },
  // ... 13 more categories
  { name: 'অন্যান্য বিশেষজ্ঞ', keywords: [] } // catch-all
];
```
- Categories group fuzzy specialty strings via keyword matching
- `getMainCategory(specialty)` maps any specialty to one of 15 categories
- **Must keep categories synchronized** across all HTML files

### Text Processing Utilities
```javascript
// Remove HTML tags, normalize whitespace
function cleanText(text) {
  return text
    .replace(/<br\s*\/?>/gi, ' ')      // Case-insensitive <br> handling
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Preserve <br> for display
function formatText(text) {
  return text.replace(/<br\s*\/?>/gi, '<br>').trim();
}

// Convert <br> to comma for contacts
function formatContact(contact) {
  return contact.replace(/<br\s*\/?>/gi, ', ');
}
```

### Deduplication Pattern
Hospital filters use `Set` to eliminate duplicates:
```javascript
const hospitals = new Set();
allDoctors.forEach(doctor => {
  const hospital = cleanText(doctor.hospital);
  if (hospital.trim()) hospitals.add(hospital);
});
```

## Styling Conventions

### Bengali Typography
- **Font**: `Hind Siliguri` from Google Fonts (weights: 300-700)
- Font size: 0.95-1.1rem base, 1.2-2.2rem headings
- Line height: 1.6-1.7 for readability

### Color Palette (CSS Variables)
```css
--primary-color: #2563eb (blue)
--secondary-color: #10b981 (green)
--header-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
```

### Responsive Breakpoints
- 1024px: Tablet adjustments
- 768px: Mobile layout (grid → single column, horizontal table scroll)
- 480px: Small mobile (reduced font sizes)

### Card Hover Pattern
```css
.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.15);
  border-color: #2563eb;
}
```

## Development Workflows

### Testing Changes
1. Open HTML file directly in browser (no build step)
2. Check browser console for fetch errors or category mismatches
3. Test with: search, filters, mobile viewport, back buttons

### Adding New Categories
1. Update `mainCategories` array in `script.js`
2. Add matching keywords for Bengali specialty strings
3. Sync to `category-page.html` embedded script
4. Update category icons if needed

### Data Updates
- Edit `data.json` directly (JSON array of doctor objects)
- Use PowerShell for bulk column renames:
  ```powershell
  $content = Get-Content 'data.json' -Raw -Encoding UTF8
  $content = $content -replace '"oldKey":', '"newKey":'
  $content | Set-Content 'data.json' -Encoding UTF8
  ```

## Common Pitfalls

1. **Bengali Text Encoding**: Always use UTF-8 encoding
2. **`<br>` Tag Variants**: Match case-insensitively (`<br>`, `<BR>`, `<br />`)
3. **Category Keyword Conflicts**: Test that keywords don't overlap (e.g., 'বাত' in both heart and orthopedic)
4. **Duplicate Hospitals**: Always use `Set` for unique filtering
5. **Mobile Table Width**: Set `min-width` on tables (700-800px) for horizontal scroll

## File Dependencies
- `index.html` → `script.js` + `styles.css` + `data.json`
- `table.html` → `data.json` (self-contained)
- `category-page.html` → `data.json` (self-contained)

## Future Considerations
- No backend/database currently (pure client-side)
- No authentication or user management
- Consider API integration if doctor data grows beyond ~1000 records
- PWA features for offline access
