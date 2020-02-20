import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_RATE_EXCHANGE = "GET_RATE_EXCHANGE";

export function fetchCountries() {
  return function(dispatch) {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      dispatch({ type: GET_COUNTRIES, payload: response.data });
    });
  };
}

export function fetchRateExchange(country) {
  return function(dispatch) {
    axios
      .get(
        `https://api.exchangeratesapi.io/history?start_at=${getLastMonth()}&end_at=${formatedDate(
          new Date()
        )}&base=USD&symbols=${country.currencyCode}`

        )
      .then(response => {
        dispatch({
          type: GET_RATE_EXCHANGE,
          payload: { rates: response.data.rates, ...country }
        });
      });
  };
}

function formatedDate(date) {
  return date.toISOString().split("T")[0];
}

function getLastMonth() {
  let now = new Date();
  now.setMonth(now.getMonth() - 1);
  return formatedDate(now);
}
