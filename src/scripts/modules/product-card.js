theme.ProductCard = (function() {
  'use strict';

  var config = {
    quickviewButtonClass: 'product-card__quickview',
    imageSizeOriginal: '1000x',
    imageSizeCompact: '160x'
  };

  var cache = {
    $productContainer: $('#ProductContainer'),
  };

  var selectors = {
    singleOptionSelector: '.single-option-selector',
    originalSelectorId: '#productSelect',
    priceWrapper: '#PriceWrapper',
    comparePrice: '#ComparePrice',
    productPrice: '#ProductPrice',
    addToCart: '#AddToCart',
    addToCartText: '#AddToCartText',
    numInputs: 'input[type="number"]',
    productThumbs: '.product-single__thumbnail',
    productFeaturedImage: '#ProductPhotoImg',
    imageWrapper: '[data-image-wrapper]',
    comparePriceText: '#CompareText',
  };

  function getProduct(handle) {
    jQuery.getJSON('/products/' + handle + '.js', onProduct);
  }

  function onProduct(product) {
    var productTitle = product.title;
    var productId = product.id;
    var currentVariant = selectedOrFirstAvailableVariant(product.variants);
    var featuredImage = (currentVariant.featured_image) ?
      slate.Image.getSizedImageUrl(currentVariant.featured_image.src, config.imageSizeOriginal) :
      slate.Image.getSizedImageUrl(product.featured_image, config.imageSizeOriginal);
    var productImages = getSizedImages(product.images);
    var hasOnlyOneImage = (product.images.length < 2);
    var productDescription = truncateWords(stripHtml(product.description), 30);
    var currentVariantPrice = slate.Currency.formatMoney(currentVariant.price, theme.moneyFormat);
    var isOnSale = (product.compare_at_price_max > product.price);
    var compareAtPrice = slate.Currency.formatMoney(currentVariant.compare_at_price, theme.moneyFormat);
    var productTags = product.tags;
    var productVariants = product.variants;
    var productOptions = optionsWithValues(product.options, currentVariant);
    var isCompareAtPriceGreaterThanVariantPrice = (currentVariant.compare_at_price > currentVariant.price);
    var productUrl = product.url;

    var source = $('#ProductTemplate').html();
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
      hasOnlyDefaultVariant: hasOnlyDefaultVariant(product),
      isOnSale: isOnSale,
      productOptions: productOptions,
      productVariants: productVariants,
      productId: productId,
      currentVariant: currentVariant,
      isCompareAtPriceGreaterThanVariantPrice: isCompareAtPriceGreaterThanVariantPrice,
      strings: theme.strings,
      productUrl: productUrl
    };

    cache.$productContainer.html(template(context));

    slate.Image.preload(product.images, config.imageSizeOriginal);

    initVariants(product);
    initImagesSwitch();
    productImageZoom();
    initQtySelector();
  }

  function initVariants(product) {
    var options = {
      $container: cache.$productContainer,
      enableHistoryState: false,
      singleOptionSelector: selectors.singleOptionSelector,
      originalSelectorId: selectors.originalSelectorId,
      product: product
    };

    new slate.Variants(options);

    cache.$productContainer.on('variantChange', updateAddToCartState);
    cache.$productContainer.on('variantImageChange', updateProductImage);
    cache.$productContainer.on('variantPriceChange', updateProductPrices);
  }

  function initQtySelector() {
    cache.$productContainer.find(selectors.numInputs).each(function(i, el) {
      new QtySelector($(el));
    });
  }

  function initImagesSwitch() {
    var productThumbs = cache.$productContainer.find(selectors.productThumbs);

    if (!productThumbs.length) {
      return;
    }

    cache.$productContainer.on('click', selectors.productThumbs, function(evt) {
      evt.preventDefault();

      var $el = $(this);
      var imageSrc = $el.attr('href');

      switchImage(imageSrc);
    });
  }

  function switchImage(imageSrc) {
    $(selectors.productFeaturedImage)
      .attr('src', imageSrc)
      .data('zoom', imageSrc);

    productImageZoom();
  }

  function productImageZoom() {
    if (!$(selectors.imageWrapper).length) {
      return;
    }

    // Destroy zoom (in case it was already set), then set it up again
    $(selectors.imageWrapper).trigger('zoom.destroy');

    $(selectors.imageWrapper).zoom({
      url: $(selectors.productFeaturedImage).data('zoom')
    });
  }

  function updateAddToCartState(evt) {
    var variant = evt.variant;

    if (variant) {
      $(selectors.priceWrapper,).removeClass('hide');
    } else {
      $(selectors.addToCart).prop('disabled', true);
      $(selectors.addToCartText).html(theme.strings.unavailable);
      $(selectors.priceWrapper).addClass('hide');
      return;
    }

    if (variant.available) {
      $(selectors.addToCart).prop('disabled', false);
      $(selectors.addToCartText).html(theme.strings.addToCart);
    } else {
      $(selectors.addToCart).prop('disabled', true);
      $(selectors.addToCartText).html(theme.strings.soldOut);
    }
  }

  function updateProductPrices(evt) {
    var variant = evt.variant;
    var $comparePrice = $(selectors.comparePrice);
    var $compareEls = $comparePrice.add(selectors.comparePriceText);

    $(selectors.productPrice).html(slate.Currency.formatMoney(variant.price, theme.moneyFormat));

    if (variant.compare_at_price > variant.price) {
      $comparePrice.html(slate.Currency.formatMoney(variant.compare_at_price, theme.moneyFormat));
      $compareEls.removeClass('hide');
    } else {
      $comparePrice.html('');
      $compareEls.addClass('hide');
    }
  }

  function updateProductImage(evt) {
    var variant = evt.variant;
    var sizedImgUrl = slate.Image.getSizedImageUrl(variant.featured_image.src, config.imageSizeOriginal);

    $(selectors.productFeaturedImage).attr('src', sizedImgUrl);

    switchImage(sizedImgUrl);
    productImageZoom();
  }

  //https://help.shopify.com/themes/liquid/objects/product#product-selected_or_first_available_variant
  function selectedOrFirstAvailableVariant(variants) {
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

  function getSizedImages(images) {
    return $.map(images, function(image, index) {
      return {
        original: slate.Image.getSizedImageUrl(image, config.imageSizeOriginal),
        compact: slate.Image.getSizedImageUrl(image, config.imageSizeCompact)
      }
    });
  }

  //https://help.shopify.com/themes/liquid/objects/product#product-has_only_default_variant
  function hasOnlyDefaultVariant(product) {
    var optionsLength = product.options.length;
    var firstVariant = product.variants[0]

    return (optionsLength == 1 && firstVariant.title == 'Default Title' ) ? true: false;
  }

  function optionsWithValues(options, currentVariant) {
    return $.map(options, function(option) {
      var position = option.position;

      option.selected_value = currentVariant['option' + position];
      option.values = valuesWithOption(option);

      return option;
    });
  }

  function valuesWithOption(option) {
    return $.map(option.values, function(value) {
      return {
        value: value,
        isSelected: (option.selected_value == value) ? true : false
      }
    });
  }

  function stripHtml(content) {
    return content.replace(/(<([^>]+)>)/ig,"");
  }

  function truncateWords(content, number) {
    return content.split(" ").splice(0, number).join(" ")+"...";
  }

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
  }
})();
