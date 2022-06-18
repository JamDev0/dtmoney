import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import './main.css';

import { createServer, Model } from 'miragejs'
import { DateTime } from 'luxon';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Teste',
          category: 'Teste',
          amount: 1000,
          type: 'withdrawn',
          date: [2020, 3, 15, 8, 0],
        },
        {
          id: 2,
          title: 'Teste',
          category: 'Teste',
          amount: 1500,
          type: 'deposit',
          date: [2020, 3, 15, 8, 0],
        },
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.post('/transactions', (schema, req) => {
      let data = JSON.parse(req.requestBody);

      
      return schema.create('transaction', data);
    });

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    });
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
