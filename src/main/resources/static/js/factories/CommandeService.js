stocksApp
.factory('CommandeService', function ($resource) {
  var data_clients = $resource("/stocks/get/commande/:idCommande", {idCommande:'@idCommande'});
  return data_clients;
});
