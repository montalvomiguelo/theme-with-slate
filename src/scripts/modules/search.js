theme.Search = (function() {
  'use strict';

  var selectors = {
    body: 'body',
    openSearch: '[data-open-search]',
    siteHeaderSearch: '.site-header__search',
    navDrawerSearch: '.nav-drawer__search',
  };

  var config = {
    activeHeaderSearchClass: 'site-header__search--active'
  };

  var cache = {};

  var breakPoints = {
    gridLarge: 990
  };

  function cacheSelectors() {
    cache = {
      $window: $(window),
      $openSearch: $(selectors.openSearch),
      $siteHeaderSearch: $(selectors.siteHeaderSearch),
      $navDrawerSearch: $(selectors.navDrawerSearch),
    };
  }

  function init() {
    cacheSelectors();

    cache.$openSearch.on('click.siteSearch', function(evt) {
      evt.preventDefault();
      evt.stopImmediatePropagation();

      if (cache.$window.width() < breakPoints.gridLarge) {
        theme.NavDrawer.showNavDrawer();
        cache.$navDrawerSearch.find('input[type="search"]').focus();
      } else {
        openSiteHeaderSearch();
      }

    });
  }

  function openSiteHeaderSearch() {
    cache.$siteHeaderSearch.addClass(config.activeHeaderSearchClass);

    cache.$siteHeaderSearch.find('[type="search"]').focus();

    theme.SiteHeader.closeOpenMenus();

    $(window).on('keyup.siteSearch', function(evt) {
      if (evt.keyCode === 27) {
        closeSiteHeaderSearch();
      }
    });

    $(selectors.body).on('click.siteSearch', function() {
      closeSiteHeaderSearch();
    });

    cache.$siteHeaderSearch.on('click.siteSearch', function(evt) {
      if (evt.target.tagName == 'A') {
        return evt.preventDefault();
      }

      evt.stopPropagation();
    });
  }

  function closeSiteHeaderSearch() {
    cache.$siteHeaderSearch.removeClass(config.activeHeaderSearchClass);

    $(window).off('keyup.siteSearch');
    $(selectors.body).off('click.siteSearch')
    cache.$siteHeaderSearch.off('click.siteSearch');
  }

  return {
    init: init
  };
})();
