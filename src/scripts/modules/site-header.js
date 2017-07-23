theme.SiteHeader = (function() {
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
  };

  var config = {
    activeChildMenuClass: 'menu__item--active-child-menu',
    activeMegamenuClass: 'menu__item--active-megamenu',
    activeSubMenuClass: 'megamenu__item--active-sub-menu',
    activeHeaderStickyClass: 'site-header--sticky',
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
    };
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
    closeOpenMenus();

    $el.addClass(config.activeChildMenuClass);

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
    closeOpenMenus();

    $el.addClass(config.activeMegamenuClass);

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
    if (cache.$megamenuItemActiveSubMenu.length) {
      hideSubMenu(cache.$megamenuItemActiveSubMenu);
    }

    $el.addClass(config.activeSubMenuClass);

    cache.$megamenuItemActiveSubMenu = $el;
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
    var threshold = cache.$siteHeader.outerHeight();

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

    var offset = cache.$siteHeader.outerHeight();

    setTimeout(function() {
      cache.$siteHeader.addClass(config.activeHeaderStickyClass);
      cache.$body.css('padding-top', offset);
    }, 250);

  }

  function unsetStickyHeader() {
    if (!cache.$siteHeader.hasClass(config.activeHeaderStickyClass)) {
      return;
    }

    cache.$siteHeader.removeClass(config.activeHeaderStickyClass);
    cache.$body.css('padding-top', '');
  }


  function unload() {
    $(window).off('.siteNav');
    $(window).off('.siteHeader');
    cache.$hasChildren.off('.siteNav');
    cache.$hasMegamenu.off('.siteNav');
    cache.$megamenuItem.off('.siteNav');
    cache.$window.off('.siteNav');
    $(selectors.body).off('.siteNav');
  }

  return {
    init: init,
    unload: unload,
    closeOpenMenus: closeOpenMenus
  };
})();
