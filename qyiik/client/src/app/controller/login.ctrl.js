var loginModule = angular.module('qk.login', ['qk.auth', 'qk.profile',
    'qk.message'
]);
loginModule.controller('LoginController', [
    '$state',
    '$scope',
    '$rootScope',
    'AuthService',
    '$stateParams',
    'ProfileModel',
    'MessageModel',
    function($state, $scope, $rootScope, AuthService, $stateParams,
        ProfileModel, MessageModel) {
        $scope.profile = new ProfileModel();
        $scope.login = function(form) {
            $scope.profile.message.form.processing = true;
            $scope.profile.form.message  = '';
            if (form.$valid) {
                AuthService.login($scope.profile.getMethod(),
                    $scope.profile.getCredentials()).then(
                    function(data) {
                    	$scope.profile.form.submitted=true;
                    	if(data.sqlCode == 0){
                    		$scope.profile.form.message  = 'Success';
                    	}else{
                    		$scope.profile.form.message  = data.sqlErrm;
                    	}
                    },
                    function(data) {
                    	$scope.profile.form.submitted=true;
                    	if(data.sqlCode == 0){
                    		$scope.profile.form.message  = 'Success';
                    	}else{
                    		$scope.profile.form.message  = data.sqlErrm;
                    	}
                    });
            }
        };

        $scope.reset = function() {};

        $scope.cancelChangePassword = function() {};

        $scope.changePassword = function(form) {};
    }
]);