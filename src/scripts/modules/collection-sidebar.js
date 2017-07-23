theme.CollectionSidebar = (function() {
  'use strict';

  var selectors = {
    toggleSidebar: '#ToggleSidebar',
    collectionSidebar: '#CollectionSidebar'
  };

  var config = {
    collectionSidebarActiveClass: 'collection-sidebar--active'
  };

  var cache = {};

  function init() {
    cacheSelectors();

    cache.$toggleSidebar.on('click', function(evt) {
      evt.preventDefault();
      cache.$collectionSidebar.toggleClass(config.collectionSidebarActiveClass);
    });
  }

  function cacheSelectors() {
    cache = {
      $toggleSidebar: $(selectors.toggleSidebar),
      $collectionSidebar: $(selectors.collectionSidebar)
    };
  }

  function unload() {
    cache.$toggleSidebar.off('click');
  }

  return {
    init: init,
    unload: unload
  };
})();
