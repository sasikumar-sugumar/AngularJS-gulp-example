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