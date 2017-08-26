stocksApp
.factory('VenteService', function ($resource) {
  var data_clients = $resource("http://localhost:8080/stocks/get/vente/:idVente", {idVente:'@idVente'});
  return data_clients;
});
