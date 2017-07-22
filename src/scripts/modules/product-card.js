theme.ProductCard = (function() {
  'use strict';

  var config = {
    quickviewButtonClass: 'product-card__quickview',
  };

  function onClick(evt) {

    var $target = $(evt.target);

    if (!$target.hasClass(config.quickviewButtonClass)) {
      return;
    }

    evt.preventDefault();
    evt.stopPropagation();

    var handle = $target.data('handle');
    new theme.QuickView(handle);
  }

  return {
    onClick: onClick
  };
})();
