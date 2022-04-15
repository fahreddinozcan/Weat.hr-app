import View from "./View.js";

class partialView extends View {
  _parentElement = document.querySelector(".weather-partial-forecast");
  _dayParts = ["Morning", "Afternoon", "Evening", "Night"];
  _dayPartsData = ["morn", "day", "eve", "night"];
  _clearContent() {
    this._parentElement.innerHTML = "";
  }
  _generateMarkup() {
    let html = "";
    for (let i = 0; i < 4; i++) {
      html += `
        <div class="weather-partial-part">
            <h4 class="weather-part-name">${this._dayParts[i]}</h4>
            <p class="weather-part-degree">${this._data.temp[
              this._dayPartsData[i]
            ].toFixed(1)}&deg</p>
            <div class="partial-part-icon">
                <img class="icon-cloud" src='http://openweathermap.org/img/wn/${
                  this._data.weather[0].icon
                }@2x.png'>
            </div>
            <div class='icon-umbrella-div'>
                <img class="icon-umbrella" src='icons/icon-umbrella.svg'>
                <p class='umbrella-text'>%${
                  this._data.rain
                    ? this._data.rain
                    : this._data.snow
                    ? this._data.snow
                    : "-"
                }</p>
            </div>
        </div>`;
    }

    const markup =
      "<h3 class='weather-header'>Today's forecast for Ankara, Turkey</h3>" +
      html +
      "\n" +
      "<button class='next-hours-btn'><p class='next-hours-btn-txt'>Next hours</p></button>";

    return markup;
  }
}

export default new partialView();
