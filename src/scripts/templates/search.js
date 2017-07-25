theme.search = (function() {
  'use strict';

  var selectors = {
    productCard: '.product-card',
    searchResultsContent: '.search-results__content'
  };

  if (!$(selectors.productCard).length) {
    return;
  }

  $(selectors.productCard).on('click', theme.ProductCard.onClick);

})();
