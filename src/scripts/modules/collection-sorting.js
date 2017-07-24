theme.CollectionSorting = (function() {
  'use strict';

  var selectors = {
    sortSelect: '#SortBy',
    defaultSort: '#DefaultSort',
    changeView: '.collection-sorting__button-view'
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

    cache.$changeView.on('click', function() {
      var view = $(this).data('view'),
        url = document.URL,
        hasParams = url.indexOf('?') > -1;

      if (hasParams) {
        window.location = replaceUrlParam(url, 'view', view);
      } else {
        window.location = url + '?view=' + view;
      }
    });
  }

  /* replaceUrlParam - http://stackoverflow.com/questions/7171099/how-to-replace-url-parameter-with-javascript-jquery */
  function replaceUrlParam(url, paramName, paramValue){
    if(paramValue == null)
      paramValue = '';
    var pattern = new RegExp('\\b('+paramName+'=).*?(&|$)')
    if(url.search(pattern)>=0){
      return url.replace(pattern,'$1' + paramValue + '$2');
    }
    return url + (url.indexOf('?')>0 ? '&' : '?') + paramName + '=' + paramValue
  }

  function cacheSelectors() {
    cache = {
      $sortSelect: $(selectors.sortSelect),
      $defaultSort: $(selectors.defaultSort),
      $changeView: $(selectors.changeView)
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
    cache.$changeView.off('click');
  }

  return {
    init: init,
    unload: unload
  };
})();
