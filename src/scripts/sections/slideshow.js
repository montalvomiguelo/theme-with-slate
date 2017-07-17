theme.Slideshow = (function() {
  'use strict';

  var defaults = {
    arrows: false,
    dots: true,
    adaptiveHeight: true
  };

  function Slideshow(container) {
    this.$container = $(container);
    var sectionId = this.$container.attr('data-section-id');
    this.slider = '#HeroSlideshow-' + sectionId;

    $(this.slider).slick(defaults);
  }

  Slideshow.prototype.onBlockSelect = function(evt) {
    var $slide = $('.hero-image--' + evt.detail.blockId + ':not(.slick-cloned)');
    var slideIndex = $slide.data('slick-index');

    $(this.slider).slick('slickGoTo', slideIndex).slick('slickPause');
  };

  Slideshow.prototype.onBlockDeselect = function() {
    $(this.slider).slick('slickPlay');
  };

  Slideshow.prototype.onUnload = function() {
    $(this.slider).slick('unslick');
  };

  return Slideshow;
})();
