(function () {
  'use strict';
  angular.module('authenticationMod')
    .controller('AuthenticationController', ['authService', '$location', AuthenticationController]);

  function AuthenticationController(authService, $location) {
    var self=this;
    var user = {
      email: '',
      password: ''
    };

    self.login = login;
    self.signup = signup;

    function login() {
      user = {
        email: self.email,
        password: self.password
      };
      authService.login(user).then(function(username) {
        console.log(username);
        $location.path('/').search({username: username});
      }, function(errMsg) {
        console.log(errMsg);
      });
    };

    function signup() {


    }







  };
})();
