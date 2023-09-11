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
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
