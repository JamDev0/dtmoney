import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import './main.css';

import { createServer } from 'miragejs'

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return [
        {
          id: 1,
          title: 'Compra do mês',
          category: 'market',
          amount: 500,
          type: 'withdrawn',
          date: [2022, 5, 13, 14, 0],
        },

        {
          id: 2,
          title: 'Compra do mês',
          category: 'market',
          amount: 700,
          type: 'deposit',
          date: [2022, 5, 13, 14, 0],
        }
      ]
    });
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
