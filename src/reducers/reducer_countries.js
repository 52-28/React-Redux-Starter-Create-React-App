import { GET_COUNTRIES } from "../actions/index";
import { supportedCurrencyCode } from "../supported_currency";
const initialState = {
  countries: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: getCountriesInfo(action.payload)
      };
  }
  return state;
}

function getCountriesInfo(data) {
  return data
    .map(country => {
      return {
        name: country.name,
        currencyCode: country.currencies[0].code,
        flag: country.flag,
        code: country.alpha3Code
      };
    })
    .filter(c => {
      return supportedCurrencyCode.indexOf(c.currencyCode) > -1;
    });
}
