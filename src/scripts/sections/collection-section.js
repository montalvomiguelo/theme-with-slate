theme.CollectionSection = (function() {
  'use strict';

  var selectors = {
    productCard: '.product-card'
  };

  function Collection(container) {
    this.$container = $(container);

    theme.CollectionSorting.init();
    theme.CollectionSidebar.init();
    this.initProductCards();
  }

  Collection.prototype.initProductCards = function() {
    if (!$(selectors.productCard, this.$container).length) {
      return;
    }

    $(selectors.productCard, this.$container).on('click', theme.ProductCard.onClick);
  };

  Collection.prototype.onUnload = function() {
    theme.CollectionSorting.unload();
    theme.CollectionSidebar.unload();
    $(selectors.productCard, this.$container).off('click');
  };

  return Collection;
})();
