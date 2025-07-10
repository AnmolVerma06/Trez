import shop1 from '../assets/img/gallery/shop-01/shop-01.png'
import shop2 from '../assets/img/gallery/shop-01/shop-02.png'
import shop3 from '../assets/img/gallery/shop-01/shop-03.png'
import shop4 from '../assets/img/gallery/shop-01/shop-04.png'
import shop5 from '../assets/img/gallery/shop-01/shop-05.png'
import shop6 from '../assets/img/gallery/shop-01/shop-06.png'
import shop7 from '../assets/img/gallery/shop-01/shop-07.png'
import shop8 from '../assets/img/gallery/shop-01/shop-08.png'
import shop9 from '../assets/img/gallery/shop-01/shop-09.png'
import shop10 from '../assets/img/gallery/shop-01/shop-10.png'

import shop11 from '../assets/img/gallery/shop-01/shop-11.png'
import shop12 from '../assets/img/gallery/shop-01/shop-12.png'
import shop13 from '../assets/img/gallery/shop-01/shop-13.png'
import shop14 from '../assets/img/gallery/shop-01/shop-14.png'
import shop15 from '../assets/img/gallery/shop-01/shop-15.png'
import shop16 from '../assets/img/gallery/shop-01/shop-16.png'
import shop17 from '../assets/img/gallery/shop-01/shop-17.png'
import shop18 from '../assets/img/gallery/shop-01/shop-18.png'

import blog1 from '../assets/img/shortcode/blog/blog-1.jpg'
import blog2 from '../assets/img/shortcode/blog/blog-2.jpg'
import blog3 from '../assets/img/shortcode/blog/blog-3.jpg'


import product1 from '../assets/img/home-v2/product/pdct-01.png'
import product2 from '../assets/img/home-v2/product/pdct-02.png'
import product3 from '../assets/img/home-v2/product/pdct-03.png'
import product4 from '../assets/img/home-v2/product/pdct-04.png'

import team2 from '../assets/img/testimonial/tmnl-02.jpg'
import team3 from '../assets/img/testimonial/tmnl-03.jpg'

// Color hex to name mapping utility
export const colorHexToName: Record<string, string> = {
  '#000000': 'Black',
  '#FFFFFF': 'White',
  '#FF0000': 'Red',
  '#00FF00': 'Lime',
  '#0000FF': 'Blue',
  '#FFFF00': 'Yellow',
  '#FFA500': 'Orange',
  '#800080': 'Purple',
  '#008000': 'Green',
  '#808080': 'Grey', // Alias for Gray
  '#C0C0C0': 'Silver',
  '#A52A2A': 'Brown',
  '#FFC0CB': 'Pink',
  '#FFD700': 'Gold',
  '#ADD8E6': 'Light Blue',
  '#F5F5DC': 'Beige',
  '#B22222': 'Firebrick',
  '#DC143C': 'Crimson',
  '#228B22': 'Forest Green',
  '#F0E68C': 'Khaki',
  // Added new colors
  '#000080': 'Navy Blue',
  '#800000': 'Maroon',
  '#4682B4': 'Steel Blue',
  '#FFB6C1': 'Light Pink',
  '#6495ED': 'Cornflower Blue',
  '#B0C4DE': 'Light Steel Blue',
  '#E8E9EA': 'Light Grey',
  '#D68553': 'Tan',
};

export const productList = [
    {
        id:1,
        image:shop1,
        images: [shop1, shop1, shop1, shop1],
        tag:'Hot Sale',
        price: 900,
        name:'Oversized Boston Tshirt',
        category: 'Oversized Tshirt',
        type: 'Regular',
        brand: 'Bewakoof',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['#F5F5DC', '#000000', '#F0E68C'], // Added Navy Blue, Grey, Maroon
        tags: ['Oversized Tshirt', 'Tshirt', 'Casual'],
        description: 'This stylish casual t-shirt features a modern colorblock design with maroon raglan sleeves and a soft beige body. The text "BOSTON" printed on the front adds a sporty touch. Perfect for a laid-back day out, the crew neck and half sleeves make it comfortable and breathable for all-day wear.',
        vendor: {
            name: 'Bewakoof',
            shop: 'Mumbai, India',
            mail: 'support@bewakoof.com',
            call: '+91-12345-67890'
        },
        reviews: [
            { name: 'Amit S.', desc: 'Super comfy and looks great!' },
            { name: 'Priya R.', desc: 'Love the fit and color.' },
            { name: 'John D.', desc: 'Perfect for daily wear.' }
        ]
    },
    {
        id:2,
        image:shop2,
        images: [shop2, shop2, shop2, shop2],
        tag:'NEW',
        price:1999,
        name:'Denim Blue Mens Jacket',
        category: 'Denim Jacket',
        type: 'Premium',
        brand: 'Bare Denim',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['#4682B4', '#000080','#800000'],
        tags: ['Denim Jacket', 'Jacket', 'Men'],
        description: 'Timeless and versatile, this light blue denim jacket is a must-have for any wardrobe. Crafted from high-quality denim, it features button closures, flap pockets on the chest, and a structured fit that pairs perfectly with jeans or chinos. A staple for layering in transitional weather.',
        vendor: {
            name: 'Bare Denim',
            shop: 'Los Angeles, CA',
            mail: 'info@baredenim.com',
            call: '+1-98765-43210'
        },
        reviews: [
            { name: 'Sam Denim', desc: 'The denim jacket is a classic. Looks great with everything!' },
            { name: 'Lisa M.', desc: 'Perfect for chilly evenings. Highly recommend.' },
            { name: 'Ravi K.', desc: 'Stylish and comfortable.' }
        ]
    },
    {
        id:3,
        image:shop3,
        images: [shop3, shop3, shop3, shop3],
        tag:'10% OFF',
        price:1800,
        name:'Pink Womens Jacket',
        category: 'Womens Jacket',
        type: 'Premium',
        brand: 'Bare Denim',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['#FFB6C1', '#800080', '#FFC0CB'],
        tags: ['Womens Jacket', 'Jacket', 'Women'],
        description: 'Sporty and chic, this light pink jacket is designed for comfort and style. Featuring a high neck, adjustable drawstrings at the hem, and utility-style pockets, it’s a great choice for outdoor activities or a stylish streetwear look. The breathable fabric and relaxed fit offer ease of movement.',
        vendor: {
            name: 'Bare Denim',
            shop: 'Los Angeles, CA',
            mail: 'info@baredenim.com',
            call: '+1-98765-43210'
        },
        reviews: [
            { name: 'Neha S.', desc: 'Love the color and fit!' },
            { name: 'Aarti P.', desc: 'Very warm and stylish.' },
            { name: 'Emily W.', desc: 'My favorite jacket now.' }
        ]
    },
    {
        id:4,
        image:shop4,
        images: [shop4, shop4, shop4, shop4],
        tag:'',
        price:800,
        name:'Blue Shirt for Women',
        category: 'Shirts',
        type: 'Regular',
        brand: 'Bewakoof',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['#6495ED','#4682B4', '#B0C4DE',],
        tags: ['Shirts'],
        description: 'This elegant light blue shirt top blends minimalism with comfort. Made from a soft, flowy fabric, it features a clean collar design, V-neck, and loose-fitting short sleeves. Ideal for both casual and semi-formal occasions, it pairs beautifully with trousers or denim for a graceful look.',
        vendor: {
            name: 'Bewakoof',
            shop: 'New York, NY',
            mail: 'support@bewakoof.com',
            call: '+1-12345-67890'
        },
        reviews: [
            { name: 'Maria L.', desc: 'Perfect for professional wear.' },
            { name: 'Sarah J.', desc: 'Looks great with jeans.' },
            { name: 'Emma W.', desc: 'Very soft and comfortable.' }
        ]
    },
    {
        id:5,
        image:shop5,
        images: [shop5, shop5, shop5, shop5],
        tag:'Hot Sale',
        price:999,
        name:'GAP Full Sleeves Tshirt',
        category: 'Men\'s Tshirts',
        type: 'Premium',
        brand: 'GAP',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['#F5F5DC', '#FFFFFF', '#E8E9EA', '#D68553'],
        tags: ['Men\'s Tshirts'],
        description: 'A nod to vintage collegiate fashion, this rugby-style polo shirt from GAP comes in an off-white base with a green horizontal stripe. The long sleeves and collared neckline offer a refined look, while the soft cotton fabric ensures day-long comfort. Suitable for casual or smart-casual dressing.',
        vendor: {
            name: 'GAP',
            shop: 'Chicago, IL',
            mail: 'info@gap.com',
            call: '+1-23456-78901'
        },
        reviews: [
            { name: 'David R.', desc: 'Great quality and fit.' },
            { name: 'Tom H.', desc: 'Perfect for gym wear.' },
            { name: 'Mike T.', desc: 'Looks stylish and comfortable.' }
        ]
    },
    {
        id:6,
        image:shop6,
        images: [shop6, shop6, shop6, shop6],
        tag:'',
        price:1900,
        name:'Yellow Mens Jacket',
        category: 'Mens Jacket',
        type: 'Vintage',
        brand: 'Ajile',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['#FFA500', '#000000', '#E8E9EA'],
        tags: ['Mens Jacket'],
        description: 'Designed to keep you warm and stylish, this mustard yellow puffer jacket features horizontal quilted stitching and a high collar. With zippered side pockets and a front zip closure, it combines utility with fashion. Great for colder climates or layering in the winter.',
        vendor: {
            name: 'Ajile',
            shop: 'London, UK',
            mail: 'support@ajile.com',
            call: '+44-12345-67890'
        },
        reviews: [
            { name: 'James B.', desc: 'Looks amazing and feels comfortable.' },
            { name: 'Peter S.', desc: 'Perfect for a casual look.' },
            { name: 'Mark W.', desc: 'Stylish and durable.' }
        ]
    },
    {
        id:7,
        image:shop7,
        images: [shop7, shop7, shop7, shop7],
        tag:'',
        price:1200,
        name:'Shirt for Men',
        category: 'Shirts',
        type: 'Premium',
        brand: 'GAP',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['#F5F5DC', '#FFFFFF'],
        tags: ['Shirts'],
        description: 'This off-white shirt features a subtle all-over print that adds a refined touch to casualwear. Made with a lightweight fabric, it has a button-down front and rolled-up long sleeves, making it a great choice for semi-formal or smart casual occasions. The tailored fit enhances the overall silhouette.',
        vendor: {
            name: 'GAP',
            shop: 'New York, NY',
            mail: 'info@gap.com',
            call: '+1-12345-67890'
        },
        reviews: [
            { name: 'John D.', desc: 'Very comfortable and fits well.' },
            { name: 'Tom H.', desc: 'Looks great with jeans.' },
            { name: 'Mike T.', desc: 'Perfect for a business casual look.' }
        ]
    },
    {
        id:8,
        image:shop8,
        images: [shop8, shop8, shop8, shop8],
        tag:'10% OFF',
        price:2199,
        name:'Pink Womens Jacket',
        category: 'Womens Jacket',
        type: 'Regular',
        brand: 'Ajile',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['#FFC0CB', '#800080', '#FFB6C1'],
        tags: ['Womens Jacket'],
        description: 'Combining cozy functionality with feminine style, this blush pink winter jacket is padded for warmth and lined with faux fur at the collar. The zip-up front and full sleeves provide complete coverage for cold days. Ideal for winter outings, it offers both fashion and insulation.',
        vendor: {
            name: 'Ajile',
            shop: 'Los Angeles, CA',
            mail: 'support@ajile.com',
            call: '+1-98765-43210'
        },
        reviews: [
            { name: 'Lisa M.', desc: 'Perfect for chilly evenings.' },
            { name: 'Sarah J.', desc: 'Looks great with jeans.' },
            { name: 'Emma W.', desc: 'Very warm and stylish.' }
        ]
    },
    {
        id:9,
        image:shop9,
        images: [shop9, shop9, shop9, shop9],
        tag:'',
        price:2299,
        name:'Grey Mens Jacket',
        category: 'Mens Jacket',
        type: 'Vintage',
        brand: 'Ajile',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: [ '#E8E9EA', '#000000', '#FFFFFF'],
        tags: ['Mens Jacket'],
        description: 'This stylish olive and grey puffer jacket is perfect for winter days. It features a colorblock design with a quilted texture and a warm padded interior. The attached hood offers added protection against the cold, and the side zip pockets provide convenient storage. Great for casual outdoor wear, it pairs well with jeans and sneakers.',
        vendor: {
            name: 'Ajile',
            shop: 'London, UK',
            mail: 'support@ajile.com',
            call: '+44-12345-67890'
        },
        reviews: [
            { name: 'James B.', desc: 'Looks amazing and feels comfortable.' },
            { name: 'Peter S.', desc: 'Perfect for a casual look.' },
            { name: 'Mark W.', desc: 'Stylish and durable.' }
        ]
    },
    {
        id:10,
        image:shop10,
        images: [shop10, shop10, shop10, shop10],
        tag:'',
        price:1200,
        name:'Womens Tshirt',
        category: 'Womens Tshirts',
        type: 'Premium',
        brand: 'Puma',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['#000000', '#FFFFFF'],
        tags: ['Womens Tshirts'],
        description: 'A sleek and sporty tee from Puma, this black t-shirt is tailored for women with a flattering fit. It showcases a bold, outlined Puma logo in a striking pink shade across the chest. Made from breathable cotton fabric, it is perfect for both active and casual outings.',
        vendor: {
            name: 'Puma',
            shop: 'Chicago, IL',
            mail: 'info@puma.com',
            call: '+1-23456-78901'
        },
        reviews: [
            { name: 'Maria L.', desc: 'Perfect for professional wear.' },
            { name: 'Sarah J.', desc: 'Looks great with jeans.' },
            { name: 'Emma W.', desc: 'Very soft and comfortable.' }
        ]
    },
    {
        id:11,
        image:shop11,
        images: [shop11, shop11, shop11, shop11],
        tag:'',
        price:1999,
        name:'Navy Blue Denim Jacket',
        category: 'Denim Jacket',
        type: 'Premium',
        brand: 'Bare Denim',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['#000080', '#4682B4', '#000000'],
        tags: ['Denim Jacket'],
        description: 'This timeless denim jacket is a must-have in any man’s wardrobe. Made from durable, stonewashed blue denim, it features a button-down front, flap chest pockets, and side pockets. The versatile piece adds rugged charm to any outfit and is ideal for layering in transitional weather.',
        vendor: {
            name: 'Bare Denim',
            shop: 'Los Angeles, CA',
            mail: 'info@baredenim.com',
            call: '+1-98765-43210'
        },
        reviews: [
            { name: 'Sam Denim', desc: 'The denim jacket is a classic. Looks great with everything!' },
            { name: 'Lisa M.', desc: 'Perfect for chilly evenings. Highly recommend.' },
            { name: 'Ravi K.', desc: 'Stylish and comfortable.' }
        ]
    },
    {
        id:12,
        image:shop12,
        images: [shop12, shop12, shop12, shop12],
        tag:'',
        price:800,
        name:'Grey Womens Tshirt',
        category: 'Womens Tshirts',
        type: 'Premium',
        brand: 'GAP',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: [ '#E8E9EA', '#000000'],
        tags: ['Womens Tshirts'],
        description: 'Simple yet chic, this womens grey V-neck t-shirt delivers comfort and effortless style. Featuring short sleeves and a subtle embroidered logo, it is made from soft, breathable fabric—ideal for everyday casual wear or layering under jackets and cardigans.',
        vendor: {
            name: 'GAP',
            shop: 'New York, NY',
            mail: 'info@gap.com',
            call: '+1-12345-67890'
        },
        reviews: [
            { name: 'John D.', desc: 'Very comfortable and fits well.' },
            { name: 'Tom H.', desc: 'Looks great with jeans.' },
            { name: 'Mike T.', desc: 'Perfect for a business casual look.' }
        ]
    },
    {
        id:13,
        image:shop13,
        images: [shop13, shop13, shop13, shop13],
        tag:'NEW',
        price:600,
        name:'Navy Blue Tshirt',
        category: 'Men\'s Tshirts',
        type: 'Vintage',
        brand: 'GAP',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['#000080', '#4682B4', '#FFFFFF'],
        tags: ['Men\'s Tshirts'],
        description: 'This mens navy blue t-shirt adds a fun twist with its creative vertical graphic print featuring quirky illustrations. Crafted from soft cotton, it offers a regular fit and a clean silhouette, making it a unique and casual option for daily wear.',
        vendor: {
            name: 'GAP',
            shop: 'Chicago, IL',
            mail: 'info@gap.com',
            call: '+1-23456-78901'
        },
        reviews: [
            { name: 'David R.', desc: 'Great quality and fit.' },
            { name: 'Tom H.', desc: 'Perfect for gym wear.' },
            { name:'Mike T.', desc: 'Looks stylish and comfortable.' }
        ]
    },
    {
        id:14,
        image:shop14,
        images: [shop14, shop14, shop14, shop14],
        tag:'Hot Sale',
        price:1399,
        name:'Blue Jacket for Men',
        category: 'Mens Jacket',
        type: 'Premium',
        brand: 'Ajile',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['#000080', '#000000'],
        tags: ['Mens Jacket'],
        description: 'This edgy black biker jacket comes in a smooth faux suede material with a high neck collar and zippered chest pockets. With its structured fit and zip closure, it offers a stylish and bold look, perfect for evening outings or weekend rides.',
        vendor: {
            name: 'Ajile',
            shop: 'London, UK',
            mail: 'support@ajile.com',
            call: '+44-12345-67890'
        },
        reviews: [
            { name: 'James B.', desc: 'Looks amazing and feels comfortable.' },
            { name: 'Peter S.', desc: 'Perfect for a casual look.' },
            { name: 'Mark W.', desc: 'Stylish and durable.' }
        ]
    },
    {
        id:15,
        image:shop15,
        images: [shop15, shop15, shop15, shop15],
        tag:'10% OFF',
        price:1199,
        name:'Black Half Sleeves Jacket',
        category: 'Mens Jacket',
        type: 'Regular',
        brand: 'Ajile',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['#000000', '#FFFFFF'],
        tags: ['Mens Jacket'],
        description: 'A sporty addition to your wardrobe, this black sleeveless hooded jacket is ideal for layering over tees or hoodies. It features zippered pockets and a front zip closure, crafted from lightweight material—perfect for both workout and casual styles.',
        vendor: {
            name: 'Ajile',
            shop: 'London, UK',
            mail: 'support@ajile.com',
            call: '+44-12345-67890'
        },
        reviews: [
            { name: 'James B.', desc: 'Looks amazing and feels comfortable.' },
            { name: 'Peter S.', desc: 'Perfect for a casual look.' },
            { name: 'Mark W.', desc: 'Stylish and durable.' }
        ]
    },
    {
        id:16,
        image:shop16,
        images: [shop16, shop16, shop16, shop16],
        tag:'',
        price:1799,
        name:'Red Woolen Jacket',
        category: 'Womens Jacket',
        type: 'Vintage',
        brand: 'GAP',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['#800000','#E8E9EA'],
        tags: ['Womens Jacket'],
        description: 'Cozy and elegant, this maroon zip-up fleece jacket keeps you warm while maintaining a sleek silhouette. It features subtle branding on the sleeve and practical side pockets, making it an ideal pick for chilly mornings or winter errands.',
        vendor: {
            name: 'GAP',
            shop: 'New York, NY',
            mail: 'info@gap.com',
            call: '+1-12345-67890'
        },
        reviews: [
            { name: 'Maria L.', desc: 'Perfect for professional wear.' },
            { name: 'Sarah J.', desc: 'Looks great with jeans.' },
            { name: 'Emma W.', desc: 'Very soft and comfortable.' }
        ]
    },
    {
        id:17,
        image:shop17,
        images: [shop17, shop17, shop17, shop17],
        tag:'10% OFF',
        price:1200,
        name:'Puma White Tshirt',
        category: 'Men\'s Tshirts',
        type: 'Regular',
        brand: 'Puma',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['#000000', '#FFFFFF'],
        tags: ['Men\'s Tshirts'],
        description: 'A clean and cool staple, this white Puma t-shirt features a vibrant blue logo across the chest. Made from soft cotton fabric, it offers a snug fit and excellent breathability—great for active days or a minimalist casual look.',
        vendor: {
            name: 'Puma',
            shop: 'Chicago, IL',
            mail: 'info@puma.com',
            call: '+1-23456-78901'
        },
        reviews: [
            { name: 'David R.', desc: 'Great quality and fit.' },
            { name: 'Tom H.', desc: 'Perfect for gym wear.' },
            { name: 'Mike T.', desc: 'Looks stylish and comfortable.' }
        ]
    },
    {
        id:18,
        image:shop18,
        images: [shop18, shop18, shop18, shop18],
        tag:'',
        price:1200,
        name:'Puma Black Tshirt',
        category: 'Men\'s Tshirts',
        type: 'Vintage',
        brand: 'Puma',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['#000000', '#FFFFFF'],
        tags: ['Men\'s Tshirts'],
        description: 'Modern and sporty, this black Puma t-shirt stands out with a neon orange pouncing cat logo set against a geometric lined background. It is designed with a crew neck and short sleeves for all-day comfort, perfect for gym sessions or streetwear.',
        vendor: {
            name: 'Puma',
            shop: 'New York, NY',
            mail: 'info@puma.com',
            call: '+1-12345-67890'
        },
        reviews: [
            { name: 'Maria L.', desc: 'Perfect for professional wear.' },
            { name: 'Sarah J.', desc: 'Looks great with jeans.' },
            { name: 'Emma W.', desc: 'Very soft and comfortable.' }
        ]
    },
];

export const partnerData = [
    {
        name: 'PUMA',
        image: 'PUMA',
        image2: 'PUMA'
    },
    {
        name: 'Bare Denim',
        image: 'Bare Denim',
        image2: 'Bare Denim'
    },
    {
        name: 'Bewakoof',
        image: 'Bewakoof',
        image2: 'Bewakoof'
    },
    {
        name: 'Ajile',
        image: 'Ajile',
        image2: 'Ajile'
    },
    {
        name: 'GAP',
        image: 'GAP',
        image2: 'GAP'
    },
]

export const productSlider = [
    {
        image:product1,
        name:'Denim Jacket',
        product:'4 Products'
    },
    {
        image:product2,
        name:'Tshirts',
        product:'6 Products'
    },
    {
        image:product3,
        name:'Shirts',
        product:'4 Products'
    },
    {
        image:product4,
        name:'Jackets',
        product:'6 Products'
    },
    
]

export const teamData = [
    {
        image:team2,
        name:'Rohan K.',
        location:'New Delhi, India',
        desc:`I ordered a dress from Trez for a special occasion, and it arrived perfectly on time. The fit was absolutely amazing, and I received countless compliments throughout the evening. It's rare to find an online store that delivers on both style and quality, but Trez does it flawlessly. I highly recommend them to anyone who wants to look their best.`
    },
    {
        image:team3,
        name:'Neha M.',
        location:'Mumbai, India',
        desc:`The Popular Collection at Trez is an absolute game-changer. Each piece feels like it was designed just for me, and I've never felt more confident in my outfits. The versatility and elegance of the collection make it easy to dress up or down, and I always get compliments when I wear Trez. It's now my favorite place to shop.`
    },
]

export const productTag = [
    'Chair',
    'Art & Paint',
    'Mirror',
    'Table',
    'Lamp'
]

export const shippingAbout = [
    {
        title:'For Shipping',
        desc:`Shipping times may vary based on your location and the selected delivery option. Please review our shipping policies for details on processing times, charges, and tracking updates. Contact us for any shipping-related inquiries or assistance.`
    },
    {
        title:'Item Return',
        desc:`We offer a hassle-free process to ensure your satisfaction. Please review our return policy for eligibility and steps to initiate a return. we offer a hassle-free process to ensure your satisfaction. Please review our return policy for eligibility and steps to initiate a return.`
    },
    {
        title:'Accepted Problem Issue',
        desc:`Choose from multiple methods, including credit cards, debit cards, and online payment gateways. All transactions are encrypted to ensure your information remains safe. For any payment-related concerns, our support team is here to assist.`
    },
]

// Restore blogTwoData for BlogTwo component
export const blogTwoData = [
  {
    id: 1,
    image: blog1,
    date: '13th June 2025',
    tag: 'Digital Marketing',
    title: 'Digital Marketing Secrets Every Fashion Brand Needs to Know',
  },
  {
    id: 2,
    image: blog2,
    date: '29th May 2025',
    tag: 'Packaging',
    title: 'The Art of Packaging: Why Unboxing Your Clothes Should Feel Special',
  },
  {
    id: 3,
    image: blog3,
    date: '19th June 2025',
    tag: 'Your Style',
    title: 'How to Choose Clothes That Reflect Your True Style',
  },
];
