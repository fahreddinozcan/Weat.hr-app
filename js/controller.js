// import { getJSON } from "./helpers";
import searchView from "./view/searchView.js";
import currentView from "./view/currentView.js";
import * as model from "./model.js";
import partialView from "./view/partialView.js";
import detailedView from "./view/detailedView.js";
import hourlyView from "./view/hourlyView.js";
import dailyView from "./view/dailyView.js";

const controlSearchBar = async function () {
  const position = await model.findPlace();

  searchView._inputForm.value = `${position.city}, ${position.country}`;
};
const controlSearchResults = async function () {
  const query = searchView.getQuery();
  if (query === "") {
    model.state.search.query = "";
    return;
  }
  searchView.renderSpinner();
  await model.loadSearchResults(query);

  searchView.render(model.state.search.predictions);
  searchView.addHandlerWeatherResults(controlWeatherResults);
};
const resetSearchResults = function () {
  if (model.state.search.query == "") searchView._clearContent();
};
const controlSearchSubmit = function (city, country, id) {
  model.state.lastSubmit.country = country;
  model.state.lastSubmit.city = city;
  model.state.lastSubmit.id = id;

  searchView._updateInput(`${city}, ${country}`);
};

const controlWeatherResults = async function () {
  try {
    currentView.renderSpinner();
    partialView.renderSpinner();
    detailedView.renderSpinner();
    hourlyView.renderSpinner();
    dailyView.renderSpinner();
    const string = model.state.lastSubmit.city;
    const city = string[0].toUpperCase() + string.slice(1);
    await model.getGeocode(city);

    await model.getWeather(
      model.state.lastSubmit.latitude,
      model.state.lastSubmit.longitude
    );
    // console.log(model.state.weatherCurrent);
    currentView.render(model.state.weatherCurrent);
    console.log(model.state.weatherDaily[0]);
    partialView.render(model.state.weatherDaily[0]);
    detailedView.render(model.state.weatherDaily[0]);
    hourlyView.render(model.state.weatherHourly);
    dailyView.render(model.state.weatherDaily);
  } catch (err) {
    console.error(err);
  }
};
const controlLandingPage = async function () {
  try {
    currentView.renderSpinner();
    partialView.renderSpinner();
    detailedView.renderSpinner();
    hourlyView.renderSpinner();
    dailyView.renderSpinner();
    await model.getWeather(39.93677, 32.84647);
    currentView.render(model.state.weatherCurrent);
    partialView.render(model.state.weatherDaily[0]);
    detailedView.render(model.state.weatherDaily[0]);
    hourlyView.render(model.state.weatherHourly);
    dailyView.render(model.state.weatherDaily);
  } catch (err) {
    console.error(err);
  }
};
// currentView.renderSpinner();
const init = function () {
  controlLandingPage();
  searchView.addHandlerGetLocation(controlSearchBar);
  searchView.addHandlerRenderResults(controlSearchResults);
  searchView.addHandlerResetResults(resetSearchResults);
  searchView.addHandlerSearchSubmit(controlSearchSubmit);
  searchView.addHandlerWeatherResults(controlWeatherResults);
};
init();
const calendarContainer = document.querySelector(".calendar-body-day-numbers");

for (let i = 1; i < 41; i++) {
  let html = `<div class="calendar-day-bg ${
    i === 10 ? "active-day" : ""
  }"><div class="calendar-body-day day ">${i}</div></div>`;

  calendarContainer.insertAdjacentHTML("beforeend", html);
}

console.log(new Date(2022, 3, 1).getDay());
