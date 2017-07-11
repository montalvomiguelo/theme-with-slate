theme.mobileNav = (function() {
  'use strict';

  var selectors = {
    mobileNavItemHasChildMenu: '.mobile-nav__item--has-child-menu',
    mobileNavItemHasGrandChildMenu: '.mobile-nav__item--has-grandchild-menu'
  };

  var config = {
    activeChildMenuClass: 'mobile-nav__item--active-child-menu',
    activeGrandChildMenuClass: 'mobile-nav__item--active-grandchild-menu',
  };

  var cache = {};

  function init() {
    cacheSelectors();

    cache.$navItemHasChildMenu.on('click', toggleChildMenu);
    cache.$navItemHasGrandChildMenu.on('click', toggleGrandChildMenu);
  }

  function cacheSelectors() {
    cache = {
      $navItemHasChildMenu: $(selectors.mobileNavItemHasChildMenu),
      $navItemHasGrandChildMenu: $(selectors.mobileNavItemHasGrandChildMenu),
    };
  }

  function toggleChildMenu(evt) {

    if (evt.target.tagName != 'SPAN') {
      return;
    }

    evt.preventDefault();
    $(this).toggleClass(config.activeChildMenuClass);

  }

  function toggleGrandChildMenu(evt) {

    evt.stopPropagation();

    if (evt.target.tagName != 'SPAN') {
      return;
    }

    evt.preventDefault();
    $(this).toggleClass(config.activeGrandChildMenuClass);

  }

  return {
    init: init
  };

})();
