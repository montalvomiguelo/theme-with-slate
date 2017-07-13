theme.HeaderSection = (function() {
  function Header() {
    theme.SiteHeader.init();
    theme.MobileNav.init();
    theme.NavDrawer.init();
    theme.Search.init();
  }

  Header.prototype.onUnload = function() {
    theme.SiteHeader.unload();
  };

  return Header;
})();
