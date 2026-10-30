import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import HomeTab from './HomeTab';
import Navigation from './Navigation';
import OriginalNavigation from './OriginalNavigation';
import Board from './Board';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: window.location.hash === '#shipping-requests' ? 'shipping-requests' : 'home',
    };
  }
  renderShippingRequests() {
    return (<Board />);
  }

  renderNavigation() {
    const NavigationComponent = this.state.selectedTab === 'home' ? OriginalNavigation : Navigation;
    return (<NavigationComponent
      onClick={(tabName) => this.changeTab(tabName)}
      selectedTab={this.state.selectedTab}
      />);
  }

  renderTabContent() {
    switch(this.state.selectedTab) {
      case 'home':
      default:
        return <HomeTab />;
      case 'shipping-requests':
        return null;
    }
  }
  render() {
    return (
      <div className={'App' + (this.state.selectedTab === 'home' ? ' App--home' : '')}>
        {this.renderNavigation()}

        <main className="App-body">
          {this.renderTabContent()}
          <div hidden={this.state.selectedTab !== 'shipping-requests'}>
            {this.renderShippingRequests()}
          </div>
        </main>
      </div>
    );
  }

  changeTab(tabName) {
    window.history.replaceState(null, '', '#' + tabName);
    this.setState({
      selectedTab: tabName,
    });
  }
}

export default App;
