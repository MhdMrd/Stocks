    stocksApp
      .controller("newBilanController", ["$scope", "$http", "$location", "$window", "BilanService", "CategorieService", function ($scope, $http, $location, $window, BilanService,CategorieService) {
        $scope.home = false;
        $scope.isGet=false;
        $scope.hideCategorie = false;
        $scope.completeDate=null;
        $scope.selectedItem=null;
        $scope.bilans=null;
        $scope.time=null;
        $scope.date=null;
        $scope.restant = null;
        $scope.idC =0;
        $scope.totalPages = null;
        $scope.page=0;
        $scope.total = null;
        $scope.bilanToUpdate={
          "idBilan":null,
          "employeEmetteur":{
            "idEmploye":null
          },
          "categorie":{
            "idCategorie":null
          }
        };
        $scope.currentCategorie={
          "idCategorie":null
        };
        $scope.dateS={
          "date":null
        };

        $scope.categories={
          "value1":"Categorie",
          "choices":[
            "Categorie"
          ]
        };
        var dateB = new Date();
        $scope.bilan={
          "annee":dateB.getYear(),
          "categorie":"Categorie",
          "mois":dateB.getMonth(),
          "quantiteDebut":0,
          "quantiteFin":0
        };
        $scope.totalPages = null;
        $scope.path=$location.path().split('/');
        $scope.endOfPath=$scope.path[$scope.path.length-1];
        
        $scope.onload=function() {
          var tmpcategories = null;
          $http.get("/stocks/listes/categories").then(function (response) {
            tmpcategories = response.data;
            $scope.categories.choices.push(tmpcategories);
          })
          if($scope.endOfPath!="bilan" && $scope.endOfPath!="bilans"){
            $scope.selectedItem = BilanService.get({idBilan:$scope.endOfPath});
            console.log($scope.selectedItem);
        }
    }
        //GET list of bilans
        $scope.getListe=function(){
          if($scope.endOfPath=="bilans"){
            $scope.isGet=true;
            $http.get("/stocks/listes/bilans?page="+$scope.page).then(successCallback, errorCallback);
          }
        }
        $scope.getListe();
        
        //POST a category
        $scope.save=function(bilan) {
          if ($scope.endOfPath=="bilan") {
            if($scope.date !=null && $scope.time!=null)
              $scope.currentEmploye=$scope.bilan.employe;
              $scope.currentCategorie=$scope.bilan.categorie;
              $scope.currentClient = $scope.bilan.client;
              var d = new Date();
              console.log(d.getMinutes());
              $scope.bilan={
                "annee":dateB.getYear(),
                "categorie":"Categorie",
                "mois":dateB.getMonth(),
                "quantiteDebut":0,
                "quantiteFin":0
              };
              $http.post("/stocks/add/bilan", $scope.bilan);
              //$window.location.href='#/stocks/listes/employes';
          }
          //PUT a category
          if ($scope.endOfPath!="bilan" && $scope.endOfPath!="bilans") {
            
              if ($scope.hideCategorie) {
                console.log("02:   "+$scope.selectedItem.content[0][9]);
              $scope.bilanToUpdate={
                "reference":$scope.selectedItem.content[0][1],
                "categorie":{
                  "idCategorie":$scope.selectedItem.content[0][2][0]
                },
                "employeEmetteur":{
                  "idEmploye":employeAuth
                },
                "quantiteRestante":$scope.selectedItem.content[0][5],
                //"datebilan":new Date($scope.date.toString()+" "+$scope.time.toString()).getTime()
                "datebilan":$scope.selectedItem.content[0][7],
                "quantiteAbilanr":$scope.selectedItem.content[0][6],
                "observations":$scope.selectedItem.content[0][8]
              }
            }else {
              $scope.bilanToUpdate={
                "reference":$scope.selectedItem.content[0][1],
                "categorie":{
                  "idCategorie":$scope.selectedItem.content[0][9]
                },
                "employeEmetteur":{
                  "idEmploye":employeAuth
                },
                "quantiteRestante":$scope.selectedItem.content[0][5],
                //"datebilan":new Date($scope.date.toString()+" "+$scope.time.toString()).getTime()
                "datebilan":$scope.selectedItem.content[0][7],
                "quantiteAbilanr":$scope.selectedItem.content[0][6],
                "observations":$scope.selectedItem.content[0][8]
              }
            }
          $http.put("/stocks/edit/bilan/"+$scope.endOfPath, $scope.bilanToUpdate).then(successCallback, errorCallback);
        }
        
        };
          
          
        $scope.reset=function(bilan){
          $scope.categories.value1="Categorie";
          //$scope.hideCategorie = false;
          $scope.bilan={
          "annee":dateB.getYear(),
          "categorie":"Categorie",
          "mois":dateB.getMonth(),
          "quantiteDebut":0,
          "quantiteFin":0
        };
          $scope.onload();
          $scope.date=null;
          $scope.time=null;
          $scope.completeDate=null;
          $scope.hideCategorie=false;        
        };
        $scope.edit=function(bilan){
          $scope.reset();
          $scope.bilan = bilan;
        };
        function successCallback(response){
          if($scope.isGet){
              $scope.bilans = response.data;
              $scope.totalPages = new Array(response.data.totalPages);
              $scope.total = response.data.totalPages;
          }else{
              $scope.bilan = response.data;
          }
        }
        function errorCallback(error){
          alert(error);
        }
        $scope.details=function(idBilan) {
          console.log("idBilan="+idBilan);
          $scope.selectedItem = BilanService.get({idBilan:idBilan});
        };
        //DELETE a category
        $scope.delete=function (idBilan) {
          if($scope.isGet){
              console.log("idBilan delete="+idBilan);
              $http.delete("/stocks/delete/bilan/"+idBilan);
          }
        }
        $scope.update = function (idEmploye) {
        };
        $scope.updateCategorie=function (idCategorie) {
          $scope.hideCategorie = true;
          console.log($scope.bilan.categorie);
          if($scope.endOfPath=="bilan"){
            $scope.currentCategorie.idCategorie = $scope.bilan.categorie[0];
            $scope.restant = $scope.bilan.categorie[2];
          }else{
            if($scope.endOfPath!="bilan" && $scope.endOfPath!="bilans"){
              $scope.currentCategorie.idCategorie = null;
              console.log($scope.selectedItem.content[0][2]);
              $scope.idC = $scope.selectedItem.content[0][2][0];
              console.log("currentCategorie.idCategorie: "+$scope.currentCategorie.idCategorie);
            }
          }
        };
        $scope.updateEtat=function (etat) {
          $scope.hideEtat = true;
        }
        $scope.updateClient=function (client) {
          $scope.hideClient = true;
          $scope.currentClient.idClient = $scope.bilanToUpdate.client.idClient[0];
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
