theme.FeaturedCollectionSection = (function(){
  'use strict';

  var breakpoints = {
    medium: 750,
    large: 990
  };

  var defaults = {
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: breakpoints.large,
        settings: {
          infinite: true,
          arrows: false,
          dots: true,
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: breakpoints.medium,
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  function FeaturedCollection(container) {
    this.$container = $(container);
    var sectionId = this.$container.attr('data-section-id');

    this.slider = '#FeaturedCollectionSlider-' + sectionId;
    var $slider = $(this.slider);

    $slider.slick(defaults);
  }

  FeaturedCollection.prototype.onUnload = function() {
    $(this.slider).slick('unslick');
  }

  return FeaturedCollection;

})();
