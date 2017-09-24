    stocksApp
      .controller("statsGenController", ["$scope", "$http", "$location", "$window", function ($scope, $http, $location, $window) {
        $scope.home = false;
        var dateB = new Date();
        $scope.totalPages = null;
        $scope.hideCategorie = false;
        $scope.path=$location.path().split('/');
        $scope.endOfPath=$scope.path[$scope.path.length-1];
        $scope.bilan = null;
        $scope.chart = null;
        $scope.cat = null;
        $scope.stats = {
          categorie: null
        };
        $scope.categories = null;
        $http.get("/stocks/listes/categories").then(function(response){
          $scope.categories = response.data;
        }, false);
        let chart = document.getElementById("mychart");
        let venduC = document.getElementById("vendu");
        let ordC = document.getElementById("ord");
        let promoC = document.getElementById("promo");
        let approC = document.getElementById("appro");
        let destockeeC = document.getElementById("destockee");
        let defectueuxC = document.getElementById("defectueux");

        let pieChart = null;
        let vendu = null;
        let ord = null;
        let promo = null;
        let appro = null;
        let destockee = null;
        let defectueux = null;
        var url = null;
        const req = new XMLHttpRequest();
        pieChart = new Chart(chart, {
                              type:'pie',
                              data:{
                                labels:[],//pieChart.data.labels
                                datasets:[
                                {
                                  label:[],
                                  data:[
                                    //pieChart.data.datasets[0].data
                                  ],
                                  backgroundColor:[],//pieChart.data.datasets[0].backgroundColor
                                  borderColor:'grey',
                                  hoverBorderWidth:3,
                                  hoverBorderColor:'#8c9eff'
                                }]
                              },
                              options:{
                                title:{
                                  display:true,
                                  text:'Quantités restantes'
                                }
                              }
                            });
        vendu = new Chart(venduC, {
                              type:'bar',
                              data:{
                                labels:[],//pieChart.data.labels
                                datasets:[
                                {
                                  label:[],
                                  data:[
                                    //pieChart.data.datasets[0].data
                                  ],
                                  backgroundColor:[],//pieChart.data.datasets[0].backgroundColor
                                  borderColor:'grey',
                                  hoverBorderWidth:3,
                                  hoverBorderColor:'#8c9eff'
                                }]
                              },
                              options:{
                                title:{
                                  display:true,
                                  text:'Quantités vendues'
                                }
                              }
                            });
        ord = new Chart(ordC, {
                              type:'horizontalBar',
                              data:{
                                labels:[],//pieChart.data.labels
                                datasets:[
                                {
                                  label:[],
                                  data:[
                                    //pieChart.data.datasets[0].data
                                  ],
                                  backgroundColor:[],//pieChart.data.datasets[0].backgroundColor
                                  borderColor:'grey',
                                  hoverBorderWidth:3,
                                  hoverBorderColor:'#8c9eff'
                                }]
                              },
                              options:{
                                title:{
                                  display:true,
                                  text:'Quantité ventes ordinaires'
                                }
                              }
                            });
        promo = new Chart(promoC, {
                              type:'line',
                              data:{
                                labels:[],//pieChart.data.labels
                                datasets:[
                                {
                                  label:[],
                                  data:[
                                    //pieChart.data.datasets[0].data
                                  ],
                                  backgroundColor:[],//pieChart.data.datasets[0].backgroundColor
                                  borderColor:'grey',
                                  hoverBorderWidth:3,
                                  hoverBorderColor:'#8c9eff'
                                }]
                              },
                              options:{
                                title:{
                                  display:true,
                                  text:'Quantité ventes promotionnelles'
                                }
                              }
                            });
        appro = new Chart(approC, {
                              type:'doughnut',
                              data:{
                                labels:[],//pieChart.data.labels
                                datasets:[
                                {
                                  label:[],
                                  data:[
                                    //pieChart.data.datasets[0].data
                                  ],
                                  backgroundColor:[],//pieChart.data.datasets[0].backgroundColor
                                  borderColor:'grey',
                                  hoverBorderWidth:3,
                                  hoverBorderColor:'#8c9eff'
                                }]
                              },
                              options:{
                                title:{
                                  display:true,
                                  text:'Quantités approvisionnées'
                                }
                              }
                            });
        destockee = new Chart(destockeeC, {
                              type:'pie',
                              data:{
                                labels:[],//pieChart.data.labels
                                datasets:[
                                {
                                  label:[],
                                  data:[
                                    //pieChart.data.datasets[0].data
                                  ],
                                  backgroundColor:[],//pieChart.data.datasets[0].backgroundColor
                                  borderColor:'grey',
                                  hoverBorderWidth:3,
                                  hoverBorderColor:'#8c9eff'
                                }]
                              },
                              options:{
                                title:{
                                  display:true,
                                  text:'Quantités déstockées allieurs'
                                }
                              }
                            });
        defectueux = new Chart(defectueuxC, {
                              type:'bar',
                              data:{
                                labels:[],//pieChart.data.labels
                                datasets:[
                                {
                                  label:[],
                                  data:[
                                    //pieChart.data.datasets[0].data
                                  ],
                                  backgroundColor:[],//pieChart.data.datasets[0].backgroundColor
                                  borderColor:'grey',
                                  hoverBorderWidth:3,
                                  hoverBorderColor:'#8c9eff'
                                }]
                              },
                              options:{
                                title:{
                                  display:true,
                                  text:'Quantités défectueuses'
                                }
                              }
                            });
        $scope.onload=function() {
          if ($scope.endOfPath!="category") {
                url = '/stocks/generer/bilan/mensuel?year='+dateB.getUTCFullYear()+'&month=JANUARY';
                req.open('GET', url, false);
                req.send(null);
                if (req.status===200) {
                        var objet = JSON.parse(req.responseText);
                        for (var k = 0; k < objet.totalPages; k++) {
                          url = '/stocks/generer/bilan/mensuel?page='+k+'&year='+dateB.getUTCFullYear()+'&month=JANUARY';
                          req.open('GET', url, false);
                          req.send(null);
                          var obj = JSON.parse(req.responseText);
                          if(obj.content.length==0){
                            break;
                          }else{
                            for (var j = 0; j < obj.content.length; j++) {
                              var r = parseInt(Math.random()*(256-1)+1);
                              var g = parseInt(Math.random()*(256-1)+1);
                              var b = parseInt(Math.random()*(256-1)+1);
                              pieChart.data.datasets[0].backgroundColor.push('rgba('+r+','+g+','+b+',0.6)');   
                              pieChart.data.labels.push(obj.content[j][5]);    
                              pieChart.data.datasets[0].data.push(obj.content[j][4]);

                              vendu.data.datasets[0].backgroundColor.push('rgba('+r+','+g+','+b+',0.6)');   
                              vendu.data.labels.push(obj.content[j][5]);    
                              vendu.data.datasets[0].data.push(obj.content[j][4]);

                              ord.data.datasets[0].backgroundColor.push('rgba('+r+','+g+','+b+',0.6)');   
                              ord.data.labels.push(obj.content[j][5]);    
                              ord.data.datasets[0].data.push(obj.content[j][8]);

                              promo.data.datasets[0].backgroundColor.push('rgba('+r+','+g+','+b+',0.6)');   
                              promo.data.labels.push(obj.content[j][5]);    
                              promo.data.datasets[0].data.push(obj.content[j][10]);

                              appro.data.datasets[0].backgroundColor.push('rgba('+r+','+g+','+b+',0.6)');   
                              appro.data.labels.push(obj.content[j][5]);    
                              appro.data.datasets[0].data.push(obj.content[j][7]);

                              destockee.data.datasets[0].backgroundColor.push('rgba('+r+','+g+','+b+',0.6)');   
                              destockee.data.labels.push(obj.content[j][5]);    
                              destockee.data.datasets[0].data.push(obj.content[j][12]);

                              defectueux.data.datasets[0].backgroundColor.push('rgba('+r+','+g+','+b+',0.6)');   
                              defectueux.data.labels.push(obj.content[j][5]);    
                              defectueux.data.datasets[0].data.push(obj.content[j][13]);
                          }
                          }
                          
                        }
                        
                      }
                pieChart.update();
                vendu.update();
                ord.update();
                promo.update();
                appro.update();
                destockee.update();
                defectueux.update();

          }else{
            console.log($scope.stats.categorie);
            if ($scope.stats.categorie != null) {
              url = '/stocks/get/bilan/mensuel?year='+dateB.getUTCFullYear()+'&month=JANUARY&categorie='+$scope.stats.categorie[0]+'';
                req.open('GET', url, false);
                req.send(null);
                if (req.status===200) {
                        var objet = JSON.parse(req.responseText);
                        pieChart.data.datasets[0].backgroundColor=[];
                            pieChart.data.datasets[0].data=[];
                            pieChart.data.labels = [];
                            vendu.data.datasets[0].backgroundColor = [];
                            vendu.data.datasets[0].data=[];
                            vendu.data.labels=[];
                            ord.data.datasets[0].backgroundColor=[];
                            ord.data.datasets[0].data=[]; 
                            ord.data.labels = [];
                            promo.data.datasets[0].backgroundColor=[];
                            promo.data.datasets[0].data=[];
                            promo.data.labels=[];
                            appro.data.datasets[0].backgroundColor=[];
                            appro.data.datasets[0].data=[];
                            appro.data.labels=[];
                            destockee.data.datasets[0].backgroundColor=[];
                            destockee.data.datasets[0].data=[];
                            destockee.data.labels=[];
                            defectueux.data.datasets[0].backgroundColor=[];
                            defectueux.data.datasets[0].data=[];
                            defectueux.data.labels=[];
                        for (var k = 0; k < $scope.month.length; k++) {
                          
                          url = '/stocks/get/bilan/mensuel?&categorie='+$scope.stats.categorie[0]+'&year='+dateB.getUTCFullYear()+'&month='+$scope.moisEng[k]+'';
                          req.open('GET', url, false);
                          req.send(null);
                          var obj = JSON.parse(req.responseText);
                          if(obj.content.length==0){
                            //break;
                          }else{

                            for (var j = 0; j < obj.content.length; j++) {
                              var r = parseInt(Math.random()*(256-1)+1);
                              var g = parseInt(Math.random()*(256-1)+1);
                              var b = parseInt(Math.random()*(256-1)+1);
                              
                              pieChart.data.datasets[0].backgroundColor.push('rgba('+r+','+g+','+b+',0.6)');   
                              pieChart.data.labels.push($scope.month[k]);
                              
                              pieChart.data.datasets[0].data.push(obj.content[j][4]);

                              
                              vendu.data.datasets[0].backgroundColor.push('rgba('+r+','+g+','+b+',0.6)');   
                              vendu.data.labels.push($scope.month[k]); 
                                 
                              vendu.data.datasets[0].data.push(obj.content[j][4]);

                              
                              ord.data.datasets[0].backgroundColor.push('rgba('+r+','+g+','+b+',0.6)');   
                              ord.data.labels.push($scope.month[k]);
                                 
                              ord.data.datasets[0].data.push(obj.content[j][8]);

                              
                              promo.data.datasets[0].backgroundColor.push('rgba('+r+','+g+','+b+',0.6)');   
                              promo.data.labels.push($scope.month[k]);    
                              promo.data.datasets[0].data.push(obj.content[j][10]);

                              
                              appro.data.datasets[0].backgroundColor.push('rgba('+r+','+g+','+b+',0.6)');   
                              appro.data.labels.push($scope.month[k]);    
                              appro.data.datasets[0].data.push(obj.content[j][7]);

                              
                              destockee.data.datasets[0].backgroundColor.push('rgba('+r+','+g+','+b+',0.6)');   
                              destockee.data.labels.push($scope.month[k]);    
                              destockee.data.datasets[0].data.push(obj.content[j][12]);

                              
                              defectueux.data.datasets[0].backgroundColor.push('rgba('+r+','+g+','+b+',0.6)');   
                              defectueux.data.labels.push($scope.month[k]);    
                              defectueux.data.datasets[0].data.push(obj.content[j][13]);
                          }
                          }
                          
                        }
                        
                      }
                pieChart.update();
                vendu.update();
                ord.update();
                promo.update();
                appro.update();
                destockee.update();
                defectueux.update();
            }
                
          }
        }
        //GET list of bilans
        $scope.getListe=function(){
          
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
          $scope.hideCategorie = true;
        };
        $scope.updateEtat=function (etat) {
          $scope.hideEtat = true;
        };
        $scope.gotoPage = function(page){
            $scope.page = page;
            $scope.getListe();
        }
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
