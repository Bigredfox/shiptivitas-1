import React from 'react';
import Card from './Card';
import './Swimlane.css';

export default class Swimlane extends React.Component {
  render() {
    const cards = this.props.clients.map(client => {
      return (
        <Card
          key={client.id}
          id={client.id}
          name={client.name}
          description={client.description}
          status={client.status}
        />
      );
    })
    return (
      <div className="Swimlane-column">
        <div className="Swimlane-header"><h2 className="Swimlane-title">{this.props.name}</h2><span className="Swimlane-count">{cards.length}</span></div>
        <div className="Swimlane-dragColumn" ref={this.props.dragulaRef} data-empty={cards.length === 0 ? 'true' : 'false'} data-empty-message={this.props.name === 'Complete' ? 'Completed requests land here' : this.props.name === 'Backlog' ? 'All requests picked up' : 'Ready for the next request'} aria-label={this.props.name + ' requests'}>
          {cards}
        </div>
      </div>);
  }

}
