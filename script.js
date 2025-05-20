// Shared JavaScript for Balloon.lk supply form validation, stock update, and navigation

// Products data stored as array of objects for easy access
const products = [
  {
    id: "P1",
    name: "AirPods Pro",
    description: "Wireless earbuds with noise cancellation.",
    price: 45000,
    stock: 0,
    categoryID: "C1",
    warehouseID: "W1",
    image: "images/airpods.png"
  },
  {
    id: "P2",
    name: "Smart Watch X1",
    description: "Advanced smartwatch with health tracking.",
    price: 32000,
    stock: 0,
    categoryID: "C2",
    warehouseID: "W1",
    image: "images/smartwatch.png"
  },
  {
    id: "P3",
    name: "Power Bank 10000mAh",
    description: "Compact and fast charging power bank.",
    price: 3500,
    stock: 0,
    categoryID: "C3",
    warehouseID: "W2",
    image: "images/powerbank.png"
  },
  {
    id: "P4",
    name: "Bluetooth Speaker Z3",
    description: "Portable speaker with deep bass sound.",
    price: 8000,
    stock: 0,
    categoryID: "C4",
    warehouseID: "W2",
    image: "images/speaker.png"
  },
  {
    id: "P5",
    name: "Wireless Headphones H9",
    description: "Comfortable headphones with long battery life.",
    price: 28000,
    stock: 0,
    categoryID: "C1",
    warehouseID: "W1",
    image: "images/headphones.png"
  },
  {
    id: "P6",
    name: "Hand Free Mic",
    description: "Hands-free microphone for clear calls.",
    price: 2200,
    stock: 0,
    categoryID: "C5",
    warehouseID: "W3",
    image: "images/handfree.png"
  }
];

// Function to find product index by ID
function findProductIndex(productID) {
  return products.findIndex(p => p.id.toUpperCase() === productID.toUpperCase());
}

// Supply form validation and stock update handler
function handleSupplyFormSubmit(event) {
  event.preventDefault();

  const supplyID = document.getElementById("supplyID").value.trim();
  const productID = document.getElementById("productID").value.trim().toUpperCase();
  const productAmountStr = document.getElementById("productAmount").value.trim();
  const supplyDate = document.getElementById("supplyDate").value;

  const errorDiv = document.getElementById("errorMessage");
  errorDiv.textContent = "";

  // Basic validations
  if (!supplyID || !productID || !productAmountStr || !supplyDate) {
    errorDiv.textContent = "Please fill in all fields.";
    return;
  }

  const productIndex = findProductIndex(productID);
  if (productIndex === -1) {
    errorDiv.textContent = "Error: Product ID does not exist. Stock cannot be added.";
    return;
  }

  const productAmount = parseInt(productAmountStr, 10);
  if (isNaN(productAmount) || productAmount <= 0) {
    errorDiv.textContent = "Please enter a valid positive number for product amount.";
    return;
  }

  // Update stock for the product
  products[productIndex].stock += productAmount;

  // Save updated stocks in localStorage to persist between pages
  localStorage.setItem('balloonProducts', JSON.stringify(products));

  alert(`Stock updated! ${productAmount} units added to ${products[productIndex].name}. New stock: ${products[productIndex].stock}`);

  // Clear form
  document.getElementById("supplyForm").reset();
}

// On page load, try to load stocks from localStorage
function loadStocksFromStorage() {
  const savedProducts = localStorage.getItem('balloonProducts');
  if (savedProducts) {
    const savedArray = JSON.parse(savedProducts);
    savedArray.forEach(savedProd => {
      const idx = findProductIndex(savedProd.id);
      if (idx !== -1) {
        products[idx].stock = savedProd.stock;
      }
    });
  }
}

// For product pages to display product info dynamically based on product ID
function getProductData(productID) {
  const idx = findProductIndex(productID);
  if (idx === -1) return null;
  return products[idx];
}

// Navigation helper
function navigateTo(page) {
  window.location.href = page;
}

// Initialize
loadStocksFromStorage();
