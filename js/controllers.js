var app = angular.module('app.controllers', ['ngSanitize']);

app.controller('HomeController', function($scope) {
  $scope.test = "hello";
  $scope.team = [
    {
      name: 'Cameron Moreau',
      title: 'President',
      image: 'core/avatar_cameron.png'
    },
    {
      name: 'Kevin Chung',
      title: 'Vice-President',
      image: 'core/avatar_kevin.png'
    },
    {
      name: 'Anthony Tatowicz',
      title: 'Project Manager',
      image: 'core/avatar_anthony.png'
    },
    {
      name: 'John Jackson',
      title: 'Executive Office',
      image: 'core/avatar_john.png'
    },
    {
      name: 'Reece Ajibola',
      title: 'UI/UX Manager',
      image: 'core/avatar_reece.png'
    },
    {
      name: 'Zach Bracken',
      title: 'Media Manager',
      image: 'core/avatar_zach.png'
    },
    {
      name: 'Nhat Dao',
      title: 'Web Manager',
      image: 'core/avatar_nhat.png'
    },
  ];

  $scope.submitEmailForm = function() {
    if($scope.emailForm.$valid) {
      console.log($scope.emailForm);
    }
  }
});

app.controller('AuthController', function($scope, $state) {
  if(Parse.User.current() !== null) $state.go('portal.playlists');


  $scope.message = {
    text: '',
    error: true
  };

  $scope.setMessage = function(message, error) {
    $scope.message.text = message;
    $scope.message.error = error;

    $scope.$apply();
  }

  $scope.submitReset = function() {
    if($scope.resetForm.$valid) {
      var email = $scope.resetForm.email;

      Parse.User.requestPasswordReset(email, {
        success: function() {
          $scope.setMessage('We all good, check yo email!');
        },
        error: function(error) {
          console.log(error.message);
          $scope.setMessage(error.message, true);
        }
      });
    }
  }

  $scope.submitLogin = function() {
    var email = $scope.loginForm.email;
    var password = $scope.loginForm.password;

    Parse.User.logIn(email, password, {
      success: function(user) {
        $state.go('portal.playlists');
      },
      error: function(user, error) {
        if(error.code == 101) $scope.setMessage('Invalid email/password', true);
        else $scope.setMessage(error.message, true);
      }
    });
  }
});

app.controller('NavController', function($scope, $state) {
  $scope.logOut = function() {
    Parse.User.logOut();
    $state.go('home');
  }
});

app.controller('ViewPlaylistController', function($scope, $state, $stateParams, $sce) {
  $scope.videos = [];
  $scope.title = '';
  $scope.desc = '';

  var playlist = $stateParams.id;

  $scope.getSrc = function(id) {
    return 'http://www.youtube.com/embed/' + id;
  }

  $scope.getDesc = function(str) {
    return $sce.trustAsHtml($scope.desc);
  }

  var Playlist = Parse.Object.extend('Playlist');
  var query = new Parse.Query(Playlist);
  query.get(playlist, {
    success: function(result) {
      $scope.title = result.get('title');
      $scope.desc = result.get('desc');
      $scope.videos = result.get('videos');
      $scope.$apply();
    }
  });

  ga('send', 'pageview', 'playlists');
});

app.controller('PlaylistController', function($scope) {
  $scope.playlists = [];

  var Playlist = Parse.Object.extend('Playlist');
  var query = new Parse.Query(Playlist);
  query.descending('createdAt');
  query.find({
    success: function(results) {
      angular.forEach(results, function(item) {
        $scope.playlists.push({
          id: item.id,
          title: item.get('title'),
          image: item.get('coverImage').url()
        });
      });

      $scope.$apply();
    }
  });
});

