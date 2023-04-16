define(["views/crypto-view"], function (cryptoView) {
  var internals = {}; // internal state
  var externals = {}; // external api

  internals.getAllInformation = () => {
    fetch("https://api.coincap.io/v2/assets", {
      headers: {
        "Accept-Encoding": "gzip, deflate",
        Authorization: "Bearer 73c931ec-a0d2-4a4f-8cc8-030689b7d007",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        internals.passInformationToView(response);
      })
      .catch((error) => {
        throw Error("Failure with AJAX request: " + error);
      });
  };

  internals.passInformationToView = (cryptoData) => {
    cryptoView.insertDataIntoWebsite(cryptoData);
  };

  externals.startAjax = () => {
    internals.getAllInformation();
  };

  return externals;
});
