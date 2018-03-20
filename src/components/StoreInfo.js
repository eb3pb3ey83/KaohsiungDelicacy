import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import './style.css';
 
const propTypes = {
  storeInfo: PropTypes.array,
}
export default class StoreInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navButtonData: [],
      activeIdx: 0,
    }
    this.renderNav = this.renderNav.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      navButtonData: nextProps.storeInfo.map(
        (val) => ({
          name: val.name,
          area: val.area,
          add: val.add,
        })
      )
    });
  }
  renderNav() {
    const {
      activeIdx,
      navButtonData,
    } = this.state;
    return (
      <ul className="nav">
        {
          navButtonData.length === 0 ? 
            <li className="store_info active">很抱歉，沒有搜索到任何結果喔</li>
          :
          navButtonData.map((val, idx) => 
            <li
              className={(() => {
                let className;
                if (activeIdx === idx) {
                  className = 'nav_item active';
                } else {
                  className = 'nav_item';
                }
                return className;
              })()}            
              key={uniqueId()}
              onClick={() => {
                this.setState({
                  activeIdx: idx,
                })
              }}
            >
              <h3>{val.name}</h3>
              <div>{val.area}</div>
              <div>{val.add}</div>        
            </li>
          )           
        }
      </ul>
    );

  }
  renderContent() {
    const { storeInfo } = this.props;
    const { activeIdx } = this.state;
    return (
      <ul className="content">
        {
          storeInfo.map((val, idx) => 
            <li 
              key={uniqueId()}
              className={(() => {
                let className;
                if (activeIdx === idx) {
                  className = 'store_info active';
                } else {
                  className = 'store_info';
                }
                return className;
              })()}
            >
              <img src={val.pic} alt="img" />              
              <h2>{val.name}</h2>
              <div>地址：{val.add}</div>
              <div>營業時間：{val.opentime}</div>
              <div className="store_tel">電話：{val.tel}</div>
              <div className="store_desc">{val.description}</div>
            </li>
          )
        }
      </ul>
    );
  }
  render() {
    const { isDataFetched } = this.props;
    return (
      isDataFetched ? 
        <div className="box">
          {this.renderNav()}
          {this.renderContent()}
        </div>
      :
      <div id="loading">
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
        網頁讀取中，請稍等...
      </div>
    )
  }
}
StoreInfo.propTypes = propTypes;