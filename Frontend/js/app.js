/**
	@author : Kalpit Pandit
	@email : panditkalpit@gmail.com 
*/
var address = angular.module('addressBook', []).run(function($rootScope) {
    $rootScope.endPoint = "http://127.0.0.1:4200/";
});

// Controller
address.controller('contacts', function($scope, $http, $rootScope){

	$http.get($rootScope.endPoint+'api/address').success(function(response) {
        $scope.loadAllContacts(response);
    }).error(function(data, status, headers, config) {
        console.log("Error :", data, status, headers, config);
    });
    
	$scope.loadAllContacts = function(response) {
		$scope.allContacts = response;
	},

	$scope.showDetails = function(id){
		angular.forEach($scope.allContacts, function(contact, key) {
	        if (contact._id === id) {
	            $scope.contact = contact;
	        }
    	});
	},

	$scope.saveContact = function(){

		if(!$scope.first_name || !$scope.mobile_phone){
			$scope.error = "Please fill mandatory fields(*)";
			return;
		}

		var contact = {
			"first_name" : $scope.first_name,
			"last_name" : $scope.last_name,
			"mobile_phone" : $scope.mobile_phone,
			"home_phone" : $scope.home_phone,
			"email" : $scope.email,
			"address" : $scope.address
		};

		if($scope.contact_mode!=null &&  $scope.contact_mode == 'edit') {
			$scope.updateContact(contact);
			return;
		}

		$http.post($rootScope.endPoint+'api/address', contact).success(function(response) {
			$('.contact-popup').hide();
			$('body').removeClass('open');
			$('.success-message').show().fadeOut(5000);
			
	        $scope.allContacts.push(contact);
	    }).error(function(data, status, headers, config) {
	        console.log("Error :", data, status, headers, config);
	    });

	   	$scope.resetScope();
	}

	$scope.resetScope = function(){
		$scope.first_name = "";
		$scope.last_name = "";
		$scope.mobile_phone = "";
		$scope.home_phone = "";
		$scope.email = "";
		$scope.address = "";
	},

	$scope.editContact = function(id){
		angular.forEach($scope.allContacts, function(contact, key) {
	        if (contact._id === id) {
	            $scope.first_name = contact.first_name;
				$scope.last_name = contact.last_name;
				$scope.mobile_phone = contact.mobile_phone;
				$scope.home_phone = contact.home_phone;
				$scope.email = contact.email;
				$scope.address = contact.address;
				$scope.contact_mode = 'edit';
				$scope.contact_id = contact._id;
	        }
    	});
	},

	$scope.updateContact = function(contact){
		
		if(contact.first_name == null || contact.mobile_phone == null){
			$scope.error = "Please fill mandatory fields(*)";
			return;
		}
		$http.put($rootScope.endPoint+'api/address/'+$scope.contact_id, contact).success(function(response) {
			$('.contact-popup').hide();
			$('body').removeClass('open');
			$('.success-message').show().fadeOut(5000);
	    }).error(function(data, status, headers, config) {
	        console.log("Error :", data, status, headers, config);
	    });

	    angular.forEach($scope.allContacts, function(contactAll, key) {
	        if (contactAll._id === $scope.contact_id) {
	            $scope.allContacts[key].first_name = contact.first_name;
				$scope.allContacts[key].last_name = contact.last_name;
				$scope.allContacts[key].mobile_phone = contact.mobile_phone;
				$scope.allContacts[key].home_phone = contact.home_phone;
				$scope.allContacts[key].email = contact.email;
				$scope.allContacts[key].address = contact.address;
				$scope.contact_mode = '';
				$scope.contact_id = '';
	        }
    	});
    	return;
	}
});