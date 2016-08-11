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
    self.checkPassword1 = checkPassword1;
    self.checkPassword2 = checkPassword2;

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
      if (self.usernameStatus == 'input-valid' &&
          self.emailStatus == 'input-valid' &&
          self.passwordStatus1 == 'input-valid' &&
          self.passwordStatus2 == 'input-valid') {
         var newUser = {
          username: self.username,
          email: self.email,
          password: self.password1 || self.password2
        };
        authService.signup(newUser).then(function(msg) {
          $location.path('/');
          location.reload();
        });
      } else {
        $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#dashboard')))
              .clickOutsideToClose(true)
              .title('Error')
              .textContent('Something wrong! Please check the input of signup form.')
              .ariaLabel('Signup Error')
              .ok('Got it!')
          );
      };
    };

    function checkPassword1() {
      var re = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;
      if (self.password1 !== undefined && re.test(self.password1)) {
        self.passwordStatus1 = 'input-valid';
        return true;
      } else {
        self.passwordStatus1 = 'input-error';
        return false;
      }
    };

    function checkPassword2() {
      var re = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;
      if (self.password2 !== undefined && self.password2 == self.password1 && checkPassword1()) {
        self.passwordStatus2 = 'input-valid';
        return true;
      } else if (self.password2 !== self.password1) {
        self.passwordStatus2 = 'input-error';
        return false;
      };
    };

    function checkUsername() {
      var re = /^\w{4,15}$/;
      if (self.username !== undefined && re.test(self.username)) {
        self.usernameStatus = 'valid-processing';
        authInputValidation.checkUsername({username: self.username}).then(function() {
          self.usernameStatus = 'input-valid';
          return true;
        }, function() {
          self.usernameStatus = 'input-error';
          document.getElementById('username').setAttribute('title', 'The user is already existed!');
          return false;
        });
      } else {
        self.usernameStatus = 'input-invalid';
        return false;
      }
    };

    function checkEmail() {
      var re = /^(([a-zA-Z]|[0-9])|([-]|[_]|[.]))+[@](([a-zA-Z0-9])|([-])){2,63}[.](([a-zA-Z0-9]){2,63})+$/gi;
      if (self.email !== undefined && re.test(self.email)) {
        self.emailStatus = 'valid-processing';
        authInputValidation.checkEmail({email: self.email}).then(function() {
          self.emailStatus = 'input-valid';
          return true;
        }, function() {
          self.emailStatus = 'input-error';
          document.getElementById('email').setAttribute('title', 'The email is already existed!');
          return false;
        });
      } else {
        self.emailStatus = 'input-invalid';
        return false;
      }
    };

  };
})();
