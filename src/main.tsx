import React from 'react';
import ReactDOM from 'react-dom/client';
import {PrismicProvider} from '@prismicio/react';
import * as prismic from '@prismicio/client';
import App from './App';

const endpoint = 'https://one-beauty.cdn.prismic.io/api/v2';
const client = prismic.createClient(endpoint);

console.log(
  '%c[One Beauty]%cv1.0.0%c[adri > @jff]',
  'padding: 4px; background: #1b1b1b; border-radius: 3px 0 0 3px; color: #fff;',
  'padding: 4px; background: #b30078; color: #fff;',
  'padding: 4px; background: #1b1b1b; border-radius: 0 3px 3px 0; color: #fff;'
);

ReactDOM.createRoot(document.getElementById('one-beauty') as HTMLElement).render(
  <React.StrictMode>
    <PrismicProvider client={client}>
      <App />
    </PrismicProvider>
  </React.StrictMode>
);
