import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('preserves shipping requests when switching tabs', () => {
  const div = document.createElement('div');
  const app = ReactDOM.render(<App />, div);
  app.changeTab('shipping-requests');
  const card = div.querySelector('.Card');
  const board = div.querySelector('.Board');
  app.changeTab('home');
  expect(board.parentNode.hidden).toBe(true);
  app.changeTab('shipping-requests');
  expect(div.querySelector('.Board')).toBe(board);
  expect(div.querySelector('.Card')).toBe(card);
  expect(board.parentNode.hidden).toBe(false);
  ReactDOM.unmountComponentAtNode(div);
});
