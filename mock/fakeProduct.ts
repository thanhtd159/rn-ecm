// fakeProducts.ts

import { ItemProduct } from "@/features/products/store/product-type";

export const fakeProducts: ItemProduct[] = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    description: "<p>Latest Apple flagship with A17 chip</p>",

    price: "1200",
    regular_price: "1400",
    sale_price: "1200",
    on_sale: true,

    average_rating: "4.8",
    rating_count: 120,

    images: [
      {
        id: 11,
        src: "https://via.placeholder.com/600x600.png?text=iPhone+1",
      },
      {
        id: 12,
        src: "https://via.placeholder.com/600x600.png?text=iPhone+2",
      },
    ],

    attributes: [
      {
        id: 1,
        name: "Color",
        options: ["Black", "Silver", "Gold"],
      },
      {
        id: 2,
        name: "Storage",
        options: ["128GB", "256GB"],
      },
    ],

    variations: [
      {
        id: 101,
        price: "1200",
        regular_price: "1400",
        sale_price: "1200",
        on_sale: true,
        attributes: [
          { id: 1, name: "Color", option: "Black" },
          { id: 2, name: "Storage", option: "128GB" },
        ],
      },
      {
        id: 102,
        price: "1300",
        regular_price: "1500",
        sale_price: "1300",
        on_sale: true,
        attributes: [
          { id: 1, name: "Color", option: "Silver" },
          { id: 2, name: "Storage", option: "256GB" },
        ],
      },
    ],

    default_attributes: [{ id: 1, name: "Color", option: "Black" }],
  },

  {
    id: 2,
    name: "Samsung Galaxy S24",
    description: "<p>Flagship Samsung phone</p>",

    price: "900",
    regular_price: "900",
    on_sale: false,

    average_rating: "4.5",
    rating_count: 80,

    images: [
      {
        id: 21,
        src: "https://via.placeholder.com/600x600.png?text=Samsung",
      },
    ],

    attributes: [],
    variations: [],
    default_attributes: [],
  },
];

export const fakeProductsPage = (page: number): ItemProduct[] => {
  return Array.from({ length: 10 }).map((_, i) => ({
    id: page * 100 + i,
    name: `Product ${page}-${i}`,
    description: "<p>Demo product</p>",

    price: "100",
    regular_price: "120",
    on_sale: true,

    average_rating: "4.2",
    rating_count: 10,

    images: [
      {
        src: "https://via.placeholder.com/600x600.png",
      },
    ],

    attributes: [],
    variations: [],
    default_attributes: [],
  }));
};
