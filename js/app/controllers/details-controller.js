define(["views/crypto-view", "services/crypto-service"], function (
  cryptoView,
  cryptoService
) {
  var externals = {};
  var internals = {};

  externals.start = function () {
    cryptoService.startAjax();
    cryptoView.activateEventHandlers();
  };

  return externals;
});
