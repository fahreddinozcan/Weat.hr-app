import View from "./View.js";

class detailedView extends View {
  _parentElement = document.querySelector(".weather-current-detailed");
  _dataCategories = [
    "High/Low",
    "Wind",
    "Humidity",
    "Dew Point",
    "Pressure",
    "UV Index",
    "Visibility",
    "Moon Phase",
  ];

  _clearContent() {
    this._parentElement.innerHTML = "";
  }

  _generateMarkup() {
    const html = `
            <h3 class="weather-header">Weather Today in Ankara,Turkey</h3>
          <div class="weather-current-degree">

            <p class="weather-current-degree-text">${
              this._data.temp.max
            }&deg</p>
            <p class="weather-feels-like"></p>
          </div>
          <div class="daylight"></div>
          <div class="weather-current-section">
            <img src='icons/icon-thermometer.svg' class="weather-current-icon">
            <h5 class='weather-current-head'>High / Low</h5>
            <h5 class="weather-current-desc">${this._data.temp.min}&deg / ${
      this._data.temp.max
    }&deg</h5>
          </div>
          <div class="weather-current-section">
            <img src='icons/icon-wind.svg' class="weather-current-icon">
            <h5 class='weather-current-head'>Wind</h5>
            <h5 class="weather-current-desc">${this._data.wind_speed} km/h</h5>
          </div>
          <div class="weather-current-section">
            <img src='icons/icon-drop.svg' class="weather-current-icon">
            <h5 class='weather-current-head'>Humidity</h5>
            <h5 class="weather-current-desc">${this._data.humidity}%</h5>
          </div>
          <div class="weather-current-section">
            <img src='icons/icon-drop.svg' class="weather-current-icon dew-point">
            <h5 class='weather-current-head dew-point'>Dew Point</h5>
            <h5 class="weather-current-desc">${this._data.dew_point}&deg</h5>
          </div>
          <div class="weather-current-section">
            <img src='icons/icon-pressure.svg' class="weather-current-icon">
            <h5 class='weather-current-head'>Pressure</h5>
            <h5 class="weather-current-desc">${this._data.pressure} mb</h5>
          </div>
          <div class="weather-current-section">
            <img src='icons/icon-sun.svg' class="weather-current-icon">
            <h5 class='weather-current-head'>UV Index</h5>
            <h5 class="weather-current-desc">${this._data.uvi}</h5>
          </div>
          <div class="weather-current-section">
            <img src='icons/icon-eye.svg' class="weather-current-icon">
            <h5 class='weather-current-head'>Visibility</h5>
            <h5 class="weather-current-desc">${this._data.clouds / 10} km</h5>
          </div>
          <div class="weather-current-section">
            <img src='icons/icon-moon.svg' class="weather-current-icon">
            <h5 class='weather-current-head'>Moon Phase</h5>
            <h5 class="weather-current-desc">${this._data.moon_phase}</h5>
          </div>
      `;
    return html;
  }
}

export default new detailedView();
