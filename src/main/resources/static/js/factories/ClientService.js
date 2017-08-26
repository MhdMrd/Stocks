stocksApp
.factory('ClientService', function ($resource) {
  var data_clients = $resource("http://localhost:8080/stocks/get/client/:idClient", {idClient:'@idClient'}, {
    update:{
      method:'PUT'
    },
  });
  return data_clients;
})
.factory('ClientServicePost', function ($resource) {
  var data_clients = $resource("http://localhost:8080/stocks/add/client", {
    save:{
      method:'POST'
    }
  });
  return data_clients;
})
.factory('ClientServicePut', function ($resource) {
  var data_clients = $resource("http://localhost:8080/stocks/edit/client/:idClient",{idClient:'@idClient'}, {
    update:{
      method:'PUT'
    }
  });
  return data_clients;
});
