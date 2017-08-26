stocksApp
  .controller("newVenteController", ["$scope", "$http", "$location", "$window", "VenteService", function ($scope, $http, $location, $window, VenteService) {
    $scope.home = false;
    $scope.isGet=false;
    $scope.hideProduit=false;
    $scope.hide=false;
    $scope.hideEtat = false;
    $scope.etats = ["Effectuee", "En_attente"];
    $scope.currentEmploye={
      "idemploye":null
    };
    $scope.currentProduct={
      "idProduit":null
    };
    $scope.completeDate=null;
    $scope.selectedItem=null;
    $scope.ventes=null;
    $scope.time=null;
    $scope.date=null;
    $scope.totalPages = null;
    $scope.page=0;
    $scope.total = null;
    $scope.venteToUpdate={
      "idVente":null,
      "employe":{
        "idEmploye":null
      },
      "produit":{
        "idProduit":null
      },
      "etat":null
    };
    $scope.dateS={
      "date":null
    };

    $scope.employes={
      "value1":"employe",
      "choices":[]
    };
    $scope.produits={
      "value1":"Produit",
      "choices":[]
    };
    $scope.vente={
      "employe":"Employe",
      "produit":"Produit",
      "dateVente":null
    };
    $scope.totalPages = null;
    $scope.path=$location.path().split('/');
    $scope.endOfPath=$scope.path[$scope.path.length-1];

    $scope.onload=function() {
      $scope.tmpEmploye=null;
      $http.get("/stocks/listes/employes").then(function(response){
        var tmpEmploye=response.data;
        $scope.employes.choices.push(tmpEmploye);
      }, false);
      $http.get("/stocks/listes/produits/disponibles").then(function (response) {
        tmpProduits = response.data;
        $scope.produits.choices.push(tmpProduits);
      })
      if($scope.endOfPath!="vente" && $scope.endOfPath!="ventes"){
        $scope.selectedItem = VenteService.get({idVente:$scope.endOfPath});
        /*$scope.venteToUpdate = {
          "idVente":parseInt($scope.selectedItem.content[0][0]),
          "employe":{
            "idEmploye":$scope.selectedItem.content[0][1]
          },
          "produit":{
            "idProduit":$scope.selectedItem.content[0][3]
          },
          "etat":$scope.selectedItem.content[0][6]
      }*/
    }
}
    //GET list of ventes
    $scope.getListe=function(){
      if($scope.endOfPath=="ventes"){
        $scope.isGet=true;
        $http.get("http://localhost:8080/stocks/listes/ventes?page="+$scope.page+"&size=2").then(successCallback, errorCallback);
      }
    }
    $scope.getListe();
    
    //POST a category
    $scope.save=function(vente) {
      if ($scope.endOfPath=="vente") {
        if($scope.date !=null && $scope.time!=null)
          $scope.currentEmploye=$scope.vente.employe;
          $scope.currentProduct=$scope.vente.produit;
          $scope.vente={
            "employe":{
              "idEmploye":$scope.currentEmploye[0]
            },
            "produit":{
              "idProduit":$scope.currentProduct[0]
            },
            "etat":'En_attente',
            //"datevente":new Date($scope.date.toString()+" "+$scope.time.toString()).getTime()
            "dateVente":Date.now()
          }
          $http.post("/stocks/add/vente", $scope.vente);
          //$window.location.href='#/stocks/listes/employes';
      }
      //PUT a category
      /*if($scope.endOfPath!="vente" && $scope.endOfPath!="ventes"){
        if (!$scope.hide && !$scope.hideProduit && !$scope.hideEtat) {

        }
        if ($scope.hide || $scope.hideProduit || $scope.hideEtat) {
          if($scope.hide){
            $scope.venteToUpdate = {
              "idVente":parseInt($scope.selectedItem.content[0][0]),
              "employe":{
                "idEmploye":$scope.selectedItem.content[0][1][0]
              },
              "produit":{
                "idProduit":$scope.selectedItem.content[0][3]
              },
              //"dateVente":$scope.selectedItem.content[0][5],
              "etat":$scope.selectedItem.content[0][6]
            }
          }
          if ($scope.hideProduit) {
            $scope.venteToUpdate = {
              "idVente":parseInt($scope.selectedItem.content[0][0]),
              "employe":{
                "idEmploye":$scope.selectedItem.content[0][1]
              },
              "produit":{
                "idProduit":$scope.selectedItem.content[0][3][0]
              },
              //"dateVente":$scope.selectedItem.content[0][5],
              "etat":$scope.selectedItem.content[0][6]
            }
          }
        }
          /*$scope.venteToUpdate = {
            "idVente":parseInt($scope.selectedItem.content[0][0]),
            "employe":{
              "idEmploye":$scope.selectedItem.content[0][1][0]
            },
            "produit":{
              "idProduit":$scope.selectedItem.content[0][3][0]
            },
            //"dateVente":$scope.selectedItem.content[0][5],
            "etat":$scope.selectedItem.content[0][6]
          }*/
          if((!$scope.hide)&&(!$scope.hideProduit)&&(!$scope.hideEtat)){

          }else{
            $scope.venteToUpdate = {
              "idVente":parseInt($scope.selectedItem.content[0][0]),
              "employe":{
                "idEmploye":$scope.selectedItem.content[0][1]
              },
              "produit":{
                "idProduit":$scope.selectedItem.content[0][3]
              },
              //"dateVente":$scope.selectedItem.content[0][5],
              "etat":$scope.selectedItem.content[0][6]
            }
            if($scope.hide){
              $scope.venteToUpdate = {
                "idVente":parseInt($scope.selectedItem.content[0][0]),
                "employe":{
                  "idEmploye":$scope.selectedItem.content[0][1]
                }
              }
              $scope.venteToUpdate.employe.idEmploye = $venteToUpdate.employe[0];
            }
            if($scope.hideProduit){

              for (var p in $scope.venteToUpdate) {
                console.log(p);
              }
              console.log($scope.venteToUpdate);
              $window.alert(typeof($scope.venteToUpdate.produit.idProduit[0]));
              $scope.venteU = {
                "idVente":parseInt($scope.selectedItem.content[0][0]),
                "produit":{
                  "idProduit":$scope.venteToUpdate.produit[0]
                }
              }
            }
            if($scope.hideEtat){
              $scope.venteToUpdate = {
                "idVente":parseInt($scope.selectedItem.content[0][0]),
                "etat":$scope.selectedItem.content[0][6]
              }
              $scope.venteToUpdate.etat = $scope.venteToUpdate.etat;
            }
            $http.put("/stocks/edit/vente/"+$scope.endOfPath, $scope.venteU).then(successCallback, errorCallback);
          }
          //employeServicePut.update({idemploye:$scope.endOfPath}, $scope.employeToUpdate);
      };
    $scope.reset=function(vente){
      $scope.employes.value1="employe";
      $scope.produits.value1="Produit";
      $scope.vente={
        "employe":"Employe",
        "produit":"Produit",
        "datevente":null
      };
      $scope.onload();
      $scope.date=null;
      $scope.time=null;
      $scope.completeDate=null;
      $scope.hide=false;
      $scope.hideProduit=false;
      $scope.hideEtat=false;
    };
    $scope.edit=function(vente){
      $scope.vente = vente;
    };
    function successCallback(response){
      if($scope.isGet){
          $scope.ventes = response.data;
          $scope.totalPages = new Array(response.data.totalPages);
          $scope.total = response.data.totalPages;
      }else{
          $scope.vente = response.data;
      }
    }
    function errorCallback(error){
      alert(error);
    }
    $scope.details=function(idVente) {
      $scope.selectedItem = VenteService.get({idVente:idVente});
    };
    //DELETE a category
    $scope.delete=function (idVente) {
      if($scope.isGet){
          $http.delete("/stocks/delete/vente/"+idVente);
      }
    }
    $scope.update = function (idEmploye) {
      $scope.hide = true;
      $scope.hideProduit=true;
      $scope.hideEtat=true;
      $scope.currentEmploye.idEmploye=idEmploye;
    };
    $scope.updateProduit=function (idProduit) {
      $scope.hideProduit = true;
      $scope.currentProduct.idProduit = idProduit;
    };
    $scope.updateEtat=function (etat) {
      $scope.hideEtat = true;
    }
    $scope.gotoPage = function(page){
        $scope.page = page;
        $scope.getListe();
    }


    //TimePicker
    var currentTime = new Date();
    $scope.currentTime = currentTime;
    $scope.month = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    $scope.monthShort = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Dec'];
    $scope.weekdaysFull = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    $scope.weekdaysLetter = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
    $scope.disable = [false, 1, 7];
    $scope.today = 'Aujourd\'hui';
    $scope.clear = 'Effacer';
    $scope.close = 'Ok';
    var days = 15;
    $scope.minDate = new Date(1990, 11, 17).toISOString();
    $scope.maxDate = new Date().toISOString();
    $scope.onStart = function () {
        console.log('onStart');
    };
    $scope.onRender = function () {
        console.log('onRender');
    };
    $scope.onOpen = function () {
        console.log('onOpen');
    };
    $scope.onClose = function () {
        console.log('onClose');
    };
    $scope.onSet = function () {
        console.log('onSet');
    };
    $scope.onStop = function () {
        console.log('onStop');

    };
  }])
