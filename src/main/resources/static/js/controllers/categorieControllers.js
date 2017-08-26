stocksApp
  .controller("newCategorieController", ["$scope", "$http","$location", "$window", "CategorieService", function($scope, $http, $location, $window, CategorieService){
    $scope.home = false;
    $scope.isGet=false;
    $scope.categories=null;
    $scope.selectedItem=null;
    $scope.categorie={
      "nom":null,
      "quantiteDefecteux":0,
      "quantiteDisponible":0,
      "remarque":"RAS"
    };
    $scope.totalPages = null;
    $scope.page=0;
    $scope.total = null;
    $scope.path=$location.path().split('/');
    $scope.endOfPath=$scope.path[$scope.path.length-1];
    $scope.onload=function() {
      if($scope.endOfPath!="categorie" && $scope.endOfPath!="categories"){
        $scope.selectedItem = CategorieService.get({idCategorie:$scope.endOfPath});
      }
    }
    //GET list of categories
    $scope.getListe=function () {
      if($scope.endOfPath=="categories"){
          $scope.isGet=true;
          $http.get("http://localhost:8080/stocks/listes/categories?page="+$scope.page).then(successCallback, errorCallback);
      }
    }
    $scope.getListe();
    //POST a category
    $scope.save=function(categorie) {
      if ($scope.endOfPath=="categorie") {
          $http.post("/stocks/add/categorie", $scope.categorie);
          //$window.location.href='#/stocks/listes/clients';
      }
      //PUT a category
      if($scope.endOfPath!="categorie" && $scope.endOfPath!="categories"){
          $scope.categorieToUpdate = {
            "idCategorie":parseInt($scope.selectedItem.content[0][0]),
            "nom":$scope.selectedItem.content[0][1],
            "quantiteDisponible":$scope.selectedItem.content[0][2],
            "quantiteDefectueux":$scope.selectedItem.content[0][3],
            "remarque":$scope.selectedItem.content[0][4]
          }
          $http.put("/stocks/edit/categorie/"+$scope.endOfPath, $scope.categorieToUpdate).then(successCallback, errorCallback);
          //ClientServicePut.update({idClient:$scope.endOfPath}, $scope.clientToUpdate);
      }
    };
    $scope.reset=function(categorie){
      $scope.categorie={
        "nom":null,
        "quantiteDefecteux":0,
        "quantiteDisponible":0,
        "remarque":"RAS"
      };
      if($scope.endOfPath!="categorie" && $scope.endOfPath!="categories"){
        $scope.selectedItem.content[0]=[null, null, null, null, null];
      }
      
    };
    $scope.edit=function(categorie){
      $scope.categorie = categorie;
    };
    function successCallback(response){
      if($scope.isGet){
          $scope.categories = response.data;
          $scope.totalPages = new Array(response.data.totalPages);
          $scope.total = response.data.totalPages;
      }else{
          $scope.categorie = response.data;
      }
    }
    function errorCallback(error){
      alert(error);
    }
    $scope.details=function(idCategorie) {
      $scope.selectedItem = CategorieService.get({idCategorie:idCategorie});
    };
    //DELETE a category
    $scope.delete=function (idCategorie) {
      if($scope.isGet){
          $http.delete("/stocks/delete/categorie/"+idCategorie);
      }
    }

    $scope.gotoPage = function(page){
        $scope.page = page;
        $scope.getListe();
    }

  }])
