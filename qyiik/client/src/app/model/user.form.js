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