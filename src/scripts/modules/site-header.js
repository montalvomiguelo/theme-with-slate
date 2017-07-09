theme.siteHeader = (function() {
  'use strict';

  var selectors = {
    body: 'body',
    siteNavigation: '.site-navigation',
    menuItemHasChildren: '.menu__item--has-children',
    menuItemActiveChildMenu: '.menu__item--active-child-menu',
    menuItemHasMegamenu: '.menu__item--has-megamenu',
    menuItemActiveMegamenu: '.menu__item--active-megamenu',
    megamenuItem: '.megamenu__item',
    megamenuItemActiveSubMenu: '.megamenu__item--active-sub-menu',
    siteHeader: '.site-header',
    promoBar: '.promo-bar',
    openSearch: '[data-open-search]',
    closeSearch: '[data-close-search]',
    siteHeaderSearch: '.site-header__search',
  };

  var config = {
    activeChildMenuClass: 'menu__item--active-child-menu',
    activeMegamenuClass: 'menu__item--active-megamenu',
    activeSubMenuClass: 'megamenu__item--active-sub-menu',
    activeHeaderStickyClass: 'site-header--sticky',
    activeHeaderSearchClass: 'site-header__search--active'
  };

  var breakPoints = {
    gridLarge: 990
  };

  var cache = {};

  function init() {
    cacheSelectors();

    cache.$hasChildren.on('click.siteNav', function(evt) {
      var $el = $(this);

      if (!$el.hasClass(config.activeChildMenuClass)) {
        evt.preventDefault();
        evt.stopImmediatePropagation();
      }

      showChildMenu($el);
    });

    cache.$hasMegamenu.on('click.siteNav', function(evt) {
      var $el = $(this);

      if (!$el.hasClass(config.activeMegamenuClass)) {
        evt.preventDefault();
        evt.stopImmediatePropagation();
      }

      showMegamenu($el);
    });

    cache.$megamenuItem.on('click.siteNav', function(evt) {
      var $el = $(this);

      if (!$el.hasClass(config.activeSubMenuClass)) {
        evt.preventDefault();
        evt.stopImmediatePropagation();
      }

      showSubMenu($el);
    });

    stickySiteHeaderOnScroll();
    cache.$window.on('scroll.siteHeader', stickySiteHeaderOnScroll);
    cache.$window.on('resize.siteHeader', stickySiteHeaderOnScroll);

    cache.$openSearch.on('click.siteSearch', function(evt) {
      evt.preventDefault();
      evt.stopImmediatePropagation();
      openSiteHeaderSearch();
    });

  }

  function cacheSelectors() {
    cache = {
      $window: $(window),
      $body: $(selectors.body),
      $hasChildren: $(selectors.siteNavigation).find(selectors.menuItemHasChildren),
      $menuItemActiveChildMenu: $(selectors.menuItemActiveChildMenu),
      $hasMegamenu: $(selectors.siteNavigation).find(selectors.menuItemHasMegamenu),
      $menuItemActiveMegamenu: $(selectors.menuItemActiveMegamenu),
      $megamenuItem: $(selectors.siteNavigation).find(selectors.megamenuItem),
      $megamenuItemActiveSubMenu: $(selectors.megamenuItemActiveSubMenu),
      $siteHeader: $(selectors.siteHeader),
      $promoBar: $(selectors.promoBar),
      $openSearch: $(selectors.openSearch),
      $closeSearch: $(selectors.closeSearch),
      $siteHeaderSearch: $(selectors.siteHeaderSearch),
    }
  }

  function closeOpenMenus() {
    if (cache.$menuItemActiveChildMenu.length) {
      hideChildMenu(cache.$menuItemActiveChildMenu);
    }
    if (cache.$menuItemActiveMegamenu.length) {
      hideMegamenu(cache.$menuItemActiveMegamenu);
    }
  }

  function showChildMenu($el) {
    $el.addClass(config.activeChildMenuClass);

    closeOpenMenus();

    cache.$menuItemActiveChildMenu = $el;

    setTimeout(function() {
      $(window).on('keyup.siteNav', function(evt) {
        if (evt.keyCode === 27) {
          hideChildMenu($el);
        }
      });

      $(selectors.body).on('click.siteNav', function() {
        hideChildMenu($el);
      });
    }, 250);
  }

  function showMegamenu($el) {
    $el.addClass(config.activeMegamenuClass);

    closeOpenMenus();

    cache.$menuItemActiveMegamenu = $el;

    setTimeout(function() {
      $(window).on('keyup.siteNav', function(evt) {
        if (evt.keyCode === 27) {
          hideMegamenu($el);
        }
      });

      $(selectors.body).on('click.siteNav', function() {
        hideMegamenu($el);
      });
    }, 250);
  }

  function showSubMenu($el) {
    $el.addClass(config.activeSubMenuClass);

    // hide open sub menus
    if (cache.$megamenuItemActiveSubMenu.length) {
      hideSubMenu(cache.$megamenuItemActiveSubMenu);
    }

    cache.$megamenuItemActiveSubMenu = $el;

    // set expanded on open sub menu
  }

  function hideChildMenu($el) {
    // remove aria on open dropdown

    $el.removeClass(config.activeChildMenuClass);

    // reset active child menus
    cache.$menuItemActiveChildMenu = $(selectors.menuItemActiveChildMenu);

    $(selectors.body).off('click.siteNav');
    $(window).off('keyup.siteNav');
  }

  function hideMegamenu($el) {
    $el.removeClass(config.activeMegamenuClass);

    // reset active megamenus
    cache.$menuItemActiveMegamenu = $(selectors.menuItemActiveMegamenu);

    $(selectors.body).off('click.siteNav');
    $(window).off('keyup.siteNav');

  }

  function hideSubMenu($el) {
    $el.removeClass(config.activeSubMenuClass);

    // reset active sub menus
    cache.$megamenuItemActiveSubMenu = $(selectors.megamenuItemActiveSubMenu);
  }

  function windowWidth() {
    return cache.$window.width();
  }

  function stickySiteHeaderOnScroll() {
    if (windowWidth() < breakPoints.gridLarge) {
      return unsetStickyHeader();
    }

    var scroll = cache.$window.scrollTop();
    var threshold = cache.$siteHeader.outerHeight() + cache.$promoBar.outerHeight();

    if (scroll > threshold) {
      setStickyHeader();
    } else {
      unsetStickyHeader();
    }
  }

  function setStickyHeader() {
    if (cache.$siteHeader.hasClass(config.activeHeaderStickyClass)) {
      return;
    }

    cache.$siteHeader.addClass(config.activeHeaderStickyClass);
  }

  function unsetStickyHeader() {
    if (!cache.$siteHeader.hasClass(config.activeHeaderStickyClass)) {
      return;
    }

    cache.$siteHeader.removeClass(config.activeHeaderStickyClass);
  }

  function openSiteHeaderSearch() {
    cache.$siteHeaderSearch.addClass(config.activeHeaderSearchClass);

    cache.$siteHeaderSearch.find('[type="search"]').focus();

    closeOpenMenus();

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

  function unload() {
    $(window).off('.siteNav');
    $(window).off('.siteSearch');
    $(window).off('.siteHeader');
    cache.$hasChildren.off('.siteNav');
    cache.$hasMegamenu.off('.siteNav');
    cache.$megamenuItem.off('.siteNav');
    cache.$window.off('.siteNav');
    cache.$openSearch.off('.siteSearch');
    $(selectors.body).off('.siteNav');
    $(selectors.body).off('.siteSearch');
    cache.$siteHeaderSearch.off('.siteSearch');
  }

  return {
    init: init,
    unload: unload
  }
})();
