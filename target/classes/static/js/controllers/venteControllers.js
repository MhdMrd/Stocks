  stocksApp
    .controller("newVenteController", ["$scope", "$http", "$location", "$window", "VenteService", function ($scope, $http, $location, $window, VenteService) {
      $scope.home = false;
      $scope.isGet=false;
      $scope.hideProduit=false;
      $scope.hideClient = false;
      $scope.hide=false;
      $scope.hideEtat = false;
      $scope.etats = ["Effectuee", "En_attente"];
      $scope.currentEmploye={
        "idemploye":null
      };
      $scope.currentProduct={
        "idProduit":null
      };
      $scope.currentClient={
        "idClient":null
      };
      $scope.clients={
        "value1":"Client",
        "choices":[
          "Client"
        ]
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
        "choices":[
          "Employé"
        ]
      };
      $scope.produits={
        "value1":"Produit",
        "choices":[
          "Produit"
        ]
      };
      $scope.clients={
        "value1":"Client",
        "choices":[
          "Client"
        ]
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
        $scope.tmpClient=null;
        $http.get("/stocks/listes/clients").then(function(response){
          var tmpClient=response.data;
          $scope.clients.choices.push(tmpClient);
        }, false);
        
        $http.get("/stocks/listes/produits/disponibles").then(function (response) {
          tmpProduits = response.data;
          $scope.produits.choices.push(tmpProduits);
        })
        if($scope.endOfPath!="vente" && $scope.endOfPath!="ventes"){
          $scope.selectedItem = VenteService.get({idVente:$scope.endOfPath});
          console.log($scope.selectedItem);
      }
  }
      //GET list of ventes
      $scope.getListe=function(){
        if($scope.endOfPath=="ventes"){
          $scope.isGet=true;
          $http.get("/stocks/listes/ventes?page="+$scope.page+"&size=2").then(successCallback, errorCallback);
        }
      }
      $scope.getListe();
      
      //POST a category
      $scope.save=function(vente) {
        if ($scope.endOfPath=="vente") {
          if($scope.date !=null && $scope.time!=null)
            $scope.currentEmploye=$scope.vente.employe;
            $scope.currentProduct=$scope.vente.produit;
            $scope.currentClient = $scope.vente.client;
            $scope.vente={
              "employe":{
                "idEmploye":employeAuth
              },
              "produit":{
                "idProduit":$scope.currentProduct[0]
              },
              "client":{
                "idClient":$scope.currentClient[0]
              },
              "etat":'En_attente',
              //"datevente":new Date($scope.date.toString()+" "+$scope.time.toString()).getTime()
              "dateVente":Date.now()
            }
            $http.post("/stocks/add/vente", $scope.vente);
            //$window.location.href='#/stocks/listes/employes';
        }
        //PUT a category
        if ($scope.endOfPath!="vente" && $scope.endOfPath!="ventes") {
          console.log($scope.selectedItem.content[10]);
          if($scope.hideEtat || $scope.hideProduit || $scope.hideClient){
            if ($scope.hideProduit) {
            if ($scope.hideClient) {
            $scope.venteToUpdate={
              "produit":{
                "idProduit":$scope.currentProduct.idProduit
              },
              "client":{
                "idClient":$scope.currentClient.idClient
              },
              "etat":$scope.selectedItem.content[0][6],
              "employe":{
                "idEmploye":$scope.selectedItem.content[0][12]
              },
              "dateVente":$scope.selectedItem.content[0][5]
            }
          } else {
            console.log($scope.selectedItem.content[10]);
            $scope.venteToUpdate={
              "produit":{
                "idProduit":$scope.currentProduct.idProduit
              },
              "client":{
                "idClient":$scope.selectedItem.$promise.$$state.value.content[0][10]
              },
              "etat":$scope.selectedItem.content[0][6],
              "employe":{
                "idEmploye":$scope.selectedItem.content[0][12]
              },
              "dateVente":$scope.selectedItem.content[0][5]
            }
          }
        } else {
          if ($scope.hideClient) {
            $scope.venteToUpdate={
              "produit":{
                "idProduit":$scope.selectedItem.$promise.$$state.value.content[0][11]
              },
              "client":{
                "idClient":$scope.currentClient.idClient
              },
              "etat":$scope.selectedItem.content[0][6],
              "employe":{
                "idEmploye":$scope.selectedItem.content[0][12]
              },
              "dateVente":$scope.selectedItem.content[0][5]
            }
          } else {
            $scope.venteToUpdate={
              "produit":{
                "idProduit":$scope.selectedItem.$promise.$$state.value.content[0][11]
              },
              "client":{
                "idClient":$scope.selectedItem.$promise.$$state.value.content[0][10]
              },
              "etat":$scope.selectedItem.content[0][6],
              "employe":{
                "idEmploye":$scope.selectedItem.content[0][12]
              },
              "dateVente":$scope.selectedItem.content[0][5]
            }
          }
        }
        $http.put("/stocks/edit/vente/"+$scope.endOfPath, $scope.venteToUpdate).then(successCallback, errorCallback);
      }
      
      }
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
      };
      $scope.updateProduit=function (idProduit) {
        $scope.hideProduit = true;
        $scope.currentProduct.idProduit = $scope.selectedItem.content[0][3][0];
      };
      $scope.updateEtat=function (etat) {
        $scope.hideEtat = true;
      }
      $scope.updateClient=function (client) {
        $scope.hideClient = true;
        $scope.currentClient.idClient = $scope.venteToUpdate.client.idClient[0];
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
