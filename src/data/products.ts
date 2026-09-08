export interface Product {
  id: string;
  name: string;
  nameHi: string;
  category: "POOJA SAMAGRI" | "HAWAN SAMAGRI" | "DIYA & PUJA ESSENTIALS" | "HERBS & NATURAL ITEMS" | "SPIRITUAL ITEMS";
  price: number;
  weight: string;
  quantity: string;
  productType: "Individual Item" | "Combo / Set" | "Kit";
  availability: "In Stock" | "Out of Stock";
  shortDescription: string;
  shortDescriptionHi: string;
  detailedDescription: string;
  detailedDescriptionHi: string;
  ingredients?: string[];
  ingredientsHi?: string[];
  iconType: "hawan" | "guggal" | "lobaan" | "kapoor" | "chandan" | "haldi" | "kumkum" | "rice" | "navadhanya" | "kit" | "diya" | "hawanCombo" | "rudraksha";
}

export const CATEGORIES = [
  "ALL",
  "POOJA SAMAGRI",
  "HAWAN SAMAGRI",
  "DIYA & PUJA ESSENTIALS",
  "HERBS & NATURAL ITEMS",
  "SPIRITUAL ITEMS"
] as const;

export type CategoryType = typeof CATEGORIES[number];

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Havan Samagri",
    nameHi: "हवन सामग्री",
    category: "HAWAN SAMAGRI",
    price: 251,
    weight: "250g",
    quantity: "1 Pack (250g)",
    productType: "Individual Item",
    availability: "In Stock",
    shortDescription: "Premium blend of sacred herbs, roots, and wood for homam.",
    shortDescriptionHi: "हवन के लिए पवित्र जड़ी-बूटियों, जड़ों और लकड़ी का प्रीमियम मिश्रण।",
    detailedDescription: "Authentic Vedic Hawan Samagri prepared according to traditional scriptures. Contains a harmonious blend of natural herbs, roots, and aromatic woods designed to purify the home environment during yagnas and daily hawan rituals.",
    detailedDescriptionHi: "पारंपरिक शास्त्रों के अनुसार तैयार की गई प्रामाणिक वैदिक हवन सामग्री। इसमें प्राकृतिक जड़ी-बूटियों, जड़ों और सुगंधित लकड़ियों का सामंजस्यपूर्ण मिश्रण शामिल है जो यज्ञों और दैनिक हवन अनुष्ठानों के दौरान घर के वातावरण को शुद्ध करने के लिए बनाया गया है।",
    ingredients: ["Sacred Herbs", "Jatamansi", "Sugandh Kokila", "Chandan", "Kapoor", "Agar", "Tagar", "Devdaru"],
    ingredientsHi: ["पवित्र जड़ी-बूटियाँ", "जटामांसी", "सुगंध कोकिला", "चंदन", "कपूर", "अगर", "तगर", "देवदारू"],
    iconType: "hawan"
  },
  {
    id: "2",
    name: "Pure Guggal",
    nameHi: "शुद्ध गुग्गल",
    category: "HERBS & NATURAL ITEMS",
    price: 151,
    weight: "100g",
    quantity: "1 Pack (100g)",
    productType: "Individual Item",
    availability: "In Stock",
    shortDescription: "Natural aromatic resin for purifying your space.",
    shortDescriptionHi: "आपके स्थान को शुद्ध करने के लिए प्राकृतिक सुगंधित राल।",
    detailedDescription: "Harvested from wild Commiphora Mukul trees, our pure Guggal resin releases a warm, balsamic fragrance when burnt on charcoal, driving away negative energies and bringing tranquility to your sacred space.",
    detailedDescriptionHi: "जंगली गुग्गल के पेड़ों से एकत्र की गई हमारी शुद्ध गुग्गल राल कोयले पर जलने पर एक गर्म, सुगंधित गंध छोड़ती है, जो नकारात्मक ऊर्जाओं को दूर करती है और आपके पवित्र स्थान में शांति लाती है।",
    ingredients: ["100% Organic Commiphora Mukul Resin"],
    ingredientsHi: ["100% जैविक गुग्गल राल"],
    iconType: "guggal"
  },
  {
    id: "3",
    name: "Premium Lobaan",
    nameHi: "प्रीमियम लोबान",
    category: "HERBS & NATURAL ITEMS",
    price: 181,
    weight: "100g",
    quantity: "1 Pack (100g)",
    productType: "Individual Item",
    availability: "In Stock",
    shortDescription: "Traditional incense resin for deep spiritual ambiance.",
    shortDescriptionHi: "गहरे आध्यात्मिक माहौल के लिए पारंपरिक धूप राल।",
    detailedDescription: "Natural gum resin known for its sweet, vanilla-like aroma and deep spiritual purifying qualities. Ideal for evening prayers, meditation, and daily dhupa rituals.",
    detailedDescriptionHi: "अपनी मीठी, वैनिला जैसी सुगंध और गहरे आध्यात्मिक शुद्धिकरण गुणों के लिए जानी जाने वाली प्राकृतिक गोंद राल। शाम की प्रार्थना, ध्यान और दैनिक धूप अनुष्ठानों के लिए आदर्श।",
    ingredients: ["Pure Styrax Benzoin Resin"],
    ingredientsHi: ["शुद्ध लोबान राल"],
    iconType: "lobaan"
  },
  {
    id: "4",
    name: "Bhimseni Kapoor",
    nameHi: "भीमसेनी कपूर",
    category: "DIYA & PUJA ESSENTIALS",
    price: 351,
    weight: "50g",
    quantity: "1 Glass Jar (50g)",
    productType: "Individual Item",
    availability: "In Stock",
    shortDescription: "100% pure camphor for daily aarti and meditation.",
    shortDescriptionHi: "दैनिक आरती और ध्यान के लिए 100% शुद्ध कपूर।",
    detailedDescription: "Unrefined Bhimseni Kapoor. Unlike synthetic camphor, it burns completely without leaving black residue or toxic smoke, filling the room with a crisp, refreshing, and sacred aroma.",
    detailedDescriptionHi: "अपरिष्कृत भीमसेनी कपूर। कृत्रिम कपूर के विपरीत, यह बिना किसी काले अवशेष या धुएं के पूरी तरह से जलता है, और कमरे को एक ताज़ा और पवित्र सुगंध से भर देता है।",
    ingredients: ["100% Organic Cinnamomum Camphora Flakes"],
    ingredientsHi: ["100% प्राकृतिक भीमसेनी कपूर क्रिस्टल"],
    iconType: "kapoor"
  },
  {
    id: "5",
    name: "Chandan Powder",
    nameHi: "चंदन पाउडर",
    category: "POOJA SAMAGRI",
    price: 211,
    weight: "50g",
    quantity: "1 Pouch (50g)",
    productType: "Individual Item",
    availability: "In Stock",
    shortDescription: "Authentic sandalwood powder for tilak and offering.",
    shortDescriptionHi: "तिलक और अर्पण के लिए प्रामाणिक चंदन पाउडर।",
    detailedDescription: "Finely ground pure sandalwood powder with a soothing natural fragrance. Used for preparing auspicious tilak for deities and personal devotion.",
    detailedDescriptionHi: "सुखदायक प्राकृतिक सुगंध के साथ बारीक पिसा हुआ शुद्ध चंदन पाउडर। देवताओं के लिए शुभ तिलक और व्यक्तिगत भक्ति के लिए उपयोग किया जाता है।",
    ingredients: ["Pure Sandalwood (Santalum Album) Bark"],
    ingredientsHi: ["शुद्ध श्वेत चंदन काष्ठ चूर्ण"],
    iconType: "chandan"
  },
  {
    id: "6",
    name: "Organic Haldi",
    nameHi: "जैविक हल्दी",
    category: "POOJA SAMAGRI",
    price: 51,
    weight: "100g",
    quantity: "1 Pack (100g)",
    productType: "Individual Item",
    availability: "In Stock",
    shortDescription: "Pure turmeric powder for auspicious beginnings.",
    shortDescriptionHi: "शुभ शुरुआत के लिए शुद्ध हल्दी पाउडर।",
    detailedDescription: "Stone-ground organic turmeric cultivated without synthetic pesticides. Symbolizes purity, fertility, and auspiciousness in all Vedic sanskars and daily puja.",
    detailedDescriptionHi: "बिना किसी रासायनिक कीटनाशक के उगाई गई पत्थर से पिसी जैविक हल्दी। सभी वैदिक संस्कारों और दैनिक पूजा में पवित्रता और शुभता का प्रतीक।",
    ingredients: ["100% Organic Curcuma Longa Root Powder"],
    ingredientsHi: ["100% जैविक हल्दी चूर्ण"],
    iconType: "haldi"
  },
  {
    id: "7",
    name: "Kumkum / Roli",
    nameHi: "कुमकुम / रोली",
    category: "POOJA SAMAGRI",
    price: 51,
    weight: "50g",
    quantity: "1 Container (50g)",
    productType: "Individual Item",
    availability: "In Stock",
    shortDescription: "Vibrant and pure kumkum for daily rituals.",
    shortDescriptionHi: "दैनिक अनुष्ठानों के लिए जीवंत और शुद्ध कुमकुम।",
    detailedDescription: "Traditional red kumkum made naturally using organic turmeric and lime. Free from synthetic chemicals or toxic dyes, perfect for daily archana and tilak.",
    detailedDescriptionHi: "जैविक हल्दी और चूने का उपयोग करके स्वाभाविक रूप से बनाया गया पारंपरिक लाल कुमकुम। हानिकारक रसायनों या जहरीले रंगों से मुक्त।",
    ingredients: ["Organic Turmeric & Natural Slaked Lime"],
    ingredientsHi: ["जैविक हल्दी और प्राकृतिक चूना"],
    iconType: "kumkum"
  },
  {
    id: "8",
    name: "Akshat (Rice)",
    nameHi: "अक्षत (चावल)",
    category: "POOJA SAMAGRI",
    price: 41,
    weight: "100g",
    quantity: "1 Pack (100g)",
    productType: "Individual Item",
    availability: "In Stock",
    shortDescription: "Unbroken rice grains mixed with turmeric.",
    shortDescriptionHi: "हल्दी के साथ मिश्रित अखंड चावल के दाने।",
    detailedDescription: "Hand-sorted unbroken raw rice grains infused with pure turmeric and ghee, representing completeness and prosperity in puja offerings.",
    detailedDescriptionHi: "शुद्ध हल्दी और गाय के घी से उपचारित हाथ से चुने गए बिना टूटे कच्चे चावल के दाने, जो पूजा में पूर्णता और समृद्धि का प्रतिनिधित्व करते हैं।",
    ingredients: ["Unbroken Raw Basmati Rice", "Organic Haldi", "Pure Cow Ghee"],
    ingredientsHi: ["अखंड बासमती चावल", "जैविक हल्दी", "शुद्ध देसी घी"],
    iconType: "rice"
  },
  {
    id: "9",
    name: "Navadhanya",
    nameHi: "नवधान्य",
    category: "POOJA SAMAGRI",
    price: 111,
    weight: "150g",
    quantity: "1 Set (150g)",
    productType: "Individual Item",
    availability: "In Stock",
    shortDescription: "Nine sacred grains for Navagraha shanti.",
    shortDescriptionHi: "नवग्रह शांति के लिए नौ पवित्र अनाज।",
    detailedDescription: "Balanced mix of nine sacred grains representing the Nine Planetary Deities (Navagrahas). Used during Navagraha puja, homams, and housewarming ceremonies.",
    detailedDescriptionHi: "नौ ग्रह देवताओं का प्रतिनिधित्व करने वाले नौ पवित्र अनाजों का संतुलित मिश्रण। नवग्रह पूजा, हवन और गृह प्रवेश समारोहों में प्रयुक्त।",
    ingredients: ["Wheat", "Rice", "Toor Dal", "Moong Dal", "Chana Dal", "Rajma", "Sesame", "Urad", "Horsegram"],
    ingredientsHi: ["गेहूँ", "चावल", "अरहर", "मूंग", "चना", "राजमा", "तिल", "उड़द", "कुलथी"],
    iconType: "navadhanya"
  },
  {
    id: "10",
    name: "Maha Lakshmi Puja Kit",
    nameHi: "महालक्ष्मी पूजा किट",
    category: "POOJA SAMAGRI",
    price: 1250,
    weight: "1.2 kg",
    quantity: "1 Kit (21 Items)",
    productType: "Kit",
    availability: "In Stock",
    shortDescription: "Complete ceremonial kit for Lakshmi Puja & Diwali rituals.",
    shortDescriptionHi: "लक्ष्मी पूजा और त्योहार अनुष्ठानों के लिए संपूर्ण पूजन किट।",
    detailedDescription: "Comprehensive 21-item ceremonial ritual kit curated for performing authentic Lakshmi Pujan. Includes all required dravyas, brass diya, pure Ghee, cotton wicks, and step-by-step ritual guide.",
    detailedDescriptionHi: "प्रमाणिक लक्ष्मी पूजन करने के लिए 21 वस्तुओं की संपूर्ण पूजा किट। इसमें सभी आवश्यक द्रव्य, पीतल का दीया, शुद्ध घी, रुई की बत्तियां और विधि गाइड शामिल हैं।",
    ingredients: ["Roli", "Akshat", "Kapoor", "Brass Diya", "Cotton Wicks", "Kamal Gatta", "Desi Ghee", "Incense"],
    ingredientsHi: ["रोली", "अक्षत", "भीमसेनी कपूर", "पीतल दीया", "रुई बत्ती", "कमलगट्टा", "देसी घी", "धूप"],
    iconType: "kit"
  },
  {
    id: "11",
    name: "Brass Panch Aarti Diya",
    nameHi: "पीतल पंच आरती दीया",
    category: "DIYA & PUJA ESSENTIALS",
    price: 899,
    weight: "450g",
    quantity: "1 Piece",
    productType: "Individual Item",
    availability: "In Stock",
    shortDescription: "Traditional 5-wick brass lamp for evening aarti.",
    shortDescriptionHi: "संध्या आरती के लिए पारंपरिक 5-मुख वाला पीतल का दीया।",
    detailedDescription: "Heavyweight solid brass Panch Aarti lamp crafted by traditional Indian artisans. Features a carved wooden handle for safe and comfortable daily aarti rituals.",
    detailedDescriptionHi: "पारंपरिक भारतीय कारीगरों द्वारा निर्मित ठोस पीतल का पंच आरती दीया। दैनिक आरती के दौरान सुरक्षित उपयोग के लिए सुंदर हत्थे के साथ।",
    ingredients: ["100% Solid Virgin Brass"],
    ingredientsHi: ["100% शुद्ध ठोस पीतल"],
    iconType: "diya"
  },
  {
    id: "12",
    name: "Grand Hawan Samagri Combo Pack",
    nameHi: "ग्रैंड हवन सामग्री कॉम्बो पैक",
    category: "HAWAN SAMAGRI",
    price: 2400,
    weight: "3.5 kg",
    quantity: "1 Combo Set",
    productType: "Combo / Set",
    availability: "Out of Stock",
    shortDescription: "All-in-one homam setup with wood, ghee & sacred herbs.",
    shortDescriptionHi: "लकड़ी, घी और पवित्र जड़ी-बूटियों के साथ ऑल-इन-वन हवन सेट।",
    detailedDescription: "Complete seasonal homam pack including dry mango wood sticks, pure desi cow ghee, premium hawan samagri, and natural resins for grand yagnas.",
    detailedDescriptionHi: "सूखी आम की लकड़ी, शुद्ध देसी गाय के घी, प्रीमियम हवन सामग्री और प्राकृतिक राल के साथ भव्य यज्ञों के लिए संपूर्ण होमम पैक।",
    ingredients: ["Dry Mango Wood 2kg", "Hawan Samagri 1kg", "Desi Cow Ghee 500ml", "Guggal & Lobaan 250g"],
    ingredientsHi: ["सूखी आम की लकड़ी 2kg", "हवन सामग्री 1kg", "देसी गाय का घी 500ml", "गुग्गल व लोबान 250g"],
    iconType: "hawanCombo"
  },
  {
    id: "13",
    name: "Rudraksha Japa Mala (108+1)",
    nameHi: "रुद्राक्ष जप माला (108+1)",
    category: "SPIRITUAL ITEMS",
    price: 651,
    weight: "80g",
    quantity: "1 Mala (108+1 Beads)",
    productType: "Individual Item",
    availability: "In Stock",
    shortDescription: "Natural 5-Mukhi Rudraksha rosary for japa and meditation.",
    shortDescriptionHi: "जप और ध्यान के लिए प्राकृतिक 5-मुखी रुद्राक्ष माला।",
    detailedDescription: "Lab-certified authentic 5-Mukhi Rudraksha beads strung in traditional knotting with silk tassel. Helps focus the mind during daily mantra repetition and spiritual practice.",
    detailedDescriptionHi: "लैब-प्रमाणित 5-मुखी रुद्राक्ष के मनकों से बनी पारंपरिक गांठ वाली माला। दैनिक मंत्र जाप और ध्यान के दौरान मन को केंद्रित करने में सहायक।",
    ingredients: ["Authentic 5-Mukhi Rudraksha Beads", "Pure Silk Tassel"],
    ingredientsHi: ["प्रामाणिक 5-मुखी रुद्राक्ष मनके", "रेशमी धागा व फुंदना"],
    iconType: "rudraksha"
  }
];
