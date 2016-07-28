(function () {
  'use strict';
  angular.module('authenticationMod')
    .controller('AuthenticationController', ['$mdDialog', 'authService', '$location', AuthenticationController]);

  function AuthenticationController($mdDialog, authService, $location) {
    var self=this;

    self.login = login;
    self.signup = signup;

    function login() {
      var user = {
        email: self.email,
        password: self.password
      };
      authService.login(user).then(function(msg) {
        $location.path('/');
        location.reload();
      }, function(errMsg) {
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#dashboard')))
            .clickOutsideToClose(true)
            .title('Error')
            .textContent(errMsg)
            .ariaLabel('Login Error')
            .ok('Got it!')
        );
      });
    };

    function signup() {
      if (self.password1 === self.password2) {
        var newUser = {
          username: self.username,
          email: self.email,
          password: self.password1 || self.password2
        };
        authService.signup(newUser).then(function(msg) {
          $location.path('/');
          location.reload();
        }, function (errMsg) {
          $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#dashboard')))
            .clickOutsideToClose(true)
            .title('Error')
            .textContent(errMsg)
            .ariaLabel('Signup Error')
            .ok('Got it!')
          );
        });
      } else {
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#dashboard')))
            .clickOutsideToClose(true)
            .title('Error')
            .textContent('Password not match')
            .ariaLabel('Password Error')
            .ok('Got it!')
        );
      };

    };







  };
})();
