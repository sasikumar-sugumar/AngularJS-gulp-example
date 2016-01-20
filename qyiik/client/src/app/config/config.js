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

