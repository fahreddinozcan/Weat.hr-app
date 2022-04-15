import View from "./View.js";
class calendarView extends View {
  _parentElement = document.querySelector(".calendar-body-day-names");

  _generateMarkup() {
    let markup = ``;
    for (let i = 0; i < startingIndex; i++) {
      markup += `<div class="calendar-blank-bg"></div>`;
    }

    for (let i = 1; i < dayNum + 1; i++) {
      markup += `<div class="calendar-day-bg ${
        i === 10 ? "active-day" : ""
      }"><div class="calendar-body-day day ">${i}</div></div>`;
    }

    return markup;
  }
}

export default new calendarView();
