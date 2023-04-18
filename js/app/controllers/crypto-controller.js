define("controllers/crypto-controller", [
  "views/crypto-view",
  "services/crypto-service",
], function (cryptoView, cryptoService) {
  var cryptoController = {};
  var internals = {};

  cryptoController.start = function () {
    console.log("crypto-controller loaded!");
    cryptoView.prepareViewCryptoController();
    cryptoService.startAjax();
  };

  cryptoController.userClicked = function (specificCryptoName) {
    cryptoService.setSelectedCrypto(specificCryptoName);
    window.location.hash = "#cryptodetails";
  };

  return cryptoController;
});
