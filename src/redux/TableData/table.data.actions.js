import TABLE_DATA from "./table.data.types";

export const getCountryData = (data) => ({
  type: TABLE_DATA.SET_COUNTRY_INFO,
  payload: data,
});

export const setCoordinates = (data) => ({
  type: TABLE_DATA.SET_COORDINATES,
  payload: data,
});

export const setZoom = (data) => ({
  type: TABLE_DATA.SET_ZOOM,
  payload: data,
});

export const setMapCountry = (data) => ({
  type: TABLE_DATA.SET_MAP_COUNTRY,
  payload: data,
});

export const setCasesType = (data) => ({
  type: TABLE_DATA.SET_CASES_TYPE,
  payload: data,
});
