import React from 'react';
import './Card.css';

export default class Card extends React.Component {
  render() {
    let className = ['Card'];
    if (this.props.status === 'backlog') {
      className.push('Card-grey');
    } else if (this.props.status === 'in-progress') {
      className.push('Card-blue');
    } else if (this.props.status === 'complete') {
      className.push('Card-green');
    }
    return (
      <div className={className.join(' ')} data-id={this.props.id} data-status={this.props.status}>
        <div className="Card-meta"><span>Request #{this.props.id.padStart(3, '0')}</span><span className="Card-grip" aria-hidden="true">⠿</span></div>
        <div className="Card-title">{this.props.name}</div>
        <p className="Card-description">{this.props.description}</p>
      </div>
    );
  }
}
