window.QtySelector = (function() {
  'use strict';

  function QtySelector($el) {
    this.$el = $el;

    this.createInputs();
    this.bindEvents();
  }

  QtySelector.prototype.createInputs = function() {
    var $el = this.$el,
      currentQty = $el.val(),
      inputName = $el.attr('name'),
      inputId = $el.attr('id');

    var itemAdd = currentQty + 1,
      itemMinus = currentQty - 1,
      itemQty = currentQty;

    var source   = $("#JsQty").html(),
      template = Handlebars.compile(source),
      data = {
        key: $el.data('id'),
        itemQty: itemQty,
        itemAdd: itemAdd,
        itemMinus: itemMinus,
        inputName: inputName,
        inputId: inputId
      };

    // Append new quantity selector then remove original
    $el.after(template(data)).remove();
  };

  QtySelector.prototype.bindEvents = function() {
    var self = this;

    // Setup listeners to add/subtract from the input
    $('.js-qty__adjust').on('click', function() {
      var $el = $(this),
        id = $el.data('id'),
        $qtySelector = $el.siblings('.js-qty__num'),
        qty = parseInt($qtySelector.val().replace(/\D/g, ''));

      var qty = self.validateQty(qty);

      // Add or subtract from the current quantity
      if ($el.hasClass('js-qty__adjust--plus')) {
        qty += 1;
      } else {
        qty -= 1;
        if (qty <= 1) qty = 1;
      }

      // Update the input's number
      $qtySelector.val(qty);
    });
  };

  QtySelector.prototype.validateQty = function(qty) {
    if((parseFloat(qty) == parseInt(qty)) && !isNaN(qty)) {
      // We have a valid number!
    } else {
      // Not a number. Default to 1.
      qty = 1;
    }
    return qty;
  };

  return QtySelector;

})();
