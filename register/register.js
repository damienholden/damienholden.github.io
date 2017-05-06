'use strict';

angular.module('myApp.register', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'register/register.html',
    controller: 'RegisterCtrl'
  });
}])

.controller('RegisterCtrl', ['$scope','$location','$firebaseAuth', function($scope,$location,$firebaseAuth) {
  firebase.initializeApp(config);
  $scope.signUp = function() {
    if (!$scope.regForm.$invalid) {
              var email = $scope.user.email;
              var password = $scope.user.password;
              if (email && password) {
                //  auth.$createUser({email:email, password:password})
                  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(success){
                    console.log(success);
                    console.log('New User Successfully Created');
                    $location.path('/home');
                  })
                  .catch(function(error) {
                  // Error with registration
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  $scope.regErrorMessage = errorMessage;
                  $scope.regError = true;
                  console.log(errorCode);
                  console.log(errorMessage);
                /*  alert(errorCode);
                  alert(errorMessage);*/

                });
              }
          }
      };
}]);
