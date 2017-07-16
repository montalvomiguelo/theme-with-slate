theme.ProductCard = (function() {
  'use strict';

  var config = {
    quickviewButtonClass: 'product-card__quickview'
  };

  function getProduct(handle) {
    jQuery.getJSON('/products/' + handle + '.js', onProduct);
  }

  function onProduct(product) {
    alert('Received everything we ever wanted to know about ' + product.title);
  }

  function onClick(evt) {

    var $target = $(evt.target);

    if (!$target.hasClass(config.quickviewButtonClass)) {
      return;
    }

    evt.preventDefault();
    evt.stopPropagation();

    var handle = $target.data('handle');
    getProduct(handle);
  }

  return {
    onClick: onClick
  }
})();
