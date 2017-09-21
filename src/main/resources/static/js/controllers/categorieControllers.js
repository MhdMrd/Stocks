stocksApp
  .controller("newCategorieController", ["$scope", "$http","$location", "$window", "CategorieService", function($scope, $http, $location, $window, CategorieService){
    $scope.home = false;
    $scope.isGet=false;
    $scope.hideQte = false;
    cats = [];
    var cat = {
      "nom":null,
      "restant":null,
      "commandee":null,
      "observations":null
    };
    var pdf = null;
    $scope.c1 = [];
    $scope.visualiser = false;
    $scope.imprimer = false;
    $scope.telecharger = false;
    $scope.commander = false;
    $scope.destocker = false;
    $scope.commanderThis = false;
    $scope.catsEmpty = true;
    $scope.categories=null;
    $scope.cat = null;
    $scope.selectedItem=null;
    $scope.categorie={
      "nom":null,
      "quantiteDefecteux":0,
      "quantiteDisponible":0,
      "remarque":"RAS",
      "prixNormal":0,
      "prixPromotionel":0,
      "seuil":0,
      "destocke":0
    };
    var Res = [];
    var des = 0;
    $scope.Qte = 0;
    $scope.Qtes = [];
    $scope.Obs = [];
    $scope.totalPages = null;
    $scope.page=0;
    $scope.total = null;
    $scope.path=$location.path().split('/');
    $scope.endOfPath=$scope.path[$scope.path.length-1];
    $scope.onload=function() {
      if($scope.endOfPath!="categorie" && $scope.endOfPath!="categories"){
        $scope.selectedItem = CategorieService.get({idCategorie:$scope.endOfPath});
        des = $scope.selectedItem.content[0][8];
      }
    }
    //GET list of categories
    $scope.getListe=function () {
      if($scope.endOfPath=="categories"){
          $scope.isGet=true;
          $http.get("/stocks/listes/categories?page="+$scope.page).then(successCallback, errorCallback);
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
            "remarque":$scope.selectedItem.content[0][4],
            "prixNormal":$scope.selectedItem.content[0][5],
            "prixPromotionel":$scope.selectedItem.content[0][6],
            "seuil":$scope.selectedItem.content[0][7],
            "destocke":parseInt(parseInt(des) + ($scope.selectedItem.content[0][8] - parseInt(des)))
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
      "remarque":"RAS",
      "prixNormal":0,
      "prixPromotionel":0,
      "seuil":0,
      "destocke":0
    };
      if($scope.endOfPath!="categorie" && $scope.endOfPath!="categories"){
        $scope.selectedItem.content[0]=[null, null, null, null, null];
      }
      
    };
    $scope.edit=function(categorie){
      $scope.categorie = categorie;
    };
    function successCallback(response){
      if($scope.commander){
      }
      if($scope.isGet && !$scope.commander){
          $scope.categories = response.data;
          $scope.totalPages = new Array(response.data.totalPages);
          $scope.total = response.data.totalPages;
      }else{
          $scope.categorie = response.data;
      }
      
    }
    function ok(argument) {
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

    $scope.updateObs = function (argument) {
      // body...
      if ($scope.Obs.length==0) {
        $scope.Obs[0] = document.getElementById('t'+argument).value;
      }else{
        $scope.Obs[argument] = document.getElementById('t'+argument).value;
      }

    }

    $scope.updateQtes = function (argument) {
      // body...
      if ($scope.Qtes.length==0) {
        $scope.Qtes[0] = document.getElementById('i'+argument).value;
      }else{
        $scope.Qtes[argument] = document.getElementById('i'+argument).value;
      }
       
    }

    $scope.passerCommande = function (idCategorie, id) {
      var checked = document.getElementById(id).checked;
      if (!checked) {
        $scope.commanderThis = false;
      }else {
        $scope.commanderThis =true;
        $scope.hideQte = true;
      }
      if ($scope.commanderThis) {
        cats.push(idCategorie);
        $scope.Qtes.push($scope.Qte);
        $scope.Obs.push(document.getElementById('t'+id).value);
      }else{
        cats.splice(id-1, 1);
      }
      console.log(cats);
      if (cats.length>0) {
        $scope.catsEmpty = false;
      }
      var checkbox = document.getElementById(id);
      if (!checked) {
        
      }else{
        
      }
      
    }
    $scope.updateCommanderB = function () {
      // body...
      $scope.commander = !$scope.commander;
      if (!$scope.commander) {
        $scope.catsEmpty = true;
      }
    };
    $scope.updateDestocker = function () {
      // body...
      $scope.destocker = !$scope.destocker;
    };
    $scope.updateVisualiser = function () {
      // body...
      $scope.imprimer = false;
      $scope.telecharger = false;
      $scope.visualiser = true;
    };
    $scope.updateImprimer = function(){
      $scope.visualiser = false;
      $scope.telecharger = false;
      $scope.imprimer = true;
    };
    $scope.updateTelecharger=function(){
      $scope.visualiser = false;
      $scope.imprimer = false;
      $scope.telecharger = true;
    }
    $scope.pdf= function () {
          //docDefinition.content[4].table.body[0]
          console.log("Cats:"+cats);
          var docDefinition = {
            pageSize: 'A4',

          // by default we use portrait, you can change it to landscape if you wish
          pageOrientation: 'landscape',

          // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
          pageMargins: [ 40, 60, 40, 60 ],
                    content: [
                      
  /*0*/       {
                alignment: 'center',
                columns: [
                  {
                    style:'header',
                    width:250,
                    text: 'Réplubique du Cameroun\n     *********     \nCameroon Telecommunications\n     *********     \nReprésentation Régionale Extrême-Nord\n     *********     \nAgence de Maroua\n     *********     \nService AC'
                  },
                  {
                    style:'header',
                    width:740,
                    text: 'Republic of Cameroon\n     *********     \nCameroon Telecommunications\n     *********     \nThe Far-North Regional Representation\n     *********     \nAgency of Maroua\n     *********     \nAC Service'
                  },
                ]
              },
/*1*/             '\n\n\n',
/*2*/              {
                    alignment:'center',
                    bold:true,
                    fontSize:18,
                    'text':'Commande'
                  },
/*3*/              '\n\n\n',
/*4*/             {
                style: 'tableExample',
                table: {
                  widths: [50, '*', 50, 70, 50, 50, '*'],
                  headerRows: 1,
                  // dontBreakRows: true,
                  // keepWithHeaderRows: 1,
                  body: [

                    [{text: 'Numéro', style: 'tableHeader', width:50}, {text: 'Catégorie', style: 'tableHeader', width:150}, {text: 'Restant', style: 'tableHeader', width:50},{text: 'Commandé', style: 'tableHeader', width:50},{text: 'PU', style: 'tableHeader', width:50},{text: 'PT', style: 'tableHeader', width:50},{text: 'Observations', style: 'tableHeader', width:300}],
                    
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
                    width:800,
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
                    width:800,
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
            
              console.log("C1 :"+$scope.c1);
            
           var c= [];
            var i=0;
            console.log("$scope.Qtes: "+$scope.Qtes);
            console.log("$scope.Obs: "+$scope.Obs);
            for (i = 0; i < cats.length; i++) {
              c=[];
           
              const req = new XMLHttpRequest();
              req.open('GET', '/stocks/get/categorie/'+parseInt(cats[i]), false); 
                req.send(null);

                if (req.status === 200) {
                  console.log("res: "+typeof(req.responseText));
                  var r = req.responseText.split("[[")[1].split("]]")[0].split(",");
                  console.log(r);
                  console.log(typeof(req.responseText.split("[[")[1].split("]]")[0]));
                    c.push(i+1);
                    c.push(r[1].slice(1,r[1].length-1));
                    c.push(r[2]);
                    c.push($scope.Qtes[i]);
                    c.push(r[5]+"F");
                    c.push((r[5]*$scope.Qtes[i])+"F");
                    c.push($scope.Obs[i]);
                    Res.push(r[2]);
                    docDefinition.content[4].table.body[docDefinition.content[4].table.body.length] = c;
                
                } else {
                    console.log("Status de la réponse: %d (%s)", req.status, req.statusText);
                }
            }
            pdf = docDefinition;
};
$scope.generer=function () {
  // body...
    if ($scope.visualiser) {
      pdfMake.createPdf(pdf).open();
    }
    if ($scope.imprimer) {
      pdfMake.createPdf(pdf).print();
    }
    if ($scope.telecharger) {
      pdfMake.createPdf(pdf).download('Commande.pdf');
    }

    for (var i = 0; i < cats.length; i++) {
      var d = new Date();
      var nCommande={
                "reference":""+d.getSeconds()+""+employeAuth+""+d.getMinutes()+""+d.getYear()+""+cats[i],
                "employeEmetteur":{
                  "idEmploye":employeAuth
                },
                "quantiteRestante":Res[i],
                "categorie":{
                  "idCategorie":cats[i]
                },
                //"dateCommande":new Date($scope.date.toString()+" "+$scope.time.toString()).getTime()
                "dateCommande":Date.now(),
                "quantiteACommander":$scope.Qtes[i],
                "observations":$scope.Obs[i]
              }
              $http.post("/stocks/add/commande", nCommande).then(function (response) {
                // body...
                console.log("Commande ajoutée avec succès.");
              }, function (error) {
                // body...
                console.log(error);
              })
    }
};
  }])
