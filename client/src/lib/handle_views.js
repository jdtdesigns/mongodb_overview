import axios from 'axios';
import { render } from './actions';

import shopsView from '../views/shops.hbs';
import landingContent from '../views/landing.hbs';
import headerView from '../views/header.hbs';
import loginFormView from '../views/login.hbs';

async function showShops() {
  const res = await axios.get('/api/shops');

  render(shopsView, {
    shops: res.data
  });
}

async function logInUser(e) {
  e.preventDefault();

  const { email, password } = e.target;

  await axios.post('/auth/login', {
    email: email.value,
    password: password.value
  });

  window.location = '/';
}

function showLogin(e) {
  e.preventDefault();

  render(loginFormView);

  const loginForm = document.querySelector('#login-form');

  loginForm.addEventListener('submit', logInUser);
}

async function logoutUser(e) {
  e.preventDefault();

  await axios.get('/auth/logout');

  window.location = '/';
}

async function showHeader() {
  const res = await axios.get('/auth/authenticate');
  const headerEl = document.querySelector('#main-header');

  window.user = res.data;
  headerEl.innerHTML = headerView({
    user: res.data
  });

  const loginLink = document.querySelector('a[href="/login"]');
  const logoutLink = document.querySelector('a[href="/auth/logout"]')

  if (loginLink) {
    loginLink.addEventListener('click', showLogin);
  }

  if (logoutLink) {
    logoutLink.addEventListener('click', logoutUser);
  }
}

function initViews() {
  render(landingContent);

  showHeader();

  const shopViewBtn = document.querySelector('#shop-view-btn');
  shopViewBtn.addEventListener('click', showShops);
}

export default initViews;