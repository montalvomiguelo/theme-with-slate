window.ProductModel = (function() {
  'use strict';

  var imageSizes = {
    original: '1000x',
    compact: '160x'
  };

  function Product(product) {
    this.product = product;
    this.currentVariant = this.selectedOrFirstAvailableVariant();
  }

  //https://help.shopify.com/themes/liquid/objects/product#product-selected_or_first_available_variant
  Product.prototype.selectedOrFirstAvailableVariant = function() {
    var variants = this.product.variants;
    var variant;
    var i;

    for (i = 0; i < variants.length; i++) {
      if (variants[i].available) {
        variant = variants[i];
        break;
      }
    }

    return (variant) ? variant : variants[0];
  };

  //https://help.shopify.com/themes/liquid/objects/product#product-has_only_default_variant
  Product.prototype.hasOnlyDefaultVariant = function() {
    var product = this.product;

    var optionsLength = product.options.length;
    var firstVariant = product.variants[0]

    return (optionsLength == 1 && firstVariant.title == 'Default Title' ) ? true: false;
  }

  Product.prototype.getSizedImages = function() {
    var images = this.product.images;

    return $.map(images, function(image, index) {
      return {
        original: slate.Image.getSizedImageUrl(image, imageSizes.original),
        compact: slate.Image.getSizedImageUrl(image, imageSizes.compact)
      }
    });
  };

  Product.prototype.optionsWithValues = function() {
    var options = this.product.options;
    var currentVariant = this.currentVariant;
    var self = this;

    return $.map(options, function(option) {
      var position = option.position;

      option.selected_value = currentVariant['option' + position];
      option.values = self.valuesWithOption(option);

      return option;
    });
  };

  Product.prototype.valuesWithOption = function(option) {
    return $.map(option.values, function(value) {
      return {
        value: value,
        isSelected: (option.selected_value == value) ? true : false
      }
    });
  };

  Product.prototype.featuredImage = function() {
    return (this.currentVariant.featured_image) ?
      slate.Image.getSizedImageUrl(this.currentVariant.featured_image.src, imageSizes.original) :
      slate.Image.getSizedImageUrl(this.product.featured_image, imageSizes.original);
  };

  Product.prototype.hasOnlyOneImage = function() {
    return (this.product.images.length < 2) ? true : false;
  };

  Product.prototype.isProductOnSale = function() {
    return (this.product.compare_at_price_max > this.product.price) ? true : false;
  };

  Product.prototype.isCurrentVariantSalePrice = function() {
    return (this.currentVariant.compare_at_price > this.currentVariant.price) ? true: false;
  };

  Product.prototype.title = function() {
    return this.product.title;
  };

  Product.prototype.id = function() {
    return this.product.id;
  };

  Product.prototype.tags = function() {
    return this.product.tags;
  };

  Product.prototype.variants = function() {
    return this.product.variants;
  };

  Product.prototype.url = function() {
    return this.product.url;
  };

  Product.prototype.description = function() {
    return this.product.description;
  };

  return Product;
})();
