# Business English Section - Image Replacement Guide

## Component Structure
The `BusinessEnglishSection` component has multiple layers and image placeholders that need to be replaced with actual images.

## Images to Replace

### 1. Main Business Meeting Image
**Location**: Right side, top section
**Path**: `/images/business-meeting.jpg`
**Dimensions**: 600x400px
**Description**: Professional business meeting with people looking at laptop
**Current code**:
```tsx
<Image
  src="/images/business-meeting.jpg"  // REPLACE THIS
  alt="Business English Meeting"
  width={600}
  height={400}
  className="w-full h-80 object-cover"
  priority
/>
```

### 2. Students Learning Image
**Location**: Left side, bottom section
**Path**: `/images/students-learning.jpg`
**Dimensions**: 500x350px
**Description**: Students or people learning in a classroom/study environment
**Current code**:
```tsx
<Image
  src="/images/students-learning.jpg"  // REPLACE THIS
  alt="Students Learning English"
  width={500}
  height={350}
  className="w-full h-72 object-cover"
/>
```

### 3. Decorative Icons (Optional)
**Location**: Scattered around the section
**Paths to create**:
- `/icons/pencil.svg` - Yellow pencil icon
- `/icons/scissors.svg` - Orange scissors icon
- `/icons/laurel-left.svg` - Gold laurel leaf (left side)
- `/icons/laurel-right.svg` - Gold laurel leaf (right side)

**Current placeholder code**:
```tsx
{/* Replace with: /icons/pencil.svg */}
<div className="w-full h-full bg-yellow-400 rounded transform rotate-45"></div>

{/* Replace with: /icons/scissors.svg */}
<div className="w-full h-full bg-orange-400 rounded-full"></div>
```

## Folder Structure to Create
```
public/
├── images/
│   ├── business-meeting.jpg
│   └── students-learning.jpg
└── icons/
    ├── pencil.svg
    ├── scissors.svg
    ├── laurel-left.svg
    └── laurel-right.svg
```

## How to Replace Images

1. **Add images to public folder**: Place your images in the `public/images/` directory
2. **Update image paths**: The paths in the component already point to the correct locations
3. **Adjust dimensions if needed**: Modify the `width` and `height` props if your images have different aspect ratios
4. **Replace decorative elements**: Replace the placeholder `<div>` elements with actual `<Image>` components pointing to your icon files

## Example of replacing a placeholder:
```tsx
// Before (placeholder)
<div className="w-full h-full bg-yellow-400 rounded transform rotate-45"></div>

// After (with actual image)
<Image
  src="/icons/pencil.svg"
  alt="Pencil icon"
  width={32}
  height={32}
  className="w-full h-full transform rotate-45"
/>
```

## Usage
To use this component in your page:
```tsx
import BusinessEnglishSection from './components/sections/business-english'

export default function Page() {
  return (
    <div>
      {/* Other components */}
      <BusinessEnglishSection />
      {/* Other components */}
    </div>
  )
}
```