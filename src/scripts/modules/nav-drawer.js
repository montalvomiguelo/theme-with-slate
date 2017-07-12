theme.navDrawer = (function() {
  'use strict';

  var selectors = {
    openNavDrawer: '[data-open-nav-drawer]',
    navDrawer: '.nav-drawer',
    navDrawerOverlay: '.nav-drawer-overlay',
    closeNavDrawer: '[data-close-nav-drawer]',
  };

  var config = {
    activeNavDrawerClass: 'nav-drawer--active'
  };

  var cache = {};

  function init() {
    cacheSelectors();

    cache.$openNavDrawer.on('click', showNavDrawer);
    cache.$closeNavDrawer.on('click', function(evt) {
      evt.preventDefault();
      hideNavDrawer();
    });
  }

  function cacheSelectors() {
    cache = {
      $openNavDrawer: $(selectors.openNavDrawer),
      $navDrawer: $(selectors.navDrawer),
      $navDrawerOverlay: $(selectors.navDrawerOverlay),
      $closeNavDrawer: $(selectors.closeNavDrawer),
    };
  }

  function showNavDrawer(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    cache.$navDrawer.addClass(config.activeNavDrawerClass);
    cache.$navDrawerOverlay.fadeIn(300);

    $(window).on('keyup.navDrawer', function(evt) {
      if (evt.keyCode === 27) {
        hideNavDrawer();
      }
    });
  }

  function hideNavDrawer() {
    cache.$navDrawer.removeClass(config.activeNavDrawerClass);
    cache.$navDrawerOverlay.fadeOut(300);

    $(window).off('keyup.navDrawer');
  }

  return {
    init: init
  };

})();
