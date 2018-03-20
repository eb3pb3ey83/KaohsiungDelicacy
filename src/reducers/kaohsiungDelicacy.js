import {
  LOAD_LOCATIONS_SUCCESS,
  SEARCH_AREA,
  SEARCH_SHOP_NAME,
} from '../constants/ActionTypes'

const initialState = {
  isDataFetched: false,
  areas: [],
  areaStores: [],
  storeInfo: [],
  allStoreInfo: [],
}


export default function kaohsiungDelicacy(state = initialState, action) {
  switch (action.type) {
    case LOAD_LOCATIONS_SUCCESS:
      const locations =  JSON.parse(JSON.stringify(action.locations).toLowerCase());
      const allStoreInfo = locations.map(
        (store, idx) => ({
          area: store.add.slice(store.add.indexOf('市') + 1, store.add.indexOf('區') + 1),
          add: store.add,
          id: store.id,
          name: store.name,
          opentime: store.opentime,
          description: store.description,
          pic: store.picture1,
          px: store.px,
          py: store.py,
          tel: store.tel,
          website: store.website,
        })
      );
      const kaoHsiungAreas = Array.from(
        new Set(
          allStoreInfo.map(store => store.area)
        )
      ).filter((val) => val !== '');
      kaoHsiungAreas.splice(0, 0, '所有行政區');
      return Object.assign({}, state, {
        isDataFetched: true,
        areas: kaoHsiungAreas,
        allStoreInfo,
        storeInfo: allStoreInfo,
        areaStores: allStoreInfo,
      });
    case SEARCH_AREA:
      const findAreaStores = () => {
        const { allStoreInfo } = state;
        let searchResult;
        if (action.keyword === '所有行政區') {
          searchResult = allStoreInfo;
        } else {
          searchResult = state.allStoreInfo.filter(val => {
            return val.area === action.keyword;
          });
        }
        return searchResult;
      }
      return Object.assign({}, state, {
        areaStores: findAreaStores(),
        storeInfo: findAreaStores(),
      });
    case SEARCH_SHOP_NAME:
      return Object.assign({}, state, {
        storeInfo: state.areaStores.filter(val => {
          return val.name.indexOf(action.keyword) !== -1;
        }),
      });     
    default:
      return state;
  }
}
