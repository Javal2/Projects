/**
 * Vise Organic - Products Database
 * Full technical dataset for all 12 products in catalog
 */

const viseProductsData = {
  "psb-multiplier": {
    id: "psb-multiplier",
    title: "PSB Multiplier (Phosphate Solubilizing Biofertilizer)",
    category: "Biofertilizers",
    subCategory: "Phosphorus Solubilizer",
    itemCode: "VO-PSB-500",
    badge: "NPOP Organic Certified",
    stock: "In Stock",
    price: 450,
    mainImage: "images/product_biofertilizers.png",
    thumbnails: [
      "images/product_biofertilizers.png",
      "images/rd_lab_research.png",
      "images/product_growth_regulator.png",
      "images/product_adjuvants.png"
    ],
    shortDesc: "PSB Multiplier is a research-backed microbial biofertilizer containing high-potency Pseudomonas striata and Bacillus megaterium strains. It solubilizes insoluble soil phosphorus, converting tied-up minerals into plant-available orthophosphate for rapid root growth, early flowering, and yield increases up to 30%.",
    quickSpecs: {
      category: "Biofertilizer",
      form: "Bio-Powder / Inoculant",
      shelfLife: "12 Months",
      usage: "Agriculture / Soil",
      packing: "500gm / 1kg / 5kg",
      crops: "All Crops (Cotton, Paddy, Wheat, Fruits)"
    },
    keyFeatures: [
      { title: "100% Organic", desc: "NPOP Certified", icon: "bi-patch-check-fill text-vo-primary" },
      { title: "Eco Friendly", desc: "Zero Chemical Residue", icon: "bi-tree-fill text-success" },
      { title: "Fast Multiplication", desc: "10^9 CFU/gm Count", icon: "bi-speedometer text-warning" },
      { title: "Easy Application", desc: "Drip & Seed Treatment", icon: "bi-droplet-half text-primary" },
      { title: "No Jaggery Needed", desc: "Direct Culture Mixing", icon: "bi-x-circle-fill text-danger" },
      { title: "High Efficiency", desc: "+30% Crop Yield", icon: "bi-graph-up-arrow text-vo-secondary" }
    ],
    specsTable: [
      { param: "Product Category", value: "Biofertilizer (Phosphate Solubilizing Bacteria)" },
      { param: "Microbial Strains", value: "Pseudomonas striata & Bacillus megaterium" },
      { param: "Bacterial Count (CFU)", value: "Minimum 1 x 10^9 CFU / gm at manufacture" },
      { param: "Packing Sizes", value: "500gm Pouch / 1kg Pack / 5kg Commercial Bucket" },
      { param: "Shelf Life", value: "12 Months from date of manufacture" },
      { param: "Application Methods", value: "Drip Fertigation, Seed Treatment, Soil Drenching" },
      { param: "Storage Condition", value: "Store in a cool, dry place away from direct sunlight" },
      { param: "Suitable Crops", value: "Cotton, Paddy, Wheat, Sugarcane, Vegetables & Fruits" }
    ],
    stepperSteps: [
      { step: "1", title: "Boil Water", desc: "Boil 2-3L clean water" },
      { step: "2", title: "Cool Water", desc: "Cool to room temp" },
      { step: "3", title: "Mix Product", desc: "Add 500g PSB pack" },
      { step: "4", title: "Fermentation", desc: "Keep 24h for culture boost" },
      { step: "5", title: "Ready to Use", desc: "Apply via drip/drenching" }
    ],
    benefits: [
      { title: "Higher Bacterial Multiplication", desc: "Delivers billions of active phosphorus-solubilizing bacterial colonies per gram of soil.", icon: "bi-graph-up text-success" },
      { title: "No Jaggery Required", desc: "Engineered stabilizer nutrients eliminate the hassle of traditional jaggery boiling.", icon: "bi-check-circle text-success" },
      { title: "Time Saving", desc: "Instant dissolution and rapid culture activation saves valuable labor hours on farm.", icon: "bi-clock-history text-success" },
      { title: "Improved Soil Health", desc: "Restores organic carbon and active microbial biomass in chemically depleted soils.", icon: "bi-flower1 text-success" }
    ],
    faq: [
      { q: "Can PSB Multiplier replace chemical DAP completely?", a: "It reduces chemical DAP requirement by 30-40% in season 1, while unlocking years of accumulated phosphorus residue in the soil." },
      { q: "Is it suitable for drip irrigation systems?", a: "Yes, the formulation dissolves completely without clogging drip emitters or venturi filters." }
    ]
  },

  "rhizobium-multiplier": {
    id: "rhizobium-multiplier",
    title: "Rhizobium Multiplier (Pulse & Legume N-Fixer)",
    category: "Biofertilizers",
    subCategory: "Symbiotic Nitrogen Fixer",
    itemCode: "VO-RHZ-500",
    badge: "Pulse Specialist",
    stock: "In Stock",
    price: 420,
    mainImage: "images/product_biofertilizers.png",
    thumbnails: [
      "images/product_biofertilizers.png",
      "images/rd_lab_research.png",
      "images/product_growth_regulator.png"
    ],
    shortDesc: "Rhizobium Multiplier is a specialized bio-inoculant for pulse crops, chickpeas, soybean, groundnut, and lentils. It forms root nodules that capture atmospheric nitrogen and feed it directly to the crop roots.",
    quickSpecs: {
      category: "Biofertilizer",
      form: "Bio-Powder",
      shelfLife: "12 Months",
      usage: "Seed Inoculation",
      packing: "500gm / 1kg",
      crops: "Pulses, Soybean, Groundnut, Gram"
    },
    keyFeatures: [
      { title: "Root Nodulation", desc: "Promotes 3x Root Nodules", icon: "bi-tree-fill text-success" },
      { title: "Nitrogen Fixer", desc: "Captures Free Air N2", icon: "bi-cloud-sun-fill text-primary" },
      { title: "Seed Treatment", desc: "Slurry Coating Ready", icon: "bi-droplet-fill text-info" },
      { title: "Organic Certified", desc: "100% NPOP Compliant", icon: "bi-patch-check-fill text-vo-primary" },
      { title: "Yield Booster", desc: "+25% Pod filling", icon: "bi-graph-up text-warning" },
      { title: "Soil Enricher", desc: "Leaves Residual Soil N", icon: "bi-flower1 text-success" }
    ],
    specsTable: [
      { param: "Product Category", value: "Biofertilizer (Symbiotic Nitrogen Fixing Bacteria)" },
      { param: "Microbial Strains", value: "Rhizobium japonicum & Rhizobium leguminosarum" },
      { param: "Bacterial Count (CFU)", value: "Minimum 1 x 10^9 CFU / gm" },
      { param: "Packing Sizes", value: "500gm Pouch / 1kg Pack" },
      { param: "Shelf Life", value: "12 Months" },
      { param: "Application Methods", value: "Seed Treatment, Soil Drenching" },
      { param: "Suitable Crops", value: "Soybean, Chickpea, Groundnut, Pigeon Pea, Lentil" }
    ],
    stepperSteps: [
      { step: "1", title: "Clean Seeds", desc: "Take 10-15kg pulse seeds" },
      { step: "2", title: "Make Slurry", desc: "Mix 500g Rhizobium in 1L water" },
      { step: "3", title: "Coat Seeds", desc: "Uniformly rub slurry on seeds" },
      { step: "4", title: "Shade Dry", desc: "Dry under shade for 30 mins" },
      { step: "5", title: "Sow Immediately", desc: "Sow seeds in moist soil" }
    ],
    benefits: [
      { title: "Atmospheric N Fixation", desc: "Saves up to 40% synthetic Urea expenditure on legume crops.", icon: "bi-lightning-charge text-success" },
      { title: "Enhanced Root Nodules", desc: "Promotes pink nitrogen-active root nodules for healthy growth.", icon: "bi-tree text-success" },
      { title: "Superior Seed Germination", desc: "Protects germinating seedlings from early nutrient deficiency.", icon: "bi-shield-check text-success" },
      { title: "Higher Grain Weight", desc: "Delivers bolder seeds and higher quintal yield at harvest.", icon: "bi-box-seam text-success" }
    ],
    faq: [
      { q: "Can Rhizobium be used on cotton or wheat?", a: "Rhizobium works specifically on pulse and legume crops. For cotton or wheat, use Azotobacter or PSB Multiplier." }
    ]
  },

  "kmb-multiplier": {
    id: "kmb-multiplier",
    title: "KMB Multiplier (Potash Mobilizing Biofertilizer)",
    category: "Biofertilizers",
    subCategory: "Potassium Mobilizer",
    itemCode: "VO-KMB-500",
    badge: "Potash Booster",
    stock: "In Stock",
    price: 480,
    mainImage: "images/product_biofertilizers.png",
    thumbnails: [
      "images/product_biofertilizers.png",
      "images/product_growth_regulator.png"
    ],
    shortDesc: "KMB Multiplier contains Frateuria aurantia bacteria that mobilize insoluble potassium bound in clay minerals, transferring active Potash (K) to developing fruits and grains.",
    quickSpecs: {
      category: "Biofertilizer",
      form: "Bio-Powder",
      shelfLife: "12 Months",
      usage: "Drip / Soil",
      packing: "500gm / 1kg",
      crops: "Sugarcane, Banana, Cotton, Fruits"
    },
    keyFeatures: [
      { title: "Potash Mobilizer", desc: "Unlocks Bound Soil K", icon: "bi-gem text-primary" },
      { title: "Fruit Sizing", desc: "Maximizes Weight & Size", icon: "bi-arrows-angle-expand text-success" },
      { title: "Drought Resilience", desc: "Improves Water Retention", icon: "bi-droplet text-info" },
      { title: "Disease Defense", desc: "Strengthens Cell Walls", icon: "bi-shield-fill text-vo-primary" },
      { title: "Brix Sugar Boost", desc: "Higher Sugar in Cane", icon: "bi-stars text-warning" },
      { title: "NPOP Compliant", desc: "Certified Organic", icon: "bi-patch-check text-success" }
    ],
    specsTable: [
      { param: "Product Category", value: "Biofertilizer (Potassium Solubilizing / Mobilizing Bacteria)" },
      { param: "Microbial Strain", value: "Frateuria aurantia" },
      { param: "CFU Count", value: "Minimum 1 x 10^9 CFU / gm" },
      { param: "Application", value: "Drip Fertigation & Soil Incorporation" },
      { param: "Suitable Crops", value: "Sugarcane, Banana, Potato, Onion, Citrus, Cotton" }
    ],
    stepperSteps: [
      { step: "1", title: "Mix Powder", desc: "Add 500g KMB into 200L water" },
      { step: "2", title: "Stir Thoroughly", desc: "Dissolve fully in fertigation tank" },
      { step: "3", title: "Apply via Drip", desc: "Run during fruit development stage" },
      { step: "4", title: "Maintain Moisture", desc: "Irrigate soil adequately" },
      { step: "5", title: "Observe Growth", desc: "Notice enhanced fruit firmness & weight" }
    ],
    benefits: [
      { title: "Substantial Potash Savings", desc: "Reduces synthetic MOP (Muriate of Potash) requirement by up to 35%.", icon: "bi-wallet2 text-success" },
      { title: "Higher Fruit Uniformity", desc: "Delivers uniform color, sweetness, and shelf-life for horticultural exports.", icon: "bi-heart text-success" }
    ],
    faq: [
      { q: "When is the best time to apply KMB?", a: "Apply KMB during early fruit formation or tuber initiation for maximum potash uptake." }
    ]
  },

  "azotobacter-liquid": {
    id: "azotobacter-liquid",
    title: "Azotobacter Liquid Based (Atmospheric N-Fixing Liquid Inoculant)",
    category: "Biofertilizers",
    subCategory: "Liquid Inoculant",
    itemCode: "VO-AZO-1L",
    badge: "Top Rated Liquid",
    stock: "In Stock",
    price: 550,
    mainImage: "images/product_growth_regulator.png",
    thumbnails: [
      "images/product_growth_regulator.png",
      "images/product_biofertilizers.png",
      "images/rd_lab_research.png"
    ],
    shortDesc: "Free-living atmospheric nitrogen-fixing liquid formulation containing Azotobacter chroococcum spores. Supplies natural vegetative nitrogen to non-legume crops like sugarcane, wheat, paddy, and maize.",
    quickSpecs: {
      category: "Liquid Biofertilizer",
      form: "Liquid Formulation",
      shelfLife: "12 Months",
      usage: "Drip & Foliar",
      packing: "500ml / 1 Litre",
      crops: "Sugarcane, Paddy, Wheat, Cotton, Maize"
    },
    keyFeatures: [
      { title: "Liquid Stabilized", desc: "Instant Dissolution", icon: "bi-droplet-fill text-primary" },
      { title: "Nitrogen Supplier", desc: "Continuous Vegetative N", icon: "bi-cloud-download text-info" },
      { title: "Phyto-Hormones", desc: "Produces IAA & Gibberellins", icon: "bi-lightning text-warning" },
      { title: "Drip Friendly", desc: "Zero Clogging Emitters", icon: "bi-gear text-secondary" },
      { title: "Soil Reviver", desc: "Stimulates Soil Microbes", icon: "bi-flower1 text-success" },
      { title: "NPOP Approved", desc: "Eco-Friendly Certification", icon: "bi-patch-check text-vo-primary" }
    ],
    specsTable: [
      { param: "Product Category", value: "Liquid Biofertilizer (Free Living N-Fixer)" },
      { param: "Microbial Strain", value: "Azotobacter chroococcum" },
      { param: "CFU Count", value: "Minimum 1 x 10^8 CFU / ml" },
      { param: "Packing Sizes", value: "500ml Bottle / 1 Litre Bottle" },
      { param: "Application", value: "Drip Irrigation, Foliar Spray, Soil Drenching" },
      { param: "Suitable Crops", value: "Sugarcane, Paddy, Wheat, Cotton, Mustard, Vegetables" }
    ],
    stepperSteps: [
      { step: "1", title: "Shake Bottle", desc: "Shake bottle thoroughly" },
      { step: "2", title: "Measure Dose", desc: "Take 1 Litre per acre" },
      { step: "3", title: "Mix in Water", desc: "Dilute in 200L water tank" },
      { step: "4", title: "Run Drip", desc: "Inject through drip line" },
      { step: "5", title: "Soil Action", desc: "Microbes begin fixing air N" }
    ],
    benefits: [
      { title: "Continuous Vegetative Growth", desc: "Keeps leaves green and active throughout the growing season.", icon: "bi-tree text-success" },
      { title: "Replaces 25-30% Urea", desc: "Saves chemical Urea inputs while maintaining rich soil health.", icon: "bi-cash-stack text-success" }
    ],
    faq: [
      { q: "Can Azotobacter be sprayed on leaves?", a: "Yes, Azotobacter can be applied both through drip fertigation and foliar spray during early vegetative stages." }
    ]
  },

  "mylab-kit": {
    id: "mylab-kit",
    title: "MyLab Bacteria Multiplication Kit (On-Farm Culture Kit)",
    category: "Biotech Kit",
    subCategory: "On-Farm Fermentation",
    itemCode: "VO-MYLAB-01",
    badge: "Biotech Innovation",
    stock: "In Stock",
    price: 1200,
    mainImage: "images/rd_lab_research.png",
    thumbnails: [
      "images/rd_lab_research.png",
      "images/product_biofertilizers.png"
    ],
    shortDesc: "MyLab is a revolutionary biotech fermentation kit allowing farmers to multiply high-count beneficial bacterial cultures right on their farm with zero contamination risk.",
    quickSpecs: {
      category: "Biotech Multiplication Kit",
      form: "Culture + Nutrient Pack",
      shelfLife: "12 Months",
      usage: "On-Farm Barrel Culture",
      packing: "1 Kit (For 200L Fermentation)",
      crops: "All Crops & Horticultural Farms"
    },
    keyFeatures: [
      { title: "On-Farm Culture", desc: "Multiply 200L Bio-Liquid", icon: "bi-beaker text-primary" },
      { title: "Zero Contamination", desc: "Proprietary Strain Lock", icon: "bi-shield-lock text-vo-primary" },
      { title: "Extreme Savings", desc: "Produces 200L for ₹1200", icon: "bi-cash text-success" },
      { title: "High CFU Count", desc: "10^9 Colony Count", icon: "bi-speedometer text-warning" },
      { title: "Easy Preparation", desc: "Simple 24-48h Process", icon: "bi-check-all text-info" },
      { title: "DSIR Approved", desc: "Patent-Backed Tech", icon: "bi-award text-danger" }
    ],
    specsTable: [
      { param: "Product Category", value: "Biotech On-Farm Multiplication Kit" },
      { param: "Kit Contents", value: "Inoculum Culture + Starter Nutrients + Stabilizer" },
      { param: "Yield per Kit", value: "Produces 200 Litres active bio-liquid" },
      { param: "Fermentation Time", value: "24 to 48 Hours" },
      { param: "Application", value: "Flood Irrigation & Drip Systems" }
    ],
    stepperSteps: [
      { step: "1", title: "Fill Barrel", desc: "Fill 200L clean water barrel" },
      { step: "2", title: "Add Kit Powder", desc: "Pour MyLab culture & nutrient packs" },
      { step: "3", title: "Stir & Aerate", desc: "Stir twice daily for 24-48 hours" },
      { step: "4", title: "Culture Ready", desc: "Water turns deep golden-brown" },
      { step: "5", title: "Irrigate Field", desc: "Apply 200L across 2-3 acres" }
    ],
    benefits: [
      { title: "90% Cost Reduction", desc: "Allows large farm owners to produce commercial-grade biofertilizer at a fraction of the market price.", icon: "bi-graph-down text-success" },
      { title: "High Bio-Activity", desc: "Freshly multiplied live culture acts instantly when drenched into moist soil.", icon: "bi-lightning-auto text-success" }
    ],
    faq: [
      { q: "How many acres does one 200L MyLab batch cover?", a: "One 200L batch covers 2 to 3 acres via drip or flood irrigation." }
    ]
  },

  "poshan": {
    id: "poshan",
    title: "Poshan Organic Bio-Nutrition (Amino & Micronutrient Complex)",
    category: "Plant Growth Regulators",
    subCategory: "Organic Biostimulant",
    itemCode: "VO-POSHAN-1L",
    badge: "Growth Booster",
    stock: "In Stock",
    price: 680,
    mainImage: "images/product_adjuvants.png",
    thumbnails: [
      "images/product_adjuvants.png",
      "images/product_growth_regulator.png"
    ],
    shortDesc: "Poshan is an organic amino acid and chelated micronutrient booster designed to stimulate photosynthesis, build climate stress immunity, and accelerate flowering in high-value crops.",
    quickSpecs: {
      category: "Plant Growth Regulator",
      form: "Liquid Biostimulant",
      shelfLife: "12 Months",
      usage: "Foliar Spray & Drip",
      packing: "500ml / 1 Litre",
      crops: "Fruits, Vegetables, Cotton, Sugarcane"
    },
    keyFeatures: [
      { title: "Amino Complex", desc: "18 Essential Amino Acids", icon: "bi-droplet text-primary" },
      { title: "Photosynthesis Boost", desc: "Dark Green Leaf Canopy", icon: "bi-sun text-warning" },
      { title: "Stress Relief", desc: "Drought & Heat Shield", icon: "bi-shield-fill text-success" },
      { title: "Flowering Boost", desc: "Prevents Flower Drop", icon: "bi-flower2 text-danger" },
      { title: "Fruit Weight", desc: "+25% Higher Yield", icon: "bi-graph-up text-vo-primary" },
      { title: "Organic Certified", desc: "Zero Residue Formula", icon: "bi-patch-check text-info" }
    ],
    specsTable: [
      { param: "Product Category", value: "Plant Growth Regulator / Organic Biostimulant" },
      { param: "Active Ingredients", value: "Amino Acid Complex + Fulvic Acid + Zinc & Boron" },
      { param: "Recommended Dosage", value: "2ml to 2.5ml per Litre of water" },
      { param: "Packing Sizes", value: "500ml Bottle / 1 Litre Bottle" },
      { param: "Suitable Crops", value: "Banana, Cotton, Pomegranate, Tomato, Chilli, Wheat" }
    ],
    stepperSteps: [
      { step: "1", title: "Fill Tank", desc: "Fill 15L spray pump with water" },
      { step: "2", title: "Add Poshan", desc: "Add 30-35ml Poshan liquid" },
      { step: "3", title: "Mix Well", desc: "Stir to dissolve completely" },
      { step: "4", title: "Spray Foliage", desc: "Foliar spray during flowering stage" },
      { step: "5", title: "Repeat Dose", desc: "Re-apply 15 days later for fruit sizing" }
    ],
    benefits: [
      { title: "Accelerated Flowering & Fruit Set", desc: "Drastically reduces premature flower drop and boosts uniform fruit setting.", icon: "bi-flower3 text-success" },
      { title: "Rapid Recovery from Stress", desc: "Helps crops recover after drought spell, heat wave, or pest attack.", icon: "bi-shield-check text-success" }
    ],
    faq: [
      { q: "Can Poshan be mixed with bio-pesticides?", a: "Yes, Poshan is compatible with all Vise Organic biopesticides and biofertilizers." }
    ]
  },

  "biopesticide-shield": {
    id: "biopesticide-shield",
    title: "Vise Bio-Pesticide Shield (Botanical Extract Insecticide)",
    category: "Biopesticides",
    subCategory: "Botanical Bio-Control",
    itemCode: "VO-BIOPEST-1L",
    badge: "IPM Certified",
    stock: "In Stock",
    price: 750,
    mainImage: "images/product_biopesticides.png",
    thumbnails: [
      "images/product_biopesticides.png",
      "images/product_growth_regulator.png"
    ],
    shortDesc: "Vise Bio-Pesticide Shield is an eco-friendly botanical extraction controlling bollworms, aphids, thrips, and fungal pests without leaving toxic chemical residues on export crops.",
    quickSpecs: {
      category: "Biopesticide",
      form: "Liquid Botanical Extract",
      shelfLife: "12 Months",
      usage: "Foliar Spray",
      packing: "500ml / 1 Litre",
      crops: "Cotton, Paddy, Vegetables, Fruits"
    },
    keyFeatures: [
      { title: "Zero Residue", desc: "Safe for Export Crops", icon: "bi-shield-check text-success" },
      { title: "Broad Spectrum", desc: "Controls Sucking & Chewing Pests", icon: "bi-bug text-danger" },
      { title: "IPM Compatible", desc: "Integrated Pest Management", icon: "bi-patch-check text-primary" },
      { title: "Friendly to Bees", desc: "Saves Beneficial Predators", icon: "bi-heart text-warning" },
      { title: "No Resistance", desc: "Pests Cannot Build Immunity", icon: "bi-lock text-info" },
      { title: "Eco Certification", desc: "100% NPOP Compliant", icon: "bi-tree text-vo-primary" }
    ],
    specsTable: [
      { param: "Product Category", value: "Biopesticide (Botanical & Bio-Microbial Extract)" },
      { param: "Active Ingredient", value: "Azadirachtin + Botanical Terpenoids + Bio-Actives" },
      { param: "Dosage", value: "2.5ml to 3ml per Litre of water" },
      { param: "Packing Sizes", value: "500ml / 1 Litre Bottle" },
      { param: "Target Pests", value: "Bollworms, Thrips, Aphids, Whiteflies, Mites" }
    ],
    stepperSteps: [
      { step: "1", title: "Inspect Field", desc: "Identify pest infestation early" },
      { step: "2", title: "Prepare Spray", desc: "Mix 40-45ml in 15L pump" },
      { step: "3", title: "Add Spreader", desc: "Add 5ml Organo-Silicone Spreader" },
      { step: "4", title: "Foliar Spray", desc: "Spray under leaves & stems" },
      { step: "5", title: "Pest Control", desc: "Pests stop feeding within 6 hours" }
    ],
    benefits: [
      { title: "Export Crop Compliance", desc: "100% chemical residue-free, ensuring zero export rejection for fruits and vegetables.", icon: "bi-globe text-success" },
      { title: "Protects Beneficial Predators", desc: "Kills harmful crop pests while preserving honeybees and ladybird beetles.", icon: "bi-sun text-success" }
    ],
    faq: [
      { q: "How frequently should Bio-Pesticide Shield be sprayed?", a: "Spray at 10-12 day intervals during peak pest season for complete protection." }
    ]
  },

  "growth-regulator": {
    id: "growth-regulator",
    title: "Vise Growth Regulator Plus (Phyto-Hormone Biostimulant)",
    category: "Plant Growth Regulators",
    subCategory: "Phyto-Hormone Booster",
    itemCode: "VO-PGR-500",
    badge: "Flowering Special",
    stock: "In Stock",
    price: 620,
    mainImage: "images/product_growth_regulator.png",
    thumbnails: [
      "images/product_growth_regulator.png",
      "images/product_adjuvants.png"
    ],
    shortDesc: "Vise Growth Regulator Plus contains bio-synthesized Gibberellins, Auxins, and Cytokinins to prevent bud drop, improve branch tillering, and boost fruit sizing.",
    quickSpecs: {
      category: "Plant Growth Regulator",
      form: "Liquid Formulation",
      shelfLife: "12 Months",
      usage: "Foliar Spray",
      packing: "250ml / 500ml / 1 Litre",
      crops: "Cotton, Grapes, Pomegranate, Paddy"
    },
    keyFeatures: [
      { title: "Flowering Boost", desc: "Prevents Flower Drop", icon: "bi-flower1 text-danger" },
      { title: "Phyto-Hormones", desc: "Gibberellins + Auxins", icon: "bi-lightning text-warning" },
      { title: "Fruit Sizing", desc: "Uniform Fruit Weight", icon: "bi-arrows-angle-expand text-success" },
      { title: "Branch Tillering", desc: "More Fruiting Branches", icon: "bi-diagram-3 text-primary" },
      { title: "Brix Sugar", desc: "Improves Taste & Quality", icon: "bi-stars text-info" },
      { title: "Yield Impact", desc: "+30% Farmers Revenue", icon: "bi-graph-up-arrow text-vo-primary" }
    ],
    specsTable: [
      { param: "Product Category", value: "Plant Growth Regulator (Phyto-Hormone)" },
      { param: "Active Ingredients", value: "Bio-Gibberellins + Cytokinins + Seaweed Extracts" },
      { param: "Dosage", value: "1ml to 1.5ml per Litre of water" },
      { param: "Packing Sizes", value: "250ml / 500ml / 1 Litre Bottle" },
      { param: "Suitable Crops", value: "Cotton, Grapes, Sugarcane, Mango, Paddy, Chilli" }
    ],
    stepperSteps: [
      { step: "1", title: "Check Stage", desc: "Apply at pre-flowering stage" },
      { step: "2", title: "Dilute Dose", desc: "Mix 15-20ml in 15L spray pump" },
      { step: "3", title: "Thorough Spray", desc: "Cover leaves and flower buds" },
      { step: "4", title: "Bud Retention", desc: "Flower drop decreases rapidly" },
      { step: "5", title: "Fruit Growth", desc: "Observe uniform fruit development" }
    ],
    benefits: [
      { title: "Dramatic Flower Retention", desc: "Reduces flower shedding by up to 60% in cotton, chilli, and tomato crops.", icon: "bi-flower2 text-success" }
    ],
    faq: [
      { q: "Can it be used on sugarcane?", a: "Yes, spraying at early tillering stage increases internode length and cane thickness." }
    ]
  },

  "super-spreader": {
    id: "super-spreader",
    title: "Organo-Silicone Super Spreader (Spreading & Rainfastness Adjuvant)",
    category: "Adjuvants",
    subCategory: "Organo-Silicone Surfactant",
    itemCode: "VO-ADJ-500",
    badge: "Efficiency Booster",
    stock: "In Stock",
    price: 390,
    mainImage: "images/product_adjuvants.png",
    thumbnails: [
      "images/product_adjuvants.png",
      "images/product_biopesticides.png"
    ],
    shortDesc: "Organo-Silicone Super Spreader is a non-ionic super-spreading adjuvant that lowers spray water surface tension, enabling 100% leaf coverage, stomatal penetration, and rainfastness within 30 minutes.",
    quickSpecs: {
      category: "Adjuvant",
      form: "Liquid Organo-Silicone",
      shelfLife: "24 Months",
      usage: "Spray Tank Additive",
      packing: "100ml / 250ml / 500ml",
      crops: "All Agricultural & Horticultural Crops"
    },
    keyFeatures: [
      { title: "Super Spreading", desc: "100% Leaf Coverage", icon: "bi-droplet-half text-primary" },
      { title: "Rainfastness", desc: "Rain-Proof in 30 Mins", icon: "bi-cloud-rain text-info" },
      { title: "Stomatal Penetration", desc: "Drives Active Inside Leaves", icon: "bi-arrow-down-circle text-success" },
      { title: "Saves 30% Chemical", desc: "Prevents Spray Runoff", icon: "bi-cash-coin text-warning" },
      { title: "Non-Ionic", desc: "Compatible with All Sprays", icon: "bi-check-circle text-vo-primary" },
      { title: "Fast Action", desc: "Spreads in Seconds", icon: "bi-speedometer2 text-danger" }
    ],
    specsTable: [
      { param: "Product Category", value: "Adjuvant / Organo-Silicone Surfactant" },
      { param: "Active Ingredient", value: "Polyalkyleneoxide modified Heptamethyltrisiloxane" },
      { param: "Dosage", value: "0.3ml to 0.5ml per Litre of spray water (5ml per 15L pump)" },
      { param: "Packing Sizes", value: "100ml / 250ml / 500ml Bottle" }
    ],
    stepperSteps: [
      { step: "1", title: "Prepare Spray", desc: "Mix pesticide/fertilizer in tank" },
      { step: "2", title: "Add Spreader Last", desc: "Add 5ml Super Spreader per 15L pump" },
      { step: "3", title: "Stir Gently", desc: "Mix thoroughly in spray water" },
      { step: "4", title: "Spray Crop", desc: "Spray foliage evenly" },
      { step: "5", title: "Instant Coverage", desc: "Droplets spread into thin uniform film" }
    ],
    benefits: [
      { title: "Stops Spray Runoff", desc: "Ensures every drop of expensive spray sticks and penetrates the leaf surface.", icon: "bi-shield-check text-success" }
    ],
    faq: [
      { q: "How much dosage per 15-Litre pump?", a: "Use only 5ml per 15-Litre spray pump." }
    ]
  },

  "mycorrhizal-vam": {
    id: "mycorrhizal-vam",
    title: "Vise Mycorrhizal VAM Granules (Endo-Mycorrhiza Root Expander)",
    category: "Biofertilizers",
    subCategory: "VAM Root Expander",
    itemCode: "VO-VAM-4KG",
    badge: "Root Expander",
    stock: "In Stock",
    price: 580,
    mainImage: "images/product_biofertilizers.png",
    thumbnails: [
      "images/product_biofertilizers.png",
      "images/product_growth_regulator.png"
    ],
    shortDesc: "Vise Mycorrhizal VAM Granules contain Vesicular Arbuscular Mycorrhizae spores that form a symbiotic fungal network with crop roots, expanding root absorption surface area by up to 100x.",
    quickSpecs: {
      category: "Biofertilizer / Root Inoculant",
      form: "Bentonite Granules",
      shelfLife: "12 Months",
      usage: "Soil Broadcasting",
      packing: "4kg Bag / 8kg Bag",
      crops: "Paddy, Sugarcane, Cotton, Fruits, Wheat"
    },
    keyFeatures: [
      { title: "Root Expansion", desc: "100x Surface Absorption", icon: "bi-tree-fill text-success" },
      { title: "Drought Immunity", desc: "Draws Deep Soil Water", icon: "bi-droplet-fill text-primary" },
      { title: "Phosphate Absorber", desc: "Solubilizes Insoluble P", icon: "bi-gem text-warning" },
      { title: "Soil Structure", desc: "Restores Microbial Carbon", icon: "bi-flower1 text-info" },
      { title: "Granular Base", desc: "Easy Soil Broadcasting", icon: "bi-box text-secondary" },
      { title: "NPOP Organic", desc: "100% Certified Eco-Friendly", icon: "bi-patch-check text-vo-primary" }
    ],
    specsTable: [
      { param: "Product Category", value: "Biofertilizer (Endo-Mycorrhizal Fungi)" },
      { param: "Active Inoculum", value: "Vesicular Arbuscular Mycorrhizae (Glomus intraradices)" },
      { param: "Spore Count", value: "100 IP / gm minimum" },
      { param: "Dosage", value: "4kg per acre" },
      { param: "Packing", value: "4kg Bag / 8kg Commercial Bag" }
    ],
    stepperSteps: [
      { step: "1", title: "Weigh Dose", desc: "Take 4kg VAM Granules per acre" },
      { step: "2", title: "Mix with Soil/FYM", desc: "Blend with 20kg dry soil or compost" },
      { step: "3", title: "Broadcast", desc: "Broadcast evenly at sowing or basal dose" },
      { step: "4", title: "Irrigate", desc: "Irrigate field to activate fungal spores" },
      { step: "5", title: "Root Network", desc: "Fungal hyphae attach to root system" }
    ],
    benefits: [
      { title: "Exceptional Drought Resistance", desc: "Helps crops stay green and survive prolonged dry spells by accessing deep soil moisture.", icon: "bi-droplet text-success" }
    ],
    faq: [
      { q: "Can VAM Granules be mixed with chemical fertilizers?", a: "Broadcast VAM Granules separately or with organic compost for best results." }
    ]
  },

  "trichoderma-fungicide": {
    id: "trichoderma-fungicide",
    title: "Trichoderma Viride Bio-Fungicide (Organic Disease Shield)",
    category: "Biopesticides",
    subCategory: "Bio-Fungicide",
    itemCode: "VO-TRICHO-1KG",
    badge: "Disease Shield",
    stock: "In Stock",
    price: 490,
    mainImage: "images/product_biopesticides.png",
    thumbnails: [
      "images/product_biopesticides.png",
      "images/product_biofertilizers.png"
    ],
    shortDesc: "Trichoderma Viride Bio-Fungicide is a potent antagonistic fungal bio-agent that destroys soil-borne fungal pathogens causing root rot, collar rot, wilt, and damping-off disease.",
    quickSpecs: {
      category: "Biopesticide / Bio-Fungicide",
      form: "Bio-Powder",
      shelfLife: "12 Months",
      usage: "Seed Treatment & Soil Drenching",
      packing: "1kg Pack / 5kg Bag",
      crops: "Pulses, Vegetables, Cotton, Fruits, Spices"
    },
    keyFeatures: [
      { title: "Disease Defense", desc: "Controls Wilt & Root Rot", icon: "bi-shield-fill text-danger" },
      { title: "Fungal Antagonist", desc: "Destroys Harmful Fungi", icon: "bi-bug text-warning" },
      { title: "Seed Protection", desc: "Prevents Seedling Damping-Off", icon: "bi-patch-check text-success" },
      { title: "Organic Certified", desc: "NPOP Eco-Friendly", icon: "bi-tree text-vo-primary" },
      { title: "Soil Rejuvenator", desc: "Cleans Degraded Soil", icon: "bi-flower1 text-info" },
      { title: "High CFU", desc: "2 x 10^6 Spore Count", icon: "bi-speedometer text-primary" }
    ],
    specsTable: [
      { param: "Product Category", value: "Biopesticide (Antagonistic Bio-Fungicide)" },
      { param: "Microbial Strain", value: "Trichoderma viride" },
      { param: "Spore Count", value: "2 x 10^6 CFU / gm minimum" },
      { param: "Dosage", value: "1kg to 2kg per acre" },
      { param: "Target Diseases", value: "Fusarium Wilt, Rhizoctonia Root Rot, Pythium Damping-Off" }
    ],
    stepperSteps: [
      { step: "1", title: "Take 1kg Powder", desc: "Measure 1kg Trichoderma per acre" },
      { step: "2", title: "Mix with FYM", desc: "Mix in 100kg moist compost" },
      { step: "3", title: "Incubate 7 Days", desc: "Keep under shade for fungal proliferation" },
      { step: "4", title: "Apply to Soil", desc: "Apply near plant root zone" },
      { step: "5", title: "Disease Control", desc: "Fungi colonizes roots and blocks pathogens" }
    ],
    benefits: [
      { title: "Complete Soil Disease Protection", desc: "Prevents catastrophic crop losses caused by Fusarium wilt and root rot.", icon: "bi-shield-check text-success" }
    ],
    faq: [
      { q: "Is Trichoderma Viride safe for organic farming?", a: "Yes, it is 100% NPOP organic certified and completely non-toxic." }
    ]
  },

  "soil-carbon-reviver": {
    id: "soil-carbon-reviver",
    title: "Vise Organic Soil Carbon Reviver (Humic & Fulvic Carbon Rejuvenator)",
    category: "Biofertilizers",
    subCategory: "Soil Rejuvenator",
    itemCode: "VO-CARBON-5KG",
    badge: "Carbon Rejuvenator",
    stock: "In Stock",
    price: 890,
    mainImage: "images/product_biofertilizers.png",
    thumbnails: [
      "images/product_biofertilizers.png",
      "images/rd_lab_research.png"
    ],
    shortDesc: "Vise Organic Soil Carbon Reviver is a concentrated bio-humic and fulvic extract formulation designed to rebuild organic carbon, increase cation exchange capacity (CEC), and multiply earthworm populations in hard alkaline soils.",
    quickSpecs: {
      category: "Soil Rejuvenator / Biofertilizer",
      form: "Bio-Granules / Powder",
      shelfLife: "24 Months",
      usage: "Soil Application & Drip",
      packing: "5kg Bucket / 10kg Bag",
      crops: "All Agricultural Soil Types"
    },
    keyFeatures: [
      { title: "Carbon Revival", desc: "Multiplies Organic Carbon", icon: "bi-flower1 text-success" },
      { title: "Earthworm Booster", desc: "Creates Soil Porosity", icon: "bi-bug text-warning" },
      { title: "CEC Enhancer", desc: "Holds Soil Nutrients", icon: "bi-magnet text-primary" },
      { title: "Alkaline Soil Relief", desc: "Lowers Soil pH Stress", icon: "bi-shield text-info" },
      { title: "Water Retention", desc: "+40% Soil Moisture Hold", icon: "bi-droplet-fill text-vo-primary" },
      { title: "NPOP Organic", desc: "100% Eco-Friendly Certified", icon: "bi-patch-check text-success" }
    ],
    specsTable: [
      { param: "Product Category", value: "Soil Carbon Rejuvenator" },
      { param: "Active Components", value: "Active Potassium Humate 85% + Fulvic Acid 15% + Amino Matrix" },
      { param: "Dosage", value: "5kg per acre" },
      { param: "Packing Sizes", value: "5kg Bucket / 10kg Bag" },
      { param: "Soil Impact", value: "Increases Organic Carbon % and beneficial biomass" }
    ],
    stepperSteps: [
      { step: "1", title: "Take 5kg Granules", desc: "Measure 5kg Soil Carbon Reviver" },
      { step: "2", title: "Mix with Soil", desc: "Blend with local soil or compost" },
      { step: "3", title: "Broadcast", desc: "Apply at sowing or basal irrigation" },
      { step: "4", title: "Irrigate Field", desc: "Water thoroughly after broadcast" },
      { step: "5", title: "Soil Softening", desc: "Hard soil turns soft and porous within weeks" }
    ],
    benefits: [
      { title: "Restores Dead Chemical Soils", desc: "Revives soil structure damaged by decades of heavy chemical fertilizer applications.", icon: "bi-arrow-repeat text-success" }
    ],
    faq: [
      { q: "How quickly does it improve soil softness?", a: "Noticeable improvement in soil moisture holding and softness occurs within 20-30 days." }
    ]
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = viseProductsData;
}
