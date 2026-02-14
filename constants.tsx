
import { Monument, Agent } from "./types";

export const ERAS = [
  "Ancient & Classical (IVC to 600 CE)",
  "Early Medieval (600 - 1200 CE)",
  "Sultanate & Indo-Islamic",
  "Imperial Mughal Era",
  "Regional Kingdoms",
  "Colonial Era"
];

export const THEMES = [
  { id: 'imperial-power', name: 'Imperial Power', description: 'The soaring bastions of authority.' },
  { id: 'water-light', name: 'Water & Light', description: 'Stepwells and shrines of reflection.' },
  { id: 'divine-carvings', name: 'Divine Carvings', description: 'The spiritual geometry of stone.' }
];

export const AGENTS: Agent[] = [
  { name: "The Architect", role: "System Design", contribution: "Core infrastructure and aesthetic logic." },
  { name: "The Historian", role: "Research & Narrative", contribution: "Curating the Rasa of historical truth." },
  { name: "The Oracle", role: "AI Synthesis", contribution: "Bridging institutional archives with digital soul." },
  { name: "The Lens", role: "Visual Curation", contribution: "Archival imagery and atmospheric direction." }
];

export const INITIAL_MONUMENTS: Monument[] = [
  {
    id: 'mohenjo-daro',
    name: "Mohenjo-daro",
    slug: "mohenjo-daro",
    dynasty: "Indus Valley Civilization",
    era: "Ancient & Classical (IVC to 600 CE)",
    location: "Sindh (Heritage Site)",
    emotionalHook: "A silence that speaks of the world's first planned order.",
    coreStory: "The largest metropolis of the Mature Harappan phase, flourishing between 2500 and 1900 BCE. It housed an estimated 40,000 people in a grid-planned city divided into a Citadel and a Lower Town. The site reveals a society obsessed with order, evidenced by standardized brick sizes and an elaborate drainage system that rivals modern engineering.",
    eraSignificance: "Defined the era through Civic Engineering over Monumental Aggrandizement. Unlike contemporary Egypt, the Indus people built the Great Bath—a public water tank—suggesting ritual purification and community utility were central to their ideology.",
    experientialAppeal: "The visual experience is one of eerie modernity. Walking through the streets, one sees dustbins, wells, and multi-story houses. The Great Bath stands as a testament to lost hydro-engineering skills.",
    promotionalAngle: "Walk the streets of the world's first planned city. No palaces, just perfect drains.",
    socialMedia: {
      caption: "Urban planning, 4500 years ago. 🧱🚿 #AncientEngineering",
      hashtags: ["#IndusValley", "#MohenjoDaro", "#Civilization"],
      reelIdeas: ["Minimalist visuals of brick geometry", "The Great Bath pan"],
      emojis: "🧱🚿📏"
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Great_Bath%2C_Mohenjo-daro.jpg/1200px-Great_Bath%2C_Mohenjo-daro.jpg",
    archiveGallery: [
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Great_Bath%2C_Mohenjo-daro.jpg/1200px-Great_Bath%2C_Mohenjo-daro.jpg", attribution: "Saqib Qayyum", source: "Wikimedia Commons", license: "CC BY-SA 3.0" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Mohenjo-daro-2010.jpg/1200px-Mohenjo-daro-2010.jpg", attribution: "Comrogues", source: "Wikimedia Commons", license: "CC BY-SA 3.0" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Mohenjo-daro_Pillared_Hall.jpg/1280px-Mohenjo-daro_Pillared_Hall.jpg", attribution: "UNESCO", source: "Wikimedia Commons", license: "CC BY-SA 3.0" }
    ],
    mapsUri: "https://www.google.com/maps/search/Mohenjo-daro",
    mapPosition: { x: 15, y: 35 }
  },
  {
    id: 'sanchi-stupa',
    name: "Sanchi Stupa",
    slug: "sanchi-stupa",
    dynasty: "Mauryan Empire",
    era: "Ancient & Classical (IVC to 600 CE)",
    location: "Sanchi, Madhya Pradesh",
    emotionalHook: "The center of the Buddhist World, where stone whispers the Dhamma.",
    coreStory: "Commissioned by Ashoka in the 3rd century BCE, the Great Stupa was later expanded by the Shungas. It houses the relics of the Buddha and is the oldest extant stone structure in India. The Toranas (gateways) serve as lithic textbooks, carving Jataka tales for a largely illiterate populace.",
    eraSignificance: "Defined Monumental Permanence. Ashoka's shift from wood to stone was a statement of the endurance of his Dhamma.",
    experientialAppeal: "The pradakshina patha (circumambulation path) offers a hypnotic, peaceful experience. The intricacy of the carvings—yakshis, elephants, and processions—demands hours of close observation.",
    promotionalAngle: "Essential for art history lovers. Best visited at sunrise.",
    socialMedia: {
      caption: "A slow-motion walk around the center of the Buddhist world. ☸️🏛️",
      hashtags: ["#Sanchi", "#WorldHeritage", "#BuddhistArt"],
      reelIdeas: ["Slow-motion pradakshina", "Zoom on Torana carvings"],
      emojis: "☸️🐘🌸"
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Sanchi_Stupa_from_Eastern_gate%2C_Madhya_Pradesh.jpg/1200px-Sanchi_Stupa_from_Eastern_gate%2C_Madhya_Pradesh.jpg",
    archiveGallery: [
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Sanchi_Stupa_from_Eastern_gate%2C_Madhya_Pradesh.jpg/1200px-Sanchi_Stupa_from_Eastern_gate%2C_Madhya_Pradesh.jpg", attribution: "Abhishek Roy", source: "Wikimedia Commons", license: "CC BY-SA 3.0" },
      { url: "https://images.unsplash.com/photo-1628067372740-449b251025a5?auto=format&fit=crop&q=80&w=1200", attribution: "Unsplash Archive", source: "Unsplash", license: "Free" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Sanchi_Stupa_No._2.jpg/1280px-Sanchi_Stupa_No._2.jpg", attribution: "Biswarup Ganguly", source: "Wikimedia Commons", license: "CC BY 3.0" }
    ],
    mapsUri: "https://www.google.com/maps/search/Sanchi+Stupa",
    mapPosition: { x: 42, y: 52 }
  },
  {
    id: 'ajanta-caves',
    name: "Ajanta Caves",
    slug: "ajanta-caves",
    dynasty: "Satavahana / Vakataka",
    era: "Ancient & Classical (IVC to 600 CE)",
    location: "Aurangabad, Maharashtra",
    emotionalHook: "Light beams cutting through the darkness of 2,000 years.",
    coreStory: "Caves 9 and 10 are the earliest (Hinayana) caves, dating to the 2nd century BCE. They predate the famous Gupta paintings and represent the austere early phase of Buddhism. Later phases added the masterpieces of mural art that define the Golden Age.",
    eraSignificance: "Marks the Birth of Rock-Cut Monasticism. The horseshoe-shaped windows were designed to throw light onto the stupa.",
    experientialAppeal: "Standing in the center of Cave 10, one feels the acoustics and the play of light that animated the stupa for ancient monks. The paintings are a window into the fashion, life, and soul of antiquity.",
    promotionalAngle: "The First Sanctuaries. A journey into the womb of the earth.",
    socialMedia: {
      caption: "Where rock became canvas. 🎨🏔️ #Ajanta",
      hashtags: ["#AjantaCaves", "#AncientArt", "#MaharashtraTourism"],
      reelIdeas: ["Light beam hitting the Stupa", "Close up of Padmapani painting"],
      emojis: "🎨🕯️🏔️"
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ajanta_Caves_9%2C_10%2C_19%2C_26_and_29_Chaitya-grihas_03.jpg/1200px-Ajanta_Caves_9%2C_10%2C_19%2C_26_and_29_Chaitya-grihas_03.jpg",
    archiveGallery: [
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ajanta_Caves_9%2C_10%2C_19%2C_26_and_29_Chaitya-grihas_03.jpg/1200px-Ajanta_Caves_9%2C_10%2C_19%2C_26_and_29_Chaitya-grihas_03.jpg", attribution: "Vu2sga", source: "Wikimedia Commons", license: "CC BY-SA 3.0" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Ajanta_Padmapani.jpg/800px-Ajanta_Padmapani.jpg", attribution: "Public Domain", source: "Wikimedia Commons", license: "PD" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Ajanta_Cave_26_interior.jpg/1200px-Ajanta_Cave_26_interior.jpg", attribution: "C. Amies", source: "Wikimedia Commons", license: "CC BY-SA 3.0" }
    ],
    mapsUri: "https://www.google.com/maps/search/Ajanta+Caves",
    mapPosition: { x: 32, y: 58 }
  },
  {
    id: 'khajuraho',
    name: "Khajuraho Temples",
    slug: "khajuraho",
    dynasty: "Chandela Dynasty",
    era: "Early Medieval (600 - 1200 CE)",
    location: "Chhatarpur, Madhya Pradesh",
    emotionalHook: "Stone poetry of passion and the celebration of life.",
    coreStory: "Built between 950-1050 CE, these temples are famous for their nagara architecture and erotic sculptures. Only 20 of 85 survive. The visual density is staggering, with stone capturing light at sunrise to make figures seem fluid.",
    eraSignificance: "Represent the Celebration of Life. The sculptures depict the four goals of life: Dharma, Artha, Kama, Moksha.",
    experientialAppeal: "The golden hour glow on Kandariya Mahadeva creates a surreal atmosphere. The intricacy of the carvings demands hours of observation.",
    promotionalAngle: "Not just erotica, but the entirety of human existence carved in stone.",
    socialMedia: {
      caption: "Golden hour glow on Kandariya Mahadeva. ✨🗿 #Khajuraho",
      hashtags: ["#Khajuraho", "#TempleArt", "#IncredibleIndia"],
      reelIdeas: ["Golden hour silhouette", "Detail pan of the sculptures"],
      emojis: "🔥🗿🌅"
    },
    imageUrl: "https://images.unsplash.com/photo-1659610176884-6338421b97b6?q=80&w=1200&auto=format&fit=crop",
    archiveGallery: [
      { url: "https://images.unsplash.com/photo-1659610176884-6338421b97b6?q=80&w=1200&auto=format&fit=crop", attribution: "Unsplash", source: "Unsplash", license: "Free" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Kandariya_Mahadev_Temple_Khajuraho.jpg/1200px-Kandariya_Mahadev_Temple_Khajuraho.jpg", attribution: "ASIM", source: "Wikimedia Commons", license: "CC BY-SA" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Lakshmana_Temple_Khajuraho_India.jpg/1200px-Lakshmana_Temple_Khajuraho_India.jpg", attribution: "Marcin Białek", source: "Wikimedia Commons", license: "CC BY-SA 4.0" }
    ],
    mapsUri: "https://www.google.com/maps/search/Khajuraho",
    mapPosition: { x: 48, y: 42 }
  },
  {
    id: 'brihadisvara-temple',
    name: "Brihadisvara Temple",
    slug: "brihadisvara-temple",
    dynasty: "Chola Dynasty",
    era: "Early Medieval (600 - 1200 CE)",
    location: "Thanjavur, Tamil Nadu",
    emotionalHook: "Imperial Majesty where the shadow of the vimana never touches the earth.",
    coreStory: "Built by Rajaraja Chola I in 1010 CE, this UNESCO World Heritage site is a masterpiece of Dravidian architecture. Its 216-foot vimana is capped by an 80-ton single granite block. It was the first all-granite temple of such scale.",
    eraSignificance: "Symbolized Chola imperial power and maritime supremacy. A beacon of learning, art, and dance.",
    experientialAppeal: "The musical steps at Airavatesvara and the massive shadow of the Thanjavur Vimana are humbling. The cool granite floors underfoot create a sense of eternal stillness.",
    promotionalAngle: "Temples of the Emperors. Best captured at sunset.",
    socialMedia: {
      caption: "Engineering the divine. 80 tons raised to the sky. 🕉️✨ #CholaTemples",
      hashtags: ["#Thanjavur", "#BigTemple", "#DravidianArchitecture"],
      reelIdeas: ["Following the shadow of the Vimana", "Wide shot of the Nandi"],
      emojis: "🛕🐃🔱"
    },
    imageUrl: "https://images.unsplash.com/photo-1621259182978-f09e5e2ca04e?auto=format&fit=crop&q=80&w=1200",
    archiveGallery: [
      { url: "https://images.unsplash.com/photo-1621259182978-f09e5e2ca04e?auto=format&fit=crop&q=80&w=1200", attribution: "UNESCO World Heritage", source: "Wikimedia Commons", license: "CC BY-SA" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Brihadisvara_Temple_Thanjavur_dummy.jpg/1200px-Brihadisvara_Temple_Thanjavur_dummy.jpg", attribution: "WikiUser", source: "Wikimedia Commons", license: "CC BY-SA" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Thanjavur_Temple_Art.jpg/1200px-Thanjavur_Temple_Art.jpg", attribution: "S.R. Ramanujam", source: "Wikimedia Commons", license: "CC BY-SA 3.0" }
    ],
    mapsUri: "https://www.google.com/maps/search/Brihadisvara+Temple",
    mapPosition: { x: 45, y: 88 }
  },
  {
    id: 'hampi',
    name: "Hampi (Vijayanagara)",
    slug: "hampi",
    dynasty: "Vijayanagara Empire",
    era: "Regional Kingdoms",
    location: "Karnataka",
    emotionalHook: "The City of Ruins and Boulders, a surreal landscape of lost grandeur.",
    coreStory: "The glorious capital of the last great Hindu empire, destroyed in 1565. The boulder-strewn landscape is surreal, dotted with temples like Virupaksha and the iconic Stone Chariot. It represents a fusion of Hindu and Islamic styles, seen in the Lotus Mahal.",
    eraSignificance: "Imperial Grandeur. A cosmopolitan city that traded with the world, now frozen in destruction.",
    experientialAppeal: "The Musical Pillars of Vittala Temple and the coracle ride on the Tungabhadra river offer a sensory overload.",
    promotionalAngle: "A post-apocalyptic ancient world. The Rome of the East.",
    socialMedia: {
      caption: "Stones that sing and chariots that stand still. 🪨🎼 #Hampi",
      hashtags: ["#Hampi", "#Vijayanagara", "#Ruins"],
      reelIdeas: ["Coracle ride on Tungabhadra", "Tapping the musical pillars"],
      emojis: "🪨🎼🛶"
    },
    imageUrl: "https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=80&w=1200&auto=format&fit=crop",
    archiveGallery: [
      { url: "https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=80&w=1200&auto=format&fit=crop", attribution: "Unsplash", source: "Unsplash", license: "Free" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Stone_chariot_hampi.jpg/1200px-Stone_chariot_hampi.jpg", attribution: "Hampi Archives", source: "Wikimedia Commons", license: "CC BY-SA" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Virupaksha_Temple_Hampi.jpg/1200px-Virupaksha_Temple_Hampi.jpg", attribution: "Jean-Pierre Dalbéra", source: "Wikimedia Commons", license: "CC BY 2.0" }
    ],
    mapsUri: "https://www.google.com/maps/search/Hampi",
    mapPosition: { x: 36, y: 75 }
  },
  {
    id: 'taj-mahal',
    name: "Taj Mahal",
    slug: "taj-mahal",
    dynasty: "Mughal Empire",
    era: "Imperial Mughal Era",
    location: "Agra, Uttar Pradesh",
    emotionalHook: "The ultimate symbol of love, perfection defined in marble.",
    coreStory: "Built by Shah Jahan for Mumtaz Mahal, it represents the climax of Mughal architecture. The changing colors of the marble reflect the moods of the day—pink at sunrise, white at noon, and golden at sunset.",
    eraSignificance: "Perfection. A seamless blend of Persian, Islamic, and Indian architectural styles, demonstrating absolute imperial control over resources and craft.",
    experientialAppeal: "The symmetry is so perfect it feels divinely ordained. The reflection in the Yamuna adds a layer of dreamlike quality.",
    promotionalAngle: "The Wonder of the World. A monument that needs no introduction.",
    socialMedia: {
      caption: "Sunrise reflection on the river of kings. 🕌✨ #TajMahal",
      hashtags: ["#TajMahal", "#MughalArchitecture", "#WondersOfTheWorld"],
      reelIdeas: ["Sunrise time-lapse", "Symmetry walk"],
      emojis: "🕌💖🌅"
    },
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=1200",
    archiveGallery: [
      { url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=1200", attribution: "Unsplash", source: "Unsplash", license: "Free" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/1200px-Taj_Mahal_%28Edited%29.jpeg", attribution: "Yann", source: "Wikimedia Commons", license: "CC BY-SA" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Taj-Mahal.jpg/1200px-Taj-Mahal.jpg", attribution: "David Castor", source: "Wikimedia Commons", license: "PD" }
    ],
    mapsUri: "https://www.google.com/maps/search/Taj+Mahal",
    mapPosition: { x: 40, y: 35 }
  },
  {
    id: 'victoria-memorial',
    name: "Victoria Memorial",
    slug: "victoria-memorial",
    dynasty: "British Raj",
    era: "Colonial Era",
    location: "Kolkata, West Bengal",
    emotionalHook: "The Taj of the Raj, a marble statement of imperial permanence.",
    coreStory: "A massive marble memorial to Queen Victoria, built to rival the Taj Mahal. It blends British and Mughal elements (Indo-Saracenic), sitting amidst lush gardens in the heart of Kolkata.",
    eraSignificance: "Imperial Statement. It symbolized the British desire to leave a monumental legacy in stone, much like the Mughals before them.",
    experientialAppeal: "The gardens offer a respite from the city, while the museum inside houses the history of the Raj. The reflection in the ponds creates a perfect symmetry.",
    promotionalAngle: "A slice of London in the tropics.",
    socialMedia: {
      caption: "White marble against the Kolkata sky. 🏛️🇬🇧 #ColonialHeritage",
      hashtags: ["#Kolkata", "#VictoriaMemorial", "#RajArchitecture"],
      reelIdeas: ["Reflection in the pond", "Walking through the gardens"],
      emojis: "🏛️⛲🌿"
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Victoria_Memorial_Kolkata_India.jpg/1200px-Victoria_Memorial_Kolkata_India.jpg",
    archiveGallery: [
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Victoria_Memorial_Kolkata_India.jpg/1200px-Victoria_Memorial_Kolkata_India.jpg", attribution: "Kolkata Archives", source: "Wikimedia Commons", license: "CC BY-SA" },
      { url: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&q=80&w=1200", attribution: "Unsplash", source: "Unsplash", license: "Free" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Victoria_Memorial_Hall%2C_Kolkata.jpg/1200px-Victoria_Memorial_Hall%2C_Kolkata.jpg", attribution: "Anirban Shukla", source: "Wikimedia Commons", license: "CC BY-SA 4.0" }
    ],
    mapsUri: "https://www.google.com/maps/search/Victoria+Memorial+Kolkata",
    mapPosition: { x: 75, y: 45 }
  }
];
