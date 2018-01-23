import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FindTheShop from '../components/FindTheShop';
import StoreInfo from '../components/StoreInfo';
import { 
  loadLocations,
  searchArea,
  searchShopName,
} from '../actions';

const propTypes = {
  loadLocations: PropTypes.func,
  searchArea: PropTypes.func,
  searchShopName: PropTypes.func,
}
class App extends Component {
  componentDidMount() {
    const props = this.props;
    props.loadLocations();
  }
  render() {
    const {
      areas,
      isDataFetched,
      storeInfo,
      searchArea,
      searchShopName,
    } = this.props;
    return (
      <div>
        <FindTheShop 
          areas={areas}
          onSearchArea={searchArea}
          onSearchShopName={searchShopName}
          isDataFetched={isDataFetched}
        />
        <StoreInfo
          storeInfo={storeInfo}
          isDataFetched={isDataFetched}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    isDataFetched,
    areas,
    storeInfo,
  } = state.kaohsiungDelicacy;
  return {
    isDataFetched,
    areas,
    storeInfo,
  }
}

export default connect(
  mapStateToProps,
  { 
    loadLocations,
    searchArea,
    searchShopName,
  }
)(App)
