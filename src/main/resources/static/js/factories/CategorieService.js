stocksApp
.factory('CategorieService', function ($resource) {
  var data_clients = $resource("/stocks/get/categorie/:idCategorie", {idCategorie:'@idCategorie'});
  return data_clients;
});
