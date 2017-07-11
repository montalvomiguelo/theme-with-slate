theme.HeaderSection = (function() {
  function Header() {
    theme.siteHeader.init();
    theme.mobileNav.init();
  }

  Header.prototype.onUnload = function() {
    theme.siteHeader.unload();
  };

  return Header;
})();
