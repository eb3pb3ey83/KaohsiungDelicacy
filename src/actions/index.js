import {
  LOAD_LOCATIONS_SUCCESS,
  SEARCH_AREA,
  SEARCH_SHOP_NAME,
} from '../constants/ActionTypes'

export const loadLocations = () => (dispatch) => {
  fetch('https://data.kaohsiung.gov.tw/Opendata/DownLoad.aspx?Type=2&CaseNo1=AV&CaseNo2=2&FileType=1&Lang=C&FolderType=')
  .then((response) => response.json())
  .then((locations) => dispatch({
    type: LOAD_LOCATIONS_SUCCESS,
    locations
  }));
}
export const searchArea = keyword => ({ 
  type: SEARCH_AREA, 
  keyword,
});
export const searchShopName = keyword => ({ 
  type: SEARCH_SHOP_NAME, 
  keyword,
});