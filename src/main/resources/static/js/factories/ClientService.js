stocksApp
.factory('ClientService', function ($resource) {
  var data_clients = $resource("/stocks/get/client/:idClient", {idClient:'@idClient'}, {
    update:{
      method:'PUT'
    },
  });
  return data_clients;
})
.factory('ClientServicePost', function ($resource) {
  var data_clients = $resource("/stocks/add/client", {
    save:{
      method:'POST'
    }
  });
  return data_clients;
})
.factory('ClientServicePut', function ($resource) {
  var data_clients = $resource("/stocks/edit/client/:idClient",{idClient:'@idClient'}, {
    update:{
      method:'PUT'
    }
  });
  return data_clients;
});
