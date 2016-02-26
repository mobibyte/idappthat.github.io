var app = angular.module('app', ['ui.router', 'app.controllers', 'app.directives']);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      controller: 'HomeController',
      templateUrl: 'templates/home.html'
    })
    .state('portal', {
      url: '/portal',
      controller: 'PlaylistController',
      templateUrl: 'templates/playlists.html'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html'
    })
    .state('forgotpass', {
      url: '/forgotpass',
      controller: 'HomeController',
      templateUrl: 'templates/forgotpass.html'
    });

});