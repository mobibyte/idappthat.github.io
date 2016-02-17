var app = angular.module('app.controllers', []);

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
});