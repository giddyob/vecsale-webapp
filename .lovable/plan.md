

## Redesign Navbar to Match Groupon Style

### Overview
Restyle the header navbar to have a white background (like Groupon), increase the logo size for better visibility, and add Lucide SVG icons to each category in the navigation bar.

### Changes

#### 1. Update CSS variables (`src/index.css`)
- Change `--nav-bg` from dark navy (`216 28% 14%`) to white (`0 0% 100%`)
- Change `--nav-foreground` from white (`0 0% 100%`) to dark (`216 28% 14%`)
- This makes the navbar white with dark text, matching Groupon's style

#### 2. Update Header component (`src/components/Header.tsx`)
- Increase logo image height from `h-8` to `h-10` for better visibility
- Add a subtle bottom border to the main navbar row for separation
- Adjust icon and text colors to work with the new white background (the nav color tokens will handle most of this automatically)

#### 3. Add category icons mapping (`src/data/deals.ts`)
- Export a `categoryIcons` map that pairs each category name with a Lucide icon name
- Mapping:
  - "Things To Do" -> `Ticket`
  - "Beauty & Spas" -> `Sparkles`
  - "Food & Drink" -> `UtensilsCrossed`
  - "Gifts" -> `Gift`
  - "Auto" -> `Car`
  - "Travel" -> `Plane`
  - "Health & Fitness" -> `Dumbbell`
  - "Goods" -> `ShoppingBag`

#### 4. Update category nav in Header (`src/components/Header.tsx`)
- Import the relevant Lucide icons
- Render each category link in the desktop nav bar with its corresponding icon + label (icon on top or inline, similar to Groupon's horizontal icon+text layout)

#### 5. Update Category page pills (`src/pages/Category.tsx`)
- Add the same icons to the horizontal category filter pills on the category page for consistency

### Technical Details
- All icons come from `lucide-react` (already installed)
- The nav color variables (`--nav-bg`, `--nav-foreground`) are already used throughout the Header via Tailwind classes (`bg-nav`, `text-nav-foreground`), so changing the CSS variables will cascade automatically
- No new dependencies needed

