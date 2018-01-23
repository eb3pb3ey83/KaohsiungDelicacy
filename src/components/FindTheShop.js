import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { uniqueId } from 'lodash';

const propTypes = {
  areas: PropTypes.array,
  onSearchArea: PropTypes.func,
}
export default class FindTheShop extends Component {
  state = {
    areaValue: '所有行政區',
    shopKeyword: '',
  }
  searchArea = (e) => {
    this.setState({
      areaValue: e.target.value,
      shopKeyword: '',
    })    
    this.props.onSearchArea(e.target.value);
  } 
  searchShop = (e) => {
    this.setState({
      shopKeyword: e.target.value,
    });
    this.props.onSearchShopName(e.target.value);
  }  
  render() {
    const {
      isDataFetched,
      areas,
      onSearchArea,
      onSearchShopName,
    } = this.props;
    const {
      areaValue,
      shopKeyword, 
    } = this.state;
    return (
      <header className={(() => {
        let className;
        if (isDataFetched) {
          className = 'header active';
        } else {
          className = 'header';
        }
        return className;
      })()}>
        {isDataFetched &&
          <div>
            <h2 id="header_title">高雄美食網</h2>
            <div id="select_area">
              <select
                onChange={this.searchArea}
                value={areaValue}
              >
                {areas.map((val, idx) => {
                  return (
                    <option 
                      value={val} 
                      key={uniqueId()}
                    >
                      {val}
                    </option>
                  );
                })}
              </select>
              <input 
                type="text"
                value={shopKeyword}
                onChange={this.searchShop}
                placeholder="搜尋店家名稱..."
              />              
            </div>
          </div>
        }
      </header>
    )
  }
}
FindTheShop.propTypes = propTypes;