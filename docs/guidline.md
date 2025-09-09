# HomeCook Design System Guidelines

## General Guidelines

### Code Structure
* Only use absolute positioning when necessary. Opt for responsive and well structured layouts that use flexbox and grid by default
* Refactor code as you go to keep code clean
* Keep file sizes small and put helper functions and components in their own files
* Always use semantic HTML elements (header, main, section, article, nav, etc.)
* Implement proper error handling for all user interactions
* Use TypeScript interfaces for all props and data structures

### Accessibility
* Ensure all interactive elements have a minimum touch target of 44px on mobile
* Provide proper ARIA labels and roles
* Maintain proper color contrast ratios
* Support keyboard navigation
* Include proper alt text for images

--------------

# Design System Guidelines

## Typography

### Base Settings
* Base font size: 16px (--font-size CSS variable)
* Line height: 1.5 for all text elements
* Font weights: 
  - Normal: 400 (--font-weight-normal)
  - Medium: 500 (--font-weight-medium)

### Hierarchy
* **H1**: Use for page titles and main app branding
  - Size: text-2xl equivalent
  - Weight: Medium (500)
  - Usage: Only one per page
* **H2**: Use for section headers and major content divisions
  - Size: text-xl equivalent  
  - Weight: Medium (500)
* **H3**: Use for subsection headers and card titles
  - Size: text-lg equivalent
  - Weight: Medium (500)
* **H4**: Use for component titles and minor headers
  - Size: text-base equivalent
  - Weight: Medium (500)
* **Body text (p)**: Use for all body content
  - Size: text-base equivalent
  - Weight: Normal (400)
* **Labels**: Use for form labels and UI element labels
  - Size: text-base equivalent
  - Weight: Medium (500)

### Typography Rules
* Never override font sizes, weights, or line heights unless specifically requested
* Use semantic HTML elements (h1, h2, h3, p, label) to inherit proper typography
* For special cases requiring custom typography, use explicit Tailwind classes like `text-lg font-medium`

## Color System

### Primary Colors
* **Background**: Use `bg-background` (white in light mode, dark in dark mode)
* **Foreground**: Use `text-foreground` for primary text
* **Primary**: Use `bg-primary` and `text-primary-foreground` for main CTAs
* **Secondary**: Use `bg-secondary` and `text-secondary-foreground` for secondary actions

### Semantic Colors
* **Muted**: Use `bg-muted` and `text-muted-foreground` for subtle backgrounds and secondary text
* **Accent**: Use `bg-accent` and `text-accent-foreground` for highlights and emphasis
* **Destructive**: Use `bg-destructive` and `text-destructive-foreground` for errors and dangerous actions
* **Card**: Use `bg-card` and `text-card-foreground` for elevated content areas

### Application-Specific Colors
* **Food/Brand Orange**: Use `bg-orange-500` for food-related primary actions
* **Success Green**: Use `bg-green-500` for success states
* **Warning Yellow**: Use `bg-yellow-500` for warning states

## Spacing System

### Base Spacing
* Use Tailwind's spacing scale: 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32
* **Extra Small**: `p-2` or `m-2` (8px)
* **Small**: `p-3` or `m-3` (12px)
* **Medium**: `p-4` or `m-4` (16px)
* **Large**: `p-6` or `m-6` (24px)
* **Extra Large**: `p-8` or `m-8` (32px)

### Layout Spacing
* **Container padding**: Use `px-4` on mobile, `px-6` on tablet, `px-8` on desktop
* **Section spacing**: Use `py-8` for vertical section spacing
* **Component spacing**: Use `gap-4` for flex/grid layouts
* **Card padding**: Use `p-6` for card interiors
* **Form element spacing**: Use `space-y-4` for form field groups

### Food Delivery Specific Spacing
* **Meal cards**: Use `p-4` interior padding, `gap-3` between cards
* **Dashboard sections**: Use `mb-6` between major sections
* **Navigation elements**: Use `py-3 px-4` for touch-friendly targets

## Forms and Inputs

### Form Layout
* Use `space-y-4` for form field groups
* Use `space-y-6` between form sections
* Always include proper labels with `htmlFor` attributes
* Group related fields using fieldset when appropriate

### Input Styling
* Use the Input component from shadcn/ui
* All inputs should have `bg-input-background` background
* Placeholder text should be helpful and specific
* Required fields should be clearly marked
* Error states should use `border-destructive` and `text-destructive`

### Form Validation
* Show validation errors inline below the input
* Use red color (`text-destructive`) for error messages
* Provide clear, actionable error messages
* Show success states with green color (`text-green-600`)

### Special Form Types
* **File uploads**: Use clear visual feedback during upload process
* **Photo uploads**: Show preview thumbnails
* **Price inputs**: Always include currency symbol ($)
* **Email inputs**: Use proper input type and validation
* **Password inputs**: Include show/hide toggle

## Buttons and Interactive Elements

### Button Hierarchy
* **Primary Button**: 
  - Use `bg-primary text-primary-foreground` or `bg-orange-500 text-white` for food-related actions
  - For main actions like "Add Meal", "Place Order", "Sign Up"
  - Only one primary button per screen section
* **Secondary Button**: 
  - Use `bg-secondary text-secondary-foreground` or outlined style
  - For supporting actions like "Cancel", "Back", "Edit"
* **Destructive Button**: 
  - Use `bg-destructive text-destructive-foreground`
  - For dangerous actions like "Delete Meal", "Remove Item"
* **Ghost Button**: 
  - Use `bg-transparent hover:bg-accent` 
  - For tertiary actions and navigation

### Button Sizing
* **Default**: Use default button size for most actions
* **Small**: Use `h-8` for compact interfaces
* **Large**: Use `h-12` for primary CTAs on mobile
* **Icon buttons**: Ensure minimum 44px touch target

### Interactive States
* All buttons must have hover, focus, and active states
* Use `hover:` variants for hover states
* Use `focus:ring-2 focus:ring-ring` for focus states
* Include loading states with spinners for async actions
* Disable buttons during loading with `disabled:opacity-50`

## Cards and Containers

### Card Design
* Use the Card component from shadcn/ui
* Standard card: `bg-card border border-border rounded-lg`
* Card padding: `p-6` for content, `p-4` for compact cards
* Card shadows: Use default shadow from Card component

### Food-Specific Cards
* **Meal cards**: Include image, title, description, price, availability status
* **Meal card layout**: Image at top, content below with proper spacing
* **Price display**: Always prominent, right-aligned, with currency symbol
* **Availability indicator**: Use color-coded badges (green for available, gray for unavailable)

### Container Hierarchy
* **Page container**: `max-w-6xl mx-auto px-4`
* **Content sections**: `max-w-4xl mx-auto`
* **Form containers**: `max-w-md mx-auto`
* **Modal containers**: `max-w-lg mx-auto`

## Mobile Responsiveness

### Breakpoint Strategy
* **Mobile-first**: Design for mobile first, then enhance for larger screens
* **Responsive utilities**: Use `sm:`, `md:`, `lg:`, `xl:` prefixes appropriately
* **Touch targets**: Minimum 44px for all interactive elements

### Mobile-Specific Rules
* **Navigation**: Use bottom navigation or hamburger menu
* **Forms**: Stack form elements vertically on mobile
* **Cards**: Full width on mobile, grid on larger screens
* **Buttons**: Full width primary buttons on mobile forms
* **Spacing**: Reduce padding/margins on mobile (`px-4` instead of `px-6`)

### Grid Systems
* **Mobile**: Single column layout
* **Tablet**: 2-column grid for cards
* **Desktop**: 3-4 column grid for meal cards
* Use `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` pattern

## Food Delivery Specific Components

### Meal Management
* **Meal cards**: Include photo, title, description, price, availability toggle
* **Photo uploads**: Show preview, progress indicator, and error states
* **Price inputs**: Format currency properly, validate positive numbers
* **Category selection**: Use select dropdown with common food categories

### Dashboard Layout
* **Vendor dashboard**: Top navigation with profile/logout, main content area, floating add button
* **Statistics cards**: Show key metrics like total meals, orders, revenue
* **Meal grid**: Responsive grid with consistent card sizing

### Authentication
* **Login/Register forms**: Center-aligned, max-width container
* **Email verification**: Clear messaging about verification status
* **User type selection**: Clear radio buttons or toggle for seller/buyer
* **Error messaging**: Inline validation with clear error descriptions

## Navigation and Layout

### Navigation Patterns
* **Top navigation**: Logo left, user actions right
* **Mobile navigation**: Hamburger menu or bottom tabs
* **Breadcrumbs**: Use for deep navigation hierarchies
* **Back buttons**: Always provide clear navigation paths

### Layout Patterns
* **Dashboard layout**: Sidebar or top navigation, main content area
* **Form layout**: Centered form with clear progress indication
* **List/Grid views**: Toggle between list and grid views where appropriate
* **Modal overlays**: Proper backdrop, focus management, escape key handling

## Loading and Empty States

### Loading States
* **Page loading**: Full page spinner or skeleton screens
* **Component loading**: In-place loading indicators
* **Button loading**: Spinner in button with disabled state
* **Image loading**: Use ImageWithFallback component

### Empty States
* **No meals**: Encouraging message with "Add your first meal" CTA
* **No results**: Clear messaging with suggestions to modify search
* **Error states**: Helpful error messages with retry options

## Data Formatting

### Date and Time
* **Relative dates**: "2 hours ago", "Yesterday", "Last week"
* **Absolute dates**: "Dec 15, 2024" format
* **Time format**: 12-hour format with AM/PM

### Currency
* **Price display**: Always show dollar sign ($)
* **Format**: $X.XX for prices, no cents for whole dollars over $10
* **Large numbers**: Use comma separators ($1,234.56)

### Text Formatting
* **Meal descriptions**: Limit to 2-3 lines with ellipsis
* **Titles**: Sentence case, not all caps
* **Labels**: Sentence case with proper capitalization

## Component-Specific Guidelines

### Button Component
The Button component is a fundamental interactive element in our design system, designed to trigger actions or navigate users through the application.

#### Usage
* Use clear, action-oriented labels ("Add Meal", "Save Changes", "Delete Item")
* Primary buttons should use orange color for food-related actions
* Maintain consistent sizing and spacing across the application
* Always provide feedback for user interactions (loading states, success/error messages)

#### Variants
* **Primary Button**
  - Purpose: Used for the main action in a section or page
  - Visual Style: `bg-orange-500 text-white` or `bg-primary text-primary-foreground`
  - Usage: One primary button per section to guide users toward the most important action
* **Secondary Button**
  - Purpose: Used for alternative or supporting actions
  - Visual Style: `bg-secondary text-secondary-foreground` or outlined style
  - Usage: Can appear alongside a primary button for less important actions
* **Destructive Button**
  - Purpose: Used for dangerous actions that cannot be easily undone
  - Visual Style: `bg-destructive text-destructive-foreground`
  - Usage: For actions like "Delete Meal", "Remove Account"

### Form Component Guidelines
* All forms should include proper validation with clear error messaging
* Use consistent spacing between form elements (`space-y-4`)
* Include helpful placeholder text and labels
* Provide visual feedback for form submission states
* Support both keyboard and touch interactions

### Card Component Guidelines
* Use cards to group related content and actions
* Maintain consistent padding and spacing within cards
* Include clear visual hierarchy with appropriate typography
* Use shadows and borders to create depth and separation
* Ensure cards are responsive and work well on all screen sizes