import TABLE_DATA from "./table.data.types";

const INITIAL_STATE = {
  tableData: [],
  coordinates: {
    lat: 34.80746,
    lng: -40.4796,
  },
  zoom: 3,
  mapCountry: [],
  casesType: "cases",
};

const tableDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TABLE_DATA.SET_COUNTRY_INFO:
      return {
        ...state,
        tableData: action.payload,
      };
    case TABLE_DATA.SET_COORDINATES:
      return {
        ...state,
        coordinates: {
          lat: action.payload.lat,
          lng: action.payload.lng,
        },
      };
    case TABLE_DATA.SET_ZOOM:
      return {
        ...state,
        zoom: action.payload,
      };
    case TABLE_DATA.SET_MAP_COUNTRY:
      return {
        ...state,
        mapCountry: action.payload,
      };
    case TABLE_DATA.SET_CASES_TYPE:
      return {
        ...state,
        casesType: action.payload,
      };
    default:
      return state;
  }
};

export default tableDataReducer;
