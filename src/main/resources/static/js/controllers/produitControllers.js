stocksApp
  .controller("newProduitController", ["$scope", "$http","$location", "$window", "produitService", function($scope, $http, $location, $window, produitService){
    $scope.home = false;
    $scope.isGet=false;
    $scope.hideSituation = false;
    $scope.hideEtat = false;
    $scope.produits=null;
    $scope.selectedItem=null;
    $scope.hideCategorie=false;
    $scope.currentCategorie={
          "idCategorie":null
    };
    $scope.produit={
      "situation":"Situation",
      "designation":null,
      "numSerie":null,
      "etat":"Etat",
      "remarque":"RAS"
    };
    $scope.categories={
      "value1":"Categorie",
      "choices":[
        "Categorie"
      ]
    };
    $scope.totalPages = null;
    $scope.page=0;
    $scope.size = 10;
    $scope.total = null;
    $scope.path=$location.path().split('/');
    $scope.endOfPath=$scope.path[$scope.path.length-1];
    $scope.onload=function() {
      if($scope.endOfPath!="produit" && $scope.endOfPath!="produits"){
        $scope.selectedItem = produitService.get({idProduit:parseInt($scope.endOfPath)});
        console.log($scope.selectedItem.$promise.$$state.status)
        for(var s in $scope.selectedItem.$promise.$$state.status){
          console.log(s);  
        }
        console.log($scope.selectedItem);
      }
      $http.get("/stocks/listes/categories").then(function (response) {
        tmpCategories = response.data;
        $scope.categories.choices.push(tmpCategories);
      })
    }
    //GET list of produits
    $scope.getListe=function () {
      if($scope.endOfPath=="produits"){
          $scope.isGet=true;
          $http.get("/stocks/listes/produits/disponibles?page="+$scope.page+"&size="+$scope.size).then(successCallback, errorCallback);
      }
    }
    $scope.getListe();
    //POST a category
    $scope.save=function(produit) {
      if ($scope.endOfPath=="produit") {
          var designation = $scope.produit.designation;
          var numSerie=$scope.produit.numSerie;
          var etat=$scope.produit.etat;
          var remarque=$scope.produit.remarque;
          var idcategorie = $scope.produit.categorie;
          $scope.produit = {
            "situation":"Disponible",
            "categorie":{
              "idCategorie":idcategorie[0]
            },
            "designation":designation,
            "numSerie":numSerie,
            "etat":etat,
            "remarque":remarque
          };
          $http.post("/stocks/add/produit", $scope.produit);
          //$window.location.href='#/stocks/listes/clients';
      }
      //PUT a category
      if($scope.endOfPath!="produit" && $scope.endOfPath!="produits"){
        if ($scope.hideCategorie) {
          $scope.produitToUpdate = {
            "situation":$scope.selectedItem.$promise.$$state.value.content[0][9].toString(),
            "categorie":{
              "idCategorie":parseInt($scope.selectedItem.$promise.$$state.value.content[0][8])
            },
            "designation":$scope.selectedItem.$promise.$$state.value.content[0][1].toString(),
            "numSerie":$scope.selectedItem.$promise.$$state.value.content[0][2].toString(),
            "etat":$scope.selectedItem.$promise.$$state.value.content[0][6].toString(),
            "remarque":$scope.selectedItem.$promise.$$state.value.content[0][7].toString()
          };
        } else {
          $scope.produitToUpdate={
            "categorie":{
              "idCategorie":$scope.selectedItem.content[0][8]
            },
            "situation":$scope.selectedItem.$promise.$$state.value.content[0][9].toString(),
            "designation":$scope.selectedItem.$promise.$$state.value.content[0][1].toString(),
            "numSerie":$scope.selectedItem.$promise.$$state.value.content[0][2].toString(),
            "etat":$scope.selectedItem.$promise.$$state.value.content[0][6].toString(),
            "remarque":$scope.selectedItem.$promise.$$state.value.content[0][7].toString()
          };
        }
          /*$scope.produitToUpdate = {
            "idproduit":parseInt($scope.selectedItem.content[0][0]),
            "nom":$scope.selectedItem.content[0][1],
            "quantiteDisponible":$scope.selectedItem.content[0][2],
            "quantiteDefectueux":$scope.selectedItem.content[0][3],
            "remarque":$scope.selectedItem.content[0][4]
          }*/
          $http.put("/stocks/edit/produit/"+$scope.endOfPath, $scope.produitToUpdate).then(successCallback, errorCallback);
          //ClientServicePut.update({idClient:$scope.endOfPath}, $scope.clientToUpdate);
      }
    };
    $scope.reset=function(produit){
      $scope.produit={
        "situation":"Situation",
        "designation":null,
        "numSerie":null,
        "etat":"Etat",
        "remarque":"RAS"
    };
      if($scope.endOfPath!="produit" && $scope.endOfPath!="produits"){
        $scope.selectedItem.content[0]=[null, null, null, null, null];
      }
      
    };
    $scope.edit=function(produit){
      $scope.produit = produit;
    };
    function successCallback(response){
      if($scope.isGet){
          $scope.produits = response.data;
          $scope.totalPages = new Array(response.data.totalPages);
          $scope.total = response.data.totalPages;
      }else{
        if ($scope.endOfPath!="produit") {
            $scope.selectedItem = response.data;
        }
          $scope.produit = response.data;
      }
    }
    function errorCallback(error){
      alert(error);
    }
    function hasBeenChanged(){

    }
    $scope.details=function(idproduit) {
      $scope.selectedItem = produitService.get({idProduit:idproduit});
    };
    //DELETE a category
    $scope.delete=function (idproduit) {
      if($scope.isGet){
          $http.delete("/stocks/delete/produit/"+idproduit);
      }
    }

    $scope.gotoPage = function(page){
        $scope.page = page;
        $scope.getListe();
    }
    $scope.updateCategorie=function (idCategorie) {
      $scope.hideCategorie = true;
      if($scope.endOfPath=="produit") {
        $scope.currentCategorie.idCategorie = $scope.produit.categorie[0];
      } else {

      }
    };

    $scope.updateEtat = function (){
      $scope.hideEtat = true;
    }
    $scope.updateSitutation = function (){
      $scope.hideSituation = true;
    }
  }])
