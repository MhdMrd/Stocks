stocksApp
.factory('AchatService', function ($resource) {
  var data_clients = $resource("http://localhost:8080/stocks/get/achat/:idAchat", {idAchat:'@idAchat'});
  return data_clients;
});
