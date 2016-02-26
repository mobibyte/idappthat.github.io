var app = angular.module('app.controllers', ['firebase']);

app.controller('HomeController', function($scope, $firebaseArray) {
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

  var id = 1001024865;
  var ref = new Firebase('https://mobi-internal.firebaseio.com/members');
  ref
    .orderByChild('name')
    .once('child_added', function(snapshot) {
    console.log(snapshot);

  });
  console.log($firebaseArray(ref));


  $scope.submitEmailForm = function() {
    if($scope.emailForm.$valid) {
      console.log($scope.emailForm);
    }
  }
});

app.controller('PlaylistController', function($scope) {
  $scope.playlists = [
    {
      image: 'http://thebigboss.org/wp-content/uploads/2014/ios_logo.png',
      name: 'iOS',
      link: 'kjlsdf'
    },
    {
      image: 'http://famouslogos.net/images/android-logo.jpg',
      name: 'Android',
      link: 'kjlsdf'
    }
  ];
});