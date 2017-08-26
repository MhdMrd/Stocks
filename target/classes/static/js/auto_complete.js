stocksApp
.controller("AutocompleteController", ["$scope", function ($scope) {
	$scope.home = true;
	$scope.productsList = [
			"Wifi",
			"Wifi haut débit",
			"SIM 3G",
			"CT-PHONE",
			"SIM GSM",
			"SMARTPHONE"
		];
		
		$scope.complete = function (string){
			if (typeof(string)=="undefined") {
				string="";
				$scope.product = "";
			}
			if (string.length=="") {
				$scope.hideThis=true;
			} else {
				$scope.hideThis=false;
			}
			
			var output = [];
			angular.forEach($scope.productsList, function(product){
				if(product.toLowerCase().indexOf(string.toLowerCase())>=0){
					output.push(product);
				}
			});
			$scope.filterProduct = output;
		};
		$scope.fillTextbox = function(string){
			$scope.product = string;
			$scope.hideThis = true;
		};

		$scope.reset= function(){
			if($scope.product == ""){
				$scope.hideThis=false;
			}
			console.log("Reset.");
		};
}])