'use strict';

angular.module('App', ['ngRoute', 'ui.bootstrap'])
.config(function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $routeProvider
    .otherwise({
        redirectTo: '/'
    });
});
