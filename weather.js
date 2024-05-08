document.addEventListener('DOMContentLoaded', function () {

    let cities = [
        { name: "Benbrook, TX",
        latitude: 32.6732,
        longitude: -97.4606 },
        { name: "Austin, TX",
        latitude: 35.6732,
        longitude: -99.4606 },
    ];
    const citySelect = document.getElementById('citySelect');
    cities.forEach(city => {
        const option = document.createElement('option');
        option.textContent = city.name;
        option.value = JSON.stringify(city);
        citySelect.appendChild(option);
    });
    document.getElementById('citySelect').addEventListener('change', handleNewSelect);
    function handleNewSelect() {
        let selectedCity = JSON.parse(document.getElementById('citySelect').value);
        console.log(selectedCity);

        let lookupUrl = `https://api.weather.gov/points/${selectedCity.latitude},${selectedCity.longitude}`;

        fetch(lookupUrl)
            .then(response => response.json())
            .then(data => {
                let weatherUrl = data.properties.forecast;
                getWeather(weatherUrl);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }
    function getWeather(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                let forecastArray = data.properties.periods;
                displayWeather(forecastArray);
        });
    }
    function displayWeather(forecastArray) {
        let table = document.getElementById("userTable");
        for(let i=0; i<forecastArray.length; i++) {
            let row = table.insertRow(-1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(1);
            let cell4 = row.insertCell(1);
            cell1.innerHTML = ("Name: " + forecastArray[i].name);
            cell2.innerHTML = ("Temperature: " + forecastArray[i].temperature);
            cell3.innerHTML = ("Winds: " + forecastArray[i].windSpeed + " " + forecastArray[i].windSpeed);
            cell4.innerHTML = ("Forecast: " + forecastArray[i].shortForecast);
        }
    }
    
});