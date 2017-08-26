stocksApp
.factory('EmployeService', function ($resource) {
  var data_clients = $resource("http://localhost:8080/stocks/get/employe/:idEmploye", {idEmploye:'@idEmploye'});
  return data_clients;
})
