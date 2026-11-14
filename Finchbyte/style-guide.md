# Style Guide: Color Palette & Typography

This document outlines the main color palette and typography system used in the project.

---

## 🎨 Main Color Palette

### 1. Primary Brand & Accent Colors
| Swatch | Color Name | CSS Variable / Hex | Description |
| :--- | :--- | :--- | :--- |
| 🟣 | **Primary Accent** | `#4f46e5` (`--primary-accent`) | Indigo primary brand color for CTAs, tags, and key interactive elements |
| 💜 | **Accent Purple** | `#7c3aed` (`--accent-purple`) | Violet accent for secondary highlights & gradient stops |
| 🔵 | **Accent Blue** | `#2563eb` (`--accent-blue`) | Ocean blue accent |
| 🟢 | **Accent Emerald** | `#059669` (`--accent-emerald`) | Success metrics, positive status badges & progress fills |
| 🟠 | **Accent Amber** | `#d97706` (`--accent-amber`) | Warning indicators & metric highlights |
| 🔴 | **Accent Rose** | `#e11d48` (`--accent-rose`) | Urgent alerts & danger state elements |
| 🔷 | **Accent Cyan** | `#06b6d4` (`--accent-cyan`) | Tech highlight & gradient stop |

### 2. Text & Content Colors
| Swatch | Color Name | CSS Variable / Hex | Description |
| :--- | :--- | :--- | :--- |
| ⬛ | **Main Text** | `#0f172a` (`--text-main`) | Dark Slate 900 for headings and primary body text |
| 🔘 | **Muted Text** | `#475569` (`--text-muted`) | Slate 600 for subtitles, card text, and descriptions |
| ⚪ | **Dim Text** | `#64748b` (`--text-dim`) | Slate 500 for captions, timestamps, and subtle details |

### 3. Background & Glassmorphism Surfaces
| Swatch | Surface Name | CSS Variable / Hex | Description |
| :--- | :--- | :--- | :--- |
| 🌫️ | **Dark/Slate BG** | `#f8fafc` (`--bg-dark`) | Light slate baseline background |
| 🥛 | **Card Glass BG** | `rgba(255, 255, 255, 0.88)` (`--bg-card`) | Semi-transparent fill for glassmorphism cards |
| ⬜ | **Card Solid BG** | `#ffffff` (`--bg-card-solid`) | Solid white card surface |
| 🔳 | **Subtle Border** | `rgba(15, 23, 42, 0.08)` (`--border-color`) | Subtle slate border outline |
| ✨ | **Border Glow** | `rgba(79, 70, 229, 0.4)` (`--border-glow`) | Indigo glowing card outline |

### 4. Gradient System
- **Brand Text Gradient (`.text-gradient`)**:  
  `linear-gradient(125deg, #4f46e5 0%, #7c3aed 20%, #db2777 40%, #06b6d4 60%, #7c3aed 80%, #4f46e5 100%)`  
  *(Smooth animated gradient cycling through Indigo > Violet > Pink > Cyan)*

---

## 🔤 Typography System

### 1. Primary Font Family
- **Main Font**: `'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif`  
  *Applied globally to `body`, headings (`h1`–`h6`), section titles, inputs, buttons, and badges.*

### 2. Secondary & Display Font Families
- **Outfit**: `'Outfit', sans-serif` *(Used in specialized UI components & cards)*
- **Space Grotesk**: `'Space Grotesk', sans-serif` *(Imported display font)*
- **Syne**: `'Syne', sans-serif` *(Imported heavy display font)*

### 3. Font Weights
- **Light / Book**: `300`
- **Regular**: `400`
- **Medium**: `500`
- **Semi-Bold**: `600`
- **Bold**: `700`
- **Extra-Bold**: `800` (`.fw-extrabold`)
- **Black**: `900` (`.fw-black`)

### 4. Typographic Hierarchy & Scale

#### Headings & Titles
- **Main Hero & Section Titles** (`.section-title`, `.hero-title-main`):
  - **Font**: `'Plus Jakarta Sans', sans-serif`
  - **Size**: `clamp(2.4rem, 3.8vw, 3.6rem)` *(Fluid scale)*
  - **Weight**: `900` (Black)
  - **Line Height**: `1.1`
  - **Letter Spacing**: `-0.02em`
  - **Color**: `#0f172a`

#### Section Eyebrows & Badges
- **Section Tags** (`.section-tag`, `.section-eyebrow`):
  - **Font**: `'Plus Jakarta Sans', sans-serif`
  - **Size**: `0.78rem`
  - **Weight**: `800` (Extra-Bold)
  - **Letter Spacing**: `0.08em`
  - **Transform**: `uppercase`
  - **Color**: `#4f46e5`
  - **Border**: `1.5px solid #818cf8`
  - **Background**: `#ffffff`

#### Body & Paragraphs
- **Body Text**: Line height `1.6`, default size `1rem`, color `#0f172a`
- **Muted Subtitles**: Color `#475569`

#### Utility Text Sizes
- **Small (`.fs-7`)**: `0.85rem`
- **Extra Small (`.fs-8`)**: `0.75rem`
- **Micro (`.fs-9`)**: `0.68rem`
