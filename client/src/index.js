import axios from 'axios';

import './styles/main.scss';

import { render } from './lib/actions';

import landingContent from './views/landing.hbs';
import shopsView from './views/shops.hbs';

render(landingContent);

async function showShops() {
  const res = await axios.get('/api/shops');
  const shopViewBtn = document.querySelector('#shop-view-btn');

  shopViewBtn.addEventListener('click', () => {
    render(shopsView, {
      shops: res.data
    })
  });
}

showShops();
// Set our initial on page load to our landing content
// outputDiv.innerHTML = landingContent({
//   name: 'JD',
//   fruits: ['orange', 'apple', 'grape']
// });
