'use strict';

angular.module('myApp', [
  'ngRoute',
  'myApp.home', //newly added home module
  'myApp.register', //newly added home module
  'myApp.welcome', //newly added Welcome module
  'myApp.addPost' //newly added addPost module
]).
config(['$routeProvider', function($routeProvider){
  //Routes will be here.
  $routeProvider.otherwise({
    redirectTo:'/home'
  });
}]);
