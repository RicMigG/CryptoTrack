define(["views/crypto-view", "services/crypto-service"], function (
  cryptoView,
  cryptoService
) {
  var externals = {};
  var internals = {};

  externals.start = function () {
    if (cryptoService.getSelectedCryptoName() != null) {
      cryptoView.prepareViewSingleCrypto(cryptoService.getSelectedCryptoName());
      cryptoService.passCoinInfoToView(cryptoService.getSelectedCryptoName());
    } else {
      window.location.hash = "#cryptotrack";
    }
  };

  return externals;
});
