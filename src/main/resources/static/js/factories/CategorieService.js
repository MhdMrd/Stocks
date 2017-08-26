stocksApp
.factory('CategorieService', function ($resource) {
  var data_clients = $resource("http://localhost:8080/stocks/get/categorie/:idCategorie", {idCategorie:'@idCategorie'});
  return data_clients;
});
