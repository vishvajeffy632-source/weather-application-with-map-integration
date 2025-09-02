const apiKey = "15d611732dcd4541012e7e23be192078"; // <-- Replace this with your OpenWeatherMap API key
let map;

function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) return alert("Please enter a city name");

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => {
      const { name, weather, main, wind, coord } = data;
      document.getElementById("weather").innerHTML = `
        <h2>Weather in ${name}</h2>
        <p><strong>${weather[0].description}</strong></p>
        <p>🌡️ Temp: ${main.temp} °C</p>
        <p>💧 Humidity: ${main.humidity}%</p>
        <p>🌬️ Wind: ${wind.speed} m/s</p>
      `;
      updateMap(coord.lat, coord.lon);
    })
    .catch(error => {
      document.getElementById("weather").innerHTML = `<p>${error.message}</p>`;
    });
}

function updateMap(lat, lon) {
  if (!map) {
    map = L.map("map").setView([lat, lon], 10);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors"
    }).addTo(map);
  } else {
    map.setView([lat, lon], 10);
  }
  L.marker([lat, lon]).addTo(map).bindPopup("Location").openPopup();
}
