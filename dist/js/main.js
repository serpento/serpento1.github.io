angular.module("sumModule",["ngRoute"]).controller("sumCtrl",["$scope","$routeParams","$location","$http",function(t,e,n,r){t.list={summand1:parseInt(e.summand1)||"",summand2:parseInt(e.summand2)||""},t.setUrl=function(){t.list.summand1&&t.list.summand2&&n.path("/"+t.list.summand1+"/"+t.list.summand2)},r.get("http://api.fixer.io/latest").then(function(e){t.currencyRates=e.data.rates},function(t){console.log("Oops!")}),t.currencyCodes=function(){return Object.keys(t.currencyRates)},t.currencyCode="CAD"}]).directive("laSum",function(){return{restrict:"E",scope:{list:"=",currencyRates:"=",code:"="},template:'<input type="text" readonly="true" value="{{ summarize() }}" /><span>{{ getSumInCurrency(code) }}</span>',link:function(t){function e(){return _.reduce(t.list,function(t,e){return t+e},0)}function n(t){return"sum is: "+t}function r(t){console.log(t)}var u=_.compose(r,n);t.summarize=function(){return u(e()),e()},t.getSumInCurrency=function(n){return t.currencyRates?e()/t.currencyRates[n]:void 0}}}}).config(["$routeProvider",function(t){t.when("/",{templateUrl:"partials/sum.html",controller:"sumCtrl"}).when("/:summand1/:summand2",{templateUrl:"partials/sum.html",controller:"sumCtrl"}).otherwise({redirectTo:"/"})}]);