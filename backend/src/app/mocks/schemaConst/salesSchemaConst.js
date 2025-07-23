export const CATEGORY_SCHEMA = Object.freeze({
  SHIRTS: "Shirts",
  TSHIRTS: "T-Shirts",
  JEANS: "Jeans",
  TROUSERS: "Trousers",
  JACKETS: "Jackets",
  DRESSES: "Dresses",
  SKIRTS: "Skirts",
  SHORTS: "Shorts",
  SWEATERS: "Sweaters",
});

// export const SUBCATEGORY_SCHEMA = Object.freeze({
//   // For Shirts
//   CASUAL_SHIRT: "Casual",
//   FORMAL_SHIRT: "Formal",
//   POLO_SHIRT: "Polo",
//   LINEN_SHIRT: "Linen",
//   DENIM_SHIRT: "Denim",

//   // For T-Shirts
//   GRAPHIC_TSHIRT: "Graphic",
//   BASIC_TSHIRT: "Basic",
//   HENLEY_TSHIRT: "Henley",
//   RAGLAN_TSHIRT: "Raglan",
//   VNECK_TSHIRT: "V-Neck",

//   // For Jeans
//   SKINNY_JEANS: "Skinny",
//   STRAIGHT_JEANS: "Straight",
//   BOOTCUT_JEANS: "Bootcut",
//   SLIM_JEANS: "Slim",
//   RELAXED_JEANS: "Relaxed",

//   // For Trousers
//   CHINOS_TROUSERS: "Chinos",
//   CARGO_TROUSERS: "Cargo",
//   FORMAL_TROUSERS: "Formal",
//   TRACK_TROUSERS: "Track Pants",
//   JOGGERS_TROUSERS: "Joggers",

//   // For Jackets
//   BOMBER_JACKET: "Bomber",
//   DENIM_JACKET: "Denim",
//   LEATHER_JACKET: "Leather",
//   PARKA_JACKET: "Parka",
//   BLAZER_JACKET: "Blazer",

//   // For Dresses
//   MAXI_DRESS: "Maxi",
//   MIDI_DRESS: "Midi",
//   MINI_DRESS: "Mini",
//   BODYCON_DRESS: "Bodycon",
//   WRAP_DRESS: "Wrap",

//   // For Skirts
//   ALINE_SKIRT: "A-Line",
//   PENCIL_SKIRT: "Pencil",
//   PLEATED_SKIRT: "Pleated",
//   MAXI_SKIRT: "Maxi",
//   MINI_SKIRT: "Mini",

//   // For Shorts
//   DENIM_SHORTS: "Denim",
//   CARGO_SHORTS: "Cargo",
//   CHINO_SHORTS: "Chino",
//   ATHLETIC_SHORTS: "Athletic",
//   BERMUDA_SHORTS: "Bermuda",

//   // For Sweaters
//   CARDIGAN_SWEATER: "Cardigan",
//   TURTLENECK_SWEATER: "Turtleneck",
//   VNECK_SWEATER: "V-Neck",
//   CREWNECK_SWEATER: "Crew Neck",
//   OVERSIZED_SWEATER: "Oversized",
// });

// export const SUB_CATEGORY_SCHEMA = {
//   STATUS: Object.freeze({
//     ACTIVE: "active",
//     INACTIVE: "inactive",
//   }),
// }

export const SUB_CATEGORY_SCHEMA = {
  STATUS: Object.freeze({
    ACTIVE: "active",
    INACTIVE: "inactive",
  }),
}

export const BRAND_SCHEMA = Object.freeze({
  NIKE: "Nike",
  LEVIS: "Levi's",
  ZARA: "Zara",
  ALLEN_SOLLY: "Allen Solly",
  H_M: "H&M",
  PUMA: "Puma",
  ADIDAS: "Adidas",
  UNIQLO: "Uniqlo",
  GUCCI: "Gucci",
  LOUIS_VUITTON: "Louis Vuitton",
});

export const SIZE_SCHEMA = Object.freeze({
  XS: "XS",
  S: "S",
  M: "M",
  L: "L",
  XL: "XL",
  XXL: "XXL",
  XXXL: "XXXL",
  FREE_SIZE: "Free Size",
});

export const COLOR_SCHEMA = Object.freeze({
  BLACK: "Black",
  WHITE: "White",
  GREY: "Grey",
  BLUE: "Blue",
  RED: "Red",
  GREEN: "Green",
  YELLOW: "Yellow",
  BROWN: "Brown",
  MULTICOLOR: "Multicolor",
});

export const FABRIC_SCHEMA = Object.freeze({
  COTTON: "Cotton",
  POLYESTER: "Polyester",
  WOOL: "Wool",
  LINEN: "Linen",
  SILK: "Silk",
  DENIM: "Denim",
  LEATHER: "Leather",
  BLEND: "Blend",
});

export const DISCOUNT_SCHEMA = Object.freeze({
  ZERO: 0,
  FIVE: 5,
  TEN: 10,
  FIFTEEN: 15,
  TWENTY: 20,
  TWENTY_FIVE: 25,
  THIRTY: 30,
  FORTY: 40,
  FIFTY: 50,
});

export const RATING_SCHEMA = Object.freeze({
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
});
export const ORDER_SCHEMA = {
  STATUS: Object.freeze({
    PENDING: "Pending",
  }),
  COLLECTION_NAME: "Order",
};
// export const COLLECTION_NAME = "Product";


