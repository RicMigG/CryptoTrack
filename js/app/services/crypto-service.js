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
        throw Error("Failure with AJAX request: " + error + error.log);
      });
  };

  internals.passInformationToView = (cryptoData) => {
    cryptoView.insertDataIntoWebsite(cryptoData);
  };

  internals.getSpecificCoinJSON = async (coinName) => {
    let coinInfo, coinHistory;
    await fetch(`https://api.coincap.io/v2/assets/${coinName}`, {
      headers: {
        "Accept-Encoding": "gzip, deflate",
        Authorization: "Bearer 73c931ec-a0d2-4a4f-8cc8-030689b7d007",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        coinInfo = response.data;
      })
      .catch((error) => {
        throw Error(
          "Failure with single coin AJAX request: " + error + error.log
        );
      });
    await fetch(
      `https://api.coincap.io/v2/assets/${coinName}/history?interval=d1
    `,
      {
        headers: {
          "Accept-Encoding": "gzip, deflate",
          Authorization: "Bearer 73c931ec-a0d2-4a4f-8cc8-030689b7d007",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        coinHistory = response;
      })
      .catch((error) => {
        throw Error(
          "Failure with single coin AJAX request: " + error + error.log
        );
      });
    cryptoView.loadSingleCoinPage(coinInfo, coinHistory);
  };

  externals.passCoinInfoToView = (coinName) => {
    internals.getSpecificCoinJSON(coinName);
  };

  externals.startAjax = () => {
    internals.getAllInformation();
  };

  externals.setSelectedCrypto = (selectedCrypto) => {
    internals.selectedCryptoDetails = selectedCrypto;
  };

  externals.getSelectedCryptoName = () => {
    return internals.selectedCryptoDetails;
  };

  return externals;
});
