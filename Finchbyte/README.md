# FINCHBYTE — Sales & Marketing Automation Platform Documentation

Welcome to the **Finchbyte** codebase documentation. This document provides an exhaustive, section-by-section breakdown, file architecture, and technical reference for all **15 sections** of the platform, detailing their layout structures, interactive features, and advanced effects and animation systems.

---

## 📁 File & Section Architecture

The project consists of 15 standalone section pages (`section-01-hero.html` through `section-15-sales-funnel.html`), dedicated script engines, and shared design tokens.

```
Finchbyte/
├── style.css                    # Design system, CSS variables, glassmorphism & section layout styles
├── script.js                    # Master animation engine (Lenis, GSAP, Matter.js, Simulators, Drag & Drop, Antigravity)
├── hero-intro.js                # Dedicated Section 01 Intro & Scroll Physics script
├── MagicRings.js                # Vanilla JS port of React Bits MagicRings WebGL animation component (Three.js GLSL shaders)
├── server.js                    # Static HTTP development server (Node.js)
│
├── logo.png                     # FinchByte soaring bird logo mark (transparent PNG)
├── finchbyte-logo.png           # Full FinchByte wordmark logo
├── section-08-people.png        # Meeting image asset sliced into 2x2 scroll puzzle tiles
│
├── section-01-hero.html         # [Section 01] Hero Intro & Live Engine (Typewriter + Physics + Simulator)
├── section-02-problem.html      # [Section 02] The Problem (3D Stacked Depth Deck + Question Burst)
├── section-03-journey.html      # [Section 03] The Journey (7 Orchestrated Moments + 3D Card Tilts)
├── section-04-system.html       # [Section 04] The System (Circular Orbit Stage + WebGL MagicRings + Silk Canvas)
├── section-05-creative.html     # [Section 05] Creative Marketing (Analog & 3D Flip Clock + Sticky Slide Deck)
├── section-06-automation.html   # [Section 06] Automation (Unified Engine Hub + In-Place Terminal Log + Confetti)
├── section-07-technology.html   # [Section 07] Finchbyte Technology (Setu CRM Kanban Drag & Drop + Antigravity Particles)
├── section-08-people.html       # [Section 08] People (2x2 Scroll Puzzle Assembly + Sequential Tag Pulse Wave)
├── section-09-pipeline.html     # [Section 09] Pipeline (Dynamic Metric Recalculator + Filterable Kanban Board)
├── section-10-revenue.html      # [Section 10] Revenue View (Revenue Attribution Matrix + CountUp Numbers)
├── section-11-learning.html     # [Section 11] Learning Loop (Orbital 360° Closed-Loop AI Engine)
├── section-12-results.html      # [Section 12] Real Results (Semi-Circular 3D Arc Carousel + Wheel Controller)
├── section-13-partnership.html  # [Section 13] Partnership (4-Step Growth Roadmap + Consultation Preview)
├── section-14-mktg-funnel.html  # [Section 14] Marketing Funnel (8-Stage 3D Geometric Cone Funnel)
└── section-15-sales-funnel.html # [Section 15] Sales Funnel (8-Stage 3D Cyan-to-Emerald Funnel + Closed Won Pulse)
```

---

## 📜 Comprehensive 15-Section Specifications & Animation Breakdown

---

### SECTION 01: HERO INTRO & LIVE ENGINE
- **Source File**: [section-01-hero.html](file:///c:/Users/Administrator/Desktop/Projects/testtttttttt/section-01-hero.html)
- **Script Files**: [hero-intro.js](file:///c:/Users/Administrator/Desktop/Projects/testtttttttt/hero-intro.js) / [script.js](file:///c:/Users/Administrator/Desktop/Projects/testtttttttt/script.js)
- **Anchor ID**: `#hero-pin-wrapper`
- **Purpose**: High-impact brand introduction driven sequentially by scroll progress, leading into an interactive live SaaS sales journey simulator.

#### Layout & Visual Components
- **Top Brand Intro Stage**: Full-viewport centered container hosting the dynamic typewriter logo and Matter.js canvas.
- **Hero Content Reveal Stage (`#hero-content-reveal`)**: Two-column layout revealing at 75% scroll:
  - **Left Column (40%)**: Platform tag, main headline ("FROM FIRST CLICK TO CLOSED SALE."), subtitle, primary/secondary CTA buttons, and single-row scrolling trust indicators.
  - **Right Column (60%)**: Interactive FinchByte Live Sales Engine Card with top header controls, 6-stage pipeline stepper (`Lead` → `Qualified` → `Contacted` → `Meeting` → `Proposal` → `Won`), dynamic stage body, and live bottom metric counters.

#### Effects & Animations
- **Lenis Smooth Scroll & GSAP ScrollTrigger Pinned Sequence**:
  - `trigger: #hero-pin-wrapper`, `pin: true`, `scrub: 0.6`, `end: '+=700%'`.
- **Phase 1 (0.00 – 0.20 Scroll) — Scrubbed Dynamic Typewriter**:
  - Letter-by-letter typing of `"FINCHBYTE"` strictly scrubbed by scroll progress.
  - Animated glowing typewriter cursor (`.typewriter-cursor`) dynamically follows the current active character index.
- **Phase 2 (0.20 – 0.60 Scroll) — Matter.js 2D Physics Engine**:
  - Drops 28 keyword pills (`Sales`, `Marketing`, `Automation`, `CRM`, `Growth`...) when gravity is triggered (`gravity.y = 1.2`).
  - Realistic body restitution (`0.5`), friction, and angle tilting.
  - **Interactive Mouse Repulsion Forcefield**: When the cursor moves near physics bodies (`dist < 120px`), a dynamic repulsion force deflects the pills away.
  - Reverse scroll reset: Scrolling back above 0.20 resets pills to their initial top positions and zeroes out velocities.
- **Phase 3 (0.60 – 0.75 Scroll) — Seamless Fade-Out**:
  - Direct opacity fade of typewriter logo and physics canvas into transparency without jarring zoom or scale distortions.
- **Phase 4 & 5 (0.75 – 1.00 Scroll) — Hero Reveal & Continuous Simulator Scrubbing**:
  - Hero content fades in and slides upward (`y: 40px` → `0px`).
  - Simulated cursor (`#sim-cursor`) glides continuously across pipeline stages (`norm = 0.0` → `1.0`).
  - **Milestone Threshold Reveals**:
    - `norm < 0.15`: Initial visitor landing CTA button with interactive click ripple.
    - `norm 0.15 – 0.35`: Lead Card slides in (`translateY(20px)` → `0px`).
    - `norm 0.35 – 0.52`: AI Qualification Details activate; circular SVG progress ring animates (`0%` → `96%`).
    - `norm 0.52 – 0.72`: WhatsApp AI reply notification toast slides in (`translateX(20px)` → `0px`).
    - `norm 0.72 – 0.90`: Demo scheduled toast appears; calendar status updates.
    - `norm >= 0.90`: Deal Won Success Card pops in (`scale(0.8)` → `scale(1)`), and bottom metrics count up (Revenue: `$48,500`, Leads: `1,286`, Conversion: `18.6%`).
- **Parallax 3D Card Tilt**: Mouse movement over simulator triggers 3D perspective tilt (`rotateX`, `rotateY`).

---

### SECTION 02: THE PROBLEM
- **Source File**: [section-02-problem.html](file:///c:/Users/Administrator/Desktop/Projects/testtttttttt/section-02-problem.html)
- **Anchor ID**: `#problem` / `#prob-section`
- **Purpose**: Exposes the critical failure point where standard marketing campaigns end and lead follow-up stalls due to manual bottlenecks.

#### Layout & Visual Components
- **Pinned Full-Viewport Stage (`height: 100vh`)**:
- **Centered Floating Header (`#prob-heading`)**: Features split eyebrow tag (`02 /` & `THE PROBLEM`), two-line main title, and handwritten accent annotation.
- **3D Depth Card Stage (`#cards-stage`)**: Houses 3 layered stacked depth cards centered on screen with bottom indicator dots:
  - **Card 1 (`#dc-1`)**: WhatsApp Direct Inquiry snippet with unread badge.
  - **Card 2 (`#dc-2`)**: Meta Ads Lead Capture with dynamic qualification score bar.
  - **Card 3 (`#dc-3`)**: The Manual Bottleneck card with bold *"NOW WHAT?"* typography and blinking timer badge.

#### Effects & Animations
- **GSAP ScrollTrigger Pinned Sequence**:
  - `trigger: #prob-section`, `pin: true`, `scrub: 1.2`, `end: '+=900%'`.
- **Phase 0 (0.00 – 0.18 Scroll) — Header Translation & Split Glow Reveal**:
  - `#prob-heading` starts at vertical center and slides smoothly to top (`y: 32px`).
  - Label splits: `label-left` glides from left (`x: -40px` → `0px`) and `label-right` from right (`x: 40px` → `0px`) with blur removal and glowing activation.
  - Title Line 1 ("MOST MARKETING") glides upward; Line 2 ("ENDS HERE.") scales in with gradient reveal and `.light-sweep-effect`.
  - Handwritten SVG underline path draws in via SVG stroke dashoffset animation.
- **Card Depth Stack Navigation**:
  - **Card 1 (0.28 – 0.40)**: Holds at front, then exits to the left (`x: -VH`, `rotate: -6deg`, opacity fade).
  - **Card 2 (0.40 – 0.68)**: Promotes from mid-depth (`y: 22px, scale: 0.94`) to front (`y: 0px, scale: 1.0`), filling qualification score bar from `0%` to `78%`. Exits left at 0.68.
  - **Card 3 (0.68 – 0.90)**: Promotes from back-depth (`y: 44px, scale: 0.88`) to front stage.
- **Phase 0.90 – 1.15 Scroll — Overshoot Question Burst Physics**:
  - 4 floating bottleneck question cards (`.q-item`) burst outward from the center of Card 3 with a 2-step overshoot and settle:
    - *Item 1 (Top-Left: "Who responds first?")*: Shoots to `x: -252px, y: -126px, rot: -11°` → settles at `x: -220px, y: -110px, rot: -8°`.
    - *Item 2 (Top-Right: "How many hours pass?")*: Shoots to `x: 207px, y: -92px, rot: 8°` → settles at `x: 180px, y: -80px, rot: 6°`.
    - *Item 3 (Bottom-Left: "What happens to this lead?")*: Shoots to `x: -230px, y: 92px, rot: -7°` → settles at `x: -200px, y: 80px, rot: -5°`.
    - *Item 4 (Bottom-Right: "What does it cost?")*: Shoots to `x: 218px, y: 126px, rot: 9°` → settles at `x: 190px, y: 110px, rot: 7°`.

---

### SECTION 03: THE JOURNEY
- **Source File**: [section-03-journey.html](file:///c:/Users/Administrator/Desktop/Projects/testtttttttt/section-03-journey.html)
- **Anchor ID**: `#journey` / `#journey-section`
- **Purpose**: Visualizes the 7 orchestrated moments of a prospect from initial ad impression to a closed, revenue-generating customer.

#### Layout & Visual Components
- **Split Grid Layout (340px Left Panel | Right 3D Perspective Card Stage)**:
  - **Left Navigation Panel**: Section eyebrow, gradient heading, oversized dynamic step counter (`01` to `07`), and 7 clickable progress dot rows.
  - **Right Stage Area**: 7 layered moment cards (`#mc-1` to `#mc-7`): *01 Ad*, *02 Landing Page*, *03 WhatsApp*, *04 Setu CRM*, *05 Follow-up*, *06 Meeting*, *07 Customer*.
  - **Bottom Progress Bar**: Horizontal line tracking overall journey completion percentage.

#### Effects & Animations
- **GSAP ScrollTrigger Pinned Stepper Engine**:
  - `trigger: #journey-section`, `pin: true`, `end: '+=700%'`, `anticipatePin: 1`.
  - Calculates active moment step `step = Math.floor(progress * 7)`.
- **3D Perspective Card Transition Physics**:
  - Exiting card animates out with 3D rotation and perspective translation (`x: ±120px, rotateY: ∓15°, rotateX: ±5°, scale: 0.9, opacity: 0`).
  - Incoming card pops into spotlight with front perspective (`opacity: 1, x: 0, rotateY: 0, rotateX: 0, scale: 1, zIndex: 10`).
- **Interactive Mouse Tilt**:
  - Active card tracks cursor coordinates, applying real-time 3D tilt deflection (`rotateY: x * 0.03`, `rotateX: -y * 0.03`).
- **Interactive Navigation Jump**:
  - Clicking any left-panel step dot smoothly scrolls the page and animates the corresponding moment card into view.
- **Ambient Glowing Mesh**:
  - Dual radial gradient ambient blobs (`.glow-blob-1`, `.glow-blob-2`) with 100px blur creating atmospheric background lighting.

---

### SECTION 04: THE SYSTEM
- **Source File**: [section-04-system.html](file:///c:/Users/Administrator/Desktop/Projects/testtttttttt/section-04-system.html)
- **Anchor ID**: `#system` / `#system-section`
- **Purpose**: Illustrates the complete 5-stage growth system orbiting the central FinchByte intelligent core.

#### Layout & Visual Components
- **Vertical Left Tag**: Rotated vertical badge (`04 / THE SYSTEM`).
- **Top Section Header**: Centered title with gradient highlight text.
- **Orbit Canvas Stage (`#orbit-stage`, 700×700px)**:
  - **Center Core Hub (`#core-hub`)**: Transparent circular center with soaring bird logo mark (`logo.png`) and drop-shadow glow.
  - **MagicRings WebGL Wrapper (`#magic-rings-wrapper`, 210×210px)**: Positioned directly behind hub.
  - **5 Orbit Stage Nodes**: *Get Found*, *Show Interest*, *Become a Lead*, *Keep Moving*, *Talk to Sales*.

#### Effects & Animations
- **WebGL GLSL Shader MagicRings Engine (`MagicRings.js`)**:
  - Powered by Three.js and custom GLSL vertex/fragment shaders.
  - Renders 3 concentric chromatic pulsing rings with noise attenuation, exponential distance decay, and continuous gradient color blending (`#b44fff` to `#42ccff`).
- **2D Canvas Living Silk Wave Background (`#silk-canvas`)**:
  - Multi-frequency harmonic wave algorithm running on `requestAnimationFrame`.
  - 4 overlapping fluid sine/cosine ribbon waves with shifting indigo/purple gradient fills.
- **GSAP Pinned Circular Orbit Carousel**:
  - `trigger: #system-section`, `pin: true`, `scrub: 1.2`, `end: '+=450%'`.
  - Calculates circular trigonometry along a 215px radius: `x = 215 * cos(angle)`, `y = 215 * sin(angle)`.
  - **Spotlight Expansion (`.active-spotlight`)**: The node reaching top center (`-90°`) dynamically expands from a 155px compact pill into a full 370px glassmorphism feature card (`scale: 1, opacity: 1`).
  - **Collapsed Orbiting Pills**: Inactive nodes scale down (`scale: 0.88, opacity: 0.5–0.75`).
- **Click-to-Rotate Interaction**:
  - Clicking any orbiting pill calculates its target angle and smoothly rotates it directly to the top spotlight position.

---

### SECTION 05: CREATIVE MARKETING
- **Source File**: [section-05-creative.html](file:///c:/Users/Administrator/Desktop/Projects/testtttttttt/section-05-creative.html)
- **Anchor ID**: `#creative`
- **Purpose**: Showcases creative marketing execution across Social Ads, Paid Search, and High-Conversion Landing Pages.

#### Layout & Visual Components
- **300vh Scroll Track with 100vh Sticky Viewport (`#creative-sticky`)**:
  - **Left Showcase Panel (48%)**: Dark gradient background, integrated Analog Clock Widget, 3D Split-Flap Flip Clock, live ad device mockups, and dynamic scroll progress bar.
  - **Right Slide Deck Panel (52%)**: Service eyebrow, title, and 3 service slide cards:
    - *Slide 01*: Creative Social Ads (Instagram / Meta ad visual mockups).
    - *Slide 02*: High-Intent Search Ads (Google Search sponsored ad preview).
    - *Slide 03*: High-Conversion Landing Pages (Fast responsive landing page mockup).

#### Effects & Animations
- **Dual Analog & 3D Split-Flap Flip Clock Engine**:
  - **Real-Time Analog Clock Hands**: Rotating Hour hand, Minute hand, and Red Second hand driven continuously by scroll progress (`hourDeg = (hours % 12) * 30`, `minDeg = mins * 6`, `secDeg = (prog * 360 * 12) % 360`).
  - **3D Mechanical Flip Clock**: Digit unit cards feature a horizontal dividing seam and 3D card-flip keyframe animation (`rotateX(0deg → -90deg)`) triggered on minute increments.
  - **Time Mapping**: Scroll progression maps smoothly from `09:41 AM` (581 min) → `09:45 AM` (585 min) → `09:47 AM` (587 min).
- **Progressive Service Tag Reveal Engine**:
  - Top vertical tags unlock sequentially as scroll depth increases:
    - Step 0: Unlocks `Strategy`, `Creative`, `Social`.
    - Step 1: Unlocks `Search`.
    - Step 2: Unlocks `Paid Media`.
  - Tags animate in with staggered pop transitions and remain permanently unlocked once revealed.
- **Scroll-Synchronized Slide Deck Switching**:
  - `prog < 0.34`: Activates Slide 1 (*Social Ads*).
  - `0.34 <= prog < 0.67`: Activates Slide 2 (*Search Ads*).
  - `prog >= 0.67`: Activates Slide 3 (*Landing Pages*).
- **Interactive Step Navigation**: Clicking right-side step tabs or indicator dots jumps directly to the corresponding creative service.

---

### SECTION 06: AUTOMATION
- **Source File**: [section-06-automation.html](file:///c:/Users/Administrator/Desktop/Projects/testtttttttt/section-06-automation.html)
- **Anchor ID**: `#automation`
- **Purpose**: Demonstrates automated instant lead capture, AI scoring, WhatsApp dispatch, and sales routing in under 1.2 seconds.

#### Layout & Visual Components
- **Unified Engine Hub Card (`.unified-automation-hub`)**:
  - Top Action Control Bar: Average speed pill (`840ms`), "RUN AUTOMATION FLOW" button, and success rate indicator (`99.8%`).
  - 4-Column Feature Hit-Points Grid: *Instant Webhook Sync*, *WhatsApp Auto-Dispatch*, *AI Setu CRM Scoring*, *Zero Lead Leakage*.
- **Dual Panel Workflow & Terminal Layout**:
  - **Left Panel**: 5-Node Visual Execution Flowchart Tree (`.workflow-nodes-tree`) with glowing progress beam.
  - **Right Panel**: Dark Glassmorphic Terminal Log Console (`finchbyte-automation.log`) with live feed status badge and latency summary footer.

#### Effects & Animations
- **Button Micro-Animations**:
  - Action buttons feature glossy light sheen sweep (`@keyframes glossSweep`), pulsing shadow glow, and bounce transitions on hover.
- **In-Place Terminal Simulation Engine (Zero Duplication)**:
  - Stepping through the 5 nodes activates pre-rendered terminal rows in-place sequentially:
    - `09:47:01`: Meta & Google Ad Inquiry ingested via webhook.
    - `09:47:02`: Lead auto-parsed and intent scored (`88/100`).
    - `09:47:04`: Instant WhatsApp message and buyer catalog sent.
    - `09:48:10`: Lead routed to Senior Sales Rep (Rahul).
    - `09:49:00`: Google Calendar invite logged & confirmed.
  - Progress beam height updates dynamically (`0%` → `100%`) alongside active counter (`1/5` → `5/5`).
  - Automatic terminal scroll locks viewport to latest active event.
- **Celebration Confetti Burst**:
  - On completing the 5th milestone, a celebratory canvas confetti burst triggers (`particleCount: 60, spread: 70`).
- **Scroll-Driven GSAP Mode**:
  - Pinned ScrollTrigger option (`#automation-scroll-wrapper`) allows manual scroll scrubbing across all 5 automation steps.

---

### SECTION 07: FINCHBYTE TECHNOLOGY (SETU CRM)
- **Source File**: [section-07-technology.html](file:///c:/Users/Administrator/Desktop/Projects/testtttttttt/section-07-technology.html)
- **Anchor ID**: `#technology`
- **Purpose**: Interactive Kanban view of Setu CRM pipeline demonstrating multi-stage deal flow and lead visibility.

#### Layout & Visual Components
- **Full-Width Setu CRM Kanban Container**:
  - Header bar with CRM engine title and live animated status indicator badge (`.live-pipeline-badge`).
  - 6 Kanban Pipeline Columns: `NEW LEAD`, `CONTACTED`, `QUALIFIED`, `DISCUSSION`, `PROPOSAL`, `WON`.
  - Realistic lead deal cards with prospect names, acquisition sources, timestamps, and deal values.

#### Effects & Animations
- **Canvas-Based Antigravity Particle Engine (`#antigravity-canvas`)**:
  - Zero-g particles drift upward with negative vertical velocity (`vy: -(Math.random() * 0.6 + 0.2)`).
  - **Mouse Forcefield Deflection**: Cursor creates a 130px radius repulsion forcefield that pushes particles away with dynamic angle calculation.
  - **Proximity Constellation Lines**: Neighboring particles within 85px draw connecting semi-transparent indigo lines (`rgba(79, 70, 229, alpha)`).
  - Screen-wrapping keeps particle count optimal across window resizes.
  - Ambient radial background glow orbs (`.antigravity-orb`) create soft depth.
- **Interactive HTML5 Drag & Drop Engine**:
  - Cards feature `draggable="true"` with custom dragstart opacity styling.
  - Columns highlight with `.drag-over` dashed indigo drop zones on hover.
  - **Stage-Aware Dynamic Card Restyling**:
    - Dropping into `QUALIFIED` updates card styling with purple accents.
    - Dropping into `WON` applies emerald green accents and fires celebratory confetti particle bursts.
- **Live Pipeline Indicator**:
  - Pulsing emerald dot (`.pulse-dot-emerald`) with continuous `@keyframes pulseEmerald` expansion.

---

### SECTION 08: PEOPLE
- **Source File**: [section-08-people.html](file:///c:/Users/Administrator/Desktop/Projects/testtttttttt/section-08-people.html)
- **Anchor ID**: `#people` / `#people-scroll-wrapper`
- **Purpose**: Highlights the synergy of automation handling repetitive tasks while human teams build relationships and close deals.

#### Layout & Visual Components
- **2-Column Synergy Layout**:
  - **Left Column**: Section tag, bold heading ("AUTOMATION STARTS THE FOLLOW-UP. PEOPLE BUILD THE RELATIONSHIP."), subtitle, and 6 team category badges (*Marketing*, *Sales*, *Support*, *Management*, *Customer*, *AI Assistant*).
  - **Right Column**: 2×2 Puzzle Assembly Container (`#people-puzzle-container`, 3:4 aspect ratio).

#### Effects & Animations
- **2×2 Image Puzzle Background Slicing**:
  - Team image (`section-08-people.png`) sliced into 4 corner tiles (`.tile-tl`, `.tile-tr`, `.tile-bl`, `.tile-br`) using CSS 2×2 grid positioning (`background-size: 200% 200%`).
- **Scroll-Driven GSAP Puzzle Assembly**:
  - Corner tiles start scattered far outside the container with extreme rotations, scale (`0.5`), and zero opacity:
    - `.tile-tl`: `x: -280, y: -240, rotate: -35°`
    - `.tile-tr`: `x: 280, y: -240, rotate: 35°`
    - `.tile-bl`: `x: -280, y: 240, rotate: -40°`
    - `.tile-br`: `x: 280, y: 240, rotate: 40°`
  - As user scrolls into viewport, GSAP `ScrollTrigger` snaps the 4 tiles inward with spring easing (`back.out(1.2)`) and staggered timing (`0.08s`) into a seamless assembled image.
  - Completion applies `.assembled` border glow.
- **Sequential Tag Wave Engine (`#team-drift-badges`)**:
  - Interval timer highlights each team badge sequentially every 900ms in an automated wave loop.
  - Interactive mouse hover pauses the automated wave, allowing manual badge hover elevation (`translateY(-4px) scale(1.05)`).
- **Interactive Replay Button**: Allows instant manual re-triggering of the puzzle assembly animation.

---

### SECTION 09: PIPELINE
- **Source File**: [section-09-pipeline.html](file:///c:/Users/Administrator/Desktop/Projects/testtttttttt/section-09-pipeline.html)
- **Anchor ID**: `#pipeline`
- **Purpose**: Real-time sales pipeline command center providing live velocity metrics, channel source filtering, and deal tracking.

#### Layout & Visual Components
- **Section Header**: Live stream badge with pulsing indicator dot (`.live-pulse-dot`).
- **Pipeline Velocity Metric Cards**: 4 top cards displaying *Pipeline Value* (`₹17,90,000`), *Win Rate* (`25.0%`), *Avg Cycle Time* (`4.1 Days`), and *Active Deals* (`12 Leads`).
- **Interactive Channel Filter Bar**: Filter pills for *All Sources*, *Meta Ads*, *Google Ads*, *SEO Organic*, *WhatsApp*.
- **5-Column Pipeline Kanban Grid**: Columns for *New Leads*, *Contacted*, *Qualified*, *Proposal*, *Won*.

#### Effects & Animations
- **Interactive Source Filter & Dynamic Recalculation Engine**:
  - Selecting a channel filter (e.g. *Meta Ads*) filters deal cards instantly using smooth scale and opacity transitions (`.filtered-out`).
  - Automatically recalculates visible deals, total pipeline value, win rate percentage, and average cycle time in real-time.
  - Metric updates trigger `@keyframes pulse-scale` value flash animations.
  - Updates column count badges (`.col-count`) dynamically.
- **Multi-Phase GSAP Scroll Scrubbing (in Master Application)**:
  - **Phase 1 (0% → 35% Scroll)**: Top metric cards cascade in with CountUp number animations.
  - **Phase 2 (35% → 65% Scroll)**: Lead Focus Inspector Card slides in from the left (`translateX(-70px)` → `0px`).
  - **Phase 3 (65% → 100% Scroll)**: Deals Matrix table reveals deal rows sequentially line-by-line.

---

### SECTION 10: REVENUE VIEW
- **Source File**: [section-10-revenue.html](file:///c:/Users/Administrator/Desktop/Projects/testtttttttt/section-10-revenue.html)
- **Anchor ID**: `#revenue` / `#revenue-learning-combined`
- **Purpose**: Marketing channel revenue attribution matrix tying every rupee of closed revenue back to the originating campaign.

#### Layout & Visual Components
- **Combined Section Left Panel**:
  - Header with tracked revenue badge (`₹7.5L TRACKED`).
  - Top Revenue Stats: *Total Revenue* (`₹7,50,000` with 100% Attributed tag) and *Blended ROAS* (`4.05x`).
  - Channel Revenue Attribution Table: Breakdown for Google Ads, SEO Organic, Meta Ads, and Website Direct with lead counts, ROAS multipliers, and earned revenue.
  - Footer attribution badge (`23 Converted Deals`).

#### Effects & Animations
- **Numerical CountUp Animations**:
  - Numerical values animate upward from `0` to target figures upon entering the viewport (`ScrollTrigger start: 'top 85%'`).
- **Card Hover & Table Micro-Interactions**:
  - Stat cards elevate smoothly on mouse hover (`translateY(-3px)`) with enhanced box-shadow.
  - Table rows highlight with custom background transitions on hover.
- **Status Indicator Micro-Animations**:
  - Live revenue status badge glows with emerald gradient styling.

---

### SECTION 11: LEARNING LOOP
- **Source File**: [section-11-learning.html](file:///c:/Users/Administrator/Desktop/Projects/testtttttttt/section-11-learning.html)
- **Anchor ID**: `#learning` / `#revenue-learning-combined`
- **Purpose**: Closed-loop intelligence engine connecting campaign results, lead data, and sales outcomes to optimize ad budgets automatically.

#### Layout & Visual Components
- **Combined Section Right Panel**:
  - Header with AI Feedback Active indicator badge.
  - **Orbital Feedback Loop Diagram (`.orbital-loop-wrapper`)**: Center Setu AI core surrounded by an orbital ring with 4 satellite nodes (*Campaign*, *Leads*, *Sales*, *Learning*).
  - **Analytics Cards**:
    - *Lost Reasons Card*: Bar charts for Slow Response (`42%`) and Price Mismatch (`28%`).
    - *Won Insights Card*: High-conversion highlights for top source and best offer CTA.
  - **AI Action Callout Box**: Dynamic recommendation callout with lightbulb icon.

#### Effects & Animations
- **360° Continuous Orbital Rotation Engine (`.orbital-nodes-track`)**:
  - The outer satellite track rotates continuously 360 degrees via CSS `@keyframes orbitRotate` (20s linear infinite loop).
  - Satellite node containers counter-rotate to maintain upright typography orientation throughout the full cycle.
- **Central Core Pulse Glow**:
  - Center AI core pulses with soft radial gradient breathing glow.
- **Interactive Analytics Progress Bars**:
  - Progress bars in the Lost Reasons card fill smoothly on scroll entry.

---

### SECTION 12: REAL RESULTS
- **Source File**: [section-12-results.html](file:///c:/Users/Administrator/Desktop/Projects/testtttttttt/section-12-results.html)
- **Anchor ID**: `#results`
- **Purpose**: Verified industry case studies proving performance outcomes across diverse verticals.

#### Layout & Visual Components
- **2-Column Split Layout**:
  - **Left Summary Panel (col-lg-5)**: Section tag, heading, summary metrics (*Total Revenue ₹17.1L*, *Avg Conversion 18.4%*), and verified badge.
  - **Right Arc Stage (col-lg-7)**: Semi-circular 3D Arc Carousel Track (`#arcCardsTrack`) hosting 5 industry case study cards:
    - *01 Agri Tech (FarmX)*: +320% ROI, 140 Leads, ₹8.4L Closed Revenue.
    - *02 FMCG (PureSip)*: +410% ROI, 220 Leads, ₹5.2L Closed Revenue.
    - *03 Home Decor (InterioLiv)*: +380% ROI, 185 Leads, ₹12.6L Closed Revenue.
    - *04 Health (MedPulse)*: +290% ROI, 95 Leads, ₹4.8L Closed Revenue.
    - *05 Retail (Zenith Retail)*: +340% ROI, 310 Leads, ₹3.1L Closed Revenue.

#### Effects & Animations
- **Semi-Circular 3D Arc Carousel Track (`#arcStage`)**:
  - Cards are positioned along a curved semi-circle arch with angle calculations: `angle = offset * 18deg`.
  - **Center Focus Spotlight**: Active card scales up to `1.08` with full opacity, while inactive flanking cards scale down (`0.76` – `0.88`) with reduced opacity.
- **Wheel-Driven & Click Carousel Controller**:
  - Mouse wheel scrolling over the arc stage smoothly advances or reverses case study cards with a 350ms throttle debounce.
  - Clicking any flanking card instantly rotates it directly into the center spotlight position.
- **Numerical CountUp Animations**:
  - Left panel metric numbers count up dynamically on scroll reveal.

---

### SECTION 13: PARTNERSHIP
- **Source File**: [section-13-partnership.html](file:///c:/Users/Administrator/Desktop/Projects/testtttttttt/section-13-partnership.html)
- **Anchor ID**: `#partnership`
- **Purpose**: Growth partnership roadmap and value proposition for long-term customer acquisition scaling.

#### Layout & Visual Components
- **2-Column Partnership Layout**:
  - **Left Column**: Section tag, heading ("WE'RE NOT HERE FOR THE CAMPAIGN. WE'RE HERE FOR THE GROWTH."), subtitle, and 4-step roadmap card sequence:
    - *Step 01*: Discovery & Business Audit
    - *Step 02*: System Architecture & Setup
    - *Step 03*: Campaign Launch & Execution
    - *Step 04*: Closed-Loop Optimization
  - **Right Column**: End-to-End Growth Partnership consultation booking card with value props checklist and full-width CTA button.

#### Effects & Animations
- **Roadmap Card Hover Dynamics (`.roadmap-step-card`)**:
  - Mouse hover translates card rightward (`translateX(6px)`) while step number badge illuminates with indigo glow.
- **Floating Rocket Micro-Animation**:
  - Booking card rocket icon floats gently with infinite subtle vertical bobbing.
- **CTA Button Hover Displacement**:
  - Action button arrow icon translates rightward on hover (`translateX(4px)`).

---

### SECTION 14: MARKETING FUNNEL
- **Source File**: [section-14-mktg-funnel.html](file:///c:/Users/Administrator/Desktop/Projects/testtttttttt/section-14-mktg-funnel.html)
- **Anchor ID**: `#mktg-funnel` / `#sd`
- **Purpose**: Complete 8-stage visual marketing funnel tracking prospects from top-of-funnel traffic down to brand advocates.

#### Layout & Visual Components
- **Pinned 3D Inverted Cone Funnel (900vh Scroll Driver, 100vh Sticky Viewport)**:
  - Top header tag and title with multi-color gradient text.
  - Inverted cone funnel wrapper with 8 tapered trapezoidal slices:
    - *01. Traffic* (Bright Orange)
    - *02. Visitors* (Deep Orange)
    - *03. Leads* (Crimson Red)
    - *04. Qualified* (Dark Red)
    - *05. Opportunities* (Violet Purple)
    - *06. Customers* (Deep Purple)
    - *07. Loyal Customers* (Dark Magenta)
    - *08. Advocates* (Emerald Gold Cone Tip)
  - Alternating left and right floating annotation tags with connecting lines and icons.
  - Bottom glowing base ellipse and 3-column summary stats bar (*8 Funnel Stages*, *18.4% Avg Conversion*, *₹17.1L Revenue*).
  - Vertical right-side stage dot indicator tracker.

#### Effects & Animations
- **Geometric 3D Trapezoid Slice Architecture**:
  - Each slice is crafted using precision CSS `clip-path: polygon()` matching exact cone taper angles (top opening `0%–100%` down to bottom tip `27.5%–72.5%`).
  - 3D Extruded Depth Ledge (`.f-edge`) beneath each slice with cone edge shading and top-light surface shine.
- **Scroll-Driven Sequential Pop-In Engine**:
  - 900vh scroll driver calculates local progress per layer (`sp = prog * 8.6`).
  - Slices drop into position sequentially with smooth opacity (`0` → `1`) and vertical glide (`translateY(-30px)` → `0px`).
  - Alternating annotation badges pop into view alongside their respective slice.
- **Cone Tip Glow & Stats Reveal**:
  - Reaching the funnel tip illuminates the glowing base ellipse (`#fBaseGlow`) and smoothly reveals the bottom statistics bar.

---

### SECTION 15: SALES FUNNEL
- **Source File**: [section-15-sales-funnel.html](file:///c:/Users/Administrator/Desktop/Projects/testtttttttt/section-15-sales-funnel.html)
- **Anchor ID**: `#sales-funnel` / `#sd`
- **Purpose**: Complete 8-stage sales pipeline funnel tracking opportunities from initial prospect discovery to long-term retention.

#### Layout & Visual Components
- **Pinned 3D Cyan-to-Emerald Sales Funnel (900vh Scroll Driver, 100vh Sticky Viewport)**:
  - Top header with cyan-blue gradient title.
  - 8 tapered sales pipeline slices:
    - *01. Prospect* (Bright Cyan)
    - *02. Discovery* (Dark Teal)
    - *03. Meeting* (Royal Blue)
    - *04. Proposal* (Deep Blue)
    - *05. Negotiation* (Navy Blue)
    - *06. Closed Won ★* (Special Glowing Emerald Green)
    - *07. Upsell* (Emerald Teal)
    - *08. Retention* (Deep Emerald Cone Tip)
  - Alternating callout annotation badges with connector lines.
  - Bottom glowing base ellipse and 3-column stats bar (*8 Sales Stages*, *4 min Avg Response*, *5+ Closed Deals*).

#### Effects & Animations
- **Geometric 3D Sales Funnel Slicing**:
  - Built with geometric `clip-path: polygon()` styling and 3D extruded depth ledges (`.f-edge`).
  - Color palette progresses smoothly from bright cyan through deep royal blue to glowing emerald green.
- **Closed Won Celebration Badge (`.won-badge`)**:
  - When scroll progress reaches Stage 06 (`sp >= 5`), the Closed Won slice activates `.won-active`, popping out a floating glowing green badge (`REVENUE ✓`) with dual left/right annotations (*Deal Signed*, *Revenue Booked*).
- **Scroll-Driven Sequential Layer Reveal**:
  - Slices drop in one-by-one driven by 900vh scroll progress with smooth 0.13s linear smoothing.
  - Stats bar and emerald base glow fade in upon completion of all 8 stages.
- **8-Stage Vertical Dot Tracker**:
  - Visual dot column on right margin indicates current active funnel depth.

---

## 🔧 Master Animation & Effects Matrix Table

| Section # | Section Name | Primary Visual Effect | Animation Engine / Library | Scroll Trigger / Driver | User Interactivity |
|---|---|---|---|---|---|
| **01** | **Hero Intro & Live Engine** | Typewriter + Matter.js Pills + Live SaaS Simulator | Matter.js 2D Physics + GSAP ScrollTrigger + Lenis | Pinned (`end: +=700%`, scrub 0.6) | Mouse repulsion forcefield, cursor simulation, 3D card tilt |
| **02** | **The Problem** | 3D Stacked Depth Deck + Question Burst | GSAP ScrollTrigger + CSS 3D Transforms | Pinned (`end: +=900%`, scrub 1.2) | 2-step overshoot burst, dynamic score bar, split glow |
| **03** | **The Journey** | 7 Orchestrated Moments Progression | GSAP ScrollTrigger + 3D Perspective Rotation | Pinned (`end: +=700%`) | Interactive 3D mouse tilt, clickable step dots navigation |
| **04** | **The System** | 360° Circular Orbit + WebGL MagicRings | Three.js GLSL Shaders + 2D Canvas Silk + GSAP | Pinned (`end: +=450%`, scrub 1.2) | Click-to-rotate orbital nodes, expanding spotlight card |
| **05** | **Creative Marketing** | Analog & 3D Mechanical Flip Clock + Sticky Slides | Vanilla JS Engine + CSS 3D Transforms | Sticky (300vh scroll driver) | Scroll-synced clock hands, progressive tag unlock, tab switching |
| **06** | **Automation** | In-Place Terminal Log + Visual Node Flowchart | Vanilla JS Timeout Engine + GSAP + Confetti | Pinned option (`+=220%`) + On-Demand | Run flow button, glossy sheen sweep, confetti celebration |
| **07** | **Finchbyte Technology** | Setu CRM Kanban + Antigravity Particles | 2D Canvas Physics + HTML5 Drag & Drop API | Viewport Trigger + Real-Time Engine | Native drag & drop across 6 columns, mouse particle repulsion |
| **08** | **People** | 2×2 Image Scroll Puzzle + Sequential Tag Wave | GSAP ScrollTrigger + CSS Grid Background Slicing | Viewport Trigger (`start: top 80%`) | Corner tile assembly physics, tag hover elevation, replay button |
| **09** | **Pipeline** | Dynamic Metric Recalculator + Filterable Kanban | Vanilla JS Metric Engine + GSAP CountUp | Viewport Trigger + Multi-Phase Scrub | Source filtering, dynamic metric pulse, deal count sync |
| **10** | **Revenue View** | Channel Revenue Attribution Matrix | GSAP CountUp + CSS Micro-Transitions | Viewport Trigger (`start: top 85%`) | Dynamic numerical counters, minimal card hover elevation |
| **11** | **Learning Loop** | 360° Closed-Loop Orbital Feedback Engine | CSS 3D Transform Keyframes (`@keyframes orbitRotate`) | Continuous 20s Infinite Loop | Counter-rotating satellite nodes, pulsing core glow, analytics bars |
| **12** | **Real Results** | Semi-Circular 3D Arc Carousel | Vanilla JS Trigonometry Engine + Wheel Controller | Mousewheel Wheel Event + Click | Wheel-driven arc rotation, click-to-center spotlight, 350ms debounce |
| **13** | **Partnership** | 4-Step Growth Roadmap + Consultation Preview | CSS Micro-Animations + Hover Displacement | Viewport Entrance | Roadmap card rightward slide, floating rocket icon, CTA hover |
| **14** | **Marketing Funnel** | 8-Stage 3D Geometric Inverted Cone Funnel | Vanilla JS Scroll Driver + CSS `clip-path` | Sticky (900vh scroll driver) | Sequential layer pop-in, alternating annotations, base glow |
| **15** | **Sales Funnel** | 8-Stage 3D Cyan-to-Emerald Sales Funnel | Vanilla JS Scroll Driver + CSS `clip-path` | Sticky (900vh scroll driver) | Closed Won celebration badge pop, sequential drop-in, dot tracker |

---

## 🛠️ Local Development & Testing

```bash
# Start local development HTTP server on port 8080
node server.js

# Preview Section URLs in Browser:
http://localhost:8080/section-01-hero.html
http://localhost:8080/section-02-problem.html
http://localhost:8080/section-03-journey.html
http://localhost:8080/section-04-system.html
http://localhost:8080/section-05-creative.html
http://localhost:8080/section-06-automation.html
http://localhost:8080/section-07-technology.html
http://localhost:8080/section-08-people.html
http://localhost:8080/section-09-pipeline.html
http://localhost:8080/section-10-revenue.html
http://localhost:8080/section-11-learning.html
http://localhost:8080/section-12-results.html
http://localhost:8080/section-13-partnership.html
http://localhost:8080/section-14-mktg-funnel.html
http://localhost:8080/section-15-sales-funnel.html
```

---

## 🧰 Technology Stack & Dependencies

- **Core**: HTML5, Vanilla JavaScript (ES6+), Vanilla CSS.
- **Styling & UI**: Bootstrap 5.3.3, Bootstrap Icons 1.11.3, Google Fonts (*Outfit*, *Plus Jakarta Sans*, *Space Grotesk*, *Syne*).
- **Smooth Scrolling**: Lenis Smooth Scroll (`@studio-freight/lenis` / `lenis@1.1.18`).
- **Animation & Physics**:
  - GSAP 3.12.5 & ScrollTrigger Plugin.
  - Matter.js 0.19.0 (2D Rigid Body Physics Engine).
  - Three.js 0.160.0 (WebGL Renderer & Custom GLSL Shaders).
  - Canvas Confetti 1.9.2 (Celebration particle engine).
  - Native HTML5 Drag and Drop API.
