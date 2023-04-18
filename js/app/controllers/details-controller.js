define(["views/crypto-view", "services/crypto-service"], function (
  cryptoView,
  cryptoService
) {
  var externals = {};
  var internals = {};

  externals.start = function () {
    cryptoView.prepareViewSingleCrypto();
  };

  return externals;
});
