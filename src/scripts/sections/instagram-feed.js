theme.InstagramFeed = (function() {
  'use strict';

  var selectors = {
    grid: '.grid'
  };

  function InstagramFeed(container) {
    this.$container = $(container);

    this.initFeed();
  }

  InstagramFeed.prototype.initFeed = function() {
    var $grid = $(selectors.grid, this.$container);
    var target = $grid[0];
    var accessToken = $grid.data('access-token');
    var limit = $grid.data('count');
    var gridItemWith = $grid.data('grid-item-width');

    var feed = new Instafeed({
      get: 'user',
      userId: 'self',
      target: target,
      accessToken: accessToken,
      sortBy: 'most-recent',
      resolution: 'standard_resolution',
      limit: limit,
      template: '<a href="{{link}}" target="_blank" style="background-image: url({{image}});" class="instagram-grid__item grid__item ' + gridItemWith + '"></a>'
    });

    feed.run();
  };

  return InstagramFeed;

})();
