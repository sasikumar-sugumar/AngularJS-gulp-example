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