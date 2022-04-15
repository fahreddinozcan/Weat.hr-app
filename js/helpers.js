import { KEY } from "./config.js";
export const getJSON = async function (url) {
  try {
    const res = await fetch(url);

    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} ${res.status}`);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const findLocation = async function () {
  const resCoord = await new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

  const { latitude: lat, longitude: lng } = resCoord.coords;

  const resPlace = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
  const place = await resPlace.json();
  console.log(place);
  return place;
};

export const getPredictions = async function (query) {
  const displaySuggestions = (predictions, status) => {
    if (status != google.maps.places.PlacesServiceStatus.OK) {
      console.error(status);
      return;
    }
    return predictions;
  };

  const service = new google.maps.places.AutocompleteService({
    types: ["cities"],
  });
  if (query === "") return;
  const data = service.getPlacePredictions(
    {
      input: `${query}`,
      types: ["(cities)"],
    },
    displaySuggestions
  );
  return data;
};
