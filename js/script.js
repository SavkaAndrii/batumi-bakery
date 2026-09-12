'use strict';

const burger = document.querySelector('.header__burger');
const navigation = document.querySelector('.header__nav');
const mobile = window.matchMedia('(max-width: 52rem)');

if (burger && navigation) {
  burger.hidden = false;
  navigation.classList.add('header__nav--collapsible');

  const closeMenu = (restoreFocus = false) => {
    navigation.classList.remove('header__nav--open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Otwórz menu');
    if (restoreFocus) burger.focus();
  };

  burger.addEventListener('click', () => {
    const open = burger.getAttribute('aria-expanded') !== 'true';
    navigation.classList.toggle('header__nav--open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Zamknij menu' : 'Otwórz menu');
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
      closeMenu(true);
    }
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.header')) closeMenu();
  });

  mobile.addEventListener('change', () => closeMenu());
}
