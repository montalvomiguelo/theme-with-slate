theme.Inflector = (function() {
  'use strict';

  var truncateWords = function(content, number) {
    return content.split(" ").splice(0, number).join(" ")+"...";
  };

  var stripHtml = function(content) {
    return content.replace(/(<([^>]+)>)/ig,"");
  };

  return {
    truncateWords: truncateWords,
    stripHtml: stripHtml
  }
})();
