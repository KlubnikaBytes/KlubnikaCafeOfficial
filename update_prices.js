const fs = require('fs');
const path = require('path');

const prices = {
  // 1. Cheer Up
  "kiwi smoothie": "119",
  "peach smoothie": "109",
  "klubnika smoothie": "119",
  "mango smoothie": "119",

  // 2. Starter
  "french fries": "69",
  "fish finger (5pcs)": "119",
  "fish n chips": "109",
  "chicken popcorn (10pcs)": "109",
  "chicken nuggets (5pcs)": "99",
  "chicken small wings (3pcs)": "159",
  "prawn ball (5pcs)": "119",
  "veg finger (5pcs)": "119",
  "veg cheese ball (5pcs)": "99",
  "chicken finger chilli garlic (5pcs)": "99",
  "cheesy garlic bread": "65",

  // Wraps
  "paneer wrap": "85",
  "mushroom wrap": "75",
  "chicken tikka wrap": "99",
  "smoke chicken wrap": "85",

  // 3. Soup
  "tomato soup": "40",
  "hot and sour soup": "45", 
  "veg corn soup": "50",
  "chicken and corn soup": "65", 

  // 4. Wake Up & Shine
  "espresso": "49",
  "café americano": "65",
  "klubnika coffee": "55",
  "cappuccino": "85",
  "hazelnut latte": "109",
  "caramel latte": "109",
  "cocoa mocha": "89",
  
  "assam tea": "27",
  "lemon tea": "32",
  "green tea": "35",
  "klubnika tea": "39",
  "blue pea & chamomile tea": "45",
  "mint tea": "45",
  "darjeeling tea": "45",
  "ginger and honey tea": "49",

  "hot chocolate": "89",
  "cream hot chocolate": "109",
  "flavour hot chocolate": "99",
  "flavour got chocolate": "99",

  "klubnika frappe": "129",
  "choco frappe": "109",
  "butterscotch frappe": "109", 
  "irish flavour frappe": "129",
  "vanilla frappe": "119",
  "rich coffee frappe": "129",

  "belgian chocolate": "99",
  "rich chocolate": "109",
  "cream cold chocolate": "119",

  "mint iced tea": "65",
  "lemon iced tea": "55",

  // 5. Sandwich & Burger
  "cheese and tomato sandwich": "69",
  "paneer and cheese sandwich": "89",
  "barbeque mushroom sandwich": "79",
  "thousand island chicken sandwich": "95",
  "chicken tikka sandwich": "99",
  "smoke chicken sandwich": "89",
  "grilled chicken and egg sandwich": "119",

  "veg burger": "85",
  "aalo tikka burger": "85",
  "chicken burger": "95",
  "thousand island burger": "109",

  // 6. Pizza
  "chicken tikka pizza": "199",
  "chicken sausage pizza": "199",
  "pepperoni pizza": "199",
  "mushroom pizza": "169",
  "paneer pizza": "169",
  "corn & cheeze pizza": "149",
  "vegetable garden pizza": "159",
  "margarita pizza": "139",
  "extra cheese": "49", 

  // 7. Pasta
  "white sauce pasta veg": "109",
  "red sauce pasta veg": "119",
  "white sauce pasta non-veg": "129",
  "red sauce pasta non-veg": "139",

  // 8. Refreshments
  "rich blue sea": "85",
  "fresh lime and lemon": "69",
  "mint mojito": "89",
  "sunrise": "99",
  "klubnika lime lake": "105",
  "green apple fizz": "99",
  "glitchi": "95",
  "spicy guava": "89",

  // 9. Desserts
  "brownie": "59",
  "brownie with ice cream": "89",
  "sizzling brownie": "139", 
  "gulab jamun with ice cream": "89",
  "klubnika waffy with ice cream": "80",

  // 10. Energizer
  "mango milkshake": "85",
  "chocolate milkshake": "89",
  "klubnika milkshake": "99",
  "vanilla milkshake": "79",
  "pineapple milkshake": "79",
  "kitkat milkshake": "95",
  "oreo milkshake": "95",

  // 11. Combos
  "cappuccino + sandwich/burger + brownie with ice cream": "199", 
  "choco frappe + sandwich/burger + brownie": "179",
  "cappuccino + red sauce pasta": "169",
  "klubnika coffee + garlic bread": "89", 
  "mint mojito + chicken tikka pizza": "215",
  "chicken pizza + mint mojito": "215"
};

function updateFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // We match title: "...", then optional description and other props, then price: "₹..."
    // Note: [\s\S]*? is used instead of .*? to match across multiple lines
    const regex = /(title:\s*")([^"]+)("[\s\S]*?price:\s*")₹(\d+)(")/g;
    
    const newContent = content.replace(regex, (match, prefix, title, middle, oldPrice, suffix) => {
        const titleLower = title.toLowerCase().trim();
        let newPrice = oldPrice;
        
        if (prices[titleLower]) {
            newPrice = prices[titleLower];
            console.log(`Updated ${title} from ${oldPrice} to ${newPrice}`);
        } else {
            console.log(`Warning: Title not found in price map: ${title}`);
        }
        
        return `${prefix}${title}${middle}₹${newPrice}${suffix}`;
    });
    
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`Updated ${filePath}`);
}

const frontendFile = path.join(__dirname, 'frontend', 'src', 'constants', 'index.jsx');
const backendFile = path.join(__dirname, 'backend', 'src', 'seed.js');

updateFile(frontendFile);
updateFile(backendFile);
