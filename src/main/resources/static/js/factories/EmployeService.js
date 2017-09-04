stocksApp
.factory('EmployeService', function ($resource) {
  var data_clients = $resource("/stocks/get/employe/:idEmploye", {idEmploye:'@idEmploye'});
  return data_clients;
})
