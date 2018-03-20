import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FindTheShop from '../components/FindTheShop';
import StoreInfo from '../components/StoreInfo';
import { 
  loadLocations,
  searchArea,
  searchShopName,
} from '../actions';


class App extends Component {
  static propTypes = {
    loadLocations: PropTypes.func,
    searchArea: PropTypes.func,
    searchShopName: PropTypes.func,
  }  
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

const mapDispatchToProps = (dispatch) => {
  console.log('test');
  return bindActionCreators({ 
    loadLocations,
    searchArea,
    searchShopName,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
