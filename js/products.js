const products = [
    {
        id: "1",
        featured: true,
        slug: "educational-toy-set",
        name: "Premium Educational Toy Set",
        price: 2500,
        category: "Learning",
        short_desc: "Boost cognitive skills with this complete educational toy set.",
        description: "A comprehensive educational toy set designed to boost cognitive skills and creativity in early childhood. Perfect for toddlers and preschoolers. This set contains beautifully crafted pieces that ensure hours of engaging playtime while naturally teaching shapes, colors, and spatial thinking.",
        details: [
            "Includes 50+ interactive pieces",
            "Made from non-toxic, child-safe materials",
            "Improves fine motor skills and hand-eye coordination",
            "Suitable for ages 3 and up"
        ],
        images: [
            "assets/products/educational-toy-set/product-1-1.webp",
            "assets/products/educational-toy-set/product-1-2.webp",
            "assets/products/educational-toy-set/product-1-3.webp",
            "assets/products/educational-toy-set/product-1-4.webp"
        ]
    },
    {
        id: "2",
        featured: true,
        slug: "wooden-puzzle-board",
        name: "Classic Wooden Puzzle Board",
        price: 1800,
        category: "Puzzles",
        short_desc: "Eco-friendly wooden puzzle board for alphabet and number learning.",
        description: "Our Classic Wooden Puzzle Board makes early learning fun! Featuring vibrantly colored alphabet letters and numbers, this durable board helps kids recognize shapes, letters, and numbers. The chunky wooden pieces are easy for little hands to grasp.",
        details: [
            "100% natural wood construction",
            "Bright, child-safe water-based paint",
            "Aids in shape recognition and vocabulary building",
            "Perfect gift for ages 2 to 5"
        ],
        images: [
            "assets/products/educational-toy-set/product-1-2.webp",
            "assets/products/educational-toy-set/product-1-1.webp",
            "assets/products/educational-toy-set/product-1-4.webp",
            "assets/products/educational-toy-set/product-1-3.webp"
        ]
    },
    {
        id: "3",
        featured: true,
        slug: "kids-learning-cards",
        name: "Interactive Kids Learning Cards",
        price: 1200,
        category: "Flashcards",
        short_desc: "Set of 100+ illustrative flashcards covering words, numbers, and animals.",
        description: "Make learning an interactive adventure! These beautifully illustrated Kids Learning Cards cover a wide range of topics including animals, fruits, numbers, and everyday objects. Thick, water-resistant cardstock ensures they survive the toughest playtimes.",
        details: [
            "Includes over 100 double-sided cards",
            "Thick, tear-resistant, and spill-proof",
            "Comes with a convenient storage ring",
            "Ideal for ages 1 to 4"
        ],
        images: [
            "assets/products/educational-toy-set/product-1-1.webp",
            "assets/products/educational-toy-set/product-1-2.webp",
            "assets/products/educational-toy-set/product-1-3.webp",
            "assets/products/educational-toy-set/product-1-4.webp"
        ]
    },
    {
        id: "4",
        slug: "building-blocks-kit",
        name: "Creative Building Blocks Kit",
        price: 3200,
        category: "Building",
        short_desc: "Unleash infinite creativity with our snap-together building blocks.",
        description: "The ultimate Creative Building Blocks Kit for aspiring engineers and architects! Featuring 200 colorful interlocking blocks, wheels, and baseplates. Watch your child's imagination soar as they build castles, cars, and abstract structures.",
        details: [
            "200 high-quality plastic pieces",
            "Fully compatible with major brand building blocks",
            "Includes a durable storage tub",
            "Great for group play, ages 4 and up"
        ],
        images: [
            "https://placehold.co/600x600/BAFFC9/333333?text=Blocks+-+Main",
            "https://placehold.co/600x600/BAFFC9/333333?text=Blocks+-+Angle+2",
            "https://placehold.co/600x600/BAFFC9/333333?text=Blocks+-+Angle+3",
            "https://placehold.co/600x600/BAFFC9/333333?text=Blocks+-+Tub"
        ]
    }
];

// Utility function to get product by slug
function getProductBySlug(slug) {
    return products.find(p => p.slug === slug);
}

// Utility function to format price in PKR
function formatPrice(price) {
    return "Rs. " + price.toLocaleString("en-PK");
}
