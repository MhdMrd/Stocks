    stocksApp
      .controller("newCommandeController", ["$scope", "$http", "$location", "$window", "CommandeService", "CategorieService", function ($scope, $http, $location, $window, CommandeService,CategorieService) {
        $scope.home = false;
        $scope.isGet=false;
        $scope.hideCategorie = false;
        $scope.completeDate=null;
        $scope.selectedItem=null;
        $scope.commandes=null;
        $scope.time=null;
        $scope.date=null;
        $scope.restant = null;
        $scope.idC =0;
        $scope.totalPages = null;
        $scope.page=0;
        $scope.total = 0;
        $scope.commandeToUpdate={
          "idCommande":null,
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
        $scope.commande={
          "employeEmetteur":"Employe",
          "categorie":"Categorie",
          "dateCommande":null,
          "quantiteACommander":0,
          "observations":"RAS"
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
          if($scope.endOfPath!="commande" && $scope.endOfPath!="commandes"){
            $scope.selectedItem = CommandeService.get({idCommande:$scope.endOfPath});
            console.log($scope.selectedItem);
        }
    }
        //GET list of commandes
        $scope.getListe=function(){
          if($scope.endOfPath=="commandes"){
            $scope.isGet=true;
            $http.get("/stocks/listes/commandes?page="+$scope.page).then(successCallback, errorCallback);
          }
        }
        $scope.getListe();
        
        //POST a category
        $scope.save=function(commande) {
          if ($scope.endOfPath=="commande") {
            if($scope.date !=null && $scope.time!=null)
              $scope.currentEmploye=$scope.commande.employe;
              $scope.currentCategorie=$scope.commande.categorie;
              $scope.currentClient = $scope.commande.client;
              var d = new Date();
              console.log(d.getMinutes());
              $scope.commande={
                "reference":""+d.getSeconds()+""+employeAuth+""+d.getMinutes()+""+d.getYear()+""+$scope.commande.categorie[0],
                "employeEmetteur":{
                  "idEmploye":employeAuth
                },
                "quantiteRestante":$scope.restant,
                "categorie":{
                  "idCategorie":$scope.commande.categorie[0]
                },
                //"dateCommande":new Date($scope.date.toString()+" "+$scope.time.toString()).getTime()
                "dateCommande":Date.now(),
                "quantiteACommander":$scope.commande.quantiteACommander,
                "observations":$scope.commande.observations
              }
              $http.post("/stocks/add/commande", $scope.commande);
              //$window.location.href='#/stocks/listes/employes';
          }
          //PUT a category
          if ($scope.endOfPath!="commande" && $scope.endOfPath!="commandes") {
            
              if ($scope.hideCategorie) {
                console.log("02:   "+$scope.selectedItem.content[0][9]);
              $scope.commandeToUpdate={
                "reference":$scope.selectedItem.content[0][1],
                "categorie":{
                  "idCategorie":$scope.selectedItem.content[0][2][0]
                },
                "employeEmetteur":{
                  "idEmploye":employeAuth
                },
                "quantiteRestante":$scope.selectedItem.content[0][5],
                //"dateCommande":new Date($scope.date.toString()+" "+$scope.time.toString()).getTime()
                "dateCommande":$scope.selectedItem.content[0][7],
                "quantiteACommander":$scope.selectedItem.content[0][6],
                "observations":$scope.selectedItem.content[0][8]
              }
            }else {
              $scope.commandeToUpdate={
                "reference":$scope.selectedItem.content[0][1],
                "categorie":{
                  "idCategorie":$scope.selectedItem.content[0][9]
                },
                "employeEmetteur":{
                  "idEmploye":employeAuth
                },
                "quantiteRestante":$scope.selectedItem.content[0][5],
                //"dateCommande":new Date($scope.date.toString()+" "+$scope.time.toString()).getTime()
                "dateCommande":$scope.selectedItem.content[0][7],
                "quantiteACommander":$scope.selectedItem.content[0][6],
                "observations":$scope.selectedItem.content[0][8]
              }
            }
          $http.put("/stocks/edit/commande/"+$scope.endOfPath, $scope.commandeToUpdate).then(successCallback, errorCallback);
        }
        
        };
          
          
        $scope.reset=function(commande){
          $scope.categories.value1="Categorie";
          //$scope.hideCategorie = false;
          $scope.commande={
            "categorie":"Categorie",
            "dateCommande":null,
            "quantiteACommander":0,
            "observations":"RAS"
          };
          $scope.onload();
          $scope.date=null;
          $scope.time=null;
          $scope.completeDate=null;
          $scope.hideCategorie=false;        
        };
        $scope.edit=function(commande){
          $scope.reset();
          $scope.commande = commande;
        };
        function successCallback(response){
          if($scope.isGet){
              $scope.commandes = response.data;
              $scope.totalPages = new Array(response.data.totalPages);
              $scope.total = response.data.totalPages;
          }else{
              $scope.commande = response.data;
          }
        }
        function errorCallback(error){
          alert(error);
        }
        $scope.details=function(idCommande) {
          console.log("idCommande="+idCommande);
          $scope.selectedItem = CommandeService.get({idCommande:idCommande});
        };
        //DELETE a category
        $scope.delete=function (idCommande) {
          if($scope.isGet){
              console.log("idCommande delete="+idCommande);
              $http.delete("/stocks/delete/commande/"+idCommande);
          }
        }
        $scope.update = function (idEmploye) {
        };
        $scope.updateCategorie=function (idCategorie) {
          $scope.hideCategorie = true;
          console.log($scope.commande.categorie);
          if($scope.endOfPath=="commande"){
            $scope.currentCategorie.idCategorie = $scope.commande.categorie[0];
            $scope.restant = $scope.commande.categorie[2];
          }else{
            if($scope.endOfPath!="commande" && $scope.endOfPath!="commandes"){
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
          $scope.currentClient.idClient = $scope.commandeToUpdate.client.idClient[0];
        }
        $scope.gotoPage = function(page){
          if (page>=0) {
            $scope.page = page;
            $scope.getListe();
          }
        }

        $scope.pdf= function () {
          
          var docDefinition = {
            
            content: [
              
              {
                alignment: 'center',
                columns: [
                  {
                    style:'header',
                    width:200,
                    text: 'Réplubique du Cameroun\n     *********     \nCameroon Telecommunications\n     *********     \nReprésentation Régionale Extrême-Nord\n     *********     \nAgence de Maroua\n     *********     \nService AC'
                  },
                  {
                    style:'header',
                    width:350,
                    text: 'Réplubique du Cameroun\n     *********     \nCameroon Telecommunications\n     *********     \nReprésentation Régionale Extrême-\nNord\n     *********     \nAgence de Maroua\n     *********     \nService AC'
                  },
                ]
              },
              '\n\n\n',
              {
                alignment:'center',
                bold:true,
                fontSize:18,
                'text':'Commande'
              },
              '\n\n\n',
              {
                style: 'tableExample',
                table: {
                  widths: [50, '*', 50, 70, '*'],
                  headerRows: 1,
                  // dontBreakRows: true,
                  // keepWithHeaderRows: 1,
                  body: [

                    [{text: 'Numéro', style: 'tableHeader', width:100}, {text: 'Catégorie', style: 'tableHeader', width:150}, {text: 'Restant', style: 'tableHeader', width:100},{text: 'Commandé', style: 'tableHeader', width:100},{text: 'Observations', style: 'tableHeader', width:300}],
                    [
                      '1',
                      ''+$scope.commande.categorie[1],
                      ''+$scope.restant,
                      ''+$scope.commande.quantiteACommander,
                      ''+$scope.commande.observations
                    ],
                  ]
                }
              },
              {
                alignment: 'center',
                columns: [
                  {
                    style:'header',
                    width:200,
                    text: 'Le AC'
                  },
                  {
                    style:'header',
                    width:350,
                    text: 'Le Chef d\'Agence'
                  },
                ]
              },
              '\n',
              {
                alignment: 'center',
                columns: [
                  {
                    style:'header',
                    width:200,
                    text: ''+nomPrenom
                  },
                  {
                    style:'header',
                    width:350,
                    text: 'Mohammad Mourad Abdoulahi'
                  },
                ]
              },
              ],
              defaultStyle: {
                columnGap: 20,
              },
              styles: {
              header: {
              },
              subheader: {
                fontSize: 16,
                bold: true,
                margin: [0, 10, 0, 5]
              },
              tableExample: {
                margin: [0, 5, 0, 15]
              },
              tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
              }
            },
            }
                    //        pdfMake.createPdf(docDefinition).download('optionalName.pdf');
                    pdfMake.createPdf(docDefinition).open();
};
                
                
          

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
