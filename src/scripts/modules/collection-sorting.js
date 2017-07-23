theme.CollectionSorting = (function() {
  'use strict';

  var selectors = {
    sortSelect: '#SortBy',
    defaultSort: '#DefaultSort'
  };

  var cache = {};

  var queryParams = {};

  function init() {
    cacheSelectors();
    getQueryParams();

    cache.$sortSelect
      .val(cache.$defaultSort.val())
      .on('change', function() {
        queryParams.sort_by = $(this).val();
        location.search = $.param(queryParams);
      }
    );
  }

  function cacheSelectors() {
    cache = {
      $sortSelect: $(selectors.sortSelect),
      $defaultSort: $(selectors.defaultSort),
    };
  }

  function getQueryParams() {
    if (location.search.length) {
      for (var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&'); i < aCouples.length; i++) {
        aKeyValue = aCouples[i].split('=');
        if (aKeyValue.length > 1) {
          queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(aKeyValue[1]);
        }
      }
    }
  }

  function unload() {
    cache.$sortBy.off('change');
  }

  return {
    init: init,
    unload: unload
  };
})();
