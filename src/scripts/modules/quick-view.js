theme.QuickView = (function() {
  'use strict';

  var selectors = {
    productTemplate: '#ProductTemplate',
    productContainer: '#ProductContainer',
    productModal: '#ProductModal'
  };

  var config = {
    imageSizeOriginal: '1000x',
    imageSizeCompact: '160x'
  };

  function QuickView(handle) {
    this.getProduct(handle);
  }

  QuickView.prototype.getProduct = function(handle) {
    jQuery.getJSON('/products/' + handle + '.js', $.proxy(function(product) {
      this.onProduct(product);
    }, this));
  };

  QuickView.prototype.onProduct = function(product) {
    this.product = product;
    this.currentVariant = this.selectedOrFirstAvailableVariant();

    var productTitle = product.title;
    var productId = product.id;
    var currentVariant = this.currentVariant;
    var featuredImage = this.featuredImage();
    var productImages = this.getSizedImages();
    var hasOnlyOneImage = this.hasOnlyOneImage();
    var productDescription = this.truncateWords(this.stripHtml(product.description), 30);
    var currentVariantPrice = slate.Currency.formatMoney(currentVariant.price, theme.moneyFormat);
    var isProductOnSale = this.isProductOnSale();
    var compareAtPrice = slate.Currency.formatMoney(currentVariant.compare_at_price, theme.moneyFormat);
    var productTags = product.tags;
    var productVariants = product.variants;
    var productOptions = this.optionsWithValues();
    var isCurrentVariantSalePrice = this.isCurrentVariantSalePrice();
    var productUrl = product.url;
    var hasOnlyDefaultVariant = this.hasOnlyDefaultVariant();
    var productJson = JSON.stringify(product);

    var source = $(selectors.productTemplate).html();
    var template = Handlebars.compile(source);
    var context = {
      productTitle: productTitle,
      featuredImage: featuredImage,
      hasOnlyOneImage: hasOnlyOneImage,
      productImages: productImages,
      productDescription: productDescription,
      productTags: productTags,
      currentVariantPrice: currentVariantPrice,
      compareAtPrice: compareAtPrice,
      hasOnlyDefaultVariant: hasOnlyDefaultVariant,
      isProductOnSale: isProductOnSale,
      productOptions: productOptions,
      productVariants: productVariants,
      productId: productId,
      currentVariant: currentVariant,
      isCurrentVariantSalePrice: isCurrentVariantSalePrice,
      strings: theme.strings,
      productUrl: productUrl,
      productJson: productJson
    };

    $(selectors.productContainer).html(template(context));

    new theme.Product($(selectors.productContainer));

    $(selectors.productModal).modal('show');
  };

  //https://help.shopify.com/themes/liquid/objects/product#product-selected_or_first_available_variant
  QuickView.prototype.selectedOrFirstAvailableVariant = function() {
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
  QuickView.prototype.hasOnlyDefaultVariant = function() {
    var product = this.product;

    var optionsLength = product.options.length;
    var firstVariant = product.variants[0]

    return (optionsLength == 1 && firstVariant.title == 'Default Title' ) ? true: false;
  }

  QuickView.prototype.getSizedImages = function() {
    var images = this.product.images;

    return $.map(images, function(image, index) {
      return {
        original: slate.Image.getSizedImageUrl(image, config.imageSizeOriginal),
        compact: slate.Image.getSizedImageUrl(image, config.imageSizeCompact)
      }
    });
  };

  QuickView.prototype.truncateWords = function(content, number) {
    return content.split(" ").splice(0, number).join(" ")+"...";
  };

  QuickView.prototype.stripHtml = function(content) {
    return content.replace(/(<([^>]+)>)/ig,"");
  };

  QuickView.prototype.optionsWithValues = function() {
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

  QuickView.prototype.valuesWithOption = function(option) {
    return $.map(option.values, function(value) {
      return {
        value: value,
        isSelected: (option.selected_value == value) ? true : false
      }
    });
  };

  QuickView.prototype.featuredImage = function() {
    return (this.currentVariant.featured_image) ?
      slate.Image.getSizedImageUrl(this.currentVariant.featured_image.src, config.imageSizeOriginal) :
      slate.Image.getSizedImageUrl(this.product.featured_image, config.imageSizeOriginal);
  };

  QuickView.prototype.hasOnlyOneImage = function() {
    return (this.product.images.length < 2) ? true : false;
  };

  QuickView.prototype.isProductOnSale = function() {
    return (this.product.compare_at_price_max > this.product.price) ? true : false;
  };

  QuickView.prototype.isCurrentVariantSalePrice = function() {
    return (this.currentVariant.compare_at_price > this.currentVariant.price) ? true: false;
  };

  return QuickView;
})();
