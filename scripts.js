// Initialize the map
// Center the map on Nairobi coordinates by default
var map = L.map("map").setView([-1.286389, 36.817223], 10);

// Add OpenStreetMap tiles to the map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

// Function to fetch the town name using the Nominatim API
function getTown() {
  // Get latitude and longitude values from the input fields
  var lat = document.getElementById("latitude").value;
  var lng = document.getElementById("longitude").value;

  // Validate the inputs
  if (!lat || !lng) {
    document.getElementById("townResult").innerText =
      "Please enter valid coordinates.";
    return;
  }

  // Nominatim API URL
  // This API fetches reverse geocoding information based on latitude and longitude
  var url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

  // Fetch data from the Nominatim API
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Check if the API returned valid data
      if (data && data.address) {
        // Extract the town, city, or village name from the API response
        var town = data.address.town;
        data.address.city;
        data.address.village;
        ("Unknown location");

        // Update the result section with the fetched town name
        document.getElementById("townResult").innerText = `Town: ${town}`;

        // Center the map on the provided coordinates
        map.setView([lat, lng], 12);

        // Add a marker at the specified coordinates
        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(`Location: ${town}`)
          .openPopup();
      } else {
        document.getElementById("townResult").innerText = "No results found";
      }
    })
    .catch((error) => {
      // Handle any errors during the fetch request
      document.getElementById("townResult").innerText =
        "Failed to fetch town name. Please try again.";
      console.error(error);
    });
}

// Add an event listener to the button to call the getTown function
document.getElementById("getTownButton").addEventListener("click", getTown);
