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