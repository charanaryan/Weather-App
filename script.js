let key = "5ebc6a6ba4b9e169833429b0a9a0f888";
const form = document.getElementById("form");
let city = document.getElementById("city");
const result = document.querySelector("#result");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeather();
});

let getWeather = async () => {
  let cityValue = city.value;
  // If input field is empty
  if (cityValue.length == 0) {
    result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`;
  } else {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
    // Clear the input field
    city.value = "";

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      console.log(data);
      result.innerHTML = `<h2>${data.name}</h2>
            <h4 class="weather">${data.weather[0].main}</h4>
            <h4 class="desc">${data.weather[0].description}</h4>
            <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
            <h1>${data.main.temp} &#176;</h1>
          <div class="temp-container">
          <div>
          <h4 class="title">min</h4>
          <h4 class="temp">${data.main.temp_min}&#176;</h4>
          </div>
          <div>
          <h4 class="title">max</h4>
          <h4 class="temp">${data.main.temp_max}&#176;</h4>
          </div>
          </div>`;
    } catch (error) {
      // If city name is NOT valid
      result.innerHTML = `<h3 class="msg">${error.message}</h3>`;
    }
  }
};
