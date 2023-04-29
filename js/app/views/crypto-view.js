define(["require"], function (require) {
  let internals = {};

  let externals = {};

  internals.populateWebsite = (allCoinsData) => {
    for (let index = 1; index < 25; index++) {
      const element = allCoinsData.data[index - 1];
      let appendToTarget = "#row-0";

      $(`<div class="col-sm-3">
                <div id="${element.id}" class="card border-0 cardClick">
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
    internals.attachEventHandlers();
  };

  internals.attachEventHandlers = () => {
    $(".cardClick").click((event) => {
      event.preventDefault();
      let clickedElement = event.target;
      while (clickedElement && !clickedElement.id) {
        clickedElement = clickedElement.parentElement;
      }
      if (clickedElement) {
        let parentId = clickedElement.id;
        require(["controllers/crypto-controller"], function (cryptoController) {
          cryptoController.userClicked(parentId);
        });
      }
    });
  };

  internals.clearPanel = () => {
    $(".row").empty();
  };

  internals.defaultStartAllCryptos = () => {
    $("#headerText").text("Most popular cryptos");
  };

  internals.createSingleCoinCard = (specificCoinJSON, coinHistory) => {
    $(`<div class="card mb-3">
    <div class="row no-gutters">
      <div class="col-md-4">
        <canvas id="myChart" style="width:100%;height:100%;max-width:700px"></canvas>
      </div>
      <div class="col-md-8">
        <div class="card-body">
        <table class="table table-hover">
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">#${specificCoinJSON.rank}</th>

          </tr>
        <tbody>
          <tr>
            <th scope="row">Symbol</th>
            <td>${specificCoinJSON.symbol}</td>
          </tr>
          <tr>
            <th scope="row">Supply</th>
            <td>${Intl.NumberFormat().format(
              Number(specificCoinJSON.supply).toFixed(0)
            )}</td>
          </tr>
          <tr>
          <th scope="row">Max Supply</th>
          <td>${Intl.NumberFormat().format(
            Number(specificCoinJSON.maxSupply).toFixed(0)
          )}</td>
          </tr>
          <tr>
          <th scope="row">Market Cap USD</th>
          <td>$${Intl.NumberFormat().format(
            Number(specificCoinJSON.marketCapUsd).toFixed(0)
          )}</td>
          </tr>
          <tr>
          <th scope="row">Price USD</th>
          <td>$${Intl.NumberFormat().format(
            Number(specificCoinJSON.priceUsd).toFixed(2)
          )}</td>
          </tr>
          <tr>
          <th scope="row">% Change in last 24h</th>
          <td>${Number(specificCoinJSON.changePercent24Hr).toFixed(2)}%</td>
          </tr>
          <tr>
          <th scope="row">Average price in last 24h (volume-weighted)</th>
          <td>${Intl.NumberFormat().format(
            Number(specificCoinJSON.vwap24Hr).toFixed(2)
          )}</td>
          </tr>
        </tbody>
      </table>
        </div>
      </div>
    </div>
  </div>
  `).appendTo("#row-0");
    const xValues = [
      "One Year",
      "Six Months",
      "One Month",
      "One Week",
      "Today",
    ];
    const yValues = [
      Number(coinHistory.data[360].priceUsd).toFixed(2),
      Number(coinHistory.data[180].priceUsd).toFixed(2),
      Number(coinHistory.data[30].priceUsd).toFixed(2),
      Number(coinHistory.data[7].priceUsd).toFixed(2),
      Number(specificCoinJSON.priceUsd).toFixed(2),
    ];

    new Chart("myChart", {
      type: "line",
      data: {
        labels: xValues,
        datasets: [
          {
            borderColor: "rgba(0,0,255,0.1)",
            data: yValues,
          },
        ],
      },
      options: {
        legend: { display: false },
      },
    });
  };

  externals.loadSingleCoinPage = (coinJSON, coinHistory) => {
    internals.createSingleCoinCard(coinJSON, coinHistory);
  };

  externals.insertDataIntoWebsite = (coinsData) => {
    internals.populateWebsite(coinsData);
  };

  externals.prepareViewCryptoController = () => {
    internals.clearPanel();
    internals.defaultStartAllCryptos();
  };

  externals.prepareViewSingleCrypto = (selectedCrypto) => {
    internals.clearPanel();
    $("#headerText").text(`Details about ${selectedCrypto}`);
  };

  return externals;
});
