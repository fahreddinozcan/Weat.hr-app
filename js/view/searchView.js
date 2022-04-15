import View from "./View.js";
class searchView extends View {
  _parentElement = document.querySelector(".search-results");
  _inputForm = document.querySelector(".search-input");
  getQuery() {
    return this._inputForm.value;
  }
  _clearInput() {
    this._inputForm.value = "";
  }
  _clearContent() {
    const allResults = document.querySelectorAll(".result");
    allResults.forEach((el) => {
      el.remove();
    });
  }
  _clearSpinner() {
    const spinner = this._parentElement.querySelector(".spinner-icon");
    this._parentElement.removeChild(spinner);
  }
  _updateInput(data) {
    this._inputForm.value = data;
  }
  addHandlerGetLocation(handler) {
    document
      .querySelector(".use-cur-location")
      .addEventListener("click", function () {
        handler();
      });
  }
  addHandlerRenderResults(handler) {
    this._inputForm.addEventListener("input", function (e) {
      e.preventDefault();
      //   console.log("a");
      handler();
    });
  }
  addHandlerResetResults(handler) {
    this._inputForm.addEventListener("focusout", function () {
      handler();
    });
  }
  addHandlerSearchSubmit(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".result");
      if (!btn) return;
      const city = btn.dataset.city;
      const country = btn.dataset.country;
      const id = btn.dataset.id;
      handler(city, country, id);
    });
  }
  addHandlerWeatherResults(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".result");
      if (!btn) return;
      handler(btn.dataset.city);
    });
  }
  _generateMarkup(predictions) {
    return predictions
      .map((prediction) => {
        return `
        <div class="search-result result" data-id=${prediction.id} data-city=${prediction.city} data-country=${prediction.country}>
            <p class="use-cur-loc-text">${prediction.city}, ${prediction.country}</p>
        </div>
      `;
      })
      .join("");
  }
  render(data) {
    const markup = this._generateMarkup(data);
    this._clearContent();
    this._parentElement.insertAdjacentHTML("beforeend", markup);
    this._clearSpinner();
  }
}

export default new searchView();
