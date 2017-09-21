    stocksApp
      .controller("newBilanController", ["$scope", "$http", "$location", "$window", "BilanService", "CategorieService", function ($scope, $http, $location, $window, BilanService,CategorieService) {
        $scope.home = false;
        $scope.isGet=false;
        $scope.type = null;
        $scope.hideCategorie = false;
        $scope.completeDate=null;
        $scope.selectedItem=null;
        $scope.bilans=null;
        $scope.time=null;
        $scope.date=null;
        $scope.mois = null;
        var pdf = null;
        $scope.restant = null;
        $scope.idC =0;
        $scope.totalPages = null;
        $scope.page=0;
        $scope.total = null;
        $scope.dateS={
          "date":null
        };
        var dateB = new Date();
        $scope.totalPages = null;
        $scope.path=$location.path().split('/');
        $scope.endOfPath=$scope.path[$scope.path.length-1];
        
        $scope.onload=function() {
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
          }
          //PUT a category7
        };
          
          
        $scope.reset=function(bilan){
          $scope.date=null;
          $scope.time=null;
          $scope.type=null;
          $scope.mois=null;
          $scope.completeDate=null;
          $scope.hideCategorie=false;   
          $scope.onload();     
        };
        $scope.edit=function(bilan){

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
        $scope.updateDate=function () {
          // body...
          var b = new Date();
          console.log($scope.date.toString().split('-'));
        }
        $scope.details=function(idBilan) {

        };
        //DELETE a category
        $scope.delete=function (idBilan) {

        }
        $scope.updateMois = function () {
          var s = document.getElementById('Mois').defaultSelected;
          console.log("s:"+s);
        };
        $scope.updateCategorie=function (idCategorie) {

        };
        $scope.updateEtat=function (etat) {
          $scope.hideEtat = true;
        };
        $scope.gotoPage = function(page){
            $scope.page = page;
            $scope.getListe();
        }

        $scope.pdf= function () {
          //docDefinition.content[4].table.body[0]
          var an = null;
          var m = null;
          var mm = null;
          if($scope.type=='Mensuel'){
            an = $scope.date.toString().split('-')[0];
            m = $scope.moisEng[parseInt($scope.date.toString().split('-')[1])-1];
            mm = $scope.month[parseInt($scope.date.toString().split('-')[1])-1];
          }else{
            an = $scope.date.toString().split('-')[0];
            mm="";

          }
          var docDefinition = {
            pageSize: 'A3',

          // by default we use portrait, you can change it to landscape if you wish
          pageOrientation: 'landscape',

          // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
          pageMargins: [ 10, 10, 10, 10 ],
              content: [
                      
  /*0*/       {
                alignment: 'center',
                columns: [
                  {
                    style:'header',
                    width:300,
                    text: 'Réplubique du Cameroun\n     *********     \nCameroon Telecommunications\n     *********     \nReprésentation Régionale Extrême-Nord\n     *********     \nAgence de Maroua\n     *********     \nService AC'
                  },
                  {
                    style:'header',
                    width:1400,
                    text: 'Republic of Cameroon\n     *********     \nCameroon Telecommunications\n     *********     \nThe Far-North Regional Representation\n     *********     \nAgency of Maroua\n     *********     \nAC Service'
                  },
                ]
              },
/*1*/             '\n\n\n',
/*2*/              {
                    alignment:'center',
                    bold:true,
                    fontSize:18,
                    'text':'Bilan '+mm+' '+an+''
                  },
/*3*/              '\n\n\n',
/*4*/             {
                style: 'tableExample',
                table: {
                  widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto','auto','auto','auto','auto','auto','auto','auto','auto','auto','auto'],
                  headerRows: 1,
                  // dontBreakRows: true,
                  // keepWithHeaderRows: 1,
                  body: [

                    [
                      {text: 'Num', style: 'tableHeader', width:50}, 
                      {text: 'Catégorie', style: 'tableHeader', width:150}, 
                      {text: 'Initial', style: 'tableHeader', width:50},
                      {text: 'Approv', style: 'tableHeader', width:50},
                      {text: 'Stock total', style: 'tableHeader', width:50},
                      {text: 'Qté. vente ord', style: 'tableHeader', width:50},
                      {text: 'PU\nvente ord', style: 'tableHeader', width:300},
                      {text: 'Montant vente ord', style: 'tableHeader', width:50},
                      {text: 'Qté. vente promo', style: 'tableHeader', width:50},
                      {text: 'PU\nvente promo', style: 'tableHeader', width:50},
                      {text: 'Montant vente promo', style: 'tableHeader', width:50},
                      {text: 'Qté total ventes', style: 'tableHeader', width:50},
                      {text: 'Montant total ventes', style: 'tableHeader', width:50},
                      {text: 'Dé-stocké', style: 'tableHeader', width:50},
                      {text: 'Reste', style: 'tableHeader', width:50},
                      {text: 'Qté. \ndéfec-\ntueuse', style: 'tableHeader', width:50}
                    ]
                    ]
                  }
                },
              ],
              defaultStyle: {
                columnGap: 20
              },
              styles: {
                header: {
                  fontSize:16
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
          };
              
            
              var c= [];
              const req = new XMLHttpRequest();
              if($scope.type.toString()=='Mensuel'){
                console.log("Mensuel");
                var url = '/stocks/generer/bilan/mensuel?year='+an+'&month='+m+'';
                req.open('GET', url, false);
                req.send(null);
                if (req.status === 200) {
                  //var r = req.responseText.split("[[")[1].split("]]")[0].split(",");
                  var obj = JSON.parse(req.responseText);
                    for (var i = 0; i < obj.totalPages; i++) {
                      var url = '/stocks/generer/bilan/mensuel?year='+an+'&month='+m+'&page='+i;
                      req.open('GET', url, false);
                      req.send(null);
                      if (req.status===200) {
                        var objet = JSON.parse(req.responseText);
                        for (var j = 0; j < objet.content.length; j++) {
                          c=[];
                          c.push(j+1);
                          c.push(objet.content[j][5]);
                          c.push(objet.content[j][3]);
                          c.push(objet.content[j][7]);
                          c.push(objet.content[j][4]);
                          c.push(objet.content[j][8]);
                          c.push(objet.content[j][9]+"F");
                          c.push((objet.content[j][9]*objet.content[j][8])+"F");
                          c.push(objet.content[j][10]);
                          c.push(objet.content[j][11]+"F");
                          c.push((objet.content[j][10]*objet.content[j][11])+"F");
                          c.push((objet.content[j][8]+objet.content[j][10]));
                          c.push(((objet.content[j][9]*objet.content[j][8]) + (objet.content[j][10]*objet.content[j][11]))+"F");
                          c.push(objet.content[j][12]);
                          c.push(objet.content[j][4]-(objet.content[j][3]+objet.content[j][7]));
                          c.push(objet.content[j][13]);
                          docDefinition.content[4].table.body.push(c);
                      }
                      }
                    }
                } else {
                    console.log("Status de la réponse: %d (%s)", req.status, req.statusText);
                }
              }
              if($scope.type.toString()=='Annuel'){
                console.log("Annuel");
                var url = '/stocks/listes/categories/ids';
                var ids = [];
                req.open('GET', url, false);
                req.send(null);
                if (req.status===200) {
                  ids = req.responseText.substr(1, req.responseText.length-2).split(',');
                  console.log(typeof(ids));
                  console.log(ids);
                }
                for (var i = 0; i < ids.length; i++) {
                  c=[];
                  var initial = null;
                  var final = null;
                  url = '/stocks/get/bilan/mensuel?year='+an+'&categorie='+parseInt(ids[i])+'&month=JANUARY';
                  req.open('GET', url, false);
                  req.send(null);
                  if(req.status===200){
                    var o = JSON.parse(req.responseText);
                    if (o.content.length>0) {
                      initial = o.content[0][3];  
                    }
                  }
                  url = '/stocks/get/bilan/mensuel?year='+an+'&categorie='+parseInt(ids[i])+'&month=DECEMBER';
                  req.open('GET', url, false);
                  req.send(null);
                  if(req.status === 200){
                    var o = JSON.parse(req.responseText);
                    if (o.content.length>0) {
                      final = o.content[0][4];  
                    }
                  }
                  url = '/stocks/generer/bilan/annuel?year='+an+'&categorie='+parseInt(ids[i])+'';
                  req.open('GET', url, false);
                  req.send(null);
                  if(req.status === 200){
                    var objet = JSON.parse(req.responseText);
                    c.push(i+1);
                    c.push(objet.content[0][3]);
                    c.push(initial);
                    c.push(objet.content[0][5]);
                    c.push(objet.content[0][5]+initial);
                    c.push(objet.content[0][6]);
                    c.push(objet.content[0][7]+"F");
                    c.push((objet.content[0][7]*objet.content[0][6])+"F");
                    c.push(objet.content[0][8]);
                    c.push(objet.content[0][9]+"F");
                    c.push((objet.content[0][9]*objet.content[0][8])+"F");
                    c.push((objet.content[0][6]+objet.content[0][8]));
                    c.push(((objet.content[0][7]*objet.content[0][6]) + (objet.content[0][9]*objet.content[0][8]))+"F");
                    c.push(objet.content[0][10]);
                    c.push(objet.content[0][5]+initial-(initial+objet.content[0][6]));
                    c.push(objet.content[0][11]);
                    docDefinition.content[4].table.body.push(c);
                  }
                }
                
              }

            pdfMake.createPdf(docDefinition).open();
};
        //TimePicker
        var currentTime = new Date();
        $scope.currentTime = currentTime;
        $scope.month = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
        $scope.moisEng = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
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
