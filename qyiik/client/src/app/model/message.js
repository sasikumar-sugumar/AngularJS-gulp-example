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