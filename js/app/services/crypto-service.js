define(function() {
    var internals = {}; // internal state
    var externals = {}; // external api

    internals.getAllInformation = () => {
        $.ajax({
        url: 'https://api.coincap.io/v2/assets',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + '73c931ec-a0d2-4a4f-8cc8-030689b7d007');
          },
        async: true,
        dataType: "json",
            success: function(results) { internals.handleAllData(null, results) },
            error: function(request, statusText, httpError) { handleAllData(httpError || statusText) }
        })};

    internals.handleAllData = function(error, results) {
        if(error) {
            throw Error("Failure with AJAX request.");
        }
        internals.data = results;
    };


    externals.startAjax = () => {
        internals.getAllInformation();
    }

    externals.getCoins = function(cb) {
        cb(internals.data);
    };

    return externals;
});
