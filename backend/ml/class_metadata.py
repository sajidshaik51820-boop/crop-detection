"""
PlantVillage 38 Classes Taxonomy and Agronomic Metadata
Structured agronomic profiles for crop health detection and recommendation generation.
"""

PLANT_VILLAGE_CLASSES = [
    "Apple___Apple_scab",
    "Apple___Black_rot",
    "Apple___Cedar_apple_rust",
    "Apple___healthy",
    "Blueberry___healthy",
    "Cherry_(including_sour)___Powdery_mildew",
    "Cherry_(including_sour)___healthy",
    "Corn_(maize)___Cercospora_leaf_spot_Gray_leaf_spot",
    "Corn_(maize)___Common_rust_",
    "Corn_(maize)___Northern_Leaf_Blight",
    "Corn_(maize)___healthy",
    "Grape___Black_rot",
    "Grape___Esca_(Black_Measles)",
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
    "Grape___healthy",
    "Orange___Haunglongbing_(Citrus_greening)",
    "Peach___Bacterial_spot",
    "Peach___healthy",
    "Pepper,_bell___Bacterial_spot",
    "Pepper,_bell___healthy",
    "Potato___Early_blight",
    "Potato___Late_blight",
    "Potato___healthy",
    "Raspberry___healthy",
    "Rice___Brown_Spot",
    "Rice___Leaf_Blast",
    "Rice___healthy",
    "Soybean___healthy",
    "Squash___Powdery_mildew",
    "Strawberry___Leaf_scorch",
    "Strawberry___healthy",
    "Tomato___Bacterial_spot",
    "Tomato___Early_blight",
    "Tomato___Late_blight",
    "Tomato___Leaf_Mold",
    "Tomato___Septoria_leaf_spot",
    "Tomato___Spider_mites_Two-spotted_spider_mite",
    "Tomato___Target_Spot",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
    "Tomato___Tomato_mosaic_virus",
    "Tomato___healthy"
]

CROP_DATA = {
    "Tomato": {
        "category": "Solanaceae (Nightshade)",
        "optimal_temp": "21°C - 29°C (70°F - 85°F)",
        "optimal_humidity": "65% - 85%",
        "water_needs": "Moderate and consistent irrigation; 2.5 - 5 cm per week avoiding leaf wetting.",
        "sunlight": "Full direct sunlight (at least 6-8 hours daily).",
        "soil_type": "Deep, well-draining loamy or sandy loam rich in decomposed organic matter.",
        "soil_texture": "Medium loam with good porosity and low compaction.",
        "drainage": "Well-drained; standing water causes rapid root asphyxiation and bacterial wilt.",
        "ph_range": "6.0 - 6.8",
        "organic_matter": "3% - 5% organic matter content via compost or well-rotted manure.",
        "nutrient_management": "Balanced NPK ratio (e.g. 5-10-10 or 8-16-16) with adequate calcium to prevent Blossom End Rot; avoid excessive nitrogen during fruit set.",
        "weed_management": "Use organic straw mulch or black plastic mulch to suppress weeds and minimize fungal spore splashback from soil.",
        "pest_monitoring": "Inspect undersides of leaves weekly for aphids, whiteflies, hornworms, and spider mites.",
        "growth_stages": [
            "Germination & Seedling (Days 1 - 25)",
            "Vegetative Growth & Branching (Days 26 - 45)",
            "Flowering & Fruit Set (Days 46 - 70)",
            "Fruit Development & Ripening (Days 71 - 100)"
        ],
        "harvest_info": "Harvest when fruits achieve firm uniform coloration (pink breaker to full red stage) for optimal shelf life and flavor."
    },
    "Potato": {
        "category": "Solanaceae (Tuberous Nightshade)",
        "optimal_temp": "15°C - 20°C (cool temperate)",
        "optimal_humidity": "70% - 90%",
        "water_needs": "Regular, shallow watering (400-500 mm over growing season); critical during tuber bulking.",
        "sunlight": "Full sunlight (6-8 hours).",
        "soil_type": "Loose, friable sandy loam allowing unhindered tuber expansion.",
        "soil_texture": "Light to medium loam free from stones and clods.",
        "drainage": "Excellent drainage mandatory to avoid tuber rot and blackleg.",
        "ph_range": "5.2 - 6.4 (slightly acidic helps suppress common scab)",
        "organic_matter": "2.5% - 4.5% organic compost.",
        "nutrient_management": "High potassium (K) demand for tuber starch synthesis, moderate nitrogen (N), and phosphorus (P) for rooting.",
        "weed_management": "Early hilling/ridging controls weeds while protecting shallow tubers from greening (solanine toxicity).",
        "pest_monitoring": "Monitor for Colorado potato beetle, potato aphids, and leafhoppers.",
        "growth_stages": [
            "Sprout Development (Days 1 - 20)",
            "Vegetative Canopy (Days 21 - 50)",
            "Tuber Initiation (Days 51 - 70)",
            "Tuber Bulking (Days 71 - 100)",
            "Maturation & Vine Senescence (Days 101 - 120)"
        ],
        "harvest_info": "Harvest 2 weeks after vine senescence; cure in dry shaded environment at 10-15°C for skin setting."
    },
    "Corn (maize)": {
        "category": "Poaceae (Gramineae - Cereal)",
        "optimal_temp": "20°C - 32°C (warm season)",
        "optimal_humidity": "55% - 75%",
        "water_needs": "High water requirement (500-800 mm); silk emergence and pollination are highly drought-sensitive.",
        "sunlight": "Unrestricted full sun exposure (8+ hours daily).",
        "soil_type": "Deep fertile silt loam or clay loam with high moisture-retention capacity.",
        "soil_texture": "Silt loam or medium loam.",
        "drainage": "Well-drained to moderately drained.",
        "ph_range": "5.8 - 7.0",
        "organic_matter": "3% - 6% high humus content.",
        "nutrient_management": "Heavy nitrogen consumer; split applications between planting and V6 knee-high stage; zinc and phosphorus are critical early.",
        "weed_management": "Critical weed-free period during first 4-6 weeks after emergence using mechanical cultivation or cover crops.",
        "pest_monitoring": "Monitor for fall armyworm, corn borer, and corn earworm eggs.",
        "growth_stages": [
            "Vegetative Emergence to V12 (Days 1 - 45)",
            "Tasseling & Silking VT-R1 (Days 46 - 65)",
            "Grain Filling & Dent Stage R2-R5 (Days 66 - 95)",
            "Black Layer Physiological Maturity R6 (Days 96 - 120)"
        ],
        "harvest_info": "Field corn is harvested at 15-20% moisture; sweet corn is picked at the milk stage when kernels are plump and milky."
    },
    "Rice": {
        "category": "Poaceae (Gramineae - Semi-aquatic Cereal)",
        "optimal_temp": "24°C - 35°C",
        "optimal_humidity": "75% - 90%",
        "water_needs": "Puddled standing water (2-5 cm) or Alternate Wetting and Drying (AWD) irrigation.",
        "sunlight": "High solar radiation during panicle development.",
        "soil_type": "Heavy clay or clayey loam with impervious subsoil layer to retain standing water.",
        "soil_texture": "Fine-textured clay or silt clay.",
        "drainage": "Controlled drainage; retains shallow water during growth, drained prior to harvest.",
        "ph_range": "5.5 - 6.5",
        "organic_matter": "2% - 4% incorporated biomass.",
        "nutrient_management": "Nitrogen split in 3 doses (basal, tillering, panicle initiation); silicon additions boost cell wall resistance to blast fungus.",
        "weed_management": "Water level management controls grass weeds; inter-row cono-weeders in system of rice intensification.",
        "pest_monitoring": "Scout for brown planthopper, stem borer, and leaf folder.",
        "growth_stages": [
            "Seedling & Transplanting (Days 1 - 25)",
            "Tillering & Stem Elongation (Days 26 - 60)",
            "Panicle Initiation & Flowering (Days 61 - 90)",
            "Grain Ripening & Milk to Dough (Days 91 - 120)"
        ],
        "harvest_info": "Harvest when 80-85% of panicle grains have turned straw-golden and moisture drops below 20-22%."
    },
    "Apple": {
        "category": "Rosaceae (Pome Fruit Tree)",
        "optimal_temp": "18°C - 25°C summer; requires 600-1000 chilling hours below 7°C in winter",
        "optimal_humidity": "60% - 75%",
        "water_needs": "Deep watering every 7-10 days; approximately 600-1000 mm annually.",
        "sunlight": "Full sunlight (unshaded canopy).",
        "soil_type": "Deep, well-aerated sandy loam to clay loam extending at least 1 meter deep.",
        "soil_texture": "Loam to sandy clay loam.",
        "drainage": "Excellent internal drainage; roots rot in waterlogged conditions.",
        "ph_range": "6.0 - 7.0",
        "organic_matter": "3% - 5% organic topsoil.",
        "nutrient_management": "Balanced NPK plus foliar calcium, boron, and zinc sprays during fruit development.",
        "weed_management": "Herbicide strip or bark mulch maintenance in tree line; mowed grass strips in alleys.",
        "pest_monitoring": "Pheromone traps for codling moth, apple maggot, and visual checks for spider mites.",
        "growth_stages": [
            "Bud Break & Green Tip (Early Spring)",
            "Tight Cluster & Pink Bloom (Mid Spring)",
            "Petal Fall & Fruitlet Development (Late Spring)",
            "Canopy Maintenance & Fruit Sizing (Summer)",
            "Fruit Maturity & Dormancy (Autumn - Winter)"
        ],
        "harvest_info": "Harvest based on starch-iodine index, background skin color shift, and firmness testing."
    },
    "Grape": {
        "category": "Vitaceae (Woody Vine)",
        "optimal_temp": "22°C - 32°C during growing season",
        "optimal_humidity": "50% - 70%",
        "water_needs": "Drip irrigation (250-500 mm); deficit irrigation used to concentrate fruit sugars.",
        "sunlight": "Maximum sunlight on leaf canopy.",
        "soil_type": "Gravelly, rocky, or chalky loam with good aeration.",
        "soil_texture": "Sandy to gravelly loam.",
        "drainage": "Rapid deep drainage; vines dislike wet feet.",
        "ph_range": "6.0 - 7.5",
        "organic_matter": "1.5% - 3.0%",
        "nutrient_management": "Moderate potassium, low-moderate nitrogen to avoid excessive vegetative vigor.",
        "weed_management": "Under-vine tilling or mulch mats; cover crop between vine rows.",
        "pest_monitoring": "Check for phylloxera, leafhoppers, berry moths, and thrips.",
        "growth_stages": [
            "Budburst (Spring)",
            "Shoot & Inflorescence Development",
            "Flowering & Fruit Set",
            "Veraison (Color Change & Softening)",
            "Harvest & Cane Lignification"
        ],
        "harvest_info": "Harvest based on Brix (°Bx sugar level), titratable acidity, and phenolic ripeness."
    },
    "Pepper, bell": {
        "category": "Solanaceae (Nightshade)",
        "optimal_temp": "21°C - 28°C",
        "optimal_humidity": "60% - 75%",
        "water_needs": "Consistent moisture (25-35 mm/week); drip irrigation preferred.",
        "sunlight": "Full sun (6-8 hours daily).",
        "soil_type": "Rich, light sandy loam with ample compost.",
        "soil_texture": "Sandy loam.",
        "drainage": "Well-drained.",
        "ph_range": "6.2 - 7.0",
        "organic_matter": "3% - 5%",
        "nutrient_management": "High phosphorus at transplanting, balanced N-P-K during growth; magnesium and calcium support thick cell walls.",
        "weed_management": "Plastic mulch or straw mulch.",
        "pest_monitoring": "Inspect for aphids, pepper weevil, and spider mites.",
        "growth_stages": [
            "Transplanting & Establishment (Days 1 - 20)",
            "Vegetative & Branching (Days 21 - 40)",
            "Flowering & Anthesis (Days 41 - 60)",
            "Fruit Ripening (Days 61 - 90)"
        ],
    },
    "Wheat": {
        "category": "Poaceae (Gramineae - Cereal Grain)",
        "optimal_temp": "15°C - 24°C (cool season)",
        "optimal_humidity": "50% - 70%",
        "water_needs": "350 - 500 mm total moisture; crown root initiation and grain filling are most critical.",
        "sunlight": "Full direct sunlight (7+ hours).",
        "soil_type": "Deep, fertile silt loam or clay loam with good water retention.",
        "soil_texture": "Silt loam to medium loam.",
        "drainage": "Well-drained; waterlogging causes rapid yellowing and root dieback.",
        "ph_range": "6.0 - 7.5",
        "organic_matter": "2% - 4%",
        "nutrient_management": "Nitrogen split between basal and tillering; phosphorus essential for vigorous crown roots.",
        "weed_management": "Establish high plant density and early harrowing to suppress winter broadleaf weeds.",
        "pest_monitoring": "Scout for aphids (barley yellow dwarf vectors), armyworms, and rust pustules.",
        "growth_stages": ["Germination & Emergence", "Tillering & Jointing", "Booting & Heading", "Anthesis & Grain Fill", "Maturity"],
        "harvest_info": "Harvest when grain moisture drops below 13-14% to prevent storage heating and mold."
    },
    "Soybean": {
        "category": "Fabaceae (Legume / Oilseed)",
        "optimal_temp": "20°C - 30°C",
        "optimal_humidity": "60% - 80%",
        "water_needs": "450 - 700 mm; pod elongation and seed development require consistent moisture.",
        "sunlight": "Full sun.",
        "soil_type": "Deep, fertile loam or silt loam.",
        "soil_texture": "Loam to clay loam.",
        "drainage": "Good internal drainage.",
        "ph_range": "6.0 - 6.8",
        "organic_matter": "2.5% - 4.5%",
        "nutrient_management": "Inoculate with Bradyrhizobium japonicum for biological N-fixation; ensure adequate potassium and sulfur.",
        "weed_management": "Narrow row spacing (15-30 inches) to expedite canopy closure and shade out weeds.",
        "pest_monitoring": "Monitor for soybean aphid, stink bugs, and defoliating caterpillars.",
        "growth_stages": ["Emergence (VE)", "First Trifoliate (V1)", "Flowering (R1-R2)", "Pod Development (R3-R4)", "Seed Fill (R5-R6)", "Maturity (R8)"],
        "harvest_info": "Combine when pods are brown and seed moisture is approximately 13%."
    },
    "Strawberry": {
        "category": "Rosaceae (Berry / Perennial Herb)",
        "optimal_temp": "15°C - 26°C",
        "optimal_humidity": "60% - 75%",
        "water_needs": "25 - 40 mm per week; drip irrigation mandatory under plastic mulch.",
        "sunlight": "Full sun (8 hours).",
        "soil_type": "Rich, well-aerated sandy loam with abundant compost.",
        "soil_texture": "Sandy loam.",
        "drainage": "Excellent drainage mandatory; crowns rot easily in soggy soil.",
        "ph_range": "5.5 - 6.5",
        "organic_matter": "4% - 6%",
        "nutrient_management": "Balanced slow-release NPK with foliar calcium and potassium for fruit firmness.",
        "weed_management": "Black plastic or clean straw mulch around plants.",
        "pest_monitoring": "Check weekly for two-spotted spider mites, thrips, and lygus bugs.",
        "growth_stages": ["Vegetative Establishment", "Crown & Flower Bud Initiation", "Flowering & Fruit Set", "Berry Ripening"],
        "harvest_info": "Hand pick fully red berries with caps intact during cool morning hours."
    },
    "Peach": {
        "category": "Rosaceae (Stone Fruit Tree)",
        "optimal_temp": "20°C - 30°C summer; requires 400-1000 chill hours below 7°C",
        "optimal_humidity": "50% - 65%",
        "water_needs": "Deep regular watering (700-1000 mm annually).",
        "sunlight": "Full sun.",
        "soil_type": "Deep, well-drained sandy loam or gravelly loam.",
        "soil_texture": "Sandy loam.",
        "drainage": "Superior drainage required; peach roots are extremely vulnerable to waterlogging.",
        "ph_range": "6.0 - 6.8",
        "organic_matter": "2% - 4%",
        "nutrient_management": "Annual nitrogen after bud break, zinc foliar sprays, and potassium for fruit sizing.",
        "weed_management": "Herbicide strips or woodchip mulch along tree rows.",
        "pest_monitoring": "Scout for peach tree borer, oriental fruit moth, and plum curculio.",
        "growth_stages": ["Dormancy & Bloom", "Fruit Set & Shuck Split", "Pit Hardening", "Final Swell & Harvest"],
        "harvest_info": "Pick when ground color changes from green to yellow/orange and fruit yields slightly to thumb pressure."
    },
    "Cherry": {
        "category": "Rosaceae (Stone Fruit Tree)",
        "optimal_temp": "18°C - 25°C",
        "optimal_humidity": "50% - 70%",
        "water_needs": "Moderate irrigation; avoid irrigation or rain close to harvest to prevent fruit cracking.",
        "sunlight": "Full direct sunlight.",
        "soil_type": "Deep, well-aerated fertile loam.",
        "soil_texture": "Medium loam.",
        "drainage": "Well-drained.",
        "ph_range": "6.2 - 7.0",
        "organic_matter": "3% - 5%",
        "nutrient_management": "Balanced fertilization with moderate nitrogen and calcium.",
        "weed_management": "Clean orchard floor strips.",
        "pest_monitoring": "Inspect for spotted wing drosophila, cherry fruit fly, and black cherry aphid.",
        "growth_stages": ["Bud Swell & White Bloom", "Petal Fall & Fruitlet Set", "Color Break", "Harvest"],
        "harvest_info": "Harvest by stem when fruits develop deep cultivar-specific color and high soluble solids."
    }
}

# Generic fallback profile for crops not individually listed
CROP_DATA["Default"] = {
    "category": "Agricultural Crop",
    "optimal_temp": "20°C - 28°C",
    "optimal_humidity": "60% - 80%",
    "water_needs": "Regular irrigation adjusted for localized soil moisture and evapotranspiration.",
    "sunlight": "Full to partial direct sunlight.",
    "soil_type": "Fertile, aerated loamy soil with active biological activity.",
    "soil_texture": "Loam to sandy loam.",
    "drainage": "Adequately drained without waterlogging.",
    "ph_range": "6.0 - 7.0",
    "organic_matter": "3% - 4% organic compost.",
    "nutrient_management": "Balanced macronutrients (NPK) supplemented with localized micronutrients based on soil testing.",
    "weed_management": "Integrated weed management combining mulching, manual weeding, and proper crop spacing.",
    "pest_monitoring": "Regular field scouting for defoliation, sucking pests, and early fungal symptoms.",
    "growth_stages": ["Seedling", "Vegetative Growth", "Flowering / Heading", "Maturity"],
    "harvest_info": "Harvest at peak physiological maturity when moisture and color meet crop standards."
}

DISEASE_METADATA = {
    "Tomato___Early_blight": {
        "disease_name": "Early Blight",
        "pathogen": "Alternaria solani (Fungal pathogen)",
        "explanation": "Early blight is a prevalent fungal disease affecting tomato plants, primarily targeting older foliage near the base before progressing upward through the canopy.",
        "common_causes": "Spores overwinter in infected plant debris, solanaceous weeds, or seed; splash dispersal via rain and irrigation.",
        "conditions": "Warm temperatures (24°C - 30°C) coupled with high humidity, heavy dew, or prolonged leaf wetness.",
        "spread_info": "Conidia are airborne and splashed by rain droplets onto foliage, germinating rapidly within 2-3 hours of leaf wetness.",
        "effect_on_crop": "Causes premature defoliation, reduced photosynthesis, sunscald on unprotected fruit, and lower overall yields.",
        "symptoms": [
            "Dark brown to black necrotic spots with concentric ring patterns ('target board' appearance)",
            "Chlorotic yellow halos surrounding older leaf lesions",
            "Lower leaf yellowing progressing upwards into defoliation",
            "Sunken dark cankers on stems and fruit calyx"
        ],
        "precautions": [
            "Prune lower leaves that contact the soil to break the splash cycle.",
            "Utilize drip irrigation instead of overhead sprinklers to keep leaf canopies dry.",
            "Apply organic mulch (straw or pine needles) to create a physical barrier over soil spores.",
            "Rotate crops with non-solanaceous species (corn, beans, brassicas) on a 3-4 year cycle.",
            "Sanitize garden tools and stakes with 10% bleach solution between plant rows.",
            "Consult a qualified agricultural extension officer or certified agronomist before applying protective fungicides."
        ]
    },
    "Tomato___Late_blight": {
        "disease_name": "Late Blight",
        "pathogen": "Phytophthora infestans (Oomycete)",
        "explanation": "Late blight is a catastrophic water-mold disease that can destroy entire tomato and potato canopies within days under cool, humid conditions.",
        "common_causes": "Infected seed tubers, cull piles, volunteers, and wind-transported sporangia from neighboring fields.",
        "conditions": "Cool to moderate temperatures (15°C - 22°C) with persistent moisture, fog, or prolonged rainfall (>90% humidity).",
        "spread_info": "Sporangia are carried several miles on wind currents and release motile zoospores in free water films on leaves.",
        "effect_on_crop": "Rapid collapse of foliage, large greasy lesions, rotting fruit with firm brown leathery decay.",
        "symptoms": [
            "Water-soaked, pale to dark green lesions that rapidly turn purplish-brown",
            "Delicate white cottony mycelium on leaf undersides during humid mornings",
            "Sudden wilting and collapse of whole petioles and stems",
            "Greasy dark brown rot on green and ripe tomato fruits"
        ],
        "precautions": [
            "Immediately remove and bag severely infected plants; do not compost blighted material.",
            "Ensure wide plant spacing (60-90 cm) for optimal airflow and swift canopy drying.",
            "Avoid planting near potato fields or unmanaged nightshade volunteers.",
            "Employ copper-based protectants according to regional extension recommendations before disease outbreaks.",
            "Consult a certified crop advisor or local agricultural department for verified fungicide spray programs."
        ]
    },
    "Tomato___Bacterial_spot": {
        "disease_name": "Bacterial Spot",
        "pathogen": "Xanthomonas perforans / Xanthomonas vesicatoria",
        "explanation": "A destructive bacterial foliar and fruit disease that impairs photosynthesis and induces unmarketable scabby fruit lesions.",
        "common_causes": "Contaminated seeds, infested transplant plugs, and survival in dried plant residue.",
        "conditions": "Warm (24°C - 30°C), wet weather with driving winds, overhead irrigation, and storms.",
        "spread_info": "Bacterial cells enter through natural openings (stomata, hydathodes) and micro-wounds created by windblown sand.",
        "effect_on_crop": "Extensive defoliation, sunburned fruit, and raised crater-like lesions rendering fruit unmarketable.",
        "symptoms": [
            "Small (1-3 mm) angular, dark brown to black water-soaked leaf spots",
            "Shot-hole appearance as dead tissue tears out from leaf centers",
            "Slight yellowing around leaf margins",
            "Rough, scabby raised brown spots on green fruit"
        ],
        "precautions": [
            "Use only certified disease-free and hot-water treated seeds and certified nursery transplants.",
            "Eliminate overhead watering; irrigate strictly at the soil base.",
            "Avoid handling plants or cultivating when foliage is wet.",
            "Disinfect pruning shears regularly with alcohol or quaternary ammonium.",
            "Consult a certified plant pathologist for bactericide rotation and copper resistance management."
        ]
    },
    "Tomato___healthy": {
        "disease_name": "Healthy Tomato",
        "pathogen": "None (Plant is healthy)",
        "explanation": "The foliage displays robust vigor, uniform green coloration, and absence of visual pathogen lesions or stress markers.",
        "common_causes": "Proper agronomic practices, balanced nutrient uptake, and adequate pest protection.",
        "conditions": "Favorable environmental conditions with balanced irrigation and optimal light.",
        "spread_info": "No disease detected.",
        "effect_on_crop": "Optimal vegetative and reproductive performance.",
        "symptoms": [
            "Uniform vibrant green leaves with well-defined venation",
            "Strong turgid stem growth and healthy apical shoot development",
            "Clean leaf surfaces without chlorosis, spots, or webbing"
        ],
        "precautions": [
            "Maintain consistent drip irrigation schedule to prevent blossom-end rot.",
            "Apply balanced top-dressing fertilizer according to soil test recommendations.",
            "Inspect weekly for early aphid or mite presence under leaf surfaces.",
            "Keep soil mulched to preserve moisture and suppress weed competition."
        ]
    },
    "Potato___Early_blight": {
        "disease_name": "Early Blight",
        "pathogen": "Alternaria solani",
        "explanation": "Foliar fungal pathogen attacking older potato leaves, reducing photosynthetic leaf area and tuber yields.",
        "common_causes": "Overwintering mycelium in previous crop residues, volunteer potatoes, and contaminated soils.",
        "conditions": "Alternating wet and dry periods, warm temperatures (24°C - 28°C), and stressed or low-nitrogen crops.",
        "spread_info": "Airborne spores land on dry leaves, requiring only dew or rain showers to infect leaf tissue.",
        "effect_on_crop": "Premature vine defoliation and sunken corky lesions on tuber skins.",
        "symptoms": [
            "Concentric ring 'bullseye' brown lesions on lower leaves",
            "Yellow chlorotic halos surrounding lesions",
            "Brittle dry leaf curling and leaf drop",
            "Dark brown, shallow sunken dry rot on potato tubers"
        ],
        "precautions": [
            "Ensure proper nitrogen nutrition to avoid premature canopy aging.",
            "Maintain 3-year crop rotation avoiding tomato, eggplant, and pepper.",
            "Hill tubers well to prevent spore washdown onto developing potatoes.",
            "Consult certified agricultural extension specialists for timely fungicide intervention."
        ]
    },
    "Potato___Late_blight": {
        "disease_name": "Late Blight",
        "pathogen": "Phytophthora infestans",
        "explanation": "The notorious Irish Potato Famine pathogen capable of rotting complete potato canopies and tubers rapidly.",
        "common_causes": "Infected seed tubers planted in spring, infected cull piles, and volunteer potato regrowth.",
        "conditions": "Cool, humid weather (12°C - 20°C) with persistent fog or rain.",
        "spread_info": "Windborne sporangia can travel tens of kilometers during overcast damp conditions.",
        "effect_on_crop": "Total vine collapse, devastating tuber rotting in soil and storage.",
        "symptoms": [
            "Irregular water-soaked dark spots on leaves turning brown-black",
            "White fungal bloom on undersides of leaves during damp mornings",
            "Brown discolored patches on stems",
            "Granular reddish-brown rot spreading inwards from tuber skin"
        ],
        "precautions": [
            "Destroy all volunteer potato plants and cull piles before planting.",
            "Use certified disease-free seed potatoes.",
            "Allow infected vines to die completely or desicate vines 2 weeks prior to harvest.",
            "Contact your regional plant protection agency for late blight forecasting warnings."
        ]
    },
    "Potato___healthy": {
        "disease_name": "Healthy Potato",
        "pathogen": "None (Plant is healthy)",
        "explanation": "Vibrant, robust potato foliage showing normal physiological development and no disease symptoms.",
        "common_causes": "Good cultural management, certified clean seed, and balanced fertilization.",
        "conditions": "Cool nights and temperate sunny days.",
        "spread_info": "No disease present.",
        "effect_on_crop": "Maximized tuber initiation and bulking potential.",
        "symptoms": [
            "Healthy deep green compound leaves",
            "Vigorous branching and strong erect main stem",
            "Absence of necrotic spotting or wilting"
        ],
        "precautions": [
            "Maintain soil moisture at 70-80% field capacity during tuber bulking.",
            "Hill up soil around plants to prevent sunlight exposure on developing tubers.",
            "Monitor periodically for Colorado potato beetle larvae.",
            "Ensure adequate potassium and sulfur fertilization."
        ]
    },
    "Corn_(maize)___Common_rust_": {
        "disease_name": "Common Rust",
        "pathogen": "Puccinia sorghi (Fungus)",
        "explanation": "Common rust is an obligate biotrophic fungal pathogen that produces raised powdery pustules on maize leaves.",
        "common_causes": "Windblown rust urediniospores blown from southern climates into northern corn production regions.",
        "conditions": "Moderate temperatures (16°C - 25°C) combined with high relative humidity (>95%) and night dew.",
        "spread_info": "Airborne spores settle on both upper and lower leaf surfaces, penetrating stomata.",
        "effect_on_crop": "Loss of photosynthetic area, leaf drying, and reduction in grain fill weight.",
        "symptoms": [
            "Oval to elongate cinnamon-brown powdery pustules on both upper and lower leaf surfaces",
            "Pustules rupture epidermis, turning dark brown/black as plant matures",
            "Chlorosis surrounding clustered rust pustules",
            "Premature leaf desiccation under heavy infection"
        ],
        "precautions": [
            "Plant corn hybrids with proven genetic resistance (Rp gene cultivars).",
            "Plant early in the season to minimize exposure during peak spore migration.",
            "Avoid excessive late-season nitrogen applications which promote lush susceptible tissue.",
            "Seek guidance from an agronomist if pustules appear prior to tasseling on high-yield fields."
        ]
    },
    "Corn_(maize)___healthy": {
        "disease_name": "Healthy Corn (Maize)",
        "pathogen": "None (Plant is healthy)",
        "explanation": "The maize plant exhibits robust architectural vigor, broad upright green leaves, and healthy vegetative growth.",
        "common_causes": "Optimal soil fertility, appropriate plant population, and adequate moisture.",
        "conditions": "Warm sunny days and fertile, aerated soil.",
        "spread_info": "No pathogen detected.",
        "effect_on_crop": "Optimal photosynthetic capacity and ear potential.",
        "symptoms": [
            "Broad, rich green leaves with healthy parallel venation",
            "Strong stalk diameter and robust brace root establishment",
            "No rust pustules, blights, or leaf shredding"
        ],
        "precautions": [
            "Side-dress nitrogen at V6 stage before rapid stem elongation.",
            "Ensure continuous moisture through critical tasseling and silking periods.",
            "Maintain scout logs for early armyworm infestation."
        ]
    },
    "Rice___Leaf_Blast": {
        "disease_name": "Leaf Blast",
        "pathogen": "Magnaporthe oryzae (Pyricularia oryzae)",
        "explanation": "One of the most devastating rice diseases globally, capable of causing widespread yield loss across paddy fields.",
        "common_causes": "Infected seeds, residue from previous paddy crops, and airborne fungal conidia.",
        "conditions": "Temperatures around 24°C - 28°C, cloudy days, high humidity (>90%), and prolonged leaf wetness.",
        "spread_info": "Spore release is highest at night under humid conditions, spreading easily with air movement.",
        "effect_on_crop": "Causes rapid seedling drying, tiller death, and neck blast leading to blank panicles.",
        "symptoms": [
            "Spindle-shaped or diamond-shaped lesions with gray/whitish centers and dark brown margins",
            "Lesions expand and coalesce, causing entire leaf blades to wither and desiccate",
            "Collar rot and dark necrotic ring at panicle base (neck blast stage)"
        ],
        "precautions": [
            "Avoid excessive and unbalanced nitrogen fertilizer; apply silica to strengthen epidermal cell walls.",
            "Maintain continuous shallow standing water in paddy; blast favors drought-stressed fields.",
            "Use certified blast-resistant seed varieties.",
            "Burn or bury infected rice straw post-harvest; sanitize water intake gates.",
            "Consult agricultural extension specialists for preventive bio-fungicides or registered triazole treatments."
        ]
    },
    "Rice___Brown_Spot": {
        "disease_name": "Brown Spot",
        "pathogen": "Bipolaris oryzae (Cochliobolus miyabeanus)",
        "explanation": "A fungal disease of rice associated with nutrient-deficient or moisture-stressed soils, historically linked to severe food crises.",
        "common_causes": "Infected seed, impoverished soils deficient in potassium, manganese, or silicon, and drought stress.",
        "conditions": "Temperatures between 25°C - 30°C with high relative humidity and poor soil nutrition.",
        "spread_info": "Fungus persists on seed coat and crop stubble, producing airborne conidia.",
        "effect_on_crop": "Reduces seed germination, grain quality, and photosynthetic leaf capacity.",
        "symptoms": [
            "Round to oval dark brown spots on leaves with gray or light yellow center",
            "Yellow halo surrounding mature spots",
            "Discoloration and black spotting on grain husks ('pecky rice')"
        ],
        "precautions": [
            "Correct soil nutrient deficiencies (apply potassium, phosphorus, and zinc based on soil tests).",
            "Treat seed before sowing with hot water (52°C for 15 mins) or approved seed dressings.",
            "Ensure continuous optimal irrigation to minimize drought stress.",
            "Consult local rice research institutes for tailored soil amendment plans."
        ]
    },
    "Rice___healthy": {
        "disease_name": "Healthy Rice",
        "pathogen": "None (Plant is healthy)",
        "explanation": "Healthy rice canopy with uniform tiller density, clean blades, and strong tillering vigor.",
        "common_causes": "Balanced fertility, proper AWD/standing water management, and clean certified seed.",
        "conditions": "Warm tropical/subtropical climate with abundant solar radiation.",
        "spread_info": "No disease present.",
        "effect_on_crop": "Optimal productive tiller count and high grain panicle weight.",
        "symptoms": [
            "Erect, deep green leaves without necrotic lesions",
            "Vigorous tillering and healthy white adventitious root system",
            "Clean leaf sheaths"
        ],
        "precautions": [
            "Maintain optimal water management regime (AWD or 3-5 cm standing water).",
            "Split nitrogen applications at basal, tillering, and panicle initiation.",
            "Inspect weekly for planthoppers or stem borer dead hearts."
        ]
    }
}

CROP_DISPLAY_MAPPING = {
    "apple": "Apple",
    "blueberry": "Blueberry",
    "cherry": "Cherry",
    "corn": "Corn (Maize)",
    "maize": "Corn (Maize)",
    "grape": "Grape",
    "orange": "Orange",
    "citrus": "Orange",
    "peach": "Peach",
    "pepper": "Bell Pepper",
    "potato": "Potato",
    "raspberry": "Raspberry",
    "rice": "Rice",
    "soybean": "Soybean",
    "squash": "Squash",
    "strawberry": "Strawberry",
    "tomato": "Tomato",
    "wheat": "Wheat",
}

def parse_crop_and_disease(class_name: str):
    """
    Robust parser that extracts the exact crop species, disease, and health status
    from a model classification label (e.g. 'Tomato___Early_blight' or 'Rice___Brown_Spot').
    Never defaults to Rice or Tomato.
    """
    if not class_name or not isinstance(class_name, str):
        return None, None, "Indeterminate"

    # Split by standard triple or double underscore, or slash
    if "___" in class_name:
        parts = class_name.split("___")
    elif "__" in class_name:
        parts = class_name.split("__")
    elif "/" in class_name:
        parts = class_name.split("/")
    else:
        parts = [class_name, ""]

    raw_crop = parts[0].replace("_", " ").strip()
    raw_disease = parts[1].replace("_", " ").strip() if len(parts) > 1 else ""

    # Determine standard crop display name
    crop_lower = raw_crop.lower()
    matched_crop = None
    for key, display_name in CROP_DISPLAY_MAPPING.items():
        if key in crop_lower:
            matched_crop = display_name
            break

    if not matched_crop:
        # Fallback to cleaned title case of whatever the model predicted
        matched_crop = raw_crop.title()

    # Determine disease and health status
    is_healthy = "healthy" in raw_disease.lower() or "healthy" in raw_crop.lower()
    if is_healthy:
        health_status = "Healthy"
        disease_name = "None (Healthy Plant)"
    else:
        health_status = "Disease Detected"
        disease_name = raw_disease.title() if raw_disease else "Pathology Detected"

    return matched_crop, disease_name, health_status

def parse_class_name(class_name: str):
    """Legacy alias for backward compatibility."""
    return parse_crop_and_disease(class_name)

def get_crop_profile(crop_name: str) -> dict:
    """Returns structured agronomic recommendations for a crop."""
    for key, data in CROP_DATA.items():
        if key.lower() in crop_name.lower():
            return {"crop": key, **data}
    return {"crop": crop_name, **CROP_DATA["Default"]}

def get_disease_details(class_name: str, crop_name: str, disease_name: str) -> dict:
    """Returns disease explanation, symptoms, causes, and safe precautions."""
    if class_name in DISEASE_METADATA:
        return DISEASE_METADATA[class_name]
    
    # Generic structured fallback
    if "healthy" in disease_name.lower():
        return {
            "disease_name": "Healthy",
            "pathogen": "None",
            "explanation": f"The {crop_name} plant shows healthy foliage with no conspicuous visual pathology.",
            "common_causes": "Adequate nutrition, good water balance, and sound disease management.",
            "conditions": "Favorable environmental conditions.",
            "spread_info": "No disease present.",
            "effect_on_crop": "Optimal expected growth and harvest yield.",
            "symptoms": ["Normal green pigmentation", "Erect leaves and robust stems", "Absence of spots or blights"],
            "precautions": [
                "Maintain regular scouting and monitoring routine.",
                "Ensure balanced soil moisture and nutrient management.",
                "Disinfect equipment before moving between plots."
            ]
        }
    
    return {
        "disease_name": disease_name,
        "pathogen": "Fungal / Bacterial / Viral pathogen",
        "explanation": f"Observed symptoms indicate possible {disease_name} stress on {crop_name} foliage.",
        "common_causes": "Pathogen survival on crop debris or seed transmission; environmental moisture triggers.",
        "conditions": "High relative humidity, moderate to warm temperatures, and leaf surface moisture.",
        "spread_info": "Pathogens can spread via air currents, splashing irrigation water, or insect vectors.",
        "effect_on_crop": "Reduced active leaf area, photosynthesis inhibition, and potential yield reduction.",
        "symptoms": [
            "Foliar discoloration and visible chlorotic or necrotic spots",
            "Visual stress patterns on leaf blade",
            "Possible curling or premature drying of affected tissues"
        ],
        "precautions": [
            "Isolate or prune visibly affected leaf sections using sterilized pruners.",
            "Avoid overhead irrigation to minimize leaf moisture duration.",
            "Ensure adequate row spacing to improve air circulation.",
            "Practice regular multi-year crop rotation with non-host species.",
            "Consult a qualified local agricultural extension specialist before applying any chemical treatment."
        ]
    }
