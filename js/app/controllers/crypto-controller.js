define(['views/crypto-view', 'services/crypto-service'], function(
    cryptoView,
    cryptoService
) {
    var externals = {};
    var internals = {};

    externals.start = function() {
        cryptoService.startAjax();
    };

    internals.populateWebsite = function(data){
        $(`<div class='col-md-6 col-lg-4 mb-5'>teste</div>`).appendTo("#cryptoGrid");
        console.log("recebeu a puta da data:" + data);
    }

    return externals;
});
