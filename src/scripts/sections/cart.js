theme.Cart = (function() {
  'use strict';

  var selectors = {
    numInputs: 'input[type="number"]'
  };

  function Cart(container) {
    this.$container = $(container);

    this.initQtySelector();
  }

  Cart.prototype.initQtySelector = function() {
    this.$container.find(selectors.numInputs).each(function(i, el) {
      new QtySelector($(el));
    });
  }

  return Cart;
})();
