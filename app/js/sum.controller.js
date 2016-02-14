angular.module("sumModule", ['ui.router'])

  .controller('sumCtrl', function($scope, $stateParams, $location, $http, $state) {
    $scope.list = {
      summand1: parseInt($stateParams.summand1) || '',
      summand2: parseInt($stateParams.summand2) || ''
    };

    $scope.setUrl = function() {
      if (!$scope.list.summand1 || !$scope.list.summand2) return;
      $state.go('sum_items', {
        summand1: $scope.list.summand1,
        summand2: $scope.list.summand2
      });
    };

    $http.get('http://api.fixer.io/latest')
      .then(function successCallback(response) {
        $scope.currencyRates = response.data.rates;
      }, function errorCallback(response) {
        console.log('Oops!');
      });

    $scope.currencyCodes = function() {
      if (!$scope.currencyRates) return;
      return Object.keys($scope.currencyRates);
    };

    $scope.currencyCode = "CAD";

  })

  .directive('laSum', function() {
    return {
      restrict: 'E',
      scope:    { list: '=', currencyRates: '=', code: '=' },
      template: '<input type="text" readonly="true" value="{{ summarize() }}" />' +
                '<span>{{ getSumInCurrency(code) }}</span>',
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

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('sum', {
        url: '/',
        templateUrl: 'partials/sum.html',
        controller: 'sumCtrl'
      })
      .state ('sum_items', {
        url: '/:summand1/:summand2',
        templateUrl: 'partials/sum.html',
        controller: 'sumCtrl'
      });

      $urlRouterProvider.otherwise('/');
  });