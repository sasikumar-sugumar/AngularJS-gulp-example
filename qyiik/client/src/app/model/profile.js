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