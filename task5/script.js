const searchBtn = document.getElementById("searchBtn");

const cityInput = document.getElementById("cityInput");

const loading = document.getElementById("loading");

const error = document.getElementById("error");

const weatherCard = document.getElementById("weatherCard");

const cityName = document.getElementById("cityName");

const temperature = document.getElementById("temperature");

const condition = document.getElementById("condition");

const weatherIcon = document.getElementById("weatherIcon");

const forecast = document.getElementById("forecast");

const weatherCodes = {
    0:["Clear Sky","☀️"],
    1:["Mainly Clear","🌤"],
    2:["Partly Cloudy","⛅"],
    3:["Cloudy","☁️"],
    45:["Fog","🌫"],
    48:["Fog","🌫"],
    51:["Light Drizzle","🌦"],
    53:["Drizzle","🌦"],
    55:["Heavy Drizzle","🌧"],
    61:["Rain","🌧"],
    63:["Rain","🌧"],
    65:["Heavy Rain","🌧"],
    71:["Snow","❄️"],
    80:["Rain Showers","🌦"],
    95:["Thunderstorm","⛈"]
};

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keypress", function(e){
    if(e.key==="Enter"){
        getWeather();
    }
});

async function getWeather(){

    const city = cityInput.value.trim();

    if(city==="") return;

    loading.classList.remove("hidden");
    weatherCard.classList.add("hidden");
    error.classList.add("hidden");

    try{

        const geoURL =
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;

        const geoResponse = await fetch(geoURL);

        const geoData = await geoResponse.json();

        if(!geoData.results){
            throw new Error("City not found.");
        }

        const location = geoData.results[0];

        const weatherURL =
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&forecast_days=3&timezone=auto`;

        const weatherResponse = await fetch(weatherURL);

        const data = await weatherResponse.json();

        displayWeather(location,data);

    }

    catch(err){

        error.textContent = err.message;
        error.classList.remove("hidden");

    }

    finally{

        loading.classList.add("hidden");

    }

}

function displayWeather(location,data){

    cityName.textContent =
    `${location.name}, ${location.country}`;

    temperature.textContent =
    `${data.current.temperature_2m} °C`;

    const code =
    data.current.weather_code;

    const weather =
    weatherCodes[code] || ["Unknown","❓"];

    condition.textContent = weather[0];

    weatherIcon.src =
    `https://openweathermap.org/img/wn/10d@2x.png`;

    forecast.innerHTML = "";

    data.daily.time.forEach((day,index)=>{

        const code =
        data.daily.weather_code[index];

        const weather =
        weatherCodes[code] || ["Unknown","❓"];

        forecast.innerHTML += `
        <div class="forecast-card">

            <h4>${day}</h4>

            <div style="font-size:40px">
                ${weather[1]}
            </div>

            <p>${weather[0]}</p>

            <p>
                ${data.daily.temperature_2m_max[index]}°
                /
                ${data.daily.temperature_2m_min[index]}°
            </p>

        </div>
        `;
    });

    weatherCard.classList.remove("hidden");

}