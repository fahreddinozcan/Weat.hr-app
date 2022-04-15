import View from "./View.js";

class hourlyView extends View {
  _parentElement = document.querySelector(".weather-hourly-forecast");
  _clearContent() {
    this._parentElement.innerHTML = "";
  }
  _generateMarkup() {
    const dates = ["Now"];
    const time = new Date();
    const hourFull = time.getHours();

    for (let x = 1; x < 5; x++) {
      dates.push(
        `${(hourFull + x) % 12 || 12} ${
          hourFull + x > 24 || hourFull + x <= 12 ? "AM" : "PM"
        }`
      );
    }

    let html = "";
    for (let i = 0; i < 5; i++) {
      html += `
        <div class="weather-partial-part">
            <h4 class="weather-part-name">${dates[i]}</h4>
            <p class="weather-part-degree">${this._data[i].temp.toFixed(
              1
            )}&deg</p>
            <div class="hourly-icon-div">
                <img class="icon-cloud" src='http://openweathermap.org/img/wn/${
                  this._data[i].weather[0].icon
                }@2x.png'>
            </div>
            <div class='icon-umbrella-div'>
                <img class="icon-umbrella" src='icons/icon-umbrella.svg'>
                <p class='umbrella-text'>%${
                  // this._data[i].rain
                  //   ? this._data[i].rain["1h"]
                  //   : this._data[i].snow
                  //   ? this._data[i].snow["1h"]
                  //   : "-"
                  this._data[i].rain && isFinite(this._data[i].rain)
                    ? this._data[i].rain
                    : this._data[i].rain
                    ? this._data[i].rain["1h"]
                    : this._data[i].snow && isFinite(this._data[i].snow)
                    ? this._data[i].snow
                    : this._data[i].snow
                    ? this._data[i].snow
                    : "-"
                }</p>
            </div>
        </div>
        `;
    }
    const markup =
      "<h3>Hourly Forecast</h3>" +
      html +
      `<button class="next-hours-btn">
    <p class="next-hours-btn-txt">Next 48 hours</p>
  </button>`;
    return markup;
  }
}

export default new hourlyView();
