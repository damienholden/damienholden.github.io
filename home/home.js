'use strict';

angular.module('myApp.home', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope','$location','shareDataService','$firebaseAuth', function($scope,$location,shareDataService, $firebaseAuth) {

firebase.initializeApp(config);
  //  var firebaseObj = new Firebase("https://angularjs-68406.firebaseio.com");
  //  var loginObj = $firebaseAuth(firebaseObj);
    $scope.SignIn = function(e) {
    e.preventDefault();
    var email = $scope.user.email;
    var password = $scope.user.password;
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(success){
      shareDataService.addUser(email);
      console.log(success);
      console.log('Successfully Logged In');
      $location.path('/welcome');
    })
    .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode === 'auth/wrong-password') {
    alert('Wrong password.');
  } else {
    alert(errorMessage);
  }
  console.log(error);
});
  /*  loginObj.$authWithPassword({
            email: username,
            password: password
        })
        .then(function(user) {
            //Success callback
            console.log('Authentication successful');
        }, function(error) {
            //Failure callback
            console.log('Authentication failure');

        });*/
      }
      }])
      
// Assessing the $scope between controllers
.service('shareDataService', function() {
  var user = '';

  var addUser = function(value) {
      user = value;
  }

  var getUser = function(){
      return user;
  }

  return {
    addUser: addUser,
    getUser: getUser
  };

});
