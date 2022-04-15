import { getJSON, findLocation, getPredictions } from "./helpers.js";
import { GEO_API, KEY } from "./config.js";
export const state = {
  curPos: {
    city: "",
    country: "",
  },
  search: {
    query: "",
    predictions: [],
  },
  lastSubmit: {
    city: "",
    country: "",
    id: "",
    latitude: "",
    longitude: "",
  },
  weatherCurrent: {},
  weatherHourly: {},
  weatherDaily: {},
  firstLoad: true,
  calendarData: {},
};
export const loadWeather = async function (lat, lng) {
  const data = await getWeather(lat, lng);
  console.log(data);
  console.log(data.current);
};

export const findPlace = async function () {
  try {
    const place = await findLocation();
    const { city, country } = place;
    state.curPos.city = city;
    state.curPos.country = country;
    return { city, country };
  } catch (err) {
    console.error(err);
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const { predictions } = await getPredictions(query);
    state.search.predictions = predictions.map((prediction) => {
      return {
        id: prediction.place_id,
        city: prediction.structured_formatting.main_text,
        country: prediction.structured_formatting.secondary_text
          ? prediction.structured_formatting.secondary_text
          : "",
      };
    });
  } catch (err) {
    throw new Error(err);
  }
};
export const getCurrentSubmission = function (e) {
  const btn = e.currentTarget;
};
export const getGeocode = async function (city) {
  try {
    const res = await fetch(
      `https://geocode.xyz/${city}?json=1&auth=${GEO_API}`
    );
    const data = await res.json();
    state.lastSubmit.latitude = data.latt;
    state.lastSubmit.longitude = data.longt;
  } catch (err) {
    console.error(err);
  }
};

export const getWeather = async function (lat, lng) {
  try {
    const time = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&exclude=minutely,alerts&appid=${KEY}`
    );
    const data = await res.json();
    state.weatherDaily = data.daily;
    state.weatherHourly = data.hourly;
    if (state.firstLoad === true) {
      state.weatherCurrent = {
        time: time,
        location: "Ankara, Turkey",
        temp: data.current.temp,
        weather: data.current.weather[0].description,
        dayTemp: data.daily[0].temp.day,
        nightTemp: data.daily[0].temp.night,
        icon: data.current.weather[0].icon,
      };

      state.firstLoad = false;
    } else {
      state.weatherCurrent = {
        time: time,
        location: `${state.lastSubmit.city}, ${state.lastSubmit.country}`,
        temp: data.current.temp,
        weather: data.current.weather[0].description,
        dayTemp: data.daily[0].temp.day,
        nightTemp: data.daily[0].temp.night,
        icon: data.current.weather[0].icon,
      };
    }
  } catch (err) {}
};
export const getCalendar = function (year, month, day) {
  state.calendarData.startingDay;
};
