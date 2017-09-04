stocksApp
.factory('AchatService', function ($resource) {
  var data_clients = $resource("/stocks/get/achat/:idAchat", {idAchat:'@idAchat'});
  return data_clients;
});
