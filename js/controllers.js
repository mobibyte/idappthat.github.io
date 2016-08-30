var app = angular.module('app.controllers', ['ngSanitize']);

app.controller('HomeController', function($scope, $http) {
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

  $scope.subscribeMessage = null;
  $scope.subscribeLoading = false;

  $scope.submitEmailForm = function() {
    if($scope.emailForm.$valid) {
      var u = '5d3eeb8a245375de29b010caa';
      var id = '0a24065ed9';
      var url = 'http://idappthat.us7.list-manage.com/subscribe/post-json?u=' + u + '&id=' + id + '&c=JSON_CALLBACK';
      var data = {
        'FNAME': $scope.emailForm.firstName,
        'LNAME': $scope.emailForm.lastName,
        'EMAIL': $scope.emailForm.email,
        'MAVS': $scope.emailForm.mavsNumber,
      }

      $scope.subscribeLoading = true;
      $http.jsonp(url, {params: data})
        .success(function(response) {
          console.log(response);
          $scope.subscribeLoading = false;
          $scope.subscribeMessage = {
            type: response.result, message: response.msg
          }
        })
        .error(function(response) {
          $scope.subscribeMessage = {
            type: 'error', message: 'Something went wrong...'
          }
        })

      // $.ajax({
      //   type: 'GET',
      //   url: 'http://idappthat.us7.list-manage.com/subscribe/post-json?u=' + u + '&id=' + id + '&c=?',
      //   data: $form.serialize(),
      //   dataType: 'jsonp',
      //   contentType: 'application/json; charset=utf-8',
      //   error: function(err) { alertError('Could not register at this time...'); },
      //   success: function(data) {
      //     console.log(data);
      //     if(data.result == 'error') alertError(data.msg);
      //     else alertSuccess();
      //   }
      // });
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
