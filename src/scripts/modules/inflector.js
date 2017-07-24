theme.Inflector = (function() {
  'use strict';

  var truncateWords = function(content, number) {
    return content.split(" ").splice(0, number).join(" ")+"...";
  };

  var stripHtml = function(content) {
    return content.replace(/(<([^>]+)>)/ig,"");
  };

  /* replaceUrlParam - http://stackoverflow.com/questions/7171099/how-to-replace-url-parameter-with-javascript-jquery */
  var replaceUrlParam = function(url, paramName, paramValue){
    if(paramValue == null)
      paramValue = '';
    var pattern = new RegExp('\\b('+paramName+'=).*?(&|$)')
    if(url.search(pattern)>=0){
      return url.replace(pattern,'$1' + paramValue + '$2');
    }
    return url + (url.indexOf('?')>0 ? '&' : '?') + paramName + '=' + paramValue
  }

  return {
    truncateWords: truncateWords,
    stripHtml: stripHtml,
    replaceUrlParam: replaceUrlParam
  }
})();
