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
