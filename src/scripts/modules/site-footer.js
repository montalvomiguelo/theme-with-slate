theme.SiteFooter = (function() {
  'use strict';

  var selectors = {
    footerLinksListTitle: '.footer-links__title'
  };

  var config = {
    linksListTitleActive: 'footer-links__title--active'
  };

  var breakPoints = {
    gridLarge: 990
  };

  var cache = {};

  function init() {
    cacheSelectors();

    cache.$footerLinksLlistTitle.on('click.siteFooter', function(evt) {
      var $el = $(this);

      evt.preventDefault();

      if ($(window).width() >= breakPoints.gridLarge) {
        return;
      }

      $el.toggleClass(config.linksListTitleActive);
    });
  }

  function cacheSelectors() {
    cache = {
      $footerLinksLlistTitle: $(selectors.footerLinksListTitle),
    };
  }

  function unload() {
    cache.$footerLinksLlistTitle.off('click.siteFooter');
  }

  return {
    init: init,
    unload: unload
  }
})();
