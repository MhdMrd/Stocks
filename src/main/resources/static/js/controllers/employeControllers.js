stocksApp
  .controller("newEmployeController", ["$scope", "$http", "EmployeService", "$location", "$window", function($scope, $http, EmployeService, $location, $window){
    //$scope.home = false;
    $scope.isGet=false;
    $scope.employes=null;
    $scope.selectedItem=null;
    $scope.employe={
      "matricule":null,
      "nom":null,
      "prenom":null,
      "poste":null
    };
    $scope.totalPages = null;
    $scope.page=0;
    $scope.total = null;
    $scope.path=$location.path().split('/');
    $scope.endOfPath=$scope.path[$scope.path.length-1];
    $scope.onload=function() {
      if($scope.endOfPath!="employe" && $scope.endOfPath!="employes"){
        $scope.selectedItem = EmployeService.get({idEmploye:$scope.endOfPath});
      }
    }
    //GET list of employes
    $scope.getListe = function(){
      if($scope.endOfPath=="employes"){
        $scope.isGet=true;
        $http.get("/stocks/listes/employes?page="+$scope.page).then(successCallback, errorCallback);
    }
    }
    $scope.getListe();
    //POST an employee
    $scope.save=function(employe) {
      if ($scope.endOfPath=="employe") {
          $http.post("/stocks/add/employe", $scope.employe);
          //$window.location.href='#/stocks/listes/clients';
      }
      //PUT an employee
      if($scope.endOfPath!="employe" && $scope.endOfPath!="employes"){
          $scope.EmployeToUpdate = {
            "idEmploye":parseInt($scope.selectedItem.content[0][0]),
            "matricule":$scope.selectedItem.content[0][1],
            "nom":$scope.selectedItem.content[0][2],
            "prenom":$scope.selectedItem.content[0][3],
            "poste":$scope.selectedItem.content[0][4]
          }
          $http.put("/stocks/edit/employe/"+$scope.endOfPath, $scope.EmployeToUpdate).then(successCallback, errorCallback);
          //ClientServicePut.update({idClient:$scope.endOfPath}, $scope.clientToUpdate);
      }
    };
    $scope.reset=function(){
      $scope.employe={
        "matricule":null,
        "nom":null,
        "prenom":null,
        "poste":null
      };
      if($scope.endOfPath!="employe" && $scope.endOfPath!="employes"){
        $scope.selectedItem.content[0]=[null, null, null, null, null];
      }
      
    };
    $scope.edit=function(employe){
      $scope.categorie = employe;
    };
    function successCallback(response){
      if($scope.isGet){
          $scope.employes = response.data;
          $scope.totalPages = new Array(response.data.totalPages);
          $scope.total = response.data.totalPages;
      }else{
          $scope.employe = response.data;
      }
    }
    function errorCallback(error){
      console.log(error);
    }
    $scope.details=function(idEmploye) {
      $scope.selectedItem = EmployeService.get({idEmploye:idEmploye});
    };
    //DELETE a client
    $scope.delete=function (idEmploye) {
      if($scope.isGet){
          $http.delete("/stocks/delete/employe/"+idEmploye);
      }
    }

    $scope.gotoPage = function(page){
        $scope.page = page;
        $scope.getListe();
    }
  }]);
