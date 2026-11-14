# FINCHBYTE — Unified Single-Page Homepage · Project Documentation

> **Architecture Update**: All 15 sections are now consolidated into one seamless, single-page `index.html`. All standalone `section-XX.html` files have been permanently removed.

---

## File Architecture

```
Finchbyte/
├── index.html                   # MASTER HOMEPAGE — All 15 sections in one page (1,565 lines)
├── style.css                    # Design system: CSS variables, glassmorphism, section layouts (76 KB)
├── script.js                    # Master animation engine: GSAP, Matter.js, simulators, drag & drop (49 KB)
├── hero-intro.js                # Section 01 dedicated intro & scroll physics engine (24 KB)
├── MagicRings.js                # WebGL Three.js GLSL magic rings animation (8 KB)
├── server.js                    # Static Node.js HTTP dev server (port 8080)
├── project.md                   # Full single-page project documentation
├── README.md                    # Project README documentation
│
├── logo.png                     # FinchByte soaring bird logo mark (transparent)
├── logo-transparent.png         # Alternate transparent logo
├── finchbyte-logo.png           # Full FinchByte wordmark logo
├── background.png               # Blurred office background image
└── section-08-people.png        # Team photo sliced into 2x2 puzzle tiles
```

---

## Single-Page Section Flow (index.html)

The homepage flows through 15 sections in one single scroll experience. DOM order in index.html:

| # | Anchor ID | Section Name | Scroll Type |
|---|-----------|-------------|-------------|
| 01 | #hero | Hero Intro & Live Engine | Pinned |
| 02 | #problem | The Problem | Pinned |
| 03 | #journey | The Journey | Pinned |
| 04 | #system | The System | Pinned |
| 05 | #creative | Creative Marketing | Sticky |
| 06 | #automation | Automation Engine | Static |
| 07 | #technology | FinchByte Technology (Setu CRM) | Static |
| 14 | #mktg-funnel | Marketing Funnel | Sticky |
| 08 | #people | People | Static |
| 09 | #pipeline | Pipeline | Static |
| 15 | #sales-funnel | Sales Funnel | Sticky |
| 10+11 | #revenue | Revenue Attribution & Learning Loop | Static |
| 12 | #results | Real Results | Sticky |
| 13 | #partnership | Partnership | Static |

Note: Sections 14 and 15 appear before 8, 9, 10, 11 in the DOM for UX flow reasons.

---

## Complete Section Specifications

---

### SECTION 01: HERO INTRO & LIVE ENGINE
- Anchor: #hero / #hero-pin-wrapper
- Script: hero-intro.js + script.js
- Scroll Type: GSAP Pinned (end: +=700%, scrub: 0.6)

#### Layout
- Top Stage: Full-viewport centered container with typewriter logo + Matter.js physics canvas
- Bottom Reveal (#hero-content-reveal): Two-column layout appearing at 75% scroll
  - Left (40%): Platform tag, h1 headline "FROM FIRST CLICK TO CLOSED SALE.", subtitle, CTA buttons, trust badges
  - Right (60%): Interactive "FinchByte Live Sales Engine" card with 6-stage pipeline stepper (Lead > Qualified > Contacted > Meeting > Proposal > Won), live automation notification toasts, bottom metric counters

#### Animations & Effects
| Phase | Scroll Range | Effect |
|-------|-------------|--------|
| 1 | 0.00-0.20 | Scrubbed letter-by-letter typewriter ("FINCHBYTE") with animated glowing cursor |
| 2 | 0.20-0.60 | Matter.js 28 physics keyword pills drop + mouse repulsion forcefield (dist < 120px) |
| 3 | 0.60-0.75 | Fade-out of typewriter logo and physics canvas |
| 4-5 | 0.75-1.00 | Hero reveal (y: 40px > 0px), simulated cursor glides pipeline stages, milestone toasts appear |

Simulator Milestone Thresholds (norm 0.0 to 1.0):
- < 0.15: Initial "Get Started" CTA with ripple click effect
- 0.15-0.35: Lead card slides in (translateY: 20px > 0px)
- 0.35-0.52: AI qualification details + SVG progress ring animation (0% > 96%)
- 0.52-0.72: WhatsApp AI reply toast slides in (translateX: 20px > 0px)
- 0.72-0.90: Demo scheduled toast appears, calendar status updates
- >= 0.90: Deal Won card pops in (scale 0.8 > 1), metrics count up (Revenue: $48,500, Leads: 1,286, Conversion: 18.6%)

Interactive: Mouse 3D card tilt (rotateX / rotateY), particle repulsion forcefield

---

### SECTION 02: THE PROBLEM
- Anchor: #problem / #prob-section
- Scroll Type: GSAP Pinned (end: +=900%, scrub: 1.2)

#### Layout
- Centered floating header (#prob-heading) with split eyebrow tag
- 3D depth card stack (#cards-stage): 3 layered cards with bottom indicator dots
  - Card 1 (#dc-1): WhatsApp Direct Inquiry — unread badge, 2h14m timer, "Not Logged" CRM status
  - Card 2 (#dc-2): Meta Ads Lead Capture — AI score bar fills to 78, "Unassigned" tag
  - Card 3 (#dc-3): "NOW WHAT?" manual bottleneck card with bold danger styling

#### Animations & Effects
| Phase | Scroll Range | Effect |
|-------|-------------|--------|
| 0 | 0.00-0.18 | Header slides to top, label split glow reveal, SVG underline draws in |
| Card 1 | 0.28-0.40 | Holds at front, then exits left (x: -VH, rotate: -6deg) |
| Card 2 | 0.40-0.68 | Promotes from mid-depth (y:22px, scale:0.94) to front, score bar fills 0% to 78% |
| Card 3 | 0.68-0.90 | Promotes from back-depth (y:44px, scale:0.88) to front stage |
| Burst | 0.90-1.15 | 4 floating question items burst outward with 2-step overshoot physics |

Question Burst Final Positions:
- TL (x: -220px, y: -110px, rot: -8deg): "Who responds first?"
- TR (x: 180px, y: -80px, rot: 6deg): "How many hours pass?"
- BL (x: -200px, y: 80px, rot: -5deg): "What happens to lead?"
- BR (x: 190px, y: 110px, rot: 7deg): "What does it cost?"

---

### SECTION 03: THE JOURNEY
- Anchor: #journey / #journey-section
- Scroll Type: GSAP Pinned (end: +=700%, anticipatePin: 1)

#### Layout
- Split grid: 340px left navigation panel + right 3D perspective card stage
- Left Panel: Section eyebrow, gradient heading, oversized step counter (01-07), 7 clickable progress dots with vertical line fill
- Right Stage: 7 moment cards (#mc-1 to #mc-7)
  - M01: The Ad (Meta, Google, Instagram)
  - M02: Landing Page (First Impression)
  - M03: WhatsApp Hook (Instant Reply in < 60 seconds)
  - M04: Setu CRM (AI Lead Scoring & Routing, score: 78/100)
  - M05: Follow-Up (Automated 3-Touch Sequence: Day 1, 3, 7)
  - M06: Meeting (Demo Booked, Google Meet, Calendar Sync)
  - M07: Customer (Deal Closed, +RS1,50,000 Revenue)

#### Animations & Effects
- 3D Perspective Card Transitions: Exiting cards animate (x: +/-120px, rotateY: -/+15deg, scale: 0.9, opacity: 0)
- Interactive Mouse Tilt: Active card tracks cursor (rotateY: x * 0.03, rotateX: -y * 0.03)
- Navigation Jump: Clicking left-panel dots smoothly scrolls to corresponding moment
- Transparent Glassmorphic Styling: Left navigation panel (#journey-left) and right moment cards (.moment-card-container) feature semi-transparent glass backdrop-filter blur allowing background.png to show through cleanly

---

### SECTION 04: THE SYSTEM
- Anchor: #system / #system-section
- Scroll Type: GSAP Pinned (end: +=450%, scrub: 1.2)

#### Layout
- Two-Part Split Grid Layout (.system-grid-layout):
  - Left Panel (.system-left-content): Eyebrow tag, title "WE BUILD THE JOURNEY.", subtitle, and 5 interactive stage indicators (.system-ind-item)
  - Right Stage (.system-right-stage): Orbit stage with central logo hub (#core-hub), Three.js WebGL MagicRings, and 5 orbiting stage cards (#sn-1 to #sn-5)
- Core Hub (#core-hub): Circular center with logo.png and glow drop-shadow
- MagicRings Wrapper (#magic-rings-wrapper, 210x210px): Three.js WebGL behind hub
- 5 Orbit Stage Nodes: GET FOUND (01 ATTRACT), SHOW INTEREST (02 ENGAGE), BECOME A LEAD (03 CAPTURE), KEEP MOVING (04 NURTURE), TALK TO SALES (05 CLOSE)

#### Animations & Effects
- WebGL MagicRings (MagicRings.js): Three.js GLSL shaders — 3 concentric chromatic pulsing rings with noise attenuation and gradient color blending (#b44fff to #42ccff)
- Silk Wave Background (#silk-canvas): 4 overlapping fluid sine/cosine ribbon waves on requestAnimationFrame
- Circular Orbit Carousel: Trigonometry at 215px radius (x = 215 * cos(angle), y = 215 * sin(angle))
- Spotlight Expansion: Active node at -90 degrees expands from 155px compact pill to 370px glassmorphism feature card
- Click-to-Rotate: Clicking any pill rotates it to the top spotlight position

---

### SECTION 05: CREATIVE MARKETING
- Anchor: #creative / #creative-sticky
- Scroll Type: Sticky (300vh scroll driver)

#### Layout
- Left Panel (48%): Vertical service tags, Analog Clock Widget, 3D Flip Clock, phone mockup frame with 3 content slides
  - Service tags: STRATEGY, CREATIVE, SOCIAL, SEARCH, PAID MEDIA
  - Phone Slide 1: FB/IG Creative (3.4x ROAS, 12% CTR Lift, 84% Reach)
  - Phone Slide 2: Google Search Ad preview
  - Phone Slide 3: Landing Page (<1.2s Load, 34% Conv., WA Hook)
- Right Panel (52%): Title ("FIRST, SOMEONE HAS TO NOTICE YOU."), 3 step tabs (FB/IG Creative, Google Search Ads, Landing Pages)

#### Animations & Effects
- Dual Clock Engine: Real-time analog hands + 3D mechanical split-flap flip clock
  - Time mapping: 09:41 AM to 09:47 AM across scroll progress
  - Flip card keyframe: rotateX(0deg to -90deg) on minute increments
- Progressive Service Tag Reveal by scroll depth:
  - Step 0: STRATEGY, CREATIVE, SOCIAL unlock
  - Step 1: SEARCH unlocks
  - Step 2: PAID MEDIA unlocks
- Slide Switching: prog < 0.34 = Slide 1, 0.34-0.67 = Slide 2, >= 0.67 = Slide 3

---

### SECTION 06: AUTOMATION ENGINE
- Anchor: #automation
- Scroll Type: Static section with on-demand animation

#### Layout
- Top unified hub card (.unified-automation-hub): "Avg Speed: 840ms" pill, "RUN AUTOMATION FLOW" button, "Success: 99.8%" badge
- 4-column feature grid: Instant Sync, WhatsApp Auto, AI Scoring, Zero Leakage
- Left Panel: 5-node visual execution flowchart tree
- Right Panel: Dark glassmorphic terminal log console (finchbyte-automation.log)

#### Node Steps
| Step | Timestamp | Action |
|------|-----------|--------|
| 01 | 09:47:01 | Meta & Google Ad Trigger |
| 02 | 09:47:02 | Setu CRM AI Parsing & Scoring (88/100) |
| 03 | 09:47:04 | WhatsApp Catalog Auto-Dispatch |
| 04 | 09:48:10 | Smart Rep Assignment (Rahul) |
| 05 | 09:49:00 | Calendar Sync & Notification |

#### Animations & Effects
- Button glossy sheen sweep (@keyframes glossSweep), pulsing shadow glow, bounce hover transitions
- In-Place Terminal Simulation: Pre-rendered log rows activate sequentially (zero duplication)
- Progress beam height: 0% to 100% alongside active counter (1/5 to 5/5)
- Confetti burst on 5th milestone (canvas-confetti, particleCount: 60, spread: 70)

---

### SECTION 07: FINCHBYTE TECHNOLOGY (SETU CRM)
- Anchor: #technology
- Scroll Type: Viewport trigger (static section)

#### Layout
- Section header + 6-column Setu CRM Kanban board (.kanban-board-container)
- Columns: NEW LEAD, CONTACTED, QUALIFIED, DISCUSSION, PROPOSAL, WON
- Live pipeline badge with pulsing emerald dot (.pulse-dot-emerald)
- Lead cards with names, sources, timestamps, and deal values

#### Animations & Effects
- Antigravity Canvas (#antigravity-canvas): Zero-g particles drift upward, mouse repulsion forcefield (130px radius)
- Constellation Lines: Neighboring particles within 85px draw connecting indigo lines (rgba(79, 70, 229, alpha))
- HTML5 Drag & Drop: Cards have draggable="true" with .drag-over dashed drop zone column highlights
- Stage-Aware Restyling: Drop into QUALIFIED = purple accents; Drop into WON = emerald green + confetti burst

---

### SECTION 14: MARKETING FUNNEL
- Anchor: #mktg-funnel / #sd-mktg
- Scroll Type: Sticky (900vh scroll driver, .funnel-scroll-driver > .funnel-sticky-wrap)

#### Layout
- Header tag "MARKETING FUNNEL" + title "FROM IMPRESSION TO ADVOCATE."
- 8-slice 3D inverted cone funnel using geometric CSS clip-path: polygon()
- Each slice has a 3D extruded depth ledge (.f-edge) and alternating left/right annotation badge
- Bottom glowing base ellipse (#fBaseGlow-mktg) + 3-column stats bar

#### Funnel Slices
| Slice | Label | Annotation |
|-------|-------|-----------|
| 01 | Traffic | Ad Impressions (left) |
| 02 | Visitors | Landing Page (right) |
| 03 | Leads | Inquiry Captured (left) |
| 04 | Qualified | ICP Match (right) |
| 05 | Opportunities | Active Intent (left) |
| 06 | Customers | First Order (right) |
| 07 | Loyal Customers | Repeat Buyer (left) |
| 08 | Advocates | Brand Champion (right) |

#### Animations & Effects
- Sequential Pop-In: 900vh scroll driver; sp = prog * 8.6; slices drop translateY(-30px) to 0 with opacity 0 to 1
- Funnel base glow reveals at completion
- Stats bar (8 Stages, 18.4% Conversion, RS17.1L Revenue) fades in at completion

---

### SECTION 08: PEOPLE
- Anchor: #people
- Scroll Type: Viewport trigger (start: top 80%)

#### Layout
- 2-column: Left (heading + 6 team drift badges), Right (2x2 puzzle assembly container)
- Team badges: Marketing Team, Sales Team, Support, Management, Customer, AI Assistant

#### Animations & Effects
- 2x2 Puzzle Assembly (section-08-people.png sliced via CSS background-size: 200% 200%):
  - Start positions: TL (x:-280, y:-240, rotate:-35deg), TR (x:280, y:-240, rotate:35deg), BL (x:-280, y:240, rotate:-40deg), BR (x:280, y:240, rotate:40deg)
  - GSAP spring easing: back.out(1.2) with 0.08s stagger, tiles snap inward to assembled image
  - Completion applies .assembled class with border glow
- Sequential Tag Wave: Interval timer highlights each badge every 900ms in automated loop; mouse hover pauses loop
- Replay Button: Manual re-trigger of puzzle assembly

---

### SECTION 09: PIPELINE
- Anchor: #pipeline
- Scroll Type: Static / viewport trigger

#### Layout
- 4 top velocity metric cards: Pipeline Value RS17.9L, Win Rate 25.0%, Avg Cycle 4.1 Days, Active Deals 12
- Source filter bar: All Sources (12), Meta (4), Google (3), SEO (3), WhatsApp (2)
- 5-column pipeline Kanban: NEW LEADS, CONTACTED, QUALIFIED, PROPOSAL, WON

#### Animations & Effects
- Source Filter Engine: Selecting a channel filters deal cards with opacity/scale transitions (.filtered-out class)
- Dynamic Recalculation: Filters update pipeline value, win rate, avg cycle time in real-time
- Metric Pulse: @keyframes pulse-scale value flash on update
- Column Count Badges (.kanban-count-badge) sync dynamically

---

### SECTION 15: SALES FUNNEL
- Anchor: #sales-funnel / #sd-sales
- Scroll Type: Sticky (900vh scroll driver)

#### Layout
- Header "SALES FUNNEL" + title "FROM PROSPECT TO CLOSED WON."
- 8-slice 3D cyan-to-emerald funnel
- Bottom stats: 8 Sales Stages, 4 min Resp. Time, 5+ Closed Deals

#### Funnel Slices
| Slice | Label | Color |
|-------|-------|-------|
| 01 | Prospect | Bright Cyan |
| 02 | Discovery | Dark Teal |
| 03 | Meeting | Royal Blue |
| 04 | Proposal | Deep Blue |
| 05 | Negotiation | Navy Blue |
| 06 | Closed Won (star) | Glowing Emerald Green |
| 07 | Upsell | Emerald Teal |
| 08 | Retention | Deep Emerald |

#### Animations & Effects
- Closed Won Celebration (.won-badge): When sp >= 5, .won-active class pops glowing "REVENUE checkmark" badge + annotations (Deal Signed, Revenue Booked)
- Sequential Drop-In: 0.13s linear smoothing per layer
- Emerald Base Glow (#fBaseGlow-sales) + stats bar fade in at completion
- 8-Stage Dot Tracker: Right-margin vertical dot column tracks active funnel depth

---

### SECTIONS 10 & 11: REVENUE ATTRIBUTION & LEARNING LOOP
- Anchor: #revenue / #learning
- Scroll Type: Static (combined in one section with 2-column layout)

#### Section 10 — Revenue View (Left Column)
- Badge: RS7.5L TRACKED
- Stat cards: Total Revenue RS7,50,000 (100% Attributed), Blended ROAS 4.05x
- Revenue attribution table:
  - Google Ads: 42 leads, 4.8x ROAS, RS2,40,000
  - SEO Organic: 38 leads, High ROI, RS3,10,000
  - Meta Ads: 74 leads, 3.2x ROAS, RS1,30,000

#### Section 11 — Learning Loop (Right Column)
- Badge: AI FEEDBACK ACTIVE
- Orbital feedback loop: Setu AI core + 4 satellite nodes (ADS, LEADS, SALES, AI LOOP)
- AI Action callout: "Budget automatically reallocated +35% into Meta Home Decor campaign."

#### Animations & Effects
- CountUp Animations: Values animate 0 to target on scroll entry (ScrollTrigger start: 'top 85%')
- 360 Degree Orbital Rotation (@keyframes orbitRotate): 20s linear infinite loop; satellite nodes counter-rotate to stay upright
- Card Hover Elevation: translateY(-3px) on stat cards; table row background transition on hover

---

### SECTION 12: REAL RESULTS
- Anchor: #results
- Scroll Type: Sticky (.results-scroll-driver > .results-sticky-wrap)

#### Layout
- Left (col-lg-5): Tag, heading "FROM CAMPAIGN TO CUSTOMER.", summary stats, verified badge (5 VERIFIED CASE STUDIES)
- Right (col-lg-7): Semi-circular 3D arc carousel (#arcStage) with 5 industry case study cards

#### Case Studies
| # | Industry | Company | Leads | Revenue |
|---|----------|---------|-------|---------|
| 01 | Agri Tech | FarmX | 140 | RS8.4L |
| 02 | FMCG | PureSip | 212 | RS1.7L |
| 03 | Home Decor | InterioLiv | 132 | RS1.5L |
| 04 | Retail | Ventro Foods | 180 | RS2.4L |
| 05 | E-Commerce | Zenith Retail | 310 | RS3.1L |

#### Animations & Effects
- Dynamic Light-Theme Laser Thread Wave Engine: 2D canvas running 60fps dynamic wavy laser thread strands in electric indigo, magenta, and cyan hues with multi-pass glow rendering, traveling energy pulses, smooth mouse deflection spring tension, and right-margin focal pulse hub
- Semi-Circular Arc Carousel: Cards at angle = offset * 18deg; center spotlight scale: 1.08, flanking 0.76-0.88
- Wheel Controller: Mousewheel advances/reverses with 350ms throttle debounce
- Click-to-Center: Clicking flanking card rotates it to spotlight
- Left panel metric CountUp on scroll reveal

---

### SECTION 13: PARTNERSHIP
- Anchor: #partnership
- Scroll Type: Static (viewport entrance)

#### Layout
- Left (col-lg-6): Tag, heading ("WE'RE NOT HERE FOR THE CAMPAIGN. WE'RE HERE FOR THE GROWTH."), subtitle, 4-step roadmap cards
- Right (col-lg-6): Growth Partnership booking card with floating rocket, value props checklist, full-width CTA

#### Roadmap Steps
| Step | Title |
|------|-------|
| 01 | Discovery & Business Audit |
| 02 | System Architecture & Setup |
| 03 | Campaign Launch & Execution |
| 04 | Closed-Loop Optimization |

#### Animations & Effects
- Roadmap Card Hover: translateX(6px) + step number badge illuminates with indigo glow
- Floating Rocket: Infinite subtle vertical bobbing animation on booking card icon
- CTA Arrow Hover: Arrow icon translateX(4px)
- CTA Link: "START YOUR GROWTH JOURNEY" href="#hero" loops back to top

---

## Master Animation Matrix

| Section | Primary Visual Effect | Engine | Scroll Driver | Interactivity |
|---------|----------------------|--------|--------------|---------------|
| 01 Hero | Typewriter + Physics Pills + Simulator | Matter.js + GSAP + Lenis | Pinned +=700%, scrub 0.6 | Mouse repulsion, 3D card tilt |
| 02 Problem | 3D Stacked Depth Deck + Question Burst | GSAP + CSS 3D | Pinned +=900%, scrub 1.2 | Score bar, overshoot burst |
| 03 Journey | 7-Moment Stepper + 3D Perspective Cards | GSAP + CSS 3D | Pinned +=700% | Mouse tilt, dot navigation |
| 04 System | 360 Degree Orbit + WebGL MagicRings + Silk Canvas | Three.js GLSL + 2D Canvas + GSAP | Pinned +=450%, scrub 1.2 | Click-to-rotate orbit nodes |
| 05 Creative | Analog + Flip Clock + Sticky Phone Slides | Vanilla JS + CSS 3D | Sticky 300vh | Scroll-synced clock, tab switch |
| 06 Automation | Terminal Log + 5-Node Flowchart | Vanilla JS + GSAP + Confetti | On-demand | Run flow button, confetti |
| 07 Technology | Kanban CRM + Antigravity Canvas | 2D Canvas + HTML5 DnD API | Viewport trigger | Drag and drop, particle repulsion |
| 14 Mktg Funnel | 8-Stage 3D Cone Funnel | Vanilla JS + clip-path | Sticky 900vh | Sequential layer reveal |
| 08 People | 2x2 Image Puzzle + Tag Wave | GSAP + CSS Grid | Viewport trigger top 80% | Puzzle assembly, tag hover |
| 09 Pipeline | Filterable Kanban + Metric Recalculator | Vanilla JS + GSAP | Viewport trigger | Source filter, live metrics |
| 15 Sales Funnel | 8-Stage Cyan to Emerald Funnel | Vanilla JS + clip-path | Sticky 900vh | Closed Won badge pop |
| 10 Revenue | Attribution Table + CountUp | GSAP CountUp | Viewport top 85% | Hover elevation |
| 11 Learning | 360 Degree Orbital Feedback Loop | CSS keyframes 20s infinite | Continuous | Counter-rotate satellites |
| 12 Results | Semi-Circular Arc Carousel | Vanilla JS trigonometry | Wheel event + click | Wheel-driven, click-to-center |
| 13 Partnership | 4-Step Roadmap + Booking Card | CSS micro-animations | Viewport entrance | Card hover, rocket bob |

---

## Local Development

```bash
# Start dev server on port 8080
node server.js

# Access homepage
http://localhost:8080/index.html
```

---

## Technology Stack

| Category | Technology | Version |
|----------|-----------|---------|
| Core | HTML5, Vanilla JS (ES6+), Vanilla CSS | — |
| UI Framework | Bootstrap | 5.3.3 |
| Icons | Bootstrap Icons | 1.11.3 |
| Typography | Google Fonts: Outfit, Plus Jakarta Sans, Space Grotesk, Syne | — |
| Smooth Scroll | Lenis | 1.1.18 |
| Animation | GSAP + ScrollTrigger | 3.12.5 |
| 2D Physics | Matter.js | 0.19.0 |
| WebGL / 3D | Three.js (custom GLSL shaders) | 0.160.0 |
| Confetti | canvas-confetti | 1.9.2 |
| Drag and Drop | Native HTML5 DnD API | — |
| Server | Node.js static HTTP server | — |

---

## Design System Highlights (style.css)

- Color Palette: CSS variables for indigo, emerald, gradient tokens, glassmorphism surfaces
- Typography: Unified `Plus Jakarta Sans` family across all sections (headings, subtitles, badges, tags, tables, metrics, cards), except for the hero intro animation (`.typewriter-logo`).
- Component Classes: .btn-finch-primary, .btn-finch-secondary, .section-tag, .trust-badge, .drift-badge, .roadmap-step-card, .booking-preview-card, .side-section-card, .minimal-stat-card, .table-finch
- Specialty: .bg-mesh ambient light background, smooth 60fps animated text gradient system (`.text-gradient`, `.hl`) across all headings, `.pulse-dot-*` animated indicators
- Font Sizes: Custom Bootstrap extensions (fs-7, fs-8, fs-9) for fine-grained control
- Glassmorphism: backdrop-filter: blur() + semi-transparent borders across card components

---

## Critical Rules — Do Not Change

1. Do not split the homepage — All sections must remain inside index.html within main#finchbyte-homepage.
2. Do not reorder pinned sections — GSAP pinned scroll sequences (Hero, Problem, Journey, System) must appear in this order or triggers will break.
3. Preserve all existing animations — Timing, GSAP scrub values, and phase thresholds are tightly calibrated; changes require full re-testing.
4. Do not remove canvas elements — #silk-canvas, #antigravity-canvas, and #matter-canvas-container must remain in DOM for their JS engines.
5. Script load order — External CDN scripts must load before MagicRings.js then script.js at bottom of body.
6. No duplicate hero-intro.js — The hero animation runs via script.js. Do not add a second hero-intro.js tag.
