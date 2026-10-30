import React from 'react';
import ReactDOM from 'react-dom';
import Dragula from 'dragula';
import Board from './Board';

jest.mock('dragula', () => jest.fn(() => ({ on: jest.fn(), destroy: jest.fn() })));

let root;
let board;
let handlers;
let lanes;

beforeEach(() => {
  root = document.createElement('div');
  document.body.appendChild(root);
  board = ReactDOM.render(<Board />, root);
  handlers = {};
  board.drake.on.mock.calls.forEach(([event, handler]) => { handlers[event] = handler; });
  lanes = root.querySelectorAll('.Swimlane-dragColumn');
});

afterEach(() => {
  ReactDOM.unmountComponentAtNode(root);
  root.remove();
});

function move(card, target, sibling = null) {
  handlers.drag(card, card.parentNode);
  target.insertBefore(card, sibling);
  handlers.drop(card, target);
}

it('starts all 20 requests in Backlog across exactly three lanes', () => {
  expect(lanes).toHaveLength(3);
  expect(lanes[0].children).toHaveLength(20);
  expect(lanes[1].children).toHaveLength(0);
  expect(lanes[2].children).toHaveLength(0);
  expect(root.querySelectorAll('.Card-grey')).toHaveLength(20);
  expect(Dragula).toHaveBeenLastCalledWith(Array.from(lanes), { revertOnSpill: true });
});

it('keeps upward and downward reordering through subsequent renders', () => {
  const firstId = lanes[0].firstChild.dataset.id;
  move(lanes[0].firstChild, lanes[0]);
  expect(lanes[0].lastChild.dataset.id).toBe(firstId);
  move(lanes[0].lastChild, lanes[0], lanes[0].firstChild);
  board.forceUpdate();
  expect(lanes[0].firstChild.dataset.id).toBe(firstId);
  expect(lanes[0].children).toHaveLength(20);
});

it('moves into empty lanes, updates colors, and preserves destination order', () => {
  const firstId = lanes[0].firstChild.dataset.id;
  move(lanes[0].firstChild, lanes[1]);
  expect(lanes[1].firstChild.classList.contains('Card-blue')).toBe(true);
  move(lanes[0].firstChild, lanes[1], lanes[1].firstChild);
  expect(lanes[1].lastChild.dataset.id).toBe(firstId);
  move(lanes[1].lastChild, lanes[2]);
  expect(lanes[2].firstChild.classList.contains('Card-green')).toBe(true);
  move(lanes[2].firstChild, lanes[0], lanes[0].firstChild);
  expect(lanes[0].firstChild.classList.contains('Card-grey')).toBe(true);
  expect(root.querySelectorAll('.Card')).toHaveLength(20);
});

it('destroys the drag controller when unmounted', () => {
  const drake = board.drake;
  ReactDOM.unmountComponentAtNode(root);
  expect(drake.destroy).toHaveBeenCalledTimes(1);
});
