import 'regenerator-runtime'; /* for async await transpile */
import '../styles/style.scss';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

// component
import './components/navbar';
import './components/hero';
import './components/contact';
import './components/footer';

import App from './views/App';
import swRegister from './utils/sw-register';

// init App
const app = new App({
  button: document.querySelector('.burger'),
  drawer: document.querySelector('.sidebar'),
  content: document.querySelector('#main-content'),
});
window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});

// navbar
const burger = document.querySelector('.burger');
const sidebar = document.querySelector('.sidebar');
const bgSidebar = document.querySelector('.bg-sidebar');

// eslint-disable-next-line no-unused-vars, func-names
burger.addEventListener('click', function (event) {
  this.classList.toggle('change');
  sidebar.classList.toggle('change');
  bgSidebar.classList.toggle('change');
});

// eslint-disable-next-line func-names, no-unused-vars
bgSidebar.addEventListener('click', function (event) {
  this.classList.remove('change');
  sidebar.classList.remove('change');
  burger.classList.remove('change');
});
