stocksApp
  .controller("newAchatController", ["$scope", "$http", "$location", "$window", "AchatService", function ($scope, $http, $location, $window, AchatService) {
    $scope.home = false;
    $scope.isGet=false;
    $scope.hideProduit=false;
    $scope.hide=false;
    $scope.currentClient={
      "idClient":null
    };
    $scope.currentProduct={
      "idProduit":null
    };
    $scope.completeDate=null;
    $scope.selectedItem=null;
    $scope.achats=null;
    $scope.time=null;
    $scope.date=null;
    $scope.dateS={
      "date":null
    };
    $scope.clients={
      "value1":"Client",
      "choices":[
        "Client"
      ]
    };
    $scope.produits={
      "value1":"Produit",
      "choices":[]
    };
    $scope.achat={
      "client":"Client",
      "produit":"Produit",
      "dateAchat":null
    };
    $scope.totalPages = null;
    $scope.page=0;
    $scope.total = null;
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
      if($scope.endOfPath!="achat" && $scope.endOfPath!="achats"){
        $scope.selectedItem = AchatService.get({idAchat:$scope.endOfPath});

      }
    }

    //GET list of achats
    $scope.getListe=function(){
      if($scope.endOfPath=="achats"){
        $scope.isGet=true;
        $http.get("/stocks/listes/achats?page="+$scope.page+"&size=2").then(successCallback, errorCallback);
      }
    }
    $scope.getListe();

    //POST a category
    $scope.save=function(achat) {
      if ($scope.endOfPath=="achat") {
        if($scope.date !=null && $scope.time!=null)
          $scope.currentClient=$scope.achat.client;
          $scope.currentProduct=$scope.achat.produit;
          $scope.achat={
            "client":{
              "idClient":$scope.currentClient[0]
            },
            "produit":{
              "idProduit":$scope.currentProduct[0]
            },
            //"dateAchat":new Date($scope.date.toString()+" "+$scope.time.toString()).getTime()
            "dateAchat":Date.now()
          }
          $http.post("/stocks/add/achat", $scope.achat);
          //$window.location.href='#/stocks/listes/clients';
      }
      //PUT a category
      if($scope.endOfPath!="achat" && $scope.endOfPath!="achats"){
          $scope.achatToUpdate = {
            "idAchat":parseInt($scope.selectedItem.content[0][0]),
            "client":{
              "idClient":$scope.selectedItem.content[0][1][0]
            },
            "produit":{
              "idProduit":$scope.selectedItem.content[0][3][0]
            },
            "dateAchat":$scope.selectedItem.content[0][5]
          }
          $http.put("/stocks/edit/achat/"+$scope.endOfPath, $scope.achatToUpdate).then(successCallback, errorCallback);
          //ClientServicePut.update({idClient:$scope.endOfPath}, $scope.clientToUpdate);
      }
    };
    $scope.reset=function(achat){
      $scope.clients.value1="Client";
      $scope.produits.value1="Produit";
      $scope.achat={
        "client":"Client",
        "produit":"Produit",
        "dateAchat":null
      };
      $scope.onload();
      $scope.date=null;
      $scope.time=null;
      $scope.completeDate=null;
    };
    $scope.edit=function(achat){
      $scope.achat = achat;
    };
    function successCallback(response){
      if($scope.isGet){
          $scope.achats = response.data;
          $scope.totalPages = new Array(response.data.totalPages);
          $scope.total = response.data.totalPages;
      }else{
          $scope.achat = response.data;
      }
    }
    function errorCallback(error){
      alert(error);
    }
    $scope.details=function(idAchat) {
      $scope.selectedItem = AchatService.get({idAchat:idAchat});
    };
    //DELETE a category
    $scope.delete=function (idAchat) {
      if($scope.isGet){
          $http.delete("/stocks/delete/achat/"+idAchat);
      }
    }
    $scope.update = function (idClient) {
      $scope.hide = true;
      $scope.currentClient.idClient=idClient;
    };
    $scope.updateProduit=function (idProduit) {
      $scope.hideProduit = true;
      $scope.currentProduct.idProduit = idProduit;
    };

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
