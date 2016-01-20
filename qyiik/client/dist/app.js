var applicationModule = angular.module('qyiikApp', [ 'ui.bootstrap',
		'qk.templates', 'ui.router', 'abstract.factory', 'qk.config',
		'qk.login', 'qk.signUpCtrl' ]);

applicationModule.config([ '$stateProvider', 'CONFIG',
		function($stateProvider, CONFIG) {
			$stateProvider.state('signin', {
				url : '/signin',
				controller : 'LoginController',
				templateUrl : "app/partials/login.html"
			}).state('signup', {
				url : "/signup",
				controller : 'SignUpController',
				templateUrl : "app/partials/signup.html",
			}).state('security', {
				url : "/security",
				templateUrl : "app/partials/security.html",
			}).state('technical', {
				url : "/technical",
				templateUrl : "app/partials/technical.html",
			}).state('changepwd', {
				url : "/changepwd",
				templateUrl : "app/partials/changepwd.html",
			});

		} ]);

applicationModule.controller('ApplicationController', [ '$scope', '$state',
		function($scope, $state) {
			$scope.goTo = function(state) {
				console.log(state);
				$state.transitionTo(state);
			}
		} ]);

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
var qyiikConfig = angular.module('qk.config', []);
window.console = window.console || {};
window.console.log = window.console.log || function() {
};
qyiikConfig.constant('CONFIG', (function() {
	var contextpath = 'http://db1.qyiik.com/qyiikrecruit/';
	var staticcontent = "getStaticContent";
	var templateuri = "/assets/js/directive/template/";
	var partials = "/assets/js/partials/";
	var images = "/assets/images/";
	return {
		CONTEXT : contextpath,
		STATIC_CONTENT : contextpath + '/' + staticcontent,
		TEMPLATECONTEXT : contextpath + templateuri,
		PARTIALS : contextpath + partials,
		IMAGE : contextpath + images,
	};
})());


var user = angular.module('qk.user', [ 'qk.message' ]);

user.factory('UserModel', [ '$http', 'MessageModel', 'CONFIG',
		'AbstractFactory',
		function($http, MessageModel, CONFIG, AbstractFactory) {
			var abstractFactory = new AbstractFactory();
			var UserModel = function() {
				var _user = this;
				this.firstName;
				this.lastName;
				this.password;
				this.confirmPassword;
				this.emailAddress;
				this.companyName;
				this.message = new MessageModel();
				this.controller = 'agt_rgn.create_agt';
			}
			UserModel.prototype = {
				getMethod : function() {
					return this.controller;
				},
				getParam : function() {
					return {
						p_first_name : this.firstName,
						p_last_name : this.lastName,
						p_email_address : this.emailAddress,
						p_password : this.password,
						p_agc_id : this.companyName,
					}
				}
			};

			return UserModel;
		} ]);
var company = angular.module('qk.company', ['qk.message']);

company.factory('CompanyModel', [
    '$http',
    'MessageModel',
    'CONFIG',
    'AbstractFactory',
    function($http, MessageModel, CONFIG, AbstractFactory) {
        var abstractFactory = new AbstractFactory();
        var CompanyModel = function() {
            var _company = this;
            this.data;
            var request = $http(abstractFactory.getUrl('agc.list'));
            request.then(function(response) {
                _company.data = response.data.jsonData;
            });
        }
        CompanyModel.prototype = {
            getAllCompany: function() {
                return this;
            }
        };
        return CompanyModel;
    }
]);
var message = angular.module('qk.message', ['abstract.factory']);

message.factory('MessageModel', ['$http', 'CONFIG', 'AbstractFactory', function($http, CONFIG, AbstractFactory) {
    var abstractFactory = new AbstractFactory();
    var MessageModel = function() {
        var _message = this;
        this.form = {};
        this.form.submitted = false;
        this.form.processing = false;
        this.success;
        this.failure;
    }
    MessageModel.prototype = {
    		isSubmitted : function(){
    			return this.form.submitted;
    		},
    		isProcessing : function(){
    			return this.form.processing;
    		},
    		getMessage : function(){
    			return this.success != null ? success : failure;
    		}
    };
    return MessageModel
}]);
var profile = angular.module('qk.profile', ['qk.message']);

profile.factory('ProfileModel', ['$http', 'MessageModel', 'CONFIG', 'AbstractFactory',  function($http, MessageModel, CONFIG, AbstractFactory) {
    var abstractFactory = new AbstractFactory();
    var ProfileModel = function() {
        var _profile = this;
        this.qyiikid;
        this.password;
        this.rememberme = 'Y';
        this.message = new MessageModel();
        this.controller = 'agt_sty.log_in';
        this.form = {};
        this.form.submitted = false;
        this.form.message;
    }
    ProfileModel.prototype = {
        getCredentials : function() {
            return {
                p_email_address: this.qyiikid,
                p_password: this.password,
                p_remember_me: this.rememberme,
            }
        },
        getMethod : function(){
        	return this.controller;
        },
        isSubmitted : function(){
        	return this.form.submitted;
        }
    };
    
    return ProfileModel;
}]);
var signUp = angular.module('qk.signUp', ['qk.message']);

signUp.factory('SignUpModel', ['$http', 'MessageModel', 'CONFIG', 'AbstractFactory',  function($http, MessageModel, CONFIG, AbstractFactory) {
    var abstractFactory = new AbstractFactory();
    var signUpModel = function() {
        var _signup = this;
        this.companyCombo;
        this.firstname;
        this.lastname;
        this.password;
        this.email;
        this.message = new MessageModel();
        this.companyController = 'agc.list';
        this.signUpController = 'agt_rgn.create_agt';
    }
    signUpModel.prototype = {
        getCompanyMethod : function(){
        	return this.companyController;
        },
    	getSignUpMethod:function(){
    		return this.signUpController;
    	},
    	getSignUpFormData : function() {
            return {
                p_email_address: this.email,
                p_password: this.password,
                p_last_name: this.lastname,
                p_agc_id:this.companyCombo,
                p_first_name:this.firstname
            }
        }
    };
    return signUpModel;
}]);
var userForm = angular.module('qk.user.form', [ 'qk.message','qk.user' ,'qk.company' ]);

userForm.factory('UserFormModel', [ '$http', 'MessageModel', 'CONFIG',
		'AbstractFactory', 'UserModel' ,'CompanyModel',
		function($http, MessageModel, CONFIG, AbstractFactory,UserModel , CompanyModel) {
			var abstractFactory = new AbstractFactory();
			var UserFormModel = function() {
				var _userform = this;
				this.user = new UserModel();
				this.pattern = /^(?=.*\d)(?=.*[a-zA-Z]).{8,12}$/;
				this.allCompany = new CompanyModel();
				this.form = {};
				this.form.submitted = false;
				this.form.message;
			}
			UserFormModel.prototype = {};

			return UserFormModel;
		} ]);
var user = angular.module('qk.user', [ 'qk.message' ]);

user.factory('UserModel', [ '$http', 'MessageModel', 'CONFIG',
		'AbstractFactory',
		function($http, MessageModel, CONFIG, AbstractFactory) {
			var abstractFactory = new AbstractFactory();
			var UserModel = function() {
				var _user = this;
				this.firstName;
				this.lastName;
				this.password;
				this.confirmPassword;
				this.emailAddress;
				this.companyName;
				this.termsAndCondition;
				this.message = new MessageModel();
				this.controller = 'agt_rgn.create_agt';
			}
			UserModel.prototype = {
				getMethod : function() {
					return this.controller;
				},
				getParam : function() {
					return {
						p_first_name : this.firstName,
						p_last_name : this.lastName,
						p_email_address : this.emailAddress,
						p_password : this.password,
						p_agc_id : this.companyName,
					}
				}
			};

			return UserModel;
		} ]);
var abstractFactory = angular.module('abstract.factory', ['qk.config']);

abstractFactory
    .factory(
        'AbstractFactory', ['$http', 'CONFIG',
            function($http, CONFIG) {
                var AbstractFactory = function() {
                    this.data = {};
                };

                AbstractFactory.prototype = {
                    getUrl: function(method) {
                        var url = CONFIG.CONTEXT + method;
                        console.log(url);
                        return {
                            url: url,
                            method: 'GET'
                        };
                    },
                    postUrl: function(url, params) {
                        console.log(params);
                        return {
                            url: url,
                            method: 'POST',
                            data: params,
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        };
                    },
                    getRequest: function(method, param) {
                        console.log(param);
                        var url = CONFIG.CONTEXT + method // +'&callback=JSON_CALLBACK';

                        var returnObj = {
                            url: url,
                            dataType: 'jsonp',
                            method: 'GET'
                        };
                        if (param != null) {
                            returnObj.params = param;
                        }
                        return returnObj;
                    },
                    processResponse: function(response) {
                        return (response.responseCode == 'SUCCESS' || response.responseCode == 'success') ? response.responseDescription : response.errorDescription != '' ? response.errorDescription : response.errorCode;
                    }
                };

                return AbstractFactory;
            }
        ]);
var authentication = angular.module('qk.auth', []);

authentication.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized',
    invalidDatesCode: 'M_ERROR_CODE_1019'
});

authentication
    .factory(
        'AuthService',['$http', '$q', 'Session', 'AbstractFactory',
        function($http, $q, Session, AbstractFactory) {
            var authService = {};
            var abstractFactory = new AbstractFactory();
            authService.login = function(method, credentials) {
                return $http(abstractFactory.getRequest(method,credentials))
                    .then(
                        function(res) {
                            console.log('response : ' + res.data.inviteeId);
                            if (res.data.inviteeId > 0 || (res.data.allCompany != null && res.data.allCompany.length > 1)) {
                                Session.create(
                                    res.data.sessionid,
                                    res.data.inviteeId,
                                    res.data.inviteeType);
                                return res.data;
                            } else {
                                return $q.reject(res.data);
                            }
                        });
            };

            authService.reset = function(profile) {
                param = {
                    eventId: profile.eventId,
                    emailAddress: profile.emailAddress,
                    method: 'resetPassword',
                    controller: 'registration',
                    methodType: 'GET',
                };
                return $http(abstractFactory.getUrl(resourceURL, param))
                    .then(function(res) {
                        return res.data;
                    });
            };

            authService.handleResponse = function(data) {
                if (data.errorCode == 'M_ERROR_CODE_1019') {
                    param = {
                        eventid: data.eventId,
                        showComments: true,
                        confirmationComments: '',
                        comments: data.message,
                    };
                    $state.go('overview', param);
                } else if (data.errorCode == 'M_ERROR_CODE_3009') {
                    $state.go('notfound');
                } else {
                    $state
                        .go(
                            data.eventRegistrationType == 'O' ? 'openregistration' : 'overview.login', param);
                }
            };

            authService.doChangePassword = function(inviteeObject) {
                var stringasObject = JSON.stringify(inviteeObject);
                param = {
                    data: stringasObject,
                    method: 'changePassword',
                    controller: 'registration',
                    methodType: 'POST',
                };
                return $http(
                        abstractFactory.postUrl(resourceURL, param))
                    .then(function(res) {
                        return res.data;
                    });
            };

            authService.isAuthenticated = function(currentUser) {
                return currentUser.inviteeId > 0 && currentUser.sessionid != -1;
            };


            authService.isAuthorized = function(currentUser) {
                return authService.isAuthenticated(currentUser);
            };

            authService.getLoginParam = function(currentUser) {
                if (currentUser != null) {
                    param = {
                        eventid: currentUser.eventId,
                        inviteeid: currentUser.inviteeId,
                        inviteeType: currentUser.inviteeType,
                    };
                    return param;
                }
                return null;
            };

            return authService;
        }]);

authentication.service('Session', function() {
    this.create = function(sessionId, userId, userRole) {
        this.id = sessionId;
        this.userId = userId;
        this.userRole = userRole;
    };
    this.destroy = function() {
        this.id = null;
        this.userId = null;
        this.userRole = null;
    };
});
var signUpService = angular.module('qk.signUpService', []);

signUpService
    .factory(
        'SignUpService', ['$http', '$q', 'Session', 'AbstractFactory',
            function($http, $q, Session, AbstractFactory) {
                var signUpSvc = {};
                var abstractFactory = new AbstractFactory();
                signUpSvc.loadCompany = function(method, params) {
                    return $http(abstractFactory.getRequest(method, params))
                        .then(
                            function(res) {
                                return res;
                            });
                };
                signUpSvc.createAccount = function(model) {
                    return $http(abstractFactory.getRequest(model.getMethod(), model.getParam()))
                        .then(
                            function(res) {
                                return res;
                            });
                };
                return signUpSvc;
            }
        ]);