stocksApp
.factory('VenteService', function ($resource) {
  var data_clients = $resource("/stocks/get/vente/:idVente", {idVente:'@idVente'});
  return data_clients;
});
