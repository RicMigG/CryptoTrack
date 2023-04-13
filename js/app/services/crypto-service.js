define(function () {
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
        internals.populateWebsite(response);
      })
      .catch((error) => {
        throw Error("Failure with AJAX request: " + error);
      });
  };

  internals.populateWebsite = (allCoinsData) => {
    let row;
    for (let index = 1; index < 25; index++) {
      const element = allCoinsData.data[index - 1];
      let appendToTarget = `#row-0`;

      $(`<div class="col-sm-3">
            <div id="${element.id}" class="card border-0">
                <img class="card-img-top p-5" src="https://assets.coincap.io/assets/icons/${element.symbol.toLowerCase()}@2x.png" alt="Card image cap" />
                <div class="card-body text-center">
                    <h5 class="card-title">${element.name}</h5>
                    <p><strong>Price: </strong> $${Number(
                      element.priceUsd
                    ).toFixed(2)}</p>
                    <p><strong>Last 24h: </strong> ${Number(
                      element.changePercent24Hr
                    ).toFixed(2)}%</p>
                </div>
                
            </div>
        </div>`).appendTo(appendToTarget);
    }
  };

  externals.startAjax = () => {
    internals.getAllInformation();
  };

  externals.getCoins = function (cb) {
    cb(internals.data);
  };

  return externals;
});
