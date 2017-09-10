stocksApp
.factory('BilanService', function ($resource) {
  var data_clients = $resource("/stocks/get/bilan/:idBilan", {idBilan:'@idBilan'});
  return data_clients;
});
