theme.FooterSection = (function() {
  function Footer() {
    theme.SiteFooter.init();
  }

  Footer.prototype.onUnload = function() {
    theme.SiteFooter.unload();
  }

  return Footer;
})();
