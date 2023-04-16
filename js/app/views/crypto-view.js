define(function () {
  let internals = {};

  let externals = {};

  internals.populateWebsite = (allCoinsData) => {
    for (let index = 1; index < 25; index++) {
      const element = allCoinsData.data[index - 1];
      let appendToTarget = `#row-0`;

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
        alert(parentId);
      }
    });
  };

  internals.clearPanel = () => {
    $(".row").empty();
  };

  externals.insertDataIntoWebsite = (coinsData) => {
    internals.populateWebsite(coinsData);
  };

  externals.prepareViewForNewLoading = () => {
    internals.clearPanel();
  };

  return externals;
});
