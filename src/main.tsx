import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import './main.css';

import { createServer, Model } from 'miragejs'
import { DateTime } from 'luxon';

let LocalTransactions = JSON.parse(localStorage.getItem('Transactions')?? '[]');

if(LocalTransactions === null) {
  LocalTransactions = [];
}

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        ...LocalTransactions
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
