import View from "./View.js";
class currentView extends View {
  _parentElement = document.querySelector(".weather-current");
  _clearContent() {
    this._parentElement.innerHTML = "";
  }
  _generateMarkup() {
    return `
        <div class="location-text-div">
            <p class="location-text">
                <b>${this._data.location}</b> as of ${this._data.time}
            </p>
        </div>
        <div class="weather-degrees">
            <h1 class="degree">${this._data.temp}&deg</h1>
            <h2 class='weather-state'>${this._data.weather}</h2>
            <h2 class="weather-daynight">Day ${this._data.dayTemp.toFixed(
              1
            )}&deg &middot Night ${this._data.nightTemp.toFixed(1)}&deg</h2>
        </div>
        <div class="weather-icon">
            <img src="http://openweathermap.org/img/wn/${
              this._data.icon
            }@2x.png" class="weather-icon-icon">
        </div>
        `;
  }
}

export default new currentView();
