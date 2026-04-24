const API_KEY = "e7bbed663ec76a4b20006cc2e3ef888b";

async function getWeather() {
  const city = document.getElementById("city").value;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const temp = data.main.temp;
    const weather = data.weather[0].main;
    const wind = data.wind.speed;

    document.getElementById("weatherResult").innerHTML = `
      <p>🌡 Temp: ${temp}°C</p>
      <p>🌤 Condition: ${weather}</p>
      <p>💨 Wind: ${wind} m/s</p>
    `;

    giveAdvice(temp, weather, wind);

  } catch (error) {
    document.getElementById("weatherResult").innerText = "Error fetching data";
  }
}

function giveAdvice(temp, weather, wind) {
  let advice = "";

  // Packing suggestions
  if (temp < 15) {
    advice += "🧥 Pack warm clothes. ";
  } else if (temp > 30) {
    advice += "🥵 Pack light clothes and water. ";
  } else {
    advice += "👕 Light clothing is fine. ";
  }

  // Weather conditions
  if (weather.includes("Rain")) {
    advice += "🌧 Take an umbrella. ";
  }

  if (wind > 10) {
    advice += "💨 It's windy, secure loose items. ";
  }

  // Event suggestion
  if (weather.includes("Rain") || wind > 12) {
    advice += "⚠️ Consider rescheduling outdoor events.";
  } else {
    advice += "✅ Good weather for outdoor activities!";
  }

  document.getElementById("advice").innerText = advice;
}