var app = angular.module('app', [
  'ui.router', 'app.controllers', 'app.directives'
]);

Parse.initialize("LfipsGfmXzaBABmd6ML0ypp3DRyZ5LOXDKWpyZoa", "59Pu5KJGwylNeZyaxmwp48oGOWvBJpATKriUiaNx");

app.config(function($sceDelegateProvider, $stateProvider, $urlRouterProvider) {

  $sceDelegateProvider.resourceUrlWhitelist([
    'self',   // trust all resources from the same origin
    '*://www.youtube.com/**'   // trust all resources from `www.youtube.com`
  ]);

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      controller: 'HomeController',
      templateUrl: 'templates/home.html'
    })
    .state('portal', {
      abstract: true,
      controller: 'NavController',
      templateUrl: 'templates/portal-base.html'
    })
    .state('portal.playlists', {
      url: '/playlist',
      controller: 'PlaylistController',
      templateUrl: 'templates/playlists.html'
    })
    .state('portal.playlist', {
      url: '/playlist/:id',
      controller: 'ViewPlaylistController',
      templateUrl: 'templates/view-playlist.html'
    })
    .state('login', {
      url: '/login',
      controller: 'AuthController',
      templateUrl: 'templates/login.html'
    })
    .state('forgotpass', {
      url: '/forgotpass',
      controller: 'AuthController',
      templateUrl: 'templates/forgotpass.html'
    });

});