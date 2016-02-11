angular.module("sumModule", ['ngRoute'])

  .controller('sumCtrl', function($scope, $routeParams, $location, $http) {
    $scope.list = {
      summand1: parseInt($routeParams.summand1) || '',
      summand2: parseInt($routeParams.summand2) || ''
    };

    $scope.setUrl = function() {
      if (!$scope.list.summand1 || !$scope.list.summand2) return;
      $location.path('/' + $scope.list.summand1 + '/' + $scope.list.summand2);
    };

    $http.get('http://api.fixer.io/latest')
      .then(function successCallback(response) {
        $scope.currencyRates = response.data.rates;
      }, function errorCallback(response) {
        console.log('Oops!');
      });
  })

  .directive('laSum', function() {
    return {
      restrict: 'E',
      scope:    { list: '=', currencyRates: '=' },
      template: '<input type="text" readonly="true" value="{{ summarize() }}" />' +
        '<span>{{ getSumInCurrency("CAD") }}</span> CAD',
      link:     function(scope){

        function count() {
          return _.reduce(scope.list, function(memo, num){ return memo + num; }, 0);
        }

        function formMessage(count){ return "sum is: " + count; }
        function logMessage(phrase){ console.log(phrase); }

        var logSum = _.compose(logMessage, formMessage);

        scope.summarize = function() {
          logSum(count());
          return count();
        };

        scope.getSumInCurrency = function(currency) {
          if(!scope.currencyRates) return;
          return count()/scope.currencyRates[currency];
        };
      }
    };
  })

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/sum.html',
        controller: 'sumCtrl'
      })
      .when('/:summand1/:summand2', {
        templateUrl: 'partials/sum.html',
        controller: 'sumCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);