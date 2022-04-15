export default class View {
  _data;
  renderError = function (message = this._errMessage) {
    const markup = `<div class="error-div">
          <i class="ph-warning-bold error-icon"></i>
          <p class="error-text">${message}</p>
        </div>;`;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  };
  renderMessage = function (message = this._errMessage) {
    const markup = `<div class="error-div">
          <i class="ph-smiley-bold error-icon"></i>
          <p class="error-text">${message}</p>
        </div>;`;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  };
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    let markup = this._generateMarkup();

    this._clear();
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }
  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner = function () {
    const Markup = `<img class="spinner-icon" src="icons/icon-spinner.svg">`;
    if (this._parentElement.contains(document.querySelector(".spinner-icon")))
      return;
    this._clearContent();
    this._parentElement.insertAdjacentHTML("beforeend", Markup);
  };
}
