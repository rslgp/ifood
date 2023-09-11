// Initialize the map
const map = L.map('map').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Global variable to store marker
let marker = null;

// Function to handle map click
function onMapClick(e) {
    if (marker) {
        map.removeLayer(marker);
    }
    marker = L.marker(e.latlng).addTo(map);
}

map.on('click', onMapClick);


function createProductCard(product) {
  const card = document.createElement("div");
  card.classList.add("product-card");

  const productName = document.createElement("h2");
  productName.textContent = product["nome-mercado"];

  const price = document.createElement("p");
  price.textContent = `Price: $${product["preco"].toFixed(2)}`;

  const weight = document.createElement("p");
  weight.textContent = `Weight: ${product["peso"]}g`;

  const pricePerGram = document.createElement("p");
  pricePerGram.textContent = `Price per Gram: $${product["preco-por-g"].toFixed(5)}`;

  const productCategory = document.createElement("p");
  productCategory.textContent = `Category: ${product["categoria"]}`;

  const marketId = document.createElement("p");
  marketId.textContent = `Market ID: ${product["marketid"]}`;

  card.appendChild(productName);
  card.appendChild(price);
  card.appendChild(weight);
  card.appendChild(pricePerGram);
  card.appendChild(productCategory);
  card.appendChild(marketId);

  return card;
}

function displayProductCards(products) {
  const productCardsContainer = document.getElementById("productCards");
  productCardsContainer.innerHTML = ""; // Clear previous cards

  products.forEach((product) => {
    const card = createProductCard(product);
    productCardsContainer.appendChild(card);
  });
}

// Display product cards when the page loads

// Function to search for a product
function searchProduct() {
    const productName = document.getElementById('productName').value;
    if (!productName || !marker) {
        alert('Please enter a product name and click on the map to define coordinates.');
        return;
    }

    const latitude = marker.getLatLng().lat;
    const longitude = marker.getLatLng().lng;

    // Make an API request
    const apiUrl = `https://gkl3bso2q6.execute-api.sa-east-1.amazonaws.com/default/ifood?term=${productName}&lat=${latitude}&lon=${longitude}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Display the result on the page
            //const resultDiv = document.getElementById('result');
            //resultDiv.innerHTML = JSON.stringify(data, null, 2);
            displayProductCards(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
