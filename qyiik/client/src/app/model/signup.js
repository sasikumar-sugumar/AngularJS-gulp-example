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