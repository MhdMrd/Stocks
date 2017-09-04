stocksApp
  .controller("newClientController", ["$scope", "$http", "ClientService", "$window","$location", "ClientServicePost", "ClientServicePut", function($scope, $http, ClientService, $window, $location, ClientServicePost, ClientServicePut){
    $scope.home = false;
    $scope.isGet=false;
    $scope.clients=null;
    $scope.selectedItem=null;
    $scope.client={
      "numCNI":null,
      "nom":null,
      "prenom":null
    };
    $scope.totalPages = null;
    $scope.page=0;
    $scope.total = null;
    $scope.path=$location.path().split('/');
    $scope.endOfPath=$scope.path[$scope.path.length-1];
    $scope.onload=function() {
      if($scope.endOfPath!="client" && $scope.endOfPath!="clients"){
        $scope.selectedItem = ClientService.get({idClient:$scope.endOfPath});
      }
    }
    //GET list of clients
    $scope.getListe = function(){
      if($scope.endOfPath=="clients"){
        $scope.isGet=true;
        $http.get("/stocks/listes/clients?page="+$scope.page).then(successCallback, errorCallback);
      }
    }
    $scope.getListe();
    
    //POST a client
    $scope.save=function(client) {
      if ($scope.endOfPath=="client") {
          ClientServicePost.save($scope.client);
          //$window.location.href='#/stocks/listes/clients';
      }
      //PUT a client
      if($scope.endOfPath!="client" && $scope.endOfPath!="clients"){
          $scope.clientToUpdate = {
            "idClient":parseInt($scope.selectedItem.content[0][0]),
            "numCNI":$scope.selectedItem.content[0][1],
            "nom":$scope.selectedItem.content[0][2],
            "prenom":$scope.selectedItem.content[0][3]
          }
          $http.put("/stocks/edit/client/"+$scope.endOfPath, $scope.clientToUpdate).then(successCallback, errorCallback);
          //ClientServicePut.update({idClient:$scope.endOfPath}, $scope.clientToUpdate);
      }
    };
    $scope.reset=function(client){
      $scope.client={
        "numCNI":null,
        "nom":null,
        "prenom":null
      };

      if($scope.endOfPath!="client" && $scope.endOfPath!="clients"){
        $scope.selectedItem.content[0]=[null, null, null, null];
      }

    };
    $scope.edit=function(client){
      $scope.client = client;
    };
    function successCallback(response){
      if($scope.isGet){
          $scope.clients = response.data;
          $scope.totalPages = new Array(response.data.totalPages);
          $scope.total = response.data.totalPages;
      }else{
          $scope.client = response.data;
      }
    }
    function errorCallback(error){
      console.log(error);
    }
    $scope.details=function(idClient) {
      $scope.selectedItem = ClientService.get({idClient:idClient});
    };
    //DELETE a client
    $scope.delete=function (idClient) {
      if($scope.isGet){
          $http.delete("/stocks/delete/client/"+idClient);
      }
    }
    
    $scope.gotoPage = function(page){
        $scope.page = page;
        $scope.getListe();
    }
  }]);
