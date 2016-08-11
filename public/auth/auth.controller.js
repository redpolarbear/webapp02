(function () {
  'use strict';
  angular.module('authenticationMod')
    .controller('AuthenticationController', ['$mdDialog', 'authService', 'authInputValidation', '$location', AuthenticationController]);

  function AuthenticationController($mdDialog, authService, authInputValidation, $location) {
    var self=this;

    self.login = login;
    self.signup = signup;
    self.checkUsername = checkUsername;
    self.checkEmail = checkEmail;

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

    function checkPassword(str) {
      var re = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;
      return re.test(str);
    };

    function checkUsername() {
      var re = /^\w{4,15}$/;
      if (self.username !== undefined && re.test(self.username)) {
        self.usernameStatus = 'valid-processing';
        authInputValidation.checkUsername({username: self.username}).then(function(msg) {
          self.usernameStatus = 'input-valid';
        }, function(errMsg) {
          self.usernameStatus = 'input-error';
        });
      } else {
        self.usernameStatus = 'input-invalid';
      }
    };

    function checkEmail() {
      var re = /^(([a-zA-Z]|[0-9])|([-]|[_]|[.]))+[@](([a-zA-Z0-9])|([-])){2,63}[.](([a-zA-Z0-9]){2,63})+$/gi;
      if (self.email !== undefined && re.test(self.email)) {
        self.emailStatus = 'valid-processing';
        authInputValidation.checkEmail({email: self.email}).then(function(msg) {
          self.emailStatus = 'input-valid';
        }, function(errMsg) {
          self.emailStatus = 'input-error';
        });
      } else {
        self.emailStatus = 'input-invalid';
      }
    };

  };
})();
