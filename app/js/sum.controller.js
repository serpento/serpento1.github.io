angular.module("sumModule", ['ngRoute'])

    .controller('sumCtrl', function($scope, $routeParams, $location) {
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
            console.log(response);
          }, function errorCallback(response) {
            console.log('Oops!');
          });

    })

    .directive('laSum', function() {
        return {
            restrict: 'E',
            scope: { list: '=' },
            template: '<input type="text" readonly="true" value="{{ summarize() }}" />',
            link: function(scope){
                function count() {
                    return _.reduce(scope.list, function(memo, num){ return memo + num; }, 0);
                }

                function formMessage(count){ return "sum is: " + count; }
                function logMessage(phrase){ console.log(phrase); }

                var logSum = _.compose(logMessage, formMessage);

                scope.summarize = function() {
                   logSum(count());
                   return count();
                }
            }
        };

    })

    .config(['$routeProvider',
        function($routeProvider) {
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
        }])
