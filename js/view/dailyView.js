import View from "./View.js";

class dailyView extends View {
  _parentElement = document.querySelector(".weather-daily-forecast");

  _clearContent() {
    this._parentElement.innerHTML = "";
  }
  _generateMarkup() {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var day = new Date();

    var nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 1);

    let date;
    let html = "";
    for (let i = 0; i < 5; i++) {
      if (i === 0) {
        date = "Morning";
      } else {
        nextDay.setDate(day.getDate() + i);
        date = `${String(nextDay.getDate()).padStart(2, "0")} ${
          months[nextDay.getMonth()]
        }`;
      }
      html += `
      <div class="weather-partial-part">
          <h4 class="weather-part-name">${date}</h4>
          <p class="weather-part-degree">${this._data[i].temp.day.toFixed(
            1
          )}&deg</p>
          <p class='weather-part-degree-small'>${this._data[
            i
          ].temp.night.toFixed(1)}&deg</p>
          <div class="hourly-icon-div">
              <img class="icon-cloud" src='http://openweathermap.org/img/wn/${
                this._data[i].weather[0].icon
              }@2x.png'>
          </div>
          <div class='icon-umbrella-div'>
              <img class="icon-umbrella" src='icons/icon-umbrella.svg'>
              <p class='umbrella-text'>%${
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
      "<h3>Daily Forecast</h3>" +
      html +
      `<button class="next-hours-btn">
    <p class="next-hours-btn-txt">Next 10 days</p>
  </button>`;
    return markup;
  }
}

export default new dailyView();
