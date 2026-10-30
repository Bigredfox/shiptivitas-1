import React from 'react';
import Dragula from 'dragula';
import 'dragula/dist/dragula.css';
import Swimlane from './Swimlane';
import './Board.css';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    const clients = this.getClients();
    this.state = {
      clients: {
        backlog: clients,
        inProgress: [],
        complete: [],
      }
    }
    this.swimlanes = {
      backlog: React.createRef(),
      inProgress: React.createRef(),
      complete: React.createRef(),
    }
  }
  componentDidMount() {
    this.drake = Dragula(Object.values(this.swimlanes).map(ref => ref.current), {
      revertOnSpill: true,
    });
    this.drake.on('drag', (element, source) => {
      this.dragOrigin = { source, sibling: element.nextSibling };
    });
    this.drake.on('drop', element => {
      const statuses = { backlog: 'backlog', inProgress: 'in-progress', complete: 'complete' };
      const byId = {};
      Object.values(this.state.clients).forEach(clients => {
        clients.forEach(client => { byId[client.id] = client; });
      });
      const clients = {};
      Object.keys(this.swimlanes).forEach(lane => {
        clients[lane] = Array.from(this.swimlanes[lane].current.children).map(card => ({
          ...byId[card.dataset.id], status: statuses[lane],
        }));
      });
      // Restore React's expected DOM before it reconciles the new order and status.
      this.dragOrigin.source.insertBefore(element, this.dragOrigin.sibling);
      this.setState({ clients });
      this.dragOrigin = null;
    });
  }

  componentWillUnmount() {
    this.drake.destroy();
  }

  getClients() {
    return [
      ['1','Stark, White and Abbott','Cloned Optimal Architecture', 'in-progress'],
      ['2','Wiza LLC','Exclusive Bandwidth-Monitored Implementation', 'complete'],
      ['3','Nolan LLC','Vision-Oriented 4Thgeneration Graphicaluserinterface', 'backlog'],
      ['4','Thompson PLC','Streamlined Regional Knowledgeuser', 'in-progress'],
      ['5','Walker-Williamson','Team-Oriented 6Thgeneration Matrix', 'in-progress'],
      ['6','Boehm and Sons','Automated Systematic Paradigm', 'backlog'],
      ['7','Runolfsson, Hegmann and Block','Integrated Transitional Strategy', 'backlog'],
      ['8','Schumm-Labadie','Operative Heuristic Challenge', 'backlog'],
      ['9','Kohler Group','Re-Contextualized Multi-Tasking Attitude', 'backlog'],
      ['10','Romaguera Inc','Managed Foreground Toolset', 'backlog'],
      ['11','Reilly-King','Future-Proofed Interactive Toolset', 'complete'],
      ['12','Emard, Champlin and Runolfsdottir','Devolved Needs-Based Capability', 'backlog'],
      ['13','Fritsch, Cronin and Wolff','Open-Source 3Rdgeneration Website', 'complete'],
      ['14','Borer LLC','Profit-Focused Incremental Orchestration', 'backlog'],
      ['15','Emmerich-Ankunding','User-Centric Stable Extranet', 'in-progress'],
      ['16','Willms-Abbott','Progressive Bandwidth-Monitored Access', 'in-progress'],
      ['17','Brekke PLC','Intuitive User-Facing Customerloyalty', 'complete'],
      ['18','Bins, Toy and Klocko','Integrated Assymetric Software', 'backlog'],
      ['19','Hodkiewicz-Hayes','Programmable Systematic Securedline', 'backlog'],
      ['20','Murphy, Lang and Ferry','Organized Explicit Access', 'backlog'],
    ].map(companyDetails => ({
      id: companyDetails[0],
      name: companyDetails[1],
      description: companyDetails[2],
      status: 'backlog',
    }));
  }
  renderSwimlane(name, clients, ref) {
    return (
      <Swimlane name={name} clients={clients} dragulaRef={ref}/>
    );
  }

  render() {
    return (
      <div className="Board">
        <header className="Board-heading">
          <div><h1>Shipping requests</h1><p>{Object.values(this.state.clients).reduce((total, clients) => total + clients.length, 0)} requests · {this.state.clients.backlog.length} waiting to start</p></div>
          <span className="Board-view">Kanban board</span>
        </header>
        <div className="Board-toolbar"><span>All requests</span><span>Drag cards to update progress</span></div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              {this.renderSwimlane('Backlog', this.state.clients.backlog, this.swimlanes.backlog)}
            </div>
            <div className="col-md-4">
              {this.renderSwimlane('In Progress', this.state.clients.inProgress, this.swimlanes.inProgress)}
            </div>
            <div className="col-md-4">
              {this.renderSwimlane('Complete', this.state.clients.complete, this.swimlanes.complete)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
