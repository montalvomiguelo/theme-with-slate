theme.QuickView = (function() {
  'use strict';

  var selectors = {
    productTemplate: '#ProductTemplate',
    productContainer: '#ProductContainer',
    productModal: '#ProductModal'
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
    this.product = new ProductModel(product);

    var html = this.generateHTML();

    this.show(html);
  };

  QuickView.prototype.show = function(html) {
    $(selectors.productContainer).html(html);

    new theme.Product($(selectors.productContainer));

    $(selectors.productModal).modal('show');
  };

  QuickView.prototype.generateHTML = function() {
    var source = $(selectors.productTemplate).html();
    var template = Handlebars.compile(source);
    var context = this.getContext();

    return template(context);
  };

  QuickView.prototype.getContext = function() {
    var productTitle = this.product.title();
    var productId = this.product.id();
    var currentVariant = this.product.currentVariant;
    var featuredImage = this.product.featuredImage();
    var productImages = this.product.getSizedImages();
    var hasOnlyOneImage = this.product.hasOnlyOneImage();
    var productDescription = theme.Inflector.truncateWords(theme.Inflector.stripHtml(this.product.description()), 30);
    var currentVariantPrice = slate.Currency.formatMoney(currentVariant.price, theme.moneyFormat);
    var isProductOnSale = this.product.isProductOnSale();
    var compareAtPrice = slate.Currency.formatMoney(currentVariant.compare_at_price, theme.moneyFormat);
    var productTags = this.product.tags();
    var productVariants = this.product.variants();
    var productOptions = this.product.optionsWithValues();
    var isCurrentVariantSalePrice = this.product.isCurrentVariantSalePrice();
    var productUrl = this.product.url();
    var hasOnlyDefaultVariant = this.product.hasOnlyDefaultVariant();
    var productJson = JSON.stringify(this.product.product);

    return {
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
  };

  return QuickView;
})();
