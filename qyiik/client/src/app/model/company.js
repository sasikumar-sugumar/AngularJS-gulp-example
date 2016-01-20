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