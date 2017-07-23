theme.Collection = (function() {
  'use strict';

  var selectors = {
    sortSelect: '#SortBy',
    defaultSort: '#DefaultSort',
    productCard: '.product-card'
  };

  function Collection(container) {
    this.$container = $(container);

    this.queryParams = {};
    this.$sortSelect = $(selectors.sortSelect, this.$container);
    this.defaultSort = $(selectors.defaultSort, this.$container).val();

    this.initSortBy();
    this.initProductCards();
  }

  Collection.prototype.initSortBy = function() {
    this.getQueryParams();

    this.$sortSelect
      .val(this.defaultSort)
      .on('change', $.proxy(function(evt) {
        this.onSortChange(evt);
      }, this));
  };

  Collection.prototype.onSortChange = function(evt) {
    this.queryParams.sort_by = $(evt.target).val();
    location.search = $.param(this.queryParams);
  };

  Collection.prototype.getQueryParams = function() {
    if (location.search.length) {
      for (var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&'); i < aCouples.length; i++) {
        aKeyValue = aCouples[i].split('=');
        if (aKeyValue.length > 1) {
          this.queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(aKeyValue[1]);
        }
      }
    }
  };

  Collection.prototype.initProductCards = function() {
    if (!$(selectors.productCard, this.$container).length) {
      return;
    }

    $(selectors.productCard, this.$container).on('click', theme.ProductCard.onClick);
  };

  Collection.prototype.onUnload = function() {
    this.$sortSelect.off('change');
    $(selectors.productCard, this.$container).off('click');
  };

  return Collection;
})();
