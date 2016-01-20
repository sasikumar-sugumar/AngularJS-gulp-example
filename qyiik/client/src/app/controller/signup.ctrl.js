var signUpDataCtrl = angular.module('qk.signUpCtrl', ['qk.signUpService', 'qk.signUp', 'qk.message', 'qk.user.form']);
signUpDataCtrl
    .controller(
        'SignUpController', [
            '$state',
            '$scope',
            '$rootScope',
            'SignUpService',
            '$stateParams',
            'SignUpModel',
            'MessageModel',
            'UserFormModel',
            function($state, $scope, $rootScope,
                SignUpService, $stateParams,
                SignUpModel, MessageModel, UserFormModel) {
                $scope.userForm = new UserFormModel();
                $scope.createAccount = function(form) {
                    $scope.userForm.form.submitted = true;
                    $scope.userForm.form.message = '';
                    if (form.$valid) {
                        SignUpService.createAccount($scope.userForm.user)
                            .then(
                                function(response) {
                                    if (response.data.sqlCode == "0") {
                                        console.log(response);
                                        $scope.userForm.form.message = 'Success'
                                    } else {
                                    	 $scope.userForm.form.message = response.data.sqlErrm
                                    }
                                });
                    }
                };
            }
        ]);