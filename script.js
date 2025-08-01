const apikey = "1c7263c0265f9ac94251333b96bf0467";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(`${apiurl}${city}&appid=${apikey}`);
if (!response.ok) {
    document.querySelector(".error").style.display = "block"; 
    document.querySelector(".weather").style.display = "none"; 
    return;
}

        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "pics/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "pics/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "pics/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "pics/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "pics/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value.trim());
});
