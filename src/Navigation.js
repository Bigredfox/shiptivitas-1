import React from 'react';

export default class Navigation extends React.Component {
  render() {
    return (
      <aside className="Sidebar">
        <a className="Brand" href="#home" onClick={() => this.props.onClick('home')}><svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true"><path d="M3 7L13 2L23 7V19L13 24L3 19V7Z M3 7L13 12L23 7 M13 12V24 M8 4.5L18 9.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>Shiptivitas</a>
        <div className="Workspace">Shipping workspace</div>
      <ul className="nav nav-tabs" id="myTab" aria-label="Workspace navigation">
        <li className="nav-item">
          <a className={"nav-link " + (this.props.selectedTab === 'home' ? 'active': '')} onClick={() => this.props.onClick("home")}
            id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected={this.props.selectedTab === 'home'}>Home</a>
        </li>
        <li className="nav-item">
          <a className={"nav-link " + (this.props.selectedTab === 'shipping-requests' ? 'active': '')} onClick={() => this.props.onClick("shipping-requests")}
          id="shipping-requests-tab" data-toggle="tab" href="#shipping-requests" role="tab" aria-controls="shipping-requests" aria-selected={this.props.selectedTab === 'shipping-requests'}>Shipping Requests</a>
        </li>
      </ul>
      </aside>
    );
  }
}
