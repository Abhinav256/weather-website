let show = document.getElementById("show");
let search = document.getElementById("search");
let cityVal = document.getElementById("city");

function animateValue(id, start, end, duration) {
    let range = end - start;
    let current = start;
    let increment = end > start ? 1 : -1;
    let stepTime = Math.abs(Math.floor(duration / range));
    let obj = document.getElementById(id);
    let timer = setInterval(() => {
        current += increment;
        obj.innerHTML = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}

let getWeather = () => {
    let cityValue = cityVal.value;
    if (cityValue.length === 0) {
        show.innerHTML = `<h3 class="error">Please enter a city name</h3>`;
        return;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=7090918a71ec9403f16ae1b9411a34de&units=metric`;
    cityVal.value = "";

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Logging the data received from the API
            const tempElement = document.getElementById('temperature');
            show.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <h4 class="weather">${data.weather[0].main}</h4>
                <h4 class="desc">${data.weather[0].description}</h4>
                <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${data.weather[0].description}">
                <h1><span id="temperature">${Math.round(data.main.temp)}</span> &#176;C</h1>
                <div class="temp_container">
                    <div>
                        <h4 class="title">Humidity</h4>
                        <h4 class="temp">${data.main.humidity} %</h4>
                    </div>
                    <div>
                        <h4 class="title">Wind Speed</h4>
                        <h4 class="temp">${data.wind.speed} m/s</h4>
                    </div>
                    <div>
                        <h4 class="title">Visibility</h4>
                        <h4 class="temp">${(data.visibility / 1000).toFixed(1)} km</h4>
                    </div>
                </div>
            `;

            // Animate temperature value
            animateValue("temperature", 0, Math.round(data.main.temp), 2000);
        })
        .catch(error => {
            show.innerHTML = `<h3 class="error">City not found</h3>`;
        });
};

search.addEventListener("click", getWeather);
window.addEventListener("load", () => {
    // Optionally, you can perform an initial search here or keep it empty
});