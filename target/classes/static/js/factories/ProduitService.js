stocksApp
.factory('produitService', function ($resource) {
  var data_clients = $resource("/stocks/get/produit/:idProduit", {idProduit:'@idProduit'});
  console.log("Data:"+data_clients)
  return data_clients;
});
