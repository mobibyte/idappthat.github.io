var app = angular.module('app.directives', []);

app.directive('featureBox', function() {
  return {
    restrict: 'AE',
    scope: {
      title: '@',
      icon: '@',
      image: '@',
      color: '@'
    },
    templateUrl: '../templates/feature-box.html'
  }
});