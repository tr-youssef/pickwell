import React, { useState } from "react";

// Mock orders data - in real app, this would come from backend
const mockOrders = [
  {
    id: "ORD-001234",
    orderNumber: "001234",
    barcodeNumber: "847362951024",
    pickupDate: "2025-10-24",
    pickupTime: "10:00",
    location: "Calgary Food Bank",
    itemCount: 12,
    items: [
      { id: 1, name: "Big Potatos", image: "https://www.kindpng.com/picc/m/7-75753_potato-png-image-transparent-potato-white-background-png.png", quantity: 2, points: 2 },
      { id: 2, name: "Green Apple", image: "https://previews.123rf.com/images/atoss/atoss1112/atoss111200217/11684106-green-apples-and-half-of-apple-isolated-on-a-white-background.jpg", quantity: 3, points: 2 },
      { id: 3, name: "Baguette", image: "https://www.kindpng.com/picc/m/290-2909780_baguette-bread-png-free-download-baguette-transparent-png.png", quantity: 2, points: 1 },
      { id: 4, name: "Fresh Carrots", image: "https://previews.123rf.com/images/annete/annete1205/annete120500047/13693972-fresh-carrot-fruits-with-green-leaves-isolated-on-white-background.jpg", quantity: 2, points: 2 },
      { id: 5, name: "Red Tomato", image: "https://previews.123rf.com/images/iava777/iava7771204/iava777120400170/13116840-one-red-tomato-isolated-on-a-white-background.jpg", quantity: 4, points: 1 },
      { id: 6, name: "Cucumber", image: "https://www.kindpng.com/picc/m/691-6914263_cucumber-transparent-png-download-png-download.png", quantity: 3, points: 1 },
      { id: 7, name: "Croissant", image: "https://www.kindpng.com/picc/m/77-775639_croissant-png-transparent-png.png", quantity: 4, points: 1 },
      { id: 8, name: "Juice Box", image: "https://www.kindpng.com/picc/m/202-2023123_transparent-minute-maid-png-juice-box-transparent-background.png", quantity: 3, points: 1 },
      { id: 9, name: "Chips Bag", image: "https://i.ebayimg.com/images/g/nC0AAOSw6X9l3m71/s-l400.jpg", quantity: 2, points: 1 },
      { id: 10, name: "Soda - Canada Dry", image: "https://canadadry.ca/wp-content/uploads/2021/02/GingerAleCan-FR.png", quantity: 3, points: 1 },
      { id: 11, name: "Fresh Cauliflower", image: "https://st2.depositphotos.com/1223667/12260/i/950/depositphotos_122604726-stock-photo-cauliflower-isolated-on-white-background.jpg", quantity: 1, points: 3 },
      { id: 12, name: "Eggplant", image: "https://www.kindpng.com/picc/m/246-2461517_eggplant-png-transparent-png.png", quantity: 2, points: 3 }
    ],
    status: "pending",
    createdAt: "2025-10-19T14:30:00"
  },
  {
    id: "ORD-001235",
    orderNumber: "001235",
    barcodeNumber: "293847561038",
    pickupDate: "2025-10-26",
    pickupTime: "14:00",
    location: "Satellite 3",
    itemCount: 15,
    items: [
      { id: 1, name: "Strawberry", image: "https://www.kindpng.com/picc/m/31-317090_strawberry-png-images-strawberry-png-transparent-png.png", quantity: 2, points: 2 },
      { id: 2, name: "Pineapple", image: "https://www.kindpng.com/picc/m/3-35833_free-png-pineapple-png-pineapple-png-transparent-png.png", quantity: 1, points: 4 },
      { id: 3, name: "Chocolate Bar", image: "https://www.lindt.ca/media/catalog/product/7/2/72528d3bc91d65134e8d95de6fe9592014d58763f20e52bdbd2599e60d8ca46d.png?quality=80&fit=bounds&height=700&width=700&canvas=700:700", quantity: 3, points: 1 },
      { id: 4, name: "Big Potatos", image: "https://www.kindpng.com/picc/m/7-75753_potato-png-image-transparent-potato-white-background-png.png", quantity: 3, points: 2 },
      { id: 5, name: "Chanise Cabbage", image: "https://www.kindpng.com/picc/m/409-4096495_napa-cabbage-png-transparent-png.png", quantity: 2, points: 2 },
      { id: 6, name: "Baguette", image: "https://www.kindpng.com/picc/m/290-2909780_baguette-bread-png-free-download-baguette-transparent-png.png", quantity: 3, points: 1 },
      { id: 7, name: "Green Apple", image: "https://previews.123rf.com/images/atoss/atoss1112/atoss111200217/11684106-green-apples-and-half-of-apple-isolated-on-a-white-background.jpg", quantity: 4, points: 2 },
      { id: 8, name: "Cucumber", image: "https://www.kindpng.com/picc/m/691-6914263_cucumber-transparent-png-download-png-download.png", quantity: 2, points: 1 },
      { id: 9, name: "Croissant", image: "https://www.kindpng.com/picc/m/77-775639_croissant-png-transparent-png.png", quantity: 5, points: 1 },
      { id: 10, name: "Red Tomato", image: "https://previews.123rf.com/images/iava777/iava7771204/iava777120400170/13116840-one-red-tomato-isolated-on-a-white-background.jpg", quantity: 3, points: 1 },
      { id: 11, name: "Juice Box", image: "https://www.kindpng.com/picc/m/202-2023123_transparent-minute-maid-png-juice-box-transparent-background.png", quantity: 4, points: 1 },
      { id: 12, name: "Fresh Carrots", image: "https://previews.123rf.com/images/annete/annete1205/annete120500047/13693972-fresh-carrot-fruits-with-green-leaves-isolated-on-white-background.jpg", quantity: 2, points: 2 },
      { id: 13, name: "Chips Bag", image: "https://i.ebayimg.com/images/g/nC0AAOSw6X9l3m71/s-l400.jpg", quantity: 3, points: 1 },
      { id: 14, name: "Soda - Canada Dry", image: "https://canadadry.ca/wp-content/uploads/2021/02/GingerAleCan-FR.png", quantity: 2, points: 1 },
      { id: 15, name: "Chili Pepper", image: "https://cdn.mos.cms.futurecdn.net/3arbJYmatsPrWcrCX8cdVc.jpg", quantity: 2, points: 2 }
    ],
    status: "pending",
    createdAt: "2025-10-19T15:45:00"
  },
  {
    id: "ORD-001236",
    orderNumber: "001236",
    barcodeNumber: "562938471065",
    pickupDate: "2025-10-28",
    pickupTime: "11:00",
    location: "Satellite 1",
    itemCount: 13,
    items: [
      { id: 1, name: "Pineapple", image: "https://www.kindpng.com/picc/m/3-35833_free-png-pineapple-png-pineapple-png-transparent-png.png", quantity: 2, points: 4 },
      { id: 2, name: "Red Tomato", image: "https://previews.123rf.com/images/iava777/iava7771204/iava777120400170/13116840-one-red-tomato-isolated-on-a-white-background.jpg", quantity: 3, points: 1 },
      { id: 3, name: "Croissant", image: "https://www.kindpng.com/picc/m/77-775639_croissant-png-transparent-png.png", quantity: 4, points: 1 },
      { id: 4, name: "Ladies Finger", image: "https://www.kindpng.com/picc/m/329-3295396_okra-hd-png-download.png", quantity: 2, points: 3 },
      { id: 5, name: "Fresh Cauliflower", image: "https://st2.depositphotos.com/1223667/12260/i/950/depositphotos_122604726-stock-photo-cauliflower-isolated-on-white-background.jpg", quantity: 2, points: 3 },
      { id: 6, name: "Baguette", image: "https://www.kindpng.com/picc/m/290-2909780_baguette-bread-png-free-download-baguette-transparent-png.png", quantity: 3, points: 1 },
      { id: 7, name: "Juice Box", image: "https://www.kindpng.com/picc/m/202-2023123_transparent-minute-maid-png-juice-box-transparent-background.png", quantity: 5, points: 1 },
      { id: 8, name: "Green Apple", image: "https://previews.123rf.com/images/atoss/atoss1112/atoss111200217/11684106-green-apples-and-half-of-apple-isolated-on-a-white-background.jpg", quantity: 3, points: 2 },
      { id: 9, name: "Chips Bag", image: "https://i.ebayimg.com/images/g/nC0AAOSw6X9l3m71/s-l400.jpg", quantity: 2, points: 1 },
      { id: 10, name: "Cucumber", image: "https://www.kindpng.com/picc/m/691-6914263_cucumber-transparent-png-download-png-download.png", quantity: 4, points: 1 },
      { id: 11, name: "Chocolate Bar", image: "https://www.lindt.ca/media/catalog/product/7/2/72528d3bc91d65134e8d95de6fe9592014d58763f20e52bdbd2599e60d8ca46d.png?quality=80&fit=bounds&height=700&width=700&canvas=700:700", quantity: 2, points: 1 },
      { id: 12, name: "Soda - Canada Dry", image: "https://canadadry.ca/wp-content/uploads/2021/02/GingerAleCan-FR.png", quantity: 3, points: 1 },
      { id: 13, name: "Fresh Carrots", image: "https://previews.123rf.com/images/annete/annete1205/annete120500047/13693972-fresh-carrot-fruits-with-green-leaves-isolated-on-white-background.jpg", quantity: 2, points: 2 }
    ],
    status: "ready",
    createdAt: "2025-10-19T16:20:00"
  },
  {
    id: "ORD-001237",
    orderNumber: "001237",
    barcodeNumber: "718293645072",
    pickupDate: "2025-10-25",
    pickupTime: "09:00",
    location: "Satellite 5",
    itemCount: 11,
    items: [
      { id: 1, name: "Eggplant", image: "https://www.kindpng.com/picc/m/246-2461517_eggplant-png-transparent-png.png", quantity: 2, points: 3 },
      { id: 2, name: "Juice Box", image: "https://www.kindpng.com/picc/m/202-2023123_transparent-minute-maid-png-juice-box-transparent-background.png", quantity: 4, points: 1 },
      { id: 3, name: "Strawberry", image: "https://www.kindpng.com/picc/m/31-317090_strawberry-png-images-strawberry-png-transparent-png.png", quantity: 2, points: 2 },
      { id: 4, name: "Big Potatos", image: "https://www.kindpng.com/picc/m/7-75753_potato-png-image-transparent-potato-white-background-png.png", quantity: 3, points: 2 },
      { id: 5, name: "Croissant", image: "https://www.kindpng.com/picc/m/77-775639_croissant-png-transparent-png.png", quantity: 4, points: 1 },
      { id: 6, name: "Baguette", image: "https://www.kindpng.com/picc/m/290-2909780_baguette-bread-png-free-download-baguette-transparent-png.png", quantity: 2, points: 1 },
      { id: 7, name: "Red Tomato", image: "https://previews.123rf.com/images/iava777/iava7771204/iava777120400170/13116840-one-red-tomato-isolated-on-a-white-background.jpg", quantity: 5, points: 1 },
      { id: 8, name: "Chips Bag", image: "https://i.ebayimg.com/images/g/nC0AAOSw6X9l3m71/s-l400.jpg", quantity: 3, points: 1 },
      { id: 9, name: "Green Apple", image: "https://previews.123rf.com/images/atoss/atoss1112/atoss111200217/11684106-green-apples-and-half-of-apple-isolated-on-a-white-background.jpg", quantity: 2, points: 2 },
      { id: 10, name: "Soda - Canada Dry", image: "https://canadadry.ca/wp-content/uploads/2021/02/GingerAleCan-FR.png", quantity: 4, points: 1 },
      { id: 11, name: "Chanise Cabbage", image: "https://www.kindpng.com/picc/m/409-4096495_napa-cabbage-png-transparent-png.png", quantity: 1, points: 2 }
    ],
    status: "completed",
    createdAt: "2025-10-18T10:15:00"
  },
  {
    id: "ORD-001238",
    orderNumber: "001238",
    barcodeNumber: "485729361048",
    pickupDate: "2025-10-27",
    pickupTime: "15:00",
    location: "Satellite 2",
    itemCount: 12,
    items: [
      { id: 1, name: "Big Potatos", image: "https://www.kindpng.com/picc/m/7-75753_potato-png-image-transparent-potato-white-background-png.png", quantity: 2, points: 2 },
      { id: 2, name: "Green Apple", image: "https://previews.123rf.com/images/atoss/atoss1112/atoss111200217/11684106-green-apples-and-half-of-apple-isolated-on-a-white-background.jpg", quantity: 3, points: 2 },
      { id: 3, name: "Baguette", image: "https://www.kindpng.com/picc/m/290-2909780_baguette-bread-png-free-download-baguette-transparent-png.png", quantity: 2, points: 1 },
      { id: 4, name: "Fresh Carrots", image: "https://previews.123rf.com/images/annete/annete1205/annete120500047/13693972-fresh-carrot-fruits-with-green-leaves-isolated-on-white-background.jpg", quantity: 2, points: 2 },
      { id: 5, name: "Red Tomato", image: "https://previews.123rf.com/images/iava777/iava7771204/iava777120400170/13116840-one-red-tomato-isolated-on-a-white-background.jpg", quantity: 4, points: 1 },
      { id: 6, name: "Cucumber", image: "https://www.kindpng.com/picc/m/691-6914263_cucumber-transparent-png-download-png-download.png", quantity: 3, points: 1 },
      { id: 7, name: "Croissant", image: "https://www.kindpng.com/picc/m/77-775639_croissant-png-transparent-png.png", quantity: 4, points: 1 },
      { id: 8, name: "Juice Box", image: "https://www.kindpng.com/picc/m/202-2023123_transparent-minute-maid-png-juice-box-transparent-background.png", quantity: 3, points: 1 },
      { id: 9, name: "Chips Bag", image: "https://i.ebayimg.com/images/g/nC0AAOSw6X9l3m71/s-l400.jpg", quantity: 2, points: 1 },
      { id: 10, name: "Soda - Canada Dry", image: "https://canadadry.ca/wp-content/uploads/2021/02/GingerAleCan-FR.png", quantity: 3, points: 1 },
      { id: 11, name: "Fresh Cauliflower", image: "https://st2.depositphotos.com/1223667/12260/i/950/depositphotos_122604726-stock-photo-cauliflower-isolated-on-white-background.jpg", quantity: 1, points: 3 },
      { id: 12, name: "Eggplant", image: "https://www.kindpng.com/picc/m/246-2461517_eggplant-png-transparent-png.png", quantity: 2, points: 3 }
    ],
    status: "pending",
    createdAt: "2025-10-19T11:20:00"
  },
  {
    id: "ORD-001239",
    orderNumber: "001239",
    barcodeNumber: "629384751096",
    pickupDate: "2025-10-23",
    pickupTime: "13:00",
    location: "Satellite 6",
    itemCount: 15,
    items: [
      { id: 1, name: "Strawberry", image: "https://www.kindpng.com/picc/m/31-317090_strawberry-png-images-strawberry-png-transparent-png.png", quantity: 2, points: 2 },
      { id: 2, name: "Pineapple", image: "https://www.kindpng.com/picc/m/3-35833_free-png-pineapple-png-pineapple-png-transparent-png.png", quantity: 1, points: 4 },
      { id: 3, name: "Chocolate Bar", image: "https://www.lindt.ca/media/catalog/product/7/2/72528d3bc91d65134e8d95de6fe9592014d58763f20e52bdbd2599e60d8ca46d.png?quality=80&fit=bounds&height=700&width=700&canvas=700:700", quantity: 3, points: 1 },
      { id: 4, name: "Big Potatos", image: "https://www.kindpng.com/picc/m/7-75753_potato-png-image-transparent-potato-white-background-png.png", quantity: 3, points: 2 },
      { id: 5, name: "Chanise Cabbage", image: "https://www.kindpng.com/picc/m/409-4096495_napa-cabbage-png-transparent-png.png", quantity: 2, points: 2 },
      { id: 6, name: "Baguette", image: "https://www.kindpng.com/picc/m/290-2909780_baguette-bread-png-free-download-baguette-transparent-png.png", quantity: 3, points: 1 },
      { id: 7, name: "Green Apple", image: "https://previews.123rf.com/images/atoss/atoss1112/atoss111200217/11684106-green-apples-and-half-of-apple-isolated-on-a-white-background.jpg", quantity: 4, points: 2 },
      { id: 8, name: "Cucumber", image: "https://www.kindpng.com/picc/m/691-6914263_cucumber-transparent-png-download-png-download.png", quantity: 2, points: 1 },
      { id: 9, name: "Croissant", image: "https://www.kindpng.com/picc/m/77-775639_croissant-png-transparent-png.png", quantity: 5, points: 1 },
      { id: 10, name: "Red Tomato", image: "https://previews.123rf.com/images/iava777/iava7771204/iava777120400170/13116840-one-red-tomato-isolated-on-a-white-background.jpg", quantity: 3, points: 1 },
      { id: 11, name: "Juice Box", image: "https://www.kindpng.com/picc/m/202-2023123_transparent-minute-maid-png-juice-box-transparent-background.png", quantity: 4, points: 1 },
      { id: 12, name: "Fresh Carrots", image: "https://previews.123rf.com/images/annete/annete1205/annete120500047/13693972-fresh-carrot-fruits-with-green-leaves-isolated-on-white-background.jpg", quantity: 2, points: 2 },
      { id: 13, name: "Chips Bag", image: "https://i.ebayimg.com/images/g/nC0AAOSw6X9l3m71/s-l400.jpg", quantity: 3, points: 1 },
      { id: 14, name: "Soda - Canada Dry", image: "https://canadadry.ca/wp-content/uploads/2021/02/GingerAleCan-FR.png", quantity: 2, points: 1 },
      { id: 15, name: "Chili Pepper", image: "https://cdn.mos.cms.futurecdn.net/3arbJYmatsPrWcrCX8cdVc.jpg", quantity: 2, points: 2 }
    ],
    status: "ready",
    createdAt: "2025-10-19T09:15:00"
  },
  {
    id: "ORD-001240",
    orderNumber: "001240",
    barcodeNumber: "937284651027",
    pickupDate: "2025-10-29",
    pickupTime: "16:00",
    location: "Calgary Food Bank",
    itemCount: 13,
    items: [
      { id: 1, name: "Pineapple", image: "https://www.kindpng.com/picc/m/3-35833_free-png-pineapple-png-pineapple-png-transparent-png.png", quantity: 2, points: 4 },
      { id: 2, name: "Red Tomato", image: "https://previews.123rf.com/images/iava777/iava7771204/iava777120400170/13116840-one-red-tomato-isolated-on-a-white-background.jpg", quantity: 3, points: 1 },
      { id: 3, name: "Croissant", image: "https://www.kindpng.com/picc/m/77-775639_croissant-png-transparent-png.png", quantity: 4, points: 1 },
      { id: 4, name: "Ladies Finger", image: "https://www.kindpng.com/picc/m/329-3295396_okra-hd-png-download.png", quantity: 2, points: 3 },
      { id: 5, name: "Fresh Cauliflower", image: "https://st2.depositphotos.com/1223667/12260/i/950/depositphotos_122604726-stock-photo-cauliflower-isolated-on-white-background.jpg", quantity: 2, points: 3 },
      { id: 6, name: "Baguette", image: "https://www.kindpng.com/picc/m/290-2909780_baguette-bread-png-free-download-baguette-transparent-png.png", quantity: 3, points: 1 },
      { id: 7, name: "Juice Box", image: "https://www.kindpng.com/picc/m/202-2023123_transparent-minute-maid-png-juice-box-transparent-background.png", quantity: 5, points: 1 },
      { id: 8, name: "Green Apple", image: "https://previews.123rf.com/images/atoss/atoss1112/atoss111200217/11684106-green-apples-and-half-of-apple-isolated-on-a-white-background.jpg", quantity: 3, points: 2 },
      { id: 9, name: "Chips Bag", image: "https://i.ebayimg.com/images/g/nC0AAOSw6X9l3m71/s-l400.jpg", quantity: 2, points: 1 },
      { id: 10, name: "Cucumber", image: "https://www.kindpng.com/picc/m/691-6914263_cucumber-transparent-png-download-png-download.png", quantity: 4, points: 1 },
      { id: 11, name: "Chocolate Bar", image: "https://www.lindt.ca/media/catalog/product/7/2/72528d3bc91d65134e8d95de6fe9592014d58763f20e52bdbd2599e60d8ca46d.png?quality=80&fit=bounds&height=700&width=700&canvas=700:700", quantity: 2, points: 1 },
      { id: 12, name: "Soda - Canada Dry", image: "https://canadadry.ca/wp-content/uploads/2021/02/GingerAleCan-FR.png", quantity: 3, points: 1 },
      { id: 13, name: "Fresh Carrots", image: "https://previews.123rf.com/images/annete/annete1205/annete120500047/13693972-fresh-carrot-fruits-with-green-leaves-isolated-on-white-background.jpg", quantity: 2, points: 2 }
    ],
    status: "ready",
    createdAt: "2025-10-18T14:45:00"
  },
  {
    id: "ORD-001241",
    orderNumber: "001241",
    barcodeNumber: "374829561034",
    pickupDate: "2025-10-30",
    pickupTime: "12:00",
    location: "Satellite 4",
    itemCount: 11,
    items: [
      { id: 1, name: "Eggplant", image: "https://www.kindpng.com/picc/m/246-2461517_eggplant-png-transparent-png.png", quantity: 2, points: 3 },
      { id: 2, name: "Juice Box", image: "https://www.kindpng.com/picc/m/202-2023123_transparent-minute-maid-png-juice-box-transparent-background.png", quantity: 4, points: 1 },
      { id: 3, name: "Strawberry", image: "https://www.kindpng.com/picc/m/31-317090_strawberry-png-images-strawberry-png-transparent-png.png", quantity: 2, points: 2 },
      { id: 4, name: "Big Potatos", image: "https://www.kindpng.com/picc/m/7-75753_potato-png-image-transparent-potato-white-background-png.png", quantity: 3, points: 2 },
      { id: 5, name: "Croissant", image: "https://www.kindpng.com/picc/m/77-775639_croissant-png-transparent-png.png", quantity: 4, points: 1 },
      { id: 6, name: "Baguette", image: "https://www.kindpng.com/picc/m/290-2909780_baguette-bread-png-free-download-baguette-transparent-png.png", quantity: 2, points: 1 },
      { id: 7, name: "Red Tomato", image: "https://previews.123rf.com/images/iava777/iava7771204/iava777120400170/13116840-one-red-tomato-isolated-on-a-white-background.jpg", quantity: 5, points: 1 },
      { id: 8, name: "Chips Bag", image: "https://i.ebayimg.com/images/g/nC0AAOSw6X9l3m71/s-l400.jpg", quantity: 3, points: 1 },
      { id: 9, name: "Green Apple", image: "https://previews.123rf.com/images/atoss/atoss1112/atoss111200217/11684106-green-apples-and-half-of-apple-isolated-on-a-white-background.jpg", quantity: 2, points: 2 },
      { id: 10, name: "Soda - Canada Dry", image: "https://canadadry.ca/wp-content/uploads/2021/02/GingerAleCan-FR.png", quantity: 4, points: 1 },
      { id: 11, name: "Chanise Cabbage", image: "https://www.kindpng.com/picc/m/409-4096495_napa-cabbage-png-transparent-png.png", quantity: 1, points: 2 }
    ],
    status: "pending",
    createdAt: "2025-10-19T08:30:00"
  },
  {
    id: "ORD-001242",
    orderNumber: "001242",
    barcodeNumber: "826374951042",
    pickupDate: "2025-10-31",
    pickupTime: "10:30",
    location: "Satellite 7",
    itemCount: 12,
    items: [
      { id: 1, name: "Big Potatos", image: "https://www.kindpng.com/picc/m/7-75753_potato-png-image-transparent-potato-white-background-png.png", quantity: 2, points: 2 },
      { id: 2, name: "Green Apple", image: "https://previews.123rf.com/images/atoss/atoss1112/atoss111200217/11684106-green-apples-and-half-of-apple-isolated-on-a-white-background.jpg", quantity: 3, points: 2 },
      { id: 3, name: "Baguette", image: "https://www.kindpng.com/picc/m/290-2909780_baguette-bread-png-free-download-baguette-transparent-png.png", quantity: 2, points: 1 },
      { id: 4, name: "Fresh Carrots", image: "https://previews.123rf.com/images/annete/annete1205/annete120500047/13693972-fresh-carrot-fruits-with-green-leaves-isolated-on-white-background.jpg", quantity: 2, points: 2 },
      { id: 5, name: "Red Tomato", image: "https://previews.123rf.com/images/iava777/iava7771204/iava777120400170/13116840-one-red-tomato-isolated-on-a-white-background.jpg", quantity: 4, points: 1 },
      { id: 6, name: "Cucumber", image: "https://www.kindpng.com/picc/m/691-6914263_cucumber-transparent-png-download-png-download.png", quantity: 3, points: 1 },
      { id: 7, name: "Croissant", image: "https://www.kindpng.com/picc/m/77-775639_croissant-png-transparent-png.png", quantity: 4, points: 1 },
      { id: 8, name: "Juice Box", image: "https://www.kindpng.com/picc/m/202-2023123_transparent-minute-maid-png-juice-box-transparent-background.png", quantity: 3, points: 1 },
      { id: 9, name: "Chips Bag", image: "https://i.ebayimg.com/images/g/nC0AAOSw6X9l3m71/s-l400.jpg", quantity: 2, points: 1 },
      { id: 10, name: "Soda - Canada Dry", image: "https://canadadry.ca/wp-content/uploads/2021/02/GingerAleCan-FR.png", quantity: 3, points: 1 },
      { id: 11, name: "Fresh Cauliflower", image: "https://st2.depositphotos.com/1223667/12260/i/950/depositphotos_122604726-stock-photo-cauliflower-isolated-on-white-background.jpg", quantity: 1, points: 3 },
      { id: 12, name: "Eggplant", image: "https://www.kindpng.com/picc/m/246-2461517_eggplant-png-transparent-png.png", quantity: 2, points: 3 }
    ],
    status: "completed",
    createdAt: "2025-10-18T16:00:00"
  },
  {
    id: "ORD-001243",
    orderNumber: "001243",
    barcodeNumber: "594728361058",
    pickupDate: "2025-11-01",
    pickupTime: "14:30",
    location: "Satellite 1",
    itemCount: 15,
    items: [
      { id: 1, name: "Strawberry", image: "https://www.kindpng.com/picc/m/31-317090_strawberry-png-images-strawberry-png-transparent-png.png", quantity: 2, points: 2 },
      { id: 2, name: "Pineapple", image: "https://www.kindpng.com/picc/m/3-35833_free-png-pineapple-png-pineapple-png-transparent-png.png", quantity: 1, points: 4 },
      { id: 3, name: "Chocolate Bar", image: "https://www.lindt.ca/media/catalog/product/7/2/72528d3bc91d65134e8d95de6fe9592014d58763f20e52bdbd2599e60d8ca46d.png?quality=80&fit=bounds&height=700&width=700&canvas=700:700", quantity: 3, points: 1 },
      { id: 4, name: "Big Potatos", image: "https://www.kindpng.com/picc/m/7-75753_potato-png-image-transparent-potato-white-background-png.png", quantity: 3, points: 2 },
      { id: 5, name: "Chanise Cabbage", image: "https://www.kindpng.com/picc/m/409-4096495_napa-cabbage-png-transparent-png.png", quantity: 2, points: 2 },
      { id: 6, name: "Baguette", image: "https://www.kindpng.com/picc/m/290-2909780_baguette-bread-png-free-download-baguette-transparent-png.png", quantity: 3, points: 1 },
      { id: 7, name: "Green Apple", image: "https://previews.123rf.com/images/atoss/atoss1112/atoss111200217/11684106-green-apples-and-half-of-apple-isolated-on-a-white-background.jpg", quantity: 4, points: 2 },
      { id: 8, name: "Cucumber", image: "https://www.kindpng.com/picc/m/691-6914263_cucumber-transparent-png-download-png-download.png", quantity: 2, points: 1 },
      { id: 9, name: "Croissant", image: "https://www.kindpng.com/picc/m/77-775639_croissant-png-transparent-png.png", quantity: 5, points: 1 },
      { id: 10, name: "Red Tomato", image: "https://previews.123rf.com/images/iava777/iava7771204/iava777120400170/13116840-one-red-tomato-isolated-on-a-white-background.jpg", quantity: 3, points: 1 },
      { id: 11, name: "Juice Box", image: "https://www.kindpng.com/picc/m/202-2023123_transparent-minute-maid-png-juice-box-transparent-background.png", quantity: 4, points: 1 },
      { id: 12, name: "Fresh Carrots", image: "https://previews.123rf.com/images/annete/annete1205/annete120500047/13693972-fresh-carrot-fruits-with-green-leaves-isolated-on-white-background.jpg", quantity: 2, points: 2 },
      { id: 13, name: "Chips Bag", image: "https://i.ebayimg.com/images/g/nC0AAOSw6X9l3m71/s-l400.jpg", quantity: 3, points: 1 },
      { id: 14, name: "Soda - Canada Dry", image: "https://canadadry.ca/wp-content/uploads/2021/02/GingerAleCan-FR.png", quantity: 2, points: 1 },
      { id: 15, name: "Chili Pepper", image: "https://cdn.mos.cms.futurecdn.net/3arbJYmatsPrWcrCX8cdVc.jpg", quantity: 2, points: 2 }
    ],
    status: "ready",
    createdAt: "2025-10-17T13:20:00"
  }
];

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState("pending");

  // Status priority for sorting: pending = 1, ready = 2, completed = 3
  const getStatusPriority = (status) => {
    switch (status) {
      case "pending": return 1;
      case "ready": return 2;
      case "completed": return 3;
      default: return 4;
    }
  };

  const filteredOrders = (() => {
    let orders = statusFilter === "all" 
      ? mockOrders 
      : mockOrders.filter(order => order.status === statusFilter);
    
    // Sort by status priority first, then by pickup date within each status
    if (statusFilter === "all") {
      orders = [...orders].sort((a, b) => {
        // First, sort by status priority (pending -> ready -> completed)
        const statusCompare = getStatusPriority(a.status) - getStatusPriority(b.status);
        if (statusCompare !== 0) return statusCompare;
        
        // If status is the same, sort by pickup date
        return new Date(a.pickupDate) - new Date(b.pickupDate);
      });
    }
    
    return orders;
  })();

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "ready": return "bg-green-100 text-green-800";
      case "completed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
              statusFilter === "all" 
                ? "bg-green-600 text-white" 
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            All Orders ({mockOrders.length})
          </button>
          <button
            onClick={() => setStatusFilter("pending")}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
              statusFilter === "pending" 
                ? "bg-yellow-600 text-white" 
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Pending ({mockOrders.filter(o => o.status === "pending").length})
          </button>
          <button
            onClick={() => setStatusFilter("ready")}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
              statusFilter === "ready" 
                ? "bg-green-600 text-white" 
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Ready ({mockOrders.filter(o => o.status === "ready").length})
          </button>
          <button
            onClick={() => setStatusFilter("completed")}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
              statusFilter === "completed" 
                ? "bg-gray-600 text-white" 
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Completed ({mockOrders.filter(o => o.status === "completed").length})
          </button>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer p-4 sm:p-6 border-2 border-transparent hover:border-green-500"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-base sm:text-lg font-bold text-gray-900">#{order.orderNumber}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                  {getStatusLabel(order.status)}
                </span>
              </div>
              
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <span>🏷️</span>
                  <span className="font-mono text-xs">{order.barcodeNumber}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span>📅</span>
                  <span>{order.pickupDate}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span>🕐</span>
                  <span>{order.pickupTime}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span>📍</span>
                  <span className="truncate">{order.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span>📦</span>
                  <span>{order.itemCount} items</span>
                </div>
              </div>

              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-500">
                  Created: {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-base sm:text-lg">No orders found</p>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900">Order #{selectedOrder.orderNumber}</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-4 sm:p-6">
              {/* Order Info */}
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="sm:col-span-2">
                    <span className="text-xs sm:text-sm text-gray-600">Barcode Number</span>
                    <p className="font-mono font-bold text-base sm:text-lg text-gray-900">{selectedOrder.barcodeNumber}</p>
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm text-gray-600">Pickup Date</span>
                    <p className="font-semibold text-sm sm:text-base text-gray-900">{selectedOrder.pickupDate}</p>
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm text-gray-600">Pickup Time</span>
                    <p className="font-semibold text-sm sm:text-base text-gray-900">{selectedOrder.pickupTime}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-xs sm:text-sm text-gray-600">Location</span>
                    <p className="font-semibold text-sm sm:text-base text-gray-900">{selectedOrder.location}</p>
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm text-gray-600">Status</span>
                    <p className="mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedOrder.status)}`}>
                        {getStatusLabel(selectedOrder.status)}
                      </span>
                    </p>
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm text-gray-600">Total Items</span>
                    <p className="font-semibold text-sm sm:text-base text-gray-900">{selectedOrder.itemCount}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Order Items</h3>
              <div className="space-y-2 sm:space-y-3">
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 sm:gap-4 bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:border-green-300 transition">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm sm:text-base text-gray-900 truncate">{item.name}</h4>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {item.points} pts × {item.quantity} = {item.points * item.quantity} pts
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-base sm:text-lg font-bold text-green-600">×{item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-base sm:text-lg font-semibold">Total Points</span>
                  <span className="text-xl sm:text-2xl font-bold text-green-600">
                    {selectedOrder.items.reduce((sum, item) => sum + (item.points * item.quantity), 0)} pts
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 sm:mt-6 flex gap-2 sm:gap-3">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
                >
                  Close
                </button>
                <button
                  className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
